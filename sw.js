/* Service worker: chạy offline. Dữ liệu văn bản mới luôn ưu tiên lấy từ mạng/máy chủ. */
var CACHE = "luat-vn-v9";
var SHELL = ["./","index.html","style.css","app.js","manifest.webmanifest","icon.svg",
 "data/kb_luat_dansu_dn_tm.js","data/kb_luat_dat_dt_ld.js","data/kb_luat_hs_hc_td_khac.js","data/practice_luat.js","data/practice_luat2.js","data/practice_luat3.js","data/practice_luat4.js","data/kb_luat_ld_da_doc.js","data/kb_luat_da_doc.js","data/sim_luat.js","data/sim_luat2.js","data/kb_luat_thue_hq_dauthau.js","data/practice_luat5.js","data/sim_luat3.js","data/kb_luat_nghi_dinh.js","data/sim_luat4.js","data/vb_index.js","data/kb_luat_nd_thue.js","data/practice_nd_thue.js","data/sim_luat5.js","data/kb_luat_nghi_dinh_dd.js","data/practice_nd_dd.js","data/sim_luat6.js","data/updates.js"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch", function(e){
  var u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  var fresh = /data\/updates\.(js|json)$/.test(u.pathname);
  if (fresh) {
    e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c);});return r;}).catch(function(){return caches.match(e.request);}));
  } else {
    e.respondWith(caches.match(e.request).then(function(m){
      var net = fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c);});return r;}).catch(function(){return m;});
      return m || net;
    }));
  }
});
