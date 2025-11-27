// AI Business Coach Knowledge Base
// Contains frameworks, quotes, and concepts from top business books

const KnowledgeBase = {
    // Business Frameworks & Concepts
    frameworks: {
        productMarketFit: {
            name: "Product-Market Fit",
            source: "The Lean Startup by Eric Ries",
            concept: "The degree to which a product satisfies strong market demand",
            indicators: [
                "Organic growth through word of mouth",
                "High retention rates (40%+ of users come back)",
                "Users would be 'very disappointed' if product went away (>40% threshold)",
                "NPS score above 50",
                "Low customer acquisition cost relative to lifetime value"
            ],
            howToMeasure: "Use Sean Ellis test: Ask 'How would you feel if you could no longer use this product?' If >40% say 'very disappointed', you have PMF.",
            application: "Focus on the problem you're solving, not just features. Iterate based on real user feedback."
        },

        okrs: {
            name: "OKRs (Objectives and Key Results)",
            source: "Measure What Matters by John Doerr",
            concept: "A goal-setting framework used by Google, Intel, and others",
            structure: {
                objective: "What you want to achieve (qualitative, inspirational)",
                keyResults: "How you'll measure success (quantitative, time-bound)"
            },
            example: {
                objective: "Build an awesome customer experience",
                keyResults: [
                    "Increase NPS from 30 to 50",
                    "Reduce customer support response time to under 2 hours",
                    "Achieve 95% customer satisfaction rating"
                ]
            },
            quote: "Ideas are easy. Execution is everything. - John Doerr"
        },

        swotAnalysis: {
            name: "SWOT Analysis",
            source: "Stanford Research Institute (1960s)",
            concept: "Strategic planning tool to identify Strengths, Weaknesses, Opportunities, Threats",
            questions: {
                strengths: ["What do you do well?", "What unique resources do you have?", "What do others see as your strengths?"],
                weaknesses: ["What could you improve?", "What resources are you lacking?", "Where are you vulnerable?"],
                opportunities: ["What trends could benefit you?", "What market gaps exist?", "How can you turn strengths into opportunities?"],
                threats: ["What obstacles do you face?", "What is your competition doing?", "What external changes threaten you?"]
            }
        },

        businessModelCanvas: {
            name: "Business Model Canvas",
            source: "Business Model Generation by Alexander Osterwalder",
            components: [
                "Customer Segments - Who are you serving?",
                "Value Propositions - What problems are you solving?",
                "Channels - How do you reach customers?",
                "Customer Relationships - How do you interact with them?",
                "Revenue Streams - How do you make money?",
                "Key Resources - What do you need to deliver value?",
                "Key Activities - What must you do to deliver value?",
                "Key Partnerships - Who helps you?",
                "Cost Structure - What are your main costs?"
            ]
        },

        northStarMetric: {
            name: "North Star Metric",
            source: "Growth Hacking methodology",
            concept: "The single metric that best captures the core value you deliver to customers",
            examples: {
                facebook: "Daily Active Users",
                airbnb: "Nights Booked",
                spotify: "Time Spent Listening",
                slack: "Messages Sent by Teams"
            },
            howToFind: "Ask: What metric best represents value delivered to customers and predicts long-term success?"
        }
    },

    // Leadership & Personal Development
    leadership: {
        levelFive: {
            name: "Level 5 Leadership",
            source: "Good to Great by Jim Collins",
            concept: "The highest level of leadership combines personal humility with professional will",
            characteristics: [
                "Channel ambition into company, not self",
                "Set up successors for success",
                "Take responsibility for poor results, give credit for success to others",
                "Display compelling modesty",
                "Act with quiet, calm determination"
            ],
            quote: "Level 5 leaders are a study in duality: modest and willful, humble and fearless. - Jim Collins"
        },

        circleOfCompetence: {
            name: "Circle of Competence",
            source: "Warren Buffett / Charlie Munger",
            concept: "Know the boundaries of your knowledge and stay within them",
            application: "Focus on what you truly understand. Don't make decisions outside your circle of competence.",
            quote: "What an investor needs is the ability to correctly evaluate selected businesses. You don't have to be an expert on every company, or even many. You only have to be able to evaluate companies within your circle of competence. - Warren Buffett"
        },

        firstPrinciples: {
            name: "First Principles Thinking",
            source: "Elon Musk / Ancient Philosophy",
            concept: "Break down problems to fundamental truths and build up from there",
            process: [
                "Identify and define your current assumptions",
                "Break down the problem into fundamental principles",
                "Create new solutions from scratch"
            ],
            quote: "I think it's important to reason from first principles rather than by analogy. - Elon Musk"
        },

        growth mindset: {
            name: "Growth Mindset",
            source: "Mindset by Carol Dweck",
            concept: "Belief that abilities can be developed through dedication and hard work",
            fixedVsGrowth: {
                fixed: "Avoids challenges, gives up easily, sees effort as fruitless",
                growth: "Embraces challenges, persists, sees effort as path to mastery"
            },
            application: "Reframe failures as learning opportunities. Focus on progress, not perfection."
        },

        timeManagement: {
            name: "Eisenhower Matrix",
            source: "Stephen Covey - The 7 Habits of Highly Effective People",
            quadrants: [
                "Q1: Urgent & Important - Do immediately (crises, deadlines)",
                "Q2: Not Urgent & Important - Schedule (planning, relationships, learning)",
                "Q3: Urgent & Not Important - Delegate (interruptions, some emails)",
                "Q4: Not Urgent & Not Important - Eliminate (time wasters)"
            ],
            insight: "Spend more time in Quadrant 2 to prevent Quadrant 1 fires",
            quote: "The key is not to prioritize what's on your schedule, but to schedule your priorities. - Stephen Covey"
        },

        deepWork: {
            name: "Deep Work",
            source: "Deep Work by Cal Newport",
            concept: "Professional activities performed in distraction-free concentration that push cognitive capabilities",
            strategies: [
                "Schedule deep work blocks (90-120 minutes)",
                "Eliminate distractions completely",
                "Build rituals around deep work",
                "Embrace boredom to train focus"
            ],
            quote: "The ability to perform deep work is becoming increasingly rare and therefore increasingly valuable. - Cal Newport"
        }
    },

    // Scaling & Growth
    scaling: {
        peopleProcessTechnology: {
            name: "People, Process, Technology Framework",
            concept: "The three pillars of scaling a business",
            people: "Hire A-players, build culture, develop leadership",
            process: "Document workflows, create systems, ensure repeatability",
            technology: "Automate what's repeatable, use tools to amplify output"
        },

        blumeKhanScaling: {
            name: "Blitzscaling",
            source: "Blitzscaling by Reid Hoffman",
            concept: "Prioritize speed over efficiency when scaling in winner-take-all markets",
            stages: ["Family (1-9 employees)", "Tribe (10s)", "Village (100s)", "City (1000s)", "Nation (10,000s)"],
            warning: "Only blitzscale when network effects or first-mover advantage justify the risk"
        },

        twoWayDoor: {
            name: "Two-Way Door Decisions",
            source: "Jeff Bezos Amazon Letters",
            concept: "Distinguish between reversible and irreversible decisions",
            type1: "One-way doors (irreversible) - be slow and careful",
            type2: "Two-way doors (reversible) - move fast, be willing to walk back",
            quote: "Most decisions should be made with 70% of the information you wish you had. - Jeff Bezos"
        },

        unitEconomics: {
            name: "Unit Economics",
            concept: "Profitability of a single unit (customer, transaction, product)",
            keyMetrics: [
                "CAC (Customer Acquisition Cost)",
                "LTV (Lifetime Value)",
                "LTV:CAC ratio (should be >3:1)",
                "Payback period (should be <12 months)",
                "Contribution margin per unit"
            ],
            rule: "You must have positive unit economics before scaling. Don't try to 'make it up in volume'"
        }
    },

    // Marketing & Sales
    marketing: {
        positioning: {
            name: "Positioning",
            source: "Obviously Awesome by April Dunford",
            concept: "Context setting for products",
            components: [
                "Competitive alternatives - What customers would use if you didn't exist",
                "Unique attributes - What makes you different",
                "Value - Benefits those attributes enable",
                "Target market - Best-fit customers",
                "Market category - Context you want to be evaluated in"
            ]
        },

        jobsToBeDone: {
            name: "Jobs to Be Done",
            source: "Clayton Christensen",
            concept: "Customers 'hire' products to get a job done",
            framework: "When [situation], I want to [motivation], so I can [expected outcome]",
            example: "When I'm hungry and in a rush, I want to grab something quick, so I can stay productive",
            insight: "Compete with what customers hire instead of you, not just direct competitors"
        },

        traction: {
            name: "19 Traction Channels",
            source: "Traction by Gabriel Weinberg",
            channels: [
                "Viral marketing", "PR", "Unconventional PR", "SEM", "Social ads",
                "Offline ads", "SEO", "Content marketing", "Email marketing",
                "Engineering as marketing", "Blogs", "Business development",
                "Sales", "Affiliate programs", "Platforms", "Trade shows",
                "Offline events", "Speaking", "Community building"
            ],
            strategy: "Test multiple channels, then focus on the 1-2 that work best for your business"
        }
    },

    // Productivity & Operations
    productivity: {
        pareto: {
            name: "Pareto Principle (80/20 Rule)",
            source: "Vilfredo Pareto",
            concept: "80% of results come from 20% of efforts",
            application: [
                "Which 20% of customers generate 80% of revenue?",
                "Which 20% of features create 80% of value?",
                "Which 20% of activities produce 80% of results?"
            ],
            action: "Focus ruthlessly on high-impact activities, eliminate or delegate the rest"
        },

        leverage: {
            name: "High-Leverage Activities",
            source: "High Output Management by Andy Grove",
            concept: "Focus on activities where small inputs create large outputs",
            examples: [
                "Hiring (one good hire = years of productivity)",
                "Training (teaches many people at once)",
                "Delegation (multiplies your time)",
                "Process improvement (compounds over time)"
            ],
            question: "What can I do today that will make tomorrow easier?"
        }
    },

    // Famous Quotes
    quotes: {
        strategy: [
            "The essence of strategy is choosing what not to do. - Michael Porter",
            "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat. - Sun Tzu",
            "In the long run, your human capital is your main base of competition. - Bill Gates"
        ],

        execution: [
            "Ideas are easy. Execution is everything. - John Doerr",
            "The way to get started is to quit talking and begin doing. - Walt Disney",
            "Done is better than perfect. - Sheryl Sandberg",
            "Move fast and break things. - Mark Zuckerberg (early Facebook)"
        ],

        leadership: [
            "A leader is one who knows the way, goes the way, and shows the way. - John Maxwell",
            "The best executive is the one who has sense enough to pick good men to do what he wants done. - Theodore Roosevelt",
            "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others. - Jack Welch"
        ],

        failure: [
            "Failure is simply the opportunity to begin again, this time more intelligently. - Henry Ford",
            "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
            "Only those who dare to fail greatly can ever achieve greatly. - Robert F. Kennedy"
        ],

        innovation: [
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "The only way to win is to learn faster than anyone else. - Eric Ries",
            "If you're not embarrassed by the first version of your product, you've launched too late. - Reid Hoffman"
        ],

        customer: [
            "Your most unhappy customers are your greatest source of learning. - Bill Gates",
            "Make every detail perfect and limit the number of details to perfect. - Jack Dorsey",
            "Get closer than ever to your customers. So close that you tell them what they need well before they realize it themselves. - Steve Jobs"
        ]
    },

    // Industry-Specific Advice
    industries: {
        saas: {
            keyMetrics: ["MRR/ARR", "Churn Rate", "CAC", "LTV", "NPS", "Activation Rate"],
            benchmarks: "Aim for <5% monthly churn, LTV:CAC >3:1, Rule of 40 (growth rate + profit margin >40%)",
            advice: "Focus on retention before acquisition. It's cheaper to keep customers than find new ones."
        },

        ecommerce: {
            keyMetrics: ["Conversion Rate", "AOV (Average Order Value)", "Cart Abandonment", "Customer Repeat Rate"],
            benchmarks: "2-3% conversion rate is average, aim for 40%+ repeat purchase rate",
            advice: "Optimize for mobile. 70%+ of ecommerce traffic is mobile."
        },

        consulting: {
            keyMetrics: ["Utilization Rate", "Effective Hourly Rate", "Client Retention", "Referral Rate"],
            advice: "Package your services. Move from hourly to value-based pricing as you gain expertise.",
            scaling: "Create productized services or courses to break the time-for-money cycle"
        },

        content: {
            keyMetrics: ["Audience Growth", "Engagement Rate", "Email List Size", "Conversion to Paid"],
            advice: "Build your email list - you own it. Social media platforms can change algorithms anytime.",
            monetization: "Don't monetize too early. Build audience first, then monetize in multiple ways."
        }
    },

    // Common Challenges & Solutions
    challenges: {
        timeManagement: {
            problem: "Feeling overwhelmed, too many priorities",
            solutions: [
                "Use Eisenhower Matrix to identify true priorities",
                "Block calendar for deep work",
                "Batch similar tasks together",
                "Learn to say no to non-essential commitments",
                "Delegate or automate repetitive tasks"
            ],
            quote: "You can do anything, but not everything. - David Allen"
        },

        cashFlow: {
            problem: "Running out of cash despite revenue",
            solutions: [
                "Track cash flow weekly, not monthly",
                "Invoice immediately and follow up on late payments",
                "Negotiate better payment terms with vendors",
                "Consider requiring deposits for large projects",
                "Keep 3-6 months operating expenses in reserve"
            ],
            rule: "Revenue is vanity, profit is sanity, cash is reality"
        },

        hiring: {
            problem: "Finding and keeping great people",
            solutions: [
                "Hire for culture fit and growth mindset, train for skills",
                "Create clear job descriptions and expectations",
                "Use structured interviews with consistent questions",
                "Check references thoroughly",
                "Invest in onboarding and ongoing development"
            ],
            quote: "Hire slow, fire fast. - Unknown"
        },

        focus: {
            problem: "Too many ideas, lack of focus",
            solutions: [
                "Use the 'One Thing' framework: What's the ONE thing you can do that makes everything else easier or unnecessary?",
                "Say no to opportunities that don't align with your core strategy",
                "Finish what you start before starting something new",
                "Review and refine your strategy quarterly"
            ],
            quote: "The main thing is to keep the main thing the main thing. - Stephen Covey"
        },

        imposterSyndrome: {
            problem: "Feeling like a fraud, not good enough",
            solutions: [
                "Recognize that most successful people feel this way",
                "Focus on progress, not perfection",
                "Keep a 'wins' journal to track accomplishments",
                "Seek mentorship and peer support",
                "Remember: you don't need to be the best, just better than you were yesterday"
            ],
            insight: "Imposter syndrome often means you're growing and challenging yourself"
        }
    }
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeBase;
}
