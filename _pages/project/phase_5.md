---
title: Phase 5
parent: Project
nav_order: 50
---

Your goal for this final phase is to optimize your virtual machine implementation in order to minimize the amount of time needed to execute MITScript programs.

{: .announcement }
> There are two components you need to submit for this phase:
> 1. Your derby-ready interpreter, due at **11:59 PM on Monday, December 8**.
> 2. A comprehensive report, due at **11:59 PM on Monday, December 8**.

{% include toc.html %}


## Getting Started

1. Review the updated [project skeleton](https://github.com/6112-fa25/skeleton) which includes parsing logic for the new derby command line submission.
1. Review the updated [command line reference]({% link _pages/project/cli.md %}) which now includes a spec on the new derby subcommand.

## Overview

This assignment is completely open-ended; you are not required to implement any specific optimization. Your grade will be based on 1) your overall design (with heavy emphasis on the writeup) and 2) how well your virtual machine performs compared to a baseline score. In particular, we will hold a Virtual Machine Derby where your virtual machine implementation will compete against those of your fellow classmates on a set of hidden programs.

In the final month of class, we will cover various performance-improving optimizations. Some optimizations that we will cover (or have already covered) in class include:

*  **Threaded code**: Your VM interpreter from Phase 4 most likely used an interpreter loop with a single switch statement (sometimes also referred to as "switch dispatch" or "switch threading") to dispatch bytecode instructions. This is suboptimal from a performance standpoint as the switch statement makes it virtually impossible for the CPU to predict which instruction needs to be executed next, which causes the CPU to stall. [(Other forms of) threaded code](https://www.complang.tuwien.ac.at/forth/threaded-code.html), such as subroutine-threaded code and direct-threaded code, can alleviate this problem by essentially "distributing" the dispatch logic. Direct-threaded code, for instance, uses separate logic for each distinct bytecode instruction to dispatch the next instruction, which makes it easier for the CPU to predict which instruction needs to be executed next. See the previous link for more information.

*   **Stack caching**: Your VM interpreter from Phase 4 stored all operands on a stack that is presumably stored entirely in heap memory, which meant that loading operands from the stack and storing new values to the stack always required pointer indirection. Stack caching is an optimization that uses machine registers to store some elements (e.g., the top several elements) of the stack, which eliminates the need to access memory when accessing those particular stack elements. See the papers [Stack Caching for Interpreters (by Anton Ertl)](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.5.4929&rep=rep1&type=pdf) and [Stack Caching for Forth (by Anton Ertl and David Gregg)](http://www.euroforth.org/ef05/ertl-gregg05.pdf) for more information.

*   **Tagged pointers:** Your VM interpreter from Phase 4 most likely stored all values as objects on the heap, which meant that creating a new value of any type (including integers or Booleans) required a memory allocation while accessing any value required an indirect memory access. Tagged pointers can be used to embed representations of certain types of values (such as integers) directly within pointers, which can potentially reduce memory accesses and allocations (at the cost of making operations on values more complicated).

*   **Type specialization**: Dynamic languages are very flexible, but this flexibility comes at significant performance cost. For example, your virtual machine interpreter needs to check that the inputs to each arithmetic operation (e.g., subtraction) are in fact integers before performing the operation. In practice, however, a given operation in the program may only operate on objects from a small set of types or even a single type. In cases where this set of types can be identified (either statically using dataflow analysis or after profiling), these operations can be _specialized_ to execute more quickly for that set of types. So for instance, if your VM can determine that a given subtraction operation only receives integers as operands, the VM can then generate more efficient code that need not explicitly check the operands to make sure they are integers before performing the subtraction (cast elimination). Additionally, if your VM can determine that an operand must be an integer, then instead of storing that operand in an object on the heap and accessing the object through references, the VM can simply store and access the integer directly (unboxing).

*   **Function inlining**: Dynamic control flow, such as calling a function, is expensive. Function inlining is an optimization that inlines a callee into the body of the caller. This optimization is most easily performed when it is possible to statically (at initial code generation time) determine which function needs to be called. There may be functions within the program for which you can determine this using dataflow analysis. See Chapter 15 of the Whale book for more information.

*   **Other dataflow optimizations**: When you generate native code in an intermediate representation (IR) or bytecode language, you may notice the occurrence of multiple inefficient code sequences. For example, the generated code might assign a temporary value into memory and then immediately load the value from memory again for the next computation, or the generated code might add multiple constants even if the result is known statically (e.g., 1 + 1). Or, checking that a value is an integer even though you know it is an integer constant. Dataflow analysis gives a principled framework for identifying these opportunities and optimizing the code with optimizations such as copy propagation, constant propagation, dead code elimination, etc. See Chapter 12 and of the Whale book and Chapter 9 of the Dragon Book for more information.

*   **Machine code generation**: Instead of interpreting bytecode directly, your VM may instead just-in-time (JIT) compile the bytecode down to native (x86-64) code and execute the JIT-compiled code instead, which can let your VM better exploit hardware features such as registers for performance. You may also find it useful to generate assembly code in order to implement other optimizations such as subroutine-threaded code. See the "Tips for Machine Code Generation" section below for additional information.

*   **Bytecode redesign/replacement**: We will only evaluate your final implementation with MITScript source programs as inputs. You are therefore free to change the design of the MITScript bytecode language (e.g., to add new instructions), replace it with an entirely different representation (e.g., a low-level register-based IR), or even remove all IRs if they do not suit your implementation strategy.

*   **Advanced garbage collection**: In Phase 4, you were required to implement a mark-and-sweep garbage collector. However, you may instead find performance benefits from implementing a more complicated garbage collector (e.g., a copying collector or a generational collector). See these books and papers for additional information:

    *   Garbage Collection: Algorithms for Dynamic Memory Management by Jones (Book)
    *   The Garbage Collection Handbook by Jones, Hosking, and Moss (Book)
    *   Uniprocessor Garbage Collection Techniques by Paul Wilson (Survey Paper)

*   **Peephole optimizations**: Peephole optimizations replace small instruction sequences with faster counterparts based on local information. For example, multiplications and divisions by (positive) powers-of-two can be replaced by shifts. See Chapter 9.9 of the Dragon Book for additional information.


A substantial portion of this project phase is to determine which optimizations will provide a benefit given the programs of the provided benchmark suite and the target architecture. In order to identify and prioritize optimizations, we will provide you with a benchmark suite of programs. These programs are more complex than the code that has been provided during the previous phases, so your first priority is to make sure your compiler produces correct unoptimized code for each benchmark.

After making sure your VM produces correct unoptimized code (bytecode/IR or machine code), you should analyze the applications in the benchmark suite. You should use these programs (and any other programs provided during previous phases) to determine which optimizations you will implement. Specifically, you are expected to analyze the performance of your VM to determine the effectiveness of each proposed optimization.

You are not limited to implementing the optimizations that have been covered in class; you are free to implement any optimization that you come across in your readings or any optimization that you might devise. However, your writeup must demonstrate that each optimization is effective and semantic-preserving. Furthermore, you must argue that each optimization is general, meaning it is not a special-case optimization that works only for a specific application in the benchmark suite.

## Submission

As with Phase 4, your submission must include an interpreter for MITScript as well as accompanying writeup (see the next section for more information regarding the writeup).

<!-- The interpreter must at least support the command-line options `-s` (to run in MITScript source mode) and `-mem N` (to limit memory usage to `N` megabytes). In addition, the interpreter should support a new command-line option `--emit-code`, which should print out any code (bytecode/IR or machine code) that your VM generates as soon as the code is generated (and before it is actually executed by the interpreter). -->

Your VM may implement as many of the optimizations listed above as you'd like or even implement optimizations that you might have devised or come across on your own. **However, your VM must implement at least one of the following (sets of) optimizations**:

*   Threaded code (using any method other than the basic interpreter loop with a single switch) + stack caching
*   Tagged pointers
*   Type specialization
*   Function inlining
*   Any other optimization that requires dataflow analysis (e.g., copy propagation, dead code elimination, etc.)
*   Machine code generation
*   Shape analysis of records

Your VM must provide a command-line option for enabling each optimization that affects code generation (either bytecode/IR or machine code). Your writeup should document how each flag can be used. For example:

*   `-O inline`: turns on function inlining
*   `-O constantprop`: turns on constant propagation
*   `-O inline,constantprop`: turns on both function inlining and constant propagation

Your virtual machine (compiler and interpreter) must also provide a `-O all` flag to turn on all optimizations (“full optimizations”). We will use this command-line option for the derby. For optimizations that affect code generation, the `-O all` option should consider how many times to apply each optimization and in what order the optimizations should be applied.

### Code

Submit your code and tests through [Gradescope under Phase 5 (Derby)](https://www.gradescope.com/courses/1099582/assignments/7230729/) using GitHub:

1. Push your code to your team's repository (`6112-fa25/fa25-team<TEAM_NUMBER>`)
2. We recommend creating a separate branch for submission (like `phase5-submission`)
3. Go to the Phase 5 assignment on Gradescope and select your repository and branch

If you want to check for correctness, you may also submit through [Gradescope under Phase 5 (Correctness)](https://www.gradescope.com/courses/1099582/assignments/7130735). Keep in mind that we will only grade your most recent submission to [Phase 5 (Derby)](https://www.gradescope.com/courses/1099582/assignments/7230729/) for the final deadline.

The autograder will run tests and show you how many you passed. It can take up to 40 minutes to run. Check the [Autograder][autograder] page for details about the testing environment.

**Important:** Please only have one submission for your entire team. Include each of your team members in the submission on Gradescope. When grading, we will just grade the most recent submission from your team (so make sure you are all on the same page)!

**Tip:** Submit early once your build system works to make sure the autograder can compile your code. You can submit as many times as you want before the deadline.

We'll review your code on GitHub and may reduce your grade if we find suspicious patterns (like code written specifically to pass certain tests).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Report

The report for this phase is extremely important. Although it explicitly accounts for only 20% of the grade, it will also be used to determine your score for the implementation aspect of the project (50%).

**Your report must clearly identify all optimizations that are implemented in your VM and, for each optimization, specify where in your code base that optimization is implemented.** For each optimization, your report must convince the reader that the optimization is beneficial, general, and correct. For each optimization that affects code generation, you should also specify the corresponding command-line option that enables that specific optimization. In addition, your report should include a discussion on other optimizations that you considered but opted against implementing. (Remember that the thoroughness of your exploration of the optimization space can significantly impact the performance of your VM—and your grade as a result.)

For runtime representation and garbage collection optimizations, your report should include diagrams that illustrate your representation changes and algorithms. For optimizations that affect code generation, you should include code examples (in bytecode/IR or assembly) for each optimization that show how the optimization transforms code that your VM generates. Highlight the benefits of the optimization on generated code. Discuss exactly how the benefits are achieved given the characteristics of our target architecture and include empirical evidence that proves your conclusion for the optimization.

Your writeup should include the following:

1.   **Overview**: An overview of your design, an analysis of design alternatives you considered, and key design decisions. Be sure to document and justify all design decisions you make. Any decision accompanied by a convincing argument will be accepted. If you realize there are flaws or deficiencies in your design late in the implementation process, discuss those flaws and how you would have done things differently. Also include any changes you made to your implementations from previous phases and explain why they were necessary.

        For the `-O all` flag that your VM implements, your report should further discuss how you determined the order in which optimizations that affect code generation are performed and how many times each optimization is applied.

2.   **Implementation**: A brief description of interesting implementation issues. This should include any non-trivial algorithms, techniques, and data structures. It should also include any insights you discovered during this phase of the project.

3.   **Division of work**: A brief description of how your group divided the work. This will not affect your grade; it will be used to alert the instructors to any possible problems.

4.   **Assumptions**: A list of any clarifications, assumptions, or additions to the problem assigned. The project specifications are fairly broad and leave many of the decisions to you. This is an aspect of real software engineering. If you think major clarifications are necessary, **feel free consult the instructors**.

## Grading

This assignment will be graded as follows:

*   (20%) Writeup. Particular attention will be given to your description of the optimizations you implemented and how you selected those specific optimizations. Do your best to limit the length of the writeup to around eight pages (single column, 11 pt font).

*   (50%) Implementation. As each group may implement a different set of optimizations, the public tests will simply validate that your implementation (with full optimizations) generates correct results for the benchmark suite (25%). The hidden tests will check for overtly optimistic optimizations and incorrect handling of programs (25%). **To receive credit for your implementation, you must implement at least one of the optimizations listed in the "Deliverables" section. Furthermore, your implementation of one of those optimizations must be sufficiently general that it can be applied to more than one of the benchmark programs.**

*   (30%) Derby performance. The section describing the virtual machine derby (see below) details the formula that we will use to compute this portion of your grade.


## Milestone

For the milestone (due November 14 at 10 pm ET), you are expected to submit a preliminary writeup that describes the optimizations you plan on implementing in your VM and gives an overview of your design. As with the final writeup, the preliminary writeup should include code examples or diagrams (e.g. control flow graphs) that demonstrate how your optimizations will work and how they can optimize generated code. The writeup should also provide justifications for why you believe the proposed optimizations will be beneficial. Furthermore, the writeup should discuss other optimizations that you considered and explain why you have decided against implementing those optimizations.

## Extra Credit Checkpoint

Phase 5 has one extra credit checkpoint, due on November 24 at 10pm ET. We will run your VM end to end on the Phase 5 public tests with the garbage collector and all optimizations enabled (i.e., with the command-line options `./run.sh derby -mem N -O all` where `N` is the memory limit specified for each test program) and assign extra credit towards your Phase 5 grade in proportion to your VM's correctness.

## Derby

You can find the performance results of your submitted code, as well as other teams (under anonymized names) at [derby.kosinw.com](https://derby.kosinw.com).
You will receive your anonymized team name by email. The “Speedup” column on the leaderboard is the baseline time divided by the geometric mean of your benchmarks times.


We will be holding a virtual machine derby on the last day of class, where will race your virtual machine against the submissions from the other groups in the class. We have released all but one of the derby benchmarks publicly. The final one will be revealed one day prior to the derby to help with final hour debugging.

As mentioned previously, 30% of your grade for this phase will be determined by your VM's performance in the derby. In particular, suppose your virtual machine achieves a geometric mean speedup of $$S$$ versus the baseline. The _base grade_ for your VM could then be computed as:

\\[
\text{base grade} = \min\left(1,\max\left(0,\frac{5+\log_3\left(S\right)}{6}\right)\right)
\\]

Your ranking in the derby will be determined (solely) by your virtual machine's base grade. Then, assuming that your virtual machine is ranked $$K$$-th (where a smaller $$K$$ denotes a higher rank), the performance portion of your final Phase 5 grade (out of 30 points) will be computed as

\\[
\text{total grade} = 30 \left( \min\left(1,\text{base grade}+0.02\cdot\left(9-K\right)\right) \right)
\\]

For your information, here is the `lscpu` information for the dedicated server (with some information redacted).

```
Architecture:              x86_64
  CPU op-mode(s):          32-bit, 64-bit
  Address sizes:           46 bits physical, 48 bits virtual
  Byte Order:              Little Endian
Vendor ID:                 GenuineIntel
  CPU family:              6
  Model:                   143
  BogoMIPS:                4800.00
  Flags:                   fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2
                           ss ht syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon rep_good nopl xtopology nonstop_tsc
                           cpuid aperfmperf tsc_known_freq pni pclmulqdq monitor ssse3 fma cx16 pdcm pcid sse4_1 sse4_2 x2a
                           pic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetc
                           h cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms inv
                           pcid avx512f avx512dq rdseed adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl
                           xsaveopt xsavec xgetbv1 xsaves avx_vnni avx512_bf16 wbnoinvd ida arat avx512vbmi umip pku ospke
                           waitpkg avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg tme avx512_vpopcntdq rdpid cldemote
                           movdiri movdir64b md_clear serialize amx_bf16 avx512_fp16 amx_tile amx_int8 flush_l1d arc h_capabilities
Caches (sum of all):
  L1d:                     384 KiB (XXXX instances)
  L1i:                     256 KiB (XXXX instances)
  L2:                      16 MiB (XXXX instances)
  L3:                      105 MiB (1 instance)
```

On the day of the derby, your group will give a short presentation on the design of your virtual machine as well as the optimizations that you implemented. This can be as formal or informal as you wish.

## Tips for Machine Code Generation

If you choose to implement native (machine) code generation, the x86-64 Architecture Guide, provided as a supplement to this handout on the course reference materials page (see below), presents a not-so-gentle introduction to the x86-64 ISA. It presents a subset of the x86-64 architecture that should be sufficient for the purposes of this project. You should read this handout before you start to write the code that traverses your IR and generates x86-64 instructions.

The asm directory of the skeleton repo includes the x64asm library, which provides an in-memory assembler. If you choose to implement machine code generation, you may use the library to assemble and execute any machine code that your VM generates. The examples in asm/x64asm/examples provide a good starting point for working with x64asm. Note that x64asm has a [known issue](https://github.com/StanfordPL/x64asm/issues/238) where the assembler does not reserve enough memory for the code generation of long functions. Specifically, there is no logic to dynamically reserve more space in the instruction buffer as instructions are added. It is therefore your responsibility to call the `reserve()` method of each `x64asm::Function` as needed to ensure there is enough space in the buffer. We recommend doing this once per function (at the start of each function). You can reserve `irlist.size() * MAX * 15` bytes per function, where `irlist` is a vector containing your IR to be compiled, and `MAX` is a static upper bound on the number of assembly instructions that can result from a single IR instruction.

To fully take advantage of the ability to generate machine code for performance, you might also want to consider implementing a register allocator. See Chapter 16 of the Whale book, Chapter 8.8 of the Dragon book, and the [reference materials]({% link _pages/resources.md %}) for additional information.

Some additional tips:

*   Watch out for subtle differences such as `jmp` vs. `jmp_1`
*   Use `gcc -S` to see the assembly generated by a standard compiler if you need inspiration

## Reference Materials

Beyond the normal course materials, we have provided links on the course website to useful and well-known papers on register allocation. Reading these before designing and writing your register allocator may be very useful. We will also post links to papers about other useful optimizations to the course website as we discover them. You can find these links [here]({% link _pages/resources.md %}).

[autograder]: {% link _pages/tutorials/autograder.md %}
[cli]: {% link _pages/project/cli.md %}