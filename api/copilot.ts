function isValidCopilotResponse(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;
  if (typeof obj.summary !== 'string' || !obj.summary.trim()) return false;
  if (!obj.portfolioFit || typeof obj.portfolioFit.label !== 'string' || typeof obj.portfolioFit.explanation !== 'string') return false;
  if (!obj.goalFit || typeof obj.goalFit.label !== 'string' || typeof obj.goalFit.explanation !== 'string') return false;
  if (!obj.portfolioImpact || typeof obj.portfolioImpact.before !== 'string' || typeof obj.portfolioImpact.after !== 'string' || typeof obj.portfolioImpact.explanation !== 'string') return false;
  if (!obj.purchaseContext || typeof obj.purchaseContext.label !== 'string' || typeof obj.purchaseContext.explanation !== 'string') return false;
  if (!Array.isArray(obj.tradeoffs) || obj.tradeoffs.length === 0) return false;
  if (!Array.isArray(obj.researchChecklist) || obj.researchChecklist.length === 0) return false;
  return true;
}

function generateDeterministicFallback(context: any) {
  const userProfile = context.userProfile || {};
  const facts = context.deterministicFacts || {
    currentTechExposure: 31.0,
    projectedTechExposure: 36.2,
    emergencyFundGap: 28000,
    emergencyFundCurrent: 72000,
    emergencyFundTarget: 100000,
    monthlyCapacityPercent: 150
  };
  const asset = context.asset || { name: 'Tata Technologies Ltd', pe: 62.4, industryPe: 28.6 };
  const intendedAmount = context.intendedAmount || 15000;
  const userQuestion = (context.userQuestion || context.decisionContext?.queryOrPrompt || '').toLowerCase();

  const { experience, riskComfort, primaryGoal, monthlyInvestment = 10000, monthlyExpenses = 28000 } = userProfile;

  // Question-specific smart handling
  if (userQuestion.includes('sip') || userQuestion.includes('monthly') || userQuestion.includes('increase')) {
    return {
      summary: `Increasing your monthly SIP accelerates long-term compounding, provided your monthly expenses (₹${monthlyExpenses.toLocaleString('en-IN')}) leave enough buffer. An annual step-up of 10% is usually more sustainable than an immediate large jump.`,
      portfolioFit: {
        label: '✓ High Financial Fitness',
        status: 'good',
        explanation: 'Systematic discipline is the most reliable way to build multi-year wealth without timing markets.'
      },
      goalFit: {
        label: '✓ Direct Alignment',
        status: 'good',
        explanation: 'Increasing SIPs speeds up reaching your long-term wealth milestones significantly.'
      },
      portfolioImpact: {
        before: `₹${monthlyInvestment.toLocaleString('en-IN')}/mo`,
        after: `₹${(monthlyInvestment + 5000).toLocaleString('en-IN')}/mo`,
        explanation: `Adds an estimated ₹${(5000 * 12 * 5).toLocaleString('en-IN')} in direct principal investment over 5 years.`
      },
      purchaseContext: {
        label: 'Disciplined Step-Up',
        explanation: 'Proactive cashflow allocation rather than impulsive ad-hoc trading.'
      },
      tradeoffs: [
        `Cashflow liquidity: Ensure you maintain at least ₹5,000–₹10,000 liquid buffer each month for unexpected personal needs.`,
        'Step-up approach: Automate a 10% annual increase matching salary revisions to avoid lifestyle strain.',
        'Buffer preservation: Avoid increasing SIPs if it delays finishing your emergency fund target.'
      ],
      researchChecklist: [
        'Do I have 3–6 months of living expenses safely parked in an emergency fund?',
        'Can I comfortably maintain this higher SIP amount during months with unexpected costs?',
        'Are my funds sufficiently diversified across large-cap and flexi-cap indexes?'
      ]
    };
  }

  if (userQuestion.includes('market') || userQuestion.includes('fall') || userQuestion.includes('drop') || userQuestion.includes('crash') || userQuestion.includes('pause')) {
    return {
      summary: `Market drawdowns are a normal feature of equity compounding. Pausing SIPs during corrections interrupts rupee-cost averaging and locks in paper volatility as real loss. Staying consistent historically yields the highest long-term returns.`,
      portfolioFit: {
        label: '✓ Market Opportunity',
        status: 'good',
        explanation: 'Ongoing SIPs automatically purchase more units at lower NAVs during market pullbacks.'
      },
      goalFit: {
        label: '✓ Long-Horizon Advantage',
        status: 'good',
        explanation: 'For a 5–10 year horizon, short-term dips are statistical noise that enhance long-term CAGR.'
      },
      portfolioImpact: {
        before: 'Active SIP',
        after: 'Maintained SIP',
        explanation: 'Rupee-cost averaging remains fully active, acquiring units at discount prices.'
      },
      purchaseContext: {
        label: 'Volatility Reality-Check',
        explanation: 'Emotional reactions to market news are the #1 destroyer of retail compounding.'
      },
      tradeoffs: [
        'Patience vs panic: Selling or pausing during a dip turns temporary paper drops into permanent loss.',
        'Rupee-cost averaging: You buy units on sale, lowering your overall average cost of acquisition.',
        'Peace of mind: If volatility causes anxiety, revisit your debt/equity ratio rather than panic-selling.'
      ],
      researchChecklist: [
        'Is my investment horizon at least 3–5 years into the future?',
        'Do I have an emergency fund so I never need to liquidate equities during a crash?',
        'Am I focusing on business fundamentals rather than daily headlines?'
      ]
    };
  }

  if (userQuestion.includes('adani') || userQuestion.includes('infra') || userQuestion.includes('energy')) {
    return {
      summary: `Adani group stocks have high debt and fast price swings. While they can rally quickly, dips are equally sharp. With a ₹${facts.emergencyFundGap.toLocaleString('en-IN')} gap in your safety buffer, keeping cash safe matters more.`,
      portfolioFit: {
        label: '⚠️ High Volatility',
        status: 'caution',
        explanation: 'Infra and energy stocks experience wide cyclical price swings and heavy debt sensitivity.'
      },
      goalFit: {
        label: '🛡️ Safety Net First',
        status: 'caution',
        explanation: 'Finishing your emergency buffer gives you stability before entering high-beta volatile stocks.'
      },
      portfolioImpact: {
        before: `${facts.currentTechExposure}% Tech`,
        after: `Adds Infra Beta`,
        explanation: 'Diversifies away from tech, but adds high-beta infrastructure and energy exposure.'
      },
      purchaseContext: {
        label: 'High-Beta Exploration',
        explanation: 'Evaluating high-momentum large-cap conglomerates.'
      },
      tradeoffs: [
        'Volatile price swings: Fast rallies can be followed by sharp drawdowns on market corrections.',
        `Emergency buffer first: Keep your cash safety net intact (₹${facts.emergencyFundGap.toLocaleString('en-IN')} deficit) before taking big swings.`,
        'Size carefully: Never allocate money you might need in the next 1–2 years to volatile stocks.'
      ],
      researchChecklist: [
        'Do I understand the debt levels and cash flows of the specific Adani company?',
        'Can I handle 20%+ price swings without panic-selling?',
        'Would a broad Nifty index fund give me safer infra exposure?'
      ]
    };
  }

  if (riskComfort === 'conservative' || primaryGoal === 'emergency_fund' || userQuestion.includes('emergency')) {
    return {
      summary: `Your primary financial priority is establishing capital safety. Committing ₹${intendedAmount.toLocaleString('en-IN')} to a single high-valuation equity stock runs counter to completing your foundational emergency buffer first.`,
      portfolioFit: {
        label: '⚠️ High Volatility Risk',
        status: 'caution',
        explanation: 'Single equity stocks experience sharp price fluctuations, which conflicts with your conservative risk preference.'
      },
      goalFit: {
        label: '🛡️ Safety Buffer Priority',
        status: 'caution',
        explanation: facts.emergencyFundGap > 0
          ? `You still have a ₹${facts.emergencyFundGap.toLocaleString('en-IN')} deficit before your emergency fund is fully secured.`
          : 'Preserving capital and liquid reserves takes precedence over speculative equities.'
      },
      portfolioImpact: {
        before: `${facts.currentTechExposure}%`,
        after: `${facts.projectedTechExposure}%`,
        explanation: `Locks liquid capital into volatile equities rather than safe, interest-bearing reserves.`
      },
      purchaseContext: {
        label: 'Social media recommendation',
        explanation: 'You mentioned discovering this on Instagram. Viral recommendations rarely align with capital preservation goals.'
      },
      tradeoffs: [
        `Emergency buffer comes first: Allocating ₹${intendedAmount.toLocaleString('en-IN')} here delays completing your safety cushion, leaving you vulnerable to unexpected expenses.`,
        `Capital preservation: Single stocks can drop 10–20% quickly, which can cause significant stress for conservative investors.`,
        `Capacity strain: At ₹${intendedAmount.toLocaleString('en-IN')}, this order represents ${facts.monthlyCapacityPercent}% of your monthly savings capacity.`
      ],
      researchChecklist: [
        'Does taking single-stock risk support or delay my primary goal of building financial security?',
        'Can I comfortably afford to see this capital drop in value over the next 6–12 months?',
        'Would a low-volatility liquid fund or fixed deposit better serve my current safety needs?'
      ]
    };
  }

  if (experience === 'experienced' || riskComfort === 'aggressive') {
    return {
      summary: `You already have meaningful technology exposure (31%). Given your higher risk comfort, concentration may be less of an immediate concern, but the high valuation multiple (62.4x P/E) and incremental exposure (+5.2%) are worth examining before expanding your tech tilt.`,
      portfolioFit: {
        label: '✓ High Risk Tolerance',
        status: 'good',
        explanation: `Your aggressive profile accommodates volatility, but a ${facts.projectedTechExposure}% tech exposure creates an intentional, heavy sector tilt.`
      },
      goalFit: {
        label: '✓ Horizon Aligned',
        status: 'good',
        explanation: 'Fits your multi-year wealth compounding horizon. Your capital base and monthly capacity easily support equity volatility.'
      },
      portfolioImpact: {
        before: `${facts.currentTechExposure}%`,
        after: `${facts.projectedTechExposure}%`,
        explanation: `Adds a +${(facts.projectedTechExposure - facts.currentTechExposure).toFixed(1)}% overweight tilt to ER&D tech across direct and mutual fund holdings.`
      },
      purchaseContext: {
        label: 'Social momentum query',
        explanation: 'Evaluating high-momentum growth equity at a premium valuation multiple.'
      },
      tradeoffs: [
        `Valuation multiple sensitivity: At 62.4x P/E vs 28.6x IT industry average (118% premium), future gains depend on aggressive earnings delivery rather than multiple expansion.`,
        `Order sizing & liquidity: At ₹${intendedAmount.toLocaleString('en-IN')}, this order is only ${facts.monthlyCapacityPercent}% of your monthly capacity—comfortable on cash flow, so timing and valuation matter more than capital strain.`,
        `Staggered entry vs lump-sum: Consider entering in tactical tranches across pullbacks rather than a single lump-sum buy at peak momentum.`
      ],
      researchChecklist: [
        'Is Tata Tech’s 62.4x multiple justified compared to global ER&D peers like KPIT or L&T Technology?',
        'How does this single-stock bet fit alongside my core diversified equity index holdings?',
        'Am I prepared to hold or average down through a 15–20% cyclical IT correction?'
      ]
    };
  }

  return {
    summary: `Your current portfolio has 31% technology exposure. Adding this would take it to about ${facts.projectedTechExposure}%. Since you're still building your portfolio, consider whether that concentration fits your long-term goal before making a single-stock allocation.`,
    portfolioFit: {
      label: '⚠️ Tech Concentration',
      status: 'caution',
      explanation: 'Over a third of your savings (36.2%) would be tied to tech stocks between your direct holdings and Flexi Cap mutual funds.'
    },
    goalFit: {
      label: '🛡️ Safety Buffer First',
      status: 'caution',
      explanation: facts.emergencyFundGap > 0
        ? `You still have a ₹${facts.emergencyFundGap.toLocaleString('en-IN')} gap before your emergency cushion reaches ₹1,00,000.`
        : 'Ensure your liquid reserves are untouched before taking single-stock equity bets.'
    },
    portfolioImpact: {
      before: `${facts.currentTechExposure}%`,
      after: `${facts.projectedTechExposure}%`,
      explanation: `A 10% pullback in tech shares would affect over ${facts.projectedTechExposure}% of your total portfolio while you are still establishing your core foundation.`
    },
    purchaseContext: {
      label: 'Social media discovery',
      explanation: 'You mentioned discovering this on Instagram. Social momentum usually peaks after initial rallies have already happened.'
    },
    tradeoffs: [
      `Concentration vs core: At ₹${intendedAmount.toLocaleString('en-IN')}, this single order represents ${facts.monthlyCapacityPercent}% of your regular monthly SIP—a relatively large one-off commitment while still laying portfolio foundations.`,
      `Safety cushion priority: Allocating ₹${intendedAmount.toLocaleString('en-IN')} here delays completing your ₹1,00,000 emergency fund (₹${facts.emergencyFundGap.toLocaleString('en-IN')} remaining gap).`,
      `Valuation premium: ${asset.name} trades at a 62.4x P/E vs 28.6x IT industry average—pricing in high earnings expectations.`
    ],
    researchChecklist: [
      'Do I understand how Tata Technologies earns revenue compared to traditional IT services?',
      'Would I rather finish my emergency cushion before adding single-stock risk?',
      'Would I still buy this today if I hadn’t seen it discussed on Instagram?'
    ]
  };
}

