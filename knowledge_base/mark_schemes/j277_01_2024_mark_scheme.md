# J277/01 Computer Systems — 2024 Mark Scheme

## General Marking Instructions

- Each mark point is worth 1 mark unless stated otherwise.
- Each mark point can only be awarded once.
- An **underlined** word/phrase must be exact in the answer to award the mark.
- A **bold** word/phrase requires that concept to be present (but can be expressed in multiple ways).
- `...` at the end of one mark point and at the start of the next means the second mark point cannot be awarded without the first being awarded, unless the mark scheme states otherwise (for example a reasonable attempt with some inaccuracies).
- `...` at the start only (no `...` above) means the sentence carries on with no dependency.
- Text in brackets is not required to gain the mark point.
- Single `/` means alternative word; double `//` means alternative acceptable statement for the same mark point.
- Contradictory responses: no mark awarded, even if one answer is correct.
- Multiple choice with 2+ selections where only 1 allowed: 0 marks.

---

## Question 1 — Data Representation

### 1(a) [3 marks]
**Question summary:** Convert 8-bit binary numbers to denary.
**Marking criteria:**
- 1 mark per correct conversion:

| 8-bit Binary | Denary |
|-------------|--------|
| 11110000 | 240 |
| 01101001 | 105 |
| 00011110 | 30 |

**Examiner notes:**
- Binary must be 8-bit.

---

### 1(b) [4 marks]
**Question summary:** Complete a table of statements about binary and denary values.
**Marking criteria:**
- 1 mark per correct answer:

| Statement | Answer |
|-----------|--------|
| The smallest denary number that can be represented by a 4-bit binary number | 0 |
| The largest denary number that can be represented by a 6-bit binary number | 63 |
| The maximum number of different colours that can be represented with a colour depth of 7-bits | 128 |
| The minimum number of bits needed to represent 150 different characters in a character set | 8 |

**Examiner notes:**
- Accept calculations that equate to the same answer.
- Accept any number of 0s for the first answer.

---

### 1(c) [1 mark]
**Question summary:** Perform a binary left shift.
**Marking criteria:**
- 11110000
**Examiner notes:**
- Ignore leading 0s.

---

### 1(d) [3 marks]
**Question summary:** Describe how to convert a two-digit hexadecimal number to denary, with an example.
**Marking criteria:**
- 1 mark: A correct example 2-digit hex number correctly converted into denary.
- 1 mark each (max 2) for describing/showing each stage:

**Either — Multiplying method:**
- Multiply the left/first digit by 16
- Add value of second digit (without additional calculation)

**Or — Converting method:**
- Convert each digit into 4-bit binary
- Combine and convert the 8-bit binary to denary

**Examiner notes:**
- No marks for converting denary to hex.
- If the example has an inaccurate result (e.g. they have converted A to 11), they can still get the method marks.
- No requirement to show how letters are used.

---

### 1(e) [2 marks]
**Question summary:** Perform binary addition of two 8-bit binary numbers.
**Marking criteria:**
- 1 mark: Correct working (4 carries)
- 1 mark: Correct answer: `01111010`

Working example:
```
  01101011
+ 00001111
----------
  01111010
carries: 1 1 1 1
```

**Examiner notes:**
- Do not award working mark for conversion to denary and back.
- Carries must be on the correct values, but could be above, below etc.

---

## Question 2 — Networks, Connections and Protocols

### 2(a)(i) [2 marks]
**Question summary:** Give a valid example of an IPv4 and an IPv6 address.
**Marking criteria:**
- 1 mark per valid IP address:

**IPv4:**
- 4 groups of denary numbers between 0 and 255 separated by full stops (e.g. 123.16.46.72)

**IPv6:**
- 8 groups of hex numbers between 0 and FFFF separated by colons. Double colon can appear once and replaces any number of groups of consecutive 0000 (e.g. 0252:5985:89ab:cdde:a57f:89ad:efcd:00fe or F513:8C:2A::999:0000)

**Examiner notes:**
- IPv6: each hex number can be between 1 and 4 digits.

---

### 2(a)(ii) [2 marks]
**Question summary:** Describe the format of a MAC address.
**Marking criteria (1 mark each, max 2):**
- (Usually presented in) hexadecimal/denary/binary
- 6 groups of numbers // 12 (hex) numbers ...
- ...each group has paired/2-digit (hex) numbers / 8-bit binary number
- 48 bits long
- Separated by colons/hyphens
- (The first half/part) contains the manufacturer ID // (first half/part) identifies the manufacturer
- (The second half/part) contains the serial number // (second half/part) identifies the device
**Examiner notes:**
- MP1: "numbers" on its own is NE.
- Allow both marks for a valid example.
- "6 pairs of numbers" gets MP2 and MP3.
- "4 pairs of numbers" gets MP3 only.

