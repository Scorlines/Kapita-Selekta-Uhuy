// Utility untuk mengelola penyimpanan laporan
import { deleteChat } from './chatStorage';

export const reportStorage = {
  // Menyimpan laporan baru
  saveReport: (reportData) => {
    const reports = reportStorage.getAllReports();
    const reportId = Date.now();
    const newReport = {
      id: reportId,
      ...reportData,
      timestamp: new Date().toISOString(),
      status: 'Baru',
      urgency: 'Sedang',
      student: reportData.name && reportData.name.trim() ? reportData.name.trim() : 'Anonymous'
    };
    
    reports.push(newReport);
    localStorage.setItem('bullyingReports', JSON.stringify(reports));
    return newReport;
  },

  // Mengambil semua laporan
  getAllReports: () => {
    const reports = localStorage.getItem('bullyingReports');
    return reports ? JSON.parse(reports) : [];
  },

  // Mengupdate status laporan
  updateReportStatus: (reportId, newStatus) => {
    const reports = reportStorage.getAllReports();
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus }
        : report
    );
    localStorage.setItem('bullyingReports', JSON.stringify(updatedReports));
    return updatedReports;
  },

  // Menghapus laporan
  deleteReport: (reportId) => {
    const reports = reportStorage.getAllReports();
    const filteredReports = reports.filter(report => report.id !== reportId);
    localStorage.setItem('bullyingReports', JSON.stringify(filteredReports));
    
    // Hapus chat terkait dengan kode laporan (menggunakan ID sebagai kode)
    const chatCode = reportId.toString();
    deleteChat(chatCode);
    
    return filteredReports;
  },

  // Mendapatkan statistik dashboard
  getStats: () => {
    const reports = reportStorage.getAllReports();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const recentReports = reports.filter(report => 
      new Date(report.timestamp) >= thirtyDaysAgo
    );
    
    return {
      total: reports.length,
      thirtyDays: recentReports.length,
      completed: reports.filter(report => report.status === 'Selesai').length,
      new: reports.filter(report => report.status === 'Baru').length
    };
  },

  // Mendapatkan tipe bullying dari deskripsi
  getBullyingType: (description) => {
    const text = description.toLowerCase();
    if (text.includes('pukul') || text.includes('tendang') || text.includes('dorong') || text.includes('fisik')) {
      return 'Bullying - Fisik';
    } else if (text.includes('hina') || text.includes('ejek') || text.includes('kata') || text.includes('verbal')) {
      return 'Bullying - Verbal';
    } else if (text.includes('cyber') || text.includes('online') || text.includes('medsos') || text.includes('internet')) {
      return 'Bullying - Cyber';
    } else if (text.includes('isolasi') || text.includes('abaikan') || text.includes('kucilkan')) {
      return 'Bullying - Sosial';
    }
    return 'Bullying - Lainnya';
  },

  // Format tanggal untuk tampilan
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID') + ' ' + 
           date.toLocaleTimeString('id-ID', { hour12: false });
  }
};