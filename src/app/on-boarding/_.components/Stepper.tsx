import { Check } from 'lucide-react'

interface StepperProps {
  steps: string[]
  currentStep: number
  completedSteps: boolean[]
}

export default function Stepper({ steps, currentStep, completedSteps }: StepperProps) {
  return (
    <div className="w-1/4">
      <div className="flex flex-col items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                completedSteps[index]
                  ? 'bg-[#12321D] text-white'
                  : index === currentStep
                  ? 'bg-[#12321D] text-white rounded-full border border-black'
                  : 'bg-[#12321D] text-white'
              }`}
            >
              {completedSteps[index] ? <Check className="w-6 h-6" /> : index + 1}
            </div>
            {index < steps.length - 1 && <div className="h-36 w-[6px] bg-[#12321D] my-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
