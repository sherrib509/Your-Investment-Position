export const CONTRACT_ADDRESS = "0x4e7b30611C4417ff080738b43f594a917ff798bD" as const;

export const QUESTIONS = [
  {
    id: 1,
    text: "Before making major decisions, I systematically list potential risk points",
    dimension: "Risk Perception",
  },
  {
    id: 2,
    text: "I can sense potential crises in details that others overlook",
    dimension: "Risk Perception",
  },
  {
    id: 3,
    text: "When information is incomplete, I can still make decisions and bear consequences",
    dimension: "Uncertainty Tolerance",
  },
  {
    id: 4,
    text: "Facing multiple risky options, I don't fall into decision paralysis",
    dimension: "Uncertainty Tolerance",
  },
  {
    id: 5,
    text: "Once decided, I act immediately rather than hesitating repeatedly",
    dimension: "Decision Execution",
  },
  {
    id: 6,
    text: "Even if I might fail, I dare to try high-reward opportunities",
    dimension: "Decision Execution",
  },
  {
    id: 7,
    text: "After a wrong decision, I analyze the cause rather than blame luck",
    dimension: "Adaptive Learning",
  },
  {
    id: 8,
    text: "I adjust my decision strategies based on past experiences and lessons",
    dimension: "Adaptive Learning",
  },
] as const;

export const SCORE_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;

export const PROFILES = [
  {
    minScore: 33,
    maxScore: 40,
    title: "Strategic Decision Maker",
    icon: "🦅",
    description: "Sharp, decisive, excels at seizing opportunities amid risks",
    color: "teal",
  },
  {
    minScore: 25,
    maxScore: 32,
    title: "Steady Executor",
    icon: "🛡️",
    description: "Identifies risks and responds appropriately",
    color: "blue",
  },
  {
    minScore: 17,
    maxScore: 24,
    title: "Cautious Observer",
    icon: "🔍",
    description: "Conservative, needs complete information to act",
    color: "amber",
  },
  {
    minScore: 8,
    maxScore: 16,
    title: "Risk Avoider",
    icon: "🏠",
    description: "Prefers stability, avoids uncertainty",
    color: "gray",
  },
] as const;

export function getProfile(score: number) {
  return PROFILES.find((p) => score >= p.minScore && score <= p.maxScore) || PROFILES[3];
}

