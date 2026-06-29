# Draft Vault

Draft Vault is a web app prototype for recording and reviewing the writing process behind a document.

The idea is to help users keep a clear drafting history by saving writing events, verifying them with a hash chain, and generating an authorship-style report that can be reviewed or shared.

## Live Demo

[View the live demo](https://draft-vault.vercel.app)

> This project is still in progress. It is an MVP/prototype and not a finished production product.

## What it does right now

- Create and open documents
- Edit document titles
- Write inside a TipTap-based editor
- Autosave document content
- Record writing events while typing
- Store documents and writing events in PostgreSQL
- Verify writing events with a tamper-evident hash chain
- Replay the writing process
- Generate a basic authorship report
- Create a shareable read-only evidence link
- Google sign-in with Clerk
- User-owned documents
- Public read-only share links

## Why I built this

AI detection tools can sometimes create uncertainty around whether a text was written by a person or generated with AI. Draft Vault explores a different approach: instead of trying to detect AI, it records the writing process itself.

The goal is not to prove authorship with 100% certainty, but to provide useful evidence of how a document was developed over time.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TipTap editor
- Prisma
- PostgreSQL
- Neon
- Vercel
- Vitest

## Core Concepts

### Writing Events

While the user writes, Draft Vault records events such as inserts, deletes, word counts, character counts, timestamps, and operation data used for replay.

### Hash Chain Verification

Each writing event is linked to the previous event using a hash. If an old event is changed, the chain should no longer verify correctly.

### Replay

The replay page reconstructs the writing process from recorded writing operations.

### Authorship Report

The report summarizes the drafting session, including writing duration, event counts, word count, character count, final hash, and verification status.

## Project Status

This project is currently a working prototype. Some important things still need improvement:

- Better performance on deployed pages
- Authentication and user-specific documents
- Stronger production audit-log rules
- Better event batching/debouncing
- More polished UI and error handling
- PDF export for reports
- More complete testing

## Disclaimer

Draft Vault does not prove that a document is human-written. It provides evidence of the writing process and should be treated as a supporting tool, not as absolute proof.
