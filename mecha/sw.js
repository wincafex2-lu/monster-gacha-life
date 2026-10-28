const CACHE='mecha-game-0.10.3-a4d03249bac6aed9';const FILES=["./","./index.html","./lab.html","./crystals.html","./manifest.webmanifest","./assets/abyss-enemies-v07.png","./assets/audio-worker-DgbHgcxx.js","./assets/boss-actions-abyss-front-v4.png","./assets/boss-actions-abyss-pressure-v4.png","./assets/boss-actions-abyss-rear-v4.png","./assets/boss-actions-abyss-v3.png","./assets/boss-actions-forge-v3.png","./assets/boss-actions-orbit-beam-v3.png","./assets/boss-actions-orbit-blade-v3.png","./assets/boss-actions-orbit-v3.png","./assets/boss-pressure-fan-v6.png","./assets/boss-solar-judgment-v1.png","./assets/boss-solar-rush-v1.png","./assets/boss-solar-ward-v1.png","./assets/boss-solar-wings-v1.png","./assets/campaign-bosses-v07.png","./assets/combat-effects-v08.png","./assets/dark-aegis-v1.png","./assets/dark-shield-panel-v2.png","./assets/enemies.png","./assets/final-titan-breath-v2.png","./assets/final-titan-dome-v3.png","./assets/final-titan-judgment-v3.png","./assets/final-titan-pillar-v2.png","./assets/final-titan-rift-v3.png","./assets/flight-r2.png","./assets/game-BqjtAHnz.js","./assets/game-CjmqG6H_.css","./assets/icon-192.png","./assets/icon-512.png","./assets/lab-BHD_cUnl.js","./assets/lab-CmfdwP9a.css","./assets/light-shield-panel-v2.png","./assets/polarity-conversion-v2.png","./assets/remaster-mechas.png","./assets/render-gKZwExC4.js","./assets/scene-props-r3.png","./assets/solar-aegis-v1.png","./assets/star-boss.png","./assets/star-enemies.png","./assets/sun-enemies-v07.png","./assets/support-entities.png"];
const RUNTIME=CACHE+'-scenes',SCENES=["./assets/exit-r32-1-4-open.webp","./assets/exit-r32-2-1-open.webp","./assets/exit-r32-2-2-A-open.webp","./assets/exit-r32-2-3-open.webp","./assets/exit-r32-2-4-open.webp","./assets/exit-r32-3-1-closed.webp","./assets/exit-r32-3-2-closed.webp","./assets/exit-r32-3-3-closed.webp","./assets/exit-r32-3-4-closed.webp","./assets/exit-r32-3-5-open.webp","./assets/exit-r32-3-6-open.webp","./assets/exit-r32-3-7-closed.webp","./assets/exit-r32-4-3-open.webp","./assets/exit-r32-4-7-open.webp","./assets/exit-r32-4-8-open.webp","./assets/exit-r32-final-open.webp","./assets/scene-r32-1-1.webp","./assets/scene-r32-1-2.webp","./assets/scene-r32-1-3.webp","./assets/scene-r32-1-4.webp","./assets/scene-r32-1-5.webp","./assets/scene-r32-2-1.webp","./assets/scene-r32-2-2-A.webp","./assets/scene-r32-2-2-B.webp","./assets/scene-r32-2-3.webp","./assets/scene-r32-2-4.webp","./assets/scene-r32-2-5.webp","./assets/scene-r32-2-6.webp","./assets/scene-r32-3-1.webp","./assets/scene-r32-3-2.webp","./assets/scene-r32-3-3.webp","./assets/scene-r32-3-4.webp","./assets/scene-r32-3-5.webp","./assets/scene-r32-3-6.webp","./assets/scene-r32-3-7.webp","./assets/scene-r32-4-1.webp","./assets/scene-r32-4-2.webp","./assets/scene-r32-4-3.webp","./assets/scene-r32-4-4.webp","./assets/scene-r32-4-5.webp","./assets/scene-r32-4-6.webp","./assets/scene-r32-4-7.webp","./assets/scene-r32-4-8.webp","./assets/scene-r32-final.webp","./assets/scene-final-fractured-v1.webp"],LIMIT=6;
const sceneURLs=new Set(SCENES.map(u=>new URL(u,self.location.href).href));
const optionalURLs=new Set(["./assets/atlas.json","./assets/dawn-light-v07.png","./assets/fusion-dark-v07.png","./assets/fusion-light-v07.png","./assets/mechas.png","./assets/night-mecha-v07.png","./assets/boss-vfx-forge-v1.png","./assets/boss-vfx-orbit-v1.png","./assets/boss-vfx-abyss-v1.png","./assets/scene-final-fractured-v1.webp","./assets/final-titan-idle-v1.webp","./assets/final-titan-rifts-v1.webp","./assets/final-titan-judgment-v1.webp"].map(u=>new URL(u,self.location.href).href));
let mutations=Promise.resolve();
function remember(cache,request,response){
 const job=mutations.catch(()=>{}).then(async()=>{await cache.delete(request,{ignoreVary:true});await cache.put(request,response);const keys=await cache.keys();for(const key of keys.slice(0,Math.max(0,keys.length-LIMIT)))await cache.delete(key);});
 mutations=job;return job;
}
const sceneFlights=new Map();
async function scene(request){
 const key=request.url;
 let job=sceneFlights.get(key);
 if(!job){job=sceneFetch(request);sceneFlights.set(key,job);}
 try{return(await job).clone();}
 finally{if(sceneFlights.get(key)===job)sceneFlights.delete(key);}
}
async function sceneFetch(request){
 const cache=await caches.open(RUNTIME),hit=await cache.match(request,{ignoreVary:true});
 if(hit){await remember(cache,request,hit.clone()).catch(()=>{});return hit;}
 const response=await fetch(request);if(response.ok)await remember(cache,request,response.clone()).catch(()=>{});return response;
}
// A complete new core waits until existing game tabs close before taking over.
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mecha-game-')&&k!==CACHE&&k!==RUNTIME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='CACHE_SECTION')e.waitUntil(Promise.all((e.data.urls??[]).filter(u=>sceneURLs.has(new URL(u,self.location.href).href)).map(u=>scene(new Request(new URL(u,self.location.href))).catch(()=>{}))));});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(sceneURLs.has(e.request.url)){e.respondWith(scene(e.request));return;}
 if(optionalURLs.has(e.request.url)){e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request,{ignoreVary:true});if(hit)return hit;const response=await fetch(e.request);if(response.ok)await c.put(e.request,response.clone()).catch(()=>{});return response;}));return;}
 if(e.request.mode==='navigate'){e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request,{ignoreSearch:true,ignoreVary:true}))||fetch(e.request)));return;}
 e.respondWith(caches.open(CACHE).then(c=>c.match(e.request,{ignoreVary:true})).then(r=>r||fetch(e.request)));
});