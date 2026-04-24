# Unit 2.5: Programming Languages and IDEs
## OCR J277 GCSE Computer Science -- Knowledge Base File

---

## Specification Requirements

### 2.5.1 Languages

**Students must know:**

**High-level languages:**
- Written in a form closer to human language and English
- Easier to read, write, and debug
- Portable -- can run on different hardware and operating systems with little or no modification
- Must be translated into machine code before the processor can execute it
- Examples: Python, Java, C#

**Low-level languages:**
- Written closer to machine code (binary) or as a direct one-to-one mapping to machine instructions (assembly language)
- Harder to read and write
- Directly controls hardware components and memory addresses
- Executes faster than high-level code
- Hardware-specific -- not portable between different processors
- Examples: machine code (binary 0s and 1s), assembly language

**The need for translators:**
- Processors can only execute machine code (binary)
- High-level code and assembly code must be translated before execution
- There are three types of translator: **compiler**, **interpreter**, and **assembler**

**Compiler:**
- Translates the entire source code into machine code in one process before execution
- Produces an executable file that can be distributed and run without the original translator or source code
- End users do not need access to the source code (protects intellectual property)
- Shows all errors at the end of compilation in an error report/file
- Compiled code runs faster (no need to translate at run time)
- Only needs to be translated once -- can be run multiple times without re-translating
- Can optimise the code during compilation

**Interpreter:**
- Translates and executes code one line at a time
- Stops when an error is found -- the programmer can identify and fix the error, then continue from that point
- Useful during development and debugging because errors are located precisely
- Does not produce a standalone executable file
- Requires the interpreter to be present every time the program runs
- Slower to execute than compiled code (re-translates each time)

**Key distinctions:**
- A compiler translates the whole program; an interpreter translates line by line.
- A compiler produces an executable file; an interpreter does not.
- A compiler shows all errors at the end; an interpreter stops at the first error.
- An interpreter is useful during development; a compiler is better for distribution.
- **Assembler:** NOT required for J277. Students do not need to know how assemblers work.

**Marking language:**
- Accept: "Machine code does not need to be translated/compiled/interpreted" as a reason to use low-level language
- Accept: "Direct control of hardware/memory" for low-level language advantage
- Accept: "Faster execution time" // "Code runs faster" for low-level language advantage -- must be qualified (faster than what), not just "faster" alone
- Accept: "Can produce an executable file" // "Can be run without the translator" for compiler advantage
- Accept: "End users do not need the translator" // "End users have no access to the source code" (in context of distribution) for compiler advantage
- Accept: "Shows all errors at the end" // "Produces an error report/file" for compiler advantage
- Accept: "Translates only once -- can run multiple times without re-translating" for compiler advantage
- Accept: "Stops at the first error -- useful for debugging" // "Can fix and continue from the error" for interpreter advantage
- Do not accept: "More efficient" // "Faster" alone -- must be expanded (faster execution, less memory, etc.)
- Do not accept: "End users have no access to source code" unless clearly in the context of distribution to end users
- Do not accept: Descriptions of how a compiler translates stated as a benefit (e.g. "translates the whole program at once") -- this describes a mechanism, not a benefit. Source: June 2024 J277/02 Q7(b) MS
- Do not accept: "The interpreter produces an executable file" -- it does not

**Not required:** Understanding of assemblers (listed as explicitly not required in spec v2.4); knowledge of specific compiler optimisation techniques; understanding of linking or loading

### 2.5.2 The Integrated Development Environment (IDE)

**Students must know:**
- An IDE is a software application that provides a set of tools to help programmers write, test, and debug programs
- **Four tools/facilities required:**

| IDE Tool | What it Does |
|----------|-------------|
| **Editor** | Where code is written; typically includes syntax highlighting (colour-coding keywords), auto-indentation, and auto-completion to help the programmer write code correctly |
| **Error diagnostics** | Detects and reports errors; may highlight syntax errors as the programmer types, show error messages indicating the type and location of the error, or underline problematic code |
| **Run-time environment** | Allows the programmer to execute the program within the IDE; provides a console for input and output during execution |
| **Translator** | The built-in compiler or interpreter that translates the code before or during execution |

**Key distinctions:**
- The **editor** is just one of four tools within the IDE -- the IDE itself is the complete application that contains all four.
- **Error diagnostics** is a specific facility. Saying "the IDE finds mistakes" is too vague -- examiners want to know what the tool specifically does (highlights errors, shows error messages, underlines problematic code).
- Students should have **practical experience** using an IDE -- exam questions may ask about specific features students have encountered (syntax highlighting, auto-completion, breakpoints).

**Marking language:**
- Accept: "Where code is written" // "Syntax highlighting" // "Auto-indentation" // "Auto-completion" for editor
- Accept: "Detects/highlights/reports errors" // "Shows error messages" // "Highlights syntax errors as the programmer types" for error diagnostics
- Accept: "Allows the programmer to run/execute the program within the IDE" for run-time environment
- Accept: "Translates the code" // "Built-in compiler or interpreter" for translator
- Do not accept: "The IDE is where you type code" -- this describes the editor, not the IDE itself
- Do not accept: Vague descriptions for error diagnostics (e.g. "it finds mistakes" without saying how)
- Do not accept: Assembler knowledge -- not required for J277

**Not required:** Knowledge of specific IDE applications beyond general familiarity; understanding of debugger breakpoints or watch windows (accepted if offered but not required)

---

## Examiner Intelligence

### Recurring Misconceptions (flagged in examiner reports 2022--2025)

