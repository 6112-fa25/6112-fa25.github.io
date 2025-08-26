---
title: Project
has_children: true
nav_order: 30
---

## Introduction

This is an overview of the course project and how we’ll grade it. You should not expect to understand all the technical terms, since we haven’t yet covered them in class. We’re handing it out today to give you some idea of the kind of project we’re assigning, and to let you know the various due dates. Additional handouts will provide the technical details of the project.

[Phase 1][phase_1] and [Phase 2][phase_2] will be done individually. For subsequent phases, the class will be divided into groups of three students. You will be allowed to choose your own partners as much as possible. Each group will write, in C++, a virtual machine for a simple dynamically-typed programming language. We expect all groups to complete all phases successfully. Each subsequent project will build on your work from prior phases, so do not fall behind!

## Phase 1: Lexing and Parsing

A *scanner* takes a source file as an input and ouputs a sequence of *tokens* in a process known as *lexing*. Tokens are sequences of characters which form the basic unit of MITScript programs.

A token can be a symbol (``*`` or ``{``), a keyword (``if``, or ``while``), an identifier (`foo`), or a literal (`42`, `None`, `"hello"`).

Non-tokens (such as whitespace or comments) are discarded. Malformed tokens (e.g. an unterminated string literal) must be reported.

A *parser* takes a sequence of tokens as input and checks to make sure they conform to the language specification. In order to pass this check, the input must have all matching braces, semicolons, etc. Types, variable names, and function names are not verified. A parser outputs a *syntax tree*, a tree representation of the program.

The [language specification]({% link _pages/project/spec.md %}) describes the concrete syntax of the language, which you will need to separate into a scanner specification and a parser specification. You will then implement a hand-written scanner and recursive descent parser in C++. We disallow using parser generators such as ANTLR4 in this phase. Creating and using your own parser combinator library is also OK.

## Phase 2: Interpretation

For this assignment, you will build an interpreter for MITScript that, given an MITScript program and its inputs, executes the program to produce the expected results. This assignment requires you to correctly understand and implement MITScript’s semantics—-such as the order in which arguments to a function are evaluated.

While your scanned and parsed program may be syntactically correct, it can still contain a number of non-context-free semantic errors. For example, the expression `5 / "hello"` is syntactically correct, but does not have an obvious semantic meaning. Therefore, your interpreter must not only execute valid MITScript programs, but also check for and report errors in programs that have semantic issues.

This project will familiarize you with the full semantics of the MITScript language. It is critical that you pay special attention to this project and its deadline, because successfully completing it will give you a thorough understanding of the language’s semantics. This, in turn, will allow you to focus more of your effort in the later stages of the project on engineering a faster implementation, rather than on understanding how to correctly execute the language.

## Phase 3: Memory Management

In this phase, your group will implement a garbage collector, which will be integrated into your virtual machine (in phase 4). Up until now, we have not prescribed how your MITScript interpreter should handle the allocation of memory for the data structures in an MITScript program. It is not unreasonable to expect that your interpreter either consumes or leaks substantial amounts of memory.

You will address that problem by implementing a garbage collector. The garbage collector consists of a set of allocation routines that you will use to allocate runtime objects, as well as a set of collection routines that will periodically scan the heap of your MITScript program and identify dead memory that can be freed.

## Phase 4: Virtual Machine

In this phase, your group will implement a compiler that translates MITScript into a bytecode representation, as well as a virtual machine to execute that bytecode. The virtual machine provides a low-level, language-independent abstraction for computation. It accepts programs consisting of a list of functions, with one function designated as the entry point. Each function contains a list of bytecode instructions that manipulate and compute values using an operand stack. For example, the MITScript statement `x = 2 + y` translates to the following sequence of MITScript bytecode instructions:

```
load_const 2  # push the constant 2 onto the operand stack
load_local 0  # load the value of y from memory and place it on the operand stack
add           # pop two integers from the stack and push their sum onto the stack
store_local 1 # pop the top value off the stack and store in x
```

You will learn how to translate a high-level language into a low-level, machine-interpretable representation. You will also gain an understanding of how the design and performance of abstractions in the low-level representation interact with and influence the design of the high-level language.

## Phase 5: Derby

The final phase is a substantial open-ended phase. In this phase your team's task is to generate an efficient implementation for MITScript programs so that they will be correctly executed in the shortest possible time.

There are a multitude of different performance optimizations you can implement. For example, you can perform data-flow optimizations – such as constant propagation, common sub-expression elimination, copy propagation – runtime representation optimizations – such as more efficient record implementations or unboxing of primitive types – efficient code generation techniques – such as register allocation and peephole optimization – or even just-in-time compilation techniques – such as runtime specialization. You are free to explore the full range of optimizations for your virtual machine.

In order to identify and prioritize optimizations, you will be provided with a benchmark suite of a few simple applications. Your task is to analyze these programs, perhaps hand optimizing these programs, to identify which optimizations will have the highest performance impact. Your write-up needs to clearly describe the process you went through to identify the optimizations you implemented and justify them.

In this phase, the group has to submit a milestone and several checkpoints of the implementation leading up to the project deadline. For your milestone, you should provide a write-up of the set of optimizations you plan to implement and the implementation strategy you plan to take. The checkpoint exists to strongly encourage you to start working on the project early. More details on how these checkpoints will work will be released with the Phase 5 description.

The last class will be the “Virtual Machine Derby” at which your group will compete against other groups to identify the virtual machine that produces the fastest code. The application(s) used for the Derby will be provided to the groups one day before the Derby. This is done in order for your group to debug the compiler and get it working on this program. However, you are forbidden from adding any application-specific hacks to make this specific program run faster.

## Grading

For each phase, you are required to submit your *design report*, *complete source code* (including all files needed to build your project), and *additional test cases*. Your projects will be submitted via Gradescope. Do not include compiled files. Instead, you repo should contain an executable file called `build.sh` in the top-level directory which will compile your code. These files are provided for you in the skeleton code; you may modify them if you need to.

Phases 3 through 5 will be done in groups. Each group will be given access to a repository for their project on Github.

There are few restrictions on how the project should be structured, except that it should be self-contained (apart from the allowed libraries and programming environment), and contain executables `build.sh` and `run.sh` in the top-level directory.

We will release public tests associated with each phase, which will be released with the phase instructions. There are also private tests, which will be released **after** the due date of each phase. We will grade your submission based on both the public and private tests after each phase.

Your design report and additional test cases will make up a portion of your grade for each phase. Please make sure not to neglect turning it in.

{: .note }
> For phases 3 to 5, your project grade will have two components:
> 1. **Group Grade**: Determined by grading rubric for that particular phase.
> 2. **Individual Grade**: Determined by your contributions to the project. **Be prepared to explain those during an oral interview with a TA or Instructor**. The goal is to determine which parts of the project you worked on, what you did, what worked and did not work in your development process and in your part of the submitted project, and how well you can explain what you did and did not do and accomplish.
>
> The group grade will be each student’s default grade. If the staff feels there was a reasonable division of labor among team members and a student basically understands their part of the project and how it fits in the bigger picture, then the student will get the group grade. If the student does not meet this bar, the staff reserves the right to  adjust the individual grade lower appropriately.
>
> We anticipate that, if you complete the project satisfactorily, you will receive an A in the class.



[phase_1]: {% link _pages/project/phase_1.md %}
[phase_2]: {% link _pages/project/phase_2.md %}