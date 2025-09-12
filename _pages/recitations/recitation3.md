---
title: Recitation 3
parent: Recitations
nav_order: 30
---

Today, we will cover writing a lexer/parser in C++ for a toy language.

{% include toc.html %}

## Intro to C++ (Part 3)

Let's first cover the grammar of our toy language. Our toy langauge will be an untyped lambda calculus variant. The abstract syntax of the langauge looks as follows:

```ocaml
Terms           t ::= x | fun x -> t | t t | true | false | if t then t else t | n | t + t | t * t | let x = t in t
Naturals        n ::= Nat
Variables       x ::= String
```

First, we will rewrite our grammar to be unambiguous. This should always be the first step because it makes writing the recursive descent parser a mechanical translation.

```antlr4
term
    :
    | 'fun' IDENTIIFER '->' term
    | 'if' term 'then' term 'else' term
    | 'let' IDENTIFIER '=' term 'in' term
    | add_term
    ;

add_term
    : mul_term ('+' mul_term)*
    ;

mul_term
    : application ('*' application)*
    ;

application:
    : atom atom*
    ;

atom
    : '(' term ')'
    | 'true'
    | 'false'
    | NATURAL
    | variable
    ;

variable: IDENTIFIER
```

For example, here is a program that adds 5 and 7 in our toy language:

```ocaml
let add = fun x -> fun y -> x + y in add 5 7
```

First, let's start with the build file for our project. Since we covered Makefiles in the previous recitation, we won't go over the details of the Makefile here. The Makefile is as follows:

```
SRCS := $(shell find . -name "*.cpp")
OBJS := $(SRCS:%.cpp=%.o)

parser: $(OBJS)
	g++ -g -std=c++20 -o parser $^

clean:
	rm -rf parser *.o

%.o: %.cpp
	g++ -g -std=c++20 -c $< -o $@
```

For our `main.cpp` file, we will start with this boilerplate which just reads in the file contents from `argv[1]` and prints it to stdout.

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main(int argc, char **argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <filename>" << std::endl;
        return 1;
    }

    std::string filename = argv[1];
    std::ifstream file(filename);
    std::string contents = std::string(std::istreambuf_iterator<char>(file), std::istreambuf_iterator<char>());
    std::cout << contents << std::endl;
    return 0;
}
```

We will switch to [`6112-fa25/recitation3`](https://github.com/6112-fa25/recitation3) *(which will be uploaded after the recitation)* and continue live coding for the remainder of the recitation.

## Conclusion
For more examples on Phase 1, check out the [skeleton-fa23](https://github.com/6112-fa25/skeleton-fa23) repo which has some examples of parse trees with raw pointers and unique pointers.

Here are some C++ resources to explore on your own:
- [C++ Reference](https://en.cppreference.com/w/)
- [C++ Style Guide](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Learn C++](https://www.learncpp.com/)
