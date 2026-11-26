import {searchIndex} from './data.js';
import {overview,economy,population,labour,prices,regions,provinceDetail,methods} from './views.js';
const main=document.querySelector('main');
const state={year:2025,type:'line'};
const routes={'/':overview,'/economy':economy,'/population':population,'/labour':labour,'/prices':prices,'/regions':regions,'/methods':methods};
function render(){
 const path=decodeURIComponent(location.hash.slice(1)||'/');
 const view=routes[path];
 main.innerHTML=path.startsWith('/regions/')?provinceDetail(path.slice(9)):view?view(state):'<h1>Page not found</h1><p><a href="#/">Return to the overview</a></p>';
 document.querySelectorAll('nav a').forEach(a=>{const active=a.hash==='#'+path||(a.hash==='#/regions'&&path.startsWith('/regions/'));a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const title=path==='/'?'Overview':path.startsWith('/regions/')?path.slice(9):path.slice(1).replace(/^./,c=>c.toUpperCase());
 document.title=title+' · Meridia National Statistics';
 wireControls();
}
function wireControls(){
 document.querySelector('#chart-year')?.addEventListener('change',e=>{state.year=+e.target.value;render();});
 document.querySelectorAll('[data-chart-type]').forEach(b=>b.addEventListener('click',()=>{state.type=b.dataset.chartType;render();}));
 document.querySelector('#province-select')?.addEventListener('change',e=>{if(e.target.value)location.hash='/regions/'+e.target.value;});
 document.querySelectorAll('[data-sort]').forEach(b=>b.addEventListener('click',()=>sortTable(b)));
 const search=document.querySelector('#search');
 search?.addEventListener('input',()=>showSearch(search.value));
 document.querySelector('#search-form')?.addEventListener('submit',e=>{e.preventDefault();const result=document.querySelector('#search-results a');if(result)location.hash=result.hash;else showSearch(search.value);});
}
function sortTable(button){
 const table=button.closest('table'),column=+button.dataset.sort,heading=button.closest('th');
 const direction=heading.getAttribute('aria-sort')==='ascending'?-1:1;
 table.querySelectorAll('th').forEach(h=>h.setAttribute('aria-sort','none'));
 heading.setAttribute('aria-sort',direction===1?'ascending':'descending');
 const rows=[...table.tBodies[0].rows];
 rows.sort((a,b)=>{const av=a.cells[column].dataset.value,bv=b.cells[column].dataset.value;return direction*(av!==''&&bv!==''&&Number.isFinite(+av)&&Number.isFinite(+bv)?+av-+bv:av.localeCompare(bv));});
 rows.forEach(r=>table.tBodies[0].append(r));
}
function showSearch(value){
 const box=document.querySelector('#search-results'),query=value.trim().toLowerCase();
 if(!query){box.innerHTML='';return;}
 const results=searchIndex.filter(s=>(s.title+' '+s.keywords).toLowerCase().includes(query)).slice(0,6);
 box.innerHTML=results.length?results.map(s=>`<a href="#/${s.route}">${s.title} <span style="float:right">↗</span></a>`).join(''):'<p>No matching statistics. Try GDP, population, wages or a province name.</p>';
}
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
document.querySelector('#menu').addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')!=='true';e.currentTarget.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('expanded',open);});
render();
