---
title: Contributing to TUF
---

We welcome community contributions to [TUF](https://github.com/theupdateframework), whether they be documentation, a bug fix or a new feature. If you are planning on making more elaborate or potentially controversial changes, please discuss them in the [TUF slack channel](#slack-channel) or on the [mailing list](#mailing-list) before sending a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). We host public [community meetings](#community-meeting) focused on [TUF](https://github.com/theupdateframework) development and contributions. These meetings are meant for developers and maintainers to meet, get unblocked, pair review, and discuss development aspects of the [TUF](https://github.com/theupdateframework).
___

### Contributor Workflow
First, you should join our communication forums:
- Join us on the [TUF slack channel](#slack-channel).
- Join us via the [mailing list](#mailing-list).
- Join monthly [community meetings](#community-meeting).

Next, get set up with the basics:
- Take an [overview](./overview.md)
- [Getting started guide](./security.md)
- Set up using [Implementations](./implementations.md)
- Uses of TUF by [videos](./videos.md) or blogs

Check out TUF [repositories](#tuf-repositories) for existing issues or to add one. A contributor can submit [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) to the project's [repositories](#tuf-repositories) by following:

- the [CNCF code of conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md).
- the Developer Certificate of Origin ([DCO](#dco)).
- test locally any new feature or change.

Maintainers will review and give feedback on pull requests.

___

### Your First Contribution

We recommend that you work on existing issues before attempting to develop a new feature. 

Find an existing issue (e.g. one marked [good first issue](https://github.com/theupdateframework/python-tuf/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22), or simply ask an owner for suggestions on [channel](#slack-channel)), and respond on the issue thread expressing interest in working on it.

This helps other people know that the issue is active, and hopefully prevents duplicated efforts.

Each commit must be [signed off](#dco) in git.

#### Areas you can start working on:

- [Documentation](https://github.com/theupdateframework/theupdateframework.io/) can always use improvement.
- Review open PRs. Add comments, feedback, or give an LGTM!
- Try out some easy-to-fix bugs which may be marked with the [good first issue](https://github.com/theupdateframework/python-tuf/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) tag.
- Just ask on the [channel](#slack-channel) for suggestions.

#### If you want to work on a new idea of relatively small scope:
- Submit an issue describing your proposed change to the [repo](#tuf-repositories) in question. 
- For security issues follow [this](./reporting.md).
- The repo owners will respond to your issue promptly.
- If your proposed change is accepted, follow [Development guideline](https://github.com/secure-systems-lab/lab-guidelines/blob/master/dev-workflow.md).
- Submit a pull request containing a tested change.

___

### DCO
Contributors must indicate acceptance of the [Developer Certificate of Origin](https://developercertificate.org/) by appending a Signed-off-by: Your Name <example@domain.com> to each git commit message or use `-s` tag with `git commit`.

____

### TUF Repositories

- [python-tuf](https://github.com/theupdateframework/python-tuf)
- [specification](https://github.com/theupdateframework/specification/)
- [theupdateframework.io](https://github.com/theupdateframework/theupdateframework.io/)
- [community](https://github.com/theupdateframework/community)
- [taps](https://github.com/theupdateframework/taps)
- [tuf-on-ci](https://github.com/theupdateframework/tuf-on-ci)
- [rust-tuf](https://github.com/theupdateframework/rust-tuf)
- [go-tuf](https://github.com/theupdateframework/go-tuf)
- [tuf-js](https://github.com/theupdateframework/tuf-js)
___

### Slack channel
Join us on the [#TUF](https://cloud-native.slack.com/archives/C8NMD3QJ3) channel on [CNCF Slack](https://slack.cncf.io/).

___

### Mailing list
Join us via the [mailing list](https://groups.google.com/forum/?fromgroups#!forum/theupdateframework).
___ 
### Community meeting
- Time: every fourth Wednesday of the month, at 11am (Eastern Time)
- Location: meet.google.com/jhk-cvuf-icd
- Agenda: hackmd.io/jdAk9rmPSpOYUdstbIvbjw
- Calendar: www.cncf.io/calendar

____
### Governance
Understand our [governance](https://github.com/theupdateframework/specification/blob/master/GOVERNANCE.md).