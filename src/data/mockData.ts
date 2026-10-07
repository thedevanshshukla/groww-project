import type {
  UserProfile,
  AssetAllocationItem,
  EquitySector,
  PortfolioHolding,
  FinancialGoal,
  DecisionSupportItem,
  MarketIndex,
  StockItem
} from '../types';

export const mockIndices: MarketIndex[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50', price: 24852.15, change: 112.40, changePercent: 0.45 },
  { symbol: 'SENSEX', name: 'BSE Sensex', price: 81343.80, change: 305.20, changePercent: 0.38 },
  { symbol: 'BANK NIFTY', name: 'Bank Nifty', price: 51420.60, change: -45.10, changePercent: -0.09 },
  { symbol: 'NIFTY IT', name: 'Nifty IT', price: 38910.40, change: 420.80, changePercent: 1.09 }
];

export const mockExploreStocks: StockItem[] = [
  {
    id: 'stock-tata-tech',
    symbol: 'TATATECH',
    name: 'Tata Technologies Ltd',
    price: 1048.50,
    change: 34.80,
    changePercent: 3.42,
    sector: 'Technology',
    category: 'Stocks',
    marketCap: '₹42,530 Cr',
    pe: 62.4,
    industryPe: 28.6,
    high52: 1400.00,
    low52: 970.00,
    todayHigh: 1058.20,
    todayLow: 1012.00,
    volume: '3.4M',
    isTrending: true,
    isInWatchlist: true,
    copilotAlert: 'Increases tech to 36.2%',
    description: 'Engineering and digital services provider focused on global automotive, aerospace, and industrial heavy machinery.'
  },
  {
    id: 'stock-hdfc-bank',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: 1684.20,
    change: 13.70,
    changePercent: 0.82,
    sector: 'Financials',
    category: 'Stocks',
    marketCap: '₹12,80,400 Cr',
    pe: 18.9,
    industryPe: 19.5,
    high52: 1794.00,
    low52: 1363.00,
    todayHigh: 1692.00,
    todayLow: 1675.00,
    volume: '9.2M',
    isTrending: true,
    isInWatchlist: true,
    description: "India's largest private sector bank by assets offering retail and corporate banking services."
  },
  {
    id: 'stock-nifty-bees',
    symbol: 'NIFTYBEES',
    name: 'Nippon India ETF Nifty 50 BeES',
    price: 268.40,
    change: 1.28,
    changePercent: 0.48,
    sector: 'Broad Market',
    category: 'ETFs',
    marketCap: '₹24,120 Cr',
    pe: 23.1,
    industryPe: 23.1,
    high52: 275.00,
    low52: 205.00,
    todayHigh: 269.10,
    todayLow: 267.50,
    volume: '15.4M',
    isTrending: false,
    isInWatchlist: false,
    description: 'Exchange Traded Fund tracking the top 50 diversified Indian companies in the Nifty 50 Index.'
  },
  {
    id: 'stock-infosys',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    price: 1582.00,
    change: 18.70,
    changePercent: 1.20,
    sector: 'Technology',
    category: 'Stocks',
    marketCap: '₹6,57,000 Cr',
    pe: 24.8,
    industryPe: 28.6,
    high52: 1680.00,
    low52: 1358.00,
    todayHigh: 1590.00,
    todayLow: 1570.00,
    volume: '5.1M',
    isInPortfolio: true,
    isInWatchlist: true,
    description: 'Global leader in next-generation digital services and consulting.'
  },
  {
    id: 'stock-tata-motors',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    price: 945.60,
    change: 19.40,
    changePercent: 2.10,
    sector: 'Automobile',
    category: 'Stocks',
    marketCap: '₹3,48,000 Cr',
    pe: 15.2,
    industryPe: 21.0,
    high52: 1179.00,
    low52: 608.00,
    todayHigh: 952.00,
    todayLow: 932.00,
    volume: '12.8M',
    isTrending: true,
    isInWatchlist: false,
    description: 'Leading global automobile manufacturer with passenger cars, commercial vehicles, and Jaguar Land Rover.'
  },
  {
    id: 'mf-parag-parikh',
    symbol: 'PPFCF',
    name: 'Parag Parikh Flexi Cap Direct-Growth',
    price: 78.40,
    change: 0.89,
    changePercent: 1.15,
    sector: 'Multi-Cap Equity',
    category: 'Mutual Funds',
    marketCap: '₹68,400 Cr (AUM)',
    high52: 82.00,
    low52: 64.00,
    isInPortfolio: true,
    isInWatchlist: false,
    description: 'Flexicap mutual fund investing across large, mid, and small cap Indian and international equities.'
  }
];

export const mockUser: UserProfile = {
  name: 'Devansh',
  age: 22,
  role: 'Associate Analyst (1st Job)',
  experience: 'beginner',
  riskComfort: 'moderate',
  primaryGoal: 'long_term_wealth',
  monthlyIncome: 45000,
  monthlyExpenses: 28000,
  currentSavings: 120000,
  monthlyInvestment: 10000,
  investmentTypes: ['Stocks', 'Mutual Funds', 'SIPs'],
  emergencyFundCoverageMonths: 2.6 // ₹72,000 / ₹28,000
};

