# Next.js 15 Refresher Project: PokéDex Explorer

The primary goal of this project is to refresh and solidify my understanding of the latest Next.js features and best practices, specifically using the App Router.
In practice, I want to build a small PokéDex application. 

### Disclaimer: this is just a practice project that is not endorsed by Nintendo and/nor The Pokémon Company, its goal is purely didactic for my own self's web development knowledge

## 1. Project Overview & Goals

**Concept:** A clean, fast, and modern web application for browsing and searching for Pokémon.

**Learning Objectives:**

- Master data fetching patterns in the App Router (Server Components, fetch caching).
- Implement dynamic routing for individual Pokémon pages.
- Understand the "Server First" paradigm and correctly distinguish between Server and Client Components.
- Utilize Server Actions for mutations/actions without creating API routes.
- Implement core UI states: loading (with Suspense) and error handling.
- Gain experience with modern UI libraries like shadcn/ui.

## 2. Core Technologies & Stack

- **Framework:** Next.js 15 (with Turbopack)
- **Directory Structure:** App Router with src directory
- **Language:** TypeScript
- **Package Manager:** Bun
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui.
- **API Client:** pokenode-ts for type-safe access to the PokeAPI.
- **Linter/Formatter:** Biome

## 3. Key Next.js Concepts to Focus On

This project is designed to practice the following:

- **Server Components:** For data fetching and rendering static content. (Default in App Router).
- **Client Components:** For interactivity ('use client').
- **Dynamic Routes:** For creating pages for each Pokémon (e.g., src/app/pokemon/[name]/page.tsx).
- **generateStaticParams:** To pre-render the most popular Pokémon pages at build time (SSG).
- **Data Fetching & Caching:** Using the native fetch API which is automatically cached by Next.js.
- **Server Actions:** For handling the search functionality from a Client Component without a separate API endpoint.
- **Loading UI:** Using loading.tsx file conventions for instant loading states with Suspense.
- **Error Handling:** Using error.tsx file conventions to handle potential runtime errors gracefully.
- **Metadata API:** For generating dynamic page titles and descriptions (great for SEO).

## 4. Feature Breakdown & Page Structure

### Page 1: Home - Pokémon List (/)

This will be the main landing page, displaying a paginated grid of Pokémon.

**Rendering Strategy:** Static Site Generation (SSG) with Revalidation (ISR). The initial list of Pokémon doesn't change often. We can fetch the first page at build time and use revalidation to keep it fresh.

**Features:**

- A grid of PokemonCard components.
- Each card shows the Pokémon's sprite, name, and primary type.
- A "Search Bar" component at the top.
- Pagination controls at the bottom to load the next/previous set of Pokémon.

### Page 2: Pokémon Detail Page (/pokemon/[name])

This page will show detailed information about a single Pokémon.

**Rendering Strategy:** Static Site Generation (SSG) using generateStaticParams. We can pre-build pages for the first 151 Pokémon, for example, and others will be generated on-demand.

**Features:**

- Header section with the Pokémon's name, number, and main sprites (default, shiny).
- An "About" section showing height, weight, and abilities.
- A "Stats" section with base stats displayed using progress bars or a radar chart.
- A "Types" section showing type effectiveness (weaknesses, resistances).
- An "Evolutions" section showing the evolution chain.

### Core Functionality: Search

**Implementation:** The search bar will be a Client Component to handle user input. When the user submits a search, it will trigger a Server Action.

**Logic:**

- The Server Action will receive the search query.
- It will call the PokeAPI to find a matching Pokémon.
- If found, it will redirect the user to the corresponding detail page using Next.js's redirect function.
- If not found, it can return an error message to be displayed in the client component.

## 5. Component Strategy (Server vs. Client)

This is a critical aspect of the App Router.

### Server Components (Default):

- src/app/page.tsx (Main page, fetches initial list)
- src/app/pokemon/[name]/page.tsx (Detail page, fetches specific Pokémon data)
- PokemonCard.tsx (Purely display component)
- PokemonStats.tsx, PokemonAbout.tsx (Display components on detail page)
- Header.tsx, Footer.tsx (Static layout components)

### Client Components ('use client'):

