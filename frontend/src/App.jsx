import React from "react";
import { useAuth } from "./utility/Hooks"
import { MainApp } from "./MainApp";
import { LoginPage } from "./components/AuthComponent"
import { AppProvider } from "./utility/Context"
import "./index.css"
const App = () => {
  return (
    <AppProvider>
      <div className="app">
        <AuthenticatedApp />
      </div>
    </AppProvider>
  );
};

const AuthenticatedApp = () => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated? <MainApp /> : <LoginPage/>
};

export default App;