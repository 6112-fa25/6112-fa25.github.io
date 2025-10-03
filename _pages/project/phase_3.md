---
title: Phase 3
parent: Project
nav_order: 30
---

In this phase, you will implement an automatic garbage collection system for your  implementing and incorporating a mark-and-sweep garbage collector.

We will also release the [Phase 4]({% link _pages/project/phase_4.md %}) handout in which you will implement a bytecode compiler and virtual machine interpreter for MITScript. Phases 3 and 4 are designed to be completed in parallel.

{: .announcement }
> There are three components you need to submit for this phase:
> 1. Your garbage collector code, due at **10:00 PM on Friday, October 17**.
> 2. A short report, due at **10:00 PM on Friday, October 17**.
> 3. Ten additional test cases, due at **10:00 PM on Friday, October 17**.

{% include toc.html %}

## Team Formation

Unlike the first two phases, this and the remaining phases of the project will be done in teams of up to three people. Once you have formed a team, one member of your team should submit this [Gradescope assignment](https://www.gradescope.com/courses/1099582/assignments/6876716/grade) as soon as possible, and we will create a new GitHub repo for your team that you should use for the rest of the semester.

If you don't receive a GitHub invitation within 24 hours after submitting the Gradescope assignment, let us know on Piazza.  If you are still in search for teammates, do consider coordinating on [Piazza](https://piazza.com/class/meqenx20yy070s/post/5).

## Garbage Collection

The main starter code for this assignment is in `src/gc/gc.hpp`.

{: .important }
> The autograder will search for `src/gc/gc.hpp` as your submission for this phase. If this file is not in this location (relative to the root of your repository), the autograder will **not be able to grade** your submission properly.

This file defines two key classes that you will be working with for this assignment. The first one is called `Collectable`. All objects tracked by the garbage collector must be `Collectable` objects, and any fields in the `Collectable` class can be thought of as part of the header that will be used by the garbage collector to store metadata relevant to this object.

The second key class is called `CollectedHeap`. This is the class that keeps track of all the objects managed by the garbage collector and should implement the mark-and-sweep algorithm to perform the actual garbage collection.

<!-- Your VM should support a command line argument of the form `--mem N` ([Command Line Reference]({% link _pages/project/cli.md %})), where `N` is the maximum amount of memory (in MB) that the VM can have allocated at any time. You can assume that `N` will be at least twice as large as the maximum amount of memory that will ever be required by the program you are running. You can also assume that `N` will always be at least 4. Your garbage collector should make sure that the VM never has more than this amount of memory allocated at any time. Credit for this assignment will depend on the ability of your implementation to stay within the memory limits given by `-mem N`. -->

Your garbage collector should also be implemented as a header-only library in `src/gc/gc.hpp` that can be reused outside of your interpreter. Furthermore, the `CollectedHeap` class must, at minimum, implement the methods that are declared in the provided skeleton (i.e., the `allocate` method, `markSuccessors`, and `gc`).

You should not change the signatures of those methods, though your implementation may include additional helper methods and classes if they are useful. You might also want your garbage collector to keep track of how much memory is currently allocated on the heap.

The reason for this is that your garbage collector header-only library will be linked against C++ test cases that will assume this signature.

## Evaluation

We will compile and run a set of C++ unit tests against your implementation of `src/gc/gc.hpp`. These tests will use your mark-and-sweep garbage collector to allocate and manage memory, and they are intended to evaluate the correctness of your garbage collector implementation.

For [Phase 4]({% link _pages/project/phase_4.md %}), we will also run your VM with `--mem N` on a set of MITScript tests and verify that your VM stays within the specified memory limits. Examples of these tests will be released and available under `phase3/` in the tests repository. However, these sorts of tests will only be run on your Phase 4 submission.

To measure the peak memory usage of your VM (in phase 4), we will use `/usr/bin/time -v` and look at the reported maximum resident set size, which should be within `N + 5 MB`. The additional 5 MB is to allow for extra memory that's needed to load your VM binary into memory. These tests are intended to evaluate whether your VM properly invokes the garbage collector to limit memory usage.

Unfortunately, `/usr/bin/time` is not consistent between runs, so make sure you run it a couple of times to confirm you're always staying below the limit.

Examples of both types of tests can be found in `6112-fa25/tests` under `phase3/public`. **We will only evaluate the `.cpp` tests for this phase.** You will also be responsible for your own testing infrastructure. In particular, the tests expect that your garbage collector is fully implemented in `src/gc/gc.hpp`

## Implementation Notes

For a very basic implementation strategy, you could do the following:

- Make your stack frames and your value classes extend `Collectable`.
- Implement the allocate methods in `CollectedHeap` to allocate objects using the new operator, keeping track of the objects and their sizes (potentially by writing information into private fields of `Collectable`).
- Implement mark and sweep methods to be called from `gc()`.

If you follow this approach, be aware of the following challenges.

- You will want to be careful when accounting for the memory used by different objects. In particular, remember that the `sizeof` operator can tell you the size of a struct or a class, but if your class is allocating additional memory (either directly or through STL objects) then you will need to keep track of that too.

- With STL objects in particular, you'll need to either instrument their allocators or approximate their memory usage. The factor of 2 between the maximum memory needed by the application and the memory limit gives you some wiggle room in terms of this approximation, but not too much.

- To instrument STL allocators, you can either provide allocators to the types directly, which makes them a part of the type signature, or use the types in the `std::pmr` namespace. In general, I'd recommend you have a look at the [Dynamic memory management](https://en.cppreference.com/w/cpp/memory.html) subsection of cppreference.

You need to decide when to call `gc()`. Keep in mind that garbage collection is expensive, so you do not want to do it until you have to. At the same time, if your VM does not trigger garbage collection frequently enough, it might exceed the specified memory limit.

You might find Valgrind (in particular, memcheck and massif) to be useful for debugging your garbage collector. If you need help using them, please post on Piazza.

## Improvements

Below are some suggested enhancements on top of the basic implementation strategy.

- Booleans and None can just be statically allocated.

- There is a version of the new operator, `new (ptr) A()`, that instead of allocating its own memory expects you to pass a pointer ptr to some preallocated memory where the object should live. You can allocate memory with malloc for instance and then pass it to this version of new, or by using allocate on your custom allocator or std::memory_resource.

- An example reason to do this is to allocate multiple pieces of data in a single buffer. For example, for String values, you can allocate a single buffer that contains both the Value class as well as the characters that actually make up the string. You can also use this trick to allocate stack frames so that all the different tables that make up the stack frame are allocated in the same contiguous buffer. If you do this, keep in mind three things:

- Make sure you have performance numbers that justify the optimization
- Memory should always be freed in the same way it was allocated
- If allocated with new, should be deallocated with `delete`.
- If allocated with malloc, it should be deallocated with free
- If allocated via a memory resource, it should be deallocated via that resource.
- When you deallocate memory with `delete`, the compiler will automatically call the destructor. But if you create an object with new (ptr) and then use free to deallocate the underlying memory, the destructor will not be called automatically. You need to call the destructor explicitly before freeing the memory.
- It is really, really important that your buffer is big enough to hold everything you want to put in it.

- You may find it useful to replace any STL in your value classes with your own custom data structures. Again, make sure to measure the difference.
- In particular, it could be better for spatial locality to implement a simple linked list as part of the Collectable class instead of keeping a `std::list` or `std::vector`. Again, make sure you measure that difference.

- For integers, you may find it advantageous to keep a cache of recently allocated integers so that if the program tries to allocate the same integer value multiple times in a row your allocator just returns a pointer to the same object instead of allocating a new one.

## Grading

This phase is worth 10% of your total grade:

- Passing the C++ unit tests for your garbage collector
- Your 10 additional test cases in the `additional-tests/` folder
- Your short report (about 3 paragraphs) explaining your approach

The public test cases are available at the [`6112-fa25/tests` repository](https://github.com/6112-fa25/tests).

**Important:** Don't copy code from other teams. This counts as cheating. You can look at and discuss other solutions, but the code you submit must be your own work.

## Submission

### Code

Submit your code and tests through [Gradescope under Phase 3](https://www.gradescope.com/courses/1099582/assignments/6903365/) using GitHub:

1. Push your code to your team's repository (`6112-fa25/fa25-team<TEAM_NUMBER>`)
2. We recommend creating a separate branch for submission (like `phase3-submission`)
3. Go to the Phase 3 assignment on Gradescope and select your repository and branch

The autograder will run tests and show you how many you passed. It can take up to 40 minutes to run. Check the [Autograder][autograder] page for details about the testing environment.

**Tip:** Submit early once your build system works to make sure the autograder can compile your code. You can submit as many times as you want before the deadline.

Check the course [late policy]({% link _pages/syllabus.md %}#late-policy) for submission deadlines.

We'll review your code on GitHub and may reduce your grade if we find suspicious patterns (like code written specifically to pass certain tests).

{: .warning }
Make sure the `./build.sh` and `./run.sh` scripts are located at the **root** of your repository, otherwise the autograder will fail.

### Tests

Create 5 test files named `test21.cpp` through `test25.cpp` that your garbage collector should be able to handle correctly. Put these in a folder called `additional-tests/` in your project. Try to test different features of the language.

### Report

Submit a short report (about 3 paragraphs) under [Phase 3 Report on Gradescope](https://www.gradescope.com/courses/1099582/assignments/6903370). As a soft rubric, your report should cover:

1. **Implementation.** Explain at a high level how you implemented this phase:
- What data structures did you use (e.g. garbage collector)?

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
