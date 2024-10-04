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

- [python-tuf](https://github.com/theupdateframework/python-tuf), the reference
  implementation
- [go-tuf](https://github.com/theupdateframework/go-tuf/)
- [tuf-js](https://github.com/theupdateframework/tuf-js)

## Systems

TUF systems build on top of library implementations and provide opinionated
signing systems designed for particular use-cases.

- [Repository Service for TUF](https://repository-service-tuf.readthedocs.io/en/stable/)
  (RSTUF) is a designed to integrate into an existing artifact repository with
  an established storage and delivery system.
- [tuf-on-ci](https://github.com/theupdateframework/tuf-on-ci/) is a TUF
  repository and signing tool designed to operate on a CI system and guide
  signing events through Git forge workflows.

## Learn more

- Some of our [Videos](/resources/videos/) explain how to implement TUF
  practically.
- To learn about how to contribute to TUF, see [Contributing](../contributing).
