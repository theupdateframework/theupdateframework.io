---
title: Timeline
weight: 19
Description: See the project timeline
---

**2010**: Improving upon the Thandy software updater for the Tor private
browser, Justin Samuel and Justin Cappos collaborate to design and publish an
academic research paper on The Update Framework (TUF).

**2011**: TUF Project moves to New York University Polytechnic School of
Engineering (later NYU Tandon School of Engineering) when Justin Cappos accepts
a post as an assistant professor at the Brooklyn, NY, school.

**2013**: Justin Cappos, Trishank Kuppusamy, and Vladimir Diaz begin research
into adapting and improving TUF for Python, Ruby, and other environments used
for cloud computing.

**2013**: [PEP 458](https://www.python.org/dev/peps/pep-0458/), the first of two
Python Enhancement Proposals dealing with TUF is published. "Surviving a
Compromise of PyPI" details the integration of TUF into the Python package
manager.

**2014**: Flynn becomes the first tech organization to adopt TUF when it
independently implements the program in its Go programming language.

**2014**: [PEP 480](https://www.python.org/dev/peps/pep-0480/), a maximum
security version of PEP 458, is published.

**2015**: Docker launches Notary, an implementation of TUF used to publish and
manage trusted collections of content. It also launches Docker Content Trust,
which uses Notary to sign and verify container images.

**2016**: _Diplomat: Using Delegations to Protect Community Repositories_ is
presented at NSDI 2016. The subject of the paper, Diplomat, is the first of
several TUF adaptations developed to address a specific identified problem in
practice. In this case, the problem was the need for faster registration of new
projects on community repositories without sacrificing security. It also
introduced the concept of delegation of trust.

**2016**: A consortium including NYU Tandon (Cappos, Kuppusamy, Diaz, Awwad),
the University of Michigan Transportation Research Institute (UMTRI), and the
Southwest Research Institute (SWRI), begin developing Uptane, another evolution
of TUF designed to protect updates for vehicles from being easily compromised by
rogue nation-state attackers.

**2016**: _Uptane: Securing Software Updates for Automobiles_ is presented at
escar 16.

**2017**: Uptane is officially introduced at press events in Ann Arbor, MI, and
Brooklyn, NY.

**2017**: _Mercury: Bandwidth-Effective Prevention of Rollback Attacks Against
Community Repositories_ is presented at USENIX ATC 2017. Mercury is another TUF
adaptation, and was developed to protect against rollback attacks on community
repositories at a reasonable bandwidth cost.

**2017**: Uptane is named one of the year's most important innovations in
security by _Popular Science_.

**2017**: The Linux Foundation announces at Open Source Summit Europe that it
was adding TUF as the 14th hosted project for its Cloud Native Computing
Foundation.

**2018**: Aktualizr, an open source C++ implementation of Uptane developed by
Advanced Telematic Systems (now HERE technologies), is integrated into
Automotive Grade Linux (AGL). AGL, a collaborative open source project of the
Linux Foundation, has been adopted by a number of U.S. and international
manufacturers.

**2018**: NYU Tandon School of Engineering becomes an associate member of the
Linux Foundation and a Bronze member of AGL on the strength of the Foundation’s
adoption of Uptane and TUF projects.

**2018**: The Uptane Alliance, a nonprofit entity organized under the umbrella
of IEEE’s International Standards and Technology Organization (ISTO), is formed
to oversee development of standards for the secure implementation/deployment of
Uptane.

**2019**:
[IEEE-ISTO 6100.1.0.0 Uptane Standard for Design and Implementation](https://uptane.github.io/papers/ieee-isto-6100.1.0.0.uptane-standard.html)
is released.

**2019**: Uptane becomes a Linux Foundation Joint Development Foundation
project.

**2019**: TUF is awarded graduate status within the organization, signifying
completion of a series of steps needed to move the project to the highest level
of maturity in the CNCF. In achieving this status, TUF becomes both the first
security project and the first project led by an academic researcher to graduate
within CNCF
