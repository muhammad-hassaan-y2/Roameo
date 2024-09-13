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
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                completedSteps[index]
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {completedSteps[index] ? <Check className="w-6 h-6" /> : index + 1}
            </div>
            {index < steps.length - 1 && <div className="h-16 w-1 bg-gray-300 my-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
