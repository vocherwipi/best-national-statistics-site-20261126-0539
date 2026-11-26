export const years = Array.from({length:11},(_,i)=>2015+i);
const population=[16.8,16.96,17.12,17.28,17.44,17.58,17.72,17.89,18.06,18.23,18.4];
const gdp=[320,335,354,376,398,389,425,465,498,526,552];
const unemployment=[7.4,7.1,6.8,6.3,5.9,7.8,7.2,6.5,5.9,5.5,5.2];
const inflation=[1.2,1.4,1.8,2.1,1.6,0.7,3.1,6.2,4.1,2.8,2.3];
let index=100;
export const annual=years.map((year,i)=>{
 if(i) index*=1+inflation[i]/100;
 return {year,population:population[i]*1e6,gdp:gdp[i],gdpPerCapita:gdp[i]*1000/population[i],unemployment:unemployment[i],inflation:inflation[i],cpi:index,life:77.1+i*.22,wage:2140+i*70,labourForce:8.7+i*.09};
});
export const latest=annual.at(-1);
export const provinces=[
 {name:'Avelin',population:4200000,gdp:168,unemployment:4.4,description:'The capital province and Meridia’s centre for finance, public services and research.'},
 {name:'Teren Coast',population:3100000,gdp:108.5,unemployment:4.8,description:'A maritime province connecting Meridia’s ports, logistics and coastal industries.'},
 {name:'Luma Valley',population:2600000,gdp:78,unemployment:5.1,description:'A productive river valley with food processing, agriculture and growing towns.'},
 {name:'Orin Plains',population:2300000,gdp:59.8,unemployment:5.6,description:'Broad inland plains supporting grain production and light manufacturing.'},
 {name:'Selva',population:1900000,gdp:45.6,unemployment:5.9,description:'Forested uplands with sustainable timber, tourism and renewable energy.'},
 {name:'Veyra',population:1700000,gdp:35.7,unemployment:6,description:'A western province of market towns, engineering workshops and orchards.'},
 {name:'Neris',population:1500000,gdp:31.5,unemployment:5.8,description:'A northern lake province with fisheries, freshwater research and local services.'},
 {name:'Caldra',population:1100000,gdp:24.9,unemployment:5.9,description:'A southern plateau known for mineral processing and solar generation.'}
].map(p=>({...p,gdpPerCapita:p.gdp*1e9/p.population}));
export const sectors=[{name:'Services',share:62,employment:67,color:'#087f83'},{name:'Industry',share:28,employment:23,color:'#224a68'},{name:'Agriculture',share:10,employment:10,color:'#d5a65a'}];
export const categories=[{name:'Food',weight:30,inflation:2.8},{name:'Housing',weight:35,inflation:2.4},{name:'Transport',weight:20,inflation:1.7},{name:'Energy',weight:15,inflation:1.8}];
export const ageBands=[{name:'0–14',male:1.67,female:1.61},{name:'15–29',male:1.79,female:1.73},{name:'30–44',male:2.02,female:2.02},{name:'45–64',male:2.27,female:2.33},{name:'65+',male:1.31,female:1.65}];
export const flows={births:218000,deaths:166000,migration:118000};
export const fiscal={exports:186,imports:172,revenue:176,spending:184};
export const releases=[{date:'20 NOV 2026',title:'Meridia in figures: the 2025 edition',route:'methods',tag:'Annual overview'},{date:'17 NOV 2026',title:'Economic output reaches M₥552 billion',route:'economy',tag:'National accounts'},{date:'12 NOV 2026',title:'Eight provinces, one national picture',route:'regions',tag:'Regional statistics'}];
export const sections=[{id:'economy',name:'Economy',note:'Output, trade & public finances',icon:'↗'},{id:'population',name:'Population',note:'People, ages & demographic change',icon:'◎'},{id:'labour',name:'Labour',note:'Jobs, earnings & unemployment',icon:'▤'},{id:'prices',name:'Prices',note:'Inflation & the cost of living',icon:'◈'},{id:'regions',name:'Regions',note:'Compare all eight provinces',icon:'▥'},{id:'methods',name:'Data & methods',note:'Definitions, sources & calendar',icon:'≡'}];
export const searchIndex=[...sections.map(s=>({title:s.name,keywords:s.note,route:s.id})),{title:'GDP & GDP per capita',keywords:'gross domestic product output trade revenue spending',route:'economy'},{title:'Population & life expectancy',keywords:'births deaths migration age pyramid',route:'population'},{title:'Unemployment & wages',keywords:'employment jobs earnings salary',route:'labour'},{title:'CPI & inflation',keywords:'food housing transport energy consumer',route:'prices'},...provinces.map(p=>({title:p.name,keywords:'province region population',route:'regions/'+encodeURIComponent(p.name)}))];
export const number=(v,d=0)=>Number(v).toLocaleString('en-GB',{minimumFractionDigits:d,maximumFractionDigits:d});
