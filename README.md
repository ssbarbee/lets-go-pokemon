# Let's Go Pokémon 🧭

A beautifully interactive Pokémon Explorer built with **Next.js**, **React Query**, and **Tailwind CSS**, powered by the [PokéAPI](https://pokeapi.co/).

Have a look at deployed version of [Let's go Pokemon](https://lets-go-pokemon.vercel.app)

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
  styles/       // Global CSS & Animations
  e2e/          // End-to-end tests using Playwright
```

---

## 🧪 Testing

### Unit Tests
Unit tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To run unit tests:
```bash
npm run test
```

### End-to-end Tests
End-to-end tests are written using [Playwright](https://playwright.dev/).

To run end-to-end tests:
```bash
npm run test:e2e
```

## 📦 Deployment

Project is deployed on: **Vercel**. The site is also available on: [https://lets-go-pokemon.vercel.app](https://lets-go-pokemon.vercel.app)

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

## 🧠 Design Decisions & Challenges Faced

### 🎨 Design Decisions:
- **Modular Component Structure**: Each UI part (e.g., FloatingBackground, PokemonCard, EvolutionDrawer) is a self-contained component, ensuring scalability and reusability.
- **Client-Side Search Filtering**: Since PokéAPI doesn't support server-side search queries, the app fetches a list of all Pokémon names and filters client-side for an instant UX.
- **Virtualized Grid Rendering (react-virtual)**: To avoid performance bottlenecks with large datasets (1300+ Pokémon), virtualization ensures only visible items are rendered, keeping scroll smooth.
- **Lazy Data Fetching (react-query + intersection observer)**: Pokémon details are fetched only when their card is in the viewport to prevent 1300+ parallel API requests.
- **Floating Pokémon Background Inspired by Uniswap**: To create an immersive landing experience, floating Pokémon sprites subtly animate behind the search bar.
- **Custom Drawer for Evolution Chain**: Instead of cluttering the Pokémon detail view, evolutions are revealed via a slide-up drawer with swipe gestures (mobile-app feel).

### 🚧 Challenges Encountered:
- **PokéAPI Limitation on Search Queries**: The API does not provide a direct search endpoint. This forced a hybrid solution: fetching a static list of names for fast filtering, and lazy-fetching detailed data as needed.
- **Handling Massive Network Requests**: Fetching detailed data for every Pokémon initially caused 1300+ network calls. The solution was viewport-based lazy loading using `react-intersection-observer`.
- **Image Fallback Handling**: Some Pokémon images from GitHub CDN are broken/missing. A custom fallback image component was created to gracefully swap to a placeholder on error.
- **UX of Search Input Transition**: Ensuring a fluid UX transition from landing state to search results was tricky. The solution involved a sticky input bar and opacity/blur transitions to maintain visual continuity.
- **Maintaining Animations with Performance**: Floating background Pokémon and hover animations needed to be subtle to not overwhelm mobile devices, requiring careful animation timing and resource-efficient CSS techniques.
- **Visual Clarity on Keyboard Navigation**: Tabbing through cards lacked visual clarity initially. This was solved by enhancing focus-visible ring styles for better accessibility.
