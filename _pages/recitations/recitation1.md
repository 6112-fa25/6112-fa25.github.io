---
title: Recitation 1
parent: Recitations
nav_order: 10
---

Today we'll cover the Phase 1 requirements, mostly covering logistics and deliverables. In the second half, we'll discuss and introduce the C++ programming language.


{% include toc.html %}


## Announcements

#### Miniquizzes
* Miniquiz #2 is due **tonight**, September 8th at 11:59pm.
* Miniquiz #3 is due **tomorrow night**, September 9th at 11:59pm.
* Going forward, miniquizzes will be assigned at the start of each lecture day and will *(generally)* be due at **1pm** the following weekday.

#### Office Hours
* Office Hours are still being sorted out. The intention is that office hours will be every Tuesday and Thursday from 4-6pm.


## Phase 1 Overview

{: .goal :}
>Have a working C++ program that can determine whether or not a particular MITScript program is *syntactically* valid or not.

We can think about this as containing two smaller subtasks: **scanning** (also called lexing) and **parsing**. This phase won't cover any semantics—that's the goal of interpretation in Phase 2. This includes anything in the [language specification](assets/documents/spec.pdf) past section 1.


### Scanning

The scanning phase takes raw MITScript code as input and transforms it into a list of tokens.

This process involves breaking down the continuous stream of characters into meaningful units such as keywords (like `if`, `while`, `global`), identifiers (variable and function names), operators (like `+`, `-`, `==`), literals (numbers, strings), and punctuation (parentheses, semicolons, and so on).

The scanner skips over whitespace and comments. Each token, represented by a C++ class, will contain both what kind of token it is and its textual value.

<figure>
  <img src="assets/img/fig1.png" alt="Example of scanning process.">
  <center>
  <strong><figcaption>Figure 1: Example of the scanning process.</figcaption></strong>
  </center>
</figure>


#### Specification
When you run `./run.sh scan <filename>` on a **lexically valid input file**, it should:
* Exit with return code 0 (in UNIX-land, this means the program succeeded)
* Output a list of tokens, one per line, with the line that token starts on
* For identifiers and literals, show the type (string `STRINGLITERAL`, integer `INTEGERLITERAL`, and booleans `BOOLEANLITERAL`)

When you run `./run.sh scan <filename>` on a **lexically invalid input file**, it should:
* Exit with a non-zero return code (in UNIX-land, this means the program failed)
* The autograder won't check the output, but you should output an error message to stderr


### Parser

The parsing phase takes in a list of tokens, produced by the scanner, and transforms it into a data structure called an *abstract syntax tree* (AST) which encapsulates the syntactic structure of the program.

This process involves analyzing the sequence of tokens to determine if they form a valid program according to the grammar given in the [language specification](assets/docs/spec.pdf). The parser recognizes patterns like function definitions, variable assignments, control flow statements (if-else, while loops), and expressions, organizing them into a hierarchical tree structure.

<figure>
  <img src="assets/img/fig2.png" alt="Example of the parsing process.">
  <center>
  <strong><figcaption>Figure 2: Example of the parsing process.</figcaption></strong>
  </center>
</figure>


#### Specification
When you run `./run.sh scan <filename>` on a **lexically valid input file**, it should:
* Exit with return code 0 (in UNIX-land, this means the program succeeded)
* The autograder won't check the output, but you should pretty-print some visualization of your AST to stdout

When you run `./run.sh scan <filename>` on a **lexically invalid input file**, it should:
* Exit with a non-zero return code (in UNIX-land, this means the program failed)
* The autograder won't check the output, but you should output as many errors as possible to stderr

You **should** implement the Visitor pattern for your AST data structure in this phase. Although we won't explicitly grade it, it's extremely helpful for this phase and absolutely necessary for the next:
1. Building a pretty printer for your AST
2. Building a recursive interpreter in Phase 2

We'll cover the Visitor pattern in more detail in the following two recitations.

---

### Submission and Grading
Phase 1 is worth **5%** of the overall grade in this course. It's due at **10pm** (not **11:59pm**) on **Monday, September 22nd**.

You'll be required to submit the following deliverables on Gradescope:
1. Code Submission (autograded). This will include about 200 scanner tests and about 200 parser tests (many private). You can see your score at any time, but not the details of the particular test case that's failing.
2. Short report (1-2 paragraphs)
3. 10 additional test cases of your own

