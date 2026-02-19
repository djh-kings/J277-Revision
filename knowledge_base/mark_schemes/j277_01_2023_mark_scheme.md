# J277/01 Computer Systems — 2023 Mark Scheme

## General Marking Instructions

- Each mark point is worth 1 mark unless stated otherwise.
- Each mark point can only be awarded once.
- An **underlined** word/phrase must be exact in the answer to award the mark.
- A **bold** word/phrase requires that concept to be present (but can be expressed in multiple ways).
- `...` at the end of one mark point and start of the next means the second mark is dependent on the first being awarded.
- `...` at the start only (no `...` above) means the sentence carries on with no dependency.
- Text in brackets is not required to gain the mark.
- Single `/` means alternative word; double `//` means alternative acceptable statement for the same mark point.
- Contradictory responses: no mark awarded, even if one answer is correct.
- Multiple choice with 2+ selections where only 1 allowed: 0 marks.

---

## Question 1 — Data Representation

### 1(a) [1 mark]
**Question summary:** Why is binary used in computers?
**Marking criteria:**
- Binary is used because computers are made of switches that can only be on or off (box 3)
**Examiner notes:**
- Accept cross or other indication as long as it is clear which one they intend.
- 2+ ticks = 0 marks.

---

### 1(b) [4 marks]
**Question summary:** Complete a table converting between denary, 8-bit binary, and hexadecimal.
**Marking criteria:**
- 1 mark for each correctly completed row (4 rows total):

| Denary | 8-bit binary | Hexadecimal |
|--------|-------------|-------------|
| 7 | 00000111 | 7 |
| 49 | 00110001 | 31 |
| 102 | 01100110 | 66 |
| 244 | 11110100 | F4 |

**Examiner notes:**
- Must be 8-bit binary.
- Ignore case in hexadecimal.
- Ignore calculations shown in answer box.

---

### 1(c) [1 mark]
**Question summary:** Select the correct file size.
**Marking criteria:**
- 200MB (box 3)
**Examiner notes:**
- Accept cross or other indication as long as it is clear which one they intend.
- 2+ ticks = 0 marks.

---

### 1(d) [1 mark]
**Question summary:** Select both correct file size representations.
**Marking criteria:**
- Both boxes must be correct for 1 mark:
  - 4 500 000 bytes (box 1)
  - 4.5 MB (box 3)
**Examiner notes:**
- Accept cross or other indication as long as it is clear which one they intend.
- 1 correct out of 3+ ticks = 0 marks.

---

### 1(e) [2 marks]
**Question summary:** Perform binary addition of two 8-bit binary numbers.
**Marking criteria:**
- 1 mark: Correct answer: `0 0 0 0 1 1 1 1`
- 1 mark: Correct working shown (e.g. carrying)

Working example:
```
  0 1 1 1 0 0 0 1
+ 1 0 0 1 1 1 1 0
-----------------
  0 0 0 0 1 1 1 1
carries: 1 1 1
```

**Examiner notes:**
- Do not award marks for converting each number to denary and adding them together. If carries are present alongside a denary conversion, award the carries mark (conversion can be used to check their answer).
- Marks are not dependent.

---

### 1(f) [2 marks]
**Question summary:** Identify the type and number of binary shifts performed.
**Marking criteria:**
- 1 mark: Left shift
- 1 mark: 3 places

---

## Question 2 — Networks, Connections and Protocols

### 2(a)(i) [4 marks]
**Question summary:** Match tasks to the correct network protocol.
**Marking criteria:**
- 1 mark per correct protocol:

| Task | Acceptable protocol(s) |
|------|----------------------|
| Requesting a webpage from a web server | HTTP // HTTPS |
| Entering a username and password to access their bank account | HTTPS |
| Downloading a text document from a web server | FTP // HTTP // HTTPS |
| Checking for new emails in their inbox | IMAP // POP |

**Examiner notes:**
- Mark first answer in each box.
- Allow full protocol name written out (e.g. file transfer protocol).
- Accept POP3 or any other version number.

---

### 2(a)(ii) [2 marks]
**Question summary:** Give two reasons for using layers in network protocols.
**Marking criteria (1 mark each, max 2):**
- Each layer is independent // layers are not reliant on other layers
- One layer can be changed without affecting the others // a layer can function without needing/changing/impacting any other layer // self-contained
- Separates tasks so they can be developed independently
- A developer can focus on only one layer // developer can specialise
- Allows for standards for individual tasks/layers to be developed // for compatibility
- Manufacturers can develop hardware to fit into one particular layer
- To group together similar protocols
**Examiner notes:**
- Max 1 mark per answer space.

