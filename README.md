# Netflix

## Project Overview:
This project involves an app where registered users can both watch movies and upload their own movies. The platform aims to provide a diverse selection of films while empowering users to contribute their own content, fostering a dynamic and engaging streaming experience.

## Features:
- **Authentication:**
  - For authentication, Jason Web Tokens (JWT) are used.
  - JWT is saved in local storage and sent on request where necessary.
- **Users:**
  - Sign up
  - Log in
  - Log Out
  - Search Movies
- **Upload and Stream:**
  - Upload movies
  - Watch movies

## Technologies Used:
- React
- JavaScript
- Node.js
- Express
- MongoDB
- CSS3

## Environment Variables (Server Folder):
- `DATABASE`: MongoDB connection string  
- `PORT`: Port (e.g., 4500)
- `SECRET_KEY`: Git bash(openssl rand -base64 32)

## Start Scripts:
- **Server:**
  - `nodemon server`
- **Client:**
  - `npm start`
