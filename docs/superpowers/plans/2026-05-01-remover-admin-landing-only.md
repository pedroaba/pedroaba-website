# Remover Admin e Manter Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover autenticação, dashboard administrativo, CRUDs de clientes/projetos e dependências de banco, deixando o site como uma landing page pública.

**Architecture:** O app deve ficar com apenas a rota pública principal em `src/app/(landing-page)`, mais rotas técnicas de SEO como `sitemap`, `robots`, `opengraph-image` e `favicon`. Tudo que existe para admin deve sair em camadas: rotas, server actions, autenticação/middleware, Prisma, dependências e componentes shadcn usados só pelo dashboard.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, componentes locais em `src/components`, conteúdo estático em `src/config`.

---

## Scope

Manter:
- Landing page em `src/app/(landing-page)/page.tsx`.
- Layout raiz, estilos globais, assets, configs de portfolio, componentes visuais usados pela landing.
- Formulário de contato atual, porque ele é público e só abre `mailto:`.
- Rotas técnicas públicas: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/favicon.ico`.

Remover:
- Auth: `src/app/auth`, `src/app/api/auth`, `src/lib/authjs.ts`, `src/middleware.ts`.
- Dashboard/admin: `src/app/dashboard`.
- CRUD/server actions de clientes, projetos, usuários, senha e organização em `src/actions`.
- Prisma e banco: `prisma`, `src/lib/prisma.ts`, modelos/tipos `@prisma/client`, script `prisma generate`.
- Changelog público, se o objetivo "apenas landing" for literal: `src/app/changelogs` e `src/changelogs`.
- Dependências que ficarem sem uso após a remoção.

## File Map

- Modify: `package.json` para remover script de Prisma e pacotes sem uso.
- Modify: `src/app/providers.tsx` para tirar `SessionProvider`, `TanstackQueryClient`, `NuqsAdapter` e manter apenas providers públicos necessários.
- Modify: `src/env.ts` ou delete, dependendo de não haver mais uso de env obrigatória.
- Modify: `next.config.ts` para remover MDX caso changelogs saiam.
- Modify: `tsconfig.json` para remover include de MDX dos changelogs.
- Delete: `src/app/auth/**`, `src/app/api/auth/**`, `src/app/dashboard/**`, `src/actions/**`, `src/lib/authjs.ts`, `src/lib/prisma.ts`, `src/lib/tanstack-query.tsx`, `src/middleware.ts`, `prisma/**`.
- Delete if unused: `src/constants/entity-status.ts`, `src/parsers/decimal.ts`, `src/utils/crypto.ts`, `src/utils/query-builder.ts`, `src/utils/returns-default-action-message.ts`, `src/utils/returns-default-query-list.ts`, `src/utils/invalidate-cache-on-pages.ts`, `src/utils/format-cents-to-real.ts`, `src/utils/format-username.ts`.
- Delete if changelogs are removed: `src/app/changelogs/**`, `src/changelogs/**`, `src/utils/changelog-reader.ts`, `src/mdx-components.tsx`.
- Delete unused UI components after import audit, likely including admin-only items like `table`, `dialog`, `drawer`, `select`, `calendar`, `dropdown-menu`, `tabs`, `pagination`, `alert-dialog`, `password-field`, `file-upload`, `chart`, `resizable`, `input-otp`, `command`, `combobox`, `menubar`, `sidebar`, `sheet`, etc.

## Task 1: Baseline Audit

- [ ] Run `rg "@pedroaba/(actions|lib/authjs|lib/prisma)|next-auth|@prisma|prisma|dashboard|auth/sign|src/app/changelogs|src/changelogs" src package.json next.config.ts tsconfig.json`.
- [ ] Confirm every remaining match belongs to admin/auth/database/changelog and not to the landing.
- [ ] Run `rg "ContactSectionForm|react-hook-form|sonner|zod" src/components src/app` to confirm the public contact form still needs form/toast validation packages.
- [ ] Commit baseline separately only if the working tree is clean and the team wants checkpoint commits.

## Task 2: Remove Routes and Middleware

- [ ] Delete `src/app/auth`.
- [ ] Delete `src/app/api/auth`.
- [ ] Delete `src/app/dashboard`.
- [ ] Delete `src/middleware.ts`.
- [ ] Delete `src/app/changelogs` and `src/changelogs` if the final product is strictly landing-only.
- [ ] Run `pnpm build`.
- [ ] Expected: build fails only because imports/config still reference deleted files. Fix those in later tasks, not by restoring admin code.

## Task 3: Remove Auth, Actions, Prisma, and Admin Utilities

- [ ] Delete `src/actions`.
- [ ] Delete `src/lib/authjs.ts`.
- [ ] Delete `src/lib/prisma.ts`.
- [ ] Delete `src/lib/tanstack-query.tsx`.
- [ ] Delete `prisma`.
- [ ] Delete admin-only utilities listed in the File Map after confirming no imports remain.
- [ ] Run `rg "@pedroaba/actions|@pedroaba/lib/(authjs|prisma|tanstack-query)|@prisma|prisma" src package.json`.
- [ ] Expected: no source matches except package entries that will be removed in Task 5.

## Task 4: Simplify Public App Shell

- [ ] Edit `src/app/providers.tsx`.
- [ ] Remove `SessionProvider`, `TanstackQueryClient`, and `NuqsAdapter`.
- [ ] Keep `ThemeProvider`, `ProgressProvider`, `TooltipProvider`, and `Toaster` if still used by the landing/contact form.
- [ ] Edit `src/env.ts` only if it is still imported. If nothing imports it, delete it.
- [ ] Run `rg "@pedroaba/env|AUTH_SECRET|DATABASE_URL|SessionProvider|TanstackQueryClient|NuqsAdapter" src`.
- [ ] Expected: no matches unless a public feature intentionally uses env.

## Task 5: Clean Package Dependencies

- [ ] Remove Prisma/auth/database packages from `package.json`: `@auth/prisma-adapter`, `@prisma/client`, `next-auth`, `prisma`, `pg`, `@types/pg`, `argon2`.
- [ ] Remove server-action/admin state packages if no imports remain: `zsa`, `zsa-react`, `@tanstack/react-query`, `nuqs`, `@mantine/core`, `@mantine/hooks`.
- [ ] Remove MDX packages if changelogs are deleted: `@mdx-js/loader`, `@mdx-js/react`, `next-mdx-remote`, `@types/mdx`.
- [ ] Keep public landing dependencies that are still imported: `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`, `@bprogress/next`, `next-themes`, `framer-motion`/`motion`, icons and Radix primitives used by retained UI components.
- [ ] Run package install with the existing package manager: `pnpm install`.
- [ ] Expected: lockfile updates and no removed package remains imported.

## Task 6: Prune Unused UI Components

- [ ] Run `rg "@pedroaba/components/ui/" src/app src/components`.
- [ ] Keep UI primitives used by the landing, currently likely `badge`, `button`, `card`, `form`, `input`, `textarea`, `sonner`, `tooltip`, and any primitives they import internally.
- [ ] Delete UI files that have no imports after admin removal.
- [ ] After every small batch, run `pnpm build` or `pnpm exec tsc --noEmit`.
- [ ] Expected: no missing component imports and fewer unused Radix/dependency packages.

## Task 7: Remove Changelog/MDX Config if Landing-Only

- [ ] If changelogs were deleted, edit `next.config.ts` to remove `@next/mdx`, `pageExtensions`, and `withMDX`.
- [ ] If changelogs were deleted, edit `tsconfig.json` to remove `src/app/changelogs/page.mdx` from `include`.
- [ ] Delete `src/mdx-components.tsx` and `src/utils/changelog-reader.ts`.
- [ ] Run `rg "mdx|changelog|CHANGELOG" src package.json next.config.ts tsconfig.json`.
- [ ] Expected: no changelog/MDX references remain.

## Task 8: Final Verification

- [ ] Run `pnpm build`.
- [ ] Run `pnpm exec eslint .` if the local lint setup supports ESLint directly.
- [ ] Start the dev server with `pnpm dev`.
- [ ] Open `/` and verify the landing renders.
- [ ] Verify removed routes return 404 or do not exist: `/dashboard`, `/auth/sign-in`, `/auth/sign-up`, `/changelogs`.
- [ ] Verify the contact form still opens a `mailto:` link and shows success feedback.
- [ ] Run `rg "dashboard|auth/sign|next-auth|@prisma|DATABASE_URL|AUTH_SECRET|prisma|zsa|ClientStatus|ProjectStatus" src package.json`.
- [ ] Expected: no admin/auth/database references remain, except prose in old docs if intentionally kept.

## Commit Plan

- [ ] Commit 1: `refactor: remove admin routes and auth`
- [ ] Commit 2: `refactor: remove prisma and server actions`
- [ ] Commit 3: `chore: prune landing-only dependencies`
- [ ] Commit 4: `chore: remove unused admin ui components`
- [ ] Commit 5: `chore: verify landing-only build`

## Risks

- `src/app/providers.tsx` currently wraps the whole app with auth/query/url-state providers; removing them must preserve theme, progress, tooltip and toast behavior for the landing.
- The contact form still uses `react-hook-form`, `zod`, `sonner` and local `Form` UI primitives, so these should not be removed unless the form is also simplified.
- Removing `changelogs` is a product decision: it is not admin, but it conflicts with "apenas a landing page".
- Dependency pruning should happen after source deletion, otherwise it is easy to remove packages that are still needed by public UI primitives.
