# setu-web-dev-2


## packages
module-alias for 


## Overview

This repository documents the iterative development of the WeatherTop website assignment.

Development follows a structured, branch-based workflow, progressing from initial Proof-of-Concepts (POCs) to full Releases. Each phase is tracked with dedicated branches and clear, incremental commits.

## Git Workflow

Typical commands for managing branches:

```bash
git checkout -b branch_name
git push --set-upstream origin branch_name
git checkout main
git pull origin branch_name
git push origin main
```

## Development Strategy

The assignment is delivered in multiple iterations:

- **Baseline**
- **Release 1** → **Release 3**
- **Release 4** and beyond (if time permits)

Key practices:

- Initialize with a robust project foundation.
- Create a new branch for each POC and Release, following assignment guidelines.
- Build each stage on the previous, ensuring commits are focused and meaningful.
- Use **Express.js** with **Handlebars** for templating, **Bulma** for styling, and a clear **MVC architecture** in JavaScript.
- Host the Node.js app on **Render**.

---

### Timeline

| Milestone                 | Date                 |
| ------------------------- | -------------------- |
| Project Start             | June 12th, 2025      |
| Expected Final Submission | August 24th, 2025    |
| Approximate Duration      | 15 weeks             |

---

### Git Scope & Branching

| Branch   | Description                   |
| -------- | ----------------------------- |
| `main`   | Stable, release-ready version |
|          |                               |
| `rel1`   | Release 1                     |
| `rel2`   | Release 2                     |
| `rel3`   | Release 3                     |