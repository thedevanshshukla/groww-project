# Groww Copilot — Intelligent Decision Support for Gen Z Investors

> **Product Case Study**: *"Groww should help Gen Z investors make better financial decisions, not simply give them more choices."*

Groww Copilot is an objective, contextual decision-support layer integrated directly into the Groww investment workflow. Designed specifically for young retail investors in their 20s, it bridges the gap between social media discovery (Instagram Reels, YouTube Finfluencers, Twitter/X buzz) and disciplined, long-term wealth creation—without ever telling users what to buy or sell.

---

## 🎯 The Core Problem

Young Gen Z investors in India enter the markets with high enthusiasm but face critical behavioral challenges:

1. **Social Media FOMO & Impulse Buying**: Users discover momentum stocks on Instagram or Twitter and place immediate market orders without fundamental context.
2. **Hidden Concentration Risk**: Investors buy popular single tech stocks (e.g., Tata Tech, TCS, Infosys) unaware that their existing Flexi Cap or Index funds already allocate 30%+ to the same tech sector.
3. **Order Sizing Disconnected from Cash Flow**: A user with a ₹10,000/month SIP might place a spontaneous ₹15,000 single-stock order (150% of monthly capacity), straining liquid savings.
4. **Skipped Safety Buffers**: Capital is allocated into high-volatility equities before establishing a foundational 3-6 month emergency fund.
5. **Jargon Overwhelm**: Traditional brokerage apps throw dense metrics ($P/E$, $\beta$, Sharpe ratios) at beginners, leading either to cognitive overload or blind guessing.

---

## 💡 The Solution: Groww Copilot

Copilot does not act as an automated robo-advisory or financial advisor giving buy/sell mandates. Instead, it acts as an **objective, intelligent decision guardrail** that presents mathematically grounded trade-offs in plain, everyday English.

### Key Pillars & Features

### 1. Clean & Essential Home Hub
- **Zero Wall-of-Text Clutter**: Cleaned up bulky marketing cards in favor of a sleek, essential fintech dashboard.
- **Smart "Copilot Heads Up" Pill**: Instant one-line situational awareness (`You have 31% in tech shares. Build safety buffer before high-risk bets → Ask`).
- **Live Market Pulse & Portfolio Snapshot**: Clean indices ticker (Nifty 50, BSE Sensex, Bank Nifty, Nifty IT), total valuation, 1-day gain, asset allocation bar, and 1-item concentration alert.

