# Third-party notices

This Brabo candidate uses source independently found in `dyad-sh/dyad@93939ed845a48710f9e23f1017bf435c91af489b`, under its explicit Apache-2.0 root license (Copyright 2025 Dyad Tech, Inc.). LICENSE and the original NOTICE are preserved byte for byte. NOTICE mentions dependencies of the parent Dyad product (including mustardscript and Playwright); retaining this historical notice does not assert those packages are bundled in this candidate. No `src/pro` source was copied. The original scaffold package also declares MIT; this historical metadata is retained in source provenance and does not erase the explicit Apache grant or separately applicable third-party notices.

73 of the 81 inspected text files in the separate React/Vite/Nitro template have identical Git blobs in the licensed scaffold. The AI rules are composed from licensed scaffold instructions and `src/ipc/utils/ai_rules_patcher.ts`; Nitro config matches the literal in licensed `src/ipc/utils/nitro_setup.ts`. See BRABO_SOURCE.json for each comparison and source URL. These findings establish this candidate's source basis; they do not invent an umbrella license for the separate template repository.

## shadcn/ui

The copied `src/components/ui` files derive from shadcn/ui, MIT, Copyright (c) 2023 shadcn. Full notice in `LICENSES/shadcn-MIT.txt`; source https://github.com/shadcn-ui/ui. Applicable template modifications retain their upstream terms.

## React/Vite component tagger

Original `@dyad-sh/react-vite-component-tagger@0.9.0`, Apache-2.0. Full original copyright/license in `vendor/react-vite-component-tagger/LICENSE`. Vendored runtime bytes are unchanged; metadata/path modifications are documented in its README. This distribution makes no call to Dyad services; `data-dyad-*` remains a compatibility identifier.

## Frameworks and other dependencies

React, Vite, Nitro and the jiti configuration loader have MIT licenses, included from the exact installed versions in LICENSES/. Nitro's published third-party notices are included separately; additional bundled/dependency components keep their original notices. DEPENDENCIES.json inventories the actual locked/installed versions and notice hashes. Installing a library under MIT needs no new personal authorization from the template commit author. This does not relicense third-party packages as Brabo code.

## Brabo asset

`public/favicon.svg` is an original Brabo SVG under `LICENSES/Brabo-assets-MIT.txt`. The uninspected original binary favicon was not copied. `public/placeholder.svg` has an identical blob in the Apache-licensed scaffold and remains covered by that source basis.

Original Brabo card illustration: `public/brabo-template-preview.svg`, Copyright 2026 Brabo contributors, MIT; see `LICENSES/Brabo-assets-MIT.txt`.
