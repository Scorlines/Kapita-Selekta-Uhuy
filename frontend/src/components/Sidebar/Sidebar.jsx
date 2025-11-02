import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiAlertTriangle, 
  FiFileText, 
  FiSettings,
  FiShield 
} from 'react-icons/fi'
import './Sidebar.css'

function Sidebar() {
  const menuItems = [
    { path: '/app/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/app/students', icon: <FiUsers />, label: 'Students' },
    { path: '/app/incidents', icon: <FiAlertTriangle />, label: 'Incidents' },
    { path: '/app/reports', icon: <FiFileText />, label: 'Reports' },
    { path: '/app/settings', icon: <FiSettings />, label: 'Settings' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <FiShield className="logo-icon" />
          <span className="logo-text">Safe School</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="version-info">
          <span>Version 1.0.0</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
