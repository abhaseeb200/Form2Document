const express = require("express");
const path = require("path");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

app.post("/generate-document", async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, "compliance-edit.pdf");
    const bytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    const addressField = form.getTextField("text_1upvx");
    const priceField = form.getTextField("text_2aott");
    const nameField = form.getTextField("text_3hfd");
    const dateField = form.getTextField("text_5ttjw");
    const addressField2 = form.getTextField("text_6brye");
    const nameField2 = form.getTextField("text_7uprd");
    const dateField2 = form.getTextField("text_8khjn");
    const nameField3 = form.getTextField("text_9lzsn");
    const dateField3 = form.getTextField("text_10krxw");

    addressField.setText(data?.address || "");
    priceField.setText(data?.price || "");
    nameField.setText(data?.fullName || "");
    dateField.setText(data?.date || "");
    addressField2.setText(data?.address || "");
    nameField2.setText(data?.fullName || "");
    dateField2.setText(data?.date || "");
    nameField3.setText(data?.fullName || "");
    dateField3.setText(data?.date || "");

    form.flatten();
    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=compliance-edit-filled.pdf"
    );
    res.send(pdfBytes);
  } catch (error) {
    res.status(501).json({ message: "Not implemented yet", error: error });
  }
});

// fs.writeFileSync("generated/compliance-edit-filled.pdf", pdfBytes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