export const mockAssetAllocation: AssetAllocationItem[] = [
  { name: 'Equity', percentage: 72, value: 132624, color: '#00D09C' },
  { name: 'Debt', percentage: 18, value: 33156, color: '#3B82F6' },
  { name: 'Gold', percentage: 10, value: 18420, color: '#F59E0B' }
];

export const mockEquitySectors: EquitySector[] = [
  {
    sector: 'Technology',
    percentage: 31,
    benchmarkPercentage: 18,
    status: 'elevated',
    note: 'Elevated: 31% vs 18% Nifty 50 benchmark. Vulnerable to tech pullbacks.'
  },
  {
    sector: 'Financials',
    percentage: 24,
    benchmarkPercentage: 28,
    status: 'balanced',
    note: 'Balanced core allocation across top private banking.'
  },
  {
    sector: 'Healthcare',
    percentage: 12,
    benchmarkPercentage: 9,
    status: 'balanced',
    note: 'Defensive growth exposure via pharma funds.'
  },
  {
    sector: 'Consumer',
    percentage: 10,
    benchmarkPercentage: 11,
    status: 'balanced',
    note: 'FMCG and retail exposure providing cash-flow stability.'
  },
  {
    sector: 'Others',
    percentage: 23,
    benchmarkPercentage: 34,
    status: 'balanced',
    note: 'Diversified across manufacturing, energy, and metals.'
  }
];

export const mockHoldings: PortfolioHolding[] = [
  {
    id: 'h1',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Equity',
    investedAmount: 42000,
    currentValue: 48600,
    returnsPercentage: 15.7,
    units: 682.4,
    avgPrice: 61.5
  },
  {
    id: 'h2',
    name: 'UTI Nifty 50 Index Fund',
    category: 'Equity',
    investedAmount: 38000,
    currentValue: 41800,
    returnsPercentage: 10.0,
    units: 245.8,
    avgPrice: 154.6
  },
  {
    id: 'h3',
    name: 'Tata Consultancy Services (TCS)',
    category: 'Equity',
    sector: 'Technology',
    investedAmount: 22000,
    currentValue: 24800,
    returnsPercentage: 12.7,
    units: 6,
    avgPrice: 3666
  },
  {
    id: 'h4',
    name: 'Infosys Ltd',
    category: 'Equity',
    sector: 'Technology',
    investedAmount: 16000,
    currentValue: 17424,
    returnsPercentage: 8.9,
    units: 11,
    avgPrice: 1454
  },
  {
    id: 'h5',
    name: 'ICICI Prudential Short Term Fund',
    category: 'Debt',
    investedAmount: 31000,
    currentValue: 33156,
    returnsPercentage: 6.9,
    units: 612.8,
    avgPrice: 50.6
  },
  {
    id: 'h6',
    name: 'Nippon India ETF Gold BeES',
    category: 'Gold',
    investedAmount: 17000,
    currentValue: 18420,
    returnsPercentage: 8.35,
    units: 320,
    avgPrice: 53.1
  }
];

export const mockPortfolio = {
  totalValue: 184200,
  equityAllocation: 72,
  debtAllocation: 18,
  goldAllocation: 10,
  technologyExposure: 31,
  holdings: mockHoldings
};

export const mockGoals: FinancialGoal[] = [
  {
    id: 'g1',
    title: 'Emergency Fund',
    category: 'safety',
    currentAmount: 72000,
    targetAmount: 100000,
    monthlyContribution: 3000,
    priority: 'High',
    status: 'Needs Attention',
    description: 'Covers ~2.6 months of your ₹28,000 monthly expenses. Target is 3.5 months (₹1,00,000).',
    copilotAdvice: 'You are ₹28,000 away from your safety cushion. Build this before taking new high-risk equity bets.'
  },
  {
    id: 'g2',
    title: 'Higher Studies (MBA / Masters)',
    category: 'medium-term',
    currentAmount: 120000,
    targetAmount: 300000,
    targetDate: '2028',
    monthlyContribution: 4000,
    priority: 'Medium',
    status: 'On Track',
    description: 'Target: ₹3,00,000 by mid-2028. Disciplined SIP in low-volatility hybrid funds.',
    copilotAdvice: 'On track with current ₹4,000 monthly SIP pace. Avoid locking this into volatile small-caps.'
  },
  {
    id: 'g3',
    title: 'Long-term Wealth',
    category: 'wealth',
    currentAmount: 184200,
    targetAmount: 500000,
    targetDate: '2031 (10-yr compounding)',
    monthlyContribution: 3000,
    priority: 'Medium',
    status: 'Ahead',
    description: 'Building equity portfolio compounding for 10+ years across index and flexicap funds.',
    copilotAdvice: 'Growing well at 11.2% annualized return. Focus on sector diversification rather than chasing short-term stocks.'
  }
];

