'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ChevronLeft, ChevronRight, Upload, Map, Users, Lightbulb, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const steps = ['Intro to Key Features', 'Profile Setup', 'Preferences Setup']
const keyFeatures = [
  { name: 'Trip Planner', icon: Map },
  { name: 'Participant Collaboration', icon: Users },
  { name: 'AI Recommendation', icon: Lightbulb },
  { name: 'Budget Tracking', icon: DollarSign }
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentSubStep, setCurrentSubStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([false, false, false])
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [preferences, setPreferences] = useState({
    accommodation: '',
    activities: '',
    climate: '',
    budget: ''
  })

  const handleNext = () => {
    if (currentStep === 0) {
      if (currentSubStep < keyFeatures.length - 1) {
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
        setCurrentSubStep(keyFeatures.length - 1)
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
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setProfilePicture(file);
    }
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({ ...preferences, [key]: value })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Step 1: {keyFeatures[currentSubStep].name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => {
                const FeatureIcon = feature.icon
                return (
                  <div
                    key={feature.name}
                    className={`p-4 border rounded-lg ${
                      index === currentSubStep ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <FeatureIcon className="w-8 h-8 mb-2 text-blue-500" />
                    <h3 className="font-semibold">{feature.name}</h3>
                    <p className="text-sm text-gray-600">Learn about our key feature</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Step 2: Profile Setup</h2>
            {currentSubStep === 0 ? (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username (required)
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio (optional)
                  </Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows={3}
                  />
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-600">Upload your profile picture</p>
                <Label className="flex items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed cursor-pointer hover:border-gray-400 focus:outline-none overflow-hidden">
                  <Input type="file" className="sr-only" onChange={handleFileUpload} accept="image/*" />
                  {profilePicture ? (
                    <Image
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={150}
                      height={150}
                      layout="responsive"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload</p>
                    </div>
                  )}
                </Label>
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Step 3: Preferences Setup</h2>
            <p className="text-gray-600">Select your travel preferences</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">
                  Preferred Accommodation Type
                </Label>
                <select
                  id="accommodation"
                  value={preferences.accommodation}
                  onChange={(e) => handlePreferenceChange('accommodation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>
              <div>
                <Label htmlFor="activities" className="block text-sm font-medium text-gray-700">
                  Favorite Activities
                </Label>
                <select
                  id="activities"
                  value={preferences.activities}
                  onChange={(e) => handlePreferenceChange('activities', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="sightseeing">Sightseeing</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                </select>
              </div>
              <div>
                <Label htmlFor="climate" className="block text-sm font-medium text-gray-700">
                  Preferred Climate
                </Label>
                <select
                  id="climate"
                  value={preferences.climate}
                  onChange={(e) => handlePreferenceChange('climate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="tropical">Tropical</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="alpine">Alpine</option>
                </select>
              </div>
              <div>
                <Label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget Range
                </Label>
                <select
                  id="budget"
                  value={preferences.budget}
                  onChange={(e) => handlePreferenceChange('budget', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">Welcome to Our Travel App</h1>
          <p className="mt-2 text-center text-gray-600">Let&rsquo;s get you set up in just a few easy steps!</p>

          <div className="flex mt-8">
            {/* Step Indicator */}
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
                    {index < steps.length - 1 && (
                      <div className="h-16 w-1 bg-gray-300 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="w-3/4">
              {renderStepContent()}

              <div className="mt-8 flex justify-end space-x-4">
                {currentStep > 0 && (
                  <Button
                    onClick={handlePrevious}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Previous
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button
                    onClick={handleNext}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={(currentStep === 1 && currentSubStep === 0 && !username) || (currentStep === 1 && currentSubStep === 1 && !profilePicture)}
                  >
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => console.log('Skipping to dashboard')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Skip to Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
