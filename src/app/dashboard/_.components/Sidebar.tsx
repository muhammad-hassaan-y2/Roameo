import { Home, Plane, Wallet, MessageSquare, Compass, User, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

type SidebarProps = {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const sidebarItems = [
    { name: 'Home', icon: Home },
    { name: 'Trips', icon: Plane },
    { name: 'Budget Tracker', icon: Wallet },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Recommendation', icon: Compass },
  ]

  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-center">Logo Placeholder</h2>
      </div>
      <nav className="mt-8 flex-grow">
        {sidebarItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={`flex items-center w-full px-4 py-2 text-left ${
              activeItem === item.name ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => onItemClick(item.name)}
          >
            <item.icon className="mr-2" />
            {item.name}
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="flex items-center w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100">
          <User className="mr-2" />
          Edit Profile
        </Button>
        <Button variant="ghost" className="flex items-center w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100">
          <Settings className="mr-2" />
          Settings
        </Button>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm font-medium">Username</span>
        </div>
      </div>
    </div>
  )
}