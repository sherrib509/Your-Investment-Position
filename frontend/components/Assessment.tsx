"use client";

import { useStore } from "@/store/useStore";
import { QUESTIONS, SCORE_OPTIONS } from "@/lib/constants";

export function Assessment() {
  const { currentQuestion, answers, setCurrentQuestion, setAnswer, setAppState } =
    useStore();

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const currentAnswer = answers[currentQuestion];
  const allAnswered = answers.every((a) => a > 0);

  const handleSelect = (value: number) => {
    setAnswer(currentQuestion, value);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      setAppState("submitting");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
            <span>{question.dimension}</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {SCORE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  currentAnswer === option.value
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-100 hover:border-teal-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      currentAnswer === option.value
                        ? "border-teal-500 bg-teal-500"
                        : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === option.value && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      currentAnswer === option.value
                        ? "text-teal-700"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestion === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ← Previous
          </button>

          {currentQuestion === QUESTIONS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                allAnswered
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentAnswer === 0}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                currentAnswer > 0
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          )}
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {QUESTIONS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuestion
                  ? "bg-teal-500 w-6"
                  : answers[index] > 0
                  ? "bg-teal-300"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

