# Contributing to OyaShip Backend

Thank you for your interest in contributing!

## Development Setup

1. Node.js 20+
2. A Supabase project (free tier works) — [supabase.com](https://supabase.com)
3. Clone the repo and install dependencies:

```bash
git clone https://github.com/OyaShip/backend.git
cd backend
npm install
cp .env.example .env
# Fill in your Supabase and Stellar credentials
```

4. Run the dev server:

```bash
npm run dev
```

## Project Structure

- `src/routes/` — Express route handlers, one file per domain
- `src/services/escrow.js` — Stellar transaction builders
- `src/middleware/auth.js` — Wallet signature verification
- `src/config/` — Supabase and Stellar client setup

## Pull Request Process

1. Branch off `main`: `git checkout -b feat/your-feature`
2. Make your changes with clear, descriptive commits
3. Open a PR against `main` and fill in the PR template

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add offer message type to chat
fix: handle missing escrow key gracefully
chore: upgrade stellar-sdk to 13
test: add deals route integration tests
docs: update README with new env vars
```