function buildSystemPrompt(context: any): string {
  const userQuestion = context.userQuestion || context.decisionContext?.queryOrPrompt || '';
  return `You are Groww Copilot, an intelligent decision-support assistant designed specifically for young Gen Z Indian investors (aged 20–26).
Your role is NOT to make autonomous buy/sell recommendations, stock picks, or financial advisor promises.
Your role is to help the user understand how their contemplated investment or financial question relates to their personal investing profile, risk comfort, real-life goals, and existing portfolio.

${userQuestion ? `THE USER HAS ASKED THE FOLLOWING QUESTION:
"${userQuestion}"
Make sure your "summary" directly answers their question in clear, objective, Gen Z-friendly terms, weighing both sides fairly and giving them transparent trade-offs.` : ''}

STRICT BEHAVIORAL RULES:
1. Never tell the user to buy or sell. Never say "You should buy" or "Don't buy".
2. Never predict future prices or market direction.
3. Never guarantee returns.
4. Never claim to know the user's emotional state.
5. Do NOT invent financial numbers or recalculate portfolio metrics.
6. Treat the provided 'deterministicFacts' object as the absolute source of truth for all calculations.
7. Explain trade-offs rather than prescribing actions. Always preserve user autonomy.
8. Use the user's profile attributes to personalize explanations and tone:
   - If beginner: explain business fundamentals and valuation clearly without unnecessary jargon.
   - If experienced: avoid unnecessary basic explanations; focus on portfolio diversification, asset allocation, and concentration trade-offs.
   - If conservative: emphasize volatility, liquidity buffers, and capital preservation without blocking the user.
   - If aggressive: acknowledge higher risk comfort while highlighting single-sector concentration risks and valuation discipline.
9. Keep language concise, transparent, and relatable to a 20–26 year old investor.

OUTPUT SCHEMA:
You must respond with valid JSON matching this exact structure:
{
  "summary": "1-2 concise sentences contextualizing the decision for this specific user.",
  "portfolioFit": {
    "label": "Short label (e.g. '⚠️ Needs a second look', '⚠️ Sector Overweight', or '⚠️ High Volatility')",
    "status": "caution" | "good" | "neutral",
    "explanation": "Clear explanation of fit with existing holdings"
  },
  "goalFit": {
    "label": "Short label (e.g. '✓ Strong (Horizon)', '✓ High Alignment', or '⚠️ Safety Cushion First')",
    "status": "caution" | "good" | "neutral",
    "explanation": "Explanation linking asset to user's primary goal"
  },
  "portfolioImpact": {
    "before": "${context.deterministicFacts?.currentTechExposure || 31}%",
    "after": "${context.deterministicFacts?.projectedTechExposure || 36.2}%",
    "explanation": "Concrete impact statement using the exact deterministic numbers provided"
  },
  "purchaseContext": {
    "label": "Social-media driven",
    "explanation": "Neutral context statement regarding discovery trigger"
  },
  "tradeoffs": [
    "Trade-off 1",
    "Trade-off 2",
    "Trade-off 3"
  ],
  "researchChecklist": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4"
  ]
}`;
}

