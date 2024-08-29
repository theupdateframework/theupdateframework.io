---
title: Frequently Asked Questions
LinkTitle: FAQ
weight: 45
description: Get your questions answered!
---

**1. How difficult is it to integrate TUF?**

At a high level, all an adopter needs to do is (1) add TUF metadata to its
software repository, and (2) arrange for clients to use TUF to fetch files from
the repository before transferring the verified files to the software update
system.

In practice, (1) will also require the adopter to decide how to make the
metadata and delegations available to clients, how to manage the keys needed to
sign TUF metadata (in particular, how to generate, securely store or backup, and
rotate offline keys), and how to periodically update and re-sign metadata.

For (2), an adopter has to figure out how to ship the initial Root file, and
implement
[the TUF download and verification workflow](https://theupdateframework.github.io/specification/latest/#detailed-client-workflow)
in their language of choice if one of the existing implementations is
insufficient.

**2. Why should I use delegations?**

Using delegations makes it so that users can perform actions for one another
without needing to share keys in order to make this happen. As we state in the
specification: "Delegated roles can further delegate trust to other delegated
roles. This provides for multiple levels of trust delegation where each role can
delegate full or partial trust for the target files they are trusted for."
Delegations add more security. For instance, in a community repository like
PyPI, delegating trust for target files to a project developer is recommended.
It increases compromise-resilience because if the developers control their own
project keys, an attacker cannot access them, and therefore cannot sign and
serve malicious versions of the project.

**3. What happens if the server and keys are compromised?**

The repo maintainer must revoke and replace compromised keys. If a Timestamp,
Snapshot, Targets, or Root key is compromised, the Root role must re-sign its
metadata to replace the compromised key. If a threshold of Root keys is
compromised, the Root file must be re-issued out of band. If a threshold number
of offline keys are required, a full compromise of the repo is unlikely. For a
more in-depth discussion about the steps to follow in the event of a key
compromise, see
[PEP 458](https://www.python.org/dev/peps/pep-0458/#in-the-event-of-a-key-compromise),
which covers one way to deal with compromised keys on a community repo such as
PyPI.

**4. Can I use the same keys for different roles?**

In general, you shouldn't share keys. In certain cases, even sharing online keys
(e.g., between the Timestamp and Snapshot roles) is not advised. As we recommend
for the PyPI community, "different keys for online roles allow for each of the
keys to be placed on separate servers if need be, and prevents side channel
attacks that compromise one key from automatically compromising the rest of the
keys."

**5. Which roles can use online keys?**

The Timestamp and Snapshot roles can use online keys to facilitate continuous
delivery of updates on the typical repository. All other roles should rely on
offline keys to prevent attackers from signing for malicious packages in the
event of a repo compromise.

**6. What is the point of having the Root and Snapshot roles?**

The Root role keeps track of the trusted public keys of the top-level roles, and
can remove or add keys when needed. Its metadata is rarely updated and its
signing keys must receive the greatest protection. In contrast, the Snapshot
role is updated often, signed with an online key, and provides a consistent view
of the metadata available on a repo. The Snapshot and Root role are responsible
for different tasks that differ in level of importance. Separation of
responsibilities is one of TUF's design choices.

**7. Can you combine Timestamp and Snapshot?**

There are a few reasons why the Timestamp and Snapshot files are not combined:

- The Timestamp file is downloaded very frequently and so should be kept as
  small as possible, especially considering that the Snapshot file will grow
  proportionally with the number of delegated target roles.

- As the Timestamp role’s key is an online key and thus at high risk, when an
  offline key storage is appropriate for Snapshot, separate keys should be used
  so that the Snapshot role’s keys can be kept offline, and thus in a more
  secure manner.

- When rotating keys, it makes much more sense to rotate Timestamp frequently.
  When Timestamp is rotated, if an attacker compromises the new key, they can
  launch a freeze attack for a short while. For Snapshot, an attacker could
  cause clients to invalidate a lot of their stored targets metadata, which may
  result in re-retrieval of a substantial amount of information from the
  repository. So, it is recommended to rotate Timestamp more often.

- Timestamp may be given to mirrors.

**8. How often should metadata expire?**

The Timestamp and Snapshot metadata should normally have a short expiration (1
day), whereas the Root and Targets metadata should expire less often (1 year). A
good rule of thumb is the more often the metadata changes, the sooner it should
expire.

**9. Are there ways to reduce bandwidth costs?**

It is possible to minimize the size and number of delegated metadata that the
client has to download, and in doing so, reduce the associated costs. The
[Metadata Scalability section](https://www.python.org/dev/peps/pep-0458/#metadata-scalability)
of PEP 458 discusses in more detail the ways in which to reduce bandwidth costs.
For example, if one large metadata file is split into several smaller ones, the
bandwidth associated with downloading the large file many times can be saved.
The reference implementation provides an
[easy way to distribute target files across many targets metadata](https://github.com/theupdateframework/python-tuf/blob/v0.20.0/examples/repo_example/hashed_bin_delegation.py)
(i.e., delegating to hashed bins), which the specification refers to as
[path hash prefixes](https://theupdateframework.github.io/specification/latest/#path_hash_prefixes).

**10. Can TUF be used with devices that lack the CPU power or memory to verify
metadata?**

At a minimum, a client device must be able to verify the hashes and signatures
on TUF metadata. If a device isn't powerful enough to perform cryptographic
operations or has limited memory, it can delegate verification of hashes and
signatures to another device. For instance, a weaker device can rely on another
device on the network to verify the signatures on top-level metadata. Delegating
to another device is not built into the framework but
[Uptane](https://uptane.github.io/), a variant of TUF, is designed to work with
weaker devices like the Electronic Control Units found in automobiles.

**11. Can I use TUF to download files from more than one repository?**

TUF can download files from multiple mirrors and repos. In fact, we offer
guidance for conducting a secure search for files across multiple repositories
in [TAP 4](https://github.com/theupdateframework/taps/blob/master/tap4.md).

**12. Has there been a security audit of TUF?**

The [Security Audits](docs/overview/security) page links to a few of the
security audits of TUF.

**13. How can I try TUF?**

The `python-tuf` reference implementation provides a
[well-documented API](https://theupdateframework.readthedocs.io/en/latest/api/api-reference.html)
to create and manage TUF metadata on a server-side repository, and to perform
TUF-compliant updates on a client, as well as basic Python
[code examples](https://github.com/theupdateframework/python-tuf/tree/develop/examples)
that demonstrate the usage.

**14. Is there a presentation or video about TUF?**

The [Videos]() page contains links to presentations that have been given by both
TUF developer personnel, as well as adopters.
