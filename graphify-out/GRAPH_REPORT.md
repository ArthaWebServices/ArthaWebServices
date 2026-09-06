# Graph Report - ArthaWebServices  (2026-09-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 288 nodes · 446 edges · 18 communities (12 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `86786ca3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `cn()` - 20 edges
2. `compilerOptions` - 18 edges
3. `lucide-react` - 16 edges
4. `SiteConfig` - 12 edges
5. `compilerOptions` - 11 edges
6. `Button()` - 10 edges
7. `Reveal()` - 10 edges
8. `Section()` - 9 edges
9. `SectionHeader()` - 9 edges
10. `next` - 9 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  frontend/app/layout.tsx → frontend/lib/utils.ts
- `Logo()` --calls--> `cn()`  [EXTRACTED]
  frontend/components/Logo.tsx → frontend/lib/utils.ts
- `Navbar()` --calls--> `cn()`  [EXTRACTED]
  frontend/components/Navbar.tsx → frontend/lib/utils.ts
- `Pricing()` --calls--> `cn()`  [EXTRACTED]
  frontend/components/sections/Pricing.tsx → frontend/lib/utils.ts
- `ProjectForm()` --calls--> `cn()`  [EXTRACTED]
  frontend/components/ProjectForm.tsx → frontend/lib/utils.ts

## Import Cycles
- None detected.

## Communities (18 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (33): metadata, PostPageProps, fontSans, metadata, RootLayout(), metadata, metadata, companyLinks (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (34): Cta(), Pricing(), Process(), outcomes, ProofBand(), Services(), avatarTints, Team() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (27): devDependencies, @types/node, typescript, vitest, @vitest/ui, @types/node, typescript, name (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (30): dependencies, clsx, framer-motion, lucide-react, next, react, react-dom, tailwind-merge (+22 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (9): metadata, ProjectForm(), ProjectFormApiResponse, Status, TechStack(), MarqueeDirection, techCategories, TechCategory (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (13): description, devDependencies, concurrently, name, private, scripts, build, dev (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, eslint, eslint-config-next, next-sitemap, postcss, tailwindcss, @types/node (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (8): scripts, build, dev, start, test, test:coverage, test:ui, typecheck

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (4): Faq(), faq, FaqItem, framer-motion

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (6): dependencies, hono, @hono/node-server, tsx, uuid, zod

## Knowledge Gaps
- **154 isolated node(s):** `PostPageProps`, `LogoSize`, `LogoVariant`, `JsonLdProps`, `ButtonProps` (+149 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 177 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-react` connect `Community 1` to `Community 0`, `Community 10`, `Community 3`, `Community 5`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `@types/node` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `typescript` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **What connects `PostPageProps`, `LogoSize`, `LogoVariant` to the rest of the system?**
  _154 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06103896103896104 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08385744234800839 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._