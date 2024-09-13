import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from 'lucide-react'

type NewTripFormProps = {
  onClose: () => void;
  onFinish: (tripData: any) => void;
}

export function NewTripForm({ onClose, onFinish }: NewTripFormProps) {
  const [formStep, setFormStep] = useState(0)
  const [tripName, setTripName] = useState('')
  const [destination, setDestination] = useState('')
  const [tripDetails, setTripDetails] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState('')
  const [accommodationType, setAccommodationType] = useState('')
  const [activityTypes, setActivityTypes] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState('')

  const handleNextStep = () => setFormStep(formStep + 1)
  const handlePrevStep = () => setFormStep(formStep - 1)

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant])
      setNewParticipant('')
    }
  }

  const handleFinish = () => {
    const tripData = {
      tripName,
      destination,
      tripDetails,
      startDate,
      endDate,
      participants,
      accommodationType,
      activityTypes,
      budgetRange
    }
    onFinish(tripData)
    onClose()
  }

  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create New Trip</h2>
            <p className="text-muted-foreground">The key to planning your adventure starts here</p>
            <div className="space-y-2">
              <Label htmlFor="tripName">Trip Name *</Label>
              <Input id="tripName" value={tripName} onChange={(e) => setTripName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tripDetails">Trip Details (Optional)</Label>
              <Input id="tripDetails" value={tripDetails} onChange={(e) => setTripDetails(e.target.value)} />
            </div>
            <Button onClick={handleNextStep} disabled={!tripName || !destination}>Next</Button>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Set your trip dates</h2>
            <p className="text-muted-foreground">The Duration of your trip</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Input
                  type="date"
                  value={startDate ? format(startDate, "yyyy-MM-dd") : ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Input
                  type="date"
                  value={endDate ? format(endDate, "yyyy-MM-dd") : ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button onClick={handleNextStep} disabled={!startDate || !endDate}>Next</Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Invite others</h2>
            <p className="text-muted-foreground">Invite Family and friends to keep them updated about your trips</p>
            <form onSubmit={handleAddParticipant} className="flex space-x-2">
              <Input 
                placeholder="Enter email" 
                value={newParticipant} 
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </form>
            <div>
              <h3 className="font-semibold">Participant list:</h3>
              <ul className="list-disc list-inside">
                {participants.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Set Travel preferences</h2>
            <p className="text-muted-foreground">Override your set preferences or change them only for this trip</p>
            <div className="space-y-2">
              <Label>Preferred Accommodation Type *</Label>
              <Select value={accommodationType} onValueChange={setAccommodationType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Activity Types *</Label>
              <Select
                value={activityTypes.join(',')}
                onValueChange={(value) => setActivityTypes(value.split(','))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sightseeing">Sightseeing</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Budget Range *</Label>
              <Select value={budgetRange} onValueChange={setBudgetRange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="mid-range">Mid-range</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button onClick={handleFinish} disabled={!accommodationType || activityTypes.length === 0 || !budgetRange}>Finish</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <div className="mt-6">
          {renderFormStep()}
        </div>
      </div>
    </div>
  )
}