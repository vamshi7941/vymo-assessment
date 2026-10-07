# Vymo Lead Form

A responsive React + TypeScript lead-capture form rendered from a typed field configuration.

## Install and run

```sh
npm install
npm run dev
```

For a production build, run `npm run build`. To serve that build locally, run `npm run preview`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`. In the repository settings, select **Settings → Pages → Build and deployment → GitHub Actions** as the source. The Vite base path is configured for the `vymo-assessment` repository.

After the workflow succeeds, the site will be available at `https://vamshi7941.github.io/vymo-assessment/`.

## Folder layout

```text
src/
  design-system/
    atoms/                 Text input, select, checkbox, textarea, and button
    Field.tsx              Reusable field molecule
    tokens.css             Color, spacing, type, and breakpoint tokens
    design-system.css      Shared control and field styles
  features/
    lead/
      leadFormConfig.ts    Typed lead values, field types, and config
      leadFormValidation.ts Config-and-values validation rules
      LeadForm.tsx         Config-driven form rendering and form state
      LeadPage.tsx         Lead capture page composition
      lead.css             Lead page layout and responsive styles
  main.tsx                 React entry point and stylesheet imports
```

## Design system and form

- **Tokens:** `src/design-system/tokens.css`
- **Atoms:** `src/design-system/atoms/`
- **Field molecule:** `src/design-system/Field.tsx`
- **Config and field/value types:** `src/features/lead/leadFormConfig.ts`
- **Validation rules:** `src/features/lead/leadFormValidation.ts`
- **Config-driven form:** `src/features/lead/LeadForm.tsx`

## Responsive layout

`src/features/lead/lead.css` owns the lead page's desktop and mobile layout. Desktop uses a two-column form above 1024px; tablet and mobile use a single column. The mobile submit bar is fixed at the bottom of the screen below 768px. Shared atom and field styles live in `src/design-system/design-system.css`.
# vymo-assessment
