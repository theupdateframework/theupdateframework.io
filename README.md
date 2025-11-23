# The Update Framework (TUF) Website

This repository contains the source code for the [The Update Framework (TUF) website](https://theupdateframework.io/), built using Hugo and the Docsy theme, and hosted on Netlify.

- [TUF Website](https://theupdateframework.io/)
- [TUF Documentation](https://theupdateframework.io/docs/)
- [TUF Specification](https://theupdateframework.io/specification/)

We welcome contributions! Please read our contribution guidelines before getting started.

## Quick Start

Follow these steps to contribute to the TUF website:

1. Fork the [TUF website repository](https://github.com/theupdateframework/theupdateframework.io) on GitHub.
2. Make your changes and create a pull request (PR).
3. If the PR is a work in progress:
   - Add `[WIP]` to the PR title
   - Use `/hold` in a comment to prevent merging
4. Wait for the automated PR workflow to complete checks.
5. Review the deploy preview when available.
6. Assign a reviewer/approver for your changes.

---

## How to Install

The TUF website is built using **Hugo static site generator** with the Docsy theme.

### 1. Prerequisites
- Hugo Extended (version specified in `.nvmrc`)
- Node.js
- npm

### 2. Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/theupdateframework/theupdateframework.io.git
cd theupdateframework.io
```

2. Install dependencies:
```bash
npm install
```

### 3. Running the Site Locally

#### Serve Development Site
```bash
npm run serve
```
Access the local site at: `http://localhost:1313`

#### Build Site
```bash
npm run build
```

---

## Documentation Guidelines

### Front Matter

Each document should include a front matter with the following structure:

```yaml
---
draft: false
linktitle: Page Title
menu:
  docs:
    parent: Parent Section
    weight: 10
title: Full Page Title
toc: true
type: docs
---
```

Key points:
- `linktitle`: Menu display title
- `title`: Page title
- `parent`: Documentation section
- `weight`: Determines document order (recommend spacing of 5)
- Use `weight: 99` to place at the end of a section

### Contributing

1. Follow the [TUF Contribution Guidelines](CONTRIBUTING.md)
2. Ensure documentation is clear and concise
3. Use consistent formatting
4. Include relevant examples and use cases

---

## Technology Stack

- **Static Site Generator**: Hugo
- **Theme**: Docsy
- **Hosting**: Netlify
- **Version Control**: Git/GitHub

## License

[Insert License Information]

---

## Contact

- [TUF Website](https://theupdateframework.io/)
- [GitHub Repository](https://github.com/theupdateframework/theupdateframework.io)
- [Community Communication Channels](https://app.slack.com/client/T08PSQ7BQ/C8NMD3QJ3)

We appreciate your interest in contributing to The Update Framework!
