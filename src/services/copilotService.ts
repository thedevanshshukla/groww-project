import type { CopilotDecisionContext, CopilotResponse } from '../types';

export function generateProfileAdaptiveResponse(context: CopilotDecisionContext): CopilotResponse {
  const { userProfile, deterministicFacts, asset } = context;
  const { experience, riskComfort, primaryGoal } = userProfile;
  const { currentTechExposure, projectedTechExposure, emergencyFundGap, monthlyCapacityPercent } = deterministicFacts;

  // Archetype 1: Conservative OR Primary Goal is Emergency Fund (e.g. Ananya)
  if (riskComfort === 'conservative' || primaryGoal === 'emergency_fund') {
    return {
      summary: `Your primary financial priority is establishing capital safety. Committing ₹${context.intendedAmount.toLocaleString('en-IN')} to a single high-valuation equity stock runs counter to completing your foundational emergency buffer first.`,
      portfolioFit: {
        label: '⚠️ High Volatility Risk',
        status: 'caution',
        explanation: 'Single equity stocks experience sharp price fluctuations, which conflicts with your conservative risk preference.'
      },
      goalFit: {
        label: '🛡️ Safety Buffer Priority',
        status: 'caution',
        explanation: emergencyFundGap > 0
          ? `You still have a ₹${emergencyFundGap.toLocaleString('en-IN')} deficit before your emergency fund is fully secured.`
          : 'Preserving capital and liquid reserves takes precedence over speculative equities.'
      },
      portfolioImpact: {
        before: `${currentTechExposure}%`,
        after: `${projectedTechExposure}%`,
        explanation: `Locks liquid capital into volatile equities rather than safe, interest-bearing reserves.`
      },
      purchaseContext: {
        label: 'Social media recommendation',
        explanation: 'You mentioned discovering this on Instagram. Viral recommendations rarely align with capital preservation goals.'
      },
      tradeoffs: [
        `Emergency buffer comes first: Allocating ₹${context.intendedAmount.toLocaleString('en-IN')} here delays completing your safety cushion, leaving you vulnerable to unexpected expenses.`,
        `Capital preservation: Single stocks can drop 10–20% quickly, which can cause significant stress for conservative investors.`,
        `Capacity strain: At ₹${context.intendedAmount.toLocaleString('en-IN')}, this order represents ${monthlyCapacityPercent}% of your monthly savings capacity.`
      ],
      researchChecklist: [
        'Does taking single-stock risk support or delay my primary goal of building financial security?',
        'Can I comfortably afford to see this capital drop in value over the next 6–12 months?',
        'Would a low-volatility liquid fund or fixed deposit better serve my current safety needs?'
      ]
    };
  }

  // Archetype 2: Experienced AND Aggressive (e.g. Kabir)
  if (experience === 'experienced' || riskComfort === 'aggressive') {
    return {
      summary: `You already have meaningful technology exposure (31%). Given your higher risk comfort, concentration may be less of an immediate concern, but the high valuation multiple (62.4x P/E) and incremental exposure (+5.2%) are worth examining before expanding your tech tilt.`,
      portfolioFit: {
        label: '✓ High Risk Tolerance',
        status: 'good',
        explanation: `Your aggressive profile accommodates volatility, but a ${projectedTechExposure}% tech exposure creates an intentional, heavy sector tilt.`
      },
      goalFit: {
        label: '✓ Horizon Aligned',
        status: 'good',
        explanation: 'Fits your multi-year wealth compounding horizon. Your capital base and monthly capacity easily support equity volatility.'
      },
      portfolioImpact: {
        before: `${currentTechExposure}%`,
        after: `${projectedTechExposure}%`,
        explanation: `Adds a +${(projectedTechExposure - currentTechExposure).toFixed(1)}% overweight tilt to ER&D tech across direct and mutual fund holdings.`
      },
      purchaseContext: {
        label: 'Social momentum query',
        explanation: 'Evaluating high-momentum growth equity at a premium valuation multiple.'
      },
      tradeoffs: [
        `Valuation multiple sensitivity: At 62.4x P/E vs 28.6x IT industry average (118% premium), future gains depend on aggressive earnings delivery rather than multiple expansion.`,
        `Order sizing & liquidity: At ₹${context.intendedAmount.toLocaleString('en-IN')}, this order is only ${monthlyCapacityPercent}% of your monthly capacity—comfortable on cash flow, so timing and valuation matter more than capital strain.`,
        `Staggered entry vs lump-sum: Consider entering in tactical tranches across pullbacks rather than a single lump-sum buy at peak momentum.`
      ],
      researchChecklist: [
        'Is Tata Tech’s 62.4x multiple justified compared to global ER&D peers like KPIT or L&T Technology?',
        'How does this single-stock bet fit alongside my core diversified equity index holdings?',
        'Am I prepared to hold or average down through a 15–20% cyclical IT correction?'
      ]
    };
  }

  // Archetype 3: Beginner / Moderate / Default (e.g. Devansh)
  return {
    summary: `Your current portfolio has 31% technology exposure. Adding this would take it to about ${projectedTechExposure}%. Since you're still building your portfolio, consider whether that concentration fits your long-term goal before making a single-stock allocation.`,
    portfolioFit: {
      label: '⚠️ Tech Concentration',
      status: 'caution',
      explanation: 'Over a third of your savings (36.2%) would be tied to tech stocks between your direct holdings and Flexi Cap mutual funds.'
    },
    goalFit: {
      label: '🛡️ Safety Buffer First',
      status: 'caution',
      explanation: emergencyFundGap > 0
        ? `You still have a ₹${emergencyFundGap.toLocaleString('en-IN')} gap before your emergency cushion reaches ₹1,00,000.`
        : 'Ensure your liquid reserves are untouched before taking single-stock equity bets.'
    },
    portfolioImpact: {
      before: `${currentTechExposure}%`,
      after: `${projectedTechExposure}%`,
      explanation: `A 10% pullback in tech shares would affect over ${projectedTechExposure}% of your total portfolio while you are still establishing your core foundation.`
    },
    purchaseContext: {
      label: 'Social media discovery',
      explanation: 'You mentioned discovering this on Instagram. Social momentum usually peaks after initial rallies have already happened.'
    },
    tradeoffs: [
      `Concentration vs core: At ₹${context.intendedAmount.toLocaleString('en-IN')}, this single order represents ${monthlyCapacityPercent}% of your regular monthly SIP—a relatively large one-off commitment while still laying portfolio foundations.`,
      `Safety cushion priority: Allocating ₹${context.intendedAmount.toLocaleString('en-IN')} here delays completing your ₹1,00,000 emergency fund (₹${emergencyFundGap.toLocaleString('en-IN')} remaining gap).`,
      `Valuation premium: ${asset.name} trades at a 62.4x P/E vs 28.6x IT industry average—pricing in high earnings expectations.`
    ],
    researchChecklist: [
      'Do I understand how Tata Technologies earns revenue compared to traditional IT services?',
      'Would I rather finish my emergency cushion before adding single-stock risk?',
      'Would I still buy this today if I hadn’t seen it discussed on Instagram?'
    ]
  };
}

