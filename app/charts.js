const palette=['#087f83','#224a68','#d5a65a','#7c9ca5'];
const frame=(body,label,w=650,h=210)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>`;
const text=(x,y,v,anchor='middle',extra='')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" ${extra}>${v}</text>`;
export function lineChart(data,options={}){return timeChart(data,{...options,type:'line'});}
export function barChart(data,options={}){return timeChart(data,{...options,type:'bar'});}
function timeChart(data,{label='Time series',unit='',selected=2025,type}){
 const w=650,h=210,left=46,right=34,top=20,bottom=33,inner=w-left-right;
 const max=Math.ceil(Math.max(...data.map(d=>d.value))*1.13/5)*5;
 const y=v=>h-bottom-v/max*(h-top-bottom),x=i=>left+(i+.5)*inner/data.length;
 let body='';
 for(let i=0;i<=4;i++){const v=max*i/4;body+=`<line x1="${left}" y1="${y(v)}" x2="${w-right}" y2="${y(v)}" class="gridline"/>`+text(left-9,y(v)+4,Number(v.toFixed(1)),'end');}
 data.forEach((d,i)=>{if(i%2===0||data.length<9)body+=text(x(i),h-10,d.label);});
 if(type==='line'){
 const pts=data.map((d,i)=>`${x(i)},${y(d.value)}`).join(' ');
 body+=`<polygon points="${x(0)},${y(0)} ${pts} ${x(data.length-1)},${y(0)}" fill="#087f83" opacity=".07"/><polyline points="${pts}" fill="none" stroke="#087f83" stroke-width="3" stroke-linejoin="round"/>`;
 data.forEach((d,i)=>body+=`<circle cx="${x(i)}" cy="${y(d.value)}" r="${+d.label===+selected?5:3}" fill="${+d.label===+selected?'#102c40':'#087f83'}"><title>${d.label}: ${d.value.toFixed(2)} ${unit}</title></circle>`);
 }else data.forEach((d,i)=>{const bw=inner/data.length*.56;body+=`<rect x="${x(i)-bw/2}" y="${y(d.value)}" width="${bw}" height="${y(0)-y(d.value)}" rx="2" fill="${+d.label===+selected?'#102c40':'#087f83'}"><title>${d.label}: ${d.value.toFixed(2)} ${unit}</title></rect>`;});
 const i=data.findIndex(d=>+d.label===+selected);if(i>=0)body+=text(x(i),Math.max(13,y(data[i].value)-12),data[i].value.toFixed(1),'middle','class="point-label"');
 return frame(body,label);
}
export function horizontalBars(data,{label='Comparison',unit=''}={}){
 const w=540,h=data.length*36+24,max=Math.max(...data.map(d=>d.value))*1.15;
 return frame(data.map((d,i)=>{const y=i*36+13,width=(w-184)*d.value/max;return text(0,y+12,d.label,'start')+`<rect x="116" y="${y}" width="${width}" height="19" rx="2" fill="${d.color||palette[i%2]}"><title>${d.label}: ${d.value} ${unit}</title></rect>`+text(124+width,y+14,d.value.toLocaleString('en-GB',{maximumFractionDigits:1}),'start','class="bar-value"');}).join(''),label,w,h);
}
export function donut(data,{label='GDP by sector',center='2025',sub='GDP share'}={}){
 const sum=data.reduce((s,d)=>s+d.value,0),r=67,c=2*Math.PI*r;let offset=0;
 const rings=data.map((d,i)=>{const size=d.value/sum*c,ring=`<circle cx="105" cy="100" r="${r}" fill="none" stroke="${d.color||palette[i]}" stroke-width="25" stroke-dasharray="${size} ${c-size}" stroke-dashoffset="${-offset}" transform="rotate(-90 105 100)"><title>${d.label}: ${d.value}%</title></circle>`;offset+=size;return ring;}).join('');
 return frame(rings+text(105,99,center,'middle','class="donut-center"')+text(105,119,sub)+data.map((d,i)=>`<rect x="220" y="${48+i*43}" width="9" height="9" rx="2" fill="${d.color||palette[i]}"/>`+text(238,57+i*43,d.label,'start')+text(410,57+i*43,d.value+'%','end','class="bar-value"')).join(''),label,430,200);
}
export function pyramid(data){
 let body=text(170,18,'Male · millions')+text(420,18,'Female · millions');
 [...data].reverse().forEach((d,i)=>{const y=34+i*32,m=d.male/2.5*185,f=d.female/2.5*185;body+=`<rect x="${265-m}" y="${y}" width="${m}" height="23" fill="#224a68"/><rect x="310" y="${y}" width="${f}" height="23" fill="#087f83"/>`+text(287,y+16,d.name)+text(260-m,y+16,d.male,'end')+text(315+f,y+16,d.female,'start');});
 return frame(body,'2025 population by age and sex, millions',580,205);
}
