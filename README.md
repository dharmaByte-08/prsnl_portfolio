Dharmendra Kanzariya — Developer Portfolio

A modern, premium single-page developer portfolio built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light mode, animated sections, skill cards, project showcase, and a contact form.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Theme | next-themes (dark / light) |
| Forms | react-hook-form + Zod |
| Icons | lucide-react |
| Package Manager | pnpm (workspace monorepo) |

---

## Prerequisites

Make sure the following are installed on your machine before proceeding.

### 1. Node.js (v20 or higher recommended)

Download from [https://nodejs.org](https://nodejs.org) or use a version manager:

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Verify
node --version   # should print v20.x.x or higher
```

### 2. pnpm

This project uses **pnpm** as its package manager. Do not use `npm` or `yarn`.

```bash
# Install pnpm globally
npm install -g pnpm

# Verify
pnpm --version   # should print 9.x.x or higher
```

---

## Local Setup — Step by Step

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

> Replace `your-username/your-repo-name` with the actual repository URL.

---

### Step 2 — Install dependencies

Run this from the **project root** (not inside any subfolder). pnpm will install dependencies for all workspace packages at once.

```bash
pnpm install
```

This installs packages for:
- `artifacts/portfolio` — the portfolio frontend
- `artifacts/api-server` — the API server
- `lib/*` — shared libraries

---

### Step 3 — Set environment variables

The portfolio dev server requires two environment variables: `PORT` and `BASE_PATH`.

Create a `.env` file inside `artifacts/portfolio/`:

```bash
# On macOS / Linux
touch artifacts/portfolio/.env
```

Then open `artifacts/portfolio/.env` and add:

```env
PORT=3000
BASE_PATH=/
```

> - `PORT` — the local port the dev server will listen on (use any free port, e.g. `3000`)
> - `BASE_PATH` — the URL base path. Use `/` for local development

---

### Step 4 — Start the portfolio dev server

**Option A: Using the provided script (Easiest)**

```bash
# PowerShell
.\start-dev.ps1

# OR Command Prompt / Batch
start-dev.bat
```

**Option B: Direct command**

```bash
# macOS / Linux
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev

# Windows PowerShell
$env:PORT='3000'; $env:BASE_PATH='/'; pnpm --filter @workspace/portfolio run dev

# Windows Command Prompt
set PORT=3000 && set BASE_PATH=/ && pnpm --filter @workspace/portfolio run dev
```

The terminal will show:

```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

Open **http://localhost:3000** in your browser — the portfolio is running.

---

### Step 5 — (Optional) Start the API server

The portfolio is a static frontend and does not require the API server. If you still want to run it:

```bash
# Set required env vars for the API server
export PORT=5000
export NODE_ENV=development

pnpm --filter @workspace/api-server run dev
```

The API server will be available at **http://localhost:5000/api**.

You can verify it is running:

```bash
curl http://localhost:5000/api/healthz
# Expected: {"status":"ok"}
```

---

## Project Structure

```
.
├── artifacts/
│   ├── portfolio/          # React + Vite portfolio (main app)
│   │   ├── src/
│   │   │   ├── components/ # Section components (Hero, About, Skills, Projects, Contact…)
│   │   │   ├── App.tsx     # Root component
│   │   │   └── index.css   # Tailwind + CSS variables (dark/light theme tokens)
│   │   └── package.json
│   └── api-server/         # Express 5 API server (optional for this portfolio)
│       └── src/
│           ├── app.ts
│           ├── index.ts
│           └── routes/
├── lib/
│   ├── api-client-react/   # Generated React Query hooks (from OpenAPI)
│   ├── api-spec/           # OpenAPI specification + codegen config
│   ├── api-zod/            # Generated Zod validation schemas
│   └── db/                 # Drizzle ORM schema + database client
├── pnpm-workspace.yaml     # Workspace config + dependency catalog
├── package.json            # Root scripts
└── tsconfig.json           # Root TypeScript solution config
```

---

## Available Scripts

Run these from the **project root** unless stated otherwise.

| Command | Description |
|---|---|
| `pnpm install` | Install all workspace dependencies |
| `pnpm --filter @workspace/portfolio run dev` | Start portfolio dev server |
| `pnpm --filter @workspace/portfolio run build` | Build portfolio for production |
| `pnpm --filter @workspace/portfolio run typecheck` | TypeScript check for portfolio |
| `pnpm --filter @workspace/api-server run dev` | Start API server (development) |
| `pnpm run typecheck` | Full TypeScript check across all packages |
| `pnpm run build` | Full typecheck + build all packages |

---

## Production Build

To create an optimized production build of the portfolio:

```bash
# Set env vars required by the build
export PORT=3000
export BASE_PATH=/

pnpm --filter @workspace/portfolio run build
```

The built files will be output to `artifacts/portfolio/dist/public/`.

To preview the production build locally:

```bash
pnpm --filter @workspace/portfolio run serve
```

---

## Customization

### Update personal details

All portfolio content is written directly in the component files inside `artifacts/portfolio/src/components/`:

| File | What it controls |
|---|---|
| `Hero.tsx` | Name, role, bio, social links, avatar |
| `About.tsx` | About paragraphs, stats cards |
| `Skills.tsx` | Skill groups and individual skills |
| `Projects.tsx` | Project cards, descriptions, stack badges, links |
| `Contact.tsx` | Contact form, contact detail links |

### Change the accent color

Open `artifacts/portfolio/src/index.css` and update the `--primary` CSS variable in both `:root` (light mode) and `.dark` (dark mode) blocks.

### Change the theme default

Open `artifacts/portfolio/src/App.tsx` and update the `defaultTheme` prop on the `ThemeProvider`:

```tsx
<ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
```

---

## Troubleshooting

**`PORT environment variable is required`**

The Vite config reads `PORT` at startup. Make sure you have created `artifacts/portfolio/.env` with `PORT=3000` as described in Step 3, or export it before running.

**On macOS / Linux:**
```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev
```

**On Windows PowerShell:**
```powershell
$env:PORT='3000'; $env:BASE_PATH='/'; pnpm --filter @workspace/portfolio run dev
```

**On Windows Command Prompt:**
```cmd
set PORT=3000 && set BASE_PATH=/ && pnpm --filter @workspace/portfolio run dev
```

---

**`pnpm: command not found`**

pnpm is not installed globally. Install it with:

```bash
npm install -g pnpm
```

---

**Port already in use**

Change `PORT` to any unused port (e.g. `3001`, `4000`):

```env
PORT=4000
BASE_PATH=/
```

---

**TypeScript errors after pulling changes**

Rebuild shared library declarations first, then recheck:

```bash
pnpm run typecheck:libs
pnpm --filter @workspace/portfolio run typecheck
```

---

## License

MIT — feel free to use this as a base for your own portfolio.
