/* ===================================================
   FRONTEND UNIVERSE — GAMIFICATION ENGINE
   XP System · Ranks · Achievements · Skill Tree
   Developer Dashboard
   =================================================== */

'use strict';

const Gamify = (() => {

  // ── Config ──
  const RANKS = [
    { name: 'Markup Apprentice', min: 0,    icon: '🌱', color: '#4ade80' },
    { name: 'Junior Dev',        min: 200,  icon: '⚡', color: '#00d4ff' },
    { name: 'React Developer',   min: 600,  icon: '⚛',  color: '#61dafb' },
    { name: 'Mid Engineer',      min: 1200, icon: '🔥', color: '#ffc947' },
    { name: 'Senior Engineer',   min: 2400, icon: '🚀', color: '#a78bfa' },
    { name: 'Frontend Architect',min: 4000, icon: '🏆', color: '#ff5c6c' }
  ];

  const XP_REWARDS = {
    lesson:     50,
    project:    150,
    challenge:  200,
    quiz_right: 75,
    quiz_perfect: 500,
    first_login: 25
  };

  const ACHIEVEMENTS = [
    { id: 'first_lesson',    name: 'First Light',         desc: 'Complete your first lesson',          icon: '💡', xp: 50  },
    { id: 'react_basics',    name: 'React Apprentice',    desc: 'Complete 3 React lessons',             icon: '⚛',  xp: 100 },
    { id: 'explorer',        name: 'Explorer',            desc: 'Visit every section',                  icon: '🗺',  xp: 75  },
    { id: 'quiz_master',     name: 'Quiz Master',         desc: 'Score 100% on the quiz',               icon: '🎯', xp: 200 },
    { id: 'night_owl',       name: 'Night Owl',           desc: 'Use the playground after midnight',    icon: '🦉', xp: 50  },
    { id: 'architect',       name: 'Architect',           desc: 'Reach Frontend Architect rank',        icon: '🏛', xp: 500 },
    { id: 'all_frameworks',  name: 'Full Stack Mind',     desc: 'Explore all 4 framework paths',        icon: '🌐', xp: 300 },
    { id: 'speedrun',        name: 'Speedrun',            desc: 'Complete 5 challenges',                icon: '⚡', xp: 250 },
    { id: 'bookworm',        name: 'Bookworm',            desc: 'Read 10 lessons',                      icon: '📚', xp: 150 },
    { id: 'builder',         name: 'Builder',             desc: 'Open 5 projects',                      icon: '🛠',  xp: 200 },
  ];

  const SKILL_TREE = {
    react: [
      { id: 'jsx',         label: 'JSX',            level: 1, requires: [] },
      { id: 'components',  label: 'Components',     level: 1, requires: ['jsx'] },
      { id: 'state',       label: 'State',          level: 2, requires: ['components'] },
      { id: 'hooks',       label: 'Core Hooks',     level: 2, requires: ['state'] },
      { id: 'effects',     label: 'Side Effects',   level: 2, requires: ['hooks'] },
      { id: 'context',     label: 'Context API',    level: 3, requires: ['hooks'] },
      { id: 'patterns',    label: 'Patterns',       level: 3, requires: ['context','effects'] },
      { id: 'perf',        label: 'Performance',    level: 4, requires: ['patterns'] },
    ],
    nextjs: [
      { id: 'routing',     label: 'App Router',     level: 1, requires: [] },
      { id: 'ssr',         label: 'SSR',            level: 2, requires: ['routing'] },
      { id: 'ssg',         label: 'SSG',            level: 2, requires: ['routing'] },
      { id: 'api',         label: 'API Routes',     level: 3, requires: ['ssr','ssg'] },
      { id: 'rsc',         label: 'Server Comps',   level: 3, requires: ['api'] },
      { id: 'edge',        label: 'Edge Runtime',   level: 4, requires: ['rsc'] },
    ]
  };

  // ── State ──
  let state = {
    xp: 0,
    rankIdx: 0,
    achievements: {},
    lessonsRead: 0,
    projectsOpened: 0,
    challengesDone: 0,
    sectionsVisited: new Set(),
    playgroundUsed: false,
    quizScore: 0,
    quizDone: false,
    skillNodes: {}
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem('fu-gamify') || '{}');
      Object.assign(state, saved);
      if (saved.sectionsVisited) state.sectionsVisited = new Set(saved.sectionsVisited);
      if (saved.skillNodes) state.skillNodes = saved.skillNodes;
    } catch(e) {}
  }

  function save() {
    try {
      const toSave = { ...state, sectionsVisited: [...state.sectionsVisited] };
      localStorage.setItem('fu-gamify', JSON.stringify(toSave));
    } catch(e) {}
  }

  // ── XP & Ranks ──
  function getRank(xp) {
    let rank = RANKS[0];
    RANKS.forEach(r => { if (xp >= r.min) rank = r; });
    return rank;
  }

  function getNextRank(xp) {
    for (let i = 0; i < RANKS.length; i++) {
      if (xp < RANKS[i].min) return RANKS[i];
    }
    return null;
  }

  function awardXP(type, extra = 0) {
    const amt = (XP_REWARDS[type] || 0) + extra;
    if (amt <= 0) return;

    const prevRank = getRank(state.xp);
    state.xp += amt;
    save();

    const newRank = getRank(state.xp);
    updateXPDisplay();

    // XP pop animation
    showXPPop(amt);

    // Rank up notification
    if (newRank.name !== prevRank.name) {
      setTimeout(() => showRankUp(newRank), 400);
    }

    updateDashboard();
  }

  function showXPPop(amt) {
    const pop = document.createElement('div');
    pop.className = 'xp-pop';
    pop.textContent = `+${amt} XP`;
    const nav = document.getElementById('xp-badge');
    if (nav) {
      const rect = nav.getBoundingClientRect();
      pop.style.left = (rect.left + rect.width/2) + 'px';
      pop.style.top  = (rect.top - 8) + 'px';
    } else {
      pop.style.right = '80px';
      pop.style.bottom = '80px';
    }
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1200);
  }

  function showRankUp(rank) {
    const div = document.createElement('div');
    div.className = 'rank-up-toast';
    div.innerHTML = `
      <div class="rank-up-icon">${rank.icon}</div>
      <div>
        <div class="rank-up-title">Rank Up!</div>
        <div class="rank-up-name" style="color:${rank.color}">${rank.name}</div>
      </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 50);
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 500); }, 3000);
  }

  // ── Achievements ──
  function unlock(id) {
    if (state.achievements[id]) return;
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    state.achievements[id] = Date.now();
    awardXP(0, ach.xp); // award bonus XP
    save();

    // Toast
    showAchievementToast(ach);
    updateDashboard();
  }

  function showAchievementToast(ach) {
    const div = document.createElement('div');
    div.className = 'achievement-toast';
    div.innerHTML = `
      <div class="ach-toast-icon">${ach.icon}</div>
      <div>
        <div class="ach-toast-title">Achievement Unlocked!</div>
        <div class="ach-toast-name">${ach.name}</div>
        <div class="ach-toast-desc">${ach.desc}</div>
      </div>
      <div class="ach-toast-xp">+${ach.xp} XP</div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 50);
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 600); }, 3800);
  }

  // ── Track Events ──
  function trackLesson(id) {
    if (!state.skillNodes) state.skillNodes = {};
    state.skillNodes[id] = true;
    state.lessonsRead = (state.lessonsRead || 0) + 1;
    awardXP('lesson');

    if (state.lessonsRead === 1) unlock('first_lesson');
    if (state.lessonsRead >= 10) unlock('bookworm');
    if (state.lessonsRead >= 3 && id.startsWith('react')) unlock('react_basics');
    save();
    renderSkillTree();
  }

  function trackProject() {
    state.projectsOpened = (state.projectsOpened || 0) + 1;
    awardXP('project');
    if (state.projectsOpened >= 5) unlock('builder');
    save();
  }

  function trackChallenge() {
    state.challengesDone = (state.challengesDone || 0) + 1;
    awardXP('challenge');
    if (state.challengesDone >= 5) unlock('speedrun');
    save();
  }

  function trackSection(sectionId) {
    state.sectionsVisited.add(sectionId);
    const sections = ['home','frameworks','paths','lessons','concepts','projects','challenges','tools','interview','resources'];
    if (sections.every(s => state.sectionsVisited.has(s))) unlock('explorer');
    save();
  }

  function trackQuizComplete(score, total) {
    state.quizDone = true;
    state.quizScore = score;
    awardXP(score === total ? 'quiz_perfect' : 'quiz_right');
    if (score === total) unlock('quiz_master');
    save();
  }

  function trackPlayground() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock('night_owl');
  }

  function trackFrameworkExplore(fw) {
    if (!state._fwExplored) state._fwExplored = new Set();
    else if (!(state._fwExplored instanceof Set)) state._fwExplored = new Set(state._fwExplored);
    state._fwExplored.add(fw);
    if (state._fwExplored.size >= 4) unlock('all_frameworks');
    save();
  }

  // ── XP Display in Nav ──
  function updateXPDisplay() {
    const badge = document.getElementById('xp-badge');
    if (!badge) return;
    const rank = getRank(state.xp);
    badge.innerHTML = `
      <span class="xp-icon">${rank.icon}</span>
      <span class="xp-val" id="xp-number">${state.xp}</span>
      <span class="xp-label">XP</span>
    `;
    badge.style.setProperty('--rank-color', rank.color);
  }

  // ── Dashboard ──
  function updateDashboard() {
    const el = document.getElementById('dashboard-content');
    if (!el) return;

    const rank     = getRank(state.xp);
    const nextRank = getNextRank(state.xp);
    const unlocked = ACHIEVEMENTS.filter(a => state.achievements[a.id]);
    const progress = nextRank ? Math.round(((state.xp - rank.min) / (nextRank.min - rank.min)) * 100) : 100;

    el.innerHTML = `
      <div class="dash-grid">
        <!-- Rank Card -->
        <div class="dash-card dash-rank">
          <div class="dash-rank-icon" style="color:${rank.color}">${rank.icon}</div>
          <div class="dash-rank-name">${rank.name}</div>
          <div class="dash-xp-bar-wrap">
            <div class="dash-xp-bar">
              <div class="dash-xp-fill" style="width:${progress}%;background:${rank.color}"></div>
            </div>
            <div class="dash-xp-label">
              <span>${state.xp} XP</span>
              ${nextRank ? `<span>${nextRank.min} XP needed</span>` : '<span>Max rank! 🏆</span>'}
            </div>
          </div>
          ${nextRank ? `<div class="dash-next-rank">Next: <strong>${nextRank.name}</strong></div>` : ''}
        </div>

        <!-- Stats Cards -->
        <div class="dash-card dash-stats">
          <div class="dash-stat-item">
            <div class="dash-stat-num">${state.lessonsRead || 0}</div>
            <div class="dash-stat-lbl">Lessons Read</div>
          </div>
          <div class="dash-stat-item">
            <div class="dash-stat-num">${state.projectsOpened || 0}</div>
            <div class="dash-stat-lbl">Projects Opened</div>
          </div>
          <div class="dash-stat-item">
            <div class="dash-stat-num">${state.challengesDone || 0}</div>
            <div class="dash-stat-lbl">Challenges Done</div>
          </div>
          <div class="dash-stat-item">
            <div class="dash-stat-num">${state.sectionsVisited.size || 0}</div>
            <div class="dash-stat-lbl">Sections Visited</div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="dash-card dash-achievements">
          <div class="dash-card-title">Achievements <span class="dash-ach-count">${unlocked.length}/${ACHIEVEMENTS.length}</span></div>
          <div class="dash-ach-grid">
            ${ACHIEVEMENTS.map(ach => {
              const earned = !!state.achievements[ach.id];
              return `<div class="dash-ach-item ${earned ? 'earned' : 'locked'}" title="${ach.name}: ${ach.desc}">
                <div class="dash-ach-icon">${ach.icon}</div>
                <div class="dash-ach-name">${ach.name}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Animate bars
    setTimeout(() => {
      const fill = el.querySelector('.dash-xp-fill');
      if (fill) {
        fill.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
      }
    }, 50);
  }

  // ── Skill Tree ──
  function renderSkillTree() {
    const el = document.getElementById('skill-tree-canvas');
    if (!el) return;

    const ctx  = el.getContext('2d');
    const W    = el.offsetWidth  || 600;
    const H    = el.offsetHeight || 300;
    el.width   = W;
    el.height  = H;

    const fw = 'react';
    const tree = SKILL_TREE[fw];

    // Layout nodes by level
    const levels = {};
    tree.forEach(n => {
      if (!levels[n.level]) levels[n.level] = [];
      levels[n.level].push(n);
    });

    const nodePositions = {};
    const maxLevel = Math.max(...tree.map(n => n.level));
    const levW = W / (maxLevel + 1);

    Object.entries(levels).forEach(([lv, nodes]) => {
      const levelH = H / (nodes.length + 1);
      nodes.forEach((node, i) => {
        nodePositions[node.id] = {
          x: parseInt(lv) * levW,
          y: (i + 1) * levelH,
          ...node
        };
      });
    });

    ctx.clearRect(0, 0, W, H);

    // Draw edges
    tree.forEach(node => {
      node.requires.forEach(req => {
        const from = nodePositions[req];
        const to   = nodePositions[node.id];
        if (!from || !to) return;

        const isUnlocked = !!state.skillNodes?.[node.id] && !!state.skillNodes?.[req];
        ctx.strokeStyle = isUnlocked ? '#00d4ff60' : '#ffffff15';
        ctx.lineWidth   = 1.5;
        ctx.setLineDash(isUnlocked ? [] : [5, 5]);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);

        // Bezier curve
        const cpx = (from.x + to.x) / 2;
        ctx.bezierCurveTo(cpx, from.y, cpx, to.y, to.x, to.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    });

    // Draw nodes
    Object.values(nodePositions).forEach(node => {
      const isUnlocked = !!state.skillNodes?.[node.id];
      const r = 28;

      // Glow
      if (isUnlocked) {
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2);
        grd.addColorStop(0, '#00d4ff25');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Node circle
      ctx.fillStyle   = isUnlocked ? '#00d4ff18' : '#ffffff08';
      ctx.strokeStyle = isUnlocked ? '#00d4ff' : '#ffffff25';
      ctx.lineWidth   = isUnlocked ? 2 : 1;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Label
      ctx.fillStyle   = isUnlocked ? '#e8eaf6' : '#ffffff30';
      ctx.font        = `${isUnlocked ? '600' : '400'} 11px 'DM Sans', sans-serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  }

  // ── Build Dashboard HTML ──
  function buildDashboard() {
    const existing = document.getElementById('dashboard');
    if (existing) return;

    const section = document.createElement('section');
    section.id = 'dashboard';
    section.className = 'section section-alt';
    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Your Progress</span>
          <h2 class="section-title">Developer Dashboard</h2>
          <p class="section-sub">Track your journey from beginner to Frontend Architect</p>
        </div>
        <div id="dashboard-content"></div>
        <div class="skill-tree-section">
          <div class="skill-tree-header">
            <h3 class="skill-tree-title">React Skill Tree</h3>
            <span class="skill-tree-sub">Unlock nodes by completing lessons</span>
          </div>
          <div class="skill-tree-wrap">
            <canvas id="skill-tree-canvas"></canvas>
          </div>
        </div>
      </div>
    `;

    // Insert before footer
    const footer = document.querySelector('.site-footer');
    if (footer) footer.before(section);
    else document.body.appendChild(section);

    updateDashboard();
    setTimeout(renderSkillTree, 100);
  }

  // ── Patch Existing Functions ──
  function hookIntoApp() {
    // Hook lesson loading
    const origLoadLesson = window.loadLesson;
    if (typeof origLoadLesson === 'function') {
      window.loadLesson = function(fw, id, ...args) {
        origLoadLesson.call(this, fw, id, ...args);
        trackLesson(id);
        trackFrameworkExplore(fw);
      };
    }

    // Hook project card clicks
    document.addEventListener('click', e => {
      if (e.target.closest('.project-card')) {
        trackProject();
      }
      if (e.target.closest('.challenge-card')) {
        trackChallenge();
      }
    });

    // Hook section visits
    const sections = document.querySelectorAll('section[id]');
    const visObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) trackSection(e.target.id);
      });
    }, { threshold: 0.3 });
    sections.forEach(s => visObs.observe(s));

    // Hook playground
    const runBtn = document.querySelector('#run-btn, .run-btn');
    runBtn?.addEventListener('click', trackPlayground);

    // Add dashboard nav link
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="#dashboard" class="nav-link">Dashboard</a>';
      navLinks.appendChild(li);
    }
  }

  function init() {
    load();

    // First time bonus
    if (!state._welcomed) {
      state._welcomed = true;
      awardXP('first_login');
    }

    // Build XP badge in nav
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      const badge = document.createElement('div');
      badge.id = 'xp-badge';
      badge.className = 'xp-badge';
      badge.title = 'Your XP';
      badge.addEventListener('click', () => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      });
      navActions.insertBefore(badge, navActions.firstChild);
    }

    updateXPDisplay();
    buildDashboard();

    // Hook after app is initialized
    setTimeout(hookIntoApp, 200);
  }

  // Expose tracking functions globally
  window.GamifyAwardXP    = awardXP;
  window.GamifyTrackLesson= trackLesson;
  window.GamifyQuizDone   = trackQuizComplete;

  return { init, awardXP, trackLesson, trackQuizComplete };
})();

document.addEventListener('DOMContentLoaded', () => Gamify.init());