At this point, you should have received an invite to join the course organization ([6112-fa25](https://github.com/6112-fa25)). We've created a repo for each person for the first two phases. This repo should be your *kerberos*.

If you don't have access to either the repo or the class organization, please let us know immediately. Make sure to accept the invite for both the repository and organization!

We provide public test cases in the [6112-fa25/tests](https://github.com/6112-fa25/tests) repository. At some point after each phase completes, we'll update the repository with the private tests for that phase. We'll also add the public tests for the upcoming phase.

We have a preliminary Python script that runs the tests against your interpreter. You'll need to expand this yourself for later phases.


## Intro to C++ (Part 1)

C++ is a statically-typed, high-level general purpose programming language with powerful low-level and high-level abstractions. The low-level abstractions allow us to manipulate underlying hardware resources at a very fine granularity. The high-level abstractions allow us to express a wide breadth of high-level ideas such as polymorphism or higher-order functions.


### Hello, World!
Let's begin by writing our first C++ program, which prints "Hello, world!" to the console.

```cpp
// FILE : main.cpp
#include <iostream>

int main(int argc, char *argv[]) {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
```

Already, there are a few things of note about this program.
* We include the `<iostream>` library, which allows us to use the `std::cout` and `std::endl` objects.
    * `#include` is a preprocessor directive that tells the compiler to include the contents of the file specified in the angle brackets.
* We define the `main` function, which is the entry point of the program.
    * `int main(int argc, char *argv[])` is the signature of the `main` function.
    * `argc` is the number of arguments passed to the program.
    * `argv` is an array of *C-style* strings, each representing an argument passed to the program.
* We use the `std::cout` object to print "Hello, world!" to the console.
    * `std::cout` is the standard output stream.
    * `std::endl` is the standard end of line.
* We return 0 to indicate that the program exited successfully.

Now, let's compile and run the program.

```bash
g++ -o hello main.cpp
./hello
```

### Command Line Arguments

Let's look at command line arguments. When you run a program, you can pass additional arguments to it:

```cpp
// FILE : main.cpp
#include <iostream>

int main(int argc, char *argv[]) {
    for (int i = 0; i < argc; i++) {
        std::cout << argv[i] << std::endl;
    }
    return 0;
}
```

* `argc` is the number of arguments (including the program name)
* `argv` is an array of strings containing each argument
* `argv[0]` is the program name, `argv[1]` is the first argument, etc.

Let's compile and run the program:

```bash
g++ -o hello main.cpp
./hello
```

### Functions

Let's define a function that multiplies two command line arguments:

```cpp
// FILE : main.cpp
#include <iostream>

int multiply(int a, int b) {
    return a * b;
}

int main(int argc, char *argv[]) {
    int a = std::stoi(argv[1]);
    int b = std::stoi(argv[2]);
    std::cout << multiply(a, b) << std::endl;
    return 0;
}
```

* `int multiply(int a, int b)` defines a function that takes two integers and returns an integer
* `std::stoi()` converts a string to an integer
* Running `./multiply 5 3` outputs `15`

Let's compile and run the program:

```bash
g++ -o multiply main.cpp
./multiply 5 3
```

### Pointers

An extremely powerful tool in C++ is the pointer. Pointers are variables that contain the memory address of another variable.

```cpp
// FILE : pointer.cpp
#include <iostream>

int main(int argc, char *argv[]) {
    int a = 5;
    int *b = &a;
    std::cout << *b << std::endl;
}
```

In this program, we define an integer variable `a` and a pointer to an integer variable `b`. We set `b` to the address of `a`. We then print the value of `*b`, a pointer dereference, which is the value of `a`.

Let's compile and run the program:

```bash
g++ -o pointer pointer.cpp
./pointer
```

### Stack and Heap

Understanding memory management is crucial in C++. There are two main memory regions:

**Stack**:
* Automatic memory management - variables are created and destroyed automatically
* Fast access, limited size
* Used for local variables, function parameters, and return addresses
* Memory is freed when variables go out of scope

**Heap**:
* Manual memory management - you control when memory is allocated and freed
* Larger size, slower access
* Used for dynamic data structures and large objects
* Memory persists until explicitly freed

Let's see the difference with examples:

```cpp
// FILE : memory.cpp
#include <iostream>

int main(int argc, char *argv[]) {
    // Stack allocation - automatic
    int stack_var = 42;
    int *stack_ptr = &stack_var;  // Points to stack memory

    // Heap allocation - manual
    int *heap_ptr1 = new int(100);  // C++ style
    int *heap_ptr2 = (int*)malloc(sizeof(int));  // C style
    *heap_ptr2 = 200;

    std::cout << "Stack value: " << stack_var << std::endl;
    std::cout << "Stack via pointer: " << *stack_ptr << std::endl;
    std::cout << "Heap value 1: " << *heap_ptr1 << std::endl;
    std::cout << "Heap value 2: " << *heap_ptr2 << std::endl;

    // CRITICAL: Must free heap memory to avoid memory leaks
    delete heap_ptr1;      // Free C++ allocated memory
    free(heap_ptr2);       // Free C allocated memory

    // stack_var and stack_ptr are automatically freed when main() ends
    return 0;
}
```

Let's compile and run:

```bash
g++ -o memory memory.cpp
./memory
```

## Conclusion
In the next two recitations, we'll cover more C++ features and a small demo on implementing a lexer/parser for phase 1.

Here are some C++ resources to explore on your own:
- [C++ Reference](https://en.cppreference.com/w/)
- [C++ Style Guide](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Learn C++](https://www.learncpp.com/)
