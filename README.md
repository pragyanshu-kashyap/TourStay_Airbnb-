# TourStay (Airbnb Clone)

[Live Demo on Render](https://tourstay-ir83.onrender.com)

TourStay is a full-stack web application inspired by Airbnb, designed for listing and booking unique stays. It features user authentication, listing and review management, and a modern, responsive UI.

## Features

- User authentication (login, signup)
- Listing management (create, edit, delete, view)
- Review system for listings
- Client-side and server-side validation
- Error handling with custom ExpressError utility
- Flash messages for user feedback
- Responsive UI with EJS templates and custom CSS
- Data initialization and maintenance scripts

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates), CSS, Font Awesome
- **Database:** MongoDB Atlas (cloud-hosted)
- **Deployment:** Render (live app and server)

## Project Structure

- controllers – Route logic for listings, users, and reviews
- models – Mongoose models for MongoDB
- routes – Express route definitions
- views – EJS templates for UI
- public – Static assets (CSS, client-side JS)
- utils – Utilities (error handling, async wrappers)
- scripts – Data cleaning and maintenance scripts
- init – Data initialisation

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pragyanshu-kashyap/TourStay_Airbnb-.git
   cd TourStay_Airbnb-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a .env file in the root directory.
   - Add your MongoDB Atlas URI and any other required secrets.

4. **Run the app locally:**
   ```bash
   npm start
   ```

5. **Access the app:**
   - Visit `http://localhost:3000` in your browser.

## Deployment

- **App:** Deployed on Render – [Live Link](https://tourstay-ir83.onrender.com)
- **Database:** Hosted on MongoDB Atlas

## License

This project is for educational purposes and is not affiliated with Airbnb.

---
