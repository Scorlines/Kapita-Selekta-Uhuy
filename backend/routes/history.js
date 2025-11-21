import express from 'express';
import Report from '../models/report.js';

const router = express.Router();

// POST /api/history - Save new report
router.post('/', async (req, res) => {
  try {
    const { userId, type, description } = req.body;
    
    // Validasi input
    if (!userId || !type || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'userId, type, dan description harus diisi' 
      });
    }
    
    const doc = await Report.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/history - Get all reports
router.get('/', async (req, res) => {
  try {
    const data = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/history/:id - Get single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/history/:id - Update report
router.put('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report tidak ditemukan' });
    }
    
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/history/:id - Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report tidak ditemukan' });
    }
    
    res.status(200).json({ success: true, message: 'Report berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;