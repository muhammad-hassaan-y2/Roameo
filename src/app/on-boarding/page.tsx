'use client'

import { useState } from 'react'
import Stepper from './_.components/Stepper'
import StepContent from './_.components/StepComponent'
import NavigationButtons from './_.components/NavigationButtons'

const steps = ['Intro to Key Features', 'Profile Setup', 'Preferences Setup']

export default function Component() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentSubStep, setCurrentSubStep] = useState<number>(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false])
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [preferences, setPreferences] = useState({
    accommodation: '',
    activities: '',
    climate: '',
    budget: ''
  })

  const handleNext = () => {
    if (currentStep === 0) {
      if (currentSubStep < 3) {
        setCurrentSubStep(currentSubStep + 1)
      } else {
        setCurrentStep(1)
        setCurrentSubStep(0)
        setCompletedSteps([true, false, false])
      }
    } else if (currentStep === 1) {
      if (currentSubStep === 0 && username) {
        setCurrentSubStep(1)
      } else if (currentSubStep === 1 && profilePicture) {
        setCurrentStep(2)
        setCurrentSubStep(0)
        setCompletedSteps([true, true, false])
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep === 1) {
      if (currentSubStep === 0) {
        setCurrentStep(0)
        setCurrentSubStep(3)
        setCompletedSteps([false, false, false])
      } else {
        setCurrentSubStep(0)
      }
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setCurrentSubStep(1)
      setCompletedSteps([true, false, false])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setProfilePicture(file)
    }
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({ ...preferences, [key]: value })
  }

  const isNextDisabled =
    (currentStep === 1 && currentSubStep === 0 && !username) || (currentStep === 1 && currentSubStep === 1 && !profilePicture)

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">Welcome to Roamio!</h1>
          <p className="mt-2 text-center text-gray-600">Let’s get you set up in just a few easy steps!</p>

          <div className="flex mt-8">
            <Stepper steps={steps} currentStep={currentStep} completedSteps={completedSteps} />
            <div className="w-3/4">
              <StepContent
                currentStep={currentStep}
                currentSubStep={currentSubStep}
                username={username}
                setUsername={setUsername}
                bio={bio}
                setBio={setBio}
                profilePicture={profilePicture}
                handleFileUpload={handleFileUpload}
                preferences={preferences}
                handlePreferenceChange={handlePreferenceChange}
              />
              <NavigationButtons
                currentStep={currentStep}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                isDisabled={isNextDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
