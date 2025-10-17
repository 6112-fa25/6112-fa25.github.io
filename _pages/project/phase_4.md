---
title: Phase 4
parent: Project
nav_order: 40
---

In this phase, you will implement both a bytecode compiler and interpreter for the MITScript virtual machine.

Your bytecode compiler will take as input an MITScript program, produce an AST using your code from [Phase 1][p1], and use the AST as an input to generate a bytecode-style intermediate representation.

Given that intermediate representation, your bytecode virtual machine will execute the bytecode to produce the program's results.

{: .announcement }
> There are four components you need to submit for this phase:
> 1. Your bytecode compiler code, due at **10:00 PM on Friday, November 7**.
> 2. Your bytecode interpreter code, due at **10:00 PM on Friday, November 7**.
> 3. A short report, due at **10:00 PM on Friday, November 7**.
> 4. Ten additional test cases, due at **10:00 PM on Friday, November 7**.

{% include toc.html %}

{: .warning :}
> This phase is **very long**, as it requires two major deliverables: both a compiler and a virtual machine. Please start early and coordinate your work amongst your team clearly!

## Virtual Machine

The virtual machine provides a stack-based machine abstraction of the execution of a program.

The interface for the virtual machine should be `./run.sh vm <input.>mitbc`, where `<input>` refers to an input MITScript bytecode program. All output during VM execution (i.e. from `print`) should be directed to **standard output**, **NOT an output file**.

As discussed in lecture, virtual machines provide a syntax-independent and platform-independent (e.g. x86) mechanism to specify a program representation and execution model. As a strong distinction between your bytecode interpreter from [Phase 2][p2], your representation here is flat in that the body of a function is a straight-line sequence of simple non-recursive operations.

The virtual machine abstracts an MITScript program into a single function that:
1. Contains multiple nested functions, each of which corresponds to the creation of a closure.
2. Has a list of instructions that when executed augment an operand stack and the heap.

We illustrate the basic structures of the virtual machine in the following MITScript program:
```python
x = 1;
y = 2;
z = x + y;
```

One possible translation of this MITScript program into a bytecode representation is:
```
function
{
  functions = [],
  constants = [1, 2],
  parameter_count = 0,
  local_vars = [x, y, z],
  local_ref_vars = [],
  free_vars = [],
  names = [ ],
  instructions =
  [
    load_const  0
    store_local 0
    load_const  1
    store_local 1
    load_local  0
    load_local  1
    add
    store_local 2
  ]
}
```

### Example

We next illustrate the execution of the above function step-by-step. We present the contents of the function's frame and operand stack both before and after each instruction with their values specified in braces.

```
{ Frame: {x : uninit , y : uninit, z : uninit}, Stack : { } }
0: load_const 0
{ Frame: {x : uninit , y : uninit, z : uninit}, Stack : { 1 } }
```

The `load_const i` instruction pushes the ith constant in the function's constant pool onto the operand stack. In this case, the `0`th constant is the integer value `1`.

```
{ Frame: {x : uninit , y : uninit, z : uninit}, Stack : { } }
1: store_local 0
{ Frame: {x : 1 , y : uninit, z : uninit}, Stack : { } }
```

The `store_local i` instruction stores the top of the operand stack into the function's ith local variable as determined by the function's locals array. The instruction also pops or removes the top value of the operand stack. In this case the `0`th variable is the variable `x`.

```
{ Frame: {x : 1 , y : uninit, z : uninit}, Stack : { } }
2: load_const 1
{ Frame: {x : 1 , y : uninit, z : uninit}, Stack : { 2 } }
```

As above, `load_const i` loads the ith constant onto the operand stack. In this case the constant is the integer value `2`.

```
{ Frame: {x : 1 , y : uninit, z : uninit}, Stack : { 2 } }
3: store_local 1
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : {  } }
```

As above, `store_local i` stores the top of the operand stack into the function's ith local variable. In this case, the `1`st variable is the variable `y`.

```
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : {  } }
4: load_local  0
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 1 } }
```

