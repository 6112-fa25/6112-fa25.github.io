---
title: Recitation 5
parent: Recitations
nav_order: 50
---

Today, we will cover writing a recursive interpreter in C++ for our toy lambda calculus.

{% include toc.html %}

## Announcements

Phase 2 is out, make sure to get an early start on it! Going forward, we will not reveal the number of hidden tests you have passed until the end of the phase. We want to better emulate a real world environment. In the real world, you would not know how correct your implementation is. This is also to encourage you to write a higher quantity and quality of tests.

Additional office hours! Ege, our learning assistant, will be holding office hours every Monday and Wednesday from 4-5pm. See the course calendar for more details.

## Syntax

Let's first recap the abstract syntax of our toy lambda calculus.

```ocaml
Terms           t ::= x | fun x -> t | t t | true | false | if t then t else t | n | t + t | t * t | let x = t in t
Naturals        n ::= Nat
Variables       x ::= String
```

## Semantics

Now let's define how our programs evaluate using a stack and heap. The notation \\(\langle S, H, t \rangle \Downarrow \langle S', H', v \rangle\\) means "with stack \\(S\\) and heap \\(H\\), term \\(t\\) evaluates to value \\(v\\), producing new stack \\(S'\\) and heap \\(H'\\)".

The stack \\(S\\) maps variables to heap addresses (which we say are natural numbers), \\(S : X \to \mathbb{N}\\).
The heap \\(H\\) maps addresses to values (\\(V\\)), \\(H : \mathbb{N} \to V\\).

\\[
\frac{}{\langle S, H, n \rangle \Downarrow \langle S, H, n \rangle} \quad \frac{}{\langle S, H, \text{true} \rangle \Downarrow \langle S, H, \text{true} \rangle} \quad \frac{}{\langle S, H, \text{false} \rangle \Downarrow \langle S, H, \text{false} \rangle}
\\]

<br>

\\[
\frac{S(x) = a \quad H(a) = v}{\langle S, H, x \rangle \Downarrow \langle S, H, v \rangle}
\\]

<br>

\\[
\frac{}{\langle S, H, \text{fun } x \to t \rangle \Downarrow \langle S, H, \langle \text{fun } x \to t, S \rangle \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, \langle \text{fun } x \to t, S_c \rangle \rangle \quad \langle S_1, H_1, t_2 \rangle \Downarrow \langle S_2, H_2, v_2 \rangle \quad a \notin \textsf{dom}(H_2) \quad \langle S_c[x \mapsto a], H_2[a \mapsto v_2], t \rangle \Downarrow \langle S_3, H_3, v \rangle}{\langle S, H, t_1 \, t_2 \rangle \Downarrow \langle S_3, H_3, v \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, \text{true} \rangle \quad \langle S_1, H_1, t_2 \rangle \Downarrow \langle S_2, H_2, v \rangle}{\langle S, H, \text{if } t_1 \text{ then } t_2 \text{ else } t_3 \rangle \Downarrow \langle S_2, H_2, v \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, \text{false} \rangle \quad \langle S_1, H_1, t_3 \rangle \Downarrow \langle S_2, H_2, v \rangle}{\langle S, H, \text{if } t_1 \text{ then } t_2 \text{ else } t_3 \rangle \Downarrow \langle S_2, H_2, v \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, n_1 \rangle \quad \langle S_1, H_1, t_2 \rangle \Downarrow \langle S_2, H_2, n_2 \rangle}{\langle S, H, t_1 + t_2 \rangle \Downarrow \langle S_2, H_2, n_1 + n_2 \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, n_1 \rangle \quad \langle S_1, H_1, t_2 \rangle \Downarrow \langle S_2, H_2, n_2 \rangle}{\langle S, H, t_1 \times t_2 \rangle \Downarrow \langle S_2, H_2, n_1 \times n_2 \rangle}
\\]

<br>

\\[
\frac{\langle S, H, t_1 \rangle \Downarrow \langle S_1, H_1, v_1 \rangle \quad a \notin \textsf{dom}(H_1) \quad \langle S[x \mapsto a], H_1[a \mapsto v_1], t_2 \rangle \Downarrow \langle S_2, H_2, v \rangle}{\langle S, H, \text{let } x = t_1 \text{ in } t_2 \rangle \Downarrow \langle S_2, H_2, v \rangle}
\\]

<br>

We will switch to [`6112-fa25/recitation5`](https://github.com/6112-fa25/recitation5) *(which will be uploaded after the recitation)* and continue live coding for the remainder of the recitation.

## Conclusion

Here are some C++ resources to explore on your own:
- [C++ Reference](https://en.cppreference.com/w/)
- [C++ Style Guide](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Learn C++](https://www.learncpp.com/)
