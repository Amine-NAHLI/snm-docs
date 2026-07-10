# 📋 Audit Complet de la Documentation SNM

## 🎯 Objectif
Enrichir complètement la documentation snm-docs pour qu'elle couvre TOUS les aspects du projet avec tous les détails techniques possibles, sans toucher au style visuel.

---

## ❌ ERREURS CRITIQUES À CORRIGER

### 1. **Dataset Size (ERREUR MAJEURE)**
- **Actuel**: `20,000` enregistrements
- **Correct**: `2,300,000+` enregistrements (2.3M)
- **Fichiers à modifier**:
  - `src/translations/index.js` → ligne `s1v: '20,000'`
  - Changer partout "20K" ou "20,000" en "2.3M"

### 2. **Scaler Type (ERREUR TECHNIQUE)**
- **Actuel**: `StandardScaler`
- **Correct**: `RobustScaler`
- **Fichiers à modifier**:
  - `src/translations/index.js` → `pipelineSubs: [...'StandardScaler'...]`
  - Remplacer par `'RobustScaler'`

### 3. **Thread Count (ERREUR CHIFFRE)**
- **Actuel**: `200 threads`
- **Correct**: `300 threads`
- **Fichiers à modifier**:
  - `src/translations/index.js` → `overview.s1: '200'`
  - Changer en `'300'`

### 4. **Commandes CLI (ERREUR SYNTAXE)**
- **Actuel**: 
  - `python main.py`
  - `python download_models.py`
- **Correct**:
  - `python cli/main.py`
  - `python model/download_models.py`
- **Fichiers à modifier**:
  - `src/translations/index.js` → sections `usage` et `installation`

---

## 📝 SECTIONS MANQUANTES À AJOUTER

### 1. **Wisdom Layer (AI Engine)**
**Où**: Composant `AIEngine.jsx`
**Quoi ajouter**:
```
- Section "Wisdom Layer" (couche de décision intelligente)
- Règles métier:
  * Versions récentes automatiquement marquées comme sûres
  * Base de connaissances des versions stables (Apache 2.4.58+, Nginx 1.24+, OpenSSH 8.0+)
  * Évite les faux positifs sur des versions récentes
```

### 2. **Hyperparamètres Random Forest**
**Où**: Composant `AIEngine.jsx`
**Quoi ajouter**:
```jsx
Hyperparameters:
- n_estimators: 100
- max_depth: None (unlimited)
- min_samples_split: 2
- min_samples_leaf: 1
- max_features: sqrt
- bootstrap: True
- class_weight: balanced
```

### 3. **Threat Levels Detail**
**Où**: Composant `AIEngine.jsx`
**Quoi ajouter**:
```
Échelle CVSS détaillée:
- Critical (9.0-10.0): Exploitation immédiate, accès root/admin
- High (7.0-8.9): Compromission sévère du système
- Medium (4.0-6.9): Impact modéré, exploitation complexe
- Low (0.0-3.9): Impact minimal, nécessite conditions spécifiques
```

### 4. **Pipeline Détaillé CVE Dataset**
**Où**: Composant `CVEDataset.jsx`
**Quoi ajouter**:
```
Étapes détaillées:
1. Fetch NVD API (50 req/30s rate limit)
2. Parse JSON → extract CPE (Common Platform Enumeration)
3. Map services → ports (apache:80, ssh:22, mysql:3306)
4. Feature engineering:
   - version_major, version_minor, version_patch
   - version_full (float encoding: 2.4.57 → 2.0457)
5. One-Hot Encoding (OS: linux/windows/macos, Proto: tcp/udp)
6. RobustScaler (résistant aux outliers)
7. QuantileTransformer (normalisation distribution)
8. Export train_data.csv (2.3M rows)
```

### 5. **Schema Complet Dataset**
**Où**: Composant `CVEDataset.jsx`
**Quoi ajouter**:
```
Colonnes complètes (40+ features):
- service (string)
- version_major (int)
- version_minor (int)
- version_patch (int)
- version_full (float)
- port (int)
- os_linux (0/1)
- os_windows (0/1)
- os_macos (0/1)
- os_unknown (0/1)
- proto_tcp (0/1)
- proto_udp (0/1)
- proto_mixed (0/1)
- vulnerable (0/1) — TARGET
+ 25 autres features (bannière, TTL, fingerprint...)
```

