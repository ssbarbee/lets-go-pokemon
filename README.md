# Let's Go Pokémon 🧭

A beautifully interactive Pokémon Explorer built with **Next.js**, **React Query**, and **Tailwind CSS**, powered by the [PokéAPI](https://pokeapi.co/).

Explore the world of Pokémon with:
- Dynamic Search with Floating Background
- Smooth Virtualized Grid Rendering
- On-demand Lazy Loading Pokémon Details & Images
- Evolution Chain Drawer with Swipe Gestures
- Responsive & Mobile-friendly Design
- Elegant Hover Animations & Polished UX
- Robust Fallbacks for Broken Images

---

## ✨ Features
- 🎨 **Immersive Landing Experience** — Floating Pokémon background, search field center-aligned with smooth transitions.
- 🔍 **Fast Search with Virtualized Grid** — Type any Pokémon name, and results render instantly without performance hits.
- 🧬 **Evolution Drawer** — View evolution chains via a slide-up drawer with swipe gestures on mobile.
- 🖼️ **Lazy Loading & Fallbacks** — Pokémon details & images load only when needed, with graceful placeholders on errors.
- 🌟 **Elegant Animations** — Smooth entry animations, hover sparkles, and interactive button effects.
- 🖥️ **Responsive Design** — Optimized for both desktop and mobile users.

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/ssbarbee/lets-go-pokemon
cd lets-go-pokemon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack
- **Next.js** — Static Site Generation & Optimized Image Handling
- **React Query (@tanstack/react-query)** — Efficient Data Fetching & Caching
- **Tailwind CSS** — Utility-first Responsive Styling
- **React Virtual** — High-performance Grid Virtualization
- **PokeAPI** — Public Pokémon API Source
- **Heroicons** — Crisp Iconography

---

## 🖼️ Project Structure
```
src/
  components/   // UI Components (PokemonCard, FloatingBackground, etc.)
  hooks/        // Custom hooks (usePokemon, useEvolutionChain, etc.)
  pages/        // Page Components (Home, Pokemon, etc.)
  types/        // TypeScript Types (Pokemon Types, etc.)
  styles/       // Global CSS & Animations
```

---

## 📦 Deployment
Easily deployable on:
- **Vercel**
- **Netlify (Static Export Mode)**
- **GitHub Pages (Static Export Mode)**

---

## 🐛 Known Limitations
- PokéAPI doesn’t support server-side name search filtering; client-side filtering is used.
- Large data fetches are optimized via lazy fetching on scroll, but can be further enhanced with server search APIs if available in the future.

---

## 📋 TODOs & Ideas
- [ ] Add Pokédex number search.
- [ ] Show Pokémon abilities & stats in detail page.
- [ ] Add a "favorites" feature (localStorage).

---

## 🤝 Contributions
Feel free to fork and submit PRs for enhancements, bug fixes, or feature ideas.

---

## 📜 License
[MIT License](LICENSE)

---

## 🙌 Acknowledgments
- [PokéAPI](https://pokeapi.co/)
- [Next.js](https://nextjs.org/)
- [Heroicons](https://heroicons.com/)
- Inspiration from **Uniswap UI interactions** & **Pokémon Fans Worldwide**.