---

### 2(b)(i) [1 mark]
**Question summary:** State a characteristic of a LAN.
**Marking criteria:**
- Uses dedicated/own/internal hardware // no external/third party hardware/infrastructure // computers use MAC addresses to communicate within the LAN

---

### 2(b)(ii) [4 marks]
**Question summary:** Explain the benefits of using a wireless connection in a home network.
**Marking criteria (1 mark each, max 4):**
- Allows more devices to connect ...
- ...for example televisions, mobile phones
- Easy to connect (devices) // easier to set up (wireless connections) // by example e.g. easier for guests to connect their devices
- Home is likely a small area ...
- ...so short distance wireless is sufficient
- Devices can move around // can use devices in different areas // can connect from anywhere in the house // can use where wires don't reach // can access from a larger area (than wired) ...
- ...by example e.g. student is using a laptop so does not need to be tied to one place // e.g. they don't have to disconnect before moving // e.g. they can stay connected whilst moving
- Cheaper to purchase/install/set up for new devices // no cost for (new/replacement) wires/hardware ...
- ...because no additional/fewer wires are needed
- Fewer trip hazards from trailing wires // reduce risk of damage to cables // fewer cables to damage
- More compatible // some devices only have wireless connections
**Examiner notes:**
- "Easier" or "cheaper" on their own: not enough (NE).

---

### 2(b)(iii) [2 marks]
**Question summary:** Give two drawbacks of using a wireless connection.
**Marking criteria (1 mark each, max 2):**
- Prone to interference // by example
- Limited range of signal
- Slower rate of transmission // less bandwidth // reduced network performance // increased latency // BOD slower connection // more users reduces rate of transmission/bandwidth/performance
- Increased risk of security concerns // by example e.g. a hacker could connect to the wireless connection
- Less stable connection
- Higher chance of collisions // higher error rate
**Examiner notes:**
- For "slower": must say what is slower/decreased — e.g. "it's slower" on its own is NE.
- Mark first drawback in each answer space.
- "Less reliable" is too vague (TV) on its own for the stability point.

---

## Question 3 — Data Representation (Images, Characters, Compression)

### 3(a) [5 marks]
**Question summary:** Complete the passage about character sets.
**Marking criteria:**
- 1 mark per correctly completed space:

> A character set stores all of the characters that the computer can represent. Each character is given a **unique/different** binary code. Lower-case and upper-case letters in a character set are given **unique/different/similar** binary codes. One example of a character set is **ASCII**. This character set uses **8** bits for each character. If the ASCII value for the character 'F' is 70 then the ASCII value for the character 'L' is **76**.

**Examiner notes:**
- Award the same term used multiple times if used correctly.

---

### 3(b)(i) [1 mark]
**Question summary:** Define metadata in the context of an image file.
**Marking criteria:**
- Data about the data/image/file
**Examiner notes:**
- Question is for a definition, not an example.
- If the definition is not clear (e.g. "details about the image", "information about the image") this is NE, but read the example to see if it clarifies. For example: "Information about the image, such as the number of pixels" — give BOD.
- "Data" could be properties/characteristics.

---

### 3(b)(ii) [2 marks]
**Question summary:** Complete the pixel colour grid using given data.
**Marking criteria:**
- 1 mark: First row correct: red, red, purple
- 1 mark: Remainder correct and in correct order:

| | Col 1 | Col 2 | Col 3 |
|---|-------|-------|-------|
| Row 1 | red | red | purple |
| Row 2 | blue | green | blue |
| Row 3 | purple | purple | purple |
| Row 4 | red | green | blue |

**Examiner notes:**
- Ignore case/spelling as long as legible.
- If candidate completed the table in incorrect layout (e.g. right to left, or bottom to top), award MP2 as FT if done correctly.

---

### 3(b)(iii) [1 mark]
**Question summary:** Calculate the number of colours from a given colour depth.
**Marking criteria:**
- 16
**Examiner notes:**
- Accept any calculation that equates to 16 (e.g. 2⁴).

---

### 3(b)(iv) [2 marks]
**Question summary:** Describe the effects of increasing colour depth.
**Marking criteria (1 mark each, max 2):**
- The quality of the image can be improved
- The file size will increase // takes up more storage space // image has/requires/takes up more data
- The number of colours that can be represented/used will increase // BOD more colourful
**Examiner notes:**
- Do not accept: higher resolution, image size increases, clearer image (NBOD), more detailed image (NBOD).
- "Closer to original" is NE on its own (there is no original image in this context).
- Mark first answer in each answer space.

---

