import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Map, Users, Lightbulb, DollarSign } from 'lucide-react'

interface StepContentProps {
  currentStep: number
  currentSubStep: number
  username: string
  setUsername: (value: string) => void
  bio: string
  setBio: (value: string) => void
  profilePicture: File | null
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  preferences: {
    accommodation: string
    activities: string
    climate: string
    budget: string
  }
  handlePreferenceChange: (key: string, value: string) => void
}

const keyFeatures = [
  { name: 'Trip Planner', icon: Map },
  { name: 'Participant Collaboration', icon: Users },
  { name: 'AI Recommendation', icon: Lightbulb },
  { name: 'Budget Tracking', icon: DollarSign }
]

export default function StepContent({
  currentStep,
  currentSubStep,
  username,
  setUsername,
  bio,
  setBio,
  profilePicture,
  handleFileUpload,
  preferences,
  handlePreferenceChange
}: StepContentProps) {
  switch (currentStep) {
    case 0:
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 1: Intro to Key Features</h2>
          <div className="grid grid-cols-2 gap-4">
            {keyFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`p-4 border rounded-lg ${
                  index === currentSubStep ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <feature.icon className="w-8 h-8 mb-2 text-green-500" />
                <h3 className="font-semibold">{feature.name}</h3>
                <p className="text-sm text-gray-600">Learn about our key features</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 1:
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 2: Profile Setup</h2>
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
                className="mt-1 block w-full rounded-md border-gray-300"
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
                className="mt-1 block w-full rounded-md border-gray-300"
                rows={3}
              />
            </div>
          </form>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600">Upload your profile picture</p>
            <Label className="flex items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed cursor-pointer hover:border-gray-400 focus:outline-none overflow-hidden">
              <Input type="file" className="sr-only" onChange={handleFileUpload} accept="image/*" />
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">Click to upload</p>
                </div>
              )}
            </Label>
          </div>
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
                className="mt-1 block w-full rounded-md border-gray-300"
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
                className="mt-1 block w-full rounded-md border-gray-300"
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
                className="mt-1 block w-full rounded-md border-gray-300"
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
                className="mt-1 block w-full rounded-md border-gray-300"
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