1. **Describing differences rather than answering the specific question**
   - The most persistent issue: when asked for reasons to use low-level language, or benefits of a compiler, candidates give a general description of the difference between the concepts instead.
   - "A compiler translates the whole program" describes how a compiler works -- it does not answer "give a benefit of using a compiler."
   - Source: June 2024 J277/02 ER Q7(a) and Q7(b) -- "Where candidates left their response as simply a discussion of the difference between high-level and low-level code or between translators and compilers, it was difficult for examiners to award marks."

2. **"Faster" or "more efficient" without qualification**
   - Low-level code runs faster because it does not need to be translated and directly addresses hardware. Stating "faster" without this context is too vague.
   - A compiled program runs faster because translation has already occurred -- it does not need to re-translate on execution.
   - Source: June 2024 J277/02 ER Q7(a) -- "More efficient by itself is TV (too vague)"

3. **Stating the compiler translates line by line**
   - This describes the interpreter. The compiler translates the entire source code in one process.
   - Source: June 2024 J277/02 ER -- mark scheme guidance: "Do not allow descriptions of how a compiler translates (e.g. 'translates whole code in one go')" -- note: accepting "translates whole code" as a description of what compilers do is correct; what is not accepted is this stated as a benefit rather than a feature.

4. **Stating the interpreter produces an executable file**
   - The interpreter does not produce an executable file. This is a key benefit of the compiler that students frequently attribute to the wrong translator.
   - Source: General ER trend 2022--2025

5. **Confusing the IDE with the editor**
   - "The IDE is where you type code" -- this describes the editor, one tool inside the IDE. The IDE is the complete development environment containing all four tools.
   - Source: General ER trend 2022--2025

6. **"No access to source code" without the distribution context**
   - The benefit of compiling to an executable is that end users who receive the distributed program have no access to the source code. Stating "no access to source code" without this context is not credited.
   - Source: June 2024 J277/02 ER Q7(b) -- "Do not allow 'no access to source code' unless clearly talking about end user"

### Common Mark Losses

- Giving the difference between high-level and low-level when asked for a reason or benefit
- "More efficient" // "Faster" without explaining what is faster or why
- Stating the compiler translates line by line (this is the interpreter)
- Stating the interpreter produces an executable file (it does not)
- "No access to source code" without the context of distributing to end users
- Confusing the IDE with the editor (the editor is one tool inside the IDE)
- Describing error diagnostics vaguely ("finds mistakes") without saying how it does so
- Discussing assemblers in detail -- not required for J277

### Question Patterns (2022--2025)

| Year | Paper | Question | Topic Focus | Marks | Format |
|------|-------|----------|-------------|-------|--------|
| 2022 | J277/02 | Q1(b)(ii) | Gap-fill: high-level language, interpreter, compiler, executable | 5 | Gap-fill |
| 2024 | J277/02 | Q7(a) | State two reasons to use low-level language | 2 | State |
| 2024 | J277/02 | Q7(b) | State three benefits of using a compiler | 3 | State |
| 2025 | J277/02 | Q4(a) | IDE tool -- identify from description | 2 | Identify |
| 2025 | J277/02 | Q4(b) | Describe how an IDE tool helps the programmer | 2 | Describe |

**Key observations:**
- High-level vs low-level + translator questions appeared in 2022 (gap-fill) and 2024 (reasons/benefits) -- expect this topic to continue appearing
- Compiler benefits are a reliable multi-mark question; candidates who can give three distinct benefits (executable, no source code for end users, translates only once, shows all errors at end, optimises code) perform strongly
- IDE tools appeared explicitly in 2025 after being absent from 2022--2024 -- the topic is active and likely to recur
- The gap-fill format in 2022 tested precise language around translators; this format may reappear
- Candidates who have used an IDE practically consistently answer IDE questions more accurately

---

## Quick Reference

### High-Level vs Low-Level Languages

| Feature | High-Level | Low-Level |
|---------|-----------|-----------|
| Readability | Easier to read and write | Harder to read and write |
| Portability | Portable across hardware | Hardware-specific |
| Translation | Must be translated | Machine code needs no translation |
| Speed | Slower execution | Faster execution |
| Hardware control | Indirect | Direct |
| Examples | Python, Java, C# | Machine code, assembly language |

### Compiler vs Interpreter

| Feature | Compiler | Interpreter |
|---------|---------|------------|
| Translation | Whole program at once | Line by line |
| Executable file | Produces one | Does not produce one |
| Error reporting | All errors at end | Stops at first error |
| Best for | Distribution | Development/debugging |
| Speed | Faster to run | Slower to run |
| Re-translation | Not needed after compilation | Needed every run |

### IDE Tools at a Glance

| Tool | Purpose |
|------|---------|
| Editor | Write code; syntax highlighting; auto-indentation; auto-completion |
| Error diagnostics | Detects/highlights/reports errors; shows error messages |
| Run-time environment | Run/execute the program within the IDE |
| Translator | Built-in compiler or interpreter |

### Key Exam Language

**Say this:**
- "Direct control of hardware/memory" (reason for low-level)
- "Does not need to be translated -- faster execution" (low-level advantage)
- "Produces an executable file that can be distributed without the translator or source code" (compiler benefit)
- "End users have no access to the source code" (compiler benefit -- in context of distribution)
- "Shows all errors at the end in an error report" (compiler benefit)
- "Stops at the first error -- the programmer can fix it and continue" (interpreter advantage)
- "Translates only once -- can be run multiple times without re-translating" (compiler benefit)

**Not this:**
- "More efficient" // "Faster" alone -- must qualify what is faster and why
- "The compiler translates line by line" -- this is the interpreter
- "The interpreter produces an executable file" -- it does not
- "No access to source code" without the end user / distribution context
- "The IDE is where you type code" -- this describes the editor, not the IDE
