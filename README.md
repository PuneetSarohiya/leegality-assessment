# 🛒 Product Listing App

A React-based e-commerce product listing application built with Redux, React Router, and the DummyJSON API. Features include dynamic filtering, pagination, product detail pages, and a fully responsive mobile UI.
---
## 📦 Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 1.22

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/product-listing-app.git
cd product-listing-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Environment

No `.env` file is required. The app uses the public **DummyJSON API** directly:

```
Base URL: https://dummyjson.com
```

---

## 📁 Project Structure

```
LEEGALITY-ASSIGNMENT/
├── public/                             # Static assets
├── src/
│   ├── app/
│   │   └── routes/
│   │       └── routes.js               # Lazy-loaded route definitions
│   │
│   ├── components/
│   │   ├── Checkbox/
│   │   │   └── Checkbox.js             # Reusable checkbox input component
│   │   ├── FilterDrawer/
│   │   │   └── FilterDrawer.js         # Mobile bottom-sheet filter drawer
│   │   ├── Filters/
│   │   │   └── Filters.js              # Sidebar filter panel (desktop)
│   │   ├── Loader/
│   │   │   └── Loader.js               # Loading spinner component
│   │   ├── Navbar/
│   │   │   └── Navbar.js               # Sticky top navigation bar
│   │   ├── NotFoundPage/
│   │   │   └── NotFoundPage.js         # 404 page component
│   │   ├── Pagination/
│   │   │   └── Pagination.js           # Page navigation component
│   │   ├── ProductCard/
│   │   │   └── ProductCard.js          # Individual product card component
│   │   ├── Radio/
│   │   │   └── Radio.js                # Reusable radio button component
│   │   └── Toastify/
│   │       └── Toast.js                # Toast notification helper
│   │
│   ├── pages/
│   │   ├── ProductDetail/
│   │   │   └── ProductDetail.js        # Individual product detail page
│   │   └── ProductListing/
│   │       └── ProductListing.js       # Main listing page with filters
│   │
│   ├── redux/
│   │   ├── Actions/
│   │   │   └── AppActions.js           # Redux action creators & thunks
│   │   └── Reducers/
│   │       └── AppReducers.js          # Redux reducer + selectors
│   │
│   ├── styles/
│   │   ├── Checkbox.module.css
│   │   ├── FilterDrawer.module.css
│   │   ├── Filters.module.css
│   │   ├── Loader.module.css
│   │   ├── Navbar.module.css
│   │   ├── NotFound.module.css
│   │   ├── Pagination.module.css
│   │   ├── ProductDetail.module.css
│   │   ├── ProductListing.module.css
│   │   └── Radio.module.css
│   │
│   ├── util/
│   │   └── apiCaller.js                # Centralized API call utility
│   │
│   ├── App.css
│   ├── App.js                          # Root component with BrowserRouter + Navbar
│   ├── App.test.js
│   ├── Global.css                      # Global base styles
│   ├── index.css
│   └── index.js                        # React DOM entry point
│
├── screenshots/
│   ├── product-listing.png
│   ├── product-listing-scrolled.png
│   └── product-detail.png
│
├── package.json
└── README.md
```

---

## 🔌 API Endpoints Used

| Endpoint | Usage |
|----------|-------|
| `GET /products` | Fetch all products on initial load |
| `GET /products/categories` | Fetch category list for filter sidebar |
| `GET /products/category/{slug}` | Fetch products filtered by category |
| `GET /products/{id}` | Fetch single product for detail page |

---

## 🧠 Assumptions Made

1. **DummyJSON is the sole data source** — No backend or custom API is required. All product, category, and review data comes from `https://dummyjson.com`.

2. **Category filter uses API**, brand and price filters use **local filtering** — Since DummyJSON does not support combined query filters (brand + price + category in one request), category changes trigger a new API call while brand and price are applied client-side on the returned results.

3. **No authentication required** — The product listing and detail pages are publicly accessible. Auth-related actions (login, logout) in the codebase are present but not wired to a UI flow in this version.

4. **`product.category` field matches the category slug** — The category slug returned by `/products/categories` (e.g. `"mens-shirts"`) is assumed to match the `category` field on each product object directly.

5. **Pagination is client-side** — Products are paginated locally (8 per page) after filtering. The API's `limit`/`skip` pagination is not used to keep filter logic consistent.

6. **`react-stars` for ratings** — It is assumed this package is already installed. Run `npm install react-stars` if missing.

7. **Toast notifications are non-blocking** — API errors show a toast but do not crash the UI; an empty state message is shown instead.

---

## 🏗️ Architectural Decisions

