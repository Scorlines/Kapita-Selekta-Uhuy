import { useState } from 'react'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import './Students.css'

function Students() {
  const [searchTerm, setSearchTerm] = useState('')

  const students = [
    {
      id: 1,
      name: 'John Doe',
      studentId: 'STU001',
      grade: '10A',
      parent: 'Robert Doe',
      phone: '+62 812-3456-7890',
      status: 'active',
      incidents: 0
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: 'STU002',
      grade: '10B',
      parent: 'Mary Smith',
      phone: '+62 813-4567-8901',
      status: 'active',
      incidents: 1
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'STU003',
      grade: '11A',
      parent: 'James Johnson',
      phone: '+62 814-5678-9012',
      status: 'active',
      incidents: 0
    },
    {
      id: 4,
      name: 'Sarah Williams',
      studentId: 'STU004',
      grade: '11B',
      parent: 'Linda Williams',
      phone: '+62 815-6789-0123',
      status: 'inactive',
      incidents: 2
    },
    {
      id: 5,
      name: 'David Brown',
      studentId: 'STU005',
      grade: '12A',
      parent: 'Michael Brown',
      phone: '+62 816-7890-1234',
      status: 'active',
      incidents: 0
    }
  ]

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Students Management</h1>
          <p>Manage and monitor all student information</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus /> Add New Student
        </button>
      </div>

      <div className="card">
        <div className="filter-section">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select className="filter-select">
              <option value="">All Grades</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <select className="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Parent/Guardian</th>
                <th>Phone</th>
                <th>Incidents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="student-id">{student.studentId}</td>
                  <td className="student-name">{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.parent}</td>
                  <td>{student.phone}</td>
                  <td>
                    <span className={`incident-count ${student.incidents > 0 ? 'has-incidents' : ''}`}>
                      {student.incidents}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${student.status === 'active' ? 'success' : 'danger'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View Details">
                        <FiEye />
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <FiEdit />
                      </button>
                      <button className="action-btn delete" title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <p>Showing 1 to 5 of 1,245 entries</p>
          <div className="pagination">
            <button className="pagination-btn">Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students
