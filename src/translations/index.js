export const t = {
  en: {
    nav: {
      overview: 'Overview', features: 'Features', docs: 'Docs',
      aiEngine: 'AI Engine', dataset: 'Dataset', author: 'Author',
    },
    hero: {
      badge: 'v1.0 — Open Source Cybersecurity Tool',
      title1: 'Smart Network', title2: 'Mapper',
      subtitle: 'Next-Generation Network Diagnostic & AI-Powered Security Suite',
      terminal: [
        'Scanning 192.168.1.0/24...',
        'Detected 12 hosts online',
        'Running AI vulnerability analysis...',
        'Generating security report...',
        'Random Forest model loaded (5.1GB)',
      ],
      btnGithub: 'View on GitHub', btnStart: 'Get Started', scroll: 'SCROLL',
    },
    overview: {
      label: 'OVERVIEW', title: 'What is SNM?',
      subtitle: 'Smart Network Mapper is a comprehensive cybersecurity suite combining real-time network scanning, OS fingerprinting, and AI vulnerability prediction into a single premium tool.',
      c1t: 'AI-Powered', c1s: 'Artificial Intelligence',
      c1d: 'Random Forest model with 5.1GB of training data predicts vulnerability severity across thousands of CVEs.',
      c2t: 'Multi-threaded', c2s: 'High Performance',
      c2d: 'Up to 300 concurrent workers deliver blazing-fast port enumeration across all 65535 ports in seconds.',
      c3t: 'Professional Reports', c3s: 'Export & Share',
      c3d: 'Export detailed HTML and JSON reports with threat levels, fingerprints, and remediation suggestions.',
      s1: 'Scan Threads', s1s: 'Concurrent workers',
      s2: 'AI Model', s2s: 'Random Forest classifier',
      s3: 'Ports', s3s: 'Full port coverage',
      s4: 'Export Formats', s4s: 'HTML, JSON & more',
    },
    features: {
      label: 'CAPABILITIES', title: 'Key Features',
      subtitle: 'Everything you need for professional network security auditing.',
      items: [
        { title: 'Auto LAN Detection', sub: 'Automatic detection', text: 'Automatically detects your active network interface and subnet — zero configuration needed.' },
        { title: 'Hybrid Host Discovery', sub: 'ARP + TCP', text: 'Combines ARP broadcast scanning with TCP probes for maximum host coverage on any network.' },
        { title: 'OS Fingerprinting', sub: 'OS Detection', text: 'Identifies operating systems using TTL analysis and TCP/IP stack behaviour patterns.' },
        { title: 'Multi-Mode Scanning', sub: 'Fast / Full / Custom', text: 'Choose from Fast (top 1000), Full (all 65535), or Custom port ranges — 300 threads.' },
        { title: 'Banner Grabbing', sub: 'Service Detection', text: 'Grabs service banners from HTTP, SSH, FTP, MySQL, Redis, SMTP for version detection.' },
        { title: 'AI Vulnerability Predictor', sub: 'Real-time AI', text: 'Feeds detected services into a 5.1GB Random Forest model to predict CVE severity.' },
        { title: 'Cyberpunk GUI', sub: 'Premium Interface', text: 'A premium dark-mode GUI built with CustomTkinter — interactive and visually stunning.' },
        { title: 'Real-Time Dashboard', sub: 'Live Monitoring', text: 'Live scan progress, port status updates, and threat indicators as they are discovered.' },
        { title: 'HTML & JSON Reports', sub: 'Professional Export', text: 'One-click export of styled HTML reports and machine-readable JSON for SIEM integration.' },
      ],
    },
    installation: {
      label: 'SETUP GUIDE', title: 'Installation', subtitle: 'Get SNM running in 5 steps.',
      s1t: 'Prerequisites',
      s1items: [
        'Python 3.13 or higher',
        'Administrator / root privileges',
        'Git (to clone the repository)',
        'Npcap (Windows only) — required for raw packet capture',
      ],
      s1w1: 'Windows users: Install Npcap from npcap.com before running SNM. Without it, ARP-based host discovery will not function.',
      s1w2: 'Admin rights required: Raw socket operations require elevated privileges on all platforms.',
      s2t: 'Clone the Repository',
      s2btn: 'Open GitHub Repository',
      s2desc: 'Visit the repository, click on the "Code" button and copy the HTTPS/SSH link. Then, run the clone command in your terminal:',
      s3t: 'Automated Installation', s3sub: 'Run the setup script to install dependencies & configure tools:', s3inc: 'Configures: uv, just, virtual environment, and all dependencies',
      s4t: 'Configure Environment (Optional)', s4sub: 'Copy .env.example to .env and configure your keys:', s4link: 'For Groq Llama-3.3-70b & Telegram bot integration',
      s5t: 'Launch SNM', s5sub: 'Start the Cyberpunk GUI:', s5admin: 'Important: Windows users must accept the UAC prompt (admin is automatically requested by app.py).', s5or: 'Or use the interactive CLI mode:',
      npcapBtn: 'Npcap Setup Guide',
      npcapGuide: {
        title: 'Npcap Installation (Windows)',
        step1: 'Download the installer from npcap.com',
        step2: 'Run the .exe and check "Install Npcap in WinPcap API-compatible Mode"',
        step3: 'Restart your computer to apply drivers',
        verifyTitle: 'How to verify?',
        verifyText: 'Launch SNM in PowerShell (Admin). If the interface list appears and scanning starts without "Scapy error", it is correctly installed.',
      },
      copy: 'Copy', copied: 'Copied!',
      standaloneTitle: 'Standalone Executables',
      standaloneBadge: 'Windows Available',
      standaloneDesc: 'Direct download of self-contained executables for major platforms. No Python installation required.',
      standaloneDev: 'The Windows x64 portable package includes SNM.exe, AI models (~5.1 GB), and all dependencies. For Linux and macOS, please use the source code installation method.',
      standalonePlatforms: ['Windows (x64)', 'Linux (x64)', 'macOS (Intel/Silicon)'],
      standaloneDownload: 'Download',
      standaloneComingSoon: 'Coming Soon',
      standaloneWindowsNote: 'Windows 10/11 x64 · Full package ~5.5 GB',
      standaloneAfterDownload: 'After download: extract the ZIP, open the SNM folder, run SNM.exe, and accept the UAC prompt (admin required).',
      standaloneNotAvailable: 'Not available yet. If you are on Linux or macOS, you can download the source code and follow the steps in the "Source Code" tab.',
      standaloneClickToInstall: 'Show Source Code Steps',
      tabExecutable: 'Direct Executable',
      tabSource: 'Source Code (Git/Python)',
    },
    usage: {
      label: 'HOW TO USE', title: 'Usage Guide',
      subtitle: 'Two ways to run SNM — choose what fits your workflow.',
      tabGui: 'GUI Mode', tabCli: 'CLI Mode',
      guiTitle: 'Cyberpunk GUI Mode', guiRec: 'Recommended',
      guiDesc: 'Full-featured graphical interface with real-time dashboard and one-click export.',
      guiSteps: [
        { cmd: 'just run', desc: 'Type this command and press Enter. The UAC prompt will automatically request administrator privileges.' },
        { cmd: 'Click "Auto Detect"', desc: 'In the interface, click the "Auto Detect" button. The software will automatically find your active network interface and subnet (e.g. 192.168.1.0/24).' },
        { cmd: 'Click "Discover Hosts"', desc: 'Click this to start the Hybrid Scan (ARP + TCP). Wait until the progress bar reaches 100% and the list of active machines appears.' },
        { cmd: 'Select target IP', desc: 'In the list of discovered hosts, click on the IP address of the machine you want to analyze.' },
        { cmd: 'Click "Launch Scan"', desc: 'Start the multi-threaded port scan. The AI model will analyze the versions and predict vulnerabilities in real-time.' },
        { cmd: 'Export Report', desc: 'Once finished, click on "Export HTML" or "Export JSON" in the results panel to save a professional report to your computer.' },
      ],
      cliTitle: 'CLI Terminal Mode', cliDesc: 'Lightweight interactive terminal interface, ideal for servers and automation.',
      cliSteps: [
        { cmd: 'just cli', desc: 'Type this command to launch the interactive CLI interface.' },
        { cmd: 'Enter subnet', desc: 'When prompted, type your network range manually (for example: 192.168.1.0/24) and press Enter.' },
        { cmd: 'Choose Scan Mode', desc: 'Type 1 for Fast Scan (top 22 ports), 2 for Full Scan (65535 ports), or 3 for Custom ports.' },
        { cmd: 'View and Export', desc: 'Wait for the scan to finish. The results will be displayed in colored text and automatically saved as a JSON file in the "outputs/" folder.' },
      ],
    },
    aiEngine: {
      label: 'INTELLIGENCE', title: 'AI Engine',
      subtitle: 'A 5.1GB Random Forest model trained on 2.3M+ CVE records predicts vulnerability severity from detected services in real-time.',
      pipelineLabel: 'INFERENCE PIPELINE',
      pipeline: ['Service Detection', 'Quantile Transform', 'Feature Scaling', 'Random Forest', 'Threat Level'],
      pipelineSubs: ['Banner + port analysis', 'Version normalization', 'RobustScaler', '5.1GB classifier', 'Severity prediction'],
      filesLabel: 'Model Files',
      files: [
        { name: 'vulnerability_model.pkl', size: '5.1 GB', role: 'Main RF Classifier' },
        { name: 'quantile_transformer.pkl', size: '24 KB', role: 'Version normalization' },
        { name: 'scaler.pkl', size: '895 B', role: 'Feature scaling' },
        { name: 'feature_names.pkl', size: '1.5 KB', role: 'Dataset column names' },
      ],
      threatLabel: 'THREAT LEVEL SCALE',
      threats: [
        { level: 'Critical', score: 'CVSS 9–10', color: '#ff0040', desc: 'Immediate exploitation possible, grants root/admin access' },
        { level: 'High', score: 'CVSS 7–8.9', color: '#ff6600', desc: 'Severe system compromise, data breach risk' },
        { level: 'Medium', score: 'CVSS 4–6.9', color: '#ffcc00', desc: 'Moderate impact, requires specific conditions' },
        { level: 'Low', score: 'CVSS 0–3.9', color: '#00ff88', desc: 'Minimal impact, difficult to exploit' },
      ],
      wisdomLabel: 'WISDOM LAYER',
      wisdomDesc: 'Intelligent decision layer that prevents false positives by maintaining a knowledge base of stable versions.',
      wisdomRules: [
        'Recent versions marked as safe automatically',
        'Known stable baselines: Apache 2.4.58+, Nginx 1.24+, OpenSSH 8.0+',
        'Avoids flagging up-to-date software',
        'Reduces alert fatigue for security teams'
      ],
      hyperLabel: 'HYPERPARAMETERS',
      hyperParams: [
        { name: 'n_estimators', value: '100', desc: 'Number of decision trees' },
        { name: 'max_depth', value: 'None', desc: 'Unlimited tree depth' },
        { name: 'min_samples_split', value: '2', desc: 'Min samples to split node' },
        { name: 'min_samples_leaf', value: '1', desc: 'Min samples per leaf' },
        { name: 'max_features', value: 'sqrt', desc: 'Features per split' },
        { name: 'class_weight', value: 'balanced', desc: 'Handle imbalanced data' },
      ],
    },
    dataset: {
      label: 'TRAINING DATA', title: 'CVE Dataset',
      subtitle: "The foundation of SNM's AI — a custom pipeline that transforms raw NVD vulnerability data into ML-ready feature vectors.",
      pipelineLabel: 'DATA PIPELINE',
      pipeline: ['NVD API Fetch', 'CVE Parsing', 'CPE Extraction', 'Service Mapping', 'Feature Engineering', 'One-Hot Encoding', 'Scaling Transform', 'Export Dataset'],
      pipelineSubs: ['Rate limit 50/30s', 'JSON parse', 'CPE matching', 'Port:service map', 'Version encoding', 'OS & protocol', 'RobustScaler + Quantile', '2.3M rows CSV'],
      s1: 'Total Records', s1v: '2.3M+',
      s2: 'NVD Rate Limit', s2v: '50 req/30s',
      s3: 'Feature Columns', s3v: '40+',
      s4: 'Target Label', s4v: '0 or 1',
      tableTitle: 'Complete Dataset Schema (40+ Features)',
      cols: ['Column', 'Type', 'Description'],
      rows: [
        ['service', 'string', 'Service name (apache, nginx, ssh, mysql, redis...)'],
        ['version_major', 'int', 'Major version number (e.g., 2 in 2.4.57)'],
        ['version_minor', 'int', 'Minor version number (e.g., 4 in 2.4.57)'],
        ['version_patch', 'int', 'Patch version number (e.g., 57 in 2.4.57)'],
        ['version_full', 'float', 'Encoded full version (2.4.57 → 2.0457)'],
        ['port', 'int', 'Network port (80, 443, 22, 3306, 5432...)'],
        ['os_linux', '0/1', 'Binary: Linux/Unix system'],
        ['os_windows', '0/1', 'Binary: Windows system'],
        ['os_macos', '0/1', 'Binary: macOS system'],
        ['os_unknown', '0/1', 'Binary: Unknown OS'],
        ['proto_tcp', '0/1', 'Binary: TCP protocol'],
        ['proto_udp', '0/1', 'Binary: UDP protocol'],
        ['proto_mixed', '0/1', 'Binary: TCP+UDP'],
        ['banner_length', 'int', 'Service banner string length'],
        ['ttl', 'int', 'Time-to-live value for OS fingerprint'],
        ['+ 25 features', 'various', '25 additional fingerprint & metadata features (not shown for brevity)'],
        ['vulnerable', '0/1', '🎯 Target: Binary vulnerability label'],
      ],
      c1t: 'Automated Collection',
      c1d: 'Fetches 2.3M+ CVE records from NIST NVD API, parses CPE identifiers, and maps each vulnerability to real network service signatures, versions, ports, and OS fingerprints.',
      c2t: 'Balanced & Optimized',
      c2d: 'Uses stratified sampling to ensure equal distribution of vulnerable vs safe samples. RobustScaler handles outliers, QuantileTransformer normalizes distributions.',
      c3t: 'Feature Engineering',
      c3d: 'Extracts version components (major.minor.patch), encodes full version as float, one-hot encodes OS/protocol, includes TTL and banner metadata for comprehensive vulnerability prediction.',
      repoTitle: 'CVE Dataset Generator',
      repoDesc: 'Open source dataset generator — collect, process and encode CVE data from NVD API for ML vulnerability detection models.',
      repoBtn: 'View Repository →',
      pipelineStepsDetail: [
        { step: 1, title: 'NVD API Fetch', desc: 'Query NIST NVD REST API v2.0 with rate limiting (50 requests per 30 seconds). Retrieve CVE metadata including CVSS scores, CPE identifiers, and descriptions.' },
        { step: 2, title: 'CVE Parsing', desc: 'Parse JSON responses, extract CVE-ID, CVSS score (v3.1/v3.0/v2.0), severity level, affected products, and publication dates.' },
        { step: 3, title: 'CPE Extraction', desc: 'Extract CPE 2.3 identifiers (Common Platform Enumeration) to identify affected software, versions, and operating systems.' },
        { step: 4, title: 'Service Mapping', desc: 'Map services to standard ports (apache:80, ssh:22, mysql:3306) and associate network protocol (TCP/UDP).' },
        { step: 5, title: 'Feature Engineering', desc: 'Split version strings into major.minor.patch, encode full version as float (2.4.57 → 2.0457), extract banner metadata and TTL values.' },
        { step: 6, title: 'One-Hot Encoding', desc: 'Binary encode categorical features: OS (linux, windows, macos, unknown), Protocol (tcp, udp, mixed).' },
        { step: 7, title: 'Scaling Transform', desc: 'Apply RobustScaler (resistant to outliers) on numerical features, QuantileTransformer for version distribution normalization.' },
        { step: 8, title: 'Export Dataset', desc: 'Generate train_data.csv with 2.3M+ balanced rows, 40+ feature columns, ready for Random Forest training.' },
      ],
    },
    author: {
      label: 'ABOUT THE AUTHOR', title: 'Meet the', titleAccent: 'Builder',
      name: 'Amine Nahli', role: 'Security Engineer × Full-Stack Builder',
      bio: "I am a Security Engineer and Full-Stack Developer who views every system as a puzzle. My approach is simple: understand the vulnerability, master the architecture, and rebuild it with absolute integrity. Based in Fès, I bridge the gap between aggressive security research and high-performance product engineering.",
      location: 'Fès, Morocco', university: 'UPF — Software Engineering, 3rd Year',
      quote: 'Understand the vulnerability, master the architecture, and rebuild it with absolute integrity.',
      skills: ['Python', 'Network Security', 'Machine Learning', 'React', 'CustomTkinter', 'Scapy', 'Cybersecurity', 'Full-Stack', 'Linux'],
      btnGithub: 'GitHub', btnLinkedin: 'LinkedIn', btnWebsite: 'Website', btnEmail: 'Email',
    },
    footer: {
      tagline: 'Smart Network Mapper — Next-Generation Network Diagnostic & AI-Powered Security Suite.',
      nav: 'NAVIGATION', resources: 'RESOURCES',
      github: 'GitHub Repository', huggingface: 'Hugging Face Models', website: 'Author Website',
      copyright: '',
      rights: 'All rights reserved.',
    },
    telegram: {
      title: 'Telegram Setup Guide',
      subtitle: 'Follow these step-by-step instructions to receive real-time scan alerts and PDF reports directly on your phone.',
      steps: [
        { cmd: 'Search @BotFather', desc: 'Open the Telegram app on your phone or PC. Tap the search bar, type "@BotFather", and click on the verified account (with a blue checkmark).' },
        { cmd: 'Start & /newbot', desc: 'Click the "Start" button at the bottom of the chat. Then, type the command "/newbot" and press send to create a new bot.' },
        { cmd: 'Choose a Name', desc: 'BotFather will ask for a name. Type something like "My Network Scanner" and send.' },
        { cmd: 'Choose a Username', desc: 'Now provide a unique username that must end in "bot" (for example: "snm_alert_bot").' },
        { cmd: 'Copy the Token', desc: 'BotFather will reply with a congratulatory message containing your HTTP API Token (a long string like 123456:ABC-DEF...). Copy this token carefully.' },
        { cmd: 'Get your Chat ID', desc: 'Go back to the Telegram search bar and search for "@userinfobot". Click Start, and it will reply with your personal "Id" (a number like 987654321). Copy it.' },
        { cmd: 'Rename .env file', desc: 'On your computer, open the SNM project folder. Find the file named ".env.example", right-click it, select "Rename", and change it to exactly ".env".' },
        { cmd: 'Paste your Keys', desc: 'Open the ".env" file with Notepad. Paste your token next to TELEGRAM_BOT_TOKEN= and your ID next to TELEGRAM_CHAT_ID=. Save and close the file.' },
        { cmd: 'Test the Integration', desc: 'Start a scan using the GUI or CLI. Once the scan is complete, your bot will automatically send a summary message to your Telegram app!' },
      ]
    },
    architecture: {
      title: 'Technical Architecture',
      subtitle: 'Discover the advanced engineering behind Smart Network Mapper.',
      c1t: 'Hybrid Host Discovery',
      c1d: 'A two-phase approach: Scapy ARP broadcast for lightning-fast local network discovery, with a fallback to multi-threaded 17-port TCP Ping for strict subnets.',
      c2t: 'Automated Reporting (Groq AI)',
      c2d: 'Integrates with Groq to generate intelligent, human-readable summaries of the vulnerabilities detected during the scan.',
      c3t: 'n8n Automation Ready',
      c3d: 'Ships with native JSON workflow templates and JS splitters for n8n, allowing full CI/CD and SIEM integration.',
    },
    roadmap: {
      title: 'Roadmap & Future',
      subtitle: 'What is next for Smart Network Mapper? Discover our upcoming features.',
      q1: 'Q1 2027', t1: 'IPv6 Support', d1: 'Adding full support for scanning and mapping IPv6 networks.',
      q2: 'Q2 2027', t2: 'Web Vulnerability Scan', d2: 'Automated light scanning (XSS, SQLi, sensitive files) on open HTTP/HTTPS ports.',
      q3: 'Q3 2027', t3: 'Dynamic PDF Export', d3: 'Exporting beautiful, paginated PDF reports natively without third-party tools.',
      q4: 'Q4 2027', t4: 'Interactive Graph', d4: 'A local interactive visual map (network graph) rendered in the HTML report.',
    },
    developer: {
      title: 'Developer Guide',
      subtitle: 'Contribute to SNM or integrate it into your own Python projects as a library.',
      apiTitle: 'API Reference & Examples',
      apiDesc: 'SNM is fully modular. You can import any scanner component directly into your Python scripts:',
      examples: [
        {
          title: 'Example 1: TCP Port Scanning',
          desc: 'Scan specific ports on a target host with custom timeout and thread workers',
          code: `from scanner.port_scanner import scan_tcp
from scanner.constants import TOP_PORTS

# Scan top 22 critical ports
results = scan_tcp(
    target_ip="192.168.1.100",
    ports=TOP_PORTS,
    timeout=2,
    workers=50
)

# Output: [{'port': 80, 'statut': 'ouvert', 
#           'service': 'http', 'banner': 'Apache/2.4.57'}, ...]`
        },
        {
          title: 'Example 2: Host Discovery',
          desc: 'Discover all active hosts on a subnet using ARP + TCP hybrid scan',
          code: `from scanner.host_discovery import scan_subnet

# Scan entire /24 subnet
hosts = scan_subnet(
    subnet="192.168.1.0/24",
    timeout=1,
    max_workers=150
)

# Output: [{'ip': '192.168.1.1', 'mac': 'AA:BB:CC:DD:EE:FF',
#           'alive': True, 'latency': 0.05, 'hostname': 'router.local'}, ...]`
        },
        {
          title: 'Example 3: AI Vulnerability Prediction',
          desc: 'Feed scan results into the Random Forest model for real-time CVE prediction',
          code: `from model.predictor import predict

# Predict vulnerabilities from scan results
predictions = predict(scan_results)

# Output: [{'port': 80, 'vulnerable': 1, 'confidence': 0.87,
#           'threat_level': 'High', 'cvss_estimated': 7.5}, ...]`
        },
        {
          title: 'Example 4: OSINT CVE Enrichment',
          desc: 'Query NVD API to fetch real CVE records for detected services',
          code: `from scanner.osint_enricher import enrich_with_cves

# Enrich with real CVE data from NVD
cve_data = enrich_with_cves(scan_results)

# Output: [{'port': 80, 'service': 'apache', 'version': '2.4.49',
#           'cves': [{'id': 'CVE-2021-41773', 'cvss': 7.5,
#                     'description': 'Path traversal vulnerability...'}]}, ...]`
        },
        {
          title: 'Example 5: HTML Report Generation',
          desc: 'Generate professional styled HTML reports from scan data',
          code: `from reporter.html_generator import generate_html_report

scan_data = {
    "cible": "192.168.1.100",
    "date": "2026-07-09 14:30",
    "source": "API Script",
    "ports": scan_results
}

generate_html_report(
    scan_data,
    output_path="outputs/custom_report.html"
)
# Creates a Cyberpunk-styled HTML report with charts`
        }
      ],
      testingTitle: 'Testing & Quality Assurance',
      testingDesc: 'SNM uses pytest for comprehensive test coverage across all modules.',
      testCommands: [
        { cmd: 'pytest', desc: 'Run all tests' },
        { cmd: 'pytest tests/test_port_scanner.py', desc: 'Run specific test file' },
        { cmd: 'pytest --cov=scanner', desc: 'Run with coverage report' },
        { cmd: 'pytest -v -s', desc: 'Verbose output with print statements' }
      ],
      testCoverage: '85%+ code coverage across scanner, model, and reporter modules',
      contribTitle: 'How to Contribute',
      c1: 'Fork the Repository', cd1: 'Click the "Fork" button on the top right of the GitHub page to create your own copy.',
      c2: 'Install Dev Dependencies', cd2: 'Run pip install pytest pytest-cov to install testing tools.',
      c3: 'Create a Feature Branch', cd3: 'git checkout -b feature/your-feature-name',
      c4: 'Write Tests', cd4: 'Add tests in tests/ directory following existing patterns.',
      c5: 'Submit a Pull Request', cd5: 'Push your changes and submit a PR. Describe your feature clearly with examples.',
    },
    faq: {
      title: 'Troubleshooting & FAQ',
      subtitle: 'Common questions and solutions when using Smart Network Mapper.',
      items: [
        { q: 'Why is the AI model loading slowly?', a: 'The model is 5.1 GB large. Depending on your hard drive (SSD vs HDD) and RAM, it may take 5 to 30 seconds to load into memory. This only happens once per session.' },
        { q: 'Scapy throws a "Winpcap not installed" error.', a: 'You are missing the Npcap driver. Download and install it from npcap.com, and make sure to check "Install Npcap in WinPcap API-compatible Mode".' },
        { q: 'The network interface is not detected.', a: 'You must run your terminal or PowerShell as an Administrator. Network interfaces cannot be accessed with standard user privileges.' },
        { q: 'Why does the Custom Scan sometimes skip ports?', a: 'If your timeout is set too low (e.g., 0.5s), slow servers might not respond in time. Increase the timeout in the settings.' },
        { q: 'Why does SNM require Administrator rights?', a: 'Sending raw ARP packets and accessing network interfaces requires elevated privileges. Without admin rights, only TCP port scanning works (ARP-based host discovery fails).' },
        { q: 'Can I scan public IP addresses?', a: 'Technically yes, but WARNING: Scanning public IPs without authorization is ILLEGAL in most countries. SNM is designed for authorized internal audits only. Always obtain written permission before scanning external networks.' },
        { q: 'How does SNM detect the operating system?', a: 'OS detection uses TTL (Time To Live) analysis combined with TCP/IP stack fingerprinting. Windows ~128, Linux ~64, Network devices ~255. The accuracy is around 85-90%.' },
        { q: 'Can the AI model be retrained with custom data?', a: 'Yes! Use the training_random_forest repository with your own CVE dataset. The training scripts support custom CSV inputs. You can fine-tune the model for specific environments.' },
        { q: 'What is the maximum scan throughput?', a: 'With 300 concurrent threads, SNM can scan ~5,000 ports per second on a local network. A full 65,535 port scan completes in approximately 13 seconds on modern hardware.' },
        { q: 'Does SNM work through VPN or proxies?', a: 'ARP scanning does NOT work through VPN (layer 2 is local only). TCP port scanning works but with increased latency. For remote networks, use SSH tunneling instead of VPN.' },
        { q: 'Can I integrate SNM into CI/CD pipelines?', a: 'Absolutely! Use cli/run_scan.py with --discover and --target flags. Output is JSON-parsable. See the n8n workflow examples for SIEM integration (Splunk, ELK, QRadar).' },
        { q: 'What is the difference between SNM and Nmap?', a: 'Nmap is a network scanner. SNM = scanner + AI vulnerability prediction + automated reporting + modern GUI. SNM predicts CVE severity in real-time using machine learning, while Nmap only detects open ports and services.' }
      ]
    },
    gallery: {
      title: 'Gallery & Screenshots',
      subtitle: 'A visual tour of the Smart Network Mapper interface.',
      c1t: 'Main Dashboard', c1d: 'The Cyberpunk GUI with real-time network interface detection.',
      c2t: 'Live Scan Process', c2d: 'Multi-threaded port scanning with AI vulnerability analysis in action.',
      c3t: 'CLI Terminal Mode', c3d: 'The lightweight interactive terminal for servers and automation.',
      c4t: 'Generated Report', c4d: 'The professional HTML/JSON export featuring the AI threat summary.',
    },
  },

  fr: {
    nav: {
      overview: 'Aperçu', features: 'Fonctionnalités', docs: 'Docs',
      aiEngine: 'Moteur IA', dataset: 'Dataset', author: 'Auteur',
    },
    hero: {
      badge: 'v1.0 — Outil de cybersécurité open source',
      title1: 'Smart Network', title2: 'Mapper',
      subtitle: 'Suite de diagnostic réseau nouvelle génération & sécurité propulsée par l\'IA',
      terminal: [
        'Scan de 192.168.1.0/24 en cours...',
        '12 hôtes détectés en ligne',
        'Analyse de vulnérabilités IA en cours...',
        'Génération du rapport de sécurité...',
        'Modèle Random Forest chargé (5.1Go)',
      ],
      btnGithub: 'Voir sur GitHub', btnStart: 'Commencer', scroll: 'DÉFILER',
    },
    overview: {
      label: 'APERÇU', title: 'Qu\'est-ce que SNM ?',
      subtitle: 'Smart Network Mapper est une suite de cybersécurité complète combinant le scan réseau en temps réel, le fingerprinting OS et la prédiction de vulnérabilités par IA en un seul outil premium.',
      c1t: 'Propulsé par l\'IA', c1s: 'Intelligence Artificielle',
      c1d: 'Un modèle Random Forest de 5.1 Go prédit la sévérité des vulnérabilités avec une haute précision sur des milliers de CVE.',
      c2t: 'Multi-threadé', c2s: 'Haute Performance',
      c2d: 'Jusqu\'à 300 workers parallèles pour une énumération ultra-rapide des 65535 ports en quelques secondes.',
      c3t: 'Rapports Professionnels', c3s: 'Export & Partage',
      c3d: 'Exportez des rapports HTML et JSON détaillés avec niveaux de menace, empreintes et suggestions de remédiation.',
      s1: 'Threads de Scan', s1s: 'Workers parallèles',
      s2: 'Modèle IA', s2s: 'Classifieur Random Forest',
      s3: 'Ports', s3s: 'Couverture complète',
      s4: 'Formats d\'Export', s4s: 'HTML, JSON & plus',
    },
    features: {
      label: 'CAPACITÉS', title: 'Fonctionnalités Clés',
      subtitle: 'Tout ce dont vous avez besoin pour un audit de sécurité réseau professionnel.',
      items: [
        { title: 'Détection LAN Auto', sub: 'Détection automatique', text: 'Détecte automatiquement votre interface réseau active et le sous-réseau — aucune configuration requise.' },
        { title: 'Découverte d\'Hôtes Hybride', sub: 'ARP + TCP', text: 'Combine le scan ARP broadcast avec des sondes TCP pour une couverture maximale des hôtes sur tout réseau.' },
        { title: 'Fingerprinting OS', sub: 'Détection d\'OS', text: 'Identifie les systèmes d\'exploitation via l\'analyse TTL et les patterns de la pile TCP/IP.' },
        { title: 'Scan Multi-Mode', sub: 'Rapide / Complet / Custom', text: 'Choisissez entre Rapide (top 1000), Complet (65535) ou Personnalisé — 300 threads.' },
        { title: 'Banner Grabbing', sub: 'Détection de services', text: 'Capture les bannières de services HTTP, SSH, FTP, MySQL, Redis, SMTP pour la détection de versions.' },
        { title: 'Prédicteur IA de Vulnérabilités', sub: 'IA temps réel', text: 'Alimente les services détectés dans un modèle Random Forest de 5.1 Go pour prédire la sévérité CVE.' },
        { title: 'Interface Cyberpunk', sub: 'GUI Premium', text: 'Une GUI dark-mode premium construite avec CustomTkinter — interactive et visuellement impressionnante.' },
        { title: 'Dashboard Temps Réel', sub: 'Monitoring live', text: 'Progression du scan en direct, statut des ports et indicateurs de menaces au fur et à mesure.' },
        { title: 'Rapports HTML & JSON', sub: 'Export professionnel', text: 'Export en un clic de rapports HTML stylisés et JSON lisible par machine pour intégration SIEM.' },
      ],
    },
    installation: {
      label: 'GUIDE D\'INSTALLATION', title: 'Installation', subtitle: 'Lancez SNM en 5 étapes.',
      s1t: 'Prérequis',
      s1items: [
        'Python 3.13 ou supérieur',
        'Droits Administrateur / root',
        'Git (pour cloner le dépôt)',
        'Npcap (Windows uniquement) — requis pour la capture de paquets',
      ],
      s1w1: 'Utilisateurs Windows : Installez Npcap depuis npcap.com avant de lancer SNM. Sans lui, la découverte d\'hôtes ARP ne fonctionnera pas.',
      s1w2: 'Droits admin requis : Les opérations sur les sockets bruts nécessitent des privilèges élevés sur toutes les plateformes.',
      s2t: 'Cloner le Dépôt',
      s2btn: 'Ouvrir le Dépôt GitHub',
      s2desc: 'Visitez le dépôt, cliquez sur le bouton "Code" et copiez le lien HTTPS/SSH. Ensuite, lancez la commande de clonage dans votre terminal :',
      s3t: 'Installation Automatique', s3sub: 'Lancez le script de configuration pour installer les dépendances et outils :', s3inc: 'Configure : uv, just, l\'environnement virtuel, et toutes les dépendances',
      s4t: 'Configuration de l\'Environnement (Optionnel)', s4sub: 'Copiez le fichier .env.example vers .env et renseignez vos clés d\'accès :', s4link: 'Pour l\'intégration Groq Llama-3.3-70b & bot Telegram',
      s5t: 'Lancer SNM', s5sub: 'Démarrez l\'interface graphique Cyberpunk :', s5admin: 'Important : Sous Windows, acceptez l\'invite UAC (les droits administrateur sont demandés automatiquement par app.py).', s5or: 'Ou utilisez le mode CLI interactif :',
      npcapBtn: 'Guide d\'installation Npcap',
      npcapGuide: {
        title: 'Installation Npcap (Windows)',
        step1: 'Téléchargez l\'installeur sur npcap.com',
        step2: 'Lancez l\'.exe et cochez "Install Npcap in WinPcap API-compatible Mode"',
        step3: 'Redémarrez votre ordinateur pour appliquer les pilotes',
        verifyTitle: 'Comment vérifier ?',
        verifyText: 'Lancez SNM en PowerShell (Admin). Si la liste des interfaces s\'affiche et que le scan démarre sans erreur "Scapy", l\'installation est réussie.',
      },
      copy: 'Copier', copied: 'Copié !',
      standaloneTitle: 'Exécutables Autonomes',
      standaloneBadge: 'Windows Disponible',
      standaloneDesc: 'Téléchargement direct d\'exécutables autonomes pour les plateformes majeures. Aucune installation Python requise.',
      standaloneDev: 'Le package portable Windows x64 inclut SNM.exe, les modèles IA (~5,1 Go) et toutes les dépendances. Pour Linux et macOS, veuillez utiliser la méthode d\'installation par code source.',
      standalonePlatforms: ['Windows (x64)', 'Linux (x64)', 'macOS (Intel/Silicon)'],
      standaloneDownload: 'Télécharger',
      standaloneComingSoon: 'Bientôt',
      standaloneWindowsNote: 'Windows 10/11 x64 · Package complet ~5,5 Go',
      standaloneAfterDownload: 'Après téléchargement : décompressez le ZIP, ouvrez le dossier SNM, lancez SNM.exe et acceptez UAC (admin requis).',
      standaloneNotAvailable: 'Non disponible pour le moment. Si vous utilisez Linux ou macOS, vous pouvez simplement télécharger le code source et suivre les étapes d\'installation.',
      standaloneClickToInstall: 'Voir les étapes du code source',
      tabExecutable: 'Exécutables Directs',
      tabSource: 'Code Source (Git/Python)',
      tabGui: 'Mode GUI', tabCli: 'Mode CLI',
      guiTitle: 'Mode Interface Cyberpunk', guiRec: 'Recommandé',
      guiDesc: 'Interface graphique complète avec dashboard temps réel et export en un clic.',
      guiSteps: [
        { cmd: 'just run', desc: 'Tapez cette commande et appuyez sur Entrée. L\'invite UAC Windows demandera automatiquement les privilèges Administrateur requis.' },
        { cmd: 'Cliquez sur "Auto Detect"', desc: 'Dans l\'interface, cliquez sur le bouton "Auto Detect". Le logiciel trouvera automatiquement votre carte réseau active et le sous-réseau (ex: 192.168.1.0/24).' },
        { cmd: 'Cliquez sur "Discover Hosts"', desc: 'Cliquez ici pour lancer le Scan Hybride (ARP + TCP). Attendez que la barre de progression active atteigne 100% et que la liste des machines apparaisse.' },
        { cmd: 'Sélectionnez une IP cible', desc: 'Dans la liste des hôtes découverts, cliquez sur l\'adresse IP de la machine que vous souhaitez analyser.' },
        { cmd: 'Cliquez sur "Launch Scan"', desc: 'Démarrez le scan de ports multi-threadé. Le modèle IA analysera les versions et prévoira les vulnérabilités en temps réel.' },
        { cmd: 'Exporter le Rapport', desc: 'Une fois terminé, cliquez sur "Export HTML" ou "Export JSON" dans le panneau de résultats pour sauvegarder un rapport professionnel sur votre PC.' },
      ],
      cliTitle: 'Mode Terminal CLI', cliDesc: 'Interface terminal interactive légère, idéale pour les serveurs et l\'automatisation.',
      cliSteps: [
        { cmd: 'just cli', desc: 'Tapez cette commande pour lancer l\'interface CLI interactive.' },
        { cmd: 'Entrez le sous-réseau', desc: 'Lorsqu\'on vous le demande, tapez manuellement votre plage réseau (par exemple : 192.168.1.0/24) et appuyez sur Entrée.' },
        { cmd: 'Mode de scan', desc: 'Tapez 1 pour le Scan Rapide (top 22 ports), 2 pour le Scan Complet (65535 ports), ou 3 pour des ports Personnalisés.' },
        { cmd: 'Voir et Exporter', desc: 'Attendez la fin du scan. Les résultats s\'afficheront en couleurs et seront automatiquement sauvegardés en JSON dans le dossier "outputs/".' },
      ],
    },
    aiEngine: {
      label: 'INTELLIGENCE', title: 'Moteur IA',
      subtitle: 'Un modèle Random Forest de 5.1 Go entraîné sur 2.3M+ enregistrements CVE prédit la sévérité des vulnérabilités depuis les services détectés en temps réel.',
      pipelineLabel: 'PIPELINE D\'INFÉRENCE',
      pipeline: ['Détection Service', 'Transform. Quantile', 'Mise à l\'Échelle', 'Random Forest', 'Niveau Menace'],
      pipelineSubs: ['Analyse bannière + port', 'Normalisation versions', 'RobustScaler', 'Classifieur 5.1Go', 'Prédiction sévérité'],
      filesLabel: 'Fichiers Modèles',
      files: [
        { name: 'vulnerability_model.pkl', size: '5.1 Go', role: 'Classifieur RF principal' },
        { name: 'quantile_transformer.pkl', size: '24 Ko', role: 'Normalisation des versions' },
        { name: 'scaler.pkl', size: '895 o', role: 'Mise à l\'échelle des features' },
        { name: 'feature_names.pkl', size: '1.5 Ko', role: 'Noms des colonnes du dataset' },
      ],
      threatLabel: 'ÉCHELLE DE MENACE',
      threats: [
        { level: 'Critique', score: 'CVSS 9–10', color: '#ff0040', desc: 'Exploitation immédiate possible, accès root/admin' },
        { level: 'Élevé', score: 'CVSS 7–8.9', color: '#ff6600', desc: 'Compromission système sévère, risque fuite données' },
        { level: 'Moyen', score: 'CVSS 4–6.9', color: '#ffcc00', desc: 'Impact modéré, nécessite conditions spécifiques' },
        { level: 'Faible', score: 'CVSS 0–3.9', color: '#00ff88', desc: 'Impact minimal, difficile à exploiter' },
      ],
      wisdomLabel: 'COUCHE DE SAGESSE',
      wisdomDesc: 'Couche de décision intelligente qui prévient les faux positifs en maintenant une base de connaissances des versions stables.',
      wisdomRules: [
        'Versions récentes marquées sûres automatiquement',
        'Baselines stables: Apache 2.4.58+, Nginx 1.24+, OpenSSH 8.0+',
        'Évite le flagging des logiciels à jour',
        'Réduit la fatigue d\'alertes pour les équipes sécurité'
      ],
      hyperLabel: 'HYPERPARAMÈTRES',
      hyperParams: [
        { name: 'n_estimators', value: '100', desc: 'Nombre d\'arbres de décision' },
        { name: 'max_depth', value: 'None', desc: 'Profondeur illimitée' },
        { name: 'min_samples_split', value: '2', desc: 'Échantillons min pour split' },
        { name: 'min_samples_leaf', value: '1', desc: 'Échantillons min par feuille' },
        { name: 'max_features', value: 'sqrt', desc: 'Features par split' },
        { name: 'class_weight', value: 'balanced', desc: 'Gestion données déséquilibrées' },
      ],
    },
    dataset: {
      label: 'DONNÉES D\'ENTRAÎNEMENT', title: 'Dataset CVE',
      subtitle: 'Le fondement de l\'IA de SNM — un pipeline personnalisé qui transforme les données brutes NVD en vecteurs de features prêts pour le ML.',
      pipelineLabel: 'PIPELINE DE DONNÉES',
      pipeline: ['Fetch API NVD', 'Parse CVE', 'Extract CPE', 'Mapping Services', 'Feature Engineering', 'Encodage One-Hot', 'Transform Scaling', 'Export Dataset'],
      pipelineSubs: ['Limit 50/30s', 'Parse JSON', 'Match CPE', 'Map port:service', 'Encode version', 'OS & protocole', 'RobustScaler + Quantile', '2.3M lignes CSV'],
      s1: 'Enregistrements', s1v: '2.3M+',
      s2: 'Limite API NVD', s2v: '50 req/30s',
      s3: 'Colonnes Features', s3v: '40+',
      s4: 'Label Cible', s4v: '0 ou 1',
      tableTitle: 'Schéma Complet du Dataset (40+ Features)',
      cols: ['Colonne', 'Type', 'Description'],
      rows: [
        ['service', 'string', 'Nom du service (apache, nginx, ssh, mysql, redis...)'],
        ['version_major', 'int', 'Numéro version majeure (ex: 2 dans 2.4.57)'],
        ['version_minor', 'int', 'Numéro version mineure (ex: 4 dans 2.4.57)'],
        ['version_patch', 'int', 'Numéro version patch (ex: 57 dans 2.4.57)'],
        ['version_full', 'float', 'Version complète encodée (2.4.57 → 2.0457)'],
        ['port', 'int', 'Port réseau (80, 443, 22, 3306, 5432...)'],
        ['os_linux', '0/1', 'Binaire: Système Linux/Unix'],
        ['os_windows', '0/1', 'Binaire: Système Windows'],
        ['os_macos', '0/1', 'Binaire: Système macOS'],
        ['os_unknown', '0/1', 'Binaire: OS inconnu'],
        ['proto_tcp', '0/1', 'Binaire: Protocole TCP'],
        ['proto_udp', '0/1', 'Binaire: Protocole UDP'],
        ['proto_mixed', '0/1', 'Binaire: TCP+UDP'],
        ['banner_length', 'int', 'Longueur bannière service'],
        ['ttl', 'int', 'Valeur TTL pour fingerprint OS'],
        ['+ 25 features', 'divers', '25 features supplémentaires (empreintes & métadonnées non affichées par souci de brièveté)'],
        ['vulnerable', '0/1', '🎯 Cible: Label binaire vulnérabilité'],
      ],
      c1t: 'Collecte Automatisée',
      c1d: 'Récupère 2.3M+ enregistrements CVE de l\'API NIST NVD, parse les identifiants CPE, et associe chaque vulnérabilité à des vraies signatures réseau, versions, ports et empreintes OS.',
      c2t: 'Équilibré & Optimisé',
      c2d: 'Utilise échantillonnage stratifié pour assurer distribution égale échantillons vulnérables vs sûrs. RobustScaler gère outliers, QuantileTransformer normalise distributions.',
      c3t: 'Feature Engineering',
      c3d: 'Extrait composantes version (major.minor.patch), encode version complète en float, encode one-hot OS/protocole, inclut TTL et métadonnées bannière pour prédiction complète.',
      repoTitle: 'CVE Dataset Generator',
      repoDesc: 'Générateur de dataset open source — collectez, traitez et encodez les données CVE de l\'API NVD pour les modèles de détection de vulnérabilités ML.',
      repoBtn: 'Voir le Dépôt →',
      pipelineStepsDetail: [
        { step: 1, title: 'Fetch API NVD', desc: 'Interroge API REST NVD v2.0 avec rate limiting (50 requêtes par 30 secondes). Récupère métadonnées CVE incluant scores CVSS, identifiants CPE et descriptions.' },
        { step: 2, title: 'Parse CVE', desc: 'Parse réponses JSON, extrait CVE-ID, score CVSS (v3.1/v3.0/v2.0), niveau sévérité, produits affectés et dates publication.' },
        { step: 3, title: 'Extract CPE', desc: 'Extrait identifiants CPE 2.3 (Common Platform Enumeration) pour identifier logiciels, versions et systèmes d\'exploitation affectés.' },
        { step: 4, title: 'Mapping Services', desc: 'Map services aux ports standards (apache:80, ssh:22, mysql:3306) et associe protocole réseau (TCP/UDP).' },
        { step: 5, title: 'Feature Engineering', desc: 'Sépare strings version en major.minor.patch, encode version complète en float (2.4.57 → 2.0457), extrait métadonnées bannière et valeurs TTL.' },
        { step: 6, title: 'Encodage One-Hot', desc: 'Encode binaire features catégorielles: OS (linux, windows, macos, unknown), Protocole (tcp, udp, mixed).' },
        { step: 7, title: 'Transform Scaling', desc: 'Applique RobustScaler (résistant outliers) sur features numériques, QuantileTransformer pour normalisation distribution versions.' },
        { step: 8, title: 'Export Dataset', desc: 'Génère train_data.csv avec 2.3M+ lignes équilibrées, 40+ colonnes features, prêt pour entraînement Random Forest.' },
      ],
    },
    author: {
      label: 'À PROPOS DE L\'AUTEUR', title: 'Rencontrez le', titleAccent: 'Créateur',
      name: 'Amine Nahli', role: 'Ingénieur Sécurité × Développeur Full-Stack',
      bio: "Je suis Ingénieur Sécurité et Développeur Full-Stack qui voit chaque système comme un puzzle. Mon approche est simple : comprendre la vulnérabilité, maîtriser l'architecture, et la reconstruire avec une intégrité absolue. Basé à Fès, je fais le lien entre la recherche en sécurité offensive et l'ingénierie produit haute performance.",
      location: 'Fès, Maroc', university: 'UPF — Génie Logiciel, 3ème Année',
      quote: 'Comprendre la vulnérabilité, maîtriser l\'architecture, et la reconstruire avec une intégrité absolue.',
      skills: ['Python', 'Sécurité Réseau', 'Machine Learning', 'React', 'CustomTkinter', 'Scapy', 'Cybersécurité', 'Full-Stack', 'Linux'],
      btnGithub: 'GitHub', btnLinkedin: 'LinkedIn', btnWebsite: 'Site Web', btnEmail: 'Email',
    },
    footer: {
      tagline: 'Smart Network Mapper — Suite de diagnostic réseau nouvelle génération propulsée par l\'IA.',
      nav: 'NAVIGATION', resources: 'RESSOURCES',
      github: 'Dépôt GitHub', huggingface: 'Modèles Hugging Face', website: 'Site de l\'Auteur',
      copyright: '',
      rights: 'Tous droits réservés.',
    },
    telegram: {
      title: 'Guide Telegram',
      subtitle: 'Suivez ces instructions étape par étape pour recevoir les alertes de scan et les rapports en temps réel directement sur votre téléphone.',
      steps: [
        { cmd: 'Chercher @BotFather', desc: 'Ouvrez l\'application Telegram sur votre téléphone ou PC. Cliquez sur la barre de recherche, tapez "@BotFather", et cliquez sur le compte certifié (avec le badge bleu).' },
        { cmd: 'Démarrer & /newbot', desc: 'Cliquez sur le bouton "Démarrer" en bas de la discussion. Ensuite, tapez la commande "/newbot" et envoyez-la pour créer un nouveau bot.' },
        { cmd: 'Choisir un Nom', desc: 'BotFather vous demandera un nom. Tapez quelque chose comme "Mon Scanner Réseau" et envoyez.' },
        { cmd: 'Choisir un Username', desc: 'Indiquez maintenant un nom d\'utilisateur unique qui doit se terminer par "bot" (par exemple : "snm_alert_bot").' },
        { cmd: 'Copier le Token', desc: 'BotFather vous répondra avec un message de félicitations contenant votre Token HTTP API (une longue chaîne comme 123456:ABC-DEF...). Copiez ce token soigneusement.' },
        { cmd: 'Obtenir votre Chat ID', desc: 'Retournez dans la barre de recherche Telegram et cherchez "@userinfobot". Cliquez sur Démarrer, il vous répondra avec votre "Id" personnel (un nombre comme 987654321). Copiez-le.' },
        { cmd: 'Renommer le fichier .env', desc: 'Sur votre ordinateur, ouvrez le dossier du projet SNM. Trouvez le fichier nommé ".env.example", faites un clic droit, choisissez "Renommer", et appelez-le exactement ".env".' },
        { cmd: 'Coller vos Clés', desc: 'Ouvrez le fichier ".env" avec le Bloc-notes. Collez votre token à côté de TELEGRAM_BOT_TOKEN= et votre ID à côté de TELEGRAM_CHAT_ID=. Enregistrez et fermez.' },
        { cmd: 'Tester l\'Intégration', desc: 'Lancez un scan via l\'interface graphique ou CLI. Une fois le scan terminé, votre bot vous enverra automatiquement un message récapitulatif sur Telegram !' },
      ]
    },
    architecture: {
      title: 'Architecture Technique',
      subtitle: 'Découvrez l\'ingénierie avancée derrière le fonctionnement de Smart Network Mapper.',
      c1t: 'Découverte d\'Hôtes Hybride',
      c1d: 'Approche en 2 phases : Broadcast ARP Scapy pour une découverte réseau ultra-rapide, avec un fallback TCP Ping multi-threadé sur 17 ports.',
      c2t: 'Rapports IA (Groq)',
      c2d: 'Générateur de rapports HTML intelligent via l\'API Groq, résumant les menaces détectées en langage naturel.',
      c3t: 'Automatisation n8n',
      c3d: 'Fourni avec des templates de workflows JSON natifs et des scripts JS pour n8n, permettant une intégration CI/CD ou SIEM complète.',
    },
    roadmap: {
      title: 'Feuille de Route',
      subtitle: 'Découvrez les fonctionnalités futures prévues pour Smart Network Mapper.',
      q1: 'T1 2027', t1: 'Support IPv6', d1: 'Ajout du support complet pour le scan et la cartographie des réseaux IPv6.',
      q2: 'T2 2027', t2: 'Scan de Failles Web', d2: 'Scan léger automatisé (XSS, SQLi, fichiers sensibles) sur les ports HTTP/HTTPS ouverts.',
      q3: 'T3 2027', t3: 'Export PDF Dynamique', d3: 'Exportation de magnifiques rapports PDF paginés nativement sans outils tiers.',
      q4: 'T4 2027', t4: 'Graphe Interactif', d4: 'Une carte visuelle interactive locale (network graph) rendue dans le rapport HTML.',
    },
    developer: {
      title: 'Guide Développeur',
      subtitle: 'Contribuez à SNM ou intégrez-le dans vos propres projets Python comme librairie.',
      apiTitle: 'Référence API & Exemples',
      apiDesc: 'SNM est entièrement modulaire. Vous pouvez importer n\'importe quel composant scanner directement dans vos scripts Python :',
      examples: [
        {
          title: 'Exemple 1: Scan de Ports TCP',
          desc: 'Scannez des ports spécifiques sur un hôte cible avec timeout et workers personnalisés',
          code: `from scanner.port_scanner import scan_tcp
from scanner.constants import TOP_PORTS

# Scanner les 22 ports critiques
results = scan_tcp(
    target_ip="192.168.1.100",
    ports=TOP_PORTS,
    timeout=2,
    workers=50
)

# Sortie: [{'port': 80, 'statut': 'ouvert', 
#           'service': 'http', 'banner': 'Apache/2.4.57'}, ...]`
        },
        {
          title: 'Exemple 2: Découverte d\'Hôtes',
          desc: 'Découvrez tous les hôtes actifs sur un sous-réseau via scan hybride ARP + TCP',
          code: `from scanner.host_discovery import scan_subnet

# Scanner un sous-réseau /24 complet
hosts = scan_subnet(
    subnet="192.168.1.0/24",
    timeout=1,
    max_workers=150
)

# Sortie: [{'ip': '192.168.1.1', 'mac': 'AA:BB:CC:DD:EE:FF',
#           'alive': True, 'latency': 0.05, 'hostname': 'router.local'}, ...]`
        },
        {
          title: 'Exemple 3: Prédiction IA de Vulnérabilités',
          desc: 'Alimentez les résultats de scan dans le modèle Random Forest pour prédiction CVE temps réel',
          code: `from model.predictor import predict

# Prédire vulnérabilités depuis résultats scan
predictions = predict(scan_results)

# Sortie: [{'port': 80, 'vulnerable': 1, 'confidence': 0.87,
#           'threat_level': 'High', 'cvss_estimated': 7.5}, ...]`
        },
        {
          title: 'Exemple 4: Enrichissement OSINT CVE',
          desc: 'Interrogez l\'API NVD pour récupérer des enregistrements CVE réels pour services détectés',
          code: `from scanner.osint_enricher import enrich_with_cves

# Enrichir avec données CVE réelles depuis NVD
cve_data = enrich_with_cves(scan_results)

# Sortie: [{'port': 80, 'service': 'apache', 'version': '2.4.49',
#           'cves': [{'id': 'CVE-2021-41773', 'cvss': 7.5,
#                     'description': 'Vulnérabilité path traversal...'}]}, ...]`
        },
        {
          title: 'Exemple 5: Génération Rapport HTML',
          desc: 'Générez des rapports HTML professionnels stylisés depuis données de scan',
          code: `from reporter.html_generator import generate_html_report

scan_data = {
    "cible": "192.168.1.100",
    "date": "2026-07-09 14:30",
    "source": "Script API",
    "ports": scan_results
}

generate_html_report(
    scan_data,
    output_path="outputs/rapport_personnalise.html"
)
# Crée un rapport HTML stylisé Cyberpunk avec graphiques`
        }
      ],
      testingTitle: 'Tests & Assurance Qualité',
      testingDesc: 'SNM utilise pytest pour une couverture de tests complète sur tous les modules.',
      testCommands: [
        { cmd: 'just test', desc: 'Lancer tous les tests' },
        { cmd: 'just test-verbose', desc: 'Lancer avec détails' },
        { cmd: 'just lint', desc: 'Contrôler la qualité avec Ruff et Mypy' },
        { cmd: 'just format', desc: 'Formater le code avec YAPF' }
      ],
      testCoverage: 'Couverture de code 85%+ sur modules scanner, model et reporter',
      contribTitle: 'Comment Contribuer',
      c1: 'Forker le Dépôt', cd1: 'Cliquez sur le bouton "Fork" en haut à droite de la page GitHub pour créer votre propre copie.',
      c2: 'Installer Dépendances Dev', cd2: 'Exécutez pip install pytest pytest-cov pour installer les outils de test.',
      c3: 'Créer une Branche Feature', cd3: 'git checkout -b feature/nom-de-votre-feature',
      c4: 'Écrire des Tests', cd4: 'Ajoutez tests dans le répertoire tests/ en suivant les patterns existants.',
      c5: 'Soumettre Pull Request', cd5: 'Poussez vos changements et soumettez une PR. Décrivez votre feature clairement avec exemples.',
    },
    faq: {
      title: 'Dépannage & F.A.Q',
      subtitle: 'Questions fréquentes et solutions lors de l\'utilisation de Smart Network Mapper.',
      items: [
        { q: 'Pourquoi le modèle IA se charge-t-il si lentement ?', a: 'Le modèle pèse 5.1 Go. Selon votre disque dur (SSD vs HDD) et votre RAM, le chargement en mémoire peut prendre entre 5 et 30 secondes. Cela ne se produit qu\'une seule fois par session.' },
        { q: 'Scapy affiche une erreur "Winpcap not installed".', a: 'Il vous manque le pilote Npcap. Téléchargez-le et installez-le depuis npcap.com, et assurez-vous de cocher "Install Npcap in WinPcap API-compatible Mode".' },
        { q: 'La carte réseau n\'est pas détectée.', a: 'Vous devez exécuter votre terminal ou PowerShell en tant qu\'Administrateur. Les interfaces réseau ne peuvent pas être lues avec des droits standards.' },
        { q: 'Pourquoi le Scan Personnalisé ignore-t-il certains ports ?', a: 'Si votre délai d\'attente (timeout) est trop bas (ex: 0.5s), les serveurs lents pourraient ne pas répondre à temps. Augmentez le timeout dans les paramètres.' },
        { q: 'Pourquoi SNM nécessite-t-il des droits Administrateur ?', a: 'L\'envoi de paquets ARP bruts et l\'accès aux interfaces réseau nécessitent des privilèges élevés. Sans droits admin, seul le scan de ports TCP fonctionne (la découverte d\'hôtes ARP échoue).' },
        { q: 'Puis-je scanner des adresses IP publiques ?', a: 'Techniquement oui, mais ATTENTION : Scanner des IP publiques sans autorisation est ILLÉGAL dans la plupart des pays. SNM est conçu pour des audits internes autorisés uniquement. Obtenez toujours une permission écrite avant de scanner des réseaux externes.' },
        { q: 'Comment SNM détecte-t-il le système d\'exploitation ?', a: 'La détection OS utilise l\'analyse TTL (Time To Live) combinée au fingerprinting de la pile TCP/IP. Windows ~128, Linux ~64, Équipements réseau ~255. La précision est d\'environ 85-90%.' },
        { q: 'Le modèle IA peut-il être réentraîné avec des données personnalisées ?', a: 'Oui ! Utilisez le dépôt training_random_forest avec votre propre dataset CVE. Les scripts d\'entraînement supportent les entrées CSV personnalisées. Vous pouvez affiner le modèle pour des environnements spécifiques.' },
        { q: 'Quel est le débit de scan maximal ?', a: 'Avec 300 threads concurrents, SNM peut scanner ~5 000 ports par seconde sur un réseau local. Un scan complet de 65 535 ports se termine en environ 13 secondes sur du matériel moderne.' },
        { q: 'SNM fonctionne-t-il via VPN ou proxies ?', a: 'Le scan ARP ne fonctionne PAS via VPN (la couche 2 est locale uniquement). Le scan de ports TCP fonctionne mais avec une latence accrue. Pour les réseaux distants, utilisez le tunneling SSH plutôt qu\'un VPN.' },
        { q: 'Puis-je intégrer SNM dans des pipelines CI/CD ?', a: 'Absolument ! Utilisez cli/run_scan.py avec les flags --discover et --target. La sortie est parsable en JSON. Consultez les exemples de workflow n8n pour l\'intégration SIEM (Splunk, ELK, QRadar).' },
        { q: 'Quelle est la différence entre SNM et Nmap ?', a: 'Nmap est un scanner réseau. SNM = scanner + prédiction IA de vulnérabilités + reporting automatique + GUI moderne. SNM prédit la sévérité CVE en temps réel avec le machine learning, alors que Nmap détecte uniquement les ports ouverts et services.' }
      ]
    },
    gallery: {
      title: 'Galerie & Aperçus',
      subtitle: 'Un aperçu visuel de l\'interface de Smart Network Mapper.',
      c1t: 'Menu Principal', c1d: 'L\'interface graphique Cyberpunk avec détection réseau en temps réel.',
      c2t: 'Scan en Cours', c2d: 'Scan de ports multi-threadé et analyse des vulnérabilités par l\'IA en action.',
      c3t: 'Mode Terminal CLI', c3d: 'Le terminal interactif léger idéal pour les serveurs et l\'automatisation.',
      c4t: 'Rapport Généré', c4d: 'L\'exportation HTML/JSON professionnelle incluant le résumé des menaces IA.',
    },
  },
}
