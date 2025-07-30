# What is the MyST stack?

This section provides a high-level overview of the main concepts and tools in the MyST ecosystem. See the [guiding principles of the MyST ecosystem](../guiding-principles.md) for some more high-level context.

## A brief overview of the MyST Stack

Here is a brief description of the workflow that is involved in the MyST ecosystem and the technical pieces that are involved at each step. You can hover over (or click) the links in the list below to see more information about each one.

- An author writes content in {term}`MyST Markdown` in a file.
- A {term}`MyST Document Engine` parses one or more files and builds them into structured data called the {term}`MyST AST`.
- The {term}`MyST AST` is a version of the content with a specific structure and with extra metadata added to it (like defining a "type" for each chunk of content, resolved cross-references, etc). It conforms to the {term}`MyST Specification`.
- A {term}`MyST Renderer` can then transform the {term}`MyST AST` into different kinds of outputs (most commonly HTML, or PDF via LaTeX/Typst). It uses a {term}`MyST Theme` to do so.
- The [official MyST CLI](https://mystmd.org) contains both a parser and a renderer so that you can go from a local file to an output with one application. 

Here's a diagram showing how these all relate to one another:

% NOTE: This is an excalidraw SVG. You can edit it directly in Excalidraw.
% See the contributing docs for a short guide.
:::{figure} images/myst-diagram.svg
An overview of some major parts of the MyST stack and how they relate to one another.
In the most common workflow, a text file written in MyST Markdown is parsed by the {term}`MyST Document Engine` which outputs {term}`MyST AST` (typically a `.json` file) that follows the {term}`MyST Specification`. This MyST AST can be rendered into many different kinds of outputs, most commonly HTML or PDF. This is most often done by the MyST Document Engine, but can be done by any application that understands how to parse and use the MyST Specification.
:::

## Are there other MyST engines?

The [MyST Specification](https://mystmd.org/spec) and [MyST Markdown Syntax](https://mystmd.org/guide) was designed so that others could implement their own parsers, document engines, and renderers using MyST. Although there are presently no independent examples of a true {term}`MyST Document Engine`, the MyST Parser for Sphinx project fulfills a similar role in the Sphinx ecosystem.

The [MyST Parser for Sphinx](https://myst-parser.readthedocs.io) is an extension for [Sphinx](https://sphinx-doc.org) that can parse MyST Markdown into Sphinx's internal document structure. It was created to allow users to parse MyST Markdown syntax into Sphinx for [V1 of Jupyter Book](https://jupyterbook.org). It now exists as an independent extension for the Sphinx community, as Jupyter Book now uses the MyST Document Engine.

:::{note} MyST Parser for Sphinx Compatibility
As the MyST Parser for Sphinx does not support all of the syntax defined in the MyST Guide, or output {term}`MyST AST`, it's not a true {term}`MyST Document Engine` as defined by this project. That's OK! Its goal is to be a useful tool for the Sphinx community that only leverages parts of the MyST ecosystem (the markdown flavor), which for many people is "good enough."
:::

## How does Jupyter Book relate to MyST?

The MyST Markdown Syntax was originally created to allow [Jupyter Book V1](https://jupyterbook.org) to use the [Sphinx Document engine](https://sphinx-doc.org) with Markdown content[^md], rather than the less well-known <wiki:ReStructuredText> language.

[^md]: Specifically, the [MyST Parser for Sphinx](https://myst-parser.readthedocs.io) was created to move beyond the functionality of the [`recommonmark` project](https://github.com/readthedocs/recommonmark) in order to natively support docutils `roles` and `directives` in markdown.

Over time, the Jupyter Book team decided that the most sustainable path forward was to maintain its own document engine, the [MyST Document Engine](https://mystmd.org/guide). An early version of the MyST Document Engine was created by [Curvenote](https://curvenote.com). To promote its long-term sustainability, the project was open sourced and further developed in collaboration with the Jupyter Book team. It serves as the engine behind Jupyter Book V2.

You can think of Jupyter Book as a _distribution of the MyST Document Engine_. In other words, Jupyter Book wraps the MyST Document Engine application, with out-of-the-box configuration that supports a multi-page community knowledge base or documentation site. MyST is created and maintained by the [Jupyter Book team](https://compass.jupyterbook.org).

Currently, Jupyter Book and the MyST Document Engine share much of the same functionality. Over time, we imagine that the MyST Document Engine will be a more flexible tool that makes fewer assumptions about the end use-case that it's being used for. Jupyter Book will then have "more opinions" above the base configuration of the MyST Document Engine. That said — we are still figuring this out! We aren't sure the exact relationship the two will have, and will revisit this as we learn more. See [next.jupyterbook.org](https://next.jupyterbook.org) for Jupyter Book V2 documentation, and [see this section of the Contributing Guide](#jb-vs-md) for our approach to documenting the two projects.

## How do MyST and Sphinx compare?

[Sphinx] is an open-source documentation system used in many software projects, especially in the Python ecosystem. It builds an internal representation of technical documents as a tree (see [docutils]) similar to the {term}`MyST AST`. Whilst Sphinx partially defines a specification of sorts[^docutils], a {term}`MyST Document Engine` explicitly publishes its {term}`MyST AST` for other tools to consume.

The Sphinx ecosystem has excellent support for Python documentation, referencing content, as well as externally providing an inventory of references known as [intersphinx]. You can link to Sphinx documentation with a {term}`MyST Document Engine` by using [intersphinx references](#intersphinx), and the official {term}`MyST Document Engine` automatically exposes the information required to allow Sphinx documentation to reference your MyST project.

At this time, the official {term}`MyST Document Engine` does not support the authoring of software API documentation[^api-docs]. As such, if your project is documenting Python software we suggest that you use Sphinx. If your project is primarily tutorials, educational textbooks (including with Jupyter Notebooks), a presentation, or scientific paper, we hope that you find a better fit with the MyST stack!

Sphinx and MyST take very different approaches to publishing to the web. In Sphinx, themes are used to customize the generation of HTML and JavaScript. Sites built using these themes can be deployed to static web servers like [ReadTheDocs](https://readthedocs.com/). In the MyST world, the equivalent to a Sphinx theme is a {term}`MyST Renderer` that consumes the {term}`MyST AST` and outputs HTML and JavaScript for your browser. Formally separating the {term}`MyST Document Engine` that generates {term}`MyST AST` and the {term}`MyST Renderer` that consumes it makes it possible to create rich new experiences with MyST, such as the [SciPy Conference Proceedings](https://proceedings.scipy.org/) website that renders {term}`MyST AST` on the fly.

Although the official engine also supports static HTML outputs, implementing themes as applications makes it easier to build more powerful MyST viewing experiences.

[^api-docs]: In the future, `mystmd` may offer support for Python and Javascript documentation, and if you want to contribute please reach out!
[^docutils]: The Docutils source-code _is_ the specification.

[docutils]: https://docutils.sourceforge.io/
[sphinx]: https://www.sphinx-doc.org/
[intersphinx]: https://www.sphinx-doc.org/en/master/usage/extensions/intersphinx.html