### 6. **Section n8n Workflow**
**Où**: Nouveau composant `N8NWorkflow.jsx`
**Quoi ajouter**:
```
Automatisation n8n:
- Workflow JSON template fourni dans /docs/n8n-workflow.json
- Trigger: webhook HTTP POST
- Nodes:
  1. Webhook Trigger
  2. Execute Command (python cli/run_scan.py)
  3. Parse JSON output
  4. Split Telegram chunks (JS code fourni)
  5. Send Telegram messages
  6. Store results in SQLite
- Use case: scan automatique quotidien (cron)
- Use case: intégration SIEM (Splunk, ELK)
```

### 7. **Section Testing & Quality**
**Où**: Nouveau composant `TestingQuality.jsx`
**Quoi ajouter**:
```
Tests:
- Framework: pytest
- Couverture: 85%+
- Tests unitaires:
  * scanner/test_host_discovery.py
  * scanner/test_port_scanner.py
  * model/test_predictor.py
  * scanner/test_iana_manager.py
- Tests d'intégration:
  * cli/test_run_scan_errors.py
  * tests/test_device_info.py
- Performance tests:
  * k6 load testing (voir performance-tests/)
  * Résultats: 1000 scans/min soutenus
```

### 8. **Section IANA/OSINT Sources**
**Où**: Nouveau composant `IANAOsint.jsx`
**Quoi ajouter**:
```
Sources de données:
1. IANA Service Names:
   - URL: https://www.iana.org/assignments/service-names-port-numbers/
   - Format: CSV (8000+ services)
   - Cache local: 30 jours
   - Fallback: dictionnaire statique intégré

2. NVD (NIST):
   - API v2.0: https://services.nvd.nist.gov/rest/json/cves/2.0
   - Rate limit: 5 req/30s (sans clé), 50 req/30s (avec clé)
   - Données: 250,000+ CVE records
   - Fields: CVE-ID, CVSS score, description, CPE

3. Groq AI (Rapports):
   - Modèle: llama-3.3-70b-versatile
   - Max tokens: 32K
   - Latence: <2s
   - Format: Markdown structured
```

### 9. **Section Packaging & Release**
**Où**: Nouveau composant `Packaging.jsx`
**Quoi ajouter**:
```
Build Process:
1. PyInstaller:
   - Spec file: build_tools/build.spec
   - Mode: --onefile (SNM.exe standalone)
   - Hidden imports: scapy, sklearn, joblib
   - Runtime hook: pyi_rth_snm_stdio.py

2. Package portable:
   - Script: build_tools/package_release.bat
   - Contenu:
     * SNM.exe (200MB)
     * _internal/ (dependencies DLLs)
     * model/ (5.1GB AI models)
     * INSTALL_WINDOWS.txt

3. Upload Hugging Face:
   - Script: build_tools/upload_windows_release.py
   - Repo: aminenahli/snm-windows-portable
   - ZIP final: ~5.5GB

4. Docker:
   - Multi-stage build
   - Base: python:3.11-slim
   - Dependencies: apt + pip
   - Entrypoint: python cli/run_scan.py
```

### 10. **Section API Examples**
**Où**: Composant `Developer.jsx`
**Quoi enrichir**:
```python
# Exemple 1: Scan de ports programmatique
from scanner.port_scanner import scan_tcp, scan_udp_ports
from scanner.constants import TOP_PORTS

results = scan_tcp("192.168.1.100", TOP_PORTS, timeout=2, workers=50)
# Retourne: [{'port': 80, 'statut': 'ouvert', 'service': 'http', 'banner': 'Apache/2.4.57'}, ...]

# Exemple 2: Découverte d'hôtes
from scanner.host_discovery import scan_subnet
hosts = scan_subnet("192.168.1.0/24", timeout=1, max_workers=150)
# Retourne: [{'ip': '192.168.1.1', 'mac': 'AA:BB:CC:DD:EE:FF', 'alive': True, 'latency': 0.05}, ...]

# Exemple 3: Prédiction IA
from model.predictor import predict
predictions = predict(results)
# Retourne: [{'port': 80, 'vulnerable': 1, 'confidence': 0.87, 'threat_level': 'High'}, ...]

# Exemple 4: Enrichissement OSINT
from scanner.osint_enricher import enrich_with_cves
cves = enrich_with_cves(results)
# Retourne: [{'port': 80, 'cves': [{'id': 'CVE-2024-12345', 'cvss': 7.5, 'description': '...'}, ...]}, ...]

# Exemple 5: Génération rapport HTML
from reporter.html_generator import generate_html_report
generate_html_report(scan_data, output_path="outputs/custom_report.html")
```