- SearchForm.tsx (Needs useState for input, handles form submission)
- Pagination.tsx (Needs useState and useRouter to change pages)
- PokemonDetailTabs.tsx (If I decide to use tabs on the detail page, this would need state to manage the active tab).

## 6. Detailed Codebase Structure (Feature-Based)

```
poke/
└── src/
    ├── app/
    │   ├── layout.tsx                # Root layout
    │   ├── page.tsx                  # Home page component (Server)
    │   ├── loading.tsx               # Root loading UI
    │   ├── error.tsx                 # Root error UI
    │   └── pokemon/
    │       └── [name]/
    │           ├── page.tsx          # Pokemon detail page (Server)
    │           ├── loading.tsx       # Loading UI for detail page
    │           └── error.tsx         # Error UI for detail page
    │
    ├── components/                   # Shared, application-wide UI components
    │   ├── ui/                       # Components from shadcn/ui will go here
    │   │   ├── button.tsx
    │   │   └── card.tsx
    │   ├── Header.tsx                # Site header
    │   ├── Footer.tsx                # Site footer
    |   └── ...                       # Other brand new components / overrides of shadcn/ui components
    │
    ├── features/                     # Domain-specific logic and components
    │   └── pokemon/
    │       ├── actions/
    │       │   └── search.action.ts  # Server Action for searching
    │       │
    │       ├── components/
    │       │   ├── PokemonGrid.tsx       # Displays the list of cards (Server)
    │       │   ├── PokemonCard.tsx       # Single card component (Server)
    │       │   ├── PokemonDetailView.tsx # Main view for the detail page (Server)
    │       │   ├── SearchForm.tsx        # Search input and button (Client)
    │       │   └── Pagination.tsx        # Next/Prev buttons (Client)
    │       │
    │       ├── pokeapi.hooks.ts  # Hooks related to Pokémon's components
    │       │
    │       ├── pokeapi.service.ts  # Logic to interact with pokenode-ts SDK
    │       │
    │       └── pokemon.types.ts    # Custom or extended types for Pokémon data
    │
    └── lib/                            # Utility functions
        └── utils.ts                    # General helper functions (e.g., capitalize)
```

## 7. Step-by-Step Development Plan

### 1. Setup & Styling:

- Initialize shadcn/ui in your project: `bunx --bun shadcn@latest init`
- Add a few components I'll need, like Button, Card, Input, Progress.
- Styling should be mobile first
- Set up the root layout (src/app/layout.tsx) with a basic theme, header, and footer.

### 2. API Service Layer:

- In src/features/pokemon/pokeapi.service.ts, create functions to wrap the pokenode-ts client.
- Example functions: getPokemonList(offset, limit), getPokemonByName(name). This layer allows me to handle caching logic or data transformation in one place.

### 3. Home Page - Pokémon List:

- In src/app/page.tsx, use my service to fetch the initial list of Pokémon.
- Pass the data to the PokemonGrid component.
- Build the PokemonCard component to display the data for each Pokémon. Use <Link> to navigate to the detail page.
- Implement the Pagination client component, using useSearchParams to read the current page and useRouter to push new URLs.

### 4. Pokémon Detail Page:

- Implement generateStaticParams in src/app/pokemon/[name]/page.tsx to pre-build the first ~20 pages.
- In the page component, fetch the detailed data for the Pokémon based on the name param.
- Build out the different sections (About, Stats, etc.) as separate components to keep the code clean.
- Use the generateMetadata function to set the page title dynamically (e.g., <title>Bulbasaur | PokéDex</title>).

### 5. Search Functionality:

- Create the searchPokemon Server Action in src/features/pokemon/actions/search.action.ts.
- Build the SearchForm client component. Use the useFormState and useFormStatus hooks for a better user experience (handling pending states).
- Call the server action from the form's action prop.

### 6. Loading & Error States:

- Create a simple loading.tsx file in /app and /app/pokemon/[name] with a spinner or skeleton loader. Next.js will automatically wrap pages in a Suspense boundary.
- Create a basic error.tsx file in the same directories to show a user-friendly error message.

### 7. Final Polish:

- Refine the styling using Tailwind CSS.
- Ensure the site is fully responsive on all screen sizes.
- Add some subtle animations with Framer Motion or CSS transitions.