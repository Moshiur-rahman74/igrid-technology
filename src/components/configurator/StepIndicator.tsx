interface StepIndicatorProps {
  steps: { id: string; label: string }[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.id === currentStep;
          const isClickable = onStepClick && (isCompleted || index === currentIndex + 1);

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-[#00d4ff] text-[#0a192f]'
                      : isCurrent
                      ? 'bg-[#0a192f] text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                >
                  {isCompleted ? '✓' : index + 1}
                </button>
                <span className={`text-xs mt-2 text-center ${
                  isCurrent ? 'text-[#0a192f] font-semibold' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  isCompleted ? 'bg-[#00d4ff]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
