import { useState, useEffect, useCallback } from "react";

const C = { primary: "#0A3D62", secondary: "#D0D3D4", accent: "#F5A623", bg: "#F4F6F8", white: "#FFFFFF", text: "#333333", muted: "#888888", success: "#2ECC71", warning: "#F1C40F", error: "#E74C3C" };
const FF = 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const TL = { "ipv4":"IPv4 Validation","ipv6":"IPv6 Format","protocols":"Protocols","encryption":"Encryption","wired-wireless":"Wired vs Wireless","hardware":"Network Hardware","lan-wan":"LAN & WAN","dns-internet":"DNS & Internet","topologies":"Topologies","client-server":"Client-Server & P2P","mac-address":"MAC Address","standards":"Standards","layers":"Layers","performance":"Network Performance" };

const QS = [
  // IPv4
  { id:"q1",t:"ipv4",q:"Is 192.168.300.1 a valid IPv4 address?",o:["Valid","Invalid"],a:"Invalid",fb:"Each group in IPv4 must be 0–255. 300 exceeds this limit.",ex:"June 2024: A common error was giving numbers greater than 255.",cm:true },
  { id:"q2",t:"ipv4",q:"Is 10.0.0.256 a valid IPv4 address?",o:["Valid","Invalid"],a:"Invalid",fb:"256 exceeds the maximum value of 255. Each of the 4 groups must be 0–255." },
  { id:"q3",t:"ipv4",q:"Is 172.16.254.1 a valid IPv4 address?",o:["Valid","Invalid"],a:"Valid",fb:"All four groups are between 0 and 255, separated by full stops. This is valid." },
  { id:"q4",t:"ipv4",q:"Is 56.1.2.66.1 a valid IPv4 address?",o:["Valid","Invalid"],a:"Invalid",fb:"IPv4 has exactly 4 groups. This has 5 groups, making it invalid.",ex:"June 2025: Candidates often incorrectly stated that 56.1.2.66.1 was valid.",cm:true },
  { id:"q5",t:"ipv4",q:"Is 192.154.21.2 a valid IPv4 address?",o:["Valid","Invalid"],a:"Valid",fb:"All four groups are between 0 and 255. This is a valid IPv4 address.",ex:"June 2025: Candidates often incorrectly stated that 192.154.21.2 was invalid.",cm:true },
  { id:"q6",t:"ipv4",q:"Is 258.0.0.3 a valid IPv4 address?",o:["Valid","Invalid"],a:"Invalid",fb:"258 exceeds 255. Remember: each group in IPv4 must be between 0 and 255." },
  // IPv6
  { id:"q7",t:"ipv6",q:"True or False: IPv6 addresses use 6 groups separated by full stops.",o:["True","False"],a:"False",fb:"IPv6 uses 8 groups of hexadecimal values (0000–FFFF) separated by colons, NOT full stops. Don't confuse '6' in IPv6 with the number of groups.",ex:"June 2024: Common errors included giving 6 groups and separating with full stops.",cm:true },
  { id:"q8",t:"ipv6",q:"True or False: An IPv6 address can use :: to replace consecutive groups of zeros.",o:["True","False"],a:"True",fb:"Correct. The :: notation can appear once in an IPv6 address to replace consecutive groups of 0000." },
  { id:"q9",t:"ipv6",q:"How many groups does an IPv6 address contain?",o:["4","6","8","12"],a:"8",fb:"IPv6 has 8 groups of hexadecimal numbers (0000–FFFF), separated by colons.",cm:true },
  { id:"q10",t:"ipv6",q:"Which number system does IPv6 use?",o:["Denary (base 10)","Binary (base 2)","Hexadecimal (base 16)","Octal (base 8)"],a:"Hexadecimal (base 16)",fb:"IPv6 uses hexadecimal (0–9 and A–F). Each group ranges from 0000 to FFFF." },
  // Protocols
  { id:"q11",t:"protocols",q:"Which protocol is used to SEND an email?",o:["POP","IMAP","SMTP","HTTP"],a:"SMTP",fb:"SMTP (Simple Mail Transfer Protocol) sends emails. POP and IMAP are for receiving/retrieving emails.",ex:"June 2022: Candidates incorrectly used SMTP for checking email.",cm:true },
  { id:"q12",t:"protocols",q:"You are entering a password on a website. Which protocol should be used?",o:["HTTP","HTTPS","FTP","SMTP"],a:"HTTPS",fb:"HTTPS encrypts data being transmitted, protecting sensitive information like passwords. HTTP would send the password as plain text.",ex:"June 2022: Some candidates missed the required 's' for secure access." },
  { id:"q13",t:"protocols",q:"Which protocol checks for new emails in your inbox?",o:["SMTP","FTP","IMAP","HTTP"],a:"IMAP",fb:"IMAP (or POP) retrieves emails from a mail server. SMTP is only for sending — a very common exam error.",ex:"June 2022/2023: Email retrieval tasks were commonly answered inaccurately.",cm:true },
  { id:"q14",t:"protocols",q:"Which protocol downloads a large file from a server?",o:["SMTP","IMAP","FTP","POP"],a:"FTP",fb:"FTP (File Transfer Protocol) is designed for transferring files between computers." },
  { id:"q15",t:"protocols",q:"What does TCP/IP stand for?",o:["Transmission Control Protocol / Internet Protocol","Transfer Communication Protocol / Internet Protocol","Transmission Control Program / Internet Provider","Total Connection Protocol / Internet Protocol"],a:"Transmission Control Protocol / Internet Protocol",fb:"TCP handles reliable data transmission; IP handles addressing and routing." },
  { id:"q16",t:"protocols",q:"What is the main difference between POP and IMAP?",o:["POP sends, IMAP receives","POP downloads & deletes from server, IMAP keeps emails on server","POP is faster","POP is encrypted, IMAP is not"],a:"POP downloads & deletes from server, IMAP keeps emails on server",fb:"POP downloads to one device (usually removing from server). IMAP synchronises with the server for multi-device access." },
  // Encryption
  { id:"q17",t:"encryption",q:"True or False: Encryption stops data from being intercepted.",o:["True","False"],a:"False",fb:"Encryption does NOT stop interception. Data CAN be intercepted but will be meaningless without the decryption key. This is the single most common exam misconception.",ex:"June 2022/2024/2025: 'Encryption does not stop data from being intercepted. The data is still there, but mixed up by the key.'",cm:true },
  { id:"q18",t:"encryption",q:"True or False: Encrypted data cannot be read.",o:["True","False"],a:"False",fb:"The mark scheme does NOT accept 'cannot be read'. The data CAN be opened — but the contents will be meaningless without the key. Use 'meaningless' or 'cannot be understood'.",ex:"OCR Mark Scheme: Do NOT accept 'cannot be read'. Data CAN be read but will be meaningless.",cm:true },
  { id:"q19",t:"encryption",q:"What does encryption do to data?",o:["Prevents interception","Scrambles data so it is meaningless without a key","Deletes data after transmission","Compresses data"],a:"Scrambles data so it is meaningless without a key",fb:"Encryption uses an algorithm and key to scramble data. Only someone with the correct decryption key can restore it." },
  { id:"q20",t:"encryption",q:"Why should a library use encryption when transmitting personal data?",o:["So data cannot be intercepted","So intercepted data will be meaningless and personal info cannot be understood","To make the network faster","To prevent hackers accessing the network"],a:"So intercepted data will be meaningless and personal info cannot be understood",fb:"Encryption protects the meaning of data if intercepted. The data can still be intercepted, but will be meaningless without the key.",ex:"June 2022: Based on actual past paper about library encryption." },
  // Wired vs Wireless
  { id:"q21",t:"wired-wireless",q:"A student says wireless is 'slower'. Why would this lose marks?",o:["It's incorrect","Too vague — must specify slower transmission speed or data transfer rate","Should say 'faster'","Speed isn't valid"],a:"Too vague — must specify slower transmission speed or data transfer rate",fb:"Simply saying 'slower' is not precise enough. You must state what is slower: rate of data transmission or data transfer speed.",ex:"June 2022/2023: Candidates needed to specify what was slower.",cm:true },
  { id:"q22",t:"wired-wireless",q:"Which is a benefit of wired over wireless?",o:["Devices move freely","No cables needed","Faster data transmission speeds and more reliable","Cheaper in large buildings"],a:"Faster data transmission speeds and more reliable",fb:"Wired connections offer faster data transmission speeds, more reliability, and less susceptibility to interference." },
  { id:"q23",t:"wired-wireless",q:"Which is a benefit of wireless over wired?",o:["Faster transmission","More secure","Mobility — connect without physical cables","More reliable"],a:"Mobility — connect without physical cables",fb:"Wireless allows devices to connect from anywhere within range without needing a physical cable." },
  { id:"q24",t:"wired-wireless",q:"30 fixed desktop computers — wired or wireless?",o:["Wired","Wireless"],a:"Wired",fb:"Desktops are fixed (no mobility needed), wired provides faster speeds and more reliable connections." },
  // Hardware
  { id:"q25",t:"hardware",q:"What is the main task of a switch?",o:["Connects LAN to internet","Stores files and provides services","Directs data to correct device using MAC addresses","Provides wireless connectivity"],a:"Directs data to correct device using MAC addresses",fb:"A switch directs data using MAC addresses. It does NOT store data or provide services — that's a server.",ex:"June 2024: Candidates confused switches with servers.",cm:true },
  { id:"q26",t:"hardware",q:"What hardware lets tablets connect wirelessly to a LAN?",o:["Router","Switch","WAP","NIC"],a:"WAP",fb:"A WAP (Wireless Access Point) creates a wireless network. A router connects networks — different job." },
  { id:"q27",t:"hardware",q:"What does a router do?",o:["Directs data within LAN using MACs","Transmits data between networks (e.g. LAN to internet)","Provides wireless signals","Stores user files"],a:"Transmits data between networks (e.g. LAN to internet)",fb:"A router connects different networks and directs data between them. Within a LAN, a switch directs data." },
  { id:"q28",t:"hardware",q:"What does NIC stand for?",o:["Network Internet Controller","Network Interface Controller/Card","Node Identification Chip","Network Integration Component"],a:"Network Interface Controller/Card",fb:"A NIC allows a device to connect to a network. It can be wired (Ethernet) or wireless (Wi-Fi adapter)." },
  { id:"q29",t:"hardware",q:"Which hardware connects a LAN to the internet?",o:["Switch","WAP","Router","NIC"],a:"Router",fb:"A router connects the LAN to external networks. A switch only directs traffic within the LAN." },
  // LAN/WAN
  { id:"q30",t:"lan-wan",q:"True or False: LAN and WAN are defined by the number of computers connected.",o:["True","False"],a:"False",fb:"LANs and WANs are defined by geographical area and infrastructure ownership, NOT by device count. A WAN can have fewer devices than a LAN.",ex:"June 2025: 'A LAN and WAN are not defined by the number of computers that are connected.'",cm:true },
  { id:"q31",t:"lan-wan",q:"Which is a characteristic of a LAN?",o:["Large geographical area","Third-party infrastructure","Small geographical area using owned hardware","Always more devices than WAN"],a:"Small geographical area using owned hardware",fb:"A LAN covers a small geographical area (e.g. single building) using hardware owned/managed by the organisation." },
  { id:"q32",t:"lan-wan",q:"The internet is an example of which network type?",o:["LAN","WAN","PAN","MAN"],a:"WAN",fb:"The internet is a worldwide collection of computer networks — the largest WAN." },
  // DNS & Internet
  { id:"q33",t:"dns-internet",q:"What is the role of a DNS?",o:["Store web pages","Convert URL/domain into IP address","Encrypt data","Connect LAN to internet"],a:"Convert URL/domain into IP address",fb:"DNS converts human-readable URLs into IP addresses that computers use to locate servers.",ex:"June 2025: Some candidates said URL was sent to a web server instead of DNS." },
  { id:"q34",t:"dns-internet",q:"What happens if a DNS can't find the matching IP?",o:["Website loads anyway","Request sent to higher-level DNS","Computer guesses the IP","URL is deleted"],a:"Request sent to higher-level DNS",fb:"If the DNS doesn't have the URL, the request goes to a higher-level (larger) DNS. If none can find it, an error is returned." },
  { id:"q35",t:"dns-internet",q:"Which best describes cloud computing?",o:["Using a USB drive","Remote service provision (storage, software, processing)","A network topology","A data transfer protocol"],a:"Remote service provision (storage, software, processing)",fb:"The Cloud provides remote services including storage, software, and processing, accessed over the internet." },
  // Topologies
  { id:"q36",t:"topologies",q:"True or False: In a mesh topology, there is a central switch all devices connect to.",o:["True","False"],a:"False",fb:"That describes a star topology. In mesh, devices connect directly to one or more other devices — no central device, decentralised.",ex:"June 2025: Candidates confused mesh topology with client-server networks.",cm:true },
  { id:"q37",t:"topologies",q:"What happens to a star network if the central switch fails?",o:["Some devices lose connection","Entire network fails","Devices form a mesh","Nothing"],a:"Entire network fails",fb:"In star topology, all data passes through the central switch. If it fails, no device can communicate — the whole network goes down." },
  { id:"q38",t:"topologies",q:"Advantage of mesh over star topology?",o:["Cheaper","Easier to manage","No single point of failure — alternative routes exist","Fewer cables"],a:"No single point of failure — alternative routes exist",fb:"In mesh, multiple routes exist between devices. If one connection fails, data can reach its destination via alternative paths." },
  // Client-server/P2P
  { id:"q39",t:"client-server",q:"In client-server, what does the server do?",o:["Connects to internet","Provides centralised services (file storage, web pages, authentication)","Sends wireless signals","Connects networks"],a:"Provides centralised services (file storage, web pages, authentication)",fb:"Servers provide centralised services. Clients request and use these services." },
  { id:"q40",t:"client-server",q:"How are files shared in peer-to-peer?",o:["Stored on central server","Each device shares directly — no central server needed","Upload to cloud first","Only one device shares"],a:"Each device shares directly — no central server needed",fb:"In P2P, all devices are equal — each can act as both client and server, sharing files directly." },
  // MAC Address
  { id:"q41",t:"mac-address",q:"How many groups does a MAC address have?",o:["4","6","8","12"],a:"6",fb:"MAC address: 6 groups of 2-digit hexadecimal numbers (e.g. A1:B2:C3:D4:E5:F6), separated by colons/hyphens. 48 bits." },
  { id:"q42",t:"mac-address",q:"What does a MAC address contain?",o:["Device location","Manufacturer ID and unique serial number","IP and subnet mask","Network name and password"],a:"Manufacturer ID and unique serial number",fb:"First half = manufacturer ID, second half = unique serial number for that specific device." },
  // Standards
  { id:"q43",t:"standards",q:"Why are standards important in networking?",o:["Make networks faster","Allow hardware/software from different manufacturers to work together","Encrypt data automatically","Reduce protocols needed"],a:"Allow hardware/software from different manufacturers to work together",fb:"Standards ensure compatibility — hardware and software from different manufacturers can interact because they follow agreed rules." },
  // Layers
  { id:"q44",t:"layers",q:"Why are layers used in network protocols?",o:["Make networks faster","Each layer is independent — one can change without affecting others","Reduce cables needed","Encrypt at each stage"],a:"Each layer is independent — one can change without affecting others",fb:"Layers provide independence: one can be modified without affecting any other. Developers can specialise in individual layers.",ex:"June 2022/2023: Candidates struggled to explain why layers are used." },
  { id:"q45",t:"layers",q:"Another benefit of using layers?",o:["Cheaper networks","Manufacturers can develop hardware/software for a specific layer","Only one protocol needed","Removes need for standards"],a:"Manufacturers can develop hardware/software for a specific layer",fb:"Layers allow manufacturers to specialise and develop products for one particular layer." },
  // Performance
  { id:"q46",t:"performance",q:"Which factors affect network performance?",o:["Cable colour and monitor size","Number of devices and available bandwidth","Computer brand and OS","Time of day and weather"],a:"Number of devices and available bandwidth",fb:"More devices sharing bandwidth = less per device = reduced performance. Bandwidth = maximum data transfer rate." },
];

