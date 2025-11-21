import { createContext, useContext, useState } from 'react'
import api from '../api'

const ReportContext = createContext()

export const useReport = () => {
  const context = useContext(ReportContext)
  if (!context) {
    throw new Error('useReport must be used within ReportProvider')
  }
  return context
}

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState({
    userId: '',
    type: '',
    description: '',
    date: '',
    location: '',
    locationDetail: '',
    witnesses: [],
    witnessesOther: '',
    status: 'pending'
  })

  const updateReportData = (field, value) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateMultipleFields = (fields) => {
    setReportData(prev => ({
      ...prev,
      ...fields
    }))
  }

  const submitReport = async () => {
    try {
      // Generate unique userId jika belum ada
      if (!reportData.userId) {
        reportData.userId = 'user-' + Date.now()
      }

      const response = await api.saveReport(reportData)
      
      // Reset data setelah berhasil
      resetReportData()
      
      return response.data
    } catch (error) {
      console.error('Error submitting report:', error)
      throw error
    }
  }

  const resetReportData = () => {
    setReportData({
      userId: '',
      type: '',
      description: '',
      date: '',
      location: '',
      locationDetail: '',
      witnesses: [],
      witnessesOther: '',
      status: 'pending'
    })
  }

  return (
    <ReportContext.Provider value={{
      reportData,
      updateReportData,
      updateMultipleFields,
      submitReport,
      resetReportData
    }}>
      {children}
    </ReportContext.Provider>
  )
}