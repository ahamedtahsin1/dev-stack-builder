# Dev Stack Builder 🚀

A polished, responsive React website for exploring modern development technologies and building a personal toolkit. Browse a curated directory, search by name or description, filter by category, sort by rating or name, and add tools to your own stack.

## ✨ Features

- **Technology explorer:** 15 meaningful technology records loaded from a separate JSON file, with category filters, search, and sorting.
- **Interactive stack builder:** Add and remove technologies, prevent duplicates, clear the whole stack, and see a live stack summary.
- **Responsive, polished UI:** Sticky navigation, mobile menu, responsive technology cards, loading and empty states, and toast notifications for stack actions.

## 🧰 Built with

- React + Vite
- JavaScript (ES6+)
- React Hooks: `useState`, `useEffect`, `useMemo`
- React-Toastify
- Lucide React icons
- CSS and local JSON data

## ▶️ Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To test the production build:

```bash
npm run build
npm run preview
```

## 📁 Project structure

```text
public/
  data/technologies.json   # technology records fetched by the app
src/
  assets/                  # hero artwork and brand asset
  components/              # Navbar, TechnologyCard, StackPanel, Footer
  App.jsx                  # page composition, data loading, filters and stack state
  main.jsx                 # React entry point and toast container
  styles.css               # responsive design system
```

## 🌐 Deploy

Deploy the project to Netlify, Vercel, or Cloudflare Pages using `npm run build` as the build command and `dist` as the output directory.

## 🧠 React questions

### 1. What is JSX, and why is it used in React?
JSX is a syntax that lets us write UI markup inside JavaScript. It makes component structure easier to read and lets us combine UI with JavaScript expressions.

### 2. What is the difference between props and state?
Props are values a parent passes to a child component. State is data a component manages and can update over time, such as the selected stack.

### 3. What does the `useState` hook do, and where did you use it in this project?
`useState` stores changing data in a function component. I used it for the technology list, loading status, selected stack, active category, search text, sort option, and mobile menu.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?
`useEffect` runs side effects after rendering. I used it to fetch the local technology JSON when the app loads and to update the loading state when the request finishes.

### 5. Why does every item in a `.map()` list need a unique `key` prop?
A stable unique key helps React identify which list item changed, was added, or was removed. It helps React update the UI correctly and efficiently.

### 6. What is conditional rendering? Show one place you used it.
Conditional rendering means showing different UI depending on a condition. The stack panel shows an empty-state message when no technologies are selected and a list when the stack has items.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
A parent passes data through props. A child can notify the parent by calling a callback function that the parent passed as a prop. For example, `App` passes each technology and `onAdd` to `TechnologyCard`.

## GitHub commit suggestion

Use meaningful commits as you build and test the project. For example:

1. `chore: scaffold React app with Vite`
2. `feat: add technology data in JSON`
3. `feat: build responsive navigation and hero`
4. `feat: create reusable technology cards`
5. `feat: implement stack add and remove actions`
6. `feat: add search category filters and sorting`
7. `feat: add toast notifications and loading state`
8. `style: polish responsive layout and footer`
9. `docs: add project overview and React answers`
10. `fix: verify production build and asset paths`