---

### 2(b)(i) [4 marks]
**Question summary:** Describe the benefits of using wired connections at an airport, applied to context.
**Marking criteria (1 mark for benefit, 1 for application, max 4):**
- Fast connection/speed // high bandwidth // consistent bandwidth ...
  - ...e.g. reduce delays at check in // by example for airport
- Secure // unlikely to have unauthorised access/hacked // data transmissions are likely to be safe ...
  - ...e.g. so that data about passengers/staff/aeroplanes is not intercepted // by example for airport
- Little interference // little chance of data loss // reliable ...
  - ...e.g. flight status is received without delay // by example for airport
- Long range transmission ...
  - ...e.g. airport has a large floor area/terminals // by example for airport
**Examiner notes:**
- Mark in pairs. Mark each benefit space to the candidate's benefit. An expansion/application for a benefit can be awarded in the other answer space.
- 1 benefit and 1 expansion for each answer space. Max 2 marks per answer space.
- Max 3 marks if expansions have no direct application to the airport and its computers connecting using wired connections.
- NOT cost.
- The question is not a comparison to wireless, but accept answers worded this way.
- "Fast" on its own is NE. "Faster to connect" is NE (could refer to setting up the connection rather than bandwidth).

---

### 2(b)(ii) [3 marks]
**Question summary:** Describe reasons why the airport would also use wireless connections.
**Marking criteria (1 mark each, max 3):**
- Staff do not need to be in one place // movement of staff // can work whilst moving to another part of the airport // can be accessed from any location (in range)
- Staff can be more responsive to customers/requests
- Allows a larger number of connections/devices // more scalable ...
- ...without the disruption/cost of installing more cables
- Some devices do not allow physical/wired connection // allow wider range of type of device (or by example such as vehicles/mobile devices/aeroplanes)
- Easier to add/connect more devices
- Do not need to find/use a physical connection/wire // can allow you to connect in a place where there isn't a cable/connection
- For use as a backup if the wired connection fails
**Examiner notes:**
- Do not award cost on its own.
- Do not award range on its own.
- Allow explanation of how a wireless network will benefit the passenger as well as the airport and staff.
- Allow in reverse if clear (e.g. wired restricts staff to one location).

---

### 2(c)(i) [3 marks]
**Question summary:** Draw a star topology network diagram with 5 computers, 2 printers and 1 switch.
**Marking criteria:**
- 1 mark: 5 computers, 2 printers and 1 switch all clearly labelled
- 1 mark: All devices directly connected to the switch // all computers connected to switch and each printer to a switch/computer(s)
- 1 mark: Only 8 devices and no additional connections other than to the switch (or central device, or printers to only one computer each)
**Examiner notes:**
- Allow any type of computer (e.g. PC, laptop).
- Do not accept "client" for computer.
- MP1: there must be at least 5 computers, at least 2 printers, at least 1 switch.

---

### 2(c)(ii) [2 marks]
**Question summary:** Give one benefit and one drawback of a star topology.
**Marking criteria:**
- 1 mark for benefit:
  - Easier to add new nodes // easier to set up (BOD)
  - Central device can monitor/control transmissions
  - Faster data transmission
  - Fewer data collisions
  - One connection/computer breaks — the network still works
  - Less cost of cables
- 1 mark for drawback:
  - Switch fails — the network fails // reliant on a central device (working) // single point of failure
  - Extra cost of central device/switch
**Examiner notes:**
- "Speed", "cheaper" etc. on its own is NE.
- Server is irrelevant.
- Read whole benefit and award a valid benefit. Read whole drawback and award a valid drawback.
- Do not award contradictory statements.

---

### 2(c)(iii) [3 marks]
**Question summary:** Describe the role of the switch in a star topology.
**Marking criteria (1 mark each, max 3):**
- Connects the devices together in the network // allows devices to communicate in the network
- Receives data from (all) devices in the star topology
- Record/register/store the address of devices connected to it ...
- ...in a table
- Uses MAC address of devices
- Direct data to destination ...
- ...if address not recorded, transmit to all devices

---

