"use client";

import { useStore } from "@/store/useStore";
import { getProfile } from "@/lib/constants";

export function Result() {
  const { resultScore, isFheResult, reset, setAppState } = useStore();

  if (resultScore === null) return null;

  const profile = getProfile(resultScore);

  const colorClasses = {
    teal: "from-teal-400 to-teal-600 shadow-teal-500/30",
    blue: "from-blue-400 to-blue-600 shadow-blue-500/30",
    amber: "from-amber-400 to-amber-600 shadow-amber-500/30",
    gray: "from-gray-400 to-gray-600 shadow-gray-500/30",
  };

  const handleRetake = () => {
    reset();
    setTimeout(() => setAppState("assessment"), 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 fade-in">
      <div className="text-center max-w-lg">
        {/* Profile Icon */}
        <div
          className={`w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${
            colorClasses[profile.color as keyof typeof colorClasses]
          } flex items-center justify-center shadow-2xl`}
        >
          <span className="text-6xl">{profile.icon}</span>
        </div>

        {/* Score */}
        <div className="mb-4">
          <span className="text-6xl font-bold text-gray-900">{resultScore}</span>
          <span className="text-2xl text-gray-400">/40</span>
        </div>

        {/* Profile Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{profile.title}</h2>

        {/* Description */}
        <p className="text-lg text-gray-500 mb-12">{profile.description}</p>

        {/* Score Breakdown */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-400 mb-1">Risk Perception</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(resultScore / 40) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Uncertainty</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(resultScore / 40) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Execution</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(resultScore / 40) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Learning</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(resultScore / 40) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            onClick={handleRetake}
            className="px-8 py-3 rounded-xl font-medium bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
          >
            Retake
          </button>
        </div>

        {/* Privacy Badge */}
        {isFheResult ? (
          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Computed with FHE encryption
          </div>
        ) : (
          <div className="mt-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Local calculation (FHE decryption unavailable)
            </div>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              This result was calculated locally. For full privacy, please retry to use FHE-encrypted computation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