export async function analyzeInvestmentDecision(context: CopilotDecisionContext): Promise<CopilotResponse> {
  try {
    const response = await fetch('/api/copilot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.summary && data.portfolioFit && data.tradeoffs) {
        return data as CopilotResponse;
      }
    }
  } catch {
    // Graceful fallback to client-side engine if endpoint is offline or unavailable
  }

  // Simulated latency (250ms) to ensure smooth loading transition
  await new Promise((resolve) => setTimeout(resolve, 250));
  return generateProfileAdaptiveResponse(context);
}

export async function askCopilotQuestion(
  question: string,
  userProfile: any,
  emergencyFundAmount = 72000
): Promise<CopilotResponse> {
  const context = {
    userProfile,
    portfolio: {
      totalValue: 184200,
      equityAllocation: 72,
      debtAllocation: 18,
      goldAllocation: 10,
      technologyExposure: 31,
      holdings: []
    },
    goals: [],
    asset: {
      symbol: 'TATATECH',
      name: 'Tata Technologies Ltd',
      sector: 'Technology',
      price: 1048.5,
      pe: 62.4,
      industryPe: 28.6
    },
    intendedAmount: 15000,
    deterministicFacts: {
      currentTechExposure: 31.0,
      projectedTechExposure: 36.2,
      emergencyFundCurrent: emergencyFundAmount,
      emergencyFundTarget: 100000,
      emergencyFundGap: Math.max(0, 100000 - emergencyFundAmount),
      monthlyCapacityPercent: Math.round((15000 / (userProfile?.monthlyInvestment || 10000)) * 100)
    },
    decisionContext: {
      source: 'explore' as const,
      queryOrPrompt: question
    },
    userQuestion: question
  };

  return analyzeInvestmentDecision(context as unknown as CopilotDecisionContext);
}