The `load_local i` instruction reads the value of the function's ith local variable and pushes onto the top of the operand stack. Because the function's `0`th local is the variable `x` and its value is the integer value `1`, the instruction pushes `1` onto the operand stack.

```
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 1 } }
5: load_local  1
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 1, 2 } }
```

As per the reasoning above, this instruction pushes the integer value `2` onto the operand stack. Note that the top of the stack is the rightmost element.

```
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 1, 2 } }
6: add
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 3 } }
```

The `add` instruction pops two elements off of the top of the stack, performs the addition of the two elements, and pushes the result back onto the top of the stack. Note that unlike the other instructions, this instruction does not have an operand `0`.

```
{ Frame: {x : 1 , y : 2, z : uninit}, Stack : { 3 } }
7: store_local 2
{ Frame: {x : 1 , y : 2, z : 3}, Stack : { } }
```

As described previously, the `store_local i` instruction stores the top of operand stack into the specified local variable.

### Functions

A *function* consists of a sequence of instructions as well as additional supporting metadata for the function. In the abbreviated presentation of this example, this additional metadata includes the function's constant pool (the list of constants used by the function's instructions) and the function's locals (the list of local variables in the function).

### Instructions

An MITScript instruction consists of an operation code and an optional operand (which we refer to as operand 0). For example, the instruction `load_const 0` loads the constant at index 0 of the function's constants. The mnemonic or name for the operation code is `load_const` and operand 0 is the integer value `0`. The meaning of `load_const 0` for this example is to load the value `1` and push that value onto the function's operand stack.

### Operand Stack

The virtual machine maintains an operand stack while executing the sequence of instructions within a function. The operand stack is a standard stack (or LIFO queue) that stores intermediate values during the execution of the function. Instructions receive their input operands (excluding operand 0) by popping values off of the operand stack. Instructions produce values by pushing their results onto the stack.

As a note, each function execution maintains its own operand stack. Therefore, if a function calls another function, the virtual machine creates a new, empty operand stack for the second function that only the second function operates on. Once invocation of the second function returns, the virtual machine deallocates its operand stack.

### Values
As in Phase 2, the virtual machine includes the following values:

1. None
2. Boolean
3. Integer
4. String
5. Record

The virtual machine also includes the following values:

1. Function: a list of instructions as well as the function's additional supporting metadata
2. Variable references: a reference to a local variable that has been defined in a (possibly different) scope
3. Closure: a tuple consisting of a function to execute and the local variable references that the instructions within the function use

To illustrate these values, consider the following MITScript program:
```go
x = 1;
f = fun(y) {
  g = fun(z) {
     return x + y + z;
  };
};
```

The most important aspect to this example is the code inside `g` in that it accesses the *global* variable `x`, the *reference* variable `y`, and the *local* variable `z`. In the virtual machine, each of these variables have different access instructions as well as different runtime machinery to support their execution. To understand these differing implementations, consider the following bytecode translation for this program:

```
function
{
  functions =
  [
    function
    {
      functions =[
        function
         {
          functions  = [],
          constants  = [],
          parameter_count = 1,
          local_vars = [z],
          local_ref_vars = [],
          free_vars  = [y],
          names = [x],
          instructions = [
             load_global 0
             push_ref    0
             load_ref
             add
             load_local  0
             add
             return
          ]
         }
      ],
      constants = [None],
      parameter_count = 1,
      local_vars = [y, g],
      local_ref_vars = [y],
      free_vars = [],
      names = [],
      instructions = [
        load_func     0
        push_ref      0
        alloc_closure 1
        store_local   1
        load_const    0
        return
       ]
    }
  ],
  constants = [None, 1 ],
  parameter_count = 0,
  local_vars = [],
  local_ref_vars = [],
  free_vars = [],
  names = [x, f],
  instructions =
  [
    load_const   1
    store_global 0
    load_func    0
    alloc_closure 0
    store_global 1
  ]
}
```

#### Functions
In the virtual machine, each function includes an expanded set of metadata that capture the semantics of managing local variables (including parameters).

