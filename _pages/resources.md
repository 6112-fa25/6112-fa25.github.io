---
title: Resources
nav_order: 40
---

This page contains a number of useful and/or interesting references selected by the staff. You are not expected to know most of the material on this page for the class; however, you may find it interesting and helpful. We had a lot of fun curating this!

{% include toc.html %}

## References

You will find these references useful if you decide to pursue just-in-time compilation. These resources are useful for compilation in general though!

1. The complete [Intel x64 manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) --- official PDFs with all the gory details
1. [x86 and amd64 instruction reference](https://www.felixcloutier.com/x86/) --- navigable reference by Félix Cloutier derived from the Intel manual
1. [x86 wiki](https://en.wikibooks.org/wiki/X86_Assembly/X86_Instructions) --- good primer on how x86 instructions work
1. [x64 cheat sheet](https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf) --- lists and tables detailing registers and assembly commands from Brown University's CS033
1. [Agner Fog's optimization page](https://agner.org/optimize/) --- this is a very useful reference page with manuals on how to optimize code for x86-64. In particular, take a look at the [latency tables](https://agner.org/optimize/instruction_tables.pdf).
1. [Godbolt](https://godbolt.org) --- allows you to input C code and gives you line-by-line assembly output of various compilers (such as gcc and clang), very useful for figuring out how to translate certain operations to assembly.

If you find interesting resources you think other students could benefit from, please consider sharing them on Piazza!

## Related courses

You might find lecture slides/notes from other publicly available courses useful, especially as you get into the later phases of the project:

1. [EPFL's Advanced Compiler Design course](https://cs420.epfl.ch/archive/21/index.html).

Of course, do not forget this class's sister in the spring semester: [6.1100<sub>[6.035]</sub> Computer Language Engineering][dynlang].

For more theoretical approaches to programming language design, theory, and implementation, look into these classes:
1. [6.S050 Programming Language Design (Spring 2023)][pld]
1. [6.5110<sub>\[6.820\]</sub> Foundations of Program Analysis][6820]
1. [6.5120<sub>\[6.822\]</sub> Formal Reasoning About Programs][frap]

## Toolings

Although we would like to focus on ideas, not specific tools, it is important for you to gain fluency in whatever it is that you choose to use. Minutes spent familiarizing yourself with common tools and frameworks will save you hours or days in the long run.

1. Shell
    1. [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/2020/) --- Learn about the shell and the terminal, then you look like a pro.


## Recommended textbooks

There is no required textbook for this class, but if you insist, we think this is a good reference textbook to have:

1. **Robert Nystrom, [_Crafting Interpreters_](https://craftinginterpreters.com/). Genever Benning, 2021.**
  - Most of the content in Part II is covered in phases 1 and 2.
  - Most of the content in Part III is covered in phases 3, 4, and 5.
  - The concepts in this book are highly relevant to this course.

Other textbooks you may be interested in (for JIT compilation):

{:style="counter-reset:step-counter 1"}
1. **Cooper, Keith D., and Torczon, Linda, [_Engineering a Compiler_][cooper], 3rd ed., Morgan Kaufmann, 2022.**
  - A new reference textbook for understanding modern compilers. Covers many optimizations seen in this course (e.g. data-flow, instruction scheduling, register allocation) plus a few advanced ones found in modern compilers (e.g. [static single-assignment (SSA)][ssa]).
  - The 3rd edition is more up to date, but the 2nd edition (2012) is [available online through MIT Libraries][cooper-mit]. In supplemental readings, we will list the pages for both editions.
1. **A. W. Appel and J. Palsberg, [_Modern Compiler Implementation in Java_][appel-java]. Cambridge University Press, 2002.**
  - A classic book. Guides you through a compiler project with thoughtful code organization. Otherwise similar to _Cooper et al._ in content.
  - Called the "tiger book". Also has a C version and ML version.
1. **Aho, Alfred V., et al., [_Compilers: Principles, Techniques, & Tools_][dragon], 2nd ed. Pearson Addison-Wesley, 2007.**
  - A very, very, thick, classic reference on writing an optimizing compiler for C-like languages (e.g. Decaf).
  - Also called the "dragon book." Everyone has heard of this.

<!-- These textbooks are a lot more theoretical, and cover very specific topics:

{:style="counter-reset:step-counter 5"}
1.
  - The mathematical foundations of data-flow analysis.
  - Matt Might wrote [a short summary of order theory][might-lattice] on his blog. -->

Many of these textbooks are [available online through MIT Libraries][mitlib]. (For some books, you can borrow physical copies!) You can purchase the textbooks through traditional means (e.g. Amazon) or ask the TAs for advice on acquiring the textbooks.


## Other sources of inspiration

1. Overviews
    1. [LLVM compiler architecture](http://www.aosabook.org/en/llvm.html)
    1. [GCC compiler architecture](http://en.wikibooks.org/wiki/GNU_C_Compiler_Internals/GNU_C_Compiler_Architecture)
1. Blogs
    1. [Russ Cox's Blog](http://research.swtch.com/) --- Russ is one of the developers of Go, a popular language.
    1. [Matt Might's Blog](http://matt.might.net/articles/) --- Matt is a professor at the University of Utah and has written some very interesting articles (e.g. "Yacc is dead")
    1. [Ralf's Ramblings](https://www.ralfj.de/blog/) --- Ralf wrote a lot of popular blog posts exploring the complexity behind systems languages like C++ and Rust.
    1. [Embedded in Academia](https://blog.regehr.org/) --- Ditto.
1. Register Allocation
    1. [Register Allocation & Spilling via Graph Coloring](http://dl.acm.org/citation.cfm?id=806984) --- G.J. Chaitin / 1982. Great (short) paper on simple register allocation.
    1. [Linear Scan Register Allocation](https://dl.acm.org/citation.cfm?id=330250)
    1. [Iterated Register Coalescing](http://dl.acm.org/citation.cfm?id=229546) --- Lal George / 1996. Presents improvements/alternative to Chaitin's design. If Chaitin-style (+/-Briggs) register allocation isn't enough for you, this paper is a good read - actually, it's a good read anyway, to understand the tradeoffs
1. Garbage Collection
    1. [V8 Garbage Collection](https://v8.dev/blog/high-performance-cpp-gc) --- Covers the implementation of high-performance garbage collection for V8, the JavaScript engine used in Chrome
    2. [Understanding OCaml's Garbage Collector](https://dev.realworldocaml.org/garbage-collector.html) --- Although OCaml is AOT compiled, it uses an incremental, generational garbage collector which may be interesting to study
1. Misc.
    1. [B3 JIT Compilation](https://webkit.org/blog/5852/introducing-the-b3-jit-compiler/)
    1. [SpiderMonkey](https://firefox-source-docs.mozilla.org/js/index.html) --- SpiderMonkey is the JavaScript engine used in Firefox

[cooper]: https://shop.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-815412-0
[cooper-mit]: https://mit.primo.exlibrisgroup.com/permalink/01MIT_INST/jp08pj/alma9935028392606761
[appel-java]: https://www.cs.princeton.edu/~appel/modern/java/
[ssa]: https://en.wikipedia.org/wiki/Static_single-assignment_form
[lisp-book]: https://doi.org/10.1017/CBO9781139172974
[mitlib]: https://libraries.mit.edu/
[dragon]: https://suif.stanford.edu/dragonbook/
[might-lattice]: https://matt.might.net/articles/partial-orders/
[lattice]: https://doi.org/10.1017/CBO9780511809088
[pld]: https://people.csail.mit.edu/feser/pld-s23/index.html
[dynlang]: https://student.mit.edu/catalog/m6a.html#6.1100
[6820]: https://student.mit.edu/catalog/m6a.html#6.5110
[frap]: https://frap.csail.mit.edu/main
