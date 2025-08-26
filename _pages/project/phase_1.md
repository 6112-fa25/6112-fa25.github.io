---
title: Phase 1
parent: Project
nav_order: 10
---

This phase consists of two segments: lexical analysis (aka scanning or lexing) and syntactic analysis (aka parsing).

{: .announcement }
> There are three things you need to submit for this phase:
> 1. Your scanner and parser code, due at **10:00 PM on Monday, September 22**.
> 2. A short report, due at **10:00 PM on Tuesday, September 23**.
> 3. Ten additional test cases, due at **10:00 PM on Monday, September 22**.

## Getting Started

1. Follow [these instructions]({% link _pages/tutorials/skeleton.md %}) to set up your C++ project skeleton.
2. Read the [language spec]({% link _pages/project/spec.md %}). Phase 1 will only reference the first two sections.
3. Read and understand the command line reference.
4. Read [this document]({% link _pages/project/phase_1.md %}).

You will need to refer to the [language spec]({%link _pages/project/spec.md%}) (in particular section 1) when implementing the scanner and parser. The grammar in the language spec does not specify what goes into the scanner and what goes into the parser; you will have to determine this split yourself.

We recommend hand writing your lexer. However, you are welcome to use a scanner generator such as ANTLR4 or flex to create your scanner if you prefer.

You are **not allowed** to use a parser generator to generate your parser, you must hand write a recursive-descent parser. Parser combinators, pratt parsing, and other hand-written parsing techniques are also OK.

## Scanner

Your scanner must be able to identify tokens of the MITScript language, the imperative scripting language we will be compiling in 6.112. The language is described in the [language spec]({%link _pages/project/spec.md%}). Your scanner should note illegal characters, missing quotation marks, and other lexical errors with reasonable error messages. We recommand that your scanner find as many lexical errors as possible, and should be able to continue scanning after errors are found. The scanner should also filter out comments and whitespace not in string and character literals.

When the `lex` subcommand is specified, the output of your compiler should be a scanned listing of the program with one line for each token in the input. Each line will contain the following information: the line number (starting at 1) on which the token appears, the type of the token (if applicable), and the token's text. Please print only the following strings as token types: `STRINGLITERAL` (specified in the spec as `<string_literal>`), `INTLITERAL` (`<int_literal>`), `BOOLEANLITERAL` (`<bool_literal>`), and `IDENTIFIER` (`<id>`).

For `STRINGLITERAL`, the text of the token should be the text, as appears in the original program, including the quotes and any escaped characters.

Here is an example corresponding to `print("Hello, World!");`:

```sh
1 IDENTIFIER print
1 (
1 STRINGLITERAL "Hello, World!"
1 )
1 ;
```

The `tests` repository contains a set of test files on which to test your scanner and the expected output for these files (stored in `.mit.lex` files). The output of your scanner should match the provided output exactly on all valid files. For invalid files, the autograder will only check that your compiler returns a non-zero exit code. We have provided a sample of what you may want your errors to look like, but the output does not need to match the provided output exactly.

## Parser

You will write a recursive descent parser by hand. Your parser must be able to correctly parse programs that conform to the grammar of the MITScript language. Any program that does not conform to the language grammar should be flagged with at least one error message.

The boilerplate provided in the skeleton is just there to help you get started, you're free to modify it in any way that fits your needs.

As output, your parser must produce an Abstract Syntax Tree (AST) with nodes roughly matching the following program constructs:

```
Block ::= [Statement]
Global ::= Name
Assignment ::= LHS Expression
CallStatement ::= Expression
IfStatement ::= Condition ThenPart ElsePart
WhileLoop ::= Condition Body
Return ::= Expression
FunctionDeclaration ::= [Arguments] Body
BinaryExpression ::= LeftOperand Operator RightOperand
UnaryExpression ::= Operand Operator
FieldDereference ::= BaseExpression Field
IndexExpression ::= BaseExpression Index
Call ::= TargetExpression [Arguments]
Record ::= Map[String, Expression]
IntegerConstant
StringConstant
NoneConstant
BooleanConstant
```

You need to make sure that all arithmetic operators are left associative, so `(w+x+y+z)` should be parsed as `(((w+x)+y)+z)`.

