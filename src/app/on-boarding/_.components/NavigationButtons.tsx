// components/NavigationButtons.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationButtonsProps {
  currentStep: number
  handlePrevious: () => void
  handleNext: () => void
  isDisabled: boolean
}

export default function NavigationButtons({
  currentStep,
  handlePrevious,
  handleNext,
  isDisabled
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex justify-end space-x-4">
      {currentStep > 0 && (
        <Button
          onClick={handlePrevious}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>
      )}
      <Button
        onClick={handleNext}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        disabled={isDisabled}
      >
        {currentStep < 2 ? (
          <>
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </>
        ) : (
          'Finish'
        )}
      </Button>
    </div>
  )
}