### 11. **Section FAQ Enrichie**
**Où**: Composant `FAQ.jsx`
**Questions à ajouter**:
```
Q5: Pourquoi SNM nécessite-t-il des droits administrateur ?
R: L'envoi de paquets ARP et l'accès aux interfaces réseau brutes requièrent des privilèges élevés. Sans admin, seul le scan TCP (ports) fonctionne.

Q6: Puis-je scanner des adresses IP publiques ?
R: Techniquement oui, mais ATTENTION : scanner des IP publiques sans autorisation est ILLÉGAL dans la plupart des pays. SNM est conçu pour des audits internes autorisés.

Q7: Comment SNM détecte-t-il l'OS des machines ?
R: Analyse TTL (Time To Live) + TCP/IP fingerprinting. Windows ~128, Linux ~64, Network devices ~255.

Q8: Le modèle IA peut-il être réentraîné ?
R: Oui ! Utilisez le repo training_random_forest avec votre propre dataset. Les scripts sont fournis.

Q9: Quel est le débit de scan maximal ?
R: Avec 300 threads, SNM peut scanner ~5000 ports/seconde. Scan complet (65535 ports) en ~13 secondes sur un réseau local.

Q10: SNM fonctionne-t-il avec des VPN/proxies ?
R: Le scan ARP ne fonctionne PAS via VPN (couche 2 locale). Le scan TCP fonctionne mais avec latence accrue.

Q11: Puis-je intégrer SNM dans un pipeline CI/CD ?
R: Oui ! Utilisez cli/run_scan.py avec --discover et --target. Sortie JSON parsable. Voir exemples n8n.

Q12: Quelle différence entre SNM et Nmap ?
R: Nmap = scanner réseau. SNM = scanner + AI vulnerability prediction + reporting automatique + GUI moderne.
```

### 12. **Section Gallery Screenshots**
**Où**: Composant `Gallery.jsx` (existe déjà mais vide)
**Quoi ajouter**:
```
Screenshots à créer:
1. dashboard.png - Interface principale avec détection auto réseau
2. scan-progress.png - Scan en cours avec progress bar et threads actifs
3. results-table.png - Tableau des résultats avec ports/services/vulnérabilités
4. ai-analysis.png - Panneau d'analyse IA avec threat levels
5. html-report.png - Aperçu du rapport HTML généré
6. cli-mode.png - Interface CLI en mode terminal
7. telegram-alert.png - Notification Telegram reçue
8. history-db.png - Historique des scans dans SQLite

Note: Créer des placeholders temporaires dans public/screenshots/
```

---

## 📊 STATISTIQUES À METTRE À JOUR

| Métrique | Actuel | Correct |
|----------|--------|---------|
| Dataset CVE | 20,000 | **2,300,000+** |
| Threads scan | 200 | **300** |
| Scaler | StandardScaler | **RobustScaler** |
| Ports top | 1000 | **22 (fast), 65535 (full)** |
| Model size | 5.1GB | **5.1GB** ✅ |
| CVE sources | NVD uniquement | **NVD + IANA + Groq** |
| Features ML | 6+ | **40+** |

---

## 🔧 COMPOSANTS À CRÉER

### 1. `N8NWorkflow.jsx`
```jsx
Section complète sur l'automatisation n8n:
- Schéma visuel du workflow
- Code JSON du template
- Exemples d'intégration SIEM
- Use cases (scan quotidien, alertes Telegram)
```

### 2. `TestingQuality.jsx`
```jsx
Section tests et qualité:
- Framework pytest
- Couverture de code
- Tests unitaires/intégration
- Performance tests k6
- Commandes pour lancer tests
```

### 3. `IANAOsint.jsx`
```jsx
Section sources de données:
- IANA (service names)
- NVD (CVE database)
- Groq AI (rapports)
- Architecture caching
- Rate limits et fallbacks
```

### 4. `Packaging.jsx`
```jsx
Section packaging et release:
- PyInstaller build process
- Packaging script (package_release.bat)
- Upload Hugging Face
- Docker containerization
- GitHub Actions CI/CD
```