You are free to implement your parser as you see fit, provided that you deliver an implementation that uses no additional parsing libraries outside of what you develop yourself.  For example, ANTLR4 (and many other tools and libraries) can be used to automatically generate parsers from a grammar specification. If you would like to use ANTLR4 (or these other tools) to automatically generate a reference, executable parser with which you then compare the outputs of which against that of your manually-developed implementation, then you are free to do so. However, your manually-developed implementation must not use any of the code from these tools in their operation (outside of potentially ANTLR4's lexing capabilities). This restriction does not prevent you from implementing your own helper code, such as implementing your [own parser combinator library](https://theorangeduck.com/page/you-could-have-invented-parser-combinators).

When the `parse` subcommand is specified, the output of your program should be zero if the input is syntactically valid. Otherwise, it should return a non-zero error code signifying an error has occurred with the parser reading/accepting the input.

If the program is a syntactically correct MITScript program (according to the grammar), then you should pretty-print the AST to the specified output (either stdout or a file).

To develop this parser, your tasks will be:
- Write the lexer and parser
- Define all the types for your AST nodes
- Define a visitor interface
- Define a visitor that pretty prints the AST

## Test Cases

You should provide 10 tests named test1.mit, to test10.mit that your parser can parse correctly. Place these files under a folder called `additional-tests/` in your project repository. Your tests should provide good coverage of the constructs in the language.

## Report

Your report for this phase should follow the structure below.

1. **Implementation.** Provide a high-level description of your approach in this phase, including:
- An overview of your intermediate data structures (e.g., abstract syntax trees, symbol tables, tree IRs, graph IRs, etc.).
- Your strategy for handling and reporting multiple errors.

2. **Testing and Debugging.** Describe how you evaluated the correctness of your implementation:
- Did you write any additional test cases? How did you ensure adequate coverage?
- What methods or tools (e.g., assertions, visualizations, fuzzers, sanitizers) helped you debug?

3. **Reflection and Project Status.** Provide an honest evaluation of your progress:
- Is your implementation complete? Are there failing tests or known issues?
- If you were to redo this phase, what would you do differently?
- Do you have anything specific you would like TAs to review or help with?

## Grading

Your grade in this phase (5% total) is allocated as follows:

- The public and private tests of your scanner and parser: 4% (2% for scanner, 2% for parser).
- Ten additional test cases placed under `additional-tests/`: 0.5%.
- A *short* (3 paragraphs) report on your chosen implementation approach: 0.5%.

The public test cases are available at the [`6112-fa25/tests` repository](https://github.com/6112-fa25/tests).

Copying code outside of your team is strictly forbidden. While the students are allowed to inspect and discuss other students' solutions, copying code will be considered cheating. We will be strict in enforcing this policy!

## Submission

### Code + Tests

Please submit your Phase 1 code on Gradescope via GitHub, following the steps below:

1. Push your code to your phase 1 GitHub repository (`6112-fa25/<YOUR KERB>_phase1`). We suggest making a separate branch for the submission, say, `phase1-submission`.
2. Go to the Phase 1 assignment on Gradescope, and select your GitHub repository and branch.

We have set up an autograder for the Gradescope assignment, and you should be able to see the number of test cases you passed when the autograder finishes running. The autograder is slow, and might take up to 40 minutes to run. Please see the [Autograder][autograder] page for more information about the installed software on the autograder.

**We suggest making an early submission once you finish setting up your build system just to check that the autograder can correctly build your compiler.**
You can resubmit your assignment as many times as you want before the due date, but please do not do this excessively.

Review the course [late policy]({% link _pages/syllabus.md %}#late-policy) for information about turning this assignment on time.

We reserve the right to review your code on GitHub and may, for example, give a lower grade (than dictated by the number of tests passed) for bad-faith code (e.g. writing code specific to particular tests in the test suites).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Report

Please submit your report in the Phase 1 Report assignment on Gradescope.

## Implementation Notes
For this phase, you do not have to worry about reclaiming memory; we will implement garbage collection in a later phase. However, if you're comfortable with smart pointers, you can use them to allocate AST nodes, as they will manage the memory for you. We will review smart pointers in recitation.

Start small. This is true for every phase. Identify subtasks that you can complete end-to-end instead of trying to implement the entire phase for the entirety of MITScript. For example, in 6.031 you built an interpreter for arithmetic. MITScript has arithmetic as well and, therefore, you can check your understanding by implementing an end-to-end implementation of the phase for arithmetic (and whatever limited additional program constructs you need to get it through). For Phase 1, that means first developing a parser for just arithmetic to verify your understanding of the approach.

[s3]: https://studentlife.mit.edu/s3
[autograder]: {% link _pages/tutorials/autograder.md %}
