'use strict';
const CORE='kyoto-core-v1.0.0', AUDIO='kyoto-audio-v1';
const FILES=['./','./index.html','./style.css','./app.js','./content.js','./extras.js','./audio.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CORE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kyoto-core-')&&k!==CORE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url),base=new URL(self.registration.scope);
 if(req.method!=='GET'||url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
 if(url.pathname.endsWith('.mp3')){
  event.respondWith((async()=>{
   const cached=await (await caches.open(AUDIO)).match(url.href);
   if(!cached)return fetch(req);
   const range=req.headers.get('Range');if(!range)return cached;
   const bytes=await cached.arrayBuffer(),length=bytes.byteLength;
   const match=/^bytes=(\d*)-(\d*)$/.exec(range.trim());
   if(!match)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
   let start,end;
   if(!match[1]){start=Math.max(0,length-Number(match[2]));end=length-1}
   else{start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),length-1):length-1}
   if(!Number.isFinite(start)||start<0||start>=length||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
   return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':'audio/mpeg','Content-Range':`bytes ${start}-${end}/${length}`,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});
  })());return;
 }
 if(req.mode==='navigate'||FILES.some(p=>new URL(p,self.registration.scope).pathname===url.pathname))event.respondWith((async()=>{
  const cache=await caches.open(CORE);
  try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}
  catch{const cached=await cache.match(req);if(cached)return cached;if(req.mode==='navigate')return (await cache.match('./index.html'))||Response.error();return Response.error()}
 })());
});
