/* ===================================================
   FRONTEND UNIVERSE — DATA LAYER
   All content, lessons, projects, and challenges
   =================================================== */

const FU_DATA = {

  frameworks: [
    {
      id: 'react',
      name: 'React',
      emoji: '⚛',
      color: '#61DAFB',
      desc: 'Build composable UIs with the world\'s most popular frontend library. Master hooks, state, and the component model.',
      tags: ['Components', 'Hooks', 'JSX', 'Virtual DOM'],
      lessons: 52,
      projects: 12,
      hours: 40,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      emoji: '▲',
      color: '#ffffff',
      desc: 'The React framework for production. Full-stack web apps with SSR, SSG, and the revolutionary App Router.',
      tags: ['SSR', 'App Router', 'Server Components', 'Edge'],
      lessons: 44,
      projects: 10,
      hours: 35,
      logo: null
    },
    {
      id: 'vue',
      name: 'Vue.js',
      emoji: '🟢',
      color: '#42B883',
      desc: 'The progressive JavaScript framework. Elegant reactivity system, Composition API, and first-class developer experience.',
      tags: ['Reactivity', 'Composition API', 'Pinia', 'Vue Router'],
      lessons: 38,
      projects: 9,
      hours: 32,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
    },
    {
      id: 'rn',
      name: 'React Native',
      emoji: '📱',
      color: '#61DAFB',
      desc: 'Build native mobile apps for iOS and Android using React. One codebase, true native performance.',
      tags: ['iOS', 'Android', 'Navigation', 'Native APIs'],
      lessons: 36,
      projects: 8,
      hours: 38,
      logo: null
    }
  ],

  paths: {
    react: {
      stages: [
        {
          num: 1,
          level: 'beginner',
          title: 'Fundamentals',
          emoji: '🌱',
          topics: ['JSX Syntax & Expressions', 'Function Components', 'Props & PropTypes', 'useState Hook', 'Event Handling', 'Conditional Rendering', 'Lists & Keys']
        },
        {
          num: 2,
          level: 'intermediate',
          title: 'Core Development',
          emoji: '⚡',
          topics: ['useEffect Deep Dive', 'useRef & useCallback', 'useMemo & Optimization', 'Custom Hooks', 'Context API', 'Forms & Validation', 'Error Boundaries']
        },
        {
          num: 3,
          level: 'advanced',
          title: 'Advanced Patterns',
          emoji: '🔥',
          topics: ['Compound Components', 'Render Props', 'Higher-Order Components', 'Virtual DOM Internals', 'Concurrent Features', 'Suspense & Lazy', 'Portals']
        },
        {
          num: 4,
          level: 'expert',
          title: 'Architecture',
          emoji: '🏗',
          topics: ['State Management (Redux)', 'Zustand & Jotai', 'React Query / TanStack', 'Code Splitting', 'Micro Frontends', 'Performance Profiling', 'Testing (RTL)']
        },
        {
          num: 5,
          level: 'architect',
          title: 'Production',
          emoji: '🚀',
          topics: ['SSR with Next.js', 'Accessibility (a11y)', 'Security Best Practices', 'CI/CD Integration', 'Performance Budgets', 'Monitoring & Observability', 'Design Systems']
        }
      ]
    },
    nextjs: {
      stages: [
        {
          num: 1,
          level: 'beginner',
          title: 'Getting Started',
          emoji: '🌱',
          topics: ['Next.js Setup & CLI', 'Pages Router', 'File-based Routing', 'Link & Navigation', 'Static Assets', 'Environment Variables', 'CSS Modules']
        },
        {
          num: 2,
          level: 'intermediate',
          title: 'Data Fetching',
          emoji: '⚡',
          topics: ['getStaticProps', 'getServerSideProps', 'getStaticPaths', 'ISR (Incremental Regen)', 'API Routes', 'Middleware', 'Next.js Image & Font']
        },
        {
          num: 3,
          level: 'advanced',
          title: 'App Router',
          emoji: '🔥',
          topics: ['App Directory Structure', 'Server vs Client Components', 'Layouts & Templates', 'Parallel Routes', 'Intercepting Routes', 'Server Actions', 'Streaming SSR']
        },
        {
          num: 4,
          level: 'expert',
          title: 'Full-Stack',
          emoji: '🏗',
          topics: ['Database Integration', 'Authentication (NextAuth)', 'Edge Runtime', 'Caching Strategies', 'Turbopack', 'Monorepo Setup', 'Testing Next.js Apps']
        },
        {
          num: 5,
          level: 'architect',
          title: 'Deployment & Scale',
          emoji: '🚀',
          topics: ['Vercel Deployment', 'Custom Server', 'Docker Containerization', 'CDN & Edge Network', 'Performance Optimization', 'Security Headers', 'Observability']
        }
      ]
    },
    vue: {
      stages: [
        {
          num: 1,
          level: 'beginner',
          title: 'Vue Essentials',
          emoji: '🌱',
          topics: ['Template Syntax', 'Directives (v-if, v-for)', 'Reactive Data', 'Methods & Computed', 'Event Handling', 'Component Basics', 'Props & Emits']
        },
        {
          num: 2,
          level: 'intermediate',
          title: 'Composition API',
          emoji: '⚡',
          topics: ['setup() & <script setup>', 'ref() & reactive()', 'watch & watchEffect', 'Lifecycle Hooks', 'Composables', 'Slots & Scoped Slots', 'Provide / Inject']
        },
        {
          num: 3,
          level: 'advanced',
          title: 'Ecosystem',
          emoji: '🔥',
          topics: ['Vue Router 4', 'Pinia State Management', 'Transitions & Animations', 'Teleport', 'Custom Directives', 'Renderless Components', 'Plugin Development']
        },
        {
          num: 4,
          level: 'expert',
          title: 'Architecture',
          emoji: '🏗',
          topics: ['Nuxt.js Integration', 'SSR with Vue', 'Unit Testing (Vitest)', 'E2E Testing', 'Performance Optimization', 'TypeScript & Vue', 'Micro Frontend Patterns']
        },
        {
          num: 5,
          level: 'architect',
          title: 'Production Vue',
          emoji: '🚀',
          topics: ['Vite Build Optimization', 'Tree Shaking', 'Lazy Loading Routes', 'PWA with Workbox', 'Internationalization', 'Accessibility', 'CI/CD for Vue Apps']
        }
      ]
    },
    rn: {
      stages: [
        {
          num: 1,
          level: 'beginner',
          title: 'Mobile Basics',
          emoji: '🌱',
          topics: ['Expo Setup & CLI', 'Core Components', 'StyleSheet API', 'Flexbox Layout', 'SafeAreaView', 'Platform APIs', 'Basic Navigation']
        },
        {
          num: 2,
          level: 'intermediate',
          title: 'UI & Interaction',
          emoji: '⚡',
          topics: ['Touchable Components', 'FlatList & SectionList', 'ScrollView Patterns', 'Gesture Handler', 'React Navigation v6', 'Keyboard Handling', 'Modal & Overlay']
        },
        {
          num: 3,
          level: 'advanced',
          title: 'Native Features',
          emoji: '🔥',
          topics: ['Camera & Photos', 'Location & Maps', 'Push Notifications', 'AsyncStorage', 'Biometric Auth', 'Animations (Reanimated)', 'Native Modules']
        },
        {
          num: 4,
          level: 'expert',
          title: 'Performance',
          emoji: '🏗',
          topics: ['Hermes Engine', 'Flipper Debugging', 'Memory Optimization', 'Bridge vs JSI', 'New Architecture', 'Code Push Updates', 'E2E Testing (Detox)']
        },
        {
          num: 5,
          level: 'architect',
          title: 'Shipping',
          emoji: '🚀',
          topics: ['App Store Submission', 'Signing & Certificates', 'Fastlane CI/CD', 'App Size Optimization', 'Analytics Integration', 'Crash Reporting', 'Multi-Environment']
        }
      ]
    }
  },

  lessons: {
    react: [
      {
        id: 'jsx',
        group: 'Stage 1 — Fundamentals',
        title: 'JSX Syntax',
        content: {
          title: 'JSX: JavaScript + XML',
          explanation: `JSX is a syntax extension for JavaScript that looks like HTML but is actually JavaScript under the hood. React uses JSX to describe what the UI should look like.

Every JSX element is transformed into a <code>React.createElement()</code> call by Babel. This means JSX is just syntactic sugar — beautiful, readable syntax that compiles to plain JavaScript.`,
          keyPoints: [
            'JSX must have a single root element (or use React Fragments <>...)</>)',
            'Use className instead of class (JavaScript reserved word)',
            'Self-closing tags must include a slash: <img /> <br />',
            'JavaScript expressions go inside curly braces: {expression}',
            'Props use camelCase: onClick, onChange, onSubmit'
          ],
          code: `// JSX transforms into React.createElement calls
const element = (
  <div className="card">
    <h1>Hello, {name}!</h1>
    <p>Count: {count * 2}</p>
    <button onClick={handleClick}>
      Click me
    </button>
  </div>
);

// Under the hood, this becomes:
const element = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h1', null, 'Hello, ', name, '!'),
  React.createElement('p', null, 'Count: ', count * 2),
  React.createElement('button', { onClick: handleClick }, 'Click me')
);`,
          language: 'jsx'
        }
      },
      {
        id: 'components',
        group: 'Stage 1 — Fundamentals',
        title: 'Function Components',
        content: {
          title: 'Building Blocks: Components',
          explanation: `Components are the heart of React. A component is a JavaScript function that accepts props (inputs) and returns JSX (UI). Think of components as reusable UI lego bricks.

Every React app is a tree of components. The root component renders all others, creating a hierarchy that mirrors your UI structure.`,
          keyPoints: [
            'Component names must start with a capital letter',
            'A component is just a function that returns JSX',
            'Components can be composed inside other components',
            'Props are read-only — never mutate them directly',
            'Keep components small and focused on one thing'
          ],
          code: `// A simple functional component
function UserCard({ name, role, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <div className="info">
        <h2>{name}</h2>
        <span className="badge">{role}</span>
      </div>
    </div>
  );
}

// Composing components
function App() {
  return (
    <div className="team">
      <h1>Our Team</h1>
      <UserCard 
        name="Alice Chen"
        role="Frontend Lead"
        avatar="/alice.jpg"
      />
      <UserCard 
        name="Bob Kim"
        role="Full Stack"
        avatar="/bob.jpg"
      />
    </div>
  );
}

export default App;`,
          language: 'jsx'
        }
      },
      {
        id: 'hooks',
        group: 'Stage 2 — Core Development',
        title: 'React Hooks',
        content: {
          title: 'Hooks: Powers for Functions',
          explanation: `Hooks are special functions that let you "hook into" React features from function components. Introduced in React 16.8, they replaced class components for most use cases.

The two most fundamental hooks are <code>useState</code> (for local state) and <code>useEffect</code> (for side effects like data fetching, subscriptions, and DOM manipulation).`,
          keyPoints: [
            'Only call hooks at the top level — not inside loops or conditions',
            'Only call hooks from React function components',
            'useState returns [currentValue, setter] pair',
            'useEffect runs after every render by default',
            'Pass a dependency array to control when useEffect runs'
          ],
          code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // Runs on mount and when userId changes
  useEffect(() => {
    setLoading(true);
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });

    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component unmounting...');
    };
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Visits: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Track Visit
      </button>
    </div>
  );
}`,
          language: 'jsx'
        }
      },
      {
        id: 'custom-hooks',
        group: 'Stage 3 — Advanced',
        title: 'Custom Hooks',
        content: {
          title: 'Custom Hooks: Logic Reuse',
          explanation: `Custom hooks let you extract component logic into reusable functions. Any function that calls other hooks can be a custom hook. The naming convention is to prefix with "use".

Custom hooks are the primary way to share stateful logic between components without changing the component hierarchy. They unlock powerful patterns like data fetching, form handling, and subscriptions.`,
          keyPoints: [
            'Must start with "use" — this tells React to enforce hook rules',
            'Can call other hooks inside them',
            'Share stateful logic, not state itself',
            'Each component calling a custom hook gets its own state',
            'Return whatever is useful for the calling component'
          ],
          code: `// Custom hook for async data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // Cleanup
  }, [url]);

  return { data, loading, error };
}

