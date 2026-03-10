/* ===================================================
   FRONTEND UNIVERSE — UNIVERSE ENGINE
   Three.js Galaxy · Custom Cursor · GSAP Animations
   Magnetic Buttons · Stats Counter · Premium UX
   =================================================== */

'use strict';

// =============================================
//   CUSTOM CURSOR
// =============================================
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch

  const cursor = document.createElement('div');
  cursor.id = 'fu-cursor';
  cursor.innerHTML = '<div class="cu-dot"></div><div class="cu-ring"></div>';
  document.body.appendChild(cursor);

  const dot  = cursor.querySelector('.cu-dot');
  const ring = cursor.querySelector('.cu-ring');

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let isHovering = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  // Lerp ring
  (function lerp() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${isHovering ? 2 : 1})`;
    requestAnimationFrame(lerp);
  })();

  // Hover states
  const hoverTargets = 'a, button, .glass-card, .stage-card, .sidebar-item, .fw-card, .project-card, .challenge-card, .concept-card, .tool-card, .resource-card, .planet-label';
  document.querySelectorAll(hoverTargets).forEach(applyHoverCursor);

  const obs = new MutationObserver(() => {
    document.querySelectorAll(hoverTargets).forEach(applyHoverCursor);
  });
  obs.observe(document.body, { childList: true, subtree: true });

  function applyHoverCursor(el) {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = '1';
    el.addEventListener('mouseenter', () => { isHovering = true; cursor.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { isHovering = false; cursor.classList.remove('hovering'); });
  }

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
}

// =============================================
//   THREE.JS GALAXY
// =============================================
function initGalaxy() {
  const canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;

  function tryInit() {
    if (typeof THREE === 'undefined') { setTimeout(tryInit, 100); return; }
    buildGalaxy(canvas);
  }
  tryInit();
}

function buildGalaxy(canvas) {
  const THREE = window.THREE;

  // Scene + Camera + Renderer
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 500);
  camera.position.set(0, 1.5, 10);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  // Lighting
  scene.add(new THREE.AmbientLight(0x111133, 3));
  const sun = new THREE.PointLight(0x00d4ff, 4, 40);
  sun.position.set(0, 4, 6);
  scene.add(sun);

  // Framework Planet Data
  const FW = [
    { name: 'React',         color: 0x61dafb, pos: [-3.0,  0.8, -1.5], r: 0.65, section: 'paths', 
      concepts: ['Components','Hooks','State','Props','Context','Virtual DOM'] },
    { name: 'Vue.js',        color: 0x42b883, pos: [ 3.2, -0.5, -2.0], r: 0.55, section: 'paths',
      concepts: ['Composition API','Directives','Reactivity','Pinia','Router','Templates'] },
    { name: 'Next.js',       color: 0xffffff, pos: [ 0.4,  2.8, -3.5], r: 0.60, section: 'paths',
      concepts: ['App Router','SSR','SSG','ISR','Middleware','Edge Runtime'] },
    { name: 'React Native',  color: 0x61dafb, pos: [ 1.8, -2.5, -1.2], r: 0.50, section: 'paths',
      concepts: ['Navigation','Native Modules','Expo','Animations','Platform APIs','Camera'] }
  ];

  // Groups
  const galaxyGroup = new THREE.Group();
  scene.add(galaxyGroup);

  const planets    = [];
  const nodeObjs   = [];
  const raycaster  = new THREE.Raycaster();
  const mouse      = new THREE.Vector2(-999, -999);

  // Create planet + halo + ring + concept nodes
  FW.forEach((fw, fi) => {
    const [px, py, pz] = fw.pos;

    // Planet sphere
    const geo  = new THREE.SphereGeometry(fw.r, 40, 40);
    const mat  = new THREE.MeshPhongMaterial({
      color: fw.color, emissive: fw.color,
      emissiveIntensity: 0.25, shininess: 120,
      transparent: true, opacity: 0.92
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(px, py, pz);
    mesh.userData = { type: 'planet', fw: fw.name, section: fw.section, idx: fi };
    galaxyGroup.add(mesh);

    // Glow halo (outer transparent sphere)
    const haloGeo = new THREE.SphereGeometry(fw.r * 2.2, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: fw.color, transparent: true,
      opacity: 0.035, side: THREE.BackSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(mesh.position);
    galaxyGroup.add(halo);

    // Inner atmosphere
    const atmGeo = new THREE.SphereGeometry(fw.r * 1.3, 24, 24);
    const atmMat = new THREE.MeshBasicMaterial({
      color: fw.color, transparent: true,
      opacity: 0.07, side: THREE.BackSide
    });
    const atm = new THREE.Mesh(atmGeo, atmMat);
    atm.position.copy(mesh.position);
    galaxyGroup.add(atm);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(fw.r * 3.2, 0.018, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: fw.color, transparent: true, opacity: 0.18 });
    const ring    = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(mesh.position);
    ring.rotation.x = 0.4 + fi * 0.15;
    ring.rotation.z = fi * 0.3;
    galaxyGroup.add(ring);

    // Connecting lines between planets (gossamer)
    if (fi > 0) {
      const prev = FW[fi - 1];
      const pts  = [
        new THREE.Vector3(...prev.pos),
        new THREE.Vector3(px, py, pz)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({ color: fw.color, transparent: true, opacity: 0.07 });
      galaxyGroup.add(new THREE.Line(lineGeo, lineMat));
    }

    planets.push({ mesh, halo, atm, ring, fw, baseScale: 1, hovered: false, fi });

    // Concept nodes orbiting the planet
    fw.concepts.forEach((concept, ci) => {
      const baseAngle  = (ci / fw.concepts.length) * Math.PI * 2;
      const orbitR     = fw.r * 4.2 + ci * 0.08;
      const speed      = 0.18 + ci * 0.04;
      const tiltAngle  = 0.3 + fi * 0.12;

      const nGeo = new THREE.SphereGeometry(0.07, 12, 12);
      const nMat = new THREE.MeshBasicMaterial({ color: fw.color, transparent: true, opacity: 0.75 });
      const node = new THREE.Mesh(nGeo, nMat);
      node.userData = { type: 'concept', concept, fw: fw.name, baseAngle, orbitR, speed, tiltAngle,
                        parentPos: new THREE.Vector3(...fw.pos) };
      galaxyGroup.add(node);
      nodeObjs.push(node);
    });
  });

  // Starfield
  const starCount = 3000;
  const starPosArr = new Float32Array(starCount * 3);
  const starColArr = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPosArr[i*3]   = (Math.random() - 0.5) * 120;
    starPosArr[i*3+1] = (Math.random() - 0.5) * 120;
    starPosArr[i*3+2] = (Math.random() - 0.5) * 80 - 20;
    const c = Math.random();
    if (c < 0.25) { starColArr[i*3]=0.6; starColArr[i*3+1]=0.9; starColArr[i*3+2]=1.0; }
    else if (c < 0.45) { starColArr[i*3]=0.65; starColArr[i*3+1]=0.5; starColArr[i*3+2]=1.0; }
    else { starColArr[i*3]=1; starColArr[i*3+1]=1; starColArr[i*3+2]=1; }
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(starPosArr, 3));
  sGeo.setAttribute('color',    new THREE.BufferAttribute(starColArr, 3));
  const sMat  = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.85 });
  const stars = new THREE.Points(sGeo, sMat);
  scene.add(stars);

  // Nebula particles
  const nebCount = 600;
  const nebPos   = new Float32Array(nebCount * 3);
  const nebCol   = new Float32Array(nebCount * 3);
  for (let i = 0; i < nebCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rad   = 3 + Math.random() * 8;
    nebPos[i*3]   = Math.cos(angle) * rad;
    nebPos[i*3+1] = (Math.random() - 0.5) * 4;
    nebPos[i*3+2] = Math.sin(angle) * rad - 5;
    const t = Math.random();
    nebCol[i*3]   = t < 0.5 ? 0.0 : 0.65;
    nebCol[i*3+1] = t < 0.5 ? 0.7 : 0.5;
    nebCol[i*3+2] = t < 0.5 ? 1.0 : 1.0;
  }
  const nGeo = new THREE.BufferGeometry();
  nGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
  nGeo.setAttribute('color',    new THREE.BufferAttribute(nebCol, 3));
  const nMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.12 });
  const nebula = new THREE.Points(nGeo, nMat);
  scene.add(nebula);

  // Mouse drag rotation
  let isDragging  = false;
  let lastX = 0, lastY = 0;
  let targetRotY  = 0, targetRotX  = 0;
  let currentRotY = 0, currentRotX = 0;

  canvas.addEventListener('mousedown', e => { isDragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing'; });
  document.addEventListener('mouseup', () => { isDragging = false; canvas.style.cursor = ''; });
  canvas.addEventListener('mousemove', e => {
    if (isDragging) {
      targetRotY += (e.clientX - lastX) * 0.004;
      targetRotX += (e.clientY - lastY) * 0.004;
      targetRotX  = Math.max(-0.6, Math.min(0.6, targetRotX));
      lastX = e.clientX; lastY = e.clientY;
    }
    const rect = canvas.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
  });

  canvas.addEventListener('mouseleave', () => { mouse.set(-999, -999); });

  // Tooltip
  const tooltip = document.getElementById('galaxy-tooltip');

  // Click detection
  canvas.addEventListener('click', e => {
    raycaster.setFromCamera(mouse, camera);
    const planetMeshes = planets.map(p => p.mesh);
    const hits         = raycaster.intersectObjects([...planetMeshes, ...nodeObjs]);
    if (hits.length > 0) {
      const ud = hits[0].object.userData;
      if (ud.section) {
        if (typeof scrollToSection === 'function') scrollToSection(ud.section);
        if (typeof showToast === 'function') showToast(`Exploring ${ud.fw} universe →`, 'success');
      }
    }
  });

  // Animate
  let t = 0;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    t += delta;

    // Auto rotate + drag
    if (!isDragging) targetRotY += 0.0008;
    currentRotY += (targetRotY - currentRotY) * 0.05;
    currentRotX += (targetRotX - currentRotX) * 0.05;
    galaxyGroup.rotation.y = currentRotY;
    galaxyGroup.rotation.x = currentRotX;

    // Planet pulse & spin
    planets.forEach((pl, i) => {
      pl.mesh.rotation.y += 0.004;
      pl.halo.material.opacity = 0.03 + Math.sin(t * 1.5 + i * 1.2) * 0.015;
      pl.atm.material.opacity  = 0.06 + Math.sin(t * 1.0 + i * 0.8) * 0.02;
      pl.ring.rotation.z       += 0.002 + i * 0.001;
    });

    // Concept nodes orbit
    nodeObjs.forEach(node => {
      const { baseAngle, orbitR, speed, tiltAngle, parentPos } = node.userData;
      const angle = baseAngle + t * speed;
      const cosT = Math.cos(tiltAngle);
      const sinT = Math.sin(tiltAngle);
      node.position.x = parentPos.x + Math.cos(angle) * orbitR;
      node.position.y = parentPos.y + Math.sin(angle) * orbitR * cosT * 0.4;
      node.position.z = parentPos.z + Math.sin(angle) * orbitR * sinT * 0.2;
    });

    // Stars drift
    stars.rotation.y = t * 0.008;

    // Hover detection
    raycaster.setFromCamera(mouse, camera);
    const allHoverables = [...planets.map(p => p.mesh), ...nodeObjs];
    const hovered = raycaster.intersectObjects(allHoverables);

    // Reset
    planets.forEach(pl => {
      if (pl.hovered) {
        pl.mesh.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
      }
    });

    if (hovered.length > 0) {
      const ud = hovered[0].object.userData;
      if (ud.type === 'planet') {
        const pl = planets[ud.idx];
        pl.hovered = true;
        pl.mesh.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
        canvas.style.cursor = 'pointer';
        if (tooltip) {
          const pos = hovered[0].object.position.clone().project(camera);
          tooltip.style.left = ((pos.x + 1) / 2 * canvas.offsetWidth) + 'px';
          tooltip.style.top  = ((-pos.y + 1) / 2 * canvas.offsetHeight - 48) + 'px';
          tooltip.textContent = ud.fw;
          tooltip.classList.add('visible');
        }
      } else if (ud.type === 'concept') {
        canvas.style.cursor = 'pointer';
        if (tooltip) {
          const pos = hovered[0].object.position.clone().project(camera);
          tooltip.style.left = ((pos.x + 1) / 2 * canvas.offsetWidth) + 'px';
          tooltip.style.top  = ((-pos.y + 1) / 2 * canvas.offsetHeight - 32) + 'px';
          tooltip.textContent = `${ud.fw}: ${ud.concept}`;
          tooltip.classList.add('visible');
        }
      }
    } else {
      canvas.style.cursor = '';
      if (tooltip) tooltip.classList.remove('visible');
    }

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    if (!W || !H) return;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });
}

// =============================================
//   MAGNETIC BUTTONS
// =============================================
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const targets = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-xl');
  targets.forEach(el => {
    let raf;
    el.addEventListener('mousemove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) * 0.28;
        const dy   = (e.clientY - cy) * 0.28;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
}

// =============================================
//   STATS COUNTER
// =============================================
function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1400;
      const start = performance.now();
      obs.unobserve(el);

      (function tick(now) {
        const p   = Math.min((now - start) / dur, 1);
        const val = Math.round(easeOutQuart(p) * end);
        el.textContent = el.dataset.suffix ? val + el.dataset.suffix : val;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.suffix ? end + el.dataset.suffix : end;
      })(start);
    });
  }, { threshold: 0.3 });

  stats.forEach(el => obs.observe(el));

  function easeOutQuart(x) { return 1 - Math.pow(1 - x, 4); }
}

// =============================================
//   GSAP-STYLE SCROLL REVEALS
// =============================================
function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .sr-hidden { opacity:0; transform:translateY(32px); transition:opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
    .sr-hidden.sr-left  { transform:translateX(-32px) translateY(0); }
    .sr-hidden.sr-right { transform:translateX(32px) translateY(0); }
    .sr-hidden.sr-scale { transform:scale(0.92); }
    .sr-visible { opacity:1; transform:none; }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.glass-card, .stage-card, .section-header, .fw-card, .project-card, .challenge-card, .tool-card, .resource-card, .concept-card, .q-item, [data-sr]');
  targets.forEach(el => el.classList.add('sr-hidden'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const siblings = Array.from(el.parentElement?.children || [el]);
      const idx  = siblings.indexOf(el);
      setTimeout(() => el.classList.add('sr-visible'), Math.min(idx * 50, 350));
      obs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => obs.observe(el));
}

// =============================================
//   HERO PARALLAX
// =============================================
function initParallax() {
  const hero = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.18}px)`;
      heroContent.style.opacity   = 1 - (y / window.innerHeight) * 1.2;
    }
  }, { passive: true });
}

