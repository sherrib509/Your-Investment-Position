import { create } from "zustand";

type FhevmStatus = "idle" | "initializing" | "ready" | "error";
type AppState = "welcome" | "assessment" | "submitting" | "decrypting" | "result";

interface AppStore {
  fhevmStatus: FhevmStatus;
  fhevmError: string | null;
  setFhevmStatus: (status: FhevmStatus) => void;
  setFhevmError: (error: string | null) => void;
  appState: AppState;
  setAppState: (state: AppState) => void;
  currentQuestion: number;
  answers: number[];
  setCurrentQuestion: (q: number) => void;
  setAnswer: (questionIndex: number, value: number) => void;
  resetAnswers: () => void;
  resultScore: number | null;
  setResultScore: (score: number | null) => void;
  isFheResult: boolean;
  setIsFheResult: (v: boolean) => void;
  isSubmitting: boolean;
  isDecrypting: boolean;
  setIsSubmitting: (v: boolean) => void;
  setIsDecrypting: (v: boolean) => void;
  txHash: string | null;
  setTxHash: (hash: string | null) => void;
  clearAnswers: () => void;
  reset: () => void;
}

export const useStore = create<AppStore>((set) => ({
  fhevmStatus: "idle",
  fhevmError: null,
  setFhevmStatus: (status) => set({ fhevmStatus: status }),
  setFhevmError: (error) => set({ fhevmError: error }),
  appState: "welcome",
  setAppState: (state) => set({ appState: state }),
  currentQuestion: 0,
  answers: Array(8).fill(0),
  setCurrentQuestion: (q) => set({ currentQuestion: q }),
  setAnswer: (questionIndex, value) =>
    set((state) => {
      const newAnswers = [...state.answers];
      newAnswers[questionIndex] = value;
      return { answers: newAnswers };
    }),
  resetAnswers: () => set({ answers: Array(8).fill(0), currentQuestion: 0 }),
  resultScore: null,
  setResultScore: (score) => set({ resultScore: score }),
  isFheResult: false,
  setIsFheResult: (v) => set({ isFheResult: v }),
  isSubmitting: false,
  isDecrypting: false,
  setIsSubmitting: (v) => set({ isSubmitting: v }),
  setIsDecrypting: (v) => set({ isDecrypting: v }),
  txHash: null,
  setTxHash: (hash) => set({ txHash: hash }),
  clearAnswers: () => set({ answers: Array(8).fill(0) }),
  reset: () =>
    set({
      appState: "welcome",
      currentQuestion: 0,
      answers: Array(8).fill(0),
      resultScore: null,
      isFheResult: false,
      isSubmitting: false,
      isDecrypting: false,
      txHash: null,
    }),
}));

