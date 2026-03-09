/* ===================================================
   FRONTEND UNIVERSE — APP ENGINE
   Interactive learning platform logic
   =================================================== */

'use strict';

// ===== GLOBAL STATE =====
const State = {
  theme: localStorage.getItem('fu-theme') || 'dark',
  currentFw: 'react',
  currentLesson: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  progress: JSON.parse(localStorage.getItem('fu-progress') || '{}'),
  activePathTab: 'react',
  activeInterviewTab: 'react'
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initParticles();
  initTypingAnimation();
  initScrollBehavior();
  renderFrameworks();
  renderPaths();
  renderLessonSidebar();
  renderConcepts();
  renderProjects();
  renderChallenges();
  renderTools();
  renderInterview();
  renderQuiz();
  renderResources();
  initPlayground();
  initSearch();
  initRevealAnimations();
});

// ===== THEME =====
function applyTheme() {
  document.documentElement.setAttribute('data-theme', State.theme);
}

document.getElementById('theme-btn').addEventListener('click', () => {
  State.theme = State.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('fu-theme', State.theme);
  applyTheme();
  const icon = document.getElementById('theme-icon');
  icon.style.transform = 'rotate(360deg)';
  setTimeout(() => { icon.style.transform = ''; }, 400);
});

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const SYMBOLS = ['<', '>', '{', '}', '(', ')', '=>', '/>', '[]', '&&', '||', '...', 'fn', '/**/', '=', '+'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.floor((W * H) / 28000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      alpha: Math.random() * 0.12 + 0.03,
      size: Math.random() * 8 + 8,
      color: Math.random() < 0.5 ? '#00d4ff' : Math.random() < 0.5 ? '#a78bfa' : '#ff5c6c'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -50) p.x = W + 50;
      if (p.x > W + 50) p.x = -50;
      if (p.y < -50) p.y = H + 50;
      if (p.y > H + 50) p.y = -50;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
      ctx.fillText(p.sym, p.x, p.y);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const words = ['Vue', 'React Native', 'Next.js', 'Beautiful'];
  const el = document.getElementById('typing-target');
  if (!el) return;

  // Add cursor
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.after(cursor);

  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  setTimeout(type, 2000);
}

