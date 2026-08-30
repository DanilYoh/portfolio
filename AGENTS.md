## Project constraints

- Use npm and preserve `package-lock.json`.
- Do not add backend services, databases, hosting infrastructure, or production
  dependencies unless the task requires them or the user explicitly requests them.

## Required validation

- For behavior changes, start with a failing test. If no test runner exists, add the
  smallest suitable Vitest + React Testing Library setup first.
- Documentation-only and repository-instruction changes do not require a failing test.
- Run `npm run typecheck` and `npm run build` before reporting implementation complete.

## Change safety

- Preserve unrelated and user-authored changes.
- Ask before adding a production dependency.
- Do not commit or push unless the user explicitly requests it.


## Context re-entry (multi-project juggling)

I am juggling several projects, each with several concurrent sessions, and have usually lost
the thread by the time I return to any one of them. Write every user-facing message for cold
re-entry — assume I remember nothing from the scrollback:

- **Open with a recap.** Before any summary, decision point, or question: 2–3 plain sentences on
  what we were just working on, why, and where it stands now.
- **Plain language.** No invented codenames, abbreviations, or callbacks like "the earlier fix"
  or "option B from before" — restate the thing in place, every time.
- **Self-contained questions.** When asking me to decide something, the question itself
  must carry everything needed to answer it: the background, the options, the tradeoffs, and
  your recommendation. Never require scrolling back.
- **One question at a time.** When a summary or decision point holds several open questions or
  next steps, say so up front ("three decisions are waiting; here's the first"), then present
  only the first and wait for the answer before raising the next. Never dump them all at once —
  it's too much mental load.
- **Anchor the work.** Name the project, branch, and PR when reporting status — several other
  sessions look just like this one.
- **End with the next action.** Close long updates with the single thing waiting on me,
  or say explicitly that nothing is.


## Scope

These instructions apply to the entire repository. A more specific `AGENTS.md`
in a subdirectory may extend or override them for that subtree.

## TDD is mandatory

Every change follows **failing test first → implement → verify**:
1. Write the test(s) that capture the desired behavior and watch them **fail** (red).
2. Implement the minimum to make them pass.
3. Run the suite + typecheck and confirm green.

Don't write implementation before a failing test exists. When fixing a bug, reproduce it with a
failing test first.

## Commit Messages

- Describe only the project change itself.
- Do not mention code-generation tools, agents, AI assistance, bots, or automated authorship.
