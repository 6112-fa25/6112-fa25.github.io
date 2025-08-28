---
title: Setup
parent: Tutorials
nav_order: 10
---

All phases of the project will be completed in C++. By default, the project skeleton is configured to use C++20. If you'd like to use newer versions of the C++ standard, you are free to do so, but make sure the features you're using are supported.

{% include toc.html %}

## TL;DR
Here is the summary of the list of commands you need to know to clone, build, run, and test your project.

```bash
mkdir -p ~/Desktop/6.112                                                            # Create a class folder on your Desktop
cd ~/Desktop/6.112/                                                                 # Change directories into class folder
git clone --recursive-submodules -j8 git@github.com:6112-fa25/<YOUR KERB>.git       # Clone your repository
./docker.sh                                                                         # OPTIONAL: Launches docker container
./build.sh                                                                          # Builds your project
./test.sh                                                                           # Runs tests
./run.sh                                                                            # Run your project
```

## Cloning

Create and navigate to a directory where you'd like your project files to be stored and run the following commands. I recommend navigating to a location like `~/Desktop/6.112/` so it is easier to find.

```bash
git clone --recursive-submodules -j8 git@github.com:6112-fa25/<YOUR KERB>.git
```

This should initialize your phase 1 project directory with the skeleton code. If you get `Permission denied (publickey)`, make sure you have set up an SSH key with GitHub. If you do not know how to set up an SSH key with GitHub, read the beginning of the [Git tutorial]({% link _pages/tutorials/git.md %}).

## Building
You will need a Unix-like environment to build your project locally and ensure that we can build your project remotely on the grading server.

You may wish to install the same C++ compiler and build system as the grading system. Details about the grading server are available on the [Autograder][autograder] page.

{: .note :}
**Windows Users**. We highly encourage using [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) to set up a Unix-like environment. If you come to office hours with technical issues related to Windows, we will immediately refer you to install it before anything else.

If you are using a Linux or WSL2 environment on x86_64, we recommend using your native environment to build and run the project.

Another alternative is using a [Docker container](https://docs.docker.com/engine/install/) for those without access to a Linux, x86_64 environment. There are many tutorials online detailing how to install Docker. We recommend users on macOS (both Apple Silicon and Intel) to use this method, especially in later phases where executing x86_64 code may be helpful.

You can automatically build and launch a Docker container using the `docker.sh` shell script.

The recommended way to build the project is using CMake, as it will make your development faster. However, because teaching CMake is not the focus of this class, we also provide a Makefile that you might be more familiar with. If you're not familiar with either, we recommend you use CMake.

The project is configured to use C++20 by default. If you'd like to use other versions, you are free to do so, but if your workflow breaks we can only provide limited assistance.

Use the `build.sh` script to build your project. Building places a debug binary under `build/cmake/debug/mitscript` and a release binary under `build/cmake/release/mitscript`. The debug binary is compiled with [Google sanitizers](https://github.com/google/sanitizers) enabled which may be helpful for catching some memory-related and undefined behavior bugs at runtime. The release binary is compiled with the `-O3` optimization flag turned on.

## Testing
The project includes a submodule containing the [`6112-fa25/tests`](https://github.com/6112-fa25/tests/) repository under the `tests/` directory. You should have initialized the submodule when you ran the clone command.

You may use the script `test.sh` as a launching point for running test cases. We encourage you to hack on it and build more testing infrastructure beyond that script.

You aren't required to write any unit tests but are encouraged to do so, especially in later parts when you want to verify smaller parts of the functionality of your interpreter.

## Running

The program entry point is located in `src/main.cpp`. `src/cli.{hpp,cpp}` implements the command-line interface describes in [Command Line Reference](/project#command-line-reference).

All skeleton projects come with a `build.sh` and `run.sh` in the project root. Use these to build and run your compiler respectively. They will also be used for grading, so if you make any changes to the build or run process, make sure to modify these files to reflect them. In general, these two files are the only restriction we impose on the structure of your projects. If you decide to change the repository structure, you just need to modify `build.sh` and `run.sh` to correctly build and run your system.

Arguments passed to `run.sh` are passed straight to your binary. Read [Command Line Reference](/project#command-line-reference) for more information about the command-line arguments that your binary should accept.

{: .note :}
> In past offerings, we also allowed teams to choose Rust; however, we found that virtual machines built in Rust was not a great idea for several reasons. Due to the intricate nature of memory management in a virtual machine, it is not possible to achieve comparable performance to a C++ implementation without heavy reliance on unsafe Rust (which defeats most of the purpose of choosing the language). In this offering, we **will not allow** Rust as a possible implementation language.
>
> There are other reasons as well not to choose Rust. Reach out to the instructors or TAs for more information on this decision.


[autograder]: {% link _pages/tutorials/autograder.md %}