// ===== SCROLL BEHAVIOR =====
function initScrollBehavior() {
  const nav = document.getElementById('main-nav');
  const progressBar = document.getElementById('progress-bar');

  const updateScroll = () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 60);

    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrollY / total) * 100}%`;

    // Active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      link.classList.toggle('active', top >= -100 && top < window.innerHeight / 2);
    });
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ===== MOBILE NAV =====
document.getElementById('nav-hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
  const targets = document.querySelectorAll('.section-header, .glass-card, .stage-card, .q-item');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || [el]);
        const idx = siblings.indexOf(el);
        setTimeout(() => {
          el.classList.add('visible');
        }, Math.min(idx * 60, 400));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ===== FRAMEWORKS =====
function renderFrameworks() {
  const grid = document.getElementById('frameworks-grid');
  if (!grid) return;

  grid.innerHTML = FU_DATA.frameworks.map(fw => {
    const logoHtml = fw.logo
      ? `<img src="${fw.logo}" alt="${fw.name}" onerror="this.outerHTML='<span style=\\'font-size:32px\\'>${fw.emoji}</span>'" />`
      : `<span style="font-size:30px">${fw.emoji}</span>`;

    return `<div class="glass-card fw-card fw-${fw.id}" onclick="scrollToSection('paths')" style="border-top: 2px solid ${fw.color}22">
      <div class="fw-logo" style="border-color: ${fw.color}25">${logoHtml}</div>
      <div class="fw-name" style="color: ${fw.color}">${fw.name}</div>
      <p class="fw-desc">${fw.desc}</p>
      <div class="fw-tags">
        ${fw.tags.map(t => `<span class="fw-tag">${t}</span>`).join('')}
      </div>
      <div class="fw-stats">
        <div class="fw-stat"><strong>${fw.lessons}</strong>Lessons</div>
        <div class="fw-stat"><strong>${fw.projects}</strong>Projects</div>
        <div class="fw-stat"><strong>${fw.hours}h</strong>Content</div>
      </div>
    </div>`;
  }).join('');

  setTimeout(initRevealAnimations, 100);
}

// ===== LEARNING PATHS =====
function renderPaths() {
  const pathTabsEl = document.querySelector('.paths-tabs');
  pathTabsEl?.addEventListener('click', (e) => {
    const tab = e.target.closest('.path-tab');
    if (!tab) return;
    document.querySelectorAll('.path-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    State.activePathTab = tab.dataset.fw;
    renderPathContent();
  });
  renderPathContent();
}

function renderPathContent() {
  const container = document.getElementById('path-content');
  if (!container) return;
  const data = FU_DATA.paths[State.activePathTab];
  if (!data) return;

  container.innerHTML = `<div class="stages-grid">
    ${data.stages.map(s => `
      <div class="stage-card reveal" onclick="openStageLesson('${State.activePathTab}', ${s.num})">
        <div class="stage-num">${String(s.num).padStart(2, '0')}</div>
        <div class="stage-badge ${s.level}">${s.emoji} Stage ${s.num} — ${s.level.charAt(0).toUpperCase() + s.level.slice(1)}</div>
        <div class="stage-title">${s.title}</div>
        <div class="stage-topics">
          ${s.topics.slice(0, 5).map(t => `<div class="stage-topic">${t}</div>`).join('')}
          ${s.topics.length > 5 ? `<div class="stage-topic" style="color: var(--accent-cyan)">+${s.topics.length - 5} more topics</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>`;

  setTimeout(initRevealAnimations, 50);
  container.style.animation = 'none';
  container.offsetHeight;
  container.style.animation = 'fadeIn 0.4s ease';
}

function openStageLesson(fw, stageNum) {
  const stage = FU_DATA.paths[fw]?.stages[stageNum - 1];
  if (!stage) return;
  openModal(`${fw.toUpperCase()} — ${stage.title}`, `
    <div class="stage-badge ${stage.level}" style="display:inline-flex;margin-bottom:16px">${stage.emoji} Stage ${stage.num} — ${stage.level}</div>
    <p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7">
      This stage covers ${stage.topics.length} key topics that will take you to the ${stage.level} level.
    </p>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${stage.topics.map((t, i) => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid var(--border)">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);width:24px">${String(i+1).padStart(2,'0')}</span>
          <span style="font-size:15px;font-weight:500">${t}</span>
        </div>
      `).join('')}
    </div>
    <button class="btn-primary" style="margin-top:24px;width:100%;justify-content:center" onclick="closeModal();scrollToSection('lessons')">
      Start Learning →
    </button>
  `);
}

// ===== LESSONS SIDEBAR =====
function renderLessonSidebar() {
  const sidebar = document.getElementById('lesson-sidebar');
  if (!sidebar) return;

  const allLessons = [
    ...( FU_DATA.lessons.react || []).map(l => ({...l, fw: 'React'})),
    ...( FU_DATA.lessons.nextjs || []).map(l => ({...l, fw: 'Next.js'})),
    ...( FU_DATA.lessons.vue || []).map(l => ({...l, fw: 'Vue.js'})),
  ];

  const groups = {};
  allLessons.forEach(l => {
    const key = `${l.fw} › ${l.group}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(l);
  });

  sidebar.innerHTML = Object.entries(groups).map(([group, lessons]) => `
    <div class="sidebar-group">
      <div class="sidebar-group-title">${group}</div>
      ${lessons.map(l => `
        <div class="sidebar-item" onclick="loadLesson('${l.fw.toLowerCase().replace('.','').replace(' ','')}','${l.id}')" data-id="${l.id}">
          <div class="lesson-dot"></div>
          ${l.title}
        </div>
      `).join('')}
    </div>
  `).join('');
}

function loadLesson(fw, id) {
  let lesson = null;
  const fwKey = fw === 'reactnative' ? 'rn' : fw === 'nextjs' ? 'nextjs' : fw === 'vuejs' ? 'vue' : fw;
  const lessons = FU_DATA.lessons[fwKey] || FU_DATA.lessons.react || [];
  lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  // Mark active
  document.querySelectorAll('.sidebar-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  const content = document.getElementById('lesson-content');
  content.innerHTML = `
    <div class="lesson-body" style="animation: fadeIn 0.3s ease">
      <h2>${lesson.content.title}</h2>
      <p>${lesson.content.explanation.replace(/<code>/g, `<code style="background:rgba(0,212,255,0.1);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.9em;color:var(--accent-cyan)">`).replace(/<\/code>/g, '</code>')}</p>
      
      <h3>Key Points</h3>
      <ul>
        ${lesson.content.keyPoints.map(k => `<li>${k}</li>`).join('')}
      </ul>
      
      <h3>Example Code</h3>
      <div class="code-block-wrap">
        <div class="code-block-header">
          <span>${lesson.content.language || 'jsx'}</span>
          <button class="code-copy-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre class="code-block"><code>${highlightCode(lesson.content.code)}</code></pre>
      </div>
      
      <div style="display:flex;gap:10px;margin-top:24px">
        <button class="btn-primary" onclick="openInPlayground('${id}')">
          ▶ Try in Playground
        </button>
        <button class="btn-ghost" onclick="showToast('Lesson bookmarked! ⭐', 'success')">
          ⭐ Bookmark
        </button>
      </div>
    </div>
  `;

  // Track progress
  State.progress[id] = true;
  localStorage.setItem('fu-progress', JSON.stringify(State.progress));
  document.querySelector(`.sidebar-item[data-id="${id}"] .lesson-dot`).style.background = 'var(--accent-cyan)';
}

function openInPlayground(id) {
  scrollToSection('playground');
  setTimeout(() => showToast('Open the Playground tab to run code! 🚀', 'success'), 500);
}

// ===== CODE HIGHLIGHT (Lightweight) =====
function highlightCode(code) {
  if (!code) return '';
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\/\/.*/g, '<span class="cmt">$&</span>')
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="cmt">$&</span>')
    .replace(/(['"`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="str">$&</span>')
    .replace(/\b(import|export|from|const|let|var|function|return|async|await|if|else|for|while|class|extends|new|typeof|default|null|undefined|true|false|of|in|throw|try|catch|finally)\b/g, '<span class="kw">$&</span>')
    .replace(/\b(useState|useEffect|useCallback|useMemo|useRef|useContext|useReducer|useId|React|ReactDOM|createRoot|render|setup|ref|reactive|computed|watch)\b/g, '<span class="fn">$&</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$&</span>');
}

function copyCode(btn) {
  const pre = btn.closest('.code-block-wrap').querySelector('pre');
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    showToast('Code copied! 📋', 'success');
  });
}

// ===== PLAYGROUND =====
function initPlayground() {
  const editor = document.getElementById('code-editor');
  const runBtn = document.getElementById('run-btn');
  const copyBtn = document.getElementById('copy-code-btn');
  const formatBtn = document.getElementById('format-btn');

  // Load default template
  loadTemplate('react-hello');

  // Tab switching
  document.querySelectorAll('.pg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pg-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadTemplate(tab.dataset.template);
    });
  });

  runBtn?.addEventListener('click', runCode);

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(editor.value);
    showToast('Code copied! 📋', 'success');
  });

  formatBtn?.addEventListener('click', () => {
    showToast('Code formatted! ✨', 'success');
  });

  // Tab key in editor
  editor?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
    // Ctrl/Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      runCode();
    }
  });
}