const SCENARIOS = [
  {
    id:"school",title:"School Network Upgrade",
    ctx:"Kings College School wants to upgrade their computer room with 30 desktops and allow students to use personal tablets.",
    qs:[
      {q:"Should the 30 desktops use wired or wireless?",o:["Wired","Wireless"],a:"Wired",m:3,ms:"Wired (1). Desktops are fixed/don't need mobility (1). Faster data transmission speeds / more reliable (1).",ga:"Wired because desktops don't need mobility and wired provides faster data transmission speeds.",pa:"'Wired because it's faster' — too vague. Must specify faster data transmission speeds."},
      {q:"Students log into a web-based email system. Which protocol for the login page?",o:["HTTP","HTTPS","SMTP","IMAP"],a:"HTTPS",m:1,ms:"HTTPS (1). Encrypts login credentials being transmitted."},
      {q:"What hardware is needed for tablets to connect wirelessly?",o:["Router","Switch","WAP","NIC"],a:"WAP",m:1,ms:"WAP (1). Creates wireless network for devices to connect to."},
      {q:"A teacher sends homework email. Which protocol sends it?",o:["POP","IMAP","SMTP","FTP"],a:"SMTP",m:1,ms:"SMTP (1). Simple Mail Transfer Protocol sends emails."},
      {q:"The network is a LAN. Identify two reasons why.",o:["Small area & owned hardware","Many computers & fast","Uses internet & wireless","Has server & passwords"],a:"Small area & owned hardware",m:2,ms:"Small geographical area / single building (1). Owns hardware / no third-party infrastructure (1)."},
    ]
  },
  {
    id:"gaming",title:"Home Gaming Setup",
    ctx:"Jamal has a gaming PC (next to router), Nintendo Switch (living room), and laptop. He wants the best online gaming experience.",
    qs:[
      {q:"Should Jamal's gaming PC use wired or wireless?",o:["Wired","Wireless"],a:"Wired",m:3,ms:"Wired (1). PC is next to router / doesn't need mobility (1). Faster transmission / lower latency for gaming (1).",ga:"Wired because PC is next to router, doesn't need mobility, and wired provides faster transmission and lower latency for gaming.",pa:"'Wired because it's better for gaming' — must explain WHY (faster transmission, lower latency)."},
      {q:"The Switch is in another room. What connection type?",o:["Wired (Ethernet)","Wireless (Wi-Fi)"],a:"Wireless (Wi-Fi)",m:1,ms:"Wireless (1). Device is away from router / portable / impractical to run cables."},
      {q:"Jamal types a URL. What's the first step in converting it to an IP?",o:["URL sent to web server","Browser checks cache for matching IP","Router converts URL","ISP encrypts URL"],a:"Browser checks cache for matching IP",m:1,ms:"Browser checks cache for matching IP address (1)."},
      {q:"What does the DNS do when it receives the URL?",o:["Displays web page","Looks up URL in database to find matching IP","Encrypts URL","Sends URL to all computers"],a:"Looks up URL in database to find matching IP",m:1,ms:"DNS looks for URL/domain to find matching IP in its database (1)."},
    ]
  },
  {
    id:"security",title:"Company Data Security",
    ctx:"A financial company transmits sensitive customer banking data across its network and over the internet to partners.",
    qs:[
      {q:"What does encryption do to the data?",o:["Prevents interception","Scrambles data using algorithm & key, meaningless without decryption key","Deletes after receipt","Compresses data"],a:"Scrambles data using algorithm & key, meaningless without decryption key",m:1,ms:"Data scrambled using algorithm and key (1). Meaningless without decryption key (1)."},
      {q:"'Encryption means no one can steal our data.' Correct?",o:["Yes — prevents all theft","No — data can still be intercepted but will be meaningless without key","Yes — can't be accessed","No — only works on wireless"],a:"No — data can still be intercepted but will be meaningless without key",m:2,ms:"Data can still be intercepted (1). Will be meaningless without key (1)."},
      {q:"Which protocol for secure file transfer to partners?",o:["HTTP","FTP","HTTPS","SMTP"],a:"HTTPS",m:1,ms:"HTTPS (1). Encrypts data during transmission."},
      {q:"Star topology disadvantage?",o:["Devices can't communicate","Central switch failure = entire network fails","Too many cables vs mesh","Max 10 devices"],a:"Central switch failure = entire network fails",m:1,ms:"Single point of failure — central switch fails, entire network fails (1)."},
    ]
  },
  {
    id:"airport",title:"Airport Wireless Network",
    ctx:"An airport sets up public Wi-Fi for passengers to browse, check emails, and download boarding passes using their own devices.",
    qs:[
      {q:"Wired or wireless for passenger devices?",o:["Wired","Wireless"],a:"Wireless",m:3,ms:"Wireless (1). Passengers use portable devices / move around (1). Impractical to provide wired to thousands of moving users (1).",ga:"Wireless because passengers use portable devices, move around the terminal, and wired connections for thousands of users would be impractical.",pa:"'Wireless because it's easier' — must explain WHY in context."},
      {q:"Describe MAC address format.",o:["4 groups denary, full stops","6 groups 2-digit hex, colons or hyphens","8 groups hex, colons","12 random characters, no separators"],a:"6 groups 2-digit hex, colons or hyphens",m:2,ms:"6 groups / 12 hex digits (1). Separated by colons/hyphens / hexadecimal (1)."},
      {q:"Protocol for the login page accepting terms?",o:["HTTP","HTTPS","FTP","POP"],a:"HTTPS",m:1,ms:"HTTPS (1). Secure / encrypts connection."},
      {q:"Protocol to retrieve a boarding pass email?",o:["SMTP","IMAP","FTP","HTTP"],a:"IMAP",m:1,ms:"IMAP or POP (1). Protocol for receiving/retrieving emails."},
    ]
  },
  {
    id:"library",title:"Library LAN Setup",
    ctx:"A public library sets up a network with 15 public computers and 5 staff computers in a single building, sharing a printer and internet.",
    qs:[
      {q:"Two characteristics making this a LAN not WAN?",o:["Small area & owns hardware","20 computers & uses internet","Uses passwords & has printer","Fast & uses Ethernet"],a:"Small area & owns hardware",m:2,ms:"Small geographical area / single building (1). Owns/manages hardware (1)."},
      {q:"Role of the central switch in star topology?",o:["Connects to internet","Stores files & manages accounts","Directs data to correct device using MAC addresses","Provides wireless"],a:"Directs data to correct device using MAC addresses",m:1,ms:"Directs data to correct device (1) using MAC addresses (1)."},
      {q:"'No one can see what I'm doing without encryption.' Correct?",o:["Yes — LAN data is private","No — without encryption, data can be intercepted and understood","Yes — switch encrypts automatically","No — only wireless can be intercepted"],a:"No — without encryption, data can be intercepted and understood",m:2,ms:"Data can be intercepted (1). Without encryption it can be read/understood (1)."},
      {q:"Star topology advantage when one computer has a fault?",o:["Auto-repaired","Only faulty computer affected, others work normally","All lose connection","Data rerouted through others"],a:"Only faulty computer affected, others work normally",m:1,ms:"If one device fails, it does not affect the rest of the network (1)."},
    ]
  },
  {
    id:"shopping",title:"Online Shopping Security",
    ctx:"Priya is shopping online and needs to enter credit card details to buy a dress. The URL starts with 'https://'.",
    qs:[
      {q:"What does the 'S' in HTTPS indicate?",o:["Sponsored","Secure — data encrypted during transmission","Faster loading","On a server"],a:"Secure — data encrypted during transmission",m:1,ms:"Secure / data is encrypted (1)."},
      {q:"Why use HTTPS not HTTP for credit card details?",o:["HTTP can't display forms","HTTPS encrypts data, so if intercepted card details are meaningless","HTTPS sites are trustworthy","HTTP is slower"],a:"HTTPS encrypts data, so if intercepted card details are meaningless",m:2,ms:"HTTPS encrypts data (1). If intercepted, meaningless without key (1)."},
      {q:"Protocol to send the order confirmation email?",o:["IMAP","POP","SMTP","FTP"],a:"SMTP",m:1,ms:"SMTP (1)."},
      {q:"Protocol when Priya retrieves the confirmation on her phone?",o:["SMTP","IMAP","HTTP","FTP"],a:"IMAP",m:1,ms:"IMAP or POP (1)."},
    ]
  },
  {
    id:"topology",title:"Network Topology Selection",
    ctx:"A new office is being set up. The network manager must choose between star and mesh topology for 50 desktop computers.",
    qs:[
      {q:"In star topology, what if the central switch fails?",o:["Only nearby devices affected","Entire network fails","Auto switch to P2P","Slows but continues"],a:"Entire network fails",m:1,ms:"All devices lose connectivity / entire network fails (1)."},
      {q:"Advantage of mesh for this office?",o:["Cheaper","Fewer cables","No single point of failure — multiple routes","Faster shared connection"],a:"No single point of failure — multiple routes",m:1,ms:"No single point of failure (1). Multiple paths/routes (1)."},
      {q:"'A mesh is where a server controls all devices.' Correct?",o:["Yes — mesh needs a server","No — mesh describes physical connections, not software management","Yes — all networks need servers","No — mesh means no connections"],a:"No — mesh describes physical connections, not software management",m:1,ms:"Mesh is topology (physical connections) not network management (1)."},
      {q:"Why might star be preferred over mesh for 50 computers?",o:["More reliable","Much less cabling — cheaper and easier to install/maintain","No disadvantages","No hardware needed"],a:"Much less cabling — cheaper and easier to install/maintain",m:1,ms:"Less cabling / cheaper to install (1). Easier to manage / add devices (1)."},
    ]
  },
  {
    id:"cloud",title:"Cloud Computing Decision",
    ctx:"A photography business stores client photos on a local server. They're considering cloud storage. 3 employees work from different locations.",
    qs:[
      {q:"What is cloud computing?",o:["USB storage","Remote service provision — storage, software, processing via internet","Network topology","Faster computer"],a:"Remote service provision — storage, software, processing via internet",m:1,ms:"Remote service provision (1). Storage, software, processing over internet."},
      {q:"One advantage of cloud for this business?",o:["Access from one location only","Access from any location with internet","Always free","No internet needed"],a:"Access from any location with internet",m:1,ms:"Access from anywhere with internet (1)."},
      {q:"One disadvantage of cloud?",o:["Auto-encrypted","Requires internet — if it fails, files unavailable","Faster than local","Uses less electricity"],a:"Requires internet — if it fails, files unavailable",m:1,ms:"Requires internet / no access if it fails (1)."},
      {q:"Why is HTTPS important for the client photo gallery?",o:["Faster loading","Encrypts data between browser and server, protecting login details","Required by law","Prevents crashes"],a:"Encrypts data between browser and server, protecting login details",m:1,ms:"HTTPS encrypts data during transmission (1)."},
    ]
  },
];