---

## 📁 FICHIERS À MODIFIER

### Priorité 1 (Corrections critiques)
1. ✅ `src/translations/index.js` — Corriger dataset, scaler, threads, commandes CLI

### Priorité 2 (Enrichissements composants existants)
2. ✅ `src/components/AIEngine.jsx` — Ajouter Wisdom Layer, hyperparamètres, threat details
3. ✅ `src/components/CVEDataset.jsx` — Pipeline détaillé, schema complet (40 features)
4. ✅ `src/components/FAQ.jsx` — Ajouter 7+ questions manquantes
5. ✅ `src/components/Developer.jsx` — Enrichir exemples API (5 exemples complets)
6. ✅ `src/components/Installation.jsx` — Préciser Npcap, admin rights, troubleshooting

### Priorité 3 (Nouveaux composants)
7. ✅ `src/components/N8NWorkflow.jsx` — Créer from scratch
8. ✅ `src/components/TestingQuality.jsx` — Créer from scratch
9. ✅ `src/components/IANAOsint.jsx` — Créer from scratch
10. ✅ `src/components/Packaging.jsx` — Créer from scratch

### Priorité 4 (Intégration & assets)
11. ✅ `src/components/Documentation.jsx` — Ajouter tabs pour nouveaux composants
12. ✅ `src/App.jsx` — Importer et afficher nouveaux composants
13. ✅ `public/screenshots/` — Créer placeholders pour gallery

---

## 🎨 STYLE (NE PAS TOUCHER)

### ✅ Conserver intégralement:
- Design system CSS (index.css)
- Composants visuels (Globe, BackgroundCanvas, animations)
- Couleurs (cyan #00ffff, purple #7c3aed, magenta #ff00ff)
- Typography (Orbitron, Inter, JetBrains Mono)
- Framer Motion animations
- Layout et grids

### ❌ Ne pas modifier:
- Tailles de police
- Espacements
- Effets visuels (backdrop-filter, glow, shadows)
- Responsive breakpoints

---

## 📝 PLAN D'EXÉCUTION

### Phase 1: Corrections factuelles (30 min)
1. Modifier `translations/index.js`:
   - Dataset: 20K → 2.3M
   - Threads: 200 → 300
   - Scaler: StandardScaler → RobustScaler
   - Commandes: python main.py → python cli/main.py

### Phase 2: Enrichissement composants existants (2h)
2. AIEngine.jsx:
   - Wisdom Layer section
   - Hyperparameters card
   - Threat levels détaillés

3. CVEDataset.jsx:
   - Pipeline step-by-step
   - Schema 40 columns
   - Training process

4. FAQ.jsx:
   - 7+ nouvelles questions/réponses

5. Developer.jsx:
   - 5 exemples API complets
   - Contribution guide détaillé

### Phase 3: Nouveaux composants (3h)
6. Créer N8NWorkflow.jsx
7. Créer TestingQuality.jsx
8. Créer IANAOsint.jsx
9. Créer Packaging.jsx

### Phase 4: Intégration (1h)
10. Mettre à jour Documentation.jsx sidebar
11. Importer dans App.jsx
12. Tester navigation et responsive

### Phase 5: Assets (30 min)
13. Créer placeholders screenshots
14. Vérifier tous les liens
15. Build & deploy test

---

## ✅ CRITÈRES DE SUCCÈS

- [ ] Aucune erreur factuelle (dataset, scaler, threads, commandes)
- [ ] Tous les aspects techniques couverts (AI, pipeline, tests, OSINT)
- [ ] Nouveaux composants créés et intégrés
- [ ] FAQ complète (12+ questions)
- [ ] Exemples de code fonctionnels
- [ ] Documentation 100% complète (rien n'est oublié)
- [ ] Style visuel inchangé (design system preserved)
- [ ] Site buildable sans erreurs
- [ ] Navigation fluide entre toutes les sections

---

## 🚀 COMMANDE FINALE

Après toutes les modifications:
```bash
npm run build
npm run preview  # Test local
npm run deploy   # GitHub Pages
```

---

**Audit créé le**: 2026-07-09  
**Temps estimé**: 6-7 heures de travail  
**Complexité**: Moyenne-Haute (beaucoup de détails techniques)