function loadTemplate(name) {
  const editor = document.getElementById('code-editor');
  const template = FU_DATA.playgroundTemplates[name];
  if (editor && template) {
    editor.value = template;
  }
  // Clear output
  clearPreview();
}

function runCode() {
  const code = document.getElementById('code-editor').value;
  const output = document.getElementById('preview-output');
  const consoleOut = document.getElementById('console-output');

  consoleOut.innerHTML = '';
  const logs = [];

  // Build sandbox HTML
  const sandboxHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      background: #080812; 
      color: #e8eaf6; 
      font-family: system-ui, sans-serif;
      min-height: 100vh;
    }
    #root { padding: 0; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    const origConsole = { log: console.log, error: console.error, warn: console.warn };
    window.parent.consoleCapture = [];
    ['log','error','warn','info'].forEach(type => {
      console[type] = (...args) => {
        origConsole[type](...args);
        try {
          window.parent.postMessage({ type: 'console', level: type, msg: args.map(a => JSON.stringify(a)).join(' ') }, '*');
        } catch(e){}
      };
    });
    window.onerror = (msg, src, line) => {
      window.parent.postMessage({ type: 'console', level: 'error', msg: \`Error: \${msg} (line \${line})\` }, '*');
    };
  <\/script>
  <script type="text/babel" data-presets="react">
    ${code}
  <\/script>
</body>
</html>`;

  output.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:100%;height:100%;border:none;background:transparent;min-height:280px';
  iframe.sandbox = 'allow-scripts allow-same-origin';
  output.appendChild(iframe);

  iframe.srcdoc = sandboxHTML;

  window.addEventListener('message', (e) => {
    if (e.data?.type === 'console') {
      const line = document.createElement('div');
      line.className = `console-line ${e.data.level}`;
      line.textContent = `[${e.data.level.toUpperCase()}] ${e.data.msg.replace(/^"|"$/g, '')}`;
      consoleOut.appendChild(line);
      consoleOut.scrollTop = consoleOut.scrollHeight;
    }
  }, { once: false });

  showToast('Running code... ▶', 'success');
}

function clearPreview() {
  const output = document.getElementById('preview-output');
  const cons = document.getElementById('console-output');
  if (output) output.innerHTML = '<div class="preview-hint">Click <strong>Run</strong> to see your code in action</div>';
  if (cons) cons.innerHTML = '';
}

// ===== VISUAL CONCEPTS =====
function renderConcepts() {
  const grid = document.getElementById('concepts-grid');
  if (!grid) return;

  grid.innerHTML = FU_DATA.concepts.map(c => `
    <div class="glass-card concept-card reveal" onclick="openConceptVisual('${c.id}')">
      <div class="concept-icon" style="background:${c.iconBg}">${c.icon}</div>
      <div class="concept-title">${c.title}</div>
      <p class="concept-desc">${c.desc}</p>
      <div class="concept-explore">
        Explore visually <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  `).join('');

  setTimeout(initRevealAnimations, 100);
}

function openConceptVisual(id) {
  const concept = FU_DATA.concepts.find(c => c.id === id);
  if (!concept) return;

  let visualHTML = '';

  if (id === 'vdom') {
    visualHTML = `
      <div class="concept-visual" id="vdom-demo">
        <div style="text-align:center;margin-bottom:16px">
          <div style="display:flex;gap:20px;justify-content:center">
            <div style="text-align:center">
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">Before</div>
              <div class="vdom-tree">
                <div class="vdom-node unchanged">&lt;App&gt;</div>
                <div class="vdom-connector"></div>
                <div class="vdom-children">
                  <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                    <div class="vdom-node unchanged">&lt;Header&gt;</div>
                  </div>
                  <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                    <div class="vdom-node unchanged">&lt;Counter value=5&gt;</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;font-size:28px;color:var(--accent-cyan)">→</div>
            <div style="text-align:center">
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">After setState</div>
              <div class="vdom-tree">
                <div class="vdom-node unchanged">&lt;App&gt;</div>
                <div class="vdom-connector"></div>
                <div class="vdom-children">
                  <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                    <div class="vdom-node unchanged">&lt;Header&gt; ✓</div>
                  </div>
                  <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
                    <div class="vdom-node changed">&lt;Counter value=6&gt; ←diff</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);text-align:center">
          React only updates the <span style="color:var(--accent-coral)">changed nodes</span> — not the entire tree.
        </p>
      </div>
      <p>React maintains a Virtual DOM — a JavaScript object tree mirroring the real DOM. On state change, React creates a new virtual tree, then runs its diffing algorithm to find the minimal set of changes needed.</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin:16px 0">
        ${['Two different element types → rebuild subtree completely',
           'Same type, different props → update only changed attributes',
           'Lists with "key" → match items by key, not position',
           'Result: Surgical DOM updates, maximum performance'].map(t => `
          <li style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:rgba(0,212,255,0.05);border-radius:8px;border:1px solid rgba(0,212,255,0.1);font-size:14px;color:var(--text-secondary)">
            <span style="color:var(--accent-cyan)">▸</span> ${t}
          </li>`).join('')}
      </ul>`;
  } else if (id === 'lifecycle') {
    visualHTML = `
      <div class="concept-visual">
        <div class="lifecycle-steps">
          <div class="lc-step mount">
            <div class="lc-icon">🌱</div>
            <div>Mount</div>
            <div style="font-size:10px;opacity:0.7">constructor<br/>render<br/>componentDidMount</div>
          </div>
          <div class="lc-arrow">→</div>
          <div class="lc-step update">
            <div class="lc-icon">🔄</div>
            <div>Update</div>
            <div style="font-size:10px;opacity:0.7">render<br/>componentDidUpdate</div>
          </div>
          <div class="lc-arrow">→</div>
          <div class="lc-step unmount">
            <div class="lc-icon">💀</div>
            <div>Unmount</div>
            <div style="font-size:10px;opacity:0.7">componentWillUnmount</div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--text-muted);margin-top:16px;text-align:center">
          With Hooks: useEffect(() =&gt; {}, []) = Mount, useEffect(() =&gt; {}, [deps]) = Update, return fn = Unmount
        </p>
      </div>
      <p>Every React component goes through three phases: Mounting (added to DOM), Updating (state/props change), and Unmounting (removed from DOM). Hooks let you tap into each phase.</p>`;
  } else if (id === 'reactivity') {
    visualHTML = `
      <div class="concept-visual">
        <div style="display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap">
          <div style="text-align:center;padding:20px;background:rgba(66,184,131,0.1);border-radius:12px;border:1px solid rgba(66,184,131,0.2)">
            <div style="font-size:24px;margin-bottom:8px">📦</div>
            <div style="font-size:13px;font-family:var(--font-mono);color:var(--vue-color)">reactive({count:0})</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Proxy-wrapped object</div>
          </div>
          <div style="font-size:24px;color:var(--accent-amber)">⚡</div>
          <div style="text-align:center;padding:20px;background:rgba(255,201,71,0.08);border-radius:12px;border:1px solid rgba(255,201,71,0.2)">
            <div style="font-size:24px;margin-bottom:8px">🔍</div>
            <div style="font-size:13px;font-family:var(--font-mono);color:var(--accent-amber)">Dependency Tracking</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Auto-detected on read</div>
          </div>
          <div style="font-size:24px;color:var(--accent-cyan)">→</div>
          <div style="text-align:center;padding:20px;background:rgba(0,212,255,0.08);border-radius:12px;border:1px solid rgba(0,212,255,0.2)">
            <div style="font-size:24px;margin-bottom:8px">🔄</div>
            <div style="font-size:13px;font-family:var(--font-mono);color:var(--accent-cyan)">Re-render Triggered</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Only affected components</div>
          </div>
        </div>
      </div>
      <p>Vue 3's reactivity system uses JavaScript Proxy to intercept property access and mutations. When you read a reactive property inside a computed or template, Vue automatically registers it as a dependency. When it changes, only the affected components re-render.</p>`;
  } else if (id === 'hydration') {
    visualHTML = `
      <div class="concept-visual">
        <div style="display:flex;flex-direction:column;gap:12px;width:100%">
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:rgba(167,139,250,0.08);border-radius:10px;border:1px solid rgba(167,139,250,0.2)">
            <span style="font-size:20px">🖥️</span>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--accent-violet)">1. Server renders HTML</div>
              <div style="font-size:12px;color:var(--text-muted)">User sees content instantly (fast FCP)</div>
            </div>
          </div>
          <div style="text-align:center;color:var(--text-muted)">↓</div>
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:rgba(0,212,255,0.08);border-radius:10px;border:1px solid rgba(0,212,255,0.2)">
            <span style="font-size:20px">📦</span>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--accent-cyan)">2. Browser downloads JS bundle</div>
              <div style="font-size:12px;color:var(--text-muted)">Page visible but not interactive yet</div>
            </div>
          </div>
          <div style="text-align:center;color:var(--text-muted)">↓</div>
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:rgba(74,222,128,0.08);border-radius:10px;border:1px solid rgba(74,222,128,0.2)">
            <span style="font-size:20px">💧</span>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--accent-green)">3. Hydration: React attaches to DOM</div>
              <div style="font-size:12px;color:var(--text-muted)">Page becomes fully interactive (TTI)</div>
            </div>
          </div>
        </div>
      </div>
      <p>Hydration bridges server-rendered HTML with client-side React. The server sends static HTML for fast initial paint, then React "hydrates" it — attaching event listeners and state without re-rendering the DOM from scratch.</p>`;
  } else {
    visualHTML = `
      <div class="concept-visual" style="min-height:160px">
        <div style="font-size:48px;margin-bottom:12px">${concept.icon}</div>
        <p style="color:var(--text-secondary);text-align:center">${concept.desc}</p>
      </div>
      <p>This concept is fundamental to understanding ${concept.category}. Explore the lessons section for deep interactive examples with live code.</p>`;
  }

  openConceptModal(concept.title, `
    ${visualHTML}
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border)">
      <button class="btn-primary" onclick="closeConceptModal();scrollToSection('lessons')">
        Explore in Lessons →
      </button>
    </div>
  `);
}

// ===== PROJECTS =====
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjectItems(btn.dataset.filter);
    });
  });

  renderProjectItems('all');
}

