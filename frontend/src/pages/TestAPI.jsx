import { useState, useEffect } from 'react'
import api from '../api'

function TestAPI() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Test GET
  const testGet = async () => {
    try {
      setLoading(true)
      const response = await api.getReports()
      setReports(response.data)
      setMessage(`✅ Berhasil fetch ${response.data.length} reports`)
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Test POST
  const testPost = async () => {
    try {
      setLoading(true)
      const newReport = {
        userId: 'test-user-' + Date.now(),
        type: 'test',
        description: 'Test report from frontend'
      }
      const response = await api.saveReport(newReport)
      setMessage(`✅ Report berhasil disimpan dengan ID: ${response.data._id}`)
      testGet() // Refresh list
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testGet()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test API Connection</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testGet} disabled={loading}>
          🔄 Refresh Reports
        </button>
        <button onClick={testPost} disabled={loading} style={{ marginLeft: '10px' }}>
          ➕ Create Test Report
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '10px', 
          background: message.includes('✅') ? '#d4edda' : '#f8d7da',
          border: '1px solid',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      <h2>Reports ({reports.length})</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <strong>{report.type}</strong> - {report.description}
              <br />
              <small>User: {report.userId} | {new Date(report.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TestAPI