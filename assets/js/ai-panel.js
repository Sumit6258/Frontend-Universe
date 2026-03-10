/* ===================================================
   FRONTEND UNIVERSE — AI ASSISTANT PANEL
   Powered by Anthropic Claude API (user-provided key)
   Falls back to knowledge base when no key
   =================================================== */

'use strict';

const AIAssistant = (() => {

  // ── Knowledge Base (fallback when no API key) ──
  const KB = {
    react: {
      keywords: ['react','hook','usestate','useeffect','useref','usecallback','usememo','usecontext','usereducer','component','jsx','props','state','redux','zustand','context','memo','ref','virtual dom','reconciliation','fiber','suspense'],
      answers: [
        { q: 'usestate', a: '`useState` lets you add state to function components. `const [count, setCount] = useState(0)` — the first item is the current state, the second is the setter. React batches state updates in event handlers for performance.' },
        { q: 'useeffect', a: '`useEffect` handles side effects: data fetching, subscriptions, DOM mutations. The dependency array controls when it runs — empty `[]` means once on mount, with values means on change, omitted means every render.' },
        { q: 'usememo usecallback', a: '`useMemo` memoizes computed values. `useCallback` memoizes functions. Both prevent unnecessary re-renders when passed as props to memoized children. Use them when computation is expensive or referential equality matters.' },
        { q: 'virtual dom', a: 'React maintains a virtual DOM (JS objects) and diffs it against the previous version on each render. Only the minimal real DOM updates are applied. React 18\'s concurrent features make this even smarter with prioritized rendering.' },
        { q: 'context', a: '`useContext` + `createContext` lets you share values without prop drilling. For frequent updates (like global state), consider a dedicated store (Zustand, Redux Toolkit) since all consumers re-render when context value changes.' },
      ]
    },
    nextjs: {
      keywords: ['next','nextjs','next.js','app router','pages router','ssr','ssg','isr','server component','client component','getstaticprops','getserversideprops','server action','middleware','edge','vercel'],
      answers: [
        { q: 'app router', a: 'App Router (Next 13+) uses the `app/` directory. Files named `page.tsx` become routes, `layout.tsx` wraps routes, `loading.tsx` handles suspense boundaries. Server Components are the default — add `"use client"` only when you need browser APIs or hooks.' },
        { q: 'ssr ssg isr', a: 'SSR (Server-Side Rendering): fresh HTML per request. SSG (Static Site Generation): HTML at build time. ISR (Incremental Static Regeneration): SSG with automatic background revalidation using `revalidate`. App Router uses `fetch` cache options to control all three.' },
        { q: 'server component', a: 'Server Components run only on the server — no JS sent to the browser. They can be `async`, access databases directly, and import server-only modules. They cannot use `useState`, `useEffect`, or browser APIs. Mix with Client Components via composition.' },
        { q: 'server action', a: 'Server Actions are async functions that run on the server, triggered from forms or client components. Define with `"use server"` directive. They replace API routes for mutations and can be progressively enhanced.' },
      ]
    },
    vue: {
      keywords: ['vue','composition api','ref','reactive','computed','watch','watcheffect','pinia','vue router','directive','v-model','v-if','v-for','defineprops','defineemits','slots','teleport','provide inject'],
      answers: [
        { q: 'composition api', a: 'Composition API uses `setup()` or `<script setup>`. `ref()` for primitives, `reactive()` for objects, `computed()` for derived state, `watch()`/`watchEffect()` for side effects. Composables (`useX()` functions) replace mixins for logic reuse.' },
        { q: 'ref reactive', a: '`ref(value)` wraps any value — access with `.value` in JS, auto-unwrapped in templates. `reactive(obj)` makes an object deeply reactive — no `.value` needed but loses reactivity if destructured. `toRefs()` solves destructuring reactivity loss.' },
        { q: 'pinia', a: 'Pinia is Vue\'s official state store. Define with `defineStore()`. Supports both Options and Composition API styles. Actions can be `async`. Devtools integration is excellent. Much simpler than Vuex with full TypeScript support.' },
      ]
    },
    performance: {
      keywords: ['performance','lazy','code split','bundle','memo','optimize','lighthouse','web vitals','lcp','fid','cls','ttfb','prefetch','preload'],
      answers: [
        { q: 'lazy loading', a: 'Use `React.lazy()` + `Suspense` for component-level code splitting. In Next.js, use `next/dynamic`. Route-based splitting is automatic in both. For images, use `loading="lazy"` or `next/image`. For heavy libraries, import dynamically: `const lib = await import("heavy-lib")`.' },
        { q: 'web vitals', a: 'LCP (Largest Contentful Paint) — optimize images, fonts, and critical CSS. FID/INP (Interaction) — break up long tasks, use web workers. CLS (Layout Shift) — set explicit sizes on images/ads. Use `reportWebVitals()` in Next.js to track production metrics.' },
      ]
    },
    general: {
      keywords: ['typescript','tailwind','test','testing','jest','vitest','cypress','playwright','accessibility','a11y','interview','senior','architect'],
      answers: [
        { q: 'typescript', a: 'TypeScript catches bugs at compile time. Key patterns: `interface` for object shapes, `type` for unions/aliases, `generic<T>` for reusable utilities, `as const` for literal types. In React, `FC<Props>`, `useState<Type>()`, and `useRef<HTMLElement>(null!)` cover most cases.' },
        { q: 'testing', a: 'Testing pyramid: many unit tests (Jest/Vitest), fewer integration tests (React Testing Library — test behavior not implementation), few E2E tests (Playwright/Cypress). RTL guiding principle: test how users interact, not how components are built.' },
      ]
    }
  };

  function findAnswer(query) {
    const q = query.toLowerCase();

    // Try to find matching answers from knowledge base
    for (const domain of Object.values(KB)) {
      const matchScore = domain.keywords.filter(k => q.includes(k)).length;
      if (matchScore === 0) continue;

      for (const entry of domain.answers) {
        const keys = entry.q.split(' ');
        if (keys.some(k => q.includes(k))) {
          return formatKBAnswer(entry.a, query);
        }
      }

      // Domain matched but no specific answer
      if (matchScore > 0) {
        return `I can help with that! This topic falls under **${Object.entries(KB).find(([,v]) => v === domain)?.[0]}**. For specific questions, try asking about: \n\n${domain.answers.map(a => `• ${a.q}`).join('\n')}\n\nOr enter your **Anthropic API key** above for full AI-powered answers.`;
      }
    }

    return `I don't have a pre-loaded answer for that specific question. For comprehensive AI-powered responses, please enter your **Anthropic API key** in the settings above.\n\nYou can find answers about:\n• React hooks & patterns\n• Next.js App Router & rendering\n• Vue Composition API\n• Performance optimization\n• Testing strategies\n• TypeScript in frontend apps`;
  }

  function formatKBAnswer(text, query) {
    return `Here's what I know about **${query.slice(0,40)}${query.length > 40 ? '…' : ''}**:\n\n${text}\n\n*Want deeper insights? Add your Anthropic API key for full AI answers.*`;
  }

  // ── Anthropic API call ──
  async function callClaude(messages, apiKey) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        system: `You are an expert frontend development assistant for the Frontend Universe platform. You help developers master React, Next.js, Vue.js, and React Native. Be concise but comprehensive. Use markdown formatting with code blocks when showing code examples. Always be practical and actionable.`,
        messages
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content[0]?.text || '';
  }

  // ── Markdown → HTML ──
  function renderMarkdown(text) {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<div class="ai-code-block"><div class="ai-code-lang">${lang || 'code'}</div><pre><code>${escHtml(code.trim())}</code></pre></div>`)
      .replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^#{1,3} (.+)$/gm, '<div class="ai-heading">$1</div>')
      .replace(/^• (.+)$/gm, '<div class="ai-bullet">$1</div>')
      .replace(/^\- (.+)$/gm, '<div class="ai-bullet">$1</div>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/^(?!<)(.+)$/gm, '$1')
      .replace(/<\/p><p>/g, '<br><br>');
  }

  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Panel UI ──
  function buildPanel() {
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.innerHTML = `
      <div class="ai-panel-bg"></div>
      <div class="ai-panel-inner">
        <div class="ai-header">
          <div class="ai-header-left">
            <div class="ai-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 16.5 13z"/></svg>
            </div>
            <div>
              <div class="ai-title">FU Assistant</div>
              <div class="ai-subtitle" id="ai-status">Knowledge base active</div>
            </div>
          </div>
          <div class="ai-header-right">
            <button id="ai-settings-btn" class="ai-icon-btn" title="Settings">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34L5 2 3.44 5.93A10 10 0 0 0 2.5 12 10 10 0 0 0 12 22 10 10 0 0 0 21.5 12A10 10 0 0 0 19.07 4.93z"/></svg>
            </button>
            <button id="ai-close-btn" class="ai-icon-btn" title="Close">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div class="ai-settings" id="ai-settings" style="display:none">
          <label class="ai-settings-label">Anthropic API Key (optional)</label>
          <div class="ai-key-row">
            <input type="password" id="ai-api-key" class="ai-key-input" placeholder="sk-ant-..." />
            <button id="ai-save-key" class="ai-save-btn">Save</button>
          </div>
          <p class="ai-settings-note">Your key is stored locally. Enables full Claude AI responses.</p>
        </div>

        <div class="ai-messages" id="ai-messages">
          <div class="ai-msg ai-msg-bot">
            <div class="ai-msg-content">
              <p>Hey! I'm your AI coding assistant 👋</p>
              <p>Ask me anything about <strong>React</strong>, <strong>Next.js</strong>, <strong>Vue.js</strong>, performance, or frontend architecture.</p>
              <div class="ai-suggestions">
                <button class="ai-suggest-btn" data-q="Explain React hooks and when to use each one">React Hooks guide</button>
                <button class="ai-suggest-btn" data-q="How does Next.js App Router work?">Next.js App Router</button>
                <button class="ai-suggest-btn" data-q="Vue 3 Composition API vs Options API">Vue Composition API</button>
                <button class="ai-suggest-btn" data-q="How to optimize React app performance?">Performance tips</button>
              </div>
            </div>
          </div>
        </div>

        <div class="ai-input-row">
          <textarea id="ai-input" class="ai-input" placeholder="Ask about React, Next.js, Vue..." rows="1" maxlength="1000"></textarea>
          <button id="ai-send-btn" class="ai-send-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // FAB Button
    const fab = document.createElement('button');
    fab.id = 'ai-fab';
    fab.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 16.5 13z"/></svg>
      <span class="ai-fab-label">Ask AI</span>
      <span class="ai-fab-dot"></span>
    `;
    document.body.appendChild(fab);

    return { panel, fab };
  }

  // ── Bind Events ──
  function bindEvents(panel, fab) {
    let isOpen = false;
    const messages = document.getElementById('ai-messages');
    const input    = document.getElementById('ai-input');
    const sendBtn  = document.getElementById('ai-send-btn');
    const settings = document.getElementById('ai-settings');
    const settBtn  = document.getElementById('ai-settings-btn');
    const closeBtn = document.getElementById('ai-close-btn');
    const saveKey  = document.getElementById('ai-save-key');
    const keyInput = document.getElementById('ai-api-key');
    const status   = document.getElementById('ai-status');

    // Load saved key
    const savedKey = localStorage.getItem('fu-api-key') || '';
    if (savedKey) { keyInput.value = savedKey; status.textContent = 'Claude API connected'; }

    // Open/close
    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      panel.classList.toggle('open', isOpen);
      fab.classList.toggle('active', isOpen);
      if (isOpen) setTimeout(() => input.focus(), 300);
    });

    closeBtn.addEventListener('click', () => {
      isOpen = false;
      panel.classList.remove('open');
      fab.classList.remove('active');
    });

    // Settings
    settBtn.addEventListener('click', () => {
      settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
    });

    saveKey.addEventListener('click', () => {
      const key = keyInput.value.trim();
      if (key) {
        localStorage.setItem('fu-api-key', key);
        status.textContent = 'Claude API connected ✓';
        settings.style.display = 'none';
        addMsg('bot', 'API key saved! I now have full Claude AI capabilities. Ask me anything about frontend development.');
      }
    });

    // Send
    async function send() {
      const query = input.value.trim();
      if (!query) return;
      input.value = '';
      input.style.height = 'auto';
      addMsg('user', escHtml(query));
      await getResponse(query, messages);
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    // Suggestion chips
    messages.addEventListener('click', e => {
      const btn = e.target.closest('.ai-suggest-btn');
      if (btn) { input.value = btn.dataset.q; send(); }
    });
  }

  let conversationHistory = [];

  async function getResponse(query, messages) {
    const apiKey = localStorage.getItem('fu-api-key');
    const typingId = addTypingIndicator(messages);

    try {
      let answer;
      if (apiKey) {
        conversationHistory.push({ role: 'user', content: query });
        answer = await callClaude(conversationHistory, apiKey);
        conversationHistory.push({ role: 'assistant', content: answer });
        // Keep last 10 messages to avoid token overflow
        if (conversationHistory.length > 10) conversationHistory = conversationHistory.slice(-10);
      } else {
        await new Promise(r => setTimeout(r, 600)); // Simulate thinking
        answer = findAnswer(query);
      }

      removeTypingIndicator(typingId, messages);
      addMsg('bot', renderMarkdown(answer));
    } catch (err) {
      removeTypingIndicator(typingId, messages);
      addMsg('bot', `⚠️ ${err.message.includes('401') ? 'Invalid API key. Check settings.' : 'Connection error. Using knowledge base mode.'}\n\n${renderMarkdown(findAnswer(query))}`);
    }

    messages.scrollTop = messages.scrollHeight;
  }

  function addMsg(role, html) {
    const messages = document.getElementById('ai-messages');
    const div = document.createElement('div');
    div.className = `ai-msg ai-msg-${role}`;
    div.innerHTML = `<div class="ai-msg-content">${html}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    // animate in
    div.style.opacity = '0';
    div.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      div.style.opacity = '1';
      div.style.transform = 'translateY(0)';
    });
  }

  function addTypingIndicator(messages) {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-bot';
    div.id = id;
    div.innerHTML = '<div class="ai-msg-content"><div class="ai-typing"><span></span><span></span><span></span></div></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id, messages) {
    document.getElementById(id)?.remove();
  }

  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Init ──
  function init() {
    const { panel, fab } = buildPanel();
    bindEvents(panel, fab);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => AIAssistant.init());