async function queryGemini(apiKey: string, model: string, context: any): Promise<any | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const systemInstruction = buildSystemPrompt(context);

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: [
      {
        parts: [
          {
            text: `Analyze this contemplated investment decision based on the following structured context:\n${JSON.stringify(context, null, 2)}`
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) return null;

    const data: any = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    const parsed = JSON.parse(candidateText);
    if (isValidCopilotResponse(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

async function queryOpenAI(apiKey: string, context: any): Promise<any | null> {
  const url = 'https://api.openai.com/v1/chat/completions';
  const systemInstruction = buildSystemPrompt(context);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: `Analyze this contemplated investment decision based on the following structured context:\n${JSON.stringify(context, null, 2)}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2
      }),
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) return null;

    const data: any = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    if (isValidCopilotResponse(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    }
  }

  const context = body || {};

  const geminiApiKey = process.env.GEMINI_API_KEY || '';
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const openaiApiKey = process.env.OPENAI_API_KEY || process.env.Open_AI_API_KEY || '';

  let responsePayload = null;

  if (geminiApiKey && geminiApiKey.trim().length > 0) {
    responsePayload = await queryGemini(geminiApiKey.trim(), geminiModel, context);
  }

  if (!responsePayload && openaiApiKey && openaiApiKey.trim().length > 0) {
    responsePayload = await queryOpenAI(openaiApiKey.trim(), context);
  }

  if (!responsePayload) {
    responsePayload = generateDeterministicFallback(context);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(responsePayload));
}