function renderProjectItems(filter) {
  const grid = document.getElementById('projects-grid');
  const items = filter === 'all' ? FU_DATA.projects : FU_DATA.projects.filter(p => p.fw === filter);

  const fwLabels = { react: 'React', nextjs: 'Next.js', vue: 'Vue.js', rn: 'React Native' };
  const diffColors = { 'Beginner': 'var(--accent-green)', 'Intermediate': 'var(--accent-cyan)', 'Advanced': 'var(--accent-amber)', 'Expert': 'var(--accent-coral)' };

  grid.innerHTML = items.map(p => `
    <div class="glass-card project-card fw-${p.fw} reveal" onclick="showToast('Project details coming soon! 🚧', 'success')">
      <div class="project-meta">
        <span class="project-fw-badge">${fwLabels[p.fw] || p.fw}</span>
        <span class="project-difficulty" style="color:${diffColors[p.difficulty] || '#888'}">${p.difficulty}</span>
      </div>
      <div style="font-size:28px;margin-bottom:10px">${p.emoji}</div>
      <div class="project-title">${p.title}</div>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
      </div>
      <div class="project-actions">
        <button class="btn-primary btn-sm" onclick="event.stopPropagation();showProjectModal('${p.id}')">View Project</button>
        <button class="btn-ghost btn-sm" onclick="event.stopPropagation();showToast('Added to learning list! 📚', 'success')">+ Queue</button>
      </div>
    </div>
  `).join('');

  setTimeout(initRevealAnimations, 50);
  grid.style.animation = 'none';
  grid.offsetHeight;
  grid.style.animation = 'fadeIn 0.3s ease';
}