### 3(c)(i) [3 marks]
**Question summary:** Identify the best compression type for a text file and justify.
**Marking criteria:**
- 1 mark: **Lossless**
- 1 mark each (max 2) for justification:
  - Lossless will not remove any data // no data is lost with lossless // file/data can be fully reconstructed back to the original
  - Text files require all data to open/be used/work // text files will not work if any data is lost // lossy cannot (usually) be used on text files // none of the required characters/words/spaces/case/formatting/information would be lost // the text will remain accurate // the text will not have changed meaning // the text will still make sense
**Examiner notes:**
- Do not award an example of lossless (e.g. RLE) for the 1st mark, but FT for justification.
- Do not FT for lossy.
- Accept reverse answers e.g. "Lossy will remove data."
- If compression type is missing, read justification — if it clearly states which type, award justification.
- MP1 requires reference to "data" (or equivalent), not "information".
- MP2 requires reference to the text file context — "information" is allowed here.
- If not valid compression type given: 0 marks.

---

### 3(c)(ii) [3 marks]
**Question summary:** Identify the best compression type for an image file and justify.
**Marking criteria:**
- 1 mark: **Lossy**
- 1 mark each (max 2) for justification:
  - Will reduce the file size more/significantly (than lossless)
  - Image will only lose quality // changes may not be noticed by the user // remove unnoticeable/unnecessary detail/content
**Examiner notes:**
- Do not award an example of lossy (e.g. reduce resolution) for the 1st mark, but FT for justification.
- Do not award lossless, but FT for lossless justification: e.g. quality/detail of the image can be retained; no data will be lost (permanently); file size may still be a substantial reduction.
- If compression type is missing, read justification — if it clearly states which type, award justification.
- Do not award descriptions of how the file can be compressed (e.g. reduce number of colours) unless they also state that this change will not be noticed.
- "It compresses the file more" is NE — compression is in the question; candidate needs to explain what this means (i.e. reduced file size).
- If not valid compression type given: 0 marks.

---

## Question 4 — Security Threats and Prevention

### 4(a) [4 marks]
**Question summary:** Match threats to appropriate prevention methods in a table.
**Marking criteria:**
- 1 mark per correctly completed row:

| Threat | Antimalware | Penetration testing | Encryption | Firewall |
|--------|:-----------:|:------------------:|:----------:|:--------:|
| Spyware | ✓ | (✓) | | |
| Brute-force attack | | (✓) | ✓ | |
| Data interception | | | ✓ | |
| SQL injection | | ✓ | | (✓) |

**Examiner notes:**
- Entries shown as (✓) may be present or absent — they do not affect marking.

---

### 4(b) [3 marks]
**Question summary:** Identify a threat not listed in part (a) and describe it.
**Marking criteria:**
- 1 mark: Name a valid threat
- 1 mark each (max 2): Description of the threat

**Acceptable threats and descriptions:**

**Social engineering:**
- Using deception to manipulate users ...
- ...to gain personal data

**Shoulder surfing:**
- Watching a person entering a password ...
- ...and using it to access an account

**Phishing:**
- Fake emails sent to person // click on link from fake email
- Person sends/gives away personal data

**Pharming:**
- Software that redirects user to fake website // use of a fake website
- Person enters/gives away personal data

**Denial of service (DOS/DDOS):**
- Multiple requests sent to a server (simultaneously) // server is flooded with requests
- More requests than the server can process // uses all of the bandwidth available
- Server cannot respond // server crashes/denies access // stops access to a network // slows access to a network

**Hacker:**
- Person gaining unauthorised access to a system/account
- To delete/damage/access data

**Virus/malware:**
- Software that replicates/spreads
- Fills disk space
- Deletes/corrupts data // allows unauthorised access

**Trojan:**
- Malware disguised as legitimate software
- Once installed acts as a virus // by example of action (e.g. deleting files, allows unauthorised access)

**Worm:**
- Software that replicates across a network
- Uses up all the bandwidth

**Ransomware:**
- Encrypts/corrupts/locks access to data
- Cannot access data without paying a fee/money // pay fee/money to get them back/decrypted // cannot access data without meeting demands

**Physical threat (by example):**
- Damage to hardware
- Deletes/corrupts data

**Examiner notes:**
- If threat is clearly wrong, do not FT.
- If no threat given, read description for name of threat. If no name found, do not award.
- If threat is vague, award matching description.
- Allow social engineering as the threat — naming and description of phishing/pharming/shoulder surfing in the description is acceptable.
- Ransomware: the description mark for "ransom" cannot be awarded on its own without reference to it being paid.
- For actions that malware/virus etc. can carry out: award any feasible action.

---

