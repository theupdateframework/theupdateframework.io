---
title: Overview
weight: 100
description: Find out what TUF is all about!
aliases: [/overview]
---

## Purpose — Why Get TUF?

There are thousands of software update systems in use around the world, and you probably rely on several without even noticing. When Firefox, your operating system, or a programming library gets a new version, it's a software update system quietly finding and installing that update for you.
Software is never really "finished." Developers keep releasing updates to add new features, fix bugs, and patch security vulnerabilities — and some repositories push out changes every few minutes.

That raises an important question: **how can we be sure the systems delivering these updates are safe?**

Over the years, people have built various security techniques to make updates more trustworthy. But these techniques often have weaknesses, and repositories can still be vulnerable to attack.

## What is TUF?

**TUF** stands for **The Update Framework**. It was created to make software update systems more resilient against attacks including attacks where a cryptographic key gets compromised.If an attacker successfully compromises an update repository, they could push malicious software to users, or block them from getting updates they actually need. TUF is designed to reduce that risk.

TUF isn't a standalone program it's a **framework**: a collection of libraries, file formats, and utilities that you can add to a new or existing update system.

TUF has four main goals:

**1. Secure software update systems.** TUF provides tools and rules to help protect both new and existing update systems.

**2. Limit the damage from a compromised key.** Update systems often use cryptographic keys to prove information can be trusted. If an attacker gets hold of an important key, that's dangerous so instead of assuming keys can never be compromised, TUF is built to minimize the damage when one is.

**3. Work with many kinds of update systems.** Different projects have different needs, and TUF is designed to flex to fit a wide range of them.

**4. Be easy to integrate.** TUF is meant to slot into existing update systems, rather than forcing every project to build a new one from scratch.

## Software Updates 101

Before diving into TUF, it helps to understand what a software update system actually does. At a basic level, it's an application (or part of one) that helps a computer:

1. Find out whether an update is available.
2. Obtain that update.
3. Install it.

There are three main types of these systems.

### 1. Application updaters

Some applications update themselves. Firefox, for example, checks whether a newer version exists and downloads it automatically through its own built-in updater.

### 2. Library package managers

Developers use package managers to install and update the libraries their code depends on. Python has `pip`, Perl has CPAN, Ruby has RubyGems, and PHP has Composer each one handles fetching and updating libraries for its language.

### 3. System package managers

Operating systems have their own package managers too, like Debian's APT, Red Hat's YUM, and openSUSE's YaST. These install and update software across the whole OS, not just one application.

### What do they all have in common?

They may work differently under the hood, but the basic idea is the same everywhere: check whether an update exists, download it, then install it.
TUF focuses on the **first two steps** finding and obtaining updates and protects that process against the kinds of attacks that can happen while it's underway.

## What can go wrong?

Say you're waiting for a software update. Here's what an attacker might try.

### Attack 1 — Freeze you on an old version

A new update is available, but every time your computer checks, an attacker keeps handing it the same old file. Your computer never sees anything new, so it assumes there's nothing to update and you stay on outdated, possibly vulnerable software without ever knowing it.

### Attack 2 — Roll you back to an insecure version

Say your computer already has version 2 installed, and version 1 had a known security flaw. An attacker could hand your computer version 1 and trick it into treating that as the "newer" update, quietly moving you backwards into software with a vulnerability that had already been fixed.

### Attack 3 — Give you a newer version, just not the newest one

Imagine four versions exist 1, 2, 3, and 4 — and you're currently on version 2. An attacker gives you version 3. At first that looks fine, since 3 is newer than what you had. But version 4 is the actual latest release, and if version 3 still has a bug that was fixed in version 4, the attacker can keep you stuck one step behind the real fix without it looking suspicious at all.

### Attack 4 — Compromise a signing key

Update systems often use cryptographic signatures to prove that information really came from a trusted source, created using a signing key. But if an attacker manages to steal or compromise that key, they can produce something with a perfectly valid signature even though the content itself is malicious.

In other words: a valid signature doesn't automatically mean the content is safe, since the key behind it may no longer be trustworthy. This is exactly the kind of scenario TUF is built to minimize the damage from.

These four examples only scratch the surface TUF's dedicated **Security** section goes into the full range of attacks and weaknesses it's designed to defend against.

## How does TUF secure updates?

TUF works by adding an extra layer of information that can be checked, called **metadata** essentially a set of security records about a repository or application that TUF uses to decide whether an update can be trusted.

That metadata typically includes:

- **Trusted signing keys** - which keys should be trusted, and which shouldn't.
- **Cryptographic hashes** - a kind of digital fingerprint for a file. If the file changes even slightly, its hash changes too, so TUF can tell whether a file matches what it's supposed to be.
- **Signatures** - used to verify that the metadata itself hasn't been tampered with.
- **Metadata versions** - so TUF knows which state of the metadata it's looking at.
- **Expiration dates** - so old metadata can't be reused indefinitely after it should have expired.

Together, these records give TUF everything it needs to verify an update before trusting it.

## Does the software updater need to understand all of this?

No and that's the point. The software update system doesn't need to know anything about the security mechanics happening underneath; TUF handles that layer on its own.
Here's roughly how it plays out: a repository hosts both the update files and TUF's metadata. TUF fetches both, checks the update files against the metadata, and only if everything checks out does it hand the files off to the software updater to install. If something doesn't check out, TUF rejects it before it ever reaches the updater.

## Why does this matter?

Software needs updates, updates have to come from somewhere, and anywhere there's a delivery pipeline, there's a chance for an attacker to interfere. TUF adds a layer of security checks to that pipeline so the update system can make better-informed decisions about what to trust all while staying flexible enough to work with very different kinds of software update systems.