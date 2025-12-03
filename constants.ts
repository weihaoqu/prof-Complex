export const PDF_CONTENT = `
==Start of OCR for page 1==
1
Intractable Problems
Time-Bounded Turing Machines
Classes 
P and NP
Polynomial-Time Reductions
==End of OCR for page 1==
==Start of OCR for page 2==
2
Time-Bounded TM’s
A Turing machine that, given an input 
of length n, always halts within T(n) 
moves is said to be T(n)-time bounded.
 The TM can be multitape.
 Sometimes, it can be nondeterministic.
The deterministic, multitape case 
corresponds roughly to “an O(T(n)) 
running-time algorithm.”
==End of OCR for page 2==
==Start of OCR for page 3==
3
The class P
If a DTM M is T(n)-time bounded for 
some polynomial T(n), then we say M is 
polynomial-time (“polytime ”) bounded.
And L(M) is said to be in the class P.
Important point: when we talk of P, it 
doesn’t matter whether we mean “by a 
computer” or “by a TM” (next slide).
==End of OCR for page 3==
==Start of OCR for page 4==
4
Polynomial Equivalence of 
Computers and TM’s
A multitape TM can simulate a 
computer that runs for time O(T(n)) in 
at most O(T
2(n)) of its own steps.
If T(n) is a polynomial, so is T
2(n).
==End of OCR for page 4==
==Start of OCR for page 5==
5
Examples of Problems in P
Is w in L(G), for a given CFG G?
 Input = w.
 Use CYK algorithm, which is O(n3).
Is there a path from node x to node y in 
graph G?
 Input = x, y, and G.
 Use Dijkstra’s algorithm, which is O(n log n) 
on a graph of n nodes and arcs.
==End of OCR for page 5==
==Start of OCR for page 6==
6
Running Times Between 
Polynomials
You might worry that something like 
O(n log n) is not a polynomial.
However, to be in 
P, a problem only 
needs an algorithm that runs in time 
less than some polynomial.
Surely O(n log n) is less than the 
polynomial O(n
2).
==End of OCR for page 6==
==Start of OCR for page 7==
7
A Tricky Case: Knapsack
The Knapsack Problem is: given positive 
integers i1, i2 ,…, in, can we divide them 
into two sets with equal sums?
Perhaps we can solve this problem in 
polytime by a dynamic-programming 
algorithm:
 Maintain a table of all the differences we can 
achieve by partitioning the first j integers.
==End of OCR for page 7==
==Start of OCR for page 8==
8
Knapsack – (2)
Basis: j = 0. Initially, the table has 
“true” for 0 and “false” for all other 
differences.
Induction: To consider i
j, start with a 
new table, initially all false.
Then, set k to true if, in the old table, 
there is a value m that was true, and k 
is either m+i
j or m-i
j
.
==End of OCR for page 8==
==Start of OCR for page 9==
9
Knapsack – (3)
Suppose we measure running time in 
terms of the sum of the integers, say m.
Each table needs only space O(m) to 
represent all the positive and negative 
differences we could achieve.
Each table can be constructed in time 
O(n).
==End of OCR for page 9==
==Start of OCR for page 10==
10
Knapsack – (4)
Since n < m, we can build the final 
table in O(m
2) time.
From that table, we can see if 0 is 
achievable and solve the problem.
==End of OCR for page 10==
==Start of OCR for page 11==
11
Subtlety: Measuring Input Size
“Input size” has a specific meaning: the 
length of the representation of the 
problem instance as it is input to a TM.
For the Knapsack Problem, you cannot 
always write the input in a number of 
characters that is polynomial in either 
the number-of or sum-of the integers.
==End of OCR for page 11==
==Start of OCR for page 12==
12
Knapsack – Bad Case
Suppose we have n integers, each of 
which is around 2
n.
We can write integers in binary, so the 
input takes O(n
2) space to write down.
But the tables require space O(n2
n).
They therefore require at least that 
order of time to construct.
==End of OCR for page 12==
==Start of OCR for page 13==
13
Bad Case – (2)
Thus, the proposed “polynomial” 
algorithm actually takes time O(n
2
2
n) on 
an input of length O(n
2).
Or, since we like to use n as the input 
size, it takes time O(n2sqrt(n)) on an 
input of length n.
In fact, it appears no algorithm solves 
Knapsack in polynomial time.
==End of OCR for page 13==
==Start of OCR for page 14==
14
Redefining Knapsack
We are free to describe another 
problem, call it Pseudo-Knapsack, 
where integers are represented in 
unary.
Pseudo-Knapsack is in 
P.
==End of OCR for page 14==
==Start of OCR for page 15==
15
The Class NP
The running time of a nondeterministic 
TM is the maximum number of steps 
taken along any branch.
If that time bound is polynomial, the 
NTM is said to be polynomial-time 
bounded.
And its language/problem is said to be 
in the class NP.
==End of OCR for page 15==
==Start of OCR for page 16==
16
Example: NP
The Knapsack Problem is definitely in 
NP, even using the conventional binary 
representation of integers.
Use nondeterminism to guess one of 
the subsets.
Sum the two subsets and compare.
==End of OCR for page 16==
==Start of OCR for page 17==
17
P Versus NP
Originally a curiosity of Computer 
Science, mathematicians now recognize 
as one of the most important open 
problems the question P = NP?
There are thousands of problems that 
are in NP but appear not to be in P.
But no proof that they aren’t really in P.
==End of OCR for page 17==
==Start of OCR for page 18==
18
Complete Problems
One way to address the 
P = NP
question is to identify complete 
problems for NP.
An NP-complete problem has the 
property that if it is in 
P, then every 
problem in NP is also in 
P.
Defined formally via “polytime 
reductions.”
==End of OCR for page 18==
==Start of OCR for page 19==
19
Complete Problems – Intuition
A complete problem for a class 
embodies every problem in the class, 
even if it does not appear so.
Compare: PCP embodies every TM 
computation, even though it does not 
appear to do so.
Strange but true: Knapsack embodies 
every polytime NTM computation.
==End of OCR for page 19==
==Start of OCR for page 20==
20
Polytime Reductions
Goal: find a way to show problem 
L to 
be NP-complete by reducing every 
language/problem in NP to 
L in such a 
way that if we had a deterministic 
polytime algorithm for 
L, then we could 
construct a deterministic polytime 
algorithm for any problem in NP.
==End of OCR for page 20==
==Start of OCR for page 21==
21
Polytime Reductions – (2)
 We need the notion of a polytime 
transducer – a TM that:
1. Takes an input of length n.
2. Operates deterministically for some 
polynomial time p(n).
3. Produces an output on a separate output 
tape.
 Note: output length is at most p(n).
==End of OCR for page 21==
==Start of OCR for page 22==
22
Polytime Transducer
state
input
n
scratch
tapes
output
< p(n)
Remember: important requirement
is that time
< p(n).
==End of OCR for page 22==
==Start of OCR for page 23==
23
Polytime Reductions – (3)
Let L and M be langauges.
Say L is polytime reducible to M if 
there is a polytime transducer T such 
that for every input w to T, the output 
x = T(w) is in M if and only if w is in L.
==End of OCR for page 23==
==Start of OCR for page 24==
24
Picture of Polytime Reduction
T
in L
not
in L
in M
not in M
==End of OCR for page 24==
==Start of OCR for page 25==
25
NP-Complete Problems
A problem/language M is said to be NP complete if for every language L in NP, 
there is a polytime reduction from L to M.
Fundamental property: if M has a 
polytime algorithm, then L also has a 
polytime algorithm.
 I.e., if M is in 
P, then every L in NP is also in 
P, or “
P = NP.”
==End of OCR for page 25==
==Start of OCR for page 26==
26
The Plan
NP
SAT
All of NP polytime
reduces to SAT, which
is therefore NP-complete
3-
SAT
SAT polytime
reduces to
3-SAT
3-SAT polytime reduces
to many other problems;
they’re all NP-complete
==End of OCR for page 26==
==Start of OCR for page 27==
27
Proof That Polytime 
Reductions “Work”
Suppose M has an algorithm of 
polynomial time q(n).
Let L have a polytime transducer T to 
M, taking polynomial time p(n).
The output of T, given an input of 
length n, is at most of length p(n).
The algorithm for M on the output of T 
takes time at most q(p(n)).
==End of OCR for page 27==
==Start of OCR for page 28==
28
Proof – (2)
 We now have a polytime algorithm for L:
1. Given w of length n, use T to produce x of 
length < p(n), taking time < p(n).
2. Use the algorithm for M to tell if x is in M in 
time < q(p(n)).
3. Answer for w is whatever the answer for x 
is.
 Total time < p(n) + q(p(n)) = a 
polynomial.
==End of OCR for page 28==
==Start of OCR for page 1==
1
The Satisfiability Problem
Cook’s Theorem: An NP-Complete 
Problem
Restricted SAT: CSAT, 3SAT
==End of OCR for page 1==
==Start of OCR for page 2==
2
Boolean Expressions
Boolean, or propositional-logic 
expressions are built from variables and 
constants using the operators AND, OR, 
and NOT.
 Constants are true and false, represented 
by 1 and 0, respectively.
 We’ll use concatenation (juxtaposition) for 
AND, + for OR, - for NOT, unlike the text.
==End of OCR for page 2==
==Start of OCR for page 3==
3
Example: Boolean expression
(x+y)(-x + -y) is true only when 
variables x and y have opposite truth 
values.
Note: parentheses can be used at will, 
and are needed to modify the 
precedence order NOT (highest), AND, 
OR.
==End of OCR for page 3==
==Start of OCR for page 4==
4
The Satisfiability Problem (SAT
)
Study of boolean functions generally is 
concerned with the set of truth 
assignments (assignments of 0 or 1 to 
each of the variables) that make the 
function true.
NP-completeness needs only a simpler 
question (SAT): does there exist a truth 
assignment making the function true?
==End of OCR for page 4==
==Start of OCR for page 5==
5
Example: SAT
 (x+y)(-x + -y) is satisfiable.
 There are, in fact, two satisfying truth 
assignments:
1. x=0; y=1.
2. x=1; y=0.
 x(-x) is not satisfiable.
==End of OCR for page 5==
==Start of OCR for page 6==
6
SAT as a Language/Problem
An instance of SAT is a boolean
function.
Must be coded in a finite alphabet.
Use special symbols (, ), +, - as 
themselves.
Represent the i-th variable by symbol x 
followed by integer i in binary.
==End of OCR for page 6==
==Start of OCR for page 7==
7
Example: Encoding for SAT
(x+y)(-x + -y) would be encoded by 
the string (x1+x10)(-x1+-x10)
==End of OCR for page 7==
==Start of OCR for page 8==
8
SAT is in NP
There is a multitape NTM that can decide if a 
Boolean formula of length n is satisfiable.
The NTM takes O(n2) time along any path.
Use nondeterminism to guess a truth 
assignment on a second tape.
Replace all variables by guessed truth values.
Evaluate the formula for this assignment.
Accept if true.
==End of OCR for page 8==
==Start of OCR for page 9==
9
Cook’s Theorem
SAT is NP-complete.
 Really a stronger result: formulas may be 
in conjunctive normal form (CSAT) – later.
To prove, we must show how to 
construct a polytime reduction from 
each language L in NP to SAT.
Start by assuming the most resticted 
possible form of NTM for L (next slide).
==End of OCR for page 9==
==Start of OCR for page 10==
10
Assumptions About NTM for L
1. One tape only.
2. Head never moves left of the initial 
position.
3. States and tape symbols are disjoint.
 Key Points: States can be named 
arbitrarily, and the constructions 
many-tapes-to-one and two-way infinite-tape-to-one at most square 
the time.
==End of OCR for page 10==
==Start of OCR for page 11==
11
More About the NTM M for L
Let p(n) be a polynomial time bound 
for M.
Let w be an input of length n to M.
If M accepts w, it does so through a 
sequence I
0
⊦
I
1
⊦
…
⊦
Ip(n) of p(n)+1 ID’s.
 Assume trivial move from a final state.
Each ID is of length at most p(n)+1, 
counting the state.
==End of OCR for page 11==
==Start of OCR for page 12==
12
From ID Sequences to 
Boolean Functions
The Boolean function that the 
transducer for L will construct from w 
will have (p(n)+1)
2
“variables.”
Let variable Xij represent the j-th 
position of the i-th ID in the accepting 
sequence for w, if there is one.
 i and j each range from 0 to p(n).
==End of OCR for page 12==
==Start of OCR for page 13==
13
Picture of Computation as an Array
Initial ID
X00
X01 … X0p(n)
I
1
X10
X11 … X1p(n)
Ip(n)
Xp(n)0
Xp(n)1 … Xp(n)p(n)
.
.
.
.
.
.
==End of OCR for page 13==
==Start of OCR for page 14==
14
Intuition
From M and w we construct a boolean 
formula that forces the X’s to represent 
one of the possible ID sequences of 
NTM M with input w, if it is to be 
satisfiable.
It is satisfiable iff some sequence leads 
to acceptance.
==End of OCR for page 14==
==Start of OCR for page 15==
15
From ID’s to Boolean Variables
The Xij’s are not boolean variables; they 
are states and tape symbols of M.
However, we can represent the value 
of each Xij by a family of Boolean 
variables yijA, for each possible state or 
tape symbol A.

yijA is true if and only if Xij = A.
==End of OCR for page 15==
==Start of OCR for page 16==
16
Points to Remember
1. The boolean function has components that 
depend on n.
 These must be of size polynomial in n.
2. Other pieces depend only on M.
 No matter how many states/symbols m has, 
these are of constant size.
3. Any logical formula about a set of 
variables whose size is independent of n 
can be written somehow.
==End of OCR for page 16==
==Start of OCR for page 17==
17
Designing the Function
 We want the Boolean function that 
describes the Xij’s to be satisfiable if 
and only if the NTM M accepts w.
 Four conditions:
1. Unique: only one symbol per position.
2. Starts right: initial ID is q
0w.
3. Moves right: each ID follows from the 
next by a move of M.
4. Finishes right: M accepts.
==End of OCR for page 17==
==Start of OCR for page 18==
18
Unique
Take the AND over all i, j, Y, and Z of 
(-yijY+ -yijZ).
That is, it is not possible for Xij to be 
both symbols Y and Z.
==End of OCR for page 18==
==Start of OCR for page 19==
19
Starts Right
 The Boolean Function needs to assert 
that the first ID is the correct one with 
w = a1…an as input.
1. X00 = q0.
2. X0i = ai for i = 1,…, n.
3. X0i = B (blank) for i = n+1,…, p(n).
 Formula is the AND of y0iZ for all i, 
where Z is the symbol in position i.
==End of OCR for page 19==
==Start of OCR for page 20==
20
Finishes Right
Somewhere, there must be an 
accepting state.
Form the OR of Boolean variables yijq, 
where i and j are arbitrary and q is an 
accepting state.
Note: differs from text.
==End of OCR for page 20==
==Start of OCR for page 21==
21
Running Time So Far
Unique requires O(p
2(n)) symbols be 
written.
 Parentheses, signs, propositional variables.
Algorithm is easy, so it takes no more 
time than O(p
2(n)).
Starts Right takes O(p(n)) time.
Finishes Right takes O(p
2(n)) time.
Variation
over i and j
Variation over symbols Y
and Z is independent of n,
so covered by constant.
==End of OCR for page 21==
==Start of OCR for page 22==
22
Running Time – (2)
Caveat: Technically, the propositions 
that are output of the transducer must 
be coded in a fixed alphabet, e.g., 
x10011 rather than yijA.
Thus, the time and output length have 
an additional factor O(log n) because 
there are O(p
2(n)) variables.
But log factors do not affect polynomials
==End of OCR for page 22==
==Start of OCR for page 23==
23
Moves Right
Xij = Xi-1,j whenever the state is none of 
Xi-1,j-1, Xi-1,j, or Xi-1,j+1.
For each i and j, construct a formula 
that says (in propositional variables) the 
OR of “Xij = Xi-1,j” and all yi-1,k,A where A 
is a state symbol (k = i-1, i, or i+1).
 Note: Xij = Xi-1,j is the OR of yijA.yi-1,jA for all 
symbols A.
Works because
Unique assures
only one yijX true.
==End of OCR for page 23==
==Start of OCR for page 24==
24
Constraining the Next Symbol
… A B C …
B
Easy case;
must be B
… A q C …
? ? ?
Hard case; all
three may depend
on the move of M
==End of OCR for page 24==
==Start of OCR for page 25==
25
Moves Right – (2)
 In the case where the state is nearby, 
we need to write an expression that:
1. Picks one of the possible moves of the 
NTM M.
2. Enforces the condition that when Xi-1,j is 
the state, the values of Xi,j-1, Xi,j, and 
Xi,j+1. are related to Xi-1,j-1, Xi-1,j, and 
Xi-1,j+1 in a way that reflects the move.
==End of OCR for page 25==
==Start of OCR for page 26==
26
Example: Moves Right
Suppose δ(q, A) contains (p, B, L).
Then one option for any i, j, and C is:
C q A
p C B
If δ(q, A) contains (p, B, R), then an
option for any i, j, and C is:
C q A
C B p
==End of OCR for page 26==
==Start of OCR for page 27==
27
Moves Right – (3)
For each possible move, express the 
constraints on the six X’s by a Boolean 
formula.
For each i and j, take the OR over all 
possible moves.
Take the AND over all i and j.
Small point: for edges (e.g., state at 0), 
assume invisible symbols are blank.
==End of OCR for page 27==
==Start of OCR for page 28==
28
Running Time
We have to generate O(p
2(n)) Boolean 
formulas, but each is constructed from 
the moves of the NTM M, which is fixed 
in size, independent of the input w.
Takes time O(p
2(n)) and generates an 
output of that length.
 Times log n, because variables must be 
coded in a fixed alphabet.
==End of OCR for page 28==
==Start of OCR for page 29==
29
Cook’s Theorem – Finale
In time O(p
2(n) log n) the transducer 
produces a boolean formula, the AND of 
the four components: Unique, Starts, 
Finishes, and Moves Right.
If M accepts w, the ID sequence gives 
us a satisfying truth assignment.
If satisfiable, the truth values tell us an 
accepting computation of M. 
==End of OCR for page 29==
==Start of OCR for page 30==
30
Picture So Far
We have one NP-complete problem: SAT.
In the future, we shall do polytime 
reductions of SAT to other problems, 
thereby showing them NP-complete.
Why? If we polytime reduce SAT to X, 
and X is in 
P, then so is SAT, and 
therefore so is all of NP.
==End of OCR for page 30==
==Start of OCR for page 31==
31
Conjunctive Normal Form
A Boolean formula is in Conjunctive 
Normal Form (CNF) if it is the AND of 
clauses.
Each clause is the OR of literals.
A literal is either a variable or the 
negation of a variable.
Problem CSAT : is a Boolean formula in 
CNF satisfiable?
==End of OCR for page 31==
==Start of OCR for page 32==
32
Example: CNF
(x + -y + z)(-x)(-w + -x + y + z) (…
==End of OCR for page 32==
==Start of OCR for page 33==
33
NP-Completeness of CSAT
The proof of Cook’s theorem can be 
modified to produce a formula in CNF.
Unique is already the AND of clauses.
Starts Right is the AND of clauses, each 
with one variable.
Finishes Right is the OR of variables, 
i.e., a single clause.
==End of OCR for page 33==
==Start of OCR for page 34==
34
NP-Completeness of CSAT – (2)
Only Moves Right is a problem, and not 
much of a problem.
It is the product of formulas for each i 
and j.
Those formulas are fixed, independent 
of n.
==End of OCR for page 34==
==Start of OCR for page 35==
35
NP-Completeness of CSAT – (3)
You can convert any formula to CNF.
It may exponentiate the size of the 
formula and therefore take time to 
write down that is exponential in the 
size of the original formula, but these 
numbers are all fixed for a given NTM M 
and independent of n.
==End of OCR for page 35==
==Start of OCR for page 36==
36
k-SAT
If a boolean formula is in CNF and 
every clause consists of exactly k 
literals, we say the boolean formula is 
an instance of k-SAT.
 Say the formula is in k-CNF.
Example: 3-SAT formula
(x + y + z)(x + -y + z)(x + y + -z)(x + -y + -z)
==End of OCR for page 36==
==Start of OCR for page 37==
37
k-SAT Facts
Every boolean formula has an 
equivalent CNF formula.
 But the size of the CNF formula may be 
exponential in the size of the original.
Not every boolean formula has a k-SAT 
equivalent.
2SAT is in P; 3SAT is NP-complete.
==End of OCR for page 37==
==Start of OCR for page 38==
38
Proof: 2SAT is in P (Sketch)
Pick an assignment for some variable, 
say x = true.
Any clause with –x forces the other 
literal to be true.
 Example: (-x + -y) forces y to be false.
Keep seeing what other truth values 
are forced by variables with known 
truth values.
==End of OCR for page 38==
==Start of OCR for page 39==
39
Proof – (2)
 One of three things can happen:
1. You reach a contradiction (e.g., z is 
forced to be both true and false).
2. You reach a point where no more 
variables have their truth value forced, 
but some clauses are not yet made true.
3. You reach a satisfying truth assignment.
==End of OCR for page 39==
==Start of OCR for page 40==
40
Proof – (3)
Case 1: (Contradiction) There can only 
be a satisfying assignment if you use 
the other truth value for x.
 Simplify the formula by replacing x by this 
truth value and repeat the process.
Case 3: You found a satisfying 
assignment, so answer “yes.”
==End of OCR for page 40==
==Start of OCR for page 41==
41
Proof – (4)
Case 2: (You force values for some 
variables, but other variables and 
clauses are not affected).
 Adopt these truth values, eliminate the 
clauses that they satisfy, and repeat.
In Cases 1 and 2 you have spent O(n2) 
time and have reduced the length of 
the formula by > 1, so O(n3) total.
==End of OCR for page 41==
==Start of OCR for page 42==
42
3SAT
This problem is NP-complete.
Clearly it is in NP, since SAT is.
It is not true that every Boolean 
formula can be converted to an 
equivalent 3-CNF formula, even if we 
exponentiate the size of the formula.
==End of OCR for page 42==
==Start of OCR for page 43==
43
3SAT – (2)
But we don’t need equivalence.
We need to reduce every CNF formula 
F to some 3-CNF formula that is 
satisfiable if and only if F is.
Reduction involves introducing new 
variables into long clauses, so we can 
split them apart.
==End of OCR for page 43==
==Start of OCR for page 44==
44
Reduction of CSAT to 3SAT
Let (x
1+…+x
n) be a clause in some 
CSAT instance, with n > 4.
 Note: the x’s are literals, not variables; any 
of them could be negated variables.
Introduce new variables y
1,…,yn-3 that 
appear in no other clause.
==End of OCR for page 44==
==Start of OCR for page 45==
45
CSAT to 3SAT – (2)
Replace (x
1+…+x
n) by 
(x
1+x
2+y
1)(x
3+y
2+ -y
1) … (xi+yi-1+ -yi-2) 
… (xn-2+yn-3+ -yn-4)(xn-1+x
n+ -yn-3
)
If there is a satisfying assignment of 
the x’s for the CSAT instance, then one 
of the literals xi must be made true.
Assign yj = true if j < i-1 and yj = false 
for larger j.
==End of OCR for page 45==
==Start of OCR for page 46==
46
CSAT to 3SAT – (3)
We are not done.
We also need to show that if the 
resulting 3SAT instance is satisfiable, 
then the original CSAT instance was 
satisfiable.
==End of OCR for page 46==
==Start of OCR for page 47==
47
CSAT to 3SAT – (4)
Suppose (x
1+x
2+y
1)(x
3+y
2+ -y
1) … 
(xn-2+yn-3+ -yn-4)(xn-1+x
n+ -yn-3
)
is satisfiable, but none of the x’s is true.
The first clause forces y
1 = true.
Then the second clause forces y
2 = true.
And so on … all the y’s must be true.
But then the last clause is false.
==End of OCR for page 47==
==Start of OCR for page 48==
48
CSAT to 3SAT – (5)
There is a little more to the reduction, 
for handling clauses of 1 or 2 literals.
Replace (x) by (x+y
1+y
2) (x+y
1+ -y
2) 
(x+ -y
1+y
2) (x+ -y
1+ -y
2).
Replace (w+x) by (w+x+y)(w+x+ -y).
Remember: the y’s are different 
variables for each CNF clause.
==End of OCR for page 48==
==Start of OCR for page 49==
49
CSAT to 3SAT Running Time
This reduction is surely polynomial.
In fact it is linear in the length of the 
CSAT instance.
Thus, we have polytime-reduced CSAT 
to 3SAT.
Since CSAT is NP-complete, so is 3SAT.
==End of OCR for page 49==
`;