// =============================================
//   NOISE TEXTURE OVERLAY
// =============================================
function initNoiseOverlay() {
  const canvas = document.createElement('canvas');
  canvas.width  = 256;
  canvas.height = 256;
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99999;opacity:0.025;mix-blend-mode:overlay;';
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i]=img.data[i+1]=img.data[i+2]=v;
    img.data[i+3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  document.body.appendChild(canvas);
}

// =============================================
//   SECTION ACTIVE GLOW LINE
// =============================================
function initSectionGlow() {
  const sections = document.querySelectorAll('.section, .hero-section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      e.target.classList.toggle('section-active', e.isIntersecting);
    });
  }, { threshold: 0.2 });
  sections.forEach(s => obs.observe(s));
}

// =============================================
//   SMOOTH SCROLL WITH MOMENTUM (no deps)
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// =============================================
//   PAGE LOAD CINEMATIC
// =============================================
function initLoadCinematic() {
  const loader = document.getElementById('fu-loader');
  if (!loader) return;

  // Wait a tick then fade out
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.remove(), 600);
      document.body.classList.add('fu-loaded');
    }, 900);
  });
}

// =============================================
//   ARCHITECTURE MAP (Canvas-based)
// =============================================
function initArchMap() {
  const canvas = document.getElementById('arch-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const W    = canvas.offsetWidth  || 800;
  const H    = canvas.offsetHeight || 480;
  canvas.width  = W;
  canvas.height = H;

  const nodes = [
    { id: 'react',     label: 'React',         x: W*0.20, y: H*0.30, color: '#61dafb', r: 40 },
    { id: 'nextjs',    label: 'Next.js',        x: W*0.50, y: H*0.20, color: '#ffffff', r: 36 },
    { id: 'vue',       label: 'Vue.js',         x: W*0.80, y: H*0.30, color: '#42b883', r: 36 },
    { id: 'vite',      label: 'Vite',           x: W*0.15, y: H*0.65, color: '#ffc947', r: 30 },
    { id: 'webpack',   label: 'Webpack',        x: W*0.35, y: H*0.72, color: '#ff5c6c', r: 28 },
    { id: 'tailwind',  label: 'Tailwind',       x: W*0.55, y: H*0.68, color: '#38bdf8', r: 30 },
    { id: 'redux',     label: 'Redux',          x: W*0.72, y: H*0.72, color: '#a78bfa', r: 28 },
    { id: 'jest',      label: 'Jest',           x: W*0.87, y: H*0.65, color: '#4ade80', r: 28 },
    { id: 'ts',        label: 'TypeScript',     x: W*0.50, y: H*0.88, color: '#3178c6', r: 32 },
  ];

  const edges = [
    ['react','nextjs'],['react','vite'],['react','webpack'],['react','redux'],
    ['vue','vite'],['vue','tailwind'],['nextjs','ts'],['react','ts'],
    ['tailwind','ts'],['redux','ts'],['jest','react'],['jest','vue'],
    ['nextjs','webpack'],['vue','webpack'],
  ];

  let hoveredNode = null;
  let animT = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw edges
    edges.forEach(([a, b]) => {
      const na = nodes.find(n => n.id === a);
      const nb = nodes.find(n => n.id === b);
      if (!na || !nb) return;
      const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
      grad.addColorStop(0, na.color + '30');
      grad.addColorStop(1, nb.color + '30');
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([6, 8]);
      ctx.lineDashOffset = -animT * 0.5;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHov = hoveredNode === node.id;
      const scale = isHov ? 1.15 : 1;

      // Glow
      const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 2.5 * scale);
      grd.addColorStop(0, node.color + '30');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 2.5 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Circle
      ctx.fillStyle = node.color + '15';
      ctx.strokeStyle = node.color + (isHov ? 'cc' : '60');
      ctx.lineWidth = isHov ? 2 : 1.5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Label
      ctx.fillStyle = isHov ? '#ffffff' : node.color;
      ctx.font = `${isHov ? '600' : '500'} ${Math.round(11 * scale)}px 'DM Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });

    animT++;
    requestAnimationFrame(draw);
  }
  draw();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let found = null;
    nodes.forEach(n => {
      if (Math.hypot(x - n.x, y - n.y) < n.r * 1.3) found = n.id;
    });
    hoveredNode = found;
    canvas.style.cursor = found ? 'pointer' : '';
  });

  canvas.addEventListener('mouseleave', () => { hoveredNode = null; });
}

// =============================================
//   INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initLoadCinematic();
  initCursor();
  initGalaxy();
  initMagneticButtons();
  initStatsCounter();
  initScrollReveal();
  initParallax();
  initNoiseOverlay();
  initSectionGlow();
  initSmoothScroll();
  setTimeout(initArchMap, 200);
});