- `parameter_count`: the number of parameters for the function
- `local_vars`: the list of local variables of the function, starting with the function's parameter_count parameters, in the order they are declared.
- `local_ref_vars`: the list of local variables that are accessed by reference
- `names`: the list of global variable and field names accessed inside the function
- `free_vars`: the list of non-global and non-local variables (variables from a parent scope) that are accessed within this function's instructions
- `constants`: a list of constants (e.g., None, 1, "hello" used within this function)
- `functions`: a list of definitions of the functions nested within this function

#### Variables
Given this metadata, we can now distinguish and give a semantics to the machinery of variable access.
- *Global Variable*: global variables are accessed by the `load_global i` instruction. The instruction reads the value of a global variable using the index `i`. In this case, `i` refers to the index into the names list of the enclosing function. The instruction therefore accesses the variable named `names[i]`.

- *Reference Variable*: To support accessing variables that are allocated in other scopes, the virtual machine supports reference variables. Reference variables are variables that are accessed via an address that has been passed to the function when the function's closure was created.

    The `push_ref i` instruction loads the reference to a variable onto the stack. In this case `i` refers is the index into either the enclosing function's `local_ref_vars` or `free_vars` array (if i is greater than the length of `local_ref_vars`).

    The `load_ref` instruction dereferences the address associated with the reference at the top of the stack to load a new value onto the stack.

- *Local Variable*: As discussed in the previous section, local variables are accessed by the `load_local i` instruction.

#### Closures
To support reference variables, creating closures on the virtual machine is different than the corresponding implementation in Phase 2. In Phase 2, a closure consisted of a function to execute, as well as a pointer to the frame to be used as a parent frame when executing the function.

In the virtual machine, instead of taking a pointer to a frame, a closure takes a list of references to the free variables in the nested function. This design is more efficient in that each access to variable inside the function need not recursively search its ancestry of frames to find the appropriate value for the variable.

The instructions for the function `f` above illustrates how `f` creates a closure for variable `g`. The instruction sequence first pushes a reference to `y` onto the stack (via the `push_ref 0` instruction) and then pushes the function that corresponds to `g` (`load_func 0`).

The `alloc_closure` instruction consumes and stores the function and variable references and then asserts that the number of passed variable references matches the number of free variables in the function.

The files `src/bytecode/types.hpp` and `src/bytecode/instructions.hpp` give a more precise explanation of a function's instructions and metadata.

### Program State

#### Frames
A stack frame in MITScript includes:
1. Dedicated storage for the value of local variables.
2. Dedicated storage for local variable references that are accessed/passed in/passed by reference.
3. An operand stack.

#### Heap
Many of your runtime structures will be allocated in a heap. You must use some sort of garabge collector to manage the allocated data and runtime structures, namely [your Phase 3 implementation][p3].

### Garbage Collection
Your virtual machine should support a command line argument of the form `--mem N` ([Command Line Reference][cli]), where `N` is the maximum amount of memory (in MB) that the VM can have allocated at any time.

You can assume that `N` will be at least twice as large as the maximum amount of memory that will ever be required by the program you are running. You can also assume that `N` will always be at least 4. Your garbage collector should make sure that the virtual machine never has more than this amount of memory allocated at any time.

Some tests for this assignment will depend on the ability of your implementation to stay within the memory limits given by `-mem N`.

### Errors
The virtual machine reports the same exceptions for the error conditions as in Phase 2. At the bytecode level, however, there are also new opportunities for execution to encounter an error. For example, consider this alternative translation of our first MITScript program:

```
function:
  local_vars = [x, y, z],
  constants = [1, 2],

  instructions =
  [
    0: load_const  0
    1: store_local 0
    2: load_const  1
    3: store_local 1
    4: load_local  0
    5: add
    6: store_local 2
  ]
```

In this case, the bytecode compiler has failed to generate the code to load the value of y prior to the add instructions on line 5. The height of the operand stack prior to line 5 is 1 and, therefore, the add instruction will fail because it cannot pop its two necessary operands from the stack.

Your bytecode interpreter should generate the following additional exceptions:

- `InsufficentStackException`: when an instruction cannot pop a sufficient number of arguments from the operand stack
- `RuntimeException`: for all other VM error conditions not covered by Phase 2.

