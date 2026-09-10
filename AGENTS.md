# AGENTS.md — Nivaror Prototipos monorepo

This is the shared source of truth for any agent working inside this
repository (`github.com/Nivaror/Prototipos`), including Codex/OpenAI agents
invoked directly in this working directory rather than from the Nivaror
Vault. If you are missing filesystem access to it, the canonical, fuller
version of these rules lives at:

    /Users/lauta136/Documents/Nivaror Vault/core/prototype-workflow.md

Read it if you can. The rules below are the non-negotiable minimum if you
can't.

## The two hard rules

1. **Never hand-scaffold a new prototype.** Always run
   `scripts/new-prototype.sh <slug>` from the repo root. It creates the
   Vercel project (team `nivaror`), sets the project's Root Directory,
   deploys once, and commits + pushes the initial scaffold to GitHub —
   automatically. Bypassing it (manually copying `_templates/`, wiring up
   Vercel by hand) skips that commit/push and is exactly how prototypes end
   up deployed to production with zero trace in this repo.

2. **Every deploy after the scaffold must be followed by an explicit commit
   and push, in the same turn.** `scripts/new-prototype.sh` only commits the
   *initial* scaffold — nothing in this repo auto-commits later edits.
   After any `vercel --prod` for an existing prototype:
   ```
   cd ~/Prototipos
   git add prototypes/<slug>
   git commit -m "<what changed>: <slug>"
   git push
   ```
   This repo is the *only* version-history record for what's live on
   Vercel — there is no Git↔Vercel auto-deploy integration (deliberately
   disabled, see the comment at the top of `scripts/new-prototype.sh`), so
   nothing else keeps GitHub in sync with production. If you deploy without
   also pushing, the prototype is now live with no history anywhere.

## Deploy gotcha

`vercel --prod` run from inside `prototypes/<slug>/` itself 404s
("Root Directory ... does not exist"). Always run it from the repo root
(`~/Prototipos`) with `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` env vars read from
that prototype's own `.vercel/project.json`:
```
cd ~/Prototipos
VERCEL_ORG_ID=<orgId> VERCEL_PROJECT_ID=<projectId> vercel --prod --yes
```

## After you deploy

Record what shipped in the Vault, at
`/Users/lauta136/Documents/Nivaror Vault/prototypes/<slug>.md` (deploy
history, status) — the wiki is the team's record of what each prototype
demonstrates and who it's for. A prototype that's live on Vercel, committed
to this repo, but undocumented in the Vault is only two-thirds fixed.
