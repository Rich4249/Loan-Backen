import s3 from "../config/s3.js";
import pool from "../config/db.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload to S3
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    // Save file info to database
    const result = await pool.query(
      `INSERT INTO documents (user_id, file_name, file_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, fileName, uploadResult.Location]
    );

    res.json({
      message: "Document uploaded successfully",
      document: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading document",
      error: err.message,
    });
  }
};
