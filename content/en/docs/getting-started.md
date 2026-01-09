---
title: Getting started
aliases: [/implementations]
cSpell:ignore: RSTUF
weight: 200
---

TUF provides a framework for integration of the [security](../security/)
properties into new and existing content delivery systems. This page will help
you get started if you want to use TUF either as a maintainer or client.

While some [adoptions](/community/adoptions/) integrate TUF by implementing the
framework from scratch, others start from either a TUF
[implementation](#implementations) or from a TUF [system](#systems). This page
lists open source implementations of TUF which can be used as building blocks
for any TUF adoption.

## Implementations

TUF implementations provide libraries implementing the primitives and
algorithms, such as the detailed client workflow, in the specification.

### Reference implementations

- [python-tuf](https://github.com/theupdateframework/python-tuf)
- [go-tuf](https://github.com/theupdateframework/go-tuf/)
- [tuf-js](https://github.com/theupdateframework/tuf-js)
- [rust-tuf](https://github.com/theupdateframework/rust-tuf)

### Third-party implementations

- [php-tuf](https://github.com/php-tuf/php-tuf)
- [tough](https://github.com/awslabs/tough), by AWS Labs
- [Notary Project](https://github.com/notaryproject/notary), by the Notary
  Project

## Systems

TUF systems build on top of library implementations and provide opinionated
signing systems designed for particular use-cases.

### Current Systems

- [Repository Service for TUF](https://repository-service-tuf.readthedocs.io/en/stable/)
  (RSTUF) is a designed to integrate into an existing artifact repository with
  an established storage and delivery system.
- [tuf-on-ci](https://github.com/theupdateframework/tuf-on-ci/) is a TUF
  repository and signing tool designed to operate on a CI system and guide
  signing events through Git forge workflows.
- [Uptane](https://uptane.org/) enables secure software updates for automobiles.
- [The Archive Framework](https://github.com/openlawlibrary/taf) (TAF) is a
  framework that aims to provide archival authentication and ensure that Git
  repositories can be securely cloned/updated.
- [TUF Browser](https://github.com/freedomofpress/tuf-browser), from the Freedom
  of the Press Foundation, is a minimal TypeScript implementation of TUF
  intended to be compatible with browsers.

## Learn more

- Some of our [Videos](/resources/videos/) explain how to implement TUF
  practically.
- To learn about how to contribute to TUF, see [Contributing](../contributing).
