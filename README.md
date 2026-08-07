# The Update Framework Website

[![CNCF Graduated](https://img.shields.io/badge/CNCF-Graduated-blue)](https://www.cncf.io/projects/)

Official website for [The Update Framework](https://theupdateframework.io) (TUF), a CNCF graduated project for securing software update systems.

Built with [Hugo](https://gohugo.io), [Docsy](https://docsy.dev) theme, and hosted on [Netlify](https://netlify.com)

## Quick Start

**Prerequisites:** Node.js 22.x (see `.nvmrc`), npm, Git

```bash
# Clone and install dependencies
git clone https://github.com/theupdateframework/theupdateframework.io.git
cd theupdateframework.io
npm install

# Get Docsy theme submodule (required — theme is a git submodule, not an npm package)
npm run get:submodule

# Start development server
npm run serve
# Site available at http://localhost:1313
```

Before committing changes, run `npm test` to verify formatting and links.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run serve` | Start development server with live reload |
| `npm run build` | Build production site |
| `npm test` | Run format and link checks |
| `npm run check:format` | Check code formatting |
| `npm run fix:format` | Auto-fix formatting issues |
| `npm run check:links` | Validate all links |

## Project Structure

```
content/en/          Documentation and website content
  ├── docs/          Technical documentation
  ├── community/     Community information and adoptions
  └── resources/     Publications, videos, news
layouts/             Custom Hugo templates and shortcodes
data/                Structured data (adoptions.yaml, etc.)
static/              Static assets (images, PDFs, papers)
assets/scss/         Project-specific styles
themes/docsy/        Docsy theme (Git submodule)
hugo.yaml            Hugo configuration
package.json         Dependencies and build scripts
netlify.toml         Deployment configuration
```

## Contributing

We welcome contributions to the TUF website. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

New contributors may want to start with issues labeled [good first issue](https://github.com/theupdateframework/theupdateframework.io/labels/good%20first%20issue).

For TUF project-wide contribution information, visit the [community repository](https://github.com/theupdateframework/community).

## Community

- **Mailing List:** [TUF Google Group](https://groups.google.com/g/theupdateframework)
- **Slack:** [#tuf on CNCF Slack](https://slack.cncf.io/)
- **GitHub:** [theupdateframework organization](https://github.com/theupdateframework)

## License

- **Code:** [Apache License 2.0](LICENSE-CODE)
- **Documentation:** [Creative Commons Attribution 4.0](LICENSE-DOCS)
