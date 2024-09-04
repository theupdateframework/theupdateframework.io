---
title: Adopter
weight: 100
description: Get started with TUF as an adopter.
---

TUF provides a framework for integration of the
[security](docs/overview/security) properties into new and existing content
delivery systems.

While some [adoptions](/community/adoptions/) integrate TUF by implementing the
framework from scratch, others start from either a TUF implementation or from a
TUF system.

This page lists open source implementations of TUF which can be used as building
blocks for any TUF adoption.

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

- [Repository Service for TUF (RSTUF) ](https://repository-service-tuf.readthedocs.io/en/stable/)
  is a TUF repository designed to integrate into an existing artifact repository
  with an established storage and delivery system.
- [tuf-on-ci](https://github.com/theupdateframework/tuf-on-ci/) is a TUF
  repository and signing tool designed to operate on a CI system and guide
  signing events through Git forge workflows.