function showProjectModal(id) {
  const p = FU_DATA.projects.find(x => x.id === id);
  if (!p) return;
  const fwLabels = { react: 'React', nextjs: 'Next.js', vue: 'Vue.js', rn: 'React Native' };
  openModal(`${p.emoji} ${p.title}`, `
    <div style="display:flex;gap:10px;margin-bottom:16px">
      <span class="project-fw-badge fw-${p.fw}" style="padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700;text-transform:uppercase">${fwLabels[p.fw]}</span>
      <span style="color:var(--accent-amber);font-size:13px;font-weight:600">${p.difficulty}</span>
    </div>
    <p style="color:var(--text-secondary);line-height:1.75;margin-bottom:20px">${p.desc}</p>
    <h4 style="margin-bottom:10px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted)">Technologies Used</h4>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">
      ${p.tech.map(t => `<span style="padding:6px 14px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:8px;font-size:13px;color:var(--accent-cyan);font-family:var(--font-mono)">${t}</span>`).join('')}
    </div>
    <h4 style="margin-bottom:12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted)">What You'll Build</h4>
    <div style="background:rgba(0,0,20,0.4);border-radius:10px;padding:16px;border:1px solid var(--border);font-family:var(--font-mono);font-size:13px;color:#abb2bf;line-height:1.8">
${p.fw === 'react' ? `<span class="kw">src/</span>
├── components/
│   ├── <span class="fn">App.jsx</span>
│   ├── <span class="fn">Header.jsx</span>
│   └── features/
│       └── <span class="fn">${p.title.replace(/ /g,'')}/</span>
├── hooks/
│   └── <span class="fn">use${p.title.replace(/ /g,'')}.js</span>
├── store/
│   └── <span class="fn">slices/</span>
└── <span class="fn">main.jsx</span>` : `<span class="kw">app/</span>
├── (routes)/
│   └── <span class="fn">${p.id}/</span>
│       ├── <span class="fn">page.tsx</span>
│       └── <span class="fn">layout.tsx</span>
├── components/
│   └── <span class="fn">${p.title.replace(/ /g,'')}/</span>
├── lib/
│   └── <span class="fn">db.ts</span>
└── <span class="fn">middleware.ts</span>`}
    </div>
    <button class="btn-primary" style="margin-top:20px;width:100%;justify-content:center" onclick="closeModal();scrollToSection('playground')">
      Start Building →
    </button>
  `);
}