## Question 5 — Systems, Storage, Software and Client-Server

### 5(a)(i) [2 marks]
**Question summary:** Explain why primary and secondary storage are needed.
**Marking criteria:**
- 1 mark for primary storage:
  - To store (active) data/instructions/software/OS that the processor needs to access // without primary the computer won't be able to start up/work // (ROM) so the start-up instructions are not deleted when the computer turns off // (RAM) to store the currently running data/software/instructions // (cache) to store frequently used data/instructions
- 1 mark for secondary storage:
  - To store data/files long-term/permanently // without secondary the user's files will not be stored when the power is turned off // store data not currently being used
**Examiner notes:**
- The question is about *why they are needed*, not what they store.
- Secondary: NBOD "to backup data" without reference to long-term/permanence.

---

### 5(a)(ii) [2 marks]
**Question summary:** Name a secondary storage device and an example of data stored on it.
**Marking criteria:**
- 1 mark for device: Hard drive // SSD // USB (memory) stick // flash memory card // CD // DVD etc.
- 1 mark for data: e.g. images created // documents // software // files // data moved from RAM to virtual memory
**Examiner notes:**
- Allow any secondary device. BOD "optical disc".
- Question asks for a device, not a type of device — magnetic/optical/solid state is NE.
- Award example even if incorrect secondary storage device given.
- "USB" on its own is NE.

---

### 5(a)(iii) [4 marks]
**Question summary:** Mark statements about virtual memory as true or correct the false ones.
**Marking criteria:**
- 1 mark per correctly completed row:

| Statement | True | False — correction |
|-----------|:----:|--------------------|
| A section of primary storage is partitioned to act as virtual memory | | A section of **secondary storage** is partitioned to act as virtual memory |
| Data from ROM is transferred into VM | | Data from **RAM** is transferred into VM |
| VM is needed when RAM is full, or nearly full | ✓ | |
| Data from VM is transferred back to secondary storage when needed | | Data from VM is transferred back to **RAM** when needed |

**Examiner notes:**
- Allow a description of the error in column 2 (e.g. row 1: "primary should be secondary").
- Accept HDD/SSD for secondary storage in the 1st row.
- Do not accept "primary" for RAM in rows 2 and 4.

---

### 5(b) [1 mark]
**Question summary:** State the purpose of utility software.
**Marking criteria:**
- Performs housekeeping actions
- Monitor/manage/maintain a computer system
- Help the computer run smoothly/efficiently
- To diagnose/fix/identify problems with a computer system
**Examiner notes:**
- Do not award an example on its own.

---

### 5(c)(i) [3 marks]
**Question summary:** Identify which computer is the client in a client-server scenario (artist uploading images to web server) and justify.
**Marking criteria:**
- 1 mark identification: Artist's computer // computer uploading the images // BOD "the artist"
- 1 mark each (max 2) for justification:
  - Sends the files/data for storage/to the host/web server // the files are stored on the web server
  - Performs the user's actions ...
  - ...and sends the results to the web server
  - Sends a request to the web server ...
  - ...to store/upload its files
  - It does not store data for others to access
  - Confirmation of upload/error is received (from server) for display
**Examiner notes:**
- Incorrect computer: do not award justification.
- Be careful the justification is about the *upload* of images to the web server, not the download.
- Accept "host" for web server.
- If "user's computer" is given: NE — read on for justification.
- If "user viewing the website" or similar is given: incorrect.

---

