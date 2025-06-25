import { useState, useEffect } from "react"
import { Card, Button } from "./UI"
import { User, Clock } from "lucide-react"
import { useAuth } from "../utility/Hooks"


export const LoginPage = () => {
  const { loginWithGoogle, getUser, setUser, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("here")
    const checkUser = async () => {
      try {
        const userData = await getUser()
        console.log(userData)
        if (userData) {
          setUser(userData);
          isAuthenticated(true)
        }
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div>
            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Pomodoro Timer</h1>
            <p className="text-gray-600 mt-2">Focus, study, and track your productivity</p>
          </div>
          
          <Button
            variant="primary"
            size="large"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              'Signing in...'
            ) : (
              <>
                <User className="w-5 h-5" />
                Sign in with Google
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};