## Question 3 — Systems Software

### 3(a) [4 marks]
**Question summary:** Match operating system functions to tasks.
**Marking criteria:**
- 1 mark for function, 1 mark for task (2 pairs):

| Function | Acceptable tasks |
|----------|-----------------|
| Memory management // managing memory | Moves data from secondary storage to RAM |
| Peripheral management | Receiving data from input devices // transmitting data to output devices // installing/downloading device drivers // allows communication from input device / to output device |
| File management // managing files | Allows the user to create, name and delete folders |
| User interface | Outputting data to the user // receiving input from the user // allows user to communicate/interact with/control the computer // creating/displaying/allowing interaction with a GUI/command prompt interface |

**Examiner notes:**
- BOD "storage" for "memory" in the first function.
- Peripheral: allow input and output devices by example.
- File management: do not award "folder management".
- The task for peripheral management needs to extend "manage" — i.e. "manage output devices" is NE.

---

### 3(b) [6 marks]
**Question summary:** Complete a passage about encryption and defragmentation using key terms.
**Marking criteria:**
- 1 mark per correct term (6 terms total):

> **Encryption** software changes data using a **key**. If the changed data is intercepted it cannot be **understood**. This software does not stop the data from being intercepted.
>
> **Defragmentation** software analyses the data on a disk to find files that have been split and stored in separate locations. The split files are moved to be **consecutive** in storage and the free space is moved together. This does not provide more storage space on the disk, instead it makes the **access** of the data faster because the read head does not have to move as far to access the next part of the file.

**Examiner notes:**
- Mark first answer in each space.

---

## Question 4 — Extended Response (QER) [8 marks]

**Question summary:** Discuss whether a programmer should release a game as open source or proprietary software, considering legal/ethical issues, benefits and drawbacks, with a recommendation.

**Assessment objectives:** AO2 1a (4 marks) + AO2 1b (4 marks)

### Mark Band 3 — High Level (6–8 marks)
- Demonstrates thorough knowledge and understanding of a wide range of considerations; material is generally accurate and detailed.
- Applies knowledge and understanding directly and consistently to the context.
- Evidence/examples are explicitly relevant.
- Weighs up both sides of the discussion with reference to the impact on all areas, showing thorough recognition of influencing factors.
- Well-developed line of reasoning; clear and logically structured. Information is relevant and substantiated.
- The answer covers all required elements (legal/ethical, benefits, drawbacks) about open source and proprietary and includes a recommendation with justification. Top of band makes a clear and structured recommendation to the programmer.

### Mark Band 2 — Mid Level (3–5 marks)
- Demonstrates reasonable knowledge and understanding of a range of considerations; material is generally accurate but at times underdeveloped.
- Applies knowledge and understanding directly to the context, though one or two opportunities are missed.
- Evidence/examples are for the most part implicitly relevant.
- Makes a reasonable attempt to discuss the impact on most areas, showing reasonable recognition of influencing factors.
- Line of reasoning presented with some structure. Information is in the most part relevant and supported by some evidence.
- The answer includes one or more from legal/ethical, benefits, drawbacks for open source and proprietary. Alternatively, a justified recommendation without clearly referencing the bullet points in the question.

### Mark Band 1 — Low Level (1–2 marks)
- Demonstrates basic knowledge with limited understanding; material is basic and contains some inaccuracies.
- Makes a limited attempt to apply knowledge and understanding to the context.
- Provides nothing more than an unsupported assertion.
- Information is basic and communicated in an unstructured way. Supported by limited evidence; relationship to evidence may not be clear.
- The answer is limited to the facts about open source and/or proprietary.

### 0 marks
- No attempt to answer the question or response is not worthy of credit.

### Indicative Content

**Licence features:**
- Open source: (usually free), can access/change source code, redistribute
- Proprietary: purchase at a cost, cannot access/change code

**Legal and ethical issues:**
- Both provide copyright
- Open source: allows more people to take code and possibly change to resell, or adapt in their own programs to resell or claim as their own (reverse for proprietary)
- Open source: allows more people access to the game because there is likely no cost (reverse for proprietary)

**Benefits and drawbacks:**
- Open source: wider customer base, more exposure, users can alter to make it better/fix bugs, limited documentation, little financial gain
- Proprietary: allows programmer to earn money, gives more control over what happens with the program, usually well tested, more restrictions for copyright, cannot be adapted to meet user needs

**Decision:**
- Either would be appropriate; justification needs to be clearly for the scenario.

