// Kırılmasın! çevrimdışı önbellek
const V='kirilmasin-1795506696';
const FILES=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  // kendi dosyalarımız: önce ağ (güncel sürüm), yoksa önbellek
  if(u.origin===location.origin){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return;}
  // yazı tipleri ve Firebase kütüphaneleri: önbellekten, yoksa ağdan
  if(/fonts\.(googleapis|gstatic)\.com|www\.gstatic\.com\/firebasejs/.test(e.request.url)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res;})));}
});
