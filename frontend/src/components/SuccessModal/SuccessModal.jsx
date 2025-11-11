import { useState } from 'react';
import { FiCopy, FiCheck, FiX } from 'react-icons/fi';
import './SuccessModal.css';

function SuccessModal({ isOpen, onClose, reportData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reportData) return null;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
              <label>ID LAPORAN:</label>
              <div className="info-value-container">
                <span className="info-value">{reportData.id}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(reportData.id)}
                  title="Salin ID"
                >
                  {copied ? <FiCheck className="check-icon" /> : <FiCopy />}
                </button>
              </div>
            </div>

            <div className="info-item">
              <label>JENIS:</label>
              <div className="info-value-container-no-copy">
                <span className="info-value">{reportData.type}</span>
              </div>
            </div>

            <div className="info-item">
              <label>STATUS:</label>
              <div className="info-value-container-no-copy">
                <span className="info-value status-badge">{reportData.status}</span>
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
          <button className="ok-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
