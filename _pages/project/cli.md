---
title: Command Line Reference
parent: Project
nav_order: 100
---

Your `run.sh` script should have the following command line interface. The autograder will not work properly if your binary does not accept this interface.

```
./run.sh [SUBCOMMAND] [input_file] [OPTIONS]

POSITIONALS:
  input_file TEXT             Path to input file, use '-' for stdin

OPTIONS:
  -h,     --help              Print this help message and exit
  -o,     --output TEXT       Path to output file, use '-' for stdout

SUBCOMMANDS:
  scan
  parse
  compile
  interpret
  vm
```

| **Subcommand**  | **Description**                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `scan`          | **Phase 1**. Runs the scanner subcommand, outputs list of tokens from input file.              |
| `parse`         | **Phase 1**. Runs the parser subcommand, pretty prints AST from input file.                    |
| `interpret`     | **Phase 2**. Runs the recursive interpreter on given input file.                               |
| `compile`       | **Phase 4**. Runs the bytecode compiler on given input file, outputs MITScript bytecode file.  |
| `vm`            | **Phase 4**. Runs the bytecode virtual machine on given bytecode file.                         |

The command line arguments you must implement are listed in table above. Exactly one filename should be provided for `[input_file]`, which must not begin with a dash.

Feel free to add extra arguments beyond the ones specified above. Any extra arguments should not interfere with the interface described above. The autograder will assume your project follows the interface above. For example, during the derby (phase 5), you may find it useful to implement a `-O,--opt` flag which controls which set of optimizations are enabled.

For the provided skeleton, we have provided code which is sufficient to implement this interface. The TAs will not use any extra features you add for grading. However, you can tell us which, if any, to use for the derby.