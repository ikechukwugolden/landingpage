import { Check } from "lucide-react";

export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="progress-steps">
      <div className="progress-line" />

      <div className="steps-container">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="step-wrapper">
              <div
                className={`step-circle ${
                  isActive
                    ? "active"
                    : isCompleted
                    ? "completed"
                    : ""
                }`}
              >
                {isCompleted ? <Check size={14} /> : stepNumber}
              </div>

              <span
                className={`step-label ${
                  isActive ? "active-label" : ""
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
