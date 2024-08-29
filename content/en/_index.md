---
title: TUF
description: A framework for securing software update systems
outputs:
  - HTML
  - REDIRECTS # Include this `content/en` ONLY
developer_note:
  The blocks/cover shortcode (used below) will use as a background image any
  image file containing "background" in its name.
---

{{% blocks/cover title="The Update Framework" image_anchor="top" color="primary" height="max" %}}

<!-- prettier-ignore -->
{{% param description %}}
{.display-6}

<a class="btn btn-lg btn-primary me-3" href="docs/">Learn More</a>
<a class="btn btn-lg btn-secondary" href="docs/get-started/">Get started</a>
{.p-initial .my-5}

{{% /blocks/cover%}}

{{% blocks/lead color="tertiary" %}}

The Update Framework (TUF) maintains the security of software update systems,
providing protection even against attackers that compromise the repository or
signing keys. TUF provides a flexible framework and
[specification](https://theupdateframework.github.io/specification/latest/) that
developers can adopt into any software update system.

{{% /blocks/lead %}}

{{% blocks/section color="dark" type="row" %}}

{{% blocks/feature icon="fa-lightbulb" title="Our work" url="docs/" %}}

Discover how TUF secures update systems

{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-gear" title="Production Ready" url="/community/adoptions/" %}}
Used in production by various tech companies and open source organizations.

{{% /blocks/feature %}}

{{% blocks/feature icon="fa-brands fa-github" title="Contribute" url="https://github.com/theupdateframework" %}}
Start contributing to TUF open source by creating a Pull request on
[GitHub](https://github.com/theupdateframework)

{{% /blocks/feature %}}

{{% /blocks/section %}}

{{% blocks/section color="primary" type="cncf" %}}

**TUF** is a [CNCF](https://www.cncf.io)
[graduated](https://www.cncf.io/projects) project.

[![CNCF logo][]][cncf]

[cncf]: https://cncf.io
[cncf logo]: /img/cncf-white.svg
[incubating]: https://www.cncf.io/projects/

{{% /blocks/section %}}
