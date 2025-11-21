import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!global._mongoosePromise) {
  global._mongoosePromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const ReportSchema = new mongoose.Schema({
  userId: String,
  type: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Report =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default async function handler(req, res) {
  await global._mongoosePromise;

  if (req.method === "POST") {
    const body = req.body;
    const doc = await Report.create(body);
    res.status(200).json({ success: true, data: doc });
  }

  if (req.method === "GET") {
    const data = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  }
}
