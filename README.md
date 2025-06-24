# 🏕️ LodgeLink

LodgeLink is a full-stack web application that allows users to list, browse, review, and book lodges. Built using Node.js, Express, MongoDB, and EJS, the platform provides a clean and user-friendly interface with robust authentication and image uploading features.

---

## 🚀 Features

- 🔐 User Authentication (Register/Login/Logout)
- 🏡 Create, Read, Update, Delete lodge listings
- 📸 Upload lodge images with Cloudinary
- ⭐ Leave ratings and reviews on listings
- 🧾 Form validations and error handling
- 🌍 Location-based listings and filter options
- 🧪 Basic testing setup with views and server

---

## 🛠️ Tech Stack

| Technology  | Description                      |
| ----------- | -------------------------------- |
| Node.js     | Backend runtime environment      |
| Express.js  | Web application framework        |
| MongoDB     | NoSQL database                   |
| Mongoose    | MongoDB ODM                      |
| EJS         | Templating engine for UI         |
| Cloudinary  | Image hosting and transformation |
| Multer      | File upload middleware           |
| Passport.js | User authentication middleware   |

---

## 🧰 Folder Structure

LodgeLink/
├── controllers/ # Route logic
├── init/ # Seed data
├── middlewares/ # Custom middleware
├── models/ # Mongoose schemas
├── public/ # Static files (CSS, JS, Images)
├── routes/ # Express route handlers
├── utils/ # Utilities and helpers
├── views/ # EJS templates
├── .gitignore
├── app.js # Main app file
├── cloudConfig.js # Cloudinary configuration
├── package.json

yaml
Copy
Edit

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/LavenderCrude/LodgeLink.git
cd LodgeLink
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root directory:

env
Copy
Edit
DB_URL=your_mongodb_connection_string
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
SESSION_SECRET=your_session_secret
4. Run the App
bash
Copy
Edit
node app.js
App will typically run on http://localhost:3000/

🧪 Testing
Basic views and routes are tested through:

bash
Copy
Edit
test/server.js
test/views/
```