export const mockScenarios: DecisionSupportItem[] = [
  {
    id: 'scenario-tata-tech',
    query: 'Should I invest ₹15,000 in Tata Technologies right now? Saw it trending on Instagram Reels.',
    assetName: 'Tata Technologies Ltd',
    proposedAmount: 15000,
    fomoContext: 'Social media hype & high trading volume following recent auto-tech buzz.',
    answers: {
      whatShouldIDo: 'Trade-off to consider: buying now would increase your technology exposure, while waiting or investing a smaller amount would leave more room to build your emergency fund.',
      whyShouldIDoIt: 'Your technology exposure is above the 20% target you selected (currently 31%, from TCS, Infosys, and tech in Flexicap). Sector concentration can increase the impact of a downturn in that sector. The right allocation depends on your goals and risk comfort.',
      goalFit: 'Devansh, your Emergency Fund is currently at ₹72,000 (₹28,000 short of your ₹1,00,000 target). Channelling cash into volatile single stocks right now delays your core financial safety cushion.',
      riskAssessment: 'Concentration Risk: If the IT sector witnesses a 15% drawdown, over 36% of your total net worth will bear the impact.',
      fomoCheck: 'Instagram/YouTube hype often peaks when valuations are already stretched. Ask yourself: "Would I invest in this if nobody online was talking about it?"'
    },
    portfolioImpact: {
      currentTechExposure: 31,
      projectedTechExposure: 36.2,
      recommendedMaxTech: 20,
      emergencyFundGap: 28000,
      alternateAllocationSuggestion: {
        emergencyFund: 10000,
        diversifiedEquity: 5000
      }
    },
    keyTakeaway: 'Decisions made to chase social trends often feel urgent, but compounding rewards patience and diversification.',
    actionChoices: [
      {
        id: 'safety-first',
        label: 'Strengthen Emergency Fund (₹10,000)',
        type: 'primary',
        description: 'Brings your emergency fund to ₹82,000 (82% complete) with guaranteed peace of mind.'
      },
      {
        id: 'balanced-sip',
        label: 'Add to Broad Index Fund (₹5,000)',
        type: 'secondary',
        description: 'Diversifies across 50 top Indian companies instead of stacking risk in one tech stock.'
      },
      {
        id: 'watchlist-cooloff',
        label: 'Save to Watchlist for Later Review',
        type: 'outline',
        description: 'Track Tata Tech while you research quarterly financials and sector valuation.'
      }
    ]
  },
  {
    id: 'scenario-crypto-fomo',
    query: 'My college friend made 40% on an altcoin in 2 weeks. Should I put ₹10,000 in crypto?',
    assetName: 'Speculative Crypto Asset',
    proposedAmount: 10000,
    fomoContext: 'Peer comparison and survivorship bias (friends share wins, rarely losses).',
    answers: {
      whatShouldIDo: 'If curious, cap experimental speculative bets at no more than 2-3% of total net worth (max ₹3,500 for Devansh).',
      whyShouldIDoIt: 'Speculative crypto has extreme volatility (drawdowns >60% are routine). It does not generate underlying business cash flows or dividends.',
      goalFit: 'This does not support your 2028 Higher Studies goal or your Emergency Fund.',
      riskAssessment: 'Loss probability: High volatility. Capital could halve within days.',
      fomoCheck: 'Survivorship bias alert: People rarely post their 50% losses on WhatsApp groups or Instagram stories.'
    },
    portfolioImpact: {
      currentTechExposure: 31,
      projectedTechExposure: 31,
      recommendedMaxTech: 20,
      emergencyFundGap: 28000,
      alternateAllocationSuggestion: {
        emergencyFund: 7000,
        diversifiedEquity: 3000
      }
    },
    keyTakeaway: 'Wealth creation for young investors is driven by high savings rate and uninterrupted compounding, not lottery tickets.',
    actionChoices: [
      {
        id: 'stay-the-course',
        label: 'Stick to Planned ₹10,000 Monthly SIP',
        type: 'primary',
        description: 'Maintain your disciplined investment plan without side distractions.'
      },
      {
        id: 'small-experiment',
        label: 'Cap Experiment at ₹2,500 Max',
        type: 'secondary',
        description: 'Learn without endangering your financial safety net.'
      }
    ]
  }
];

export const mockProductCaseStudyInfo = {
  candidateRole: 'Groww Product Intern Case Study',
  targetPersona: 'Gen Z Investor (India, 20–26 yrs, 1st salary / students)',
  coreThesis: 'Groww should help Gen Z investors make better financial decisions, not simply give them more investment choices.',
  keyPillars: [
    {
      title: 'Context over Catalog',
      desc: 'Instead of thousands of mutual funds and stocks thrown at a beginner, provide personal portfolio context.'
    },
    {
      title: 'Goal-First Guardrails',
      desc: 'Evaluate every action against safety buffers (Emergency Fund) and life goals (Higher Studies).'
    },
    {
      title: 'Social Context Awareness',
      desc: 'Detect social media motivation, prompt pre-trade reviews, and explain concentration risks in simple human terms.'
    },
    {
      title: 'User Autonomy with Clarity',
      desc: 'Never block users patronizingly; empower them with transparent "Why" and "Before vs After" impact.'
    }
  ]
};
