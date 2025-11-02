import { FiUsers, FiAlertTriangle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'
import './Dashboard.css'

function Dashboard() {
  const stats = [
    {
      title: 'Total Students',
      value: '1,245',
      change: '+12%',
      icon: <FiUsers />,
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Active Incidents',
      value: '8',
      change: '-5%',
      icon: <FiAlertTriangle />,
      color: 'warning',
      trend: 'down'
    },
    {
      title: 'Resolved Cases',
      value: '156',
      change: '+23%',
      icon: <FiCheckCircle />,
      color: 'success',
      trend: 'up'
    },
    {
      title: 'Safety Score',
      value: '94%',
      change: '+3%',
      icon: <FiTrendingUp />,
      color: 'info',
      trend: 'up'
    }
  ]

  const recentIncidents = [
    {
      id: 1,
      type: 'Bullying',
      student: 'John Doe',
      date: '2025-11-01',
      status: 'Investigating',
      severity: 'high'
    },
    {
      id: 2,
      type: 'Absence',
      student: 'Jane Smith',
      date: '2025-11-01',
      status: 'Resolved',
      severity: 'low'
    },
    {
      id: 3,
      type: 'Medical',
      student: 'Mike Johnson',
      date: '2025-10-31',
      status: 'In Progress',
      severity: 'medium'
    },
    {
      id: 4,
      type: 'Security',
      student: 'Sarah Williams',
      date: '2025-10-30',
      status: 'Resolved',
      severity: 'high'
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className={`stat-change ${stat.trend}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card dashboard-card">
          <div className="card-header">
            <h3>Recent Incidents</h3>
            <button className="btn btn-secondary">View All</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {recentIncidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>{incident.type}</td>
                    <td>{incident.student}</td>
                    <td>{incident.date}</td>
                    <td>
                      <span className={`badge badge-${
                        incident.status === 'Resolved' ? 'success' : 
                        incident.status === 'Investigating' ? 'warning' : 'info'
                      }`}>
                        {incident.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${
                        incident.severity === 'high' ? 'danger' : 
                        incident.severity === 'medium' ? 'warning' : 'info'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card dashboard-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <FiUsers />
              <span>Add Student</span>
            </button>
            <button className="quick-action-btn">
              <FiAlertTriangle />
              <span>Report Incident</span>
            </button>
            <button className="quick-action-btn">
              <FiCheckCircle />
              <span>Safety Check</span>
            </button>
            <button className="quick-action-btn">
              <FiTrendingUp />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