### 5(c)(ii) [3 marks]
**Question summary:** Identify which computer is the server in the same scenario and justify.
**Marking criteria:**
- 1 mark identification: **Web server**
- 1 mark each (max 2) for justification:
  - The images/data are stored on/uploaded to/sent to/hosted on the web server
  - Web server receives a request (from the artist's computer to upload the images)
  - Web server executes/responds to the request // web server is doing the processing/handling the (request to) upload
  - Web server returns confirmation/error of the processing/upload
**Examiner notes:**
- If computer identification is incomplete or inaccurate (e.g. "server" or "website" instead of "web server"): do not award the identification mark, but award justification.
- Allow FT in justification if the same inaccurate term is used consistently (e.g. "website" given as computer (NE), but justification says "images are sent to the website" — FT for website instead of web server).
- Incorrect computer: do not award justification.

---

### 5(d)(i) [4 marks]
**Question summary:** Describe the benefits of proprietary software to the artist and programmer.
**Marking criteria (1 mark each, max 4):**
- Authors can earn money ...
- ...by selling for a fee // using licences to stop unauthorised use
- No-one can see the code ...
- ...users cannot edit/change the software // by example e.g. inserting malware
- ...so it cannot be copied/resold/shared
- More control over intellectual property // by example e.g. restrict users, restrict what can be done with the software without permission
**Examiner notes:**
- Benefit is to the artist and programmer — not the user.
- Mark the answer as a whole.
- Do not award reference to ownership/copyright because both proprietary and open source allow copyright of the code/program.

---

### 5(d)(ii) [2 marks]
**Question summary:** Describe the benefits of open source software to users.
**Marking criteria:**
- 1 mark for point, 1 mark for expansion:
  - Users can view/edit the (source) code // users can edit the program/software ...
    - ...to tailor/improve/adapt it to do what they need/want
    - ...so errors can be fixed (by anyone)
    - ...users can learn how the software works
  - Freely accessible ...
    - ...do not have to pay
    - ...can redistribute ...
    - ...with changes
**Examiner notes:**
- Benefit to users, not artist and programmer.

---

## Question 6 — Extended Response (QER) [8 marks]

**Question summary:** Discuss the legal, ethical and privacy issues of using smart CCTV facial recognition in a shopping centre.

**Assessment objectives:** AO2 1a (4 marks) + AO2 1b (4 marks)

### Mark Band 3 — High Level (6–8 marks)
- Demonstrates thorough knowledge and understanding of a wide range of considerations; material is generally accurate and detailed.
- Applies knowledge and understanding directly and consistently to the context.
- Evidence/examples are explicitly relevant.
- Weighs up both sides of the discussion with reference to the impact on all areas, showing thorough recognition of influencing factors.
- Well-developed line of reasoning; clear and logically structured. Information is relevant and substantiated.

### Mark Band 2 — Mid Level (3–5 marks)
- Demonstrates reasonable knowledge and understanding of a range of considerations; material is generally accurate but at times underdeveloped.
- Applies knowledge and understanding directly to the context, though one or two opportunities are missed.
- Evidence/examples are for the most part implicitly relevant.
- Makes a reasonable attempt to discuss the impact; most points show reasonable recognition of influencing factors.
- Line of reasoning presented with some structure. Information is in the most part relevant and supported by some evidence.

### Mark Band 1 — Low Level (1–2 marks)
- Demonstrates basic knowledge with limited understanding; material is basic and contains some inaccuracies.
- Makes a limited attempt to apply knowledge and understanding to the context.
- Provides nothing more than an unsupported assertion.
- Information is basic and communicated in an unstructured way. Supported by limited evidence; relationship to evidence may not be clear.

### 0 marks
- No attempt to answer the question or response is not worthy of credit.

### Indicative Content

**Legal issues:**
- DPA needs to be followed or company could be fined (e.g. customers informed the system is used; data held for specified time/reasons; data kept secure)
- Centre is private property so customers can choose not to enter
- Can be used to identify people committing crimes (e.g. theft, used as evidence, make sure the correct people are caught)

**Ethical issues:**
- Users feel safer because they know actions are being monitored and help/action will be taken if needed
- If users have not done anything then there is no reason to be tracked/recorded so should not impact them
- Users feel unsafe because they are being watched
- Users may be unaware they are being recorded — need to be informed, give consent
- Users do not know where the videos/data about them and their movements is stored/how it is used — DPA reference

**Privacy issues:**
- Users may feel it is an invasion of privacy
- Users are in a public place and can be legally recorded by anyone anyway
- Users may feel like they are being watched all the time
- Users have not given their permission to be tracked
- Users may not know the system exists

**Examiner notes:**
- Some points may cover more than one issue area.
- The indicative content is not prescriptive or exhaustive.

---

## Question 7 — Embedded Systems [3 marks]

**Question summary:** Give an example of an embedded system in a car and explain why it is an embedded system.
**Marking criteria:**
- 1 mark for example:
  - Auto lights // auto window wipers // sat nav/GPS // air conditioning/climate control // radio/entertainment/infotainment/media system // lane assist // engine management system // auto-park // cruise control // auto-brake // follow-me // dashcam
- 1 mark each (max 2) for explanation:
  - Limited functions // by example e.g. the system only checks the light and turns lights on/off
  - Dedicated microprocessor // by example e.g. there is a microprocessor that is only checking the lights
  - Hard to change function // by example e.g. the user cannot make the light system do any other role
**Examiner notes:**
- Allow anything that could be reasonably within a car.
- If example is not clear whether it's an embedded system, read explanation for justification (e.g. hazard lights could be embedded if activated automatically when the car crashes). Award the example in the explanation if this occurs.
- If justification gives only generic features of an embedded system: max 1 for explanation.
- Do not award "built into the car/larger machine" — this is stated in the question.