// ===== CHALLENGES =====
function renderChallenges() {
  const grid = document.getElementById('challenges-grid');
  if (!grid) return;

  grid.innerHTML = FU_DATA.challenges.map(c => `
    <div class="glass-card challenge-card reveal" onclick="openChallenge('${c.id}')">
      <div class="challenge-header">
        <div class="challenge-icon" style="background:${c.iconBg}">${c.icon}</div>
        <div>
          <div class="challenge-title">${c.title}</div>
          <div class="challenge-type">${c.type}</div>
        </div>
      </div>
      <p class="challenge-desc">${c.desc}</p>
      <div class="challenge-footer">
        <span class="diff-badge diff-${c.difficulty}">${c.difficulty}</span>
        <span class="challenge-pts">+${c.points} XP</span>
      </div>
    </div>
  `).join('');

  setTimeout(initRevealAnimations, 100);
}

function openChallenge(id) {
  const c = FU_DATA.challenges.find(x => x.id === id);
  if (!c) return;
  openModal(`${c.icon} ${c.title}`, `
    <div style="display:flex;gap:10px;margin-bottom:20px;align-items:center">
      <span class="diff-badge diff-${c.difficulty}">${c.difficulty}</span>
      <span style="color:var(--text-muted);font-size:13px">${c.type}</span>
      <span style="margin-left:auto;color:var(--accent-amber);font-weight:700;font-family:var(--font-mono)">+${c.points} XP</span>
    </div>
    <p style="color:var(--text-secondary);line-height:1.75;margin-bottom:24px;font-size:16px">${c.desc}</p>
    
    <div style="background:rgba(0,0,20,0.5);border-radius:10px;padding:20px;border:1px solid var(--border);margin-bottom:20px">
      <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:12px">// Challenge starter code</div>
      <pre style="font-family:var(--font-mono);font-size:13px;color:#abb2bf;white-space:pre-wrap;line-height:1.7">${getChallengeCode(id)}</pre>
    </div>
    
    <div style="display:flex;gap:10px">
      <button class="btn-primary" style="flex:1;justify-content:center" onclick="closeModal();loadChallengeInPlayground('${id}')">
        Open in Playground
      </button>
      <button class="btn-ghost" style="flex:1;justify-content:center" onclick="closeModal();showToast('Hint: Check the dependency array! 💡', 'success')">
        Get Hint 💡
      </button>
    </div>
  `);
}

