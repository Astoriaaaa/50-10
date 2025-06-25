import { useState } from "react"
import { useAuth } from "../utility/Hooks"
import { Button } from "./UI"
import { Clock, Settings } from "lucide-react"
import { SettingsDropdown } from "./Settings"

export const Header = () => {
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold">Pomodoro Timer</h1>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5" />
            </Button>
            
            <SettingsDropdown
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
              user={user}
              onLogout={logout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};