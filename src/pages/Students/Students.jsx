import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import api from '../../utils/api'
import './Students.css'

function Students() {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [gradeFilter, setGradeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const params = {}
        if (searchTerm) params.search = searchTerm
        if (gradeFilter) params.grade = gradeFilter
        if (statusFilter) params.status = statusFilter

        const response = await api.getStudents(params)
        setStudents(response.students || [])
      } catch (err) {
        setError('Failed to load students')
        console.error('Students error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [searchTerm, gradeFilter, statusFilter])

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id)
        setStudents(students.filter(student => student.id !== id))
      } catch (err) {
        setError('Failed to delete student')
        console.error('Delete error:', err)
      }
    }
  }

  if (loading) {
    return <div className="students-page"><div className="loading">Loading students...</div></div>
  }

  if (error) {
    return <div className="students-page"><div className="error">{error}</div></div>
  }

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
            <select
              className="filter-select"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
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
                      <button
                        className="action-btn delete"
                        title="Delete"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
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
