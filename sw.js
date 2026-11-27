// Kırılmasın! kapandı: eski önbellekleri silip kendini kaldıran servis çalışanı
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)));
  await self.registration.unregister();
  const cs=await self.clients.matchAll({type:'window'});cs.forEach(c=>{try{c.navigate(c.url);}catch(_){}});
})());});
self.addEventListener('fetch',()=>{});
