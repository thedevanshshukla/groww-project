export type NavTab = 'home' | 'explore' | 'portfolio' | 'goals' | 'profile' | 'copilot';

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  category: 'Stocks' | 'Mutual Funds' | 'ETFs';
  marketCap?: string;
  pe?: number;
  industryPe?: number;
  high52?: number;
  low52?: number;
  todayHigh?: number;
  todayLow?: number;
  volume?: string;
  isTrending?: boolean;
  isInWatchlist?: boolean;
  isInPortfolio?: boolean;
  copilotAlert?: string;
  description?: string;
}

export type ExperienceLevel = 'beginner' | 'getting_started' | 'experienced';
export type RiskComfortLevel = 'conservative' | 'moderate' | 'aggressive';
export type PrimaryGoalType =
  | 'long_term_wealth'
  | 'emergency_fund'
  | 'higher_education'
  | 'home'
  | 'multiple';

export interface UserProfile {
  name: string;
  age?: number;
  role?: string;
  experience: ExperienceLevel;
  riskComfort: RiskComfortLevel;
  primaryGoal: PrimaryGoalType;
  monthlyInvestment: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  currentSavings?: number;
  investmentTypes: string[];
  emergencyFundCoverageMonths?: number;
}

export interface CopilotDecisionContext {
  userProfile: UserProfile;
  portfolio: {
    totalValue: number;
    equityAllocation: number;
    debtAllocation: number;
    goldAllocation: number;
    technologyExposure: number;
    holdings: PortfolioHolding[];
  };
  goals: FinancialGoal[];
  asset: {
    id?: string;
    symbol: string;
    name: string;
    sector: string;
    category?: string;
    price: number;
    pe?: number;
    industryPe?: number;
    marketCap?: string;
  };
  intendedAmount: number;
  deterministicFacts: {
    currentTechExposure: number;
    projectedTechExposure: number;
    emergencyFundCurrent: number;
    emergencyFundTarget: number;
    emergencyFundGap: number;
    monthlyCapacityPercent: number;
  };
  decisionContext: {
    source: 'explore' | 'instagram' | 'search' | 'watchlist' | 'trending';
    queryOrPrompt?: string;
  };
}

export interface CopilotResponse {
  summary: string;
  portfolioFit: {
    label: string;
    status: 'good' | 'caution' | 'neutral';
    explanation: string;
  };
  goalFit: {
    label: string;
    status: 'good' | 'caution' | 'neutral';
    explanation: string;
  };
  portfolioImpact: {
    before: string;
    after: string;
    explanation: string;
  };
  purchaseContext: {
    label: string;
    explanation: string;
  };
  tradeoffs: string[];
  researchChecklist: string[];
}

export interface AssetAllocationItem {
  name: string;
  percentage: number;
  value: number;
  color: string;
}

export interface EquitySector {
  sector: string;
  percentage: number;
  benchmarkPercentage: number;
  status: 'balanced' | 'elevated' | 'underweight';
  note: string;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Gold';
  sector?: string;
  investedAmount: number;
  currentValue: number;
  returnsPercentage: number;
  units: number;
  avgPrice: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  category: 'safety' | 'medium-term' | 'wealth';
  currentAmount: number;
  targetAmount: number;
  targetDate?: string;
  monthlyContribution: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Needs Attention' | 'On Track' | 'Ahead';
  description: string;
  copilotAdvice: string;
}

export interface DecisionSupportItem {
  id: string;
  query: string;
  assetName: string;
  proposedAmount: number;
  fomoContext: string;
  answers: {
    whatShouldIDo: string;
    whyShouldIDoIt: string;
    goalFit: string;
    riskAssessment: string;
    fomoCheck: string;
  };
  portfolioImpact: {
    currentTechExposure: number;
    projectedTechExposure: number;
    recommendedMaxTech: number;
    emergencyFundGap: number;
    alternateAllocationSuggestion: {
      emergencyFund: number;
      diversifiedEquity: number;
    };
  };
  keyTakeaway: string;
  actionChoices: Array<{
    id: string;
    label: string;
    type: 'primary' | 'secondary' | 'outline';
    description: string;
  }>;
}
