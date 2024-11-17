# Book Exchange Project

## Introduction

This project is a book exchange platform where users can list books they want to exchange and find books they are interested in.

## Prerequisites

- Node.js
- npm

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/imbdb/fsad-assignment-book-exchange.git
   cd fsad-assignment-book-exchange
   ```

2. **Install dependencies**

   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory and add the following:

   ```
   NEXT_PUBLIC_BACKEND_URL="http://localhost:8080"
   NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
   ```

   Create a `.env` file in the backend directory and add the following:

   ```
   DATABASE_URL="file:./dev.db"
   PORT=8080
   JWT_SECRET=""
   MAILGUN_API_KEY=""
   MAILGUN_FROM_EMAIL=""
   MAILGUN_DOMAIN=""
   FRONTEND_URL="http://localhost:3000"
   BACKEND_URL="http://localhost:8080"
   ```

   if you are from bits pilani, I have provided the backend env in the assignment zip, please paste that file in backend repo

4. **Run the project**

   Run following command in backend diretory

   ```bash
   npm run start:dev
   ```

   Run following command in frontend directory

   ```bash
   npm run dev
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000`
- Register an account or log in if you already have one
- Start listing books you want to exchange and browse books from other users

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Bits Pilani assignment details

Name: Bharat D Bhadresha
ID: 2023TM93576
