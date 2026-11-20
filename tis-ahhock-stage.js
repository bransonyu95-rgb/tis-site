/* A small stage for the 3D Ah Hock on any page: TISStage(canvas, {onReady, onFail}).
   It loads three.js, the model and the rig (tis-ahhock-rig.js, the Film Kit port), then keeps him alive:
   he blinks, sways, follows the mouse or finger, and wears whatever pose and face the page asks for.
     st.show(pose, face)   names from the Film Kit, e.g. st.show('wave', 'happy')
     st.talk(ms)           his mouth moves for that long
     st.view('photo'|'story')   close on the face, or wide enough for the arms
     st.hop()              one small hop */
(function(){
'use strict';
function loadJs(src, ok, bad){ var s = document.createElement('script'); s.src = src; s.async = true; s.onload = ok; s.onerror = bad; document.head.appendChild(s); }
window.TISStage = function(canvas, opt){
  opt = opt || {};
  var hopAt = -1e9;
  var api = { ready: false, pose: 'neutral', face: '', talkUntil: 0, cam: 'photo',
    show: function(p, f){ api.pose = p; api.face = f || ''; }, talk: function(ms){ api.talkUntil = performance.now() + ms; },
    view: function(n){ api.cam = n; }, hop: function(){ hopAt = performance.now(); } };
  function fail(){ if (opt.onFail) opt.onFail(); }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { fail(); return api; }
  function start(){
    if (!window.THREE || !THREE.GLTFLoader || !window.TISRig) { fail(); return; }
    var renderer; try { renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); } catch (e) { fail(); return; }
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc6b8, 0.95));
    var key = new THREE.DirectionalLight(0xfff3e2, 0.85); key.position.set(-2.4, 3.2, 3.2); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffffff, 0.4); rim.position.set(2.2, 2.4, -3); scene.add(rim);
    var CAMS = { photo: [1.27, 1.95], story: [1.08, 3.2] }, cy = CAMS.photo[0], cz = CAMS.photo[1], lw = 0, lh = 0;
    function size(){ var w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h || (w === lw && h === lh)) return; lw = w; lh = h; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    new THREE.GLTFLoader().load((opt.model || 'assets/ah-hock.glb'), function(g){
      var root = g.scene; scene.add(root); root.updateMatrixWorld(true);
      var hero = root.getObjectByName('HERO_AhHock') || root;
      function grp(names, x, y, z){ var gr = new THREE.Group(); gr.position.set(x, y, z); hero.add(gr); gr.updateMatrixWorld(true);
        names.forEach(function(n){ var o = root.getObjectByName(n); if (o) gr.attach(o); }); return gr; }
      var head = grp(['AH_head','AH_ear_L','AH_ear_R','AH_eye_L','AH_eye_R','AH_glint_L','AH_glint_R','AH_brow_L','AH_brow_R','AH_nose','AH_mouth'], 0, 1.02, 0);
      var armL = grp(['AH_sleeve_L','AH_forearm_L','AH_hand_L'], 0.255, 0.90, 0), armR = grp(['AH_sleeve_R','AH_forearm_R','AH_hand_R'], -0.255, 0.90, 0);
      var RIG; try { RIG = window.TISRig.build(THREE, { root: root, hero: hero, head: head, armL: armL, armR: armR }); } catch (e) { fail(); return; }
      var lx = 0, ly = 0, tx = 0, ty = 0, seen = 0, running = false, t0 = performance.now();
      function look(x, y){ if (!isFinite(x) || !isFinite(y)) return; var r = canvas.getBoundingClientRect(); seen = performance.now();
        tx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (window.innerWidth * 0.5))); ty = Math.max(-1, Math.min(1, (y - (r.top + r.height * 0.35)) / (window.innerHeight * 0.5))); }
      window.addEventListener('pointermove', function(e){ look(e.clientX, e.clientY); }, { passive: true });
      window.addEventListener('pointerdown', function(e){ look(e.clientX, e.clientY); }, { passive: true });
      window.addEventListener('touchmove', function(e){ var p = e.touches && e.touches[0]; if (p) look(p.clientX, p.clientY); }, { passive: true });
      function frame(now){
        if (!running) return;
        size();
        var t = (now - t0) / 1000, c = CAMS[api.cam] || CAMS.photo;
        cy += (c[0] - cy) * 0.1; cz += (c[1] - cz) * 0.1; cam.position.set(0, cy, cz); cam.lookAt(0, cy - 0.03, 0);
        if (now - seen > 4000) { tx *= 0.96; ty *= 0.96; }
        if (!isFinite(lx) || !isFinite(ly)) { lx = ly = tx = ty = 0; }
        lx += (tx - lx) * 0.12; ly += (ty - ly) * 0.12;
        var hs = (now - hopAt) / 500, hop = hs < 1 ? Math.abs(Math.sin(hs * Math.PI)) * 0.09 : 0;
        RIG.frame(now, { pose: api.pose, face: api.face, lx: lx, gy: ly, ry: lx * 0.25 + Math.sin(t * 0.7) * 0.03, spin: 0, hop: hop, talk: now < api.talkUntil });
        renderer.render(scene, cam); requestAnimationFrame(frame);
      }
      function check(){ var r = canvas.getBoundingClientRect(), vis = r.bottom > 0 && r.top < window.innerHeight && !document.hidden;
        if (vis && !running) { running = true; requestAnimationFrame(frame); } else if (!vis) running = false; }
      window.addEventListener('scroll', check, { passive: true }); window.addEventListener('resize', check); document.addEventListener('visibilitychange', check);
      api.ready = true; api.rig = RIG; check(); if (opt.onReady) opt.onReady(api);
    }, undefined, fail);
  }
  function rig(){ if (window.TISRig) start(); else loadJs('tis-ahhock-rig.js', start, fail); }
  function gltf(){ if (window.THREE && THREE.GLTFLoader) rig(); else loadJs('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js', rig, fail); }
  var go = function(){ if (window.THREE) gltf(); else loadJs('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', gltf, fail); };
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 1000 }); else setTimeout(go, 150);
  return api;
};
})();
