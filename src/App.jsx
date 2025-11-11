import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LandingPage from './pages/LandingPage/LandingPage'
import MainMenu from './pages/MainMenu/MainMenu'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Students from './pages/Students/Students'
import Edukasi from './pages/Edukasi/Edukasi'
import Admin from './pages/Admin/Admin'
import Laporkan from './pages/Laporkan/Laporkan'
import JenisBullying from './pages/JenisBullying/JenisBullying'
import Chat from './pages/Chat/Chat'
import Response1 from './pages/Response1/Response1'
import Response2 from './pages/Response2/Response2'
import Response3 from './pages/Response3/Response3'
import Response4 from './pages/Response4/Response4'
import Response5 from './pages/Response5/Response5'
import Response6 from './pages/Response6/Response6'
import KapanTerjadi from './pages/KapanTerjadi/KapanTerjadi'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/edukasi" element={<Edukasi />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/laporkan" element={<Laporkan />} />
        <Route path="/jenisbullying" element={<JenisBullying />} />
        <Route path="/response1" element={<Response1 />} />
        <Route path="/response2" element={<Response2 />} />
        <Route path="/response3" element={<Response3 />} />
        <Route path="/response4" element={<Response4 />} />
        <Route path="/response5" element={<Response5 />} />
        <Route path="/response6" element={<Response6 />} />
        <Route path="/kapan-terjadi" element={<KapanTerjadi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
