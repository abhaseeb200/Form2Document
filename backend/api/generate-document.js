const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const data = req.body;

  try {
    const templatePath = path.join(__dirname, "..", "compliance-edit.pdf");
    const outputPath = path.join(__dirname, "..", "generated", "compliance-edit-filled.pdf");

    const bytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    form.getTextField("text_1upvx").setText(data?.address || "");
    form.getTextField("text_2aott").setText(data?.price || "");
    form.getTextField("text_3hfd").setText(data?.fullName || "");
    form.getTextField("text_5ttjw").setText(data?.date || "");
    form.getTextField("text_6brye").setText(data?.address || "");
    form.getTextField("text_7uprd").setText(data?.fullName || "");
    form.getTextField("text_8khjn").setText(data?.date || "");
    form.getTextField("text_9lzsn").setText(data?.fullName || "");
    form.getTextField("text_10krxw").setText(data?.date || "");

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    return res.status(200).json({
      message: "Document generated successfully",
      filePath: "/api/download",
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return res.status(500).json({ message: "Failed to generate document" });
  }
};
