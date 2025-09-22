---
title: Phase 2
parent: Project
nav_order: 20
---

In this phase, you will implement a recursive interpreter for the MITScript language. The semantics of MITScript is documented in the [language specification](assets/documents/spec.pdf), which you should use to inform your interpreter implementation. Be sure to read it carefully.

{% include toc.html %}

{: .announcement }
> There are three components you need to submit for this phase:
> 1. Your interpreter code, due at **10:00 PM on Friday, October 3**.
> 2. A short report, due at **10:00 PM on Friday, October 3**.
> 3. Ten additional test cases, due at **10:00 PM on Friday, October 3**.

## Interpreter

Your interpreter, which will be invoked by the [`./run.sh interpret` subcommand][cli], should take as input a single command-line argument that represents the path to a file containing an MITScript program. As output, your interpreter should produce the output, written to standard output, of the execution of that MITScript program according to the semantics given in the language specification.

 For instance, if `arith.mit` contains the following program:

```python
print("1 + 1 = " + (1 + 1));
```

then executing the command `./run.sh interpret arith.mit` in standard output should produce the following output (in standard output):

```python
1 + 1 = 2
```

Keep in mind, that the output must go to **standard output**, and not to an output file specified by the `-o` flag.

We will be evaluating your interpreter by passing in programs and verifying that the output of your interpreter matches that of our reference implementation.

{: .important}
> Because we are testing the textual output, make sure your interpreter does not produce any unnecessary output (e.g., logging or debugging output); it should only produce the output as specified in the semantics.

Whenever a program performs an illegal operation, your interpreter should report an error (read the [language specification](assets/documents/spec.pdf) for more details), stop execution, and exit with a non-zero return code.

We will also evaluate your interpreter by checking that it correctly reports errors *and* returns a non-zero exit code for programs that have runtime errors.

### Inference Rules

Use the visitor pattern to implement the inference rules included in the [language specification](assets/documents/spec.pdf) in a recursive manner. An example of this pattern, can be found in the example code in [`6112-fa25/recitation3`](https://github.com/6112-fa25/recitation3).

Visit methods in a visitor takes as input an abstract syntax tree node (e.g. an expression) and returns void. However, an evaluation relation like $$(\Gamma, h, e) \rightarrow (h, v)$$ means that your implementation will take as input a stack and a heap – in addition to the expression – and produce a heap and a value.

### Values

You are free to implement this as you see fit. However, one way to modify your visitor to (conceptually) return more than just void is to use instance variables in your interpreter to store the return value:

```cpp
class Interpreter : public Visitor
{
  // ...
  Value* rval_;
};
```

Then, when visiting expressions, you can enforce the property that every visit method for an expression sets the value of rval_ to the result of evaluating that expression. So for example, when visiting a binary expression expr, your code can operate as follows:

```cpp
void visitBinaryOp(BinaryOp* expr)
{
  expr->left->accept(this);
  Value* leftVal = rval_;

  expr->right->accept(this);
  Value* rightVal = rval_;

  rval_ = computeBinaryOp(expr->op, leftVal, rightVal);
}
```

### Stack

You can use an instance variable to keep track of the stack. For example, you can add the following variable to your interpreter:

```cpp
std::stack<Frame*> stack_;
```

When your implementation needs to refer to or manipulate the stack, it can simply use the instance variable.

### Heap

In the case of the heap (a map from address to values), there is no need to define your own heap. Instead, your implementation already has a heap: the heap maintained by the C++ runtime!

Thus, for example, at any point in the semantics where you should allocate an address and map a value to that address, you can implement this by allocating memory for that value within your interpreter implementation (i.e., by using `new Integer`). As in Phase 1, you do not have to worry about deleting or reclaiming the memory you allocate; we will implement garbage collection in Phase 3.

{: .important }
> You should not use smart pointers for allocation here. `unique_ptr` is not suitable as there is not just a single owner for your values, stack frames, etc., and `shared_ptr` would manage memory incorrectly as it would respond poorly to cycles. We will implement manual memory management in Phase 3 via garbage collection.

## Grading

This phase is worth 20% of your total grade:

- Passing the automated tests for your interpreter
- Your 10 additional test cases in the `additional-tests/` folder
- Your short report (about 3 paragraphs) explaining your approach

The public test cases are available at the [`6112-fa25/tests` repository](https://github.com/6112-fa25/tests).

**Important:** Don't copy code from other teams. This counts as cheating. You can look at and discuss other solutions, but the code you submit must be your own work.

## Submission

### Code

Submit your code and tests through [Gradescope under Phase 2](https://www.gradescope.com/courses/1099582/assignments/6772203) using GitHub:

1. Push your code to your repository (`6112-fa25/<YOUR KERB>`)
2. We recommend creating a separate branch for submission (like `phase2-submission`)
3. Go to the Phase 2 assignment on Gradescope and select your repository and branch

The autograder will run tests and show you how many you passed. It can take up to 40 minutes to run. Check the [Autograder][autograder] page for details about the testing environment.

**Tip:** Submit early once your build system works to make sure the autograder can compile your code. You can submit as many times as you want before the deadline.

Check the course [late policy]({% link _pages/syllabus.md %}#late-policy) for submission deadlines.

We'll review your code on GitHub and may reduce your grade if we find suspicious patterns (like code written specifically to pass certain tests).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Tests

Create 10 test files named `test11.mit` through `test20.mit` that your interpreter should be able to handle correctly. Put these in a folder called `additional-tests/` in your project. Try to test different features of the language.

### Report

Submit a short report (about 3 paragraphs) under [Phase 2 Report on Gradescope](https://www.gradescope.com/courses/1099582/assignments/6772230). As a soft rubric, your report should cover:

1. **Implementation.** Explain at a high level how you implemented this phase:
- What data structures did you use (e.g. ASTs)?

2. **Testing and Debugging.** How did you check that your code works correctly?
- Did you write extra test cases? How did you make sure you tested enough?
- What tools or methods helped you find and fix bugs?

3. **Reflection and Project Status.** Be honest about your progress:
- Is everything working? Are there any failing tests or problems you know about?
- If you could start over, what would you do differently?
- Is there anything specific you'd like help with from the TAs?

[s3]: https://studentlife.mit.edu/s3
[autograder]: {% link _pages/tutorials/autograder.md %}
[cli]: {% link _pages/project/cli.md %}