# revealjs-sync-git

A module that keeps a specified git repository in sync with a reveal.js presentation, when your presentation uses [server-side speaker notes](https://github.com/hakimel/reveal.js#server-side-speaker-notes).

## Installation

```bash
npm install -g revealjs-sync-git
```

## Usage

Put `git:<git-ref>` in your reveal.js speaker notes, where `<git-ref>` is replaced with the git reference (tag, branch, commit hash) that contains the code you want to be checked out when that slide is active.

From your revealjs presentation:

```bash
# Starts notes server
node plugin/notes-server/index.js
# Starts sync-git listener.
revealjs-sync-git --repo /path/to/repository
```