// Usage — clean and reusable
function ProductList() {
  const { data, loading, error } = useFetch('/api/products');

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {data.map(p => (
        <li key={p.id}>{p.name} — \${p.price}</li>
      ))}
    </ul>
  );
}`,
          language: 'jsx'
        }
      }
    ],
    vue: [
      {
        id: 'vue-basics',
        group: 'Stage 1 — Essentials',
        title: 'Vue Template Syntax',
        content: {
          title: 'Templates: Declarative Rendering',
          explanation: `Vue uses an HTML-based template syntax that allows you to declaratively bind rendered DOM to the underlying component\'s data. All Vue templates are valid HTML that can be parsed by spec-compliant browsers.

Under the hood, Vue compiles the templates into Virtual DOM render functions.`,
          keyPoints: [
            'Text interpolation with double mustaches: {{ message }}',
            'v-bind (:) binds attributes dynamically',
            'v-on (@) listens to DOM events',
            'v-if / v-else for conditional rendering',
            'v-for for list rendering with :key'
          ],
          code: `<template>
  <div class="app">
    <!-- Text interpolation -->
    <h1>{{ title }}</h1>
    
    <!-- v-bind shorthand : -->
    <img :src="imageUrl" :alt="title" />
    
    <!-- v-if conditional -->
    <p v-if="isLoggedIn">Welcome back, {{ user.name }}!</p>
    <p v-else>Please sign in</p>
    
    <!-- v-for list rendering -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
    
    <!-- v-on shorthand @ -->
    <button @click="handleClick">Click me</button>
    
    <!-- v-model two-way binding -->
    <input v-model="searchQuery" placeholder="Search..." />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('My Vue App')
