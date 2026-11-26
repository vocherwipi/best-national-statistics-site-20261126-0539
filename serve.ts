import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const appDirectory=fileURLToPath(new URL('./app/',import.meta.url));
const portArgument=process.argv.indexOf('--port');
const port=portArgument<0?8080:Number(process.argv[portArgument+1]);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'};
createServer((req,res)=>{
 try {
 const path=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname);
 const target=resolve(appDirectory,'.'+(path.endsWith('/')?path+'index.html':path));
 if(!target.startsWith(resolve(appDirectory)+sep)){res.writeHead(403).end('Access denied');return;}
 const contents=readFileSync(target);
 res.writeHead(200,{'Content-Type':(types[extname(target)]||'application/octet-stream')+'; charset=utf-8','Cache-Control':'no-store'});res.end(contents);
 }catch{res.writeHead(404).end('File not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Meridia is available at http://localhost:${port}`));
