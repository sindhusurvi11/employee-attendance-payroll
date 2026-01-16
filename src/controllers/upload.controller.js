const cloudinary = require("../config/cloudinary");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "employee-payroll",
        resource_type: "raw",
        public_id: req.file.originalname.split(".")[0],
      }
    );

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
};