**Examiner notes:**
- The indicative content is not prescriptive or exhaustive.

---

## Question 5 — Data Representation (Sound) and Storage

### 5(a)(i) [1 mark]
**Question summary:** Identify a description of how sound is sampled.
**Marking criteria:**
- The amplitude of the wave is measured at set intervals
**Examiner notes:**
- 2+ ticks = 0 marks.

---

### 5(a)(ii) [2 marks]
**Question summary:** Describe the effects of changing the bit depth of a sound recording.
**Marking criteria (1 mark each, max 2):**
- The number of bits per sample will change // by example e.g. there will be more/less bits per sample
- The file size will change // by example e.g. the file size will increase/decrease
- There will be a change in the accuracy of each sample/amplitude/sound // by example e.g. more precise amplitudes // by example e.g. a wider/smaller range of amplitudes can be recorded
- The quality will change // there will be a different amount of distortion // by example e.g. the quality will improve/decline
**Examiner notes:**
- MP3 needs to be clearly about a wider range of amplitudes that can be recorded — i.e. more different values. Not that there are more amplitudes/samples per second.
- "More amplitudes can be measured" is BOD, but "more amplitudes measured per second" is incorrect.
- BOD "sound" for "amplitude" — e.g. "a larger range of sounds can be recorded."

---

### 5(b)(i) [4 marks]
**Question summary:** Justify the choice of secondary storage type for a musician's computer.
**Marking criteria:**
- No mark for naming the type. Accept the type by example (e.g. HDD for magnetic).
- 1 mark each for each point matching the type given (max 4):

**Magnetic (e.g. HDD):**
- (Usually) cheaper cost to purchase per unit of data
- Sufficient/good durability for what is needed ...
  - ...computer unlikely to move (regularly) // by example
- Sufficient/fast speed of access ...
  - ...no significant delays in storing/reading data
- (Long-term) reliable // longevity ...
  - ...unlikely to need to purchase another // unlikely to break from over-use
- High capacity ...
  - ...e.g. file size of sound files can be large // allows the musician to store files with higher bit depth

**Solid state (e.g. SSD):**
- Cost often equates to magnetic per quantity // not expensive per unit of data
- Durable // robust // no moving parts ...
  - ...so computer can be moved without risk of losing data
- Fast speed of access of data ...
  - ...no significant delays in storing/reading data // musician does not have to wait for files to load/store
- High capacity // (nearly the) same/higher capacity than magnetic ...
  - ...file size of sound can be large
- Small in physical size ...
  - ...device is portable // can fit in a smaller type of computer
- Produces less sound when running ...
  - ...so the musician is not distracted
- Requires little/less power (compared to others) ...
  - ...so running costs are reduced
- Drives do not get fragmented files ...
  - ...drives do not need to be defragged // constant access time