const isLoggedIn = ref(true)
const searchQuery = ref('')

const items = ref([
  { id: 1, name: 'Widget A', price: 29.99 },
  { id: 2, name: 'Widget B', price: 49.99 },
])

function handleClick() {
  console.log('Clicked!')
}
</script>`,
          language: 'vue'
        }
      }
    ],
    nextjs: [
      {
        id: 'app-router',
        group: 'Stage 3 — App Router',
        title: 'App Router Architecture',
        content: {
          title: 'The New App Router',
          explanation: `Next.js 13+ introduced the App Router — a fundamental shift in how Next.js handles routing, data fetching, and rendering. Built on React Server Components, it colocates your app\'s routing with your data fetching needs.

The key innovation: every component is a Server Component by default, meaning it runs on the server and reduces client-side JavaScript.`,
          keyPoints: [
            'Every file in /app becomes a route automatically',
            'Server Components run on the server — no JS sent to client',
            'Client Components need "use client" directive',
            'layout.js wraps multiple pages with shared UI',
            'loading.js auto-wraps with Suspense for streaming'
          ],
          code: `// app/products/[id]/page.tsx — Server Component
// No "use client" = runs on server

async function ProductPage({ params }) {
  // Direct DB/API access — no useEffect needed!
  const product = await db.product.findUnique({
    where: { id: params.id }
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client component for interactivity */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// app/products/[id]/AddToCartButton.tsx
"use client"; // Only this component runs in browser

import { useState } from 'react';

function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? '✓ Added!' : 'Add to Cart'}
    </button>
  );
}`,
          language: 'tsx'
        }
      }
    ]
  },

  playgroundTemplates: {
    'react-hello': `// React Component Demo
// Edit me and click Run!

