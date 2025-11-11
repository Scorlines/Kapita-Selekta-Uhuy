import { useState } from 'react';
import { FiCopy, FiCheck, FiX } from 'react-icons/fi';
import './SuccessModal.css';

function SuccessModal({ isOpen, onClose, reportData }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !reportData) return null;

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllInfo = () => {
    const allText = `
Laporan Berhasil Dikirim!

ID Laporan: ${reportData.id}
Jenis: ${reportData.type}
Status: ${reportData.status}

Terima kasih atas partisipasi Anda.
Tim admin akan segera menindaklanjuti laporan ini.
    `.trim();
    
    copyToClipboard(allText, 'all');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="modal-header">
          <div className="success-icon-circle">
            <div className="checkmark-icon">✓</div>
          </div>
          <h2 className="modal-title">Laporan Berhasil Dikirim!</h2>
        </div>

        <div className="modal-body">
          <div className="info-card">
            <div className="info-item">
              <label>ID Laporan:</label>
              <div className="info-value-container">
                <span className="info-value">{reportData.id}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(reportData.id, 'id')}
                  title="Salin ID"
                >
                  {copiedField === 'id' ? <FiCheck className="check-icon" /> : <FiCopy />}
                </button>
              </div>
            </div>

            <div className="info-item">
              <label>Jenis:</label>
              <div className="info-value-container">
                <span className="info-value">{reportData.type}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(reportData.type, 'type')}
                  title="Salin Jenis"
                >
                  {copiedField === 'type' ? <FiCheck className="check-icon" /> : <FiCopy />}
                </button>
              </div>
            </div>

            <div className="info-item">
              <label>Status:</label>
              <div className="info-value-container">
                <span className="info-value status-badge">{reportData.status}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(reportData.status, 'status')}
                  title="Salin Status"
                >
                  {copiedField === 'status' ? <FiCheck className="check-icon" /> : <FiCopy />}
                </button>
              </div>
            </div>
          </div>

          <div className="message-box">
            <p>
              Terima kasih atas partisipasi Anda. Tim admin akan segera menindaklanjuti laporan ini.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="copy-all-btn" onClick={copyAllInfo}>
            {copiedField === 'all' ? (
              <>
                <FiCheck /> Tersalin!
              </>
            ) : (
              <>
                <FiCopy /> Salin Semua Info
              </>
            )}
          </button>
          <button className="ok-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
