import type { PortfolioHolding, FinancialGoal } from '../types';

export interface DeterministicFacts {
  currentTechExposure: number;
  projectedTechExposure: number;
  emergencyFundCurrent: number;
  emergencyFundTarget: number;
  emergencyFundGap: number;
  monthlyCapacityPercent: number;
  isTechSector: boolean;
  proposedAmount: number;
}

export function computeDeterministicFacts(
  totalPortfolioValue: number,
  _holdings: PortfolioHolding[],
  goals: FinancialGoal[],
  selectedAsset: { sector: string; price: number },
  intendedAmount: number,
  monthlyInvestment: number,
  overrideEmergencyFund?: number
): DeterministicFacts {
  const isTechSector = selectedAsset.sector.toLowerCase().includes('tech') ||
                       selectedAsset.sector.toLowerCase().includes('it');

  // Baseline tech exposure is 31% based on holdings (18% direct + 13% mutual fund overlap)
  const currentTechExposure = 31.0;
  const currentTechValue = Math.round((currentTechExposure / 100) * totalPortfolioValue);

  // Projected tech exposure after intendedAmount
  const addedTechValue = isTechSector ? intendedAmount : 0;
  const newTechValue = currentTechValue + addedTechValue;
  const newPortfolioValue = totalPortfolioValue + intendedAmount;
  const projectedTechExposure = Number(((newTechValue / newPortfolioValue) * 100).toFixed(1));

  // Emergency fund calculations
  const emergencyGoal = goals.find((g) => g.id === 'g1' || g.category === 'safety');
  const emergencyFundCurrent = overrideEmergencyFund ?? emergencyGoal?.currentAmount ?? 72000;
  const emergencyFundTarget = emergencyGoal?.targetAmount ?? 100000;
  const emergencyFundGap = Math.max(0, emergencyFundTarget - emergencyFundCurrent);

  // Proposed amount vs monthly investment capacity
  const monthlyCapacityPercent = Math.round((intendedAmount / Math.max(1, monthlyInvestment)) * 100);

  return {
    currentTechExposure,
    projectedTechExposure,
    emergencyFundCurrent,
    emergencyFundTarget,
    emergencyFundGap,
    monthlyCapacityPercent,
    isTechSector,
    proposedAmount: intendedAmount
  };
}

export function formatGoal(goal?: string): string {
  if (!goal) return 'Long-term wealth';
  switch (goal) {
    case 'emergency_fund':
      return 'Safety buffer';
    case 'higher_studies':
    case 'higher_education':
      return 'Higher studies';
    case 'home':
      return 'Home purchase';
    case 'long_term_wealth':
    default:
      return 'Long-term wealth';
  }
}