function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('World');

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      padding: '24px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#61DAFB', marginBottom: '8px' }}>
        ⚛ Hello, {name}!
      </h1>
      
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name..."
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #333',
          background: '#1a1a2e',
          color: '#fff',
          marginBottom: '16px',
          width: '100%'
        }}
      />

      <div style={{
        background: '#1a1a2e',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>
          Count
        </p>
        <span style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          color: '#61DAFB' 
        }}>
          {count}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setCount(c => c - 1)}
          style={{
            flex: 1, padding: '10px',
            background: '#ff5c6c20',
            border: '1px solid #ff5c6c50',
            borderRadius: '8px',
            color: '#ff5c6c',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >−</button>
        <button
          onClick={() => setCount(0)}
          style={{
            flex: 1, padding: '10px',
            background: '#ffffff10',
            border: '1px solid #ffffff20',
            borderRadius: '8px',
            color: '#888',
            cursor: 'pointer'
          }}
        >Reset</button>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            flex: 1, padding: '10px',
            background: '#00d4ff20',
            border: '1px solid #00d4ff50',
            borderRadius: '8px',
            color: '#00d4ff',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >+</button>
      </div>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,

    'vue-hello': `<!-- Vue 3 Composition API Demo -->
<!-- This shows how Vue reactivity works -->

/*
Note: This is a Vue SFC simulation.
The preview shows the rendered output.

<template>
  <div class="app">
    <h1 style="color: #42B883">🟢 Vue.js App</h1>
    
    <div class="counter">
      <p>Count: {{ count }}</p>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
    
    <input v-model="message" placeholder="Type something..." />
    <p>Reversed: {{ reversedMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const message = ref('Hello Vue!')

const reversedMessage = computed(() => 
  message.value.split('').reverse().join('')
)

const increment = () => count.value++
const decrement = () => count.value--
</script>
*/

// Vue 3 Demo (Vanilla simulation for preview)
function App() {
  const [count, setCount] = React.useState(0);
  const [message, setMessage] = React.useState('Hello Vue!');
  const reversed = message.split('').reverse().join('');

  return (
    <div style={{ fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#42B883', marginBottom: '20px' }}>
        🟢 Vue.js Concepts
      </h1>
      
      <div style={{ 
        background: '#1a2e1a', borderRadius: '12px',
        padding: '20px', marginBottom: '16px',
        border: '1px solid #42B88330'
      }}>
        <h3 style={{ color: '#42B883', marginBottom: '12px' }}>
          Reactive Counter (ref)
        </h3>
        <p style={{ fontSize: '32px', textAlign: 'center', color: '#fff', marginBottom: '12px' }}>
          {count}
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button onClick={() => setCount(c=>c-1)} style={btnStyle('#ff5c6c')}>-</button>
          <button onClick={() => setCount(0)} style={btnStyle('#888')}>Reset</button>
          <button onClick={() => setCount(c=>c+1)} style={btnStyle('#42B883')}>+</button>
        </div>
      </div>
      
      <div style={{ 
        background: '#1a2e1a', borderRadius: '12px',
        padding: '20px', border: '1px solid #42B88330'
      }}>
        <h3 style={{ color: '#42B883', marginBottom: '12px' }}>
          Computed Property
        </h3>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{
            width: '100%', padding: '10px', borderRadius: '8px',
            border: '1px solid #42B88350', background: '#0d1f0d',
            color: '#fff', marginBottom: '8px'
          }}
        />
        <p style={{ color: '#888', fontSize: '14px' }}>
          Reversed: <span style={{ color: '#42B883' }}>{reversed}</span>
        </p>
      </div>
    </div>
  );
}

function btnStyle(color) {
  return {
    padding: '8px 20px', borderRadius: '8px',
    background: color + '20', border: \`1px solid \${color}50\`,
    color, cursor: 'pointer', fontSize: '18px'
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,

    'next-hello': `// Next.js App Router Pattern Demo
// Showing Server & Client Component concepts

// In Next.js, this would be split:
// page.tsx = Server Component (async, direct DB access)
// Client.tsx = Client Component ("use client")

// For demo purposes, simulating the pattern:

function ServerComponent({ products }) {
  // In real Next.js: async function, await db calls here
  return (
    <div style={{ 
      background: '#0f0f0f', borderRadius: '12px',
      padding: '16px', marginBottom: '12px',
      border: '1px solid #333'
    }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '12px'
      }}>
        <span style={{ 
          background: '#1a1a1a', padding: '4px 10px',
          borderRadius: '6px', fontSize: '11px',
          color: '#888', fontFamily: 'monospace'
        }}>
          SERVER COMPONENT
        </span>
        <span style={{ fontSize: '11px', color: '#555' }}>
          ↑ Runs on server, 0 JS shipped to client
        </span>
      </div>
      <h3 style={{ color: '#fff', marginBottom: '10px' }}>Product List</h3>
      {products.map(p => (
        <div key={p.id} style={{ 
          display: 'flex', justifyContent: 'space-between',
          padding: '8px 0', borderBottom: '1px solid #1a1a1a',
          color: '#ccc', fontSize: '14px'
        }}>
          <span>{p.name}</span>
          <span style={{ color: '#00d4ff' }}>\${p.price}</span>
        </div>
      ))}
    </div>
  );
}

function ClientComponent() {
  const [added, setAdded] = React.useState([]);

  return (
    <div style={{ 
      background: '#0a1628', borderRadius: '12px',
      padding: '16px', border: '1px solid #00d4ff30'
    }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '12px'
      }}>
        <span style={{ 
          background: '#00d4ff15', padding: '4px 10px',
          borderRadius: '6px', fontSize: '11px',
          color: '#00d4ff', fontFamily: 'monospace'
        }}>
          "use client"
        </span>
        <span style={{ fontSize: '11px', color: '#555' }}>
          ↑ Runs in browser, has interactivity
        </span>
      </div>
      <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>Cart ({added.length})</h3>
      {['Widget A', 'Widget B', 'Widget C'].map(item => (
        <button
          key={item}
          onClick={() => setAdded(a => [...new Set([...a, item])])}
          style={{
            display: 'block', width: '100%',
            padding: '8px 12px', marginBottom: '6px',
            background: added.includes(item) ? '#00d4ff20' : '#ffffff08',
            border: \`1px solid \${added.includes(item) ? '#00d4ff50' : '#333'}\`,
            borderRadius: '8px', color: added.includes(item) ? '#00d4ff' : '#888',
            cursor: 'pointer', textAlign: 'left', fontSize: '13px'
          }}
        >
          {added.includes(item) ? '✓ ' : '+ '}{item}
        </button>
      ))}
    </div>
  );
}

function App() {
  const products = [
    { id: 1, name: 'Widget A', price: '29.99' },
    { id: 2, name: 'Widget B', price: '49.99' },
    { id: 3, name: 'Widget C', price: '19.99' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui', padding: '24px', maxWidth: '440px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z"/>
        </svg>
        <h2 style={{ color: '#fff' }}>Next.js Architecture</h2>
      </div>
      <ServerComponent products={products} />
      <ClientComponent />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,

    'hooks-demo': `// React Hooks Deep Dive
// useState, useEffect, useCallback, useMemo

function HooksDemo() {
  // 1. useState — local state
  const [query, setQuery] = React.useState('');
  const [theme, setTheme] = React.useState('dark');
  
  // 2. useMemo — expensive computation, only recalculates when deps change
  const filtered = React.useMemo(() => {
    console.log('Filtering...'); // Only runs when query changes
    const fruits = ['🍎 Apple','🍊 Orange','🍋 Lemon',
                    '🍇 Grape','🍓 Strawberry','🥭 Mango',
                    '🍑 Peach','🍍 Pineapple','🥝 Kiwi'];
    return fruits.filter(f => 
      f.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // 3. useCallback — stable function reference
  const handleSearch = React.useCallback((e) => {
    setQuery(e.target.value);
  }, []); // Empty deps = created once

  // 4. useEffect — side effects
  React.useEffect(() => {
    document.title = \`Search: "\${query}" (\${filtered.length} results)\`;
    return () => { document.title = 'Frontend Universe'; };
  }, [query, filtered.length]);

  const bg = theme === 'dark' ? '#0d0d1f' : '#f0f4ff';
  const text = theme === 'dark' ? '#e8eaf6' : '#1a1a2e';
  const card = theme === 'dark' ? '#1a1a35' : '#fff';
  const border = theme === 'dark' ? '#333' : '#dde';

  return (
    <div style={{ 
      fontFamily: 'system-ui', padding: '24px',
      background: bg, minHeight: '100vh', color: text
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🪝 Hooks Demo</h2>
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={{
            padding: '6px 14px', borderRadius: '8px',
            border: \`1px solid \${border}\`,
            background: card, color: text, cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'} Theme
        </button>
      </div>

      <div style={{ 
        background: '#00d4ff15', borderRadius: '10px',
        padding: '14px', marginBottom: '16px',
        border: '1px solid #00d4ff30', fontSize: '13px', color: '#00d4ff'
      }}>
        <strong>useMemo:</strong> Recalculates only when query changes.<br/>
        <strong>useCallback:</strong> Stable reference, doesn't recreate.<br/>
        <strong>useEffect:</strong> Updates document.title reactively.
      </div>

      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search fruits... (try 'a')"
        style={{
          width: '100%', padding: '12px 16px',
          borderRadius: '10px', border: \`1px solid \${border}\`,
          background: card, color: text, fontSize: '15px',
          marginBottom: '16px', outline: 'none'
        }}
      />

      <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''} — 
        <span style={{ color: '#ffc947' }}> see console for memo calls</span>
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {filtered.map(fruit => (
          <div key={fruit} style={{
            padding: '8px 14px', borderRadius: '8px',
            background: card, border: \`1px solid \${border}\`,
            fontSize: '15px'
          }}>
            {fruit}
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: '#888' }}>No fruits found 😢</p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HooksDemo />);`,

    'state-demo': `// State Management Patterns
// Local State → Context → External Store

// Simulating a mini Redux-like store
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => listeners.splice(listeners.indexOf(listener), 1);
    }
  };
}

// Reducer function — pure function, predictable state
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    
    case 'CLEAR':
      return { ...state, items: [] };
    
    default: return state;
  }
}

const store = createStore(cartReducer, { items: [] });

const PRODUCTS = [
  { id: 1, name: 'React Course', price: 49, emoji: '⚛️' },
  { id: 2, name: 'Vue Mastery', price: 39, emoji: '💚' },
  { id: 3, name: 'Next.js Pro', price: 59, emoji: '▲' },
  { id: 4, name: 'TypeScript', price: 29, emoji: '🔷' },
];

function App() {
  const [cartItems, setCartItems] = React.useState(store.getState().items);

  React.useEffect(() => {
    return store.subscribe(() => {
      setCartItems([...store.getState().items]);
    });
  }, []);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ fontFamily: 'system-ui', padding: '24px', maxWidth: '480px' }}>
      <h2 style={{ marginBottom: '6px', color: '#a78bfa' }}>🗄 State Management</h2>
      <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>
        Mini Redux pattern — dispatch → reducer → state
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Products</h3>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center',
            padding: '12px', marginBottom: '8px',
            background: '#1a1a2e', borderRadius: '10px',
            border: '1px solid #2a2a4a'
          }}>
            <span style={{ fontSize: '24px', marginRight: '12px' }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: '#e8eaf6' }}>{p.name}</div>
              <div style={{ fontSize: '13px', color: '#a78bfa' }}>\${p.price}</div>
            </div>
            <button
              onClick={() => store.dispatch({ type: 'ADD_ITEM', item: p })}
              style={{
                padding: '6px 14px', borderRadius: '8px',
                background: '#a78bfa20', border: '1px solid #a78bfa50',
                color: '#a78bfa', cursor: 'pointer', fontSize: '13px'
              }}
            >Add +</button>
          </div>
        ))}
      </div>

      <div style={{
        background: '#1a1a2e', borderRadius: '12px',
        padding: '16px', border: '1px solid #a78bfa30'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ color: '#a78bfa' }}>Cart ({cartItems.length})</h3>
          {cartItems.length > 0 && (
            <button
              onClick={() => store.dispatch({ type: 'CLEAR' })}
              style={{ fontSize: '12px', color: '#ff5c6c', background: 'none', border: 'none', cursor: 'pointer' }}
            >Clear all</button>
          )}
        </div>
        {cartItems.length === 0 ? (
          <p style={{ color: '#555', fontSize: '14px', textAlign: 'center', padding: '16px 0' }}>Cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '8px 0',
              borderBottom: '1px solid #2a2a4a', fontSize: '14px'
            }}>
              <span style={{ color: '#ccc' }}>{item.emoji} {item.name} x{item.qty}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#a78bfa' }}>\${item.price * item.qty}</span>
                <button
                  onClick={() => store.dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                  style={{ color: '#ff5c6c', background: 'none', border: 'none', cursor: 'pointer' }}
                >✕</button>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div style={{ 
            marginTop: '12px', paddingTop: '12px', 
            borderTop: '1px solid #2a2a4a',
            display: 'flex', justifyContent: 'space-between',
            fontWeight: '700', color: '#a78bfa', fontSize: '16px'
          }}>
            <span>Total</span>
            <span>\${total}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },

  concepts: [
    {
      id: 'vdom',
      icon: '🌳',
      iconBg: 'rgba(0,212,255,0.1)',
      title: 'Virtual DOM Diffing',
      desc: 'How React efficiently updates the real DOM by comparing virtual trees',
      category: 'React Internals',
      visual: 'vdom'
    },
    {
      id: 'lifecycle',
      icon: '🔄',
      iconBg: 'rgba(74,222,128,0.1)',
      title: 'Component Lifecycle',
      desc: 'Mount, update, and unmount phases explained visually',
      category: 'React Core',
      visual: 'lifecycle'
    },
    {
      id: 'reactivity',
      icon: '⚡',
      iconBg: 'rgba(255,201,71,0.1)',
      title: 'Vue Reactivity System',
      desc: 'How Vue tracks dependencies and triggers re-renders automatically',
      category: 'Vue Internals',
      visual: 'reactivity'
    },
    {
      id: 'hydration',
      icon: '💧',
      iconBg: 'rgba(167,139,250,0.1)',
      title: 'SSR & Hydration',
      desc: 'Server-rendered HTML + client-side React taking over interactivity',
      category: 'Next.js',
      visual: 'hydration'
    },
    {
      id: 'stateflow',
      icon: '🔀',
      iconBg: 'rgba(255,92,108,0.1)',
      title: 'State Flow & Lifting',
      desc: 'Unidirectional data flow and how to share state between components',
      category: 'Architecture',
      visual: 'stateflow'
    },
    {
      id: 'context',
      icon: '📡',
      iconBg: 'rgba(0,212,255,0.08)',
      title: 'Context API',
      desc: 'Global state without prop drilling — the built-in solution',
      category: 'React Core',
      visual: 'context'
    }
  ],

  projects: [
    { id: 'todo', fw: 'react', title: 'Todo App', difficulty: 'Beginner', desc: 'CRUD operations, local state, filter & search. Master the fundamentals.', tech: ['useState', 'useEffect', 'localStorage'], emoji: '✅' },
    { id: 'weather', fw: 'react', title: 'Weather Dashboard', difficulty: 'Intermediate', desc: 'Real-time weather with API integration, geolocation, and animated charts.', tech: ['API Calls', 'Custom Hooks', 'Chart.js'], emoji: '🌤' },
    { id: 'chat', fw: 'react', title: 'Chat Application', difficulty: 'Advanced', desc: 'Real-time messaging with WebSocket, rooms, and emoji reactions.', tech: ['WebSocket', 'Context', 'useReducer'], emoji: '💬' },
    { id: 'ecommerce', fw: 'react', title: 'E-commerce Store', difficulty: 'Expert', desc: 'Full shopping experience with cart, filters, Stripe-style checkout flow.', tech: ['Redux Toolkit', 'React Query', 'Framer'], emoji: '🛍' },
    { id: 'dashboard', fw: 'react', title: 'Analytics Dashboard', difficulty: 'Advanced', desc: 'Data visualization with real-time updates, drag-to-reorder widgets.', tech: ['Recharts', 'DnD Kit', 'Zustand'], emoji: '📊' },
    { id: 'kanban', fw: 'react', title: 'Kanban Board', difficulty: 'Advanced', desc: 'Drag & drop task management like Linear or Trello.', tech: ['DnD', 'useReducer', 'Context'], emoji: '📋' },
    { id: 'blog', fw: 'nextjs', title: 'Blog CMS', difficulty: 'Intermediate', desc: 'MDX-powered blog with ISR, categories, and a CMS admin panel.', tech: ['App Router', 'MDX', 'ISR'], emoji: '📝' },
    { id: 'portfolio', fw: 'nextjs', title: 'Dev Portfolio', difficulty: 'Beginner', desc: 'Stunning developer portfolio with animations and project showcase.', tech: ['Next.js', 'Framer Motion', 'Tailwind'], emoji: '🎨' },
    { id: 'store', fw: 'nextjs', title: 'SSR E-commerce', difficulty: 'Expert', desc: 'Full-stack store with server components, auth, cart persistence.', tech: ['Server Actions', 'Prisma', 'NextAuth'], emoji: '🏪' },
    { id: 'taskmanager', fw: 'vue', title: 'Task Manager', difficulty: 'Intermediate', desc: 'Feature-rich task app with Pinia, Vue Router, and drag-and-drop.', tech: ['Pinia', 'Vue Router', 'Composition API'], emoji: '📌' },
    { id: 'music', fw: 'vue', title: 'Music Player', difficulty: 'Advanced', desc: 'Spotify-inspired music player with playlists, waveform, and animations.', tech: ['Web Audio API', 'Pinia', 'GSAP'], emoji: '🎵' },
    { id: 'analytics', fw: 'vue', title: 'Analytics Dashboard', difficulty: 'Expert', desc: 'Multi-chart analytics with filtering, date ranges, and CSV export.', tech: ['Chart.js', 'Pinia', 'Computed'], emoji: '📈' },
    { id: 'fitness', fw: 'rn', title: 'Fitness Tracker', difficulty: 'Advanced', desc: 'Native fitness app with workout logging, progress charts, and health data.', tech: ['React Navigation', 'AsyncStorage', 'Charts'], emoji: '💪' },
    { id: 'food', fw: 'rn', title: 'Food Delivery UI', difficulty: 'Intermediate', desc: 'Polished food delivery app with maps integration and animated cart.', tech: ['Maps', 'Reanimated', 'Expo'], emoji: '🍕' }
  ],

  challenges: [
    { id: 'c1', type: 'Bug Fix', icon: '🐛', iconBg: 'rgba(255,92,108,0.1)', title: 'Fix the Stale Closure', difficulty: 'medium', points: 150, desc: 'A counter in a useEffect isn\'t updating correctly due to a stale closure. Identify and fix the bug.' },
    { id: 'c2', type: 'Code Completion', icon: '✏️', iconBg: 'rgba(0,212,255,0.1)', title: 'Complete the Custom Hook', difficulty: 'easy', points: 80, desc: 'Complete a usePagination custom hook that handles page state, next/prev, and total pages.' },
    { id: 'c3', type: 'Performance', icon: '⚡', iconBg: 'rgba(255,201,71,0.1)', title: 'Optimize the List', difficulty: 'hard', points: 250, desc: 'A 10,000 item list is causing janky scroll. Apply virtualization and memoization to make it buttery smooth.' },
    { id: 'c4', type: 'Architecture', icon: '🏗', iconBg: 'rgba(167,139,250,0.1)', title: 'Design the State Layer', difficulty: 'expert', points: 500, desc: 'Design a scalable state management solution for a multi-tenant SaaS dashboard with optimistic updates.' },
    { id: 'c5', type: 'Bug Fix', icon: '🐛', iconBg: 'rgba(255,92,108,0.1)', title: 'Race Condition in Fetch', difficulty: 'hard', points: 300, desc: 'Multiple async requests are completing out of order, causing wrong data to display. Fix the race condition.' },
    { id: 'c6', type: 'Code Completion', icon: '✏️', iconBg: 'rgba(0,212,255,0.1)', title: 'Build a Form Validator', difficulty: 'medium', points: 175, desc: 'Implement a custom hook that handles form state, validation rules, touched state, and error messages.' },
    { id: 'c7', type: 'Performance', icon: '⚡', iconBg: 'rgba(255,201,71,0.1)', title: 'Reduce Bundle Size', difficulty: 'expert', points: 450, desc: 'An app\'s main bundle is 2.3MB. Use code splitting, lazy loading, and tree shaking to get it under 300KB.' },
    { id: 'c8', type: 'Architecture', icon: '🏗', iconBg: 'rgba(167,139,250,0.1)', title: 'Micro Frontend Design', difficulty: 'expert', points: 600, desc: 'Design a module federation architecture for integrating a Vue widget into a Next.js host application.' }
  ],

  tools: [
    { name: 'Vite', category: 'Bundler', icon: '⚡', desc: 'Lightning-fast dev server and build tool. Native ESM, instant HMR, and sub-second cold starts.' },
    { name: 'Webpack', category: 'Bundler', icon: '📦', desc: 'The industry-standard module bundler. Powerful plugin ecosystem, mature and battle-tested.' },
    { name: 'Turbopack', category: 'Bundler', icon: '🚀', desc: 'Rust-powered incremental bundler from Vercel. Up to 700x faster than Webpack for large projects.' },
    { name: 'Jest', category: 'Testing', icon: '🧪', desc: 'Delightful JavaScript testing framework. Zero-config setup, snapshot testing, and code coverage.' },
    { name: 'React Testing Library', category: 'Testing', icon: '🔬', desc: 'Test React components the way users interact. Accessibility-focused, discourages implementation details.' },
    { name: 'Cypress', category: 'Testing', icon: '🎯', desc: 'Fast, reliable end-to-end testing. Real browser testing, time-travel debugging, network stubbing.' },
    { name: 'Redux Toolkit', category: 'State', icon: '🗄', desc: 'The official, opinionated toolset for Redux. Eliminates boilerplate, includes RTK Query.' },
    { name: 'Zustand', category: 'State', icon: '🐻', desc: 'Small, fast, scalable state management. Minimal boilerplate, works without providers.' },
    { name: 'TanStack Query', category: 'State', icon: '🔄', desc: 'Powerful data synchronization for server state. Caching, background refetching, optimistic updates.' },
    { name: 'Pinia', category: 'State', icon: '🍍', desc: 'The Vue Store you will enjoy using. Intuitive API, full TypeScript support, Devtools integration.' },
    { name: 'TypeScript', category: 'Language', icon: '🔷', desc: 'Typed superset of JavaScript. Catch errors at compile time, supercharge your editor\'s IntelliSense.' },
    { name: 'Playwright', category: 'Testing', icon: '🎭', desc: 'Cross-browser end-to-end testing. Chromium, Firefox, WebKit — test them all simultaneously.' }
  ],

  interview: {
    react: [
      { q: 'What is the Virtual DOM and how does React use it?', a: 'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React creates a new virtual DOM tree and performs a "diffing" algorithm to find the minimum set of changes needed. Only those specific changes are applied to the real DOM, making updates efficient. This process is called reconciliation.' },
      { q: 'Explain the Rules of Hooks and why they exist', a: 'Hooks have two rules: (1) Only call hooks at the top level — not inside conditions, loops, or nested functions. (2) Only call hooks from React function components or custom hooks. These rules exist because React tracks hook calls by their order. If hooks are called conditionally, the order can change between renders, causing bugs. React depends on stable hook call order to correctly associate state with each hook.' },
      { q: 'What is the difference between useMemo and useCallback?', a: 'Both are performance optimizations. useMemo memoizes a computed value — it reruns the function only when dependencies change. useCallback memoizes a function reference — it returns the same function object between renders unless dependencies change. Use useMemo for expensive calculations, useCallback to prevent unnecessary re-renders of child components that receive function props.' },
      { q: 'How does React\'s reconciliation algorithm work?', a: 'React uses a Fiber architecture for reconciliation. The diffing algorithm makes two assumptions: (1) Two elements of different types produce different trees, (2) The "key" prop helps identify list items across renders. React compares trees level by level. If node types differ, the entire subtree is torn down and rebuilt. Keys let React match list items and preserve their state across reorders.' },
      { q: 'What are React Server Components and how do they differ from Client Components?', a: 'Server Components run exclusively on the server and never ship JavaScript to the client. They can directly access databases, file systems, and server-only APIs. They cannot use state, effects, or browser APIs. Client Components (marked "use client") run in the browser and have full access to React features. The key benefit: Server Components reduce client bundle size and enable efficient data access patterns.' },
      { q: 'Explain the concept of lifting state up', a: 'When multiple components need to share state, you lift it up to their closest common ancestor. The parent holds the state and passes it down as props, while callback functions allow children to request state updates. This maintains React\'s unidirectional data flow principle and creates a single source of truth.' }
    ],
    nextjs: [
      { q: 'What is the difference between SSR, SSG, and ISR in Next.js?', a: 'SSR (Server-Side Rendering): Page is rendered on each request. Fresh data, but slower TTFB. Use for user-specific data. SSG (Static Site Generation): Page rendered at build time. Fastest delivery via CDN. Use for content that rarely changes. ISR (Incremental Static Regeneration): SSG pages that revalidate in the background after a specified time. Best of both worlds — CDN speed with data freshness.' },
      { q: 'How do Server Actions work in Next.js App Router?', a: 'Server Actions are async functions that run on the server, marked with "use server". They can be called directly from components as form actions or event handlers. When called, a secure HTTP request is made to the server. They enable mutation patterns without creating explicit API routes — you can directly call database operations or server logic from your component.' },
      { q: 'What is the purpose of the layout.js file?', a: 'Layout files define UI shared across multiple pages. Layouts persist between navigations — they don\'t unmount/remount when children change. This is key for performance: shared UI like sidebars, navbars, and authentication wrappers are only rendered once. Layouts can also fetch data that\'s shared across all pages within their segment.' },
      { q: 'Explain Next.js caching strategy', a: 'Next.js has 4 caching layers: (1) Request Memoization — deduplicates fetch calls within a render. (2) Data Cache — persists fetch results across requests and deployments. (3) Full Route Cache — caches rendered HTML and RSC payload at build time. (4) Router Cache — client-side cache of visited route segments. Understanding these layers is essential for optimal performance.' }
    ],
    vue: [
      { q: 'How does Vue\'s reactivity system work under the hood?', a: 'Vue 3 uses JavaScript Proxy objects to intercept property access and mutations. When you access a reactive property inside a computed or watch effect, Vue tracks it as a dependency. When that property changes, Vue notifies all effects that depend on it. This automatic dependency tracking is what makes Vue\'s reactivity "magical" — you don\'t declare dependencies, they\'re inferred.' },
      { q: 'What is the Composition API and how does it differ from Options API?', a: 'The Composition API lets you organize component logic by feature rather than option type. Instead of scattering one feature\'s code across data, methods, computed, and watch, you write all related logic together in setup(). Key advantages: better TypeScript support, easier logic extraction into composables, no "this" binding confusion.' },
      { q: 'Explain the difference between ref() and reactive()', a: 'ref() wraps any value (primitive or object) in a reactive container. You access the value via .value. reactive() takes an object and makes it deeply reactive using Proxy. You access properties directly. Important: reactive() loses reactivity when destructured, while ref() preserves reactivity through .value. Use ref() for primitives and when you need to reassign the whole value.' }
    ],
    system: [
      { q: 'Design a frontend architecture for a real-time collaborative document editor', a: 'Key considerations: (1) Operational Transformation or CRDT for conflict resolution. (2) WebSocket for real-time sync with fallback to SSE. (3) Optimistic UI updates with server reconciliation. (4) Offline support with IndexedDB and sync queue. (5) Presence awareness (cursors, selections). (6) Permission model at document/section level. Framework: Next.js + Y.js + Liveblocks, deployed at edge for low latency.' },
      { q: 'How would you build a micro frontend architecture?', a: 'Module Federation (Webpack 5/Vite) is the modern approach. Each team owns an independent app that exposes components. A shell app loads micro frontends dynamically at runtime. Key decisions: (1) Shared dependencies strategy to avoid duplication. (2) Routing: shell-level vs app-level. (3) Communication: custom events, shared state, or URL params. (4) Testing: contract tests between apps. Consider: deployment independence, versioning, error isolation.' }
    ]
  },

  quiz: [
    {
      q: 'What happens when you call setState in React?',
      options: [
        'The component immediately re-renders with new state',
        'React schedules a re-render and batches updates',
        'The DOM is directly updated',
        'React creates a new component instance'
      ],
      correct: 1,
      explanation: 'React batches state updates and schedules re-renders asynchronously. Multiple setState calls in the same event handler are batched into a single re-render.'
    },
    {
      q: 'Which hook should you use to run code only once after the component mounts?',
      options: [
        'useEffect(() => {}, [undefined])',
        'useEffect(() => {})',
        'useEffect(() => {}, [])',
        'useLayoutEffect(() => {}, [once])'
      ],
      correct: 2,
      explanation: 'useEffect with an empty dependency array [] runs exactly once after the initial render, equivalent to componentDidMount in class components.'
    },
    {
      q: 'In Next.js App Router, what is a Server Component?',
      options: [
        'A component that only works on mobile',
        'A component marked with "use server"',
        'A component that runs on the server with no client JS',
        'Any component inside the /server directory'
      ],
      correct: 2,
      explanation: 'Server Components are the default in the App Router. They run exclusively on the server, produce no client JavaScript, and can directly access server resources like databases.'
    },
    {
      q: 'What is the primary advantage of Vue\'s Composition API over Options API?',
      options: [
        'It makes Vue apps faster',
        'It reduces component file size',
        'It allows organizing code by feature, not option type',
        'It removes the need for templates'
      ],
      correct: 2,
      explanation: 'The Composition API lets you group related logic together regardless of option type (data, methods, computed), making complex components easier to read and allowing logic extraction into composables.'
    },
    {
      q: 'Which caching behavior does useMemo provide?',
      options: [
        'It caches API responses automatically',
        'It memoizes a value between renders, recomputing only when deps change',
        'It prevents the component from re-rendering',
        'It caches the entire component output'
      ],
      correct: 1,
      explanation: 'useMemo memoizes the return value of a function. It only recomputes when the dependency array values change, useful for expensive calculations.'
    }
  ],

  resources: [
    { icon: '📖', title: 'React Official Docs', desc: 'The authoritative resource for React. The new beta docs with interactive examples are exceptional.', cat: 'Documentation' },
    { icon: '🎬', title: 'Component Patterns', desc: 'Advanced composition patterns: compound components, render props, controlled/uncontrolled components.', cat: 'Architecture' },
    { icon: '🔧', title: 'Vite Configuration', desc: 'Master Vite plugins, build optimization, library mode, and environment handling.', cat: 'Tooling' },
    { icon: '🧪', title: 'Testing Best Practices', desc: 'What to test, what not to test, and how to structure tests for maintainability.', cat: 'Testing' },
    { icon: '📱', title: 'React Native Paper', desc: 'Material Design component library for React Native — production-ready UI components.', cat: 'UI Library' },
    { icon: '🎨', title: 'Radix UI Primitives', desc: 'Unstyled, accessible component primitives for building high-quality design systems.', cat: 'UI Library' },
    { icon: '⚡', title: 'TanStack Router', desc: 'Type-safe, first-class search params, built for modern React. The future of client routing.', cat: 'Routing' },
    { icon: '🔒', title: 'Security in React', desc: 'XSS prevention, CSRF protection, secure dependency management, and sanitizing user input.', cat: 'Security' },
    { icon: '♿', title: 'Accessibility Guide', desc: 'ARIA roles, keyboard navigation, focus management, and screen reader testing.', cat: 'Accessibility' },
    { icon: '🚀', title: 'Core Web Vitals', desc: 'LCP, FID/INP, CLS — understand and optimize the metrics that matter for user experience.', cat: 'Performance' },
    { icon: '🏗', title: 'Micro Frontend Patterns', desc: 'Module Federation, iframes, web components — trade-offs and when to use each approach.', cat: 'Architecture' },
    { icon: '📊', title: 'State Management Guide', desc: 'When to use local state vs Context vs Zustand vs Redux — decision framework.', cat: 'Architecture' }
  ]
};