### 2. Formulated Gen Z English (Zero Jargon by Default)
- Replaces academic corporate finance jargon with crisp, relatable, empathetic explanations:
  - *Jargon:* `"Valuation multiple of 62.4x P/E exceeds sector average of 28.6x, requiring sustained quarterly earnings expansion."*
  - *Copilot English:* *"Priced on hype: Tata Tech trades at 62.4x earnings vs 28.6x industry average—it is priced very high."*
  - *Contextual Gut-Check:* *"You already own a lot of tech shares (31%). Adding more means any tech dip hits your savings harder. Plus, you still have a ₹28,000 gap in your emergency fund."*

### 3. Progressive Disclosure ("View Technical Details" Toggle)
- Keeps the default interface clean and digestible for beginners while preserving institutional-grade rigor for experienced investors.
- Hides complex metrics behind a single collapsible accordion button:
  `[ 🎛️ View Technical Details (P/E, Beta, Exposure)  View ⌄ ]`
- **Expanded Breakdown includes:**
  - **Valuation Multiple:** $62.4\times$ (vs $28.6\times$ IT benchmark) • $118\%$ valuation premium.
  - **Sector Concentration:** $31.0\% \rightarrow 36.2\%$ Tech exposure.
  - **Order Sizing Capacity:** $150\%$ of monthly SIP capacity (₹15,000 order vs ₹10,000 SIP).
  - **Safety Buffer Gap:** ₹28,000 deficit on a ₹1,00,000 target.
  - **Holdings Overlap Note:** Highlights direct holdings + underlying Flexi Cap mutual fund allocations.

### 4. Apple Intelligence / Perplexity-Style Modern Thinking Layer
- Replaced heavy loading boxes and progress bars with a minimal, glassmorphic thinking pill with subtle spinning micro-sparks and ambient pulsing dots.
- Reassures the user through rapid micro-steps:
  - `Checking your holdings...`
  - `Checking safety cushion & capacity...`
  - `Formulating simple trade-offs...`

### 5. 100% User Autonomy & Alternative Actions
- Copilot **never commands** `"Buy"` or `"Don't Buy"`.
- Offers 3 constructive, low-friction paths forward:
  - **Top up Safety Net**: Direct link to allocate ₹5,000 to the emergency fund in Goals.
  - **Browse Index Funds**: Explores diversified 50-stock index baskets.
  - **Add to Watchlist**: Encourages a cooling-off period to review next quarterly earnings before acting.

### 6. Deterministic Financial Engine (No Hallucinations)
- All numbers, overlaps, and percentages are computed client-side by `src/services/financialEngine.ts` using verified arithmetic.
- The Copilot advisory layer is grounded in deterministic facts, preventing LLM arithmetic hallucination.

### 7. Persona Simulator (Instant Investor Switching)
- Switch between 3 realistic Gen Z investor archetypes:
  - **Devansh**: Moderate Beginner • ₹10,000/mo SIP • Building emergency fund + long-term wealth.
  - **Ananya**: Conservative Saver • Low risk tolerance • Prioritizes capital preservation and fixed deposits.
  - **Kabir**: Aggressive Wealth Builder • High risk tolerance • Explores growth equities and thematic opportunities.

### 8. Dual View Modes & Groww Themes
- **Desktop Full-Width Mode**: Wide responsive view with sidebar navigation.
- **Mobile Mockup Mode**: Isolated 390px iPhone-style frame with dynamic island notch.
- **Theme Support**: Seamless toggling between Groww Dark and Groww Light modes.

---

## 🏗️ Architecture & Directory Structure

```
groww/
├── src/
│   ├── components/
│   │   ├── charts/             # AllocationBar, SectorBreakdownChart
│   │   ├── common/             # Button, Badge, Modal, ProgressBar, Toast
│   │   ├── layout/             # AppShell, BottomNav, SidebarNav, PersonaModal
│   │   ├── onboarding/         # Gen Z Welcome & Decision Guard Modal
│   │   └── profile/            # EditProfileModal, RiskToleranceSelector
│   ├── data/
│   │   └── mockData.ts         # User profiles, portfolios, indices, stock catalog
│   ├── pages/
│   │   ├── Home.tsx            # Clean, essential dashboard with live market pulse
│   │   ├── Copilot.tsx         # Interactive decision stream, prompts, thinking layer
│   │   ├── Explore.tsx         # Stock catalog with real-time Copilot badge tags
│   │   ├── StockDetail.tsx     # Deep dive with contextual "Before Investing" analysis
│   │   ├── Portfolio.tsx       # Asset allocation, fund overlap, holdings table
│   │   ├── Goals.tsx           # Emergency buffer progress & financial milestones
│   │   └── Profile.tsx         # Investor preferences, risk comfort, switch persona
│   ├── services/
│   │   ├── financialEngine.ts  # Deterministic math: concentration, capacity, overlap
│   │   └── copilotService.ts   # Adaptive advisory synthesis & fallback engine
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & domain models
│   ├── App.tsx                 # Root router, global theme state, toast manager
│   ├── index.css               # Design system tokens, custom animations, typography
│   └── main.tsx                # React 19 entrypoint
├── vite.config.ts              # Vite server & local Gemini API middleware
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
cd groww

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Open your browser at `http://localhost:5173/`.

### Building for Production

```bash
# Typecheck with TypeScript and build optimized bundle
npm run build
```

### Linting

```bash
# Run ultra-fast oxlint
npm run lint
```

---

## 🧪 Testing the Copilot Experience

Try testing these primary user flows:

1. **The Instagram FOMO Flow**:
   - Navigate to **Copilot** (or tap **Ask Copilot** in the header).
   - Tap prompt: `🔥 Is Tata Tech social media hype?`
   - Observe the **Thinking Layer** pulsing through validation steps.
   - Read the **Copilot Take** in plain English.
   - Tap **"View Technical Details (P/E, Beta, Exposure)"** to see the quantitative overlap and valuation multiple.
   - Tap **"Add to Watchlist"** to simulate a disciplined cooling-off period.

2. **The High-Beta Conglomerate Flow**:
   - Ask: `"should invest in adani"`
   - Copilot checks leverage, sector allocation, and emergency fund buffer before presenting trade-offs.

3. **Persona Adaptation**:
   - Switch persona from **Devansh** to **Ananya** (Conservative).
   - Notice how Copilot shifts its advisory emphasis toward capital preservation, liquidity, and fixed-income cushions.

4. **Mobile Frame Preview**:
   - Click the **📱 Mobile Device Icon** in the top-right header to test the interface inside an authentic 390px mobile viewport.

---

## 📈 Product Success Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| **Impulse Purchase Reduction** | 25%+ drop | Tracking cooling-off watchlist additions vs instant buy executions on trending stocks. |
| **Safety Net Completion** | 35%+ increase | Users funding emergency buffers before making high-risk equity allocations. |
| **Overlap Awareness** | 80%+ engagement | Expansion of the *"View Technical Details"* accordion among active users. |
| **Gen Z User Trust** | >4.5 / 5.0 CSAT | User sentiment regarding objective non-judgmental guidance vs unsolicited stock tips. |
