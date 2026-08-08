# Overview


 ### TUF Explained Simply

## Purpose — Why Get TUF?


There are thousands of software update systems used around the world.

You probably use some of them without even thinking about them. For example, when Firefox, your operating system, or a programming library gets a new version, a software update system helps find and install that update.

Software is rarely finished forever. Developers regularly release updates to:

* Add new features.
* Fix bugs.
* Fix security vulnerabilities.

Some software repositories change very frequently. Some repositories can receive updates to their software or project information **every few minutes**.

This creates an important problem:

**How can we make sure that the systems delivering these updates are safe?**

Over the years, different security techniques have been created to make software updates more trustworthy. However, these techniques can have weaknesses, and repositories can still be vulnerable to different kinds of attacks.

### What is TUF?

**TUF** stands for **The Update Framework**.

TUF was created to make software update systems more resilient against attacks, including attacks involving compromised cryptographic keys.

An attacker who successfully attacks an update repository could potentially cause users to receive malicious software or prevent them from receiving important updates.

TUF is designed to help reduce these risks.

TUF provides a **framework** that can be added to new or existing software update systems.

Here, a framework means a collection of:

* Libraries
* File formats
* Utilities

TUF has several important goals:

### 1. Secure software update systems

TUF provides tools and rules that can be used to protect both new and existing software update systems.

### 2. Reduce the damage caused by compromised keys

Software update systems may use cryptographic keys to prove that information is trusted.

If an attacker gets control of an important key, that can be dangerous.

TUF is designed to **minimize the impact of a key compromise** rather than assuming that keys can never be compromised.

### 3. Work with many different update systems

Different software projects have different requirements.

TUF is designed to be flexible enough to work with a wide variety of software update systems.

### 4. Be easy to integrate

TUF is designed so that it can be integrated into existing software update systems instead of requiring every project to build an entirely new update system.



## Software Updates 101

Before understanding TUF, let's first understand what a software update system is.

A **software update system** is an application, or part of an application, that helps a computer:

1. Find out whether software has an update.
2. Obtain the update.
3. Install the update.

There are three major types of software update systems.



## 1. Application Updaters

Some applications have their own updater.

For example, **Firefox** can update itself using its application updater.

The application checks whether a newer version is available and then obtains the update.



## 2. Library Package Managers

Programmers often use package managers to install and update libraries.

For example:

* Python uses tools such as `pip`.
* Perl uses CPAN.
* Ruby uses RubyGems.
* PHP uses Composer.

These tools help developers obtain the libraries their programs need and keep those libraries updated.



## 3. System Package Managers

Operating systems also have package managers.

Examples include:

* Debian APT
* Red Hat YUM
* openSUSE YaST

These package managers can install new software and update software already installed on the operating system.



## What do all these update systems have in common?

They may work differently internally, but the basic idea is usually similar.

### Step 1 — Find out whether an update exists

The system needs to know whether a newer update is available.

### Step 2 — Download the update

The system obtains the update from a repository or another source.

### Step 3 — Apply the update

The system installs the update and applies its changes.

So, in a simple picture:


Find an update
      ↓
Download it
      ↓
Install it


TUF is designed to help with the **first two parts** of this process — finding and obtaining updates — while protecting the update process against many attacks that can happen during or after an update.



## What can go wrong?

Let's imagine that you are waiting for an update to your software.

An attacker may try to interfere with the update process in several ways.

## Attack 1 — You keep receiving the same old file

Imagine that a new update is available.

But every time your computer checks for an update, an attacker gives it the same old file.

```
New update available
        ↓
    Attacker
        ↓
Same old file again
        ↓
Your computer thinks:
"No new update."
```

You may never realize that a newer update exists.

This means you could miss an important security update.



## Attack 2 — You receive an older, insecure version

Imagine that your computer already has version 2.


Your computer:
Version 2


Version 1 had a security vulnerability.

An attacker gives you version 1 and tricks your computer into thinking that it is a newer update.


You have:
Version 2

Attacker gives:
Version 1

Result:
You are moved backwards to an older version.


You may unknowingly install software containing a vulnerability that had already been fixed.



## Attack 3 — You receive a newer version, but not the newest version

Imagine the available versions are:


Version 1 → Version 2 → Version 3 → Version 4


You already have Version 2.

An attacker gives you Version 3.

At first this looks okay because:


Version 3 > Version 2


So Version 3 is newer than what you have.

But Version 4 is actually the newest version.

If Version 3 contains a vulnerability that was fixed in Version 4, the attacker may be able to keep you on Version 3.

So:


You have:          Version 2

Attacker gives:    Version 3

Actually newest:   Version 4


Being given something newer than what you have does not necessarily mean that you received the newest and safest version.



## Attack 4 — An attacker compromises a signing key

Software update systems can use cryptographic signatures to verify information.

A signing key is used to create those signatures.

Normally, a valid signature can help show that information came from a trusted source.

But imagine that an attacker manages to compromise one of the keys used to sign software or update information.

The attacker may then be able to create something that has a valid signature even though the content is malicious.

So the problem becomes:


**Valid signature**
      ≠
**Automatically safe**


A signing key itself may have been compromised.

TUF is designed to **minimize the impact of these key compromises**.



## What other attacks does TUF protect against?

The examples above are only some of the problems TUF is designed to handle.

TUF has a dedicated **Security** section that describes the attacks and weaknesses in software update systems that TUF is designed to defend against.



## How does TUF secure updates?

Now we know the problem.

The next question is:

**How does TUF actually help?**

TUF adds extra information that can be checked.

This extra information is called **metadata**.

You can think of metadata as a collection of security records about a software repository or application.

These records help TUF determine whether the update information it receives can be trusted.

The metadata can contain information such as:

### Trusted signing keys

Information about which cryptographic keys should be trusted.

### Cryptographic hashes

Information that can help check whether a file is the expected file and whether its contents have changed.

### Signatures

Cryptographic signatures that allow the metadata to be verified.

### Metadata versions

Version information that helps TUF understand which metadata state it is dealing with.

### Expiration dates

Information about when metadata should no longer be considered valid.

So, in a simplified form:
```

             TUF Metadata
                  │
      ┌───────────┼───────────┐
      ↓           ↓           ↓
 Trusted keys   File info   Signatures
      │           │           │
      └───────────┼───────────┘
                  ↓
          Version information
                  ↓
          Expiration information
```


Together, these records create information that TUF can verify when checking software updates.



## Does the software updater need to understand all of this?

Usually, no.

The software update system does not need to understand all of the security details happening underneath.

TUF handles the security-related work.

A simplified version of the process looks like this:


        Software Repository
                │
                ├── Update files
                │
                └── TUF metadata
                        │
                        ↓
                       TUF
                        │
                 Checks the update
                        │
             ┌──────────┴──────────┐
             ↓                     ↓
        Trustworthy            Not trustworthy
             ↓                     ↓
     Software updater            Reject
             ↓
        Install/update


TUF identifies the updates, obtains them, and checks the downloaded target files against the metadata it also obtains from the repository.

If the target files pass the necessary trust checks, TUF hands them to the software update system.

The software update system can then continue with the update without having to understand all the security mechanisms TUF used underneath.



## Why is this useful?

The main idea is simple:

```
Software needs updates
        ↓
Updates come from somewhere
        ↓
Attackers may interfere
        ↓
TUF adds security checks
        ↓
The update system can make
better decisions about what to trust
```

TUF is designed to make software update systems more resilient against attacks while remaining flexible enough to work with different kinds of update systems.


