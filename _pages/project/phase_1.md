---
title: Phase 1
parent: Project
nav_order: 10
---

This phase consists of two segments: lexical analysis (aka scanning or lexing) and syntactic analysis (aka parsing).

{% include toc.html %}

{: .announcement }
> There are three components you need to submit for this phase:
> 1. Your scanner and parser code, due at **10:00 PM on Monday, September 22**.
> 2. A short report, due at **10:00 PM on Monday, September 22**.
> 3. Ten additional test cases, due at **10:00 PM on Monday, September 22**.


## Getting Started

1. Read the [project overview]({% link _pages/project.md %}).
2. Follow [these instructions]({% link _pages/tutorials/setup.md %}) to set up your project skeleton.
3. Read and understand the [command line reference][cli].
4. Read [this document]({% link _pages/project/phase_1.md %}).

You'll need to check the [language spec]({%link _pages/project/spec.md%}) (in particular, section 1) when building your scanner and parser. The grammar rules don't tell you exactly what each part should handle—you'll need to figure out how to divide the work between the scanner and parser.

We suggest writing your scanner by hand. But if you want, you can use tools like ANTLR4 or flex to help generate the tokenizer code.

You **must** write your parser by hand such as a recursive descent parser. You may not use parser generators. Other hand-written approaches like parser combinators are fine too.

## Scanner

Your scanner must be able to identify tokens of the MITScript language, the imperative scripting language we will be compiling in 6.112. The language is described in the [language spec]({%link _pages/project/spec.md%}). Your scanner should note illegal characters, missing quotation marks, and other lexical errors with reasonable error messages. We recommand that your scanner find as many lexical errors as possible, and should be able to continue scanning after errors are found. The scanner should also filter out comments and whitespace not in string and character literals.

When you run the [`./run.sh lex` subcommand][cli], your scanner should show a list of all the tokens it found. Each line shows:
- The line number where the token appears (starting from 1)
- The token type (if it has one)
- The actual text of the token

Use these exact names for the following token types: string literals (`STRINGLITERAL`), integer literals (`INTLITERAL`), boolean literals (`BOOLEANLITERAL`), and identifiers (`IDENTIFIER`).

For string literals, show the exact text as it appears in the code, including the quotes and any escape characters.

Here is an example corresponding to `print("Hello, World!");`:

```sh
1 IDENTIFIER print
1 (
1 STRINGLITERAL "Hello, World!"
1 )
1 ;
```

We've provided test files in the `tests` repository. You'll find the expected output for each test file in `.mit.lex` files.

- For valid files: Your scanner output must match our expected output exactly
- For invalid files: Your scanner just needs to return an error code (non-zero). We've included examples of error messages, but yours don't need to match exactly.

## Parser

You need to write a recursive descent parser by hand. It should correctly parse any valid MITScript program. If a program doesn't follow the grammar rules, your parser should report at least one error.

The boilerplate provided in the skeleton is just there to help you get started, you're free to modify it in any way that fits your needs.

Your parser should construct an abstract syntax tree (AST) that represents the structure of the program. We recommend that your tree should have nodes for each of the following program elements:

```
Block ::= [Statement]                                           Global ::= Name
Assignment ::= LHS Expression                                   CallStatement ::= Expression
IfStatement ::= Condition ThenPart ElsePart                     WhileLoop ::= Condition Body
Return ::= Expression                                           FunctionDeclaration ::= [Arguments] Body
BinaryExpression ::= LeftOperand Operator RightOperand          UnaryExpression ::= Operand Operator
FieldDereference ::= BaseExpression Field                       IndexExpression ::= BaseExpression Index
Call ::= TargetExpression [Arguments]                           Record ::= Map[String, Expression]
IntegerConstant                                                 StringConstant
NoneConstant                                                    BooleanConstant
```

Make sure arithmetic operators are left-associative. This means `(w+x+y+z)` should be grouped as `(((w+x)+y)+z)`.

You are free to implement your parser as you see fit, provided that you deliver an implementation that uses no additional parsing libraries outside of what you develop yourself.  For example, ANTLR4 (and many other tools and libraries) can be used to automatically generate parsers from a grammar specification. If you would like to use ANTLR4 (or these other tools) to automatically generate a reference, executable parser with which you then compare the outputs of which against that of your manually-developed implementation, then you are free to do so. However, your manually-developed implementation must not use any of the code from these tools in their operation (outside of potentially ANTLR4's lexing capabilities). This restriction does not prevent you from implementing your own helper code, such as implementing your [own parser combinator library](https://theorangeduck.com/page/you-could-have-invented-parser-combinators).

When you run the [`./run.sh parse` subcommand][cli], your parser should show a nicely formatted version of the AST if its valid:
- If the input is valid: Return exit code 0 (success)
- If there are syntax errors: Return a non-zero exit code

## Grading

This phase is worth 5% of your total grade:

- **4%** - Passing the automated tests for your scanner and parser (2% each)
- **0.5%** - Your 10 additional test cases in the `additional-tests/` folder
- **0.5%** - Your short report (about 3 paragraphs) explaining your approach

The public test cases are available at the [`6112-fa25/tests` repository](https://github.com/6112-fa25/tests).

**Important:** Don't copy code from other teams. This counts as cheating. You can look at and discuss other solutions, but the code you submit must be your own work.

## Submission

### Code

Submit your code and tests through [Gradescope under Phase 1](https://www.gradescope.com/courses/1099582/assignments/6607792) using GitHub:

1. Push your code to your repository (`6112-fa25/<YOUR KERB>`)
2. We recommend creating a separate branch for submission (like `phase1-submission`)
3. Go to the Phase 1 assignment on Gradescope and select your repository and branch

The autograder will run tests and show you how many you passed. It can take up to 40 minutes to run. Check the [Autograder][autograder] page for details about the testing environment.

**Tip:** Submit early once your build system works to make sure the autograder can compile your code. You can submit as many times as you want before the deadline.

Check the course [late policy]({% link _pages/syllabus.md %}#late-policy) for submission deadlines.

We'll review your code on GitHub and may reduce your grade if we find suspicious patterns (like code written specifically to pass certain tests).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Tests

Create 10 test files named `test1.mit` through `test10.mit` that your parser should be able to handle correctly. Put these in a folder called `additional-tests/` in your project. Try to test different features of the language.

### Report

Submit a short report (about 3 paragraphs) under [Phase 1 Report on Gradescope](https://www.gradescope.com/courses/1099582/assignments/6611536). As a soft rubric, your report should cover:

1. **Implementation.** Explain at a high level how you implemented this phase:
- What data structures did you use (e.g. ASTs)?
- How did you handle and report multiple errors?

2. **Testing and Debugging.** How did you check that your code works correctly?
- Did you write extra test cases? How did you make sure you tested enough?
- What tools or methods helped you find and fix bugs?

3. **Reflection and Project Status.** Be honest about your progress:
- Is everything working? Are there any failing tests or problems you know about?
- If you could start over, what would you do differently?
- Is there anything specific you'd like help with from the TAs?


## Implementation Tips

**Memory:** Don't worry about cleaning up memory in this phase—we'll add garbage collection later. If you know how to use smart pointers, you can use them for AST nodes and they'll handle memory management automatically. We'll cover smart pointers in recitation.

**Start small:** Break this down into smaller pieces. Don't try to implement everything at once. Start with something simple like arithmetic expressions (you did this in 6.031 too). Build and test that first, then add more features gradually.

[s3]: https://studentlife.mit.edu/s3
[autograder]: {% link _pages/tutorials/autograder.md %}
[cli]: {% link _pages/project/cli.md %}