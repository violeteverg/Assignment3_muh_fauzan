# Assignment 2 Phincon Academy

## Product Management Backend

This project is a backend service for managing products with full CRUD functionality (Create, Read, Update, Delete). It is built using **Node.js**, **Express**, **Prisma**, and **TypeScript**, connected to a **Neon** database. 

## Features

- **Create** a new product
- **Read** products (both single product and list of products)
- **Update** existing product information
- **Delete** a product (soft delete)


## Technologies Used

- **Node.js**: JavaScript runtime for backend.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database operations.
- **TypeScript**: Typed superset of JavaScript.
- **Neon**: Fully managed serverless PostgreSQL database.


## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or later) installed.
- **npm** (v6 or later) installed.
- Access to a **Neon** PostgreSQL database.

## Getting Started

1. Clone the repository by running `git clone https://github.com/your-username/your-repo.git` and navigate into the directory with `cd your-repo`.
2. Install the necessary dependencies by executing `npm install`.

3. Create a `.env` file in the root of your project with the following content:

   ```env
   DATABASE_URL="postgresql://username:password@ep-neon-database-url/neondb"
   PORT=3000
4. genereate prisma with command `npx prisma generate`
5. run the project with `npm run dev`

## API Documentation

here the link for api documentation using postman collection

```bash
https://www.postman.com/supply-operator-89145472/workspace/phincon-academy/collection/28734905-cf012c83-802f-47be-ac18-7f14fe2e114f?action=share&creator=28734905