Your interpreter should also generate a `RuntimeException` if the provided bytecode attempts to perform an operation with objects that were not given a semantics in Phase 2. For example, if the bytecode attempts to print a variable reference, then your interpreter should generate a `RuntimeException`.

### Native Functions
For this assignment, we will use the convention that the first three indices in the functions list of the outermost function (the function for the whole program) correspond to the `print`, `input`, and `intcast` functions, respectively. The function's specified at the top level of the program's source code should therefore be indexed by an integer greater than `2`. Plan for your generated bytecode to include a prologue that explicitly creates closures (`load_func`, `alloc_closure`) for the native functions and assigns them to the corresponding variables (`print`, `input`, and `intcast`) in the global frame.

Your bytecode interpreter should detect when one of these functions has been called and perform the correct action.

## Compiler
Your compiler should translate the AST representation of an MITScript program to a single bytecode function and pretty print the bytecode to standard output (the command line). We have included a pretty printer class as part of the skeleton that may use to pretty print your bytecode representation for output.

As explained above, the definition of a function within the program should be located within the function's field of that function's parent function. If the function does not syntactically have a parent function (it is defined at the top level), then its parent should be the single bytecode function that you generate for the whole program.

The interface for the compiler should be `./run.sh compile <input>.mit -o <output>.mitbc`, where `<input>` refers to an input MITScript program and `<output>` refers to the resulting MITScript bytecode.

## Submission

### Code

Submit your code and tests through Gradescope under Phase 4 using GitHub:

1. Push your code to your team's repository (`6112-fa25/fa25-team<TEAM_NUMBER>`)
2. We recommend creating a separate branch for submission (like `phase4-submission`)
3. Go to the Phase 4 assignment on Gradescope and select your repository and branch

The autograder will run tests and show you how many you passed. It can take up to 40 minutes to run. Check the [Autograder][autograder] page for details about the testing environment.

**Important:** Please only have one submission for your entire team. Include each of your team members in the submission on Gradescope. When grading, we will just grade the most recent submission from your team (so make sure you are all on the same page)!

**Tip:** Submit early once your build system works to make sure the autograder can compile your code. You can submit as many times as you want before the deadline.

