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

app.get("/test", (req, res) => {
  const filePath = path.join(process.cwd(), "public", "compliance-edit.pdf");
  res.sendFile(filePath);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

app.post("/generate-document", async (req, res) => {
  const data = req.body;

  try {
    await fillPdf(data);
    res.status(200).json({
      message: "Document generated successfully",
      filePath: "/download",
    });
  } catch (error) {
    res.status(501).json({ message: "Not implemented yet", error: error });
  }
});

app.get("/download", async (req, res) => {
  const filePath = path.join(__dirname, "compliance-edit.pdf");

  
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return res.status(404).send("File not found");
  }
  const data =  {
    address: "efedgf dtex"
  }
  return await fillPdf(data)
  // return res.sendFile(filePath);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      return res.status(500).send("Error downloading file");
    }

    console.log("File downloaded successfully");
  });
});

const fillPdf = async (data) => {
  const filePath = path.join(__dirname, "compliance-edit.pdf");
  //const bytes = fs.readFileSync(filePath);
  return res.send(filePath);
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

  return fs.writeFileSync("generated/compliance-edit-filled.pdf", pdfBytes);
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