const SPECS = [
  {id:"1.3.1-lan",u:"1.3.1",l:"LAN characteristics",ts:["lan-wan"],kf:["Small geographical area (e.g. single building)","Uses hardware owned/managed by the organisation","NOT defined by number of devices"],cm:"Defining LAN/WAN by number of computers rather than geographical area and infrastructure ownership.",eq:"Identify two reasons why a school network is a LAN.",ms:"Small geographical area (1). Owns hardware (1)."},
  {id:"1.3.1-wan",u:"1.3.1",l:"WAN characteristics",ts:["lan-wan"],kf:["Covers a large geographical area","Uses third-party infrastructure","The internet is the largest WAN"],cm:"Saying a WAN always has more devices than a LAN.",eq:"The internet is an example of which type of network?",ms:"WAN (1). Worldwide collection of networks."},
  {id:"1.3.1-perf",u:"1.3.1",l:"Network performance factors",ts:["performance"],kf:["Number of devices (more = less bandwidth per device)","Available bandwidth (max data transfer rate)","Type of connection (wired generally faster)"],cm:"Not specifying what 'speed' means. Always say 'data transmission speed'.",eq:"State two factors affecting network performance.",ms:"Number of devices (1). Bandwidth (1)."},
  {id:"1.3.1-cs",u:"1.3.1",l:"Client-server networks",ts:["client-server"],kf:["Server provides centralised services","Clients request/use services","Centralised management and backup"],cm:"Confusing client-server (software) with star topology (physical).",eq:"Describe the role of a server.",ms:"Provides services to clients (1). E.g. file storage, web pages (1)."},
  {id:"1.3.1-p2p",u:"1.3.1",l:"Peer-to-peer networks",ts:["client-server"],kf:["All devices are equal","No dedicated central server","Files shared directly between devices"],cm:"Saying P2P has no security at all.",eq:"How are files shared in peer-to-peer?",ms:"Each device shares directly with others (1). No central server (1)."},
  {id:"1.3.1-wap",u:"1.3.1",l:"WAP",ts:["hardware"],kf:["Creates wireless network for devices","Converts wired to wireless signals","Needed for wireless device access"],cm:"Confusing WAP with router.",eq:"What hardware for wireless tablet connections?",ms:"WAP (1)."},
  {id:"1.3.1-router",u:"1.3.1",l:"Router",ts:["hardware"],kf:["Connects different networks together","Directs data between networks using IPs","Essential for internet access"],cm:"Saying a router 'gives Wi-Fi'. That's the WAP function.",eq:"Hardware to connect LAN to internet?",ms:"Router (1)."},
  {id:"1.3.1-switch",u:"1.3.1",l:"Switch",ts:["hardware"],kf:["Directs data to correct device in LAN","Uses MAC addresses","Does NOT store data or provide services"],cm:"Confusing switch with server.",eq:"Role of a switch in a LAN?",ms:"Directs data using MAC addresses (1)."},
  {id:"1.3.1-nic",u:"1.3.1",l:"NIC",ts:["hardware"],kf:["Allows device to connect to network","Can be wired or wireless","Every networked device needs one"],cm:"Forgetting NICs can be both wired and wireless.",eq:"What does a NIC do?",ms:"Connect a device to a network (1)."},
  {id:"1.3.1-media",u:"1.3.1",l:"Transmission media",ts:["hardware","wired-wireless"],kf:["Physical medium for data (copper, fibre optic, wireless)","Different speeds and costs","Choice depends on requirements"],cm:"Not recognising wireless as transmission media.",eq:"Example of transmission medium?",ms:"Ethernet / copper / fibre optic / wireless (1)."},
  {id:"1.3.1-dns",u:"1.3.1",l:"DNS and URL→IP conversion",ts:["dns-internet"],kf:["Converts URLs into IP addresses","Made of multiple Domain Name Servers","Process: cache → DNS → higher DNS → IP returned"],cm:"Saying URL goes to web server. It goes to DNS first.",eq:"Describe DNS URL to IP conversion steps.",ms:"Browser checks cache (1). URL to DNS (1). DNS looks up IP (1). Higher DNS if not found (1)."},
  {id:"1.3.1-cloud",u:"1.3.1",l:"Hosting, cloud, servers & clients",ts:["dns-internet"],kf:["Web server → web pages; file server → file storage","Clients request services from servers","Cloud = remote service provision"],cm:"Forgetting cloud disadvantages: needs internet, ongoing costs.",eq:"Describe cloud computing.",ms:"Remote service provision (1). Storage, software, processing via internet (1)."},
  {id:"1.3.1-star",u:"1.3.1",l:"Star topology",ts:["topologies"],kf:["All devices connect to central switch","One device failing doesn't affect others","Central switch = single point of failure"],cm:"Not stating CENTRAL SWITCH failing brings down network.",eq:"Advantage and disadvantage of star?",ms:"Device failure doesn't affect network (1). Central switch failure = total failure (1)."},
  {id:"1.3.1-mesh",u:"1.3.1",l:"Mesh topology",ts:["topologies"],kf:["Devices connected to one or more others directly","No single point of failure","More cabling, more expensive"],cm:"Confusing mesh (physical) with client-server (software).",eq:"Describe a mesh topology.",ms:"Devices connected to others (1). No central device (1). Multiple routes (1)."},
  {id:"1.3.2-ww",u:"1.3.2",l:"Wired vs wireless",ts:["wired-wireless"],kf:["Wired: faster transmission, reliable, secure, fixed","Wireless: portable, no cables, slower, less reliable","Must recommend for given scenarios"],cm:"Saying 'slower' without specifying 'slower data transmission speed'.",eq:"Compare wired and wireless.",ms:"Wired: faster transmission (1). Wireless: mobility (1)."},
  {id:"1.3.2-enc",u:"1.3.2",l:"Encryption",ts:["encryption"],kf:["Scrambles data using algorithm and key","CAN be intercepted — will be MEANINGLESS without key","Does NOT prevent interception"],cm:"Saying 'stops interception' or 'cannot be read'. Data CAN be intercepted and opened — just meaningless.",eq:"Why should a library use encryption?",ms:"Data can be intercepted (1). Will be meaningless without key (1)."},
  {id:"1.3.2-ipv4",u:"1.3.2",l:"IPv4 format",ts:["ipv4"],kf:["4 groups of denary numbers","Each group: 0 to 255","Separated by full stops"],cm:"Accepting numbers above 255 as valid.",eq:"Give a valid IPv4 address.",ms:"4 groups, 0-255, full stops (1). E.g. 192.168.1.1 (1)."},
  {id:"1.3.2-ipv6",u:"1.3.2",l:"IPv6 format",ts:["ipv6"],kf:["8 groups of hexadecimal numbers","Each group: 0000 to FFFF","Separated by colons"],cm:"Saying 6 groups or using full stops instead of colons.",eq:"Describe IPv6 format.",ms:"8 groups (1). Hex 0-FFFF (1). Colons (1)."},
  {id:"1.3.2-mac",u:"1.3.2",l:"MAC address format",ts:["mac-address"],kf:["6 groups of 2-digit hex numbers","Colons or hyphens separator","First half = manufacturer, second = serial number"],cm:"Confusing MAC format with IP address format.",eq:"Describe MAC address format.",ms:"6 groups (1). Hexadecimal (1). Colons/hyphens (1)."},
  {id:"1.3.2-std",u:"1.3.2",l:"Standards",ts:["standards"],kf:["Agreed rules for areas of computing","Allow different manufacturers to work together","Ensure compatibility/interoperability"],cm:"Confusing standards (broad framework) with protocols (specific rules).",eq:"Why are standards important?",ms:"Allow different manufacturers' products to work together (1)."},
  {id:"1.3.2-http",u:"1.3.2",l:"HTTP & HTTPS",ts:["protocols"],kf:["HTTP: web pages, not encrypted","HTTPS: web pages WITH encryption (S=Secure)","HTTPS essential for sensitive data"],cm:"Using HTTP when security needed. Missing the 'S'.",eq:"Protocol for accessing website securely?",ms:"HTTPS (1). Not HTTP."},
  {id:"1.3.2-ftp",u:"1.3.2",l:"FTP",ts:["protocols"],kf:["File Transfer Protocol","Uploads/downloads files to/from server","No encryption by default"],cm:"Confusing FTP with email protocols.",eq:"Protocol to download a file?",ms:"FTP (1). Also accept HTTP/HTTPS."},
  {id:"1.3.2-smtp",u:"1.3.2",l:"SMTP",ts:["protocols"],kf:["Simple Mail Transfer Protocol — SENDS emails","Sender to mail server","Does NOT receive (that's POP/IMAP)"],cm:"Using SMTP to receive emails. SMTP = sending ONLY.",eq:"Protocol to send an email?",ms:"SMTP (1)."},
  {id:"1.3.2-pop-imap",u:"1.3.2",l:"POP & IMAP",ts:["protocols"],kf:["Both RECEIVE/RETRIEVE emails","POP: downloads, usually deletes from server","IMAP: keeps on server, syncs across devices"],cm:"Using SMTP to check emails.",eq:"Protocol to check inbox?",ms:"IMAP or POP (1)."},
  {id:"1.3.2-tcpip",u:"1.3.2",l:"TCP/IP",ts:["protocols"],kf:["Transmission Control Protocol / Internet Protocol","Fundamental internet communication suite","TCP = reliable delivery; IP = addressing/routing"],cm:"Not knowing the full name.",eq:"What does TCP/IP stand for?",ms:"Transmission Control Protocol / Internet Protocol (1)."},
  {id:"1.3.2-layers",u:"1.3.2",l:"Concept of layers",ts:["layers"],kf:["Each layer independent — changeable without affecting others","Developers can specialise in one layer","Manufacturers build for specific layers"],cm:"Knowing what layers ARE but not WHY they're used.",eq:"Two reasons protocols have layers?",ms:"Independent / one changes without affecting others (1). Developers specialise (1)."},
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function App() {
  const [sec, setSec] = useState("qc");
  const [prog, setProg] = useState({qc:{},sc:[],sp:{}});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const a = await window.storage.get("net-qc"); const b = await window.storage.get("net-sc"); const c = await window.storage.get("net-sp");
        setProg({qc:a?JSON.parse(a.value):{},sc:b?JSON.parse(b.value):[],sp:c?JSON.parse(c.value):{}});
      } catch { setProg({qc:{},sc:[],sp:{}}); }
      setReady(true);
    })();
  }, []);

  const save = useCallback(async (p) => {
    setProg(p);
    try { await window.storage.set("net-qc",JSON.stringify(p.qc)); await window.storage.set("net-sc",JSON.stringify(p.sc)); await window.storage.set("net-sp",JSON.stringify(p.sp)); } catch {}
  }, []);

  const onQCAnswer = useCallback((topic, correct) => {
    setProg(prev => {
      const qc = {...prev.qc};
      if (!qc[topic]) qc[topic] = {c:0,t:0};
      qc[topic] = {c:qc[topic].c+(correct?1:0), t:qc[topic].t+1};
      const sp = {...prev.sp};
      SPECS.filter(s=>s.ts.includes(topic)).forEach(spec => {
        const d = qc[topic];
        if (d && d.t >= 2) sp[spec.id] = (d.c/d.t) >= 0.75 ? "confident" : "needs-practice";
        else if (d) sp[spec.id] = "needs-practice";
      });
      const np = {...prev, qc, sp};
      (async()=>{try{await window.storage.set("net-qc",JSON.stringify(qc));await window.storage.set("net-sp",JSON.stringify(sp));}catch{}})();
      return np;
    });
  }, []);

  const onSCDone = useCallback((id) => {
    setProg(prev => {
      const sc = prev.sc.includes(id)?prev.sc:[...prev.sc,id];
      const np = {...prev,sc};
      (async()=>{try{await window.storage.set("net-sc",JSON.stringify(sc));}catch{}})();
      return np;
    });
  }, []);

  const reset = async () => {
    const e = {qc:{},sc:[],sp:{}};
    setProg(e);
    try{await window.storage.set("net-qc","{}");await window.storage.set("net-sc","[]");await window.storage.set("net-sp","{}");} catch{}
  };

  const tq = Object.values(prog.qc).reduce((a,x)=>a+x.t,0);
  const tc = Object.values(prog.qc).reduce((a,x)=>a+x.c,0);
  const sConf = Object.values(prog.sp).filter(s=>s==="confident").length;
  const sNP = Object.values(prog.sp).filter(s=>s==="needs-practice").length;

  if (!ready) return <div style={{fontFamily:FF,padding:40,textAlign:"center",color:C.muted}}>Loading dashboard...</div>;

  return (
    <div style={{background:C.bg,padding:"20px 12px",minHeight:"100vh",fontFamily:FF}}>
      <header style={{textAlign:"center",marginBottom:24}}>
        <h1 style={{fontSize:"1.9rem",fontWeight:700,color:C.primary,margin:0}}>OCR J277 Networks Dashboard</h1>
        <h2 style={{fontSize:"1rem",fontWeight:400,color:C.muted,margin:"6px 0 0"}}>Units 1.3.1 & 1.3.2 — Knowledge Check & Revision</h2>
        <p style={{fontSize:"0.9rem",fontWeight:600,color:C.primary,opacity:0.8,marginTop:4}}>Kings College School • Computer Science</p>
      </header>

      {/* Stats */}
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
        {[
          {v:tq,l:"Questions Done",s:tq>0?`${Math.round(tc/tq*100)}% correct`:"Get started!"},
          {v:`${prog.sc.length}/${SCENARIOS.length}`,l:"Scenarios Complete"},
          {v:`${sConf}/${SPECS.length}`,l:"Spec Confident",s:sNP>0?`${sNP} need practice`:""},
        ].map((s,i)=>(
          <div key={i} style={{background:C.white,borderRadius:12,padding:"12px 16px",boxShadow:"0 2px 6px rgba(0,0,0,0.05)",textAlign:"center",minWidth:120,flex:"1 1 120px",maxWidth:200}}>
            <div style={{fontSize:"1.2rem",fontWeight:700,color:C.primary}}>{s.v}</div>
            <div style={{fontSize:"0.75rem",color:C.muted,marginTop:2}}>{s.l}</div>
            {s.s&&<div style={{fontSize:"0.7rem",color:C.accent,fontWeight:600,marginTop:1}}>{s.s}</div>}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{background:C.white,borderRadius:16,boxShadow:"0 4px 12px rgba(0,0,0,0.08)",padding:"20px 16px",maxWidth:860,margin:"0 auto"}}>
        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
          {[{id:"qc",l:"Quick Checks"},{id:"sc",l:"Scenarios"},{id:"sp",l:"Spec Tracker"}].map(tab=>(
            <button key={tab.id} onClick={()=>setSec(tab.id)} style={{
              background:sec===tab.id?C.primary:C.secondary, color:sec===tab.id?C.white:C.muted,
              border:"none",borderRadius:8,padding:"10px 18px",fontWeight:600,fontSize:"0.85rem",cursor:"pointer",flex:"1 1 80px",transition:"all 0.2s"
            }}>{tab.l}</button>
          ))}
          <button onClick={reset} style={{background:"transparent",border:`1px solid ${C.secondary}`,borderRadius:8,padding:"10px 12px",fontSize:"0.7rem",color:C.muted,cursor:"pointer"}} title="Reset progress">Reset</button>
        </div>

        {sec==="qc" && <QCSection prog={prog.qc} onAns={onQCAnswer}/>}
        {sec==="sc" && <SCSection done={prog.sc} onDone={onSCDone}/>}
        {sec==="sp" && <SPSection status={prog.sp} qcProg={prog.qc} onAns={onQCAnswer}/>}
      </div>
      <footer style={{textAlign:"center",marginTop:20,fontSize:"0.7rem",color:C.muted}}>OCR J277 GCSE Computer Science • Revision Tool</footer>
    </div>
  );
}

// ─── QUICK CHECK ───────────────────────────────────────────────────────────────

function QCSection({prog,onAns}) {
  const [cur, setCur] = useState(null);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const [filt, setFilt] = useState("all");

  const next = useCallback(() => {
    let pool = filt==="all" ? QS : QS.filter(q=>q.t===filt);
    if (!pool.length) pool = QS;
    setCur(pool[Math.floor(Math.random()*pool.length)]);
    setSel(null); setDone(false);
  }, [filt]);

  useEffect(()=>{next();},[filt]);

  if (!cur) return null;
  const correct = sel === cur.a;
  const tp = prog[cur.t];

  const check = () => { if(sel===null)return; setDone(true); onAns(cur.t, sel===cur.a); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <h3 style={{fontSize:"1.2rem",fontWeight:600,color:C.text,margin:0}}>Quick Knowledge Checks</h3>
        <select value={filt} onChange={e=>setFilt(e.target.value)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${C.secondary}`,fontSize:"0.8rem",color:C.text}}>
          <option value="all">All Topics</option>
          {Object.entries(TL).map(([k,v])=><option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {tp && <div style={{background:C.bg,borderRadius:8,padding:"6px 12px",marginBottom:12,fontSize:"0.8rem",color:C.muted}}>
        {TL[cur.t]}: {tp.c}/{tp.t} correct ({tp.t>0?Math.round(tp.c/tp.t*100):0}%)
      </div>}

      <div style={{background:C.bg,borderRadius:12,padding:20,marginBottom:14}}>
        <div style={{fontSize:"0.7rem",fontWeight:600,color:C.accent,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>{TL[cur.t]}</div>
        <p style={{fontSize:"1rem",fontWeight:600,color:C.text,lineHeight:1.5,margin:"0 0 14px"}}>{cur.q}</p>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {cur.o.map(o => {
            let bg=C.white, bd=`2px solid ${C.secondary}`;
            if(done){
              if(o===cur.a){bg="#E8F8F0";bd=`2px solid ${C.success}`;}
              else if(o===sel&&!correct){bg="#FDE8E8";bd=`2px solid ${C.error}`;}
            } else if(o===sel){bg="#E8F0F8";bd=`2px solid ${C.primary}`;}
            return <button key={o} onClick={()=>!done&&setSel(o)} style={{background:bg,border:bd,borderRadius:8,padding:"10px 14px",textAlign:"left",cursor:done?"default":"pointer",fontSize:"0.9rem",color:C.text,fontWeight:o===sel?600:400,transition:"all 0.15s"}}>{o}</button>;
          })}
        </div>
      </div>

      {!done ? (
        <button onClick={check} disabled={sel===null} style={{background:sel===null?C.secondary:C.accent,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontWeight:600,fontSize:"0.9rem",cursor:sel===null?"not-allowed":"pointer",width:"100%"}}>Check Answer</button>
      ) : (
        <>
          <div style={{background:correct?"#E8F8F0":"#FDE8E8",border:`2px solid ${correct?C.success:C.error}`,borderRadius:12,padding:16,marginBottom:12}}>
            <div style={{fontWeight:700,color:correct?C.success:C.error,marginBottom:6}}>{correct?"✓ Correct!":"✗ Incorrect"}</div>
            <p style={{fontSize:"0.9rem",color:C.text,lineHeight:1.6,margin:0}}>{cur.fb}</p>
          </div>
          {cur.ex && <div style={{background:"#FFF8E1",border:`1px solid ${C.warning}`,borderRadius:8,padding:"10px 14px",marginBottom:12}}>
            <span style={{fontWeight:600,fontSize:"0.75rem",color:"#8B6914"}}>📋 Examiner Intelligence: </span>
            <span style={{fontSize:"0.8rem",color:C.text}}>{cur.ex}</span>
          </div>}
          {cur.cm && !correct && <div style={{background:"#FFF3E0",border:"1px solid #FF9800",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:"0.8rem"}}>
            <span style={{fontWeight:700,color:"#E65100"}}>⚠ Common Mistake — </span>
            <span style={{color:C.text}}>This error appears frequently in OCR exams. Learn the correct answer.</span>
          </div>}
          <button onClick={next} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontWeight:600,fontSize:"0.9rem",cursor:"pointer",width:"100%"}}>Next Question →</button>
        </>
      )}
    </div>
  );
}

// ─── SCENARIO SECTION ──────────────────────────────────────────────────────────

function SCSection({done,onDone}) {
  const [active,setActive] = useState(null);
  const [qi,setQi] = useState(0);
  const [sel,setSel] = useState(null);
  const [answered,setAnswered] = useState(false);
  const [scores,setScores] = useState([]);
  const [fin,setFin] = useState(false);

  const sc = active ? SCENARIOS.find(s=>s.id===active) : null;
  const cq = sc ? sc.qs[qi] : null;

  const start = (id) => { setActive(id); setQi(0); setSel(null); setAnswered(false); setScores([]); setFin(false); };

  const check = () => {
    if(sel===null) return;
    setAnswered(true);
    setScores(p=>[...p,{ok:sel===cq.a,got:sel===cq.a?cq.m:0,max:cq.m}]);
  };

  const goNext = () => {
    if(qi+1>=sc.qs.length){setFin(true);onDone(active);}
    else{setQi(qi+1);setSel(null);setAnswered(false);}
  };

  if(!active) return (
    <div>
      <h3 style={{fontSize:"1.2rem",fontWeight:600,color:C.text,margin:"0 0 6px"}}>Scenario Problem Solver</h3>
      <p style={{color:C.muted,fontSize:"0.85rem",margin:"0 0 16px",lineHeight:1.5}}>Realistic exam-style scenarios with multiple decisions and examiner-quality feedback.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SCENARIOS.map(s=>{
          const d=done.includes(s.id);
          const tm=s.qs.reduce((a,q)=>a+q.m,0);
          return (
            <div key={s.id} style={{background:C.bg,borderRadius:12,padding:16,border:d?`2px solid ${C.success}`:"2px solid transparent"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <div style={{flex:1,minWidth:200}}>
                  <h4 style={{margin:0,fontSize:"0.95rem",fontWeight:600,color:C.text}}>{d&&<span style={{color:C.success}}>✓ </span>}{s.title}</h4>
                  <p style={{margin:"3px 0 0",fontSize:"0.8rem",color:C.muted,lineHeight:1.4}}>{s.ctx.substring(0,90)}...</p>
                  <span style={{fontSize:"0.7rem",color:C.accent,fontWeight:600}}>{s.qs.length} questions • {tm} marks</span>
                </div>
                <button onClick={()=>start(s.id)} style={{background:d?C.white:C.accent,color:d?C.primary:C.white,border:d?`2px solid ${C.primary}`:"none",borderRadius:8,padding:"8px 18px",fontWeight:600,fontSize:"0.8rem",cursor:"pointer"}}>{d?"Retry":"Start"}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(fin){
    const got=scores.reduce((a,s)=>a+s.got,0), max=scores.reduce((a,s)=>a+s.max,0), pct=Math.round(got/max*100);
    return (
      <div>
        <h3 style={{fontSize:"1.2rem",fontWeight:600,color:C.text,margin:"0 0 14px"}}>{sc.title} — Complete!</h3>
        <div style={{background:pct>=75?"#E8F8F0":pct>=50?"#FFF8E1":"#FDE8E8",borderRadius:12,padding:20,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:"1.8rem",fontWeight:700,color:pct>=75?C.success:pct>=50?"#8B6914":C.error}}>{got}/{max}</div>
          <div style={{fontSize:"0.85rem",color:C.muted,marginTop:4}}>{pct}% — {pct>=75?"Excellent work!":pct>=50?"Good effort — review the feedback.":"Keep practising — focus on weak areas."}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
          {scores.map((s,i)=>(<div key={i} style={{fontSize:"0.8rem",color:C.text}}><span style={{color:s.ok?C.success:C.error,fontWeight:700}}>{s.ok?"✓":"✗"}</span> Q{i+1}: {s.got}/{s.max}</div>))}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={()=>start(active)} style={{background:C.accent,color:C.white,border:"none",borderRadius:8,padding:"10px 20px",fontWeight:600,cursor:"pointer",flex:1}}>Retry</button>
          <button onClick={()=>setActive(null)} style={{background:C.white,color:C.primary,border:`2px solid ${C.primary}`,borderRadius:8,padding:"10px 20px",fontWeight:600,cursor:"pointer",flex:1}}>All Scenarios</button>
        </div>
      </div>
    );
  }

  const ok = sel===cq.a;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:6}}>
        <h3 style={{fontSize:"1.1rem",fontWeight:600,color:C.text,margin:0}}>{sc.title}</h3>
        <span style={{fontSize:"0.75rem",color:C.muted}}>Q{qi+1}/{sc.qs.length}</span>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        {sc.qs.map((_,i)=>(<div key={i} style={{width:10,height:10,borderRadius:"50%",background:i<qi?(scores[i]?.ok?C.success:C.error):i===qi?C.accent:C.secondary}}/>))}
      </div>
      <div style={{background:"#E8F0F8",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:"0.85rem",lineHeight:1.5,color:C.text}}>
        <strong>Context:</strong> {sc.ctx}
      </div>
      <div style={{background:C.bg,borderRadius:12,padding:16,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <p style={{fontSize:"0.95rem",fontWeight:600,color:C.text,lineHeight:1.5,margin:0,flex:1}}>{cq.q}</p>
          <span style={{fontSize:"0.7rem",color:C.accent,fontWeight:600,whiteSpace:"nowrap",marginLeft:10}}>[{cq.m} mark{cq.m>1?"s":""}]</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {cq.o.map(o=>{
            let bg=C.white,bd=`2px solid ${C.secondary}`;
            if(answered){if(o===cq.a){bg="#E8F8F0";bd=`2px solid ${C.success}`;}else if(o===sel&&!ok){bg="#FDE8E8";bd=`2px solid ${C.error}`;}}
            else if(o===sel){bg="#E8F0F8";bd=`2px solid ${C.primary}`;}
            return <button key={o} onClick={()=>!answered&&setSel(o)} style={{background:bg,border:bd,borderRadius:8,padding:"10px 14px",textAlign:"left",cursor:answered?"default":"pointer",fontSize:"0.85rem",color:C.text,fontWeight:o===sel?600:400}}>{o}</button>;
          })}
        </div>
      </div>

      {!answered ? (
        <button onClick={check} disabled={sel===null} style={{background:sel===null?C.secondary:C.accent,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontWeight:600,cursor:sel===null?"not-allowed":"pointer",width:"100%",fontSize:"0.9rem"}}>Check Answer</button>
      ):(
        <>
          <div style={{background:ok?"#E8F8F0":"#FDE8E8",border:`2px solid ${ok?C.success:C.error}`,borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{fontWeight:700,color:ok?C.success:C.error,marginBottom:4}}>{ok?`✓ Correct — ${cq.m}/${cq.m} marks`:`✗ Incorrect — 0/${cq.m} marks`}</div>
          </div>
          <div style={{background:"#F0F4F8",borderRadius:8,padding:"10px 14px",marginBottom:10,fontSize:"0.8rem"}}>
            <span style={{fontWeight:600,color:C.primary}}>Mark Scheme: </span><span style={{color:C.text}}>{cq.ms}</span>
          </div>
          {cq.ga && (
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
              <div style={{background:"#E8F8F0",borderRadius:8,padding:"8px 12px",fontSize:"0.8rem"}}><span style={{fontWeight:600,color:C.success}}>✓ Full marks: </span>{cq.ga}</div>
              {cq.pa && <div style={{background:"#FDE8E8",borderRadius:8,padding:"8px 12px",fontSize:"0.8rem"}}><span style={{fontWeight:600,color:C.error}}>✗ Weak: </span>{cq.pa}</div>}
            </div>
          )}
          <button onClick={goNext} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontWeight:600,cursor:"pointer",width:"100%",fontSize:"0.9rem"}}>
            {qi+1>=sc.qs.length?"See Results":"Next Question →"}
          </button>
        </>
      )}
      <button onClick={()=>setActive(null)} style={{background:"transparent",border:"none",color:C.muted,fontSize:"0.75rem",cursor:"pointer",marginTop:10,textDecoration:"underline"}}>← Back to scenarios</button>
    </div>
  );
}

// ─── SPEC TRACKER ──────────────────────────────────────────────────────────────

function SPSection({status,qcProg,onAns}) {
  const [exp,setExp] = useState(null);
  const [qtQ,setQtQ] = useState(null);
  const [qtS,setQtS] = useState(null);
  const [qtD,setQtD] = useState(false);

  const gs = (id) => status[id]||"not-started";
  const si = (s) => s==="confident"?"✅":s==="needs-practice"?"⚠️":"⬜";
  const sl = (s) => s==="confident"?"Confident":s==="needs-practice"?"Needs Practice":"Not Started";
  const sc = (s) => s==="confident"?C.success:s==="needs-practice"?C.warning:C.secondary;

  const doQT = (spec) => {
    const pool = QS.filter(q=>spec.ts.includes(q.t));
    if(pool.length){setQtQ(pool[Math.floor(Math.random()*pool.length)]);setQtS(null);setQtD(false);}
  };

  const checkQT = () => {
    if(qtS===null) return;
    setQtD(true);
    onAns(qtQ.t, qtS===qtQ.a);
  };

  const units = [{id:"1.3.1",l:"1.3.1 Networks and Topologies"},{id:"1.3.2",l:"1.3.2 Wired/Wireless, Protocols & Layers"}];

  return (
    <div>
      <h3 style={{fontSize:"1.2rem",fontWeight:600,color:C.text,margin:"0 0 6px"}}>Specification Coverage Tracker</h3>
      <p style={{color:C.muted,fontSize:"0.8rem",margin:"0 0 16px",lineHeight:1.5}}>Click any topic for key facts, common mistakes, and a quick test. Status auto-updates from your answers.</p>
      <div style={{display:"flex",gap:14,marginBottom:16,flexWrap:"wrap",fontSize:"0.75rem",color:C.muted}}>
        <span>⬜ Not Started</span><span>⚠️ Needs Practice</span><span>✅ Confident</span>
      </div>

      {units.map(unit=>{
        const pts=SPECS.filter(s=>s.u===unit.id);
        const conf=pts.filter(p=>gs(p.id)==="confident").length;
        return (
          <div key={unit.id} style={{marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <h4 style={{margin:0,fontSize:"0.95rem",fontWeight:600,color:C.primary}}>{unit.l}</h4>
              <span style={{fontSize:"0.7rem",color:C.muted}}>{conf}/{pts.length} confident</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {pts.map(spec=>{
                const st=gs(spec.id); const isExp=exp===spec.id;
                return (
                  <div key={spec.id}>
                    <button onClick={()=>{setExp(isExp?null:spec.id);setQtQ(null);}} style={{
                      width:"100%",textAlign:"left",background:isExp?"#E8F0F8":C.bg,
                      border:isExp?`1px solid ${C.primary}`:"1px solid transparent",
                      borderRadius:8,padding:"8px 12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"
                    }}>
                      <span style={{fontSize:"0.85rem",color:C.text}}>{si(st)} {spec.l}</span>
                      <span style={{fontSize:"0.65rem",fontWeight:600,padding:"2px 7px",borderRadius:4,background:sc(st)+"22",color:st==="not-started"?C.muted:sc(st)}}>{sl(st)}</span>
                    </button>

                    {isExp && (
                      <div style={{background:C.white,border:`1px solid ${C.secondary}`,borderRadius:"0 0 8px 8px",padding:14,marginTop:-3}}>
                        <div style={{marginBottom:10}}>
                          <h5 style={{margin:"0 0 5px",fontSize:"0.8rem",fontWeight:600,color:C.primary}}>Key Facts</h5>
                          {spec.kf.map((f,i)=>(<div key={i} style={{fontSize:"0.8rem",color:C.text,lineHeight:1.5,padding:"2px 0 2px 10px",borderLeft:`3px solid ${C.accent}`,marginBottom:3}}>{f}</div>))}
                        </div>
                        <div style={{background:"#FFF3E0",borderRadius:6,padding:"8px 10px",marginBottom:10}}>
                          <span style={{fontWeight:600,fontSize:"0.75rem",color:"#E65100"}}>⚠ Common Mistake: </span>
                          <span style={{fontSize:"0.8rem",color:C.text}}>{spec.cm}</span>
                        </div>
                        <div style={{background:"#F0F4F8",borderRadius:6,padding:"8px 10px",marginBottom:10,fontSize:"0.8rem"}}>
                          <div style={{fontWeight:600,color:C.primary,marginBottom:3}}>Example Exam Question:</div>
                          <div style={{color:C.text,fontStyle:"italic"}}>{spec.eq}</div>
                          <div style={{color:C.muted,marginTop:3}}>Mark scheme: {spec.ms}</div>
                        </div>

                        {!qtQ ? (
                          <button onClick={()=>doQT(spec)} style={{background:C.accent,color:C.white,border:"none",borderRadius:8,padding:"8px 16px",fontWeight:600,fontSize:"0.8rem",cursor:"pointer"}}>Quick Test — Try a Question</button>
                        ) : (
                          <div style={{background:C.bg,borderRadius:8,padding:14}}>
                            <p style={{fontSize:"0.85rem",fontWeight:600,color:C.text,margin:"0 0 8px"}}>{qtQ.q}</p>
                            <div style={{display:"flex",flexDirection:"column",gap:5}}>
                              {qtQ.o.map(o=>{
                                let bg=C.white,bd=`1px solid ${C.secondary}`;
                                if(qtD){if(o===qtQ.a){bg="#E8F8F0";bd=`2px solid ${C.success}`;}else if(o===qtS&&qtS!==qtQ.a){bg="#FDE8E8";bd=`2px solid ${C.error}`;}}
                                else if(o===qtS){bg="#E8F0F8";bd=`2px solid ${C.primary}`;}
                                return <button key={o} onClick={()=>!qtD&&setQtS(o)} style={{background:bg,border:bd,borderRadius:6,padding:"8px 12px",textAlign:"left",cursor:qtD?"default":"pointer",fontSize:"0.8rem",color:C.text,fontWeight:o===qtS?600:400}}>{o}</button>;
                              })}
                            </div>
                            {!qtD ? (
                              <button onClick={checkQT} disabled={qtS===null} style={{marginTop:8,background:qtS===null?C.secondary:C.accent,color:C.white,border:"none",borderRadius:8,padding:"8px 16px",fontWeight:600,fontSize:"0.8rem",cursor:qtS===null?"not-allowed":"pointer",width:"100%"}}>Check</button>
                            ) : (
                              <div style={{marginTop:8,background:qtS===qtQ.a?"#E8F8F0":"#FDE8E8",border:`2px solid ${qtS===qtQ.a?C.success:C.error}`,borderRadius:8,padding:10}}>
                                <div style={{fontWeight:700,fontSize:"0.85rem",color:qtS===qtQ.a?C.success:C.error,marginBottom:4}}>{qtS===qtQ.a?"✓ Correct!":"✗ Incorrect"}</div>
                                <p style={{fontSize:"0.8rem",color:C.text,margin:0,lineHeight:1.5}}>{qtQ.fb}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