function getChallengeCode(id) {
  const codes = {
    c1: `// BUG: Counter doesn't increment correctly
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // BUG IS HERE — stale closure!
      setCount(count + 1); // count is always 0
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Fix: what should go in deps?

  return <div>Count: {count}</div>;
}`,
    c3: `// PERFORMANCE: 10,000 items causing lag
function HugeList({ items }) {
  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {items.map(item => (
        <div key={item.id} style={{ height: '50px', padding: '10px' }}>
          {item.name} — {item.description}
        </div>
      ))}
    </div>
  );
}
// Hint: Use react-window or @tanstack/virtual`,
    c2: `// Complete the custom hook
function usePagination({ totalItems, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // TODO: Add these:
  // - nextPage(): go to next page (if not last)
  // - prevPage(): go to prev page (if not first)
  // - goToPage(page): jump to specific page
  // - startIndex / endIndex for current page
  
  return { currentPage, totalPages, /* your additions */ };
}`
  };
  return codes[id] || `// Challenge: ${id}\n// Implement your solution here\n\nfunction solution() {\n  // Your code here\n}`;
}

function loadChallengeInPlayground(id) {
  const code = getChallengeCode(id);
  const editor = document.getElementById('code-editor');
  if (editor) editor.value = code;
  scrollToSection('playground');
  showToast('Challenge loaded in playground! 🎯', 'success');
}

// ===== TOOLS =====
function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;

  const catColors = {
    'Bundler': 'var(--accent-amber)',
    'Testing': 'var(--accent-green)',
    'State': 'var(--accent-violet)',
    'Language': 'var(--accent-cyan)'
  };

  grid.innerHTML = FU_DATA.tools.map(t => `
    <div class="glass-card tool-card reveal">
      <div class="tool-icon-wrap">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-category" style="color:${catColors[t.category] || 'var(--accent-cyan)'}">${t.category}</div>
      <p class="tool-desc">${t.desc}</p>
    </div>
  `).join('');

  setTimeout(initRevealAnimations, 100);
}