**Examiner notes:**
- MP1 needs to be cost per unit (e.g. "it costs less per GB than other storage types"). Not just "it is cheap to buy".
- Allow reverse argument (e.g. for magnetic: "magnetic is not as robust but the computer will not be moved" gets 1 mark for the not moving, and 1 mark for solid state's robustness not being required).
- If no type given on line 1, read the answer for a type and then award justification.
- If no type identified anywhere in the answer: 0 marks.

---

### 5(b)(ii) [1 mark]
**Question summary:** Identify a type of storage that would be used to distribute music to customers.
**Marking criteria:**
- Optical
**Examiner notes:**
- BOD "optic".
- Do not award an example of optical storage (e.g. CD/DVD).

---

### 5(b)(iii) [1 mark]
**Question summary:** Select the correct file size.
**Marking criteria:**
- 200 000 KB
**Examiner notes:**
- 2+ ticks = 0 marks.

---

### 5(b)(iv) [2 marks]
**Question summary:** Calculate the total storage needed for sound files.
**Marking criteria:**
- 1 mark: Correct answer: 3 GB
- 1 mark: Correct working (e.g. 3 × 1000 / 1000, or 3 × 1000, or 3000 / 1000, or 3 / 1000, or 0.003 × 1000)
**Examiner notes:**
- Allow 2.9296875 (or approximated) for division by 1024.
- Allow addition of metadata (e.g. 10% added) — this can be awarded for both working and answer.
- Not all of the working needs to be correct to get the working mark.
- Ignore mention of MB/GB in the working.

---

## Question 6 — Systems Architecture

### 6(a) [2 marks]
**Question summary:** Describe what happens during the fetch-decode-execute cycle.
**Marking criteria (1 mark each, max 2):**
- Data/instructions are fetched from memory/RAM/primary storage
- Data/instructions are stored using the registers // correct example of a register storing address/data
- Data/instructions are decoded // data/instructions are split into opcode and operand
- Data/instructions are executed/processed
- ALU performs the logical/arithmetic calculations
**Examiner notes:**
- MP4: BOD "carried out" etc. for "executed".
- Ignore inaccurate references to registers and components (other than MP2 — correct example of a register).

---

### 6(b) [4 marks]
**Question summary:** Name two CPU registers and describe their purpose.
**Marking criteria:**
- 1 mark for naming register, 1 mark for matching purpose (2 pairs):

**Program counter (PC):**
- Stores the address of the current/next instruction to be fetched // stores the address of the instruction for the current/next FE cycle

**Memory address register (MAR):**
- Stores the address of the current/next instruction/data to be fetched // stores the address where data/instruction is to be stored

**Memory data register (MDR):**
- Stores the data/instruction fetched from memory // stores data/instruction to be stored in memory // stores the data/instruction located in the memory location in the MAR

**Accumulator (ACC):**
- Stores the result of calculations // stores data currently being processed / by example // stores the result from the ALU

**Examiner notes:**
- Be careful that the purpose is not an action such as "fetches", "takes", "retrieves".
- Read full purpose and award a correct point.
- Accept Current Instruction Register (CIR) / Instruction Register (IR): stores the instruction currently being executed.
- BOD Memory Buffer Register for MDR.
- If no register given but the register is named in the purpose column, award the purpose if accurate.
- If the answer in the register column is incorrect, do not mark purpose.
- For PC and MAR, accept "pointer" for "storing address".
- Accept "memory address", "memory data".

---

### 6(c) [3 marks]
**Question summary:** State three factors that affect CPU performance.
**Marking criteria (1 mark each, max 3):**
- Clock speed
- Cache size
- Number of cores
**Examiner notes:**
- "Clock", "cache", "speed", "cores" on its own is NE.

---

## Question 7 — Embedded Systems

### 7(a) [3 marks]
**Question summary:** Describe the characteristics of an embedded system (in the context of a "Follow Me" car system).
**Marking criteria (1 mark each, max 3):**
- Has a specific purpose // it only performs one/limited task // dedicated to the Follow Me system
- Built within a larger device/car
- Dedicated/specific/its own hardware/sensors
- Has a microprocessor
- Built-in operating system/software // software is all in firmware/ROM ...
- ...its instructions/operation does not/is hard to change/update
- It is a control system // it is automated
**Examiner notes:**
- MP2: BOD reference to it being "built into" something reasonable.

---

### 7(b)(i) [2 marks]
**Question summary:** Describe what data might be stored in the ROM of the embedded system.
**Marking criteria (1 mark each, max 2):**
- Start-up instructions // BIOS // bootstrap // where to find the OS
- Firmware // program/instruction to run the Follow Me system // instructions for operation
- Example of data being stored (e.g. the maximum speed, the minimum distance)
- Operating System // OS
**Examiner notes:**
- MP2: "programs" on its own is NE.
- MP3: allow two marks for examples of instructions or data (e.g. both marks for: 1 — the maximum speed Follow Me can operate; 2 — the minimum distance the car in front can be).

---

### 7(b)(ii) [3 marks]
**Question summary:** Describe data that would need to be stored in RAM for the embedded system.
**Marking criteria (1 mark each, max 3):**
- Current distance from car in front
- Set distance from car in front
- Current speed of vehicle
- Current speed of vehicle in front
- Reading from sensor
- Driver actions (e.g. moving wheel/braking)
- Direction the car (in front) is travelling (e.g. turning)
**Examiner notes:**
- "Speed" or "distance" on its own is NE.
- BOD reference to a camera taking images of what is in front.

---

### 7(b)(iii) [2 marks]
**Question summary:** Explain why the embedded system is unlikely to need virtual memory.
**Marking criteria (1 mark each, max 2):**
- Only stores a small amount of data in RAM // only stores specific/few items in RAM ...
- ...unlikely to run out of RAM // there is enough space in RAM
- No secondary storage to use/needed as VM
- Few/one program/instructions running at a time // no memory-intensive tasks
- Dedicated hardware will be optimised for the system // RAM is designed to meet the system's requirements
