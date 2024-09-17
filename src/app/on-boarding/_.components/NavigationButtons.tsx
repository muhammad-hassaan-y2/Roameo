// components/NavigationButtons.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'  // Import from 'next/navigation' in App Router

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
  const router = useRouter()  // Next.js 13 app directory: useRouter from 'next/navigation'

  const handleSkipToDashboard = () => {
    router.push('/dashboard')  // Redirect to dashboard
  }

  return (
    <div className="mt-8 flex justify-end space-x-4">
      {currentStep > 0 && (
        <Button
          onClick={handlePrevious}
          className="inline-flex items-center py-2 border border-[#27623B] text-sm 
          font-medium rounded-2xl text-[#27623B] bg-white hover:bg-transparent"
        ><span className='mr-3'/>
          Prev
          <span className='ml-3'/>
        </Button>
      )}
      {currentStep < 2 ? (
        <Button
          onClick={handleNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm 
          font-medium rounded-md text-white bg-[#27623B] hover:bg-[#27623B]"
          disabled={isDisabled}
        >
          <span className='mr-3'/>
            Next
            
          <span className='ml-3'/>
        </Button>
      ) : (
        <Button
          onClick={handleSkipToDashboard}
          className="inline-flex items-center px-4 py-2 border border-transparent
           text-sm font-medium rounded-md text-white bg-[#27623B] hover:bg-[#27623B]"
        >
          Skip to Dashboard
        </Button>
      )}
    </div>
  )
}
