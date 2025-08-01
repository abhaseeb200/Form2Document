const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const filePath = path.join(__dirname, "..", "generated", "compliance-edit-filled.pdf");

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return res.status(404).send("File not found");
  }

  const fileStream = fs.createReadStream(filePath);

  res.setHeader("Content-Disposition", 'attachment; filename="filled-document.pdf"');
  res.setHeader("Content-Type", "application/pdf");

  fileStream.pipe(res);
};
