---
title: Syllabus
layout: home
nav_order: 10
---

# Dynamic Computer Language Engineering (6.112)

> **Prereq:** [6.1020<sub>\[6.031\]</sub>][031] or [6.1910<sub>\[6.004\]</sub>][004] \\
> **Units:** 4-4-4 \\
> **Lecture:** _MWF1_ ([56-114][bldg56]) Recitation: _TR1_ ([36-155][bldg56])
>
> Studies the design and implementation of modern, dynamic programming languages. Topics include fundamental approaches for parsing, semantics and interpretation, virtual machines, garbage collection, just-in-time machine code generation, and optimization. Includes a semester-long, group project that delivers a virtual machine that spans all of these topics.

## Staff

#### Lecturers
[Michael Carbin](https://people.csail.mit.edu/mcarbin/) (<mcarbin@mit.edu>)

#### Teaching Assistants
Kosi Nwabueze (<kosinw@mit.edu>)

Please contact the course staff by posting on [Piazza][piazza] or emailing <6.112-staff@mit.edu>.


## Communication

- We will distribute assignments here and make all announcements via [Piazza][piazza]. Important announcements will also be made via email.
  - Office hours details will be announced on [Piazza][piazza].
  - Since lecture dates are not all finalized at the start of the semester, please check the [schedule][schedule] regularly.
- For all general questions and/or concerns, please post publicly on [Piazza][piazza]. If the matter is private, please post privately on [Piazza][piazza] or email the course staff at <6.112-staff@mit.edu>.
- Surveys and miniquizzes need to be completed via [Gradescope][gradescope]. The join code is __<u>5RWB6V</u>__.

## Recommended Texts

6.112 has no officially required textbook.

We can point you to many resources such as well-known textbooks, technical papers, interesting and useful blog posts, and reference guides. These are available on the [Resources][resources] page.

## Project

The main component of this course (95% of the grade) is a project where you will build a language implementation almost entirely from scratch. The first two phases (which cover parsing, lexing, and interpretation) of the project will be done individually, and the rest of the project will be done in groups of three.
Details about the project can be found on the [project overview][project] page. Specific instructions for each phase of the project will be released later in the class.

## Class

Nominally, class meetings are one hour long and take place at the following times:

- At 1 p.m. on Mondays, Wednesdays, and Fridays in **<u>56-114</u>**.
- At 1 p.m. on Tuesdays and Thursdays in **<u>36-155</u>**.

_Lectures_ will cover the fundamental concepts and structures of dynamic programming languages. _Recitations_ will focus more on the project and tutorial content. (Please *disregard* the listing of "lectures" versus "recitations" on Hydrant/course registrar.)

 __Please check the [schedule][schedule] regularly.__ Lecture dates are not all finalized at the start of the semester. Some lectures may be canceled or moved depending on the class's comfort and progress on the projects.

There will be weeks that have few or no lectures, especially as we draw closer to project deadlines. This year, we are projecting roughly 8 weeks of lectures in total. We will also announce urgent changes on [Piazza][piazza].

#### Missed Classes

If you have taken [6.110](https://6110-sp25.github.io), you may be familiar with the re-lecture videos which are video recordings of lecture content. 6.112 will not have any re-lectures for this offering. Lecture slides and recitation materials will still be available on this website; however, you are personally responsible for catching up on any missed content on your own.

## Participation

In an effort to ensure your project stays on track, you will be asked to periodically submit a survey on [Gradescope][gradescope]. We will also provide a "mini-quiz" graded for completion only. These mini-quizzes are typically assigned after each lecture and due by the end of the following lecture. They are useful for checking your understanding of the lecture material and also serve as good preparation material for the quiz.

<!-- ### Quiz

Two quizzes, each worth 10%, will be held during class time on **March 14th** and **May 2nd**.
More information about quizzes, including practice material, will be released closer to the quiz dates.
If you have a conflict with the quiz dates, please let the course staff know as early as possible. -->

## Grading

Your grade is based upon two components: your virtual machine (95%) and mini-quizzes/surveys/class participation (5%). We anticipate that, if you complete the project satisfactorily, you will receive an A in the class.

| Component                                                    | Weight |
| ------------------------------------------------------------ | ------ |
| Project phase 1 (lexing and parsing)                         | 5%     |
| Project phase 2 (interpretation)                             | 20%    |
| Project phase 3 (memory management)                          | 15%    |
| Project phase 4 (virtual machine)                            | 20%    |
| Project phase 5 (derby)                                      | 35%    |
| Participation (surveys, miniquizzes)                         | 5%     |

## Late Policy

We will accept late final submissions for any reason up to 72 hours after the deadline. 10% will be deducted for a submission that's up to 24 hours late, 20% will be deducted for a submission that's up to 48 hours late, and 30% will be deducted for a submission that's up to 72 hours late. Late submissions will not be accepted for extra credit checkpoints but only for the final submission of each phase (i.e., the submission that's due at the final deadline).

If you have additional extenuating circumstances, we can grant additional extensions (without penalty) as long as we get a note from [Student Support Services (S<sup>3</sup>)][s3].

## Collaboration Policy

While you may discuss the high-level approaches to the project with anybody, you must develop your code within your team (or by yourself for [phase 1][phase_1] and [phase 2][phase_2] of the project). In particular:
- You _are allowed_ to use reference material available online, as well as resources and existing libraries, as long as you cite them in your project reports, and they don't trivialize the project. (Please use your best judgment here, and ask the course staff if you are unsure.) If you decide to use larger code snippets, please also explain how you adapted and used them in your project report.
- You _are allowed_ to use LLM-generated code. Make sure to read [the LLM policy](#llm-policy) below.
- You _may not_ share any code with other teams.
- You _may not_ post your project code on publicly accessible websites or file spaces, including public GitHub repositories.

## LLM Policy

We encourage you to try to use LLM-generated code in your project. Your use of LLM generated code will have no effect, either positive or negative, on your grade. To cite one extreme example, if you type "Can you please generate a virtual machine for the MITScript programming language" into the prompt box of an LLM and get a full virtual machine back (we have tried this and it does not seem to work), you will get full credit if the virtual machine satisfies the course requirements.

If you decide to use LLM-generated code, you should explain your general approach to using LLMs in your project report.
We also ask that all teams document their use of LLM generated code via a LLM code usage survey turned in with the project reports. This survey will be made available on Gradescope.
One easy way to record your interactions with LLMs is, for example, the "Share link to Chat" feature that ChatGPT provides.


[004]: https://student.mit.edu/catalog/m6a.html#6.1910
[031]: https://student.mit.edu/catalog/m6a.html#6.1020
[bldg26]: http://whereis.mit.edu/map-jpg?mapterms=26
[bldg32]: http://whereis.mit.edu/map-jpg?mapterms=32
[bldg56]: http://whereis.mit.edu/map-jpg?mapterms=56
[bldg36]: http://whereis.mit.edu/map-jpg?mapterms=36
[catalog]: https://student.mit.edu/catalog/m6a.html#6.1120
[github]: https://github.com/6112-fa25/
[gradescope]: https://www.gradescope.com/courses/1099582
[piazza]: https://piazza.com/mit/spring2025/6110/home
[s3]: https://studentlife.mit.edu/s3
[phase_1]: {% link _pages/project/phase_1.md %}
[phase_2]: {% link _pages/project/phase_2.md %}
[miniquizzes]: {% link _pages/miniquizzes.md %}
[resources]: {% link _pages/resources.md %}
[schedule]: {% link _pages/schedule.md %}
[project]: {% link _pages/project.md %}
