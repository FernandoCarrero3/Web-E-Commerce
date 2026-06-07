# Vertice Studio — E-Commerce

A modern, fully responsive e-commerce storefront for digital art prints, built as a frontend SPA with React and Vite. Demonstrates a complete purchase flow from product browsing to order confirmation, with persistent cart state and a clean, minimalist UI.

---

## Live Demo

> _Deploy link — e.g. Vercel/Netlify — (coming soon)_

---

## Screenshots

| Home                                                         | Product Detail                                              | Cart                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------- |
| ![Home page showing product grid](docs/screenshots/home.png) | ![Product detail page](docs/screenshots/product-detail.png) | ![Shopping cart](docs/screenshots/cart.png) |

---

## Features

- **Product catalog** — responsive grid with product cards and detail pages
- **Shopping cart** — add, remove, and adjust item quantities
- **Persistent cart** — cart state survives page refreshes via `localStorage`
- **Checkout flow** — billing and payment form with order summary
- **Order confirmation** — post-purchase success screen
- **Fully responsive** — mobile-first design that works on all screen sizes

---

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | [React 19](https://react.dev/)                            |
| Build tool | [Vite 7](https://vitejs.dev/)                             |
| Routing    | [React Router v7](https://reactrouter.com/)               |
| Styling    | [Tailwind CSS v3](https://tailwindcss.com/)               |
| Icons      | [React Icons](https://react-icons.github.io/react-icons/) |
| State      | React Context API + `localStorage`                        |
| Linting    | ESLint 9                                                  |

---

## Project Structure

```
src/
├── assets/
│   └── images/          # Product images
├── components/
│   ├── Navbar.jsx        # Top navigation with live cart count
│   ├── ProductCard.jsx   # Reusable product card
│   └── Footer.jsx        # Site footer
├── context/
│   └── CartContext.jsx   # Global cart state (Context + useReducer pattern)
├── data/
│   └── data.js           # Product catalogue data
└── pages/
    ├── Home.jsx           # Product listing
    ├── ProductDetail.jsx  # Single product view
    ├── Cart.jsx           # Cart management
    ├── Checkout.jsx       # Checkout form
    └── OrderSuccess.jsx   # Order confirmation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/vertice-studio.git
cd vertice-studio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start dev server with Hot Module Replacement |
| `npm run build`   | Create optimised production build in `/dist` |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint across the codebase               |

---

## Roadmap

- [ ] Form validation with [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [ ] Toast notifications for cart actions
- [ ] Product search and category filtering
- [ ] 404 / not-found page
- [ ] Loading skeleton screens
- [ ] Migrate to TypeScript
- [ ] Unit tests with [Vitest](https://vitest.dev/)
- [ ] GitHub Actions CI pipeline
- [ ] Deploy to Vercel

---

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome. Feel free to open an issue.

---

## License

Distributed under the [MIT License](LICENSE).