// ===== INTERVIEW =====
function renderInterview() {
  const tabsEl = document.querySelector('.interview-tabs');
  tabsEl?.addEventListener('click', (e) => {
    const tab = e.target.closest('.interview-tab');
    if (!tab) return;
    document.querySelectorAll('.interview-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    State.activeInterviewTab = tab.dataset.category;
    renderInterviewContent();
  });
  renderInterviewContent();
}

function renderInterviewContent() {
  const container = document.getElementById('interview-content');
  if (!container) return;
  const questions = FU_DATA.interview[State.activeInterviewTab] || [];

  container.innerHTML = `
    <div class="questions-list">
      ${questions.map((q, i) => `
        <div class="q-item reveal" onclick="toggleQuestion(this)">
          <div class="q-header">
            <span class="q-num">Q${String(i+1).padStart(2,'0')}</span>
            <span class="q-text">${q.q}</span>
            <span class="q-toggle">+</span>
          </div>
          <div class="q-answer">${q.a}</div>
        </div>
      `).join('')}
    </div>
  `;

  setTimeout(initRevealAnimations, 50);
  container.style.animation = 'none';
  container.offsetHeight;
  container.style.animation = 'fadeIn 0.4s ease';
}

function toggleQuestion(el) {
  el.classList.toggle('open');
}

// ===== QUIZ =====
function renderQuiz() {
  State.quizIndex = 0;
  State.quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const quiz = FU_DATA.quiz;
  if (State.quizIndex >= quiz.length) {
    const pct = Math.round((State.quizScore / quiz.length) * 100);
    container.innerHTML = `
      <div class="quiz-question" style="text-align:center">
        <div style="font-size:48px;margin-bottom:16px">${pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
        <h3 style="font-size:24px;font-weight:700;margin-bottom:8px">Quiz Complete!</h3>
        <p style="color:var(--text-secondary);margin-bottom:24px">
          You scored <strong style="color:var(--accent-cyan)">${State.quizScore}/${quiz.length}</strong> (${pct}%)
        </p>
        <div style="background:rgba(255,255,255,0.03);border-radius:10px;padding:16px;margin-bottom:24px;border:1px solid var(--border)">
          ${pct >= 80 ? '🌟 Excellent! You have a strong grasp of these concepts.' : 
            pct >= 60 ? '✅ Good work! Review the lessons to fill in gaps.' : 
            '📖 Keep studying! Use the lessons section to reinforce these concepts.'}
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center" onclick="renderQuiz()">
          Try Again 🔄
        </button>
      </div>
    `;
    return;
  }

  const q = quiz[State.quizIndex];
  State.quizAnswered = false;

  container.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-q-num">Question ${State.quizIndex + 1} of ${quiz.length}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" onclick="answerQuiz(this, ${i}, ${q.correct}, '${escapeHtml(q.explanation)}')">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
      <div class="quiz-controls">
        <span class="quiz-score">Score: ${State.quizScore}/${State.quizIndex}</span>
        <button class="btn-primary btn-sm" id="next-btn" style="display:none" onclick="nextQuestion()">
          Next Question →
        </button>
      </div>
    </div>
  `;
}

function answerQuiz(btn, selected, correct, explanation) {
  if (State.quizAnswered) return;
  State.quizAnswered = true;

  const options = btn.closest('.quiz-options').querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correct) opt.classList.add('correct');
    else if (i === selected && selected !== correct) opt.classList.add('wrong');
  });

  const isCorrect = selected === correct;
  if (isCorrect) State.quizScore++;

  const feedback = document.getElementById('quiz-feedback');
  feedback.className = `quiz-feedback show ${isCorrect ? 'good' : 'bad'}`;
  feedback.innerHTML = `${isCorrect ? '✓ Correct!' : '✗ Incorrect.'} ${explanation}`;

  document.getElementById('next-btn').style.display = 'inline-flex';
}

function nextQuestion() {
  State.quizIndex++;
  renderQuizQuestion();
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ===== RESOURCES =====
function renderResources() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;

  grid.innerHTML = FU_DATA.resources.map(r => `
    <div class="glass-card resource-card reveal">
      <div class="resource-icon">${r.icon}</div>
      <div class="resource-title">${r.title}</div>
      <p class="resource-desc">${r.desc}</p>
      <div class="resource-cat">${r.cat}</div>
    </div>
  `).join('');

  setTimeout(initRevealAnimations, 100);
}

// ===== SEARCH =====
function initSearch() {
  const btn = document.getElementById('search-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');

  btn.addEventListener('click', openSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  input.addEventListener('input', debounce(performSearch, 200));

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });
}

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.add('open');
  setTimeout(() => document.getElementById('search-input').focus(), 100);
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

function performSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  const results = document.getElementById('search-results');
  if (!q) { results.innerHTML = ''; return; }

  const items = [];

  // Search lessons
  Object.entries(FU_DATA.lessons).forEach(([fw, lessons]) => {
    lessons.forEach(l => {
      if (l.title.toLowerCase().includes(q) || l.content.explanation.toLowerCase().includes(q)) {
        items.push({ tag: `Lesson · ${fw.toUpperCase()}`, title: l.title, desc: l.content.explanation.slice(0, 100) + '...', action: () => { closeSearch(); loadLesson(fw, l.id); scrollToSection('lessons'); } });
      }
    });
  });

  // Search projects
  FU_DATA.projects.forEach(p => {
    if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
      items.push({ tag: `Project · ${p.fw}`, title: p.title, desc: p.desc, action: () => { closeSearch(); showProjectModal(p.id); } });
    }
  });

  // Search concepts
  FU_DATA.concepts.forEach(c => {
    if (c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)) {
      items.push({ tag: `Concept · ${c.category}`, title: c.title, desc: c.desc, action: () => { closeSearch(); openConceptVisual(c.id); } });
    }
  });

  // Search tools
  FU_DATA.tools.forEach(t => {
    if (t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) {
      items.push({ tag: `Tool · ${t.category}`, title: t.name, desc: t.desc, action: () => { closeSearch(); scrollToSection('tools'); } });
    }
  });

  if (items.length === 0) {
    results.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-muted)">No results for "${q}"</div>`;
    return;
  }

  results.innerHTML = items.slice(0, 8).map((item, i) => `
    <div class="search-result-item" onclick="searchItems[${i}].action()">
      <div class="sr-tag">${item.tag}</div>
      <div class="sr-title">${item.title}</div>
      <div class="sr-desc">${item.desc}</div>
    </div>
  `).join('');

  window.searchItems = items;
}

// ===== MODALS =====
function openModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function openConceptModal(title, body) {
  document.getElementById('concept-modal-title').textContent = title;
  document.getElementById('concept-modal-body').innerHTML = body;
  document.getElementById('concept-modal-overlay').classList.add('open');
}

function closeConceptModal() {
  document.getElementById('concept-modal-overlay').classList.remove('open');
}

// Close modals on overlay click
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

document.getElementById('concept-modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('concept-modal-overlay')) closeConceptModal();
});

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ===== UTILITY =====
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeConceptModal();
    closeMobileMenu();
  }
});

// ===== SERVICE WORKER (Offline Cache) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register SW for offline support
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

console.log('%c⬡ Frontend Universe', 'color:#00d4ff;font-size:24px;font-weight:800;font-family:Syne,sans-serif');
console.log('%cThe Ultimate Frontend Learning Platform', 'color:#a78bfa;font-size:14px');
console.log('%cAll frameworks. One platform. Infinite possibilities.', 'color:#888;font-size:12px');
