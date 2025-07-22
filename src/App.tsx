import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import NewDrill from './pages/NewDrill'
import Drill from './pages/Drill'
import History from './pages/History'
import Navbar from './components/Navbar'
import { supabase } from './lib/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@supabase/auth-ui-react'
import { useState, useEffect } from 'react'

function App() {
  const [session, setSession] = useState<ReturnType<typeof supabase.auth.getSession>["data"]["session"] | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoaded(true);
    });

    const { data: {subscription}} = supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));

    return () => subscription.unsubscribe();
  }, []);

  if (!loaded) return null;
  if (!session) return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100">
      <h1 className="text-5xl m-2 text-center">PUTTING TRACKER</h1>
      <Auth 
        supabaseClient={supabase}
        appearance={{theme: ThemeSupa}}
        theme="dark"
        providers={[]}
      />
    </div>
  )

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/drill/new" element={<NewDrill />} />
        <Route path="/drill/:id" element={<Drill />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