Check the course [late policy]({% link _pages/syllabus.md %}#late-policy) for submission deadlines.

We'll review your code on GitHub and may reduce your grade if we find suspicious patterns (like code written specifically to pass certain tests).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Tests

Create 10 test files named `bytecodetest1.mit` through `bytecodetest10.mit` that your virtual machine should be able to handle correctly. Put these in a folder called `additional-tests/` in your project. Your tests should not use the `input` function but should use the `print` function.

### Report
In this phase you will also write a longer report that explains the technical details of how you have integrated Phases 1-4. This will be a much more substantial document than the reports for previous phases. You may write any length report within reason as long as it addresses all the points below.

We will review your report as well as provide feedback on your code. Please make sure all code has been committed to your team’s repository. It must include the following sections:

1. **Design**: An overview of your design, an analysis of design alternatives you considered, and key design decisions for each of the parts below. This section should help us understand your code, and convince us that it is sufficiently general, and let us know anything that might not be reflected in your code. You must, at a minimum, answer the above questions for the following parts of your compiler or virtual machine:

    1. Your chosen scanner/parser implementation
    2. Your garbage collection algorithm
    3. Your virtual machine implementation
    4. Your bytecode compiler implementation

2. **Extras**: A list of any clarifications, assumptions, or additions to the problem assigned. This include any interesting debugging techniques/logging, or additional build scripts. The project specifications are fairly broad and leave many of the decisions to you. This is an aspect of real software engineering. If you think major clarifications are necessary, consult the TA.

3. **Difficulties**: A list of known problems with your project, and as much as you know about the cause. If there are any Phase 2 tests that you were not passing before the Phase 2 deadline, but fixed for Phase 4, you should also include this information in the write up.

4. **Contribution Statement**: A brief description of how your group divided the work. This will not affect your grade; it will be used to alert the TAs to any possible problems.

## Evaluation

We will evaluate your implementation in three ways.

To evaluate your bytecode compiler, we will execute your compiler on a number of test programs to generate bytecode for each program. Given that bytecode, we will execute it on our own reference bytecode interpreter to verify that your compiler produces correct bytecode. To validate correctness, we will verify that the output of the reference bytecode interpreter when executed on your generated bytecode matches that of the MITScript semantics.

To evaluate your interpreter, we will execute your interpreter on test programs written in bytecode that may be from either your compiler or our own reference bytecode compiler. To validate correctness, we will verify that the output of your interpreter when executed on the bytecode matches that of the MITScript semantics. Additionally, we will run your interpreter on a set of invalid bytecode programs and verify that your interpreter throws the proper exceptions. To support these evaluations, your compiler and your interpreter should faithfully adhere to the semantics of each MITScript bytecode instruction.

To evaluate your garbage collector, your virtual machine should support a command line argument of the form `--mem N` ([Command Line Reference][cli]), where `N` is the maximum amount of memory (in MB) that the VM can have allocated at any time. You can assume that `N` will be at least twice as large as the maximum amount of memory that will ever be required by the program you are running. You can also assume that `N` will always be at least 4. Your garbage collector should make sure that the virtual machine never has more than this amount of memory allocated at any time. Some tests for this assignment will depend on the ability of your implementation to stay within the memory limits given by `--mem N`.

## Extra Credit Checkpoints
Phase 4 has two extra credit checkpoints. For the first checkpoint (due October 24 at 10 pm ET), we will run your virtual machine only on Phase 4 **bytecode tests** and assign extra credit towards your Phase 4 grade in proportion to the proportion of test cases you get correct (maximum 5% for fully correct).

For the second checkpoint (due October 31 at 10 pm ET), we will run your compiler and virtual machine end-to-end on Phase 4 tests and again assign extra credit towards your Phase 4 grade in proportion to the proportion of test cases you get correct (maximum 5% for fully correct).

For the final deadline (due November 7 at 10 pm ET), we will run all of the tests from the first two checkpoints *in addition to* certain tests being ran with a memory limit (specified by the [`--mem` argument][cli]) as further tests of your garbage collector from Phase 3. These tests will be weighted three times as signficantly compared to the other tests.

The goal of these checkpoints is to make sure you are incentivized to make progress early. Note that it is critical that you begin your implementation as soon as possible. It is a rare situation that we offer such stern advice, but if you make no progress on Phase 4 by the time the first checkpoint is due, you will not be in a strong starting position for Phase 5 when it becomes available.

## Implementation Notes

There are two main programming patterns that you will see in this assignment: the visitor pattern and the interpreter loop.

- **Visitor pattern**: As with your interpreter in Phase 2, your compiler is best structured with the Visitor pattern. Your compiler will recursively traverse the AST to generate code. The lectures on syntax-directed translation lay out the basic approach.

- **Interpreter loop**: A function consists of a flat sequence of instructions. The interpreter for a flat sequence is best structured as an interpreter loop. An interpreter loop maintains an instruction pointer that points to the current instruction to be executed.

    When the interpreter finishes performing an instruction, it increments the instruction pointer to point to the next instruction. For control flow instructions, the next pointee of the instruction pointer may not be the next immediate instruction. Instead, it may be a different instruction as determined by the jump destination of the control flow instruction.

As a group, you should plan to use your interpreters from Phase 2 to provide reference semantics for Phase 4. This will help with debugging. Note that across the different interpreters from your group members, you may find inconsistencies in your own approaches. So, using only a single interpreter may not be optimal unless you verify that a single one is the best. Instead, you are more likely to find issues if you reference all of your interpreters. This technique (using multiple software implementations of a single specification) is called *N-version programming* and -- broadly -- can be helpful in some scenarios.

[p1]: {% link _pages/project/phase_1.md %}
[p2]: {% link _pages/project/phase_2.md %}
[p3]: {% link _pages/project/phase_3.md %}
[cli]: {% link _pages/project/cli.md %}
[autograder]: {% link _pages/tutorials/autograder.md %}
