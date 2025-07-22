import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewDrill from './pages/NewDrill'
import Drill from './pages/Drill'
import History from './pages/History'
import Navbar from './components/Navbar'

const fakeLoggedIn = true;

function App() {
  if (!fakeLoggedIn) return <Login />;

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
