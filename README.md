# Form2Document 📝

A simple full-stack project that generates documents from form data.  
The project consists of a **frontend** built with React/Next.js and a **backend** built with Node.js/Express.

---

## 🚀 Live Links

- **Frontend:** [Form2Document Frontend](https://haseeb-form2document.vercel.app/)  
- **Backend:** [Form2Document Backend](https://haseeb-form2document-backend.vercel.app/)

---

## 📌 API Endpoints

### Generate Document
**POST** `/generate-document`

#### Request Body
```json
{
  "fullName": "John Doe",
  "address": "123 Street, City",
  "price": "5000",
  "date": "2025-08-16"
}

#### Response
The API responds with a file download (e.g., PDF).
