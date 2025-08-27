---
title: Autograder
parent: Tutorials
nav_order: 30
---

We use Gradescope's autograding system to build and run your submissions. The autograder will build all projects using gcc (**not clang**). You should assume much of the C++20 standard is supported by our grading infrastucture. We are using gcc version 13.1, for more information on which features are supported look at [C++ 20 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx20).

## Software configuration

The autograder is running Ubuntu 22.04, with the following software:
- openjdk: 11.0.28
- Python: 3.10.12
- gcc/g++: 13.1
- GNU Make: 4.3
- CMake: 3.22.1
- ANTLR4: 4.10.1

Please make sure your submission is compatible with these versions, and that all other dependencies are self-contained in the project. If you are planning to use a dependency not listed which cannot be installed via `apt` or `pip3` in `./build.sh`, please contact the course staff.

The grading server will have network access when running tests, so you can download and install packages while running `./build.sh`. However, please do this responsibly, and avoid using network access in `./run.sh`.

## Hardware configuration

The autograder will have at least one virtual CPU core and 1.5 GB of memory. Autograder runs will timeout automatically after 40 minutes.
