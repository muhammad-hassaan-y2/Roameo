'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sidebar } from './_.components/Sidebar'
import { NewTripForm } from './_.components/NewTripForm\''
import { PlusCircle } from 'lucide-react'

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('Home')
  const [showNewTripForm, setShowNewTripForm] = useState(false)
  const [trips, setTrips] = useState<any[]>([])

  const handleSidebarClick = (item: string) => {
    setActiveItem(item)
  }

  const handleCreateNewTrip = () => {
    setShowNewTripForm(true)
  }

  const handleCloseNewTripForm = () => {
    setShowNewTripForm(false)
  }

  const handleFinishNewTrip = (tripData: any) => {
    setTrips([...trips, tripData])
    setActiveItem('Trips')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarClick} />
      
      <div className="flex-1 p-10 overflow-auto">
        {activeItem === 'Home' && (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-8">Everything you need for your next adventure appears here</p>
            <div className="flex justify-center items-center mb-8">
              <PlusCircle className="text-green-500 w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Hey Username</h2>
            <p className="text-gray-600 mb-4">You have no trips yet, let's create a new trip</p>
            <Button onClick={handleCreateNewTrip} className="bg-green-500 hover:bg-green-600">Create a new trip</Button>
          </div>
        )}
        {activeItem === 'Trips' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Your Trips</h1>
            {trips.length === 0 ? (
              <p className="text-gray-600">You haven't created any trips yet.</p>
            ) : (
              <ul className="space-y-4">
                {trips.map((trip, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{trip.tripName}</h3>
                    <p className="text-gray-600">Destination: {trip.destination}</p>
                    <p className="text-gray-600">Dates: {trip.startDate?.toDateString()} - {trip.endDate?.toDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
            <Button onClick={handleCreateNewTrip} className="mt-4 bg-green-500 hover:bg-green-600">Create a new trip</Button>
          </div>
        )}
        {activeItem === 'Budget Tracker' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Budget Tracker</h1>
            <p className="text-gray-600">Track your travel expenses and manage your budget here.</p>
          </div>
        )}
        {activeItem === 'Messages' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Messages</h1>
            <p className="text-gray-600">Communicate with your travel companions and service providers.</p>
          </div>
        )}
        {activeItem === 'Recommendation' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Recommendations</h1>
            <p className="text-gray-600">Discover personalized travel recommendations based on your preferences.</p>
          </div>
        )}
      </div>

      {showNewTripForm && <NewTripForm onClose={handleCloseNewTripForm} onFinish={handleFinishNewTrip} />}
    </div>
  )
}