### 1. Redux for Global State
Redux (with Thunk middleware) is used to manage:
- The full product list (updated by API calls)
- Category list
- Single product (for detail page)
- Total product count

This avoids prop-drilling across deeply nested components and makes filter state easy to coordinate.

### 2. Two-Layer Filtering Strategy
- **Layer 1 — Server:** Selecting a category dispatches `fetchProductsByCategory(slug)`, which calls `GET /products/category/{slug}`. This replaces the Redux product list with only the relevant products.
- **Layer 2 — Client:** Brand and price filters are applied via `useMemo` on the Redux product list. This is efficient because the dataset per category is small (DummyJSON returns ~10–30 items per category).

This hybrid approach avoids over-fetching while keeping filter logic simple.

### 3. CSS Modules for Scoped Styling
Each component has its own `.module.css` file to prevent style leakage, enable co-location, and avoid global class name conflicts.

### 4. Sticky Sidebar + Independent Scroll
The sidebar uses `position: sticky` with `height: calc(100vh - 60px)` and `overflow-y: auto`. The content area scrolls independently. This ensures filters remain visible while browsing products — a key UX requirement.

### 5. Mobile Filter Drawer (Bottom Sheet)
On screens ≤ 991px, the sidebar is hidden and replaced with a "Filters" button. Tapping it opens a bottom-sheet drawer (inspired by Amazon/Flipkart mobile UX) with:
- Smooth slide-up animation
- Backdrop overlay
- Body scroll lock while open
- "Clear All" and "Apply" CTA buttons

### 6. Lazy Loading for Routes
`React.lazy` + `Suspense` is used for `ProductListing` and `ProductDetail` pages. This splits the JS bundle and reduces initial load time.

### 7. Pagination Reset on Filter Change
A `useEffect` watches filter state variables (`selectedCategory`, `selectedBrands`, `minPrice`, `maxPrice`) and resets `currentPage` to 1 whenever any filter changes. This prevents the user from being stranded on a page that no longer exists after filtering.

### 8. Centralized API Caller (`apiCaller.js`)
All HTTP requests go through a single `callApi(endpoint, method, payload)` utility. This makes it easy to add auth headers, base URL changes, or global error handling in one place.

### 9. Navbar in `components/` (not `pages/`)
The `Navbar` is placed inside `components/` because it is a shared UI element rendered on every page via `App.js`, not a routed page itself. This keeps `pages/` reserved for route-level views only.

---

## 🚀 Improvements If Given More Time

### Features
- **Search bar with debounce** — Wire the Navbar search input to `GET /products/search?q={query}` with a 300ms debounce to avoid excessive API calls while typing.
- **Sort options** — Add a dropdown to sort products by price (low–high, high–low) or rating.
- **Cart functionality** — Add to cart, cart drawer/modal, and local cart state (persisted via `localStorage` or Redux Persist).
- **Wishlist** — Save products to a wishlist with heart icon toggle on product cards.
- **Product image gallery** — On the detail page, show all images from `product.images[]` as a scrollable thumbnail strip with a main image viewer.

### Performance
- **API-level pagination** — Use DummyJSON's `limit` and `skip` params so only 8 products are fetched per page instead of all products at once.
- **React Query or SWR** — Replace manual Redux thunks with React Query for built-in caching, background refetching, and loading/error states.
- **Image lazy loading** — Add `loading="lazy"` to all product images and consider a skeleton loader while images fetch.

### Code Quality
- **TypeScript** — Add TypeScript for type safety on Redux state shape, API response types, and component props.
- **Unit tests** — Write tests for reducers, action creators, and key components (Filters, Pagination) using Jest + React Testing Library.
- **Custom hooks** — Extract filter logic from `ProductListing` into a `useProductFilters()` hook for cleaner separation of concerns.
- **Error boundary** — Add a React Error Boundary around page components to gracefully catch and display render errors.

### UX
- **Loading skeletons** — Replace the plain "Loading..." text with animated card skeletons during API calls for a polished feel.
- **Filter persistence** — Save active filters to URL query params (`?category=beauty&brand=Essence`) so users can share/bookmark filtered views and the browser back button works correctly.
- **Accessibility (a11y)** — Add proper ARIA labels, keyboard navigation for the filter drawer, and focus trapping when the mobile drawer is open.
- **Empty state illustrations** — Show a friendly illustration when no products match the applied filters, instead of plain text.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Redux + Redux Thunk | Global state management |
| React Router v6 | Client-side routing |
| CSS Modules | Scoped component styling |
| react-stars | Star rating display |
| DummyJSON API | Mock product data source |

---

## 👤 Author

Built as part of a Frontend Engineering Assessment.
