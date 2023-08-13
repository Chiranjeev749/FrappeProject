# FrappeProject
Library Management System
Welcome to the Library Management System! This project aims to streamline and automate library operations, making it easier to manage books, members, and transactions.

Project Structure
The project is organized into two main branches:

master: Contains the backend code developed using Django in a separate file.
master: Contains the frontend code developed using Angular.
Features
The Library Management System provides the following features:

Backend (Django)
Book Management: Add, update, and delete books with details such as title, author, ISBN, and availability status.
Member Registration: Register new members with their names, emails, and keep track of issued and returned books.
Transaction History: Record and manage book borrow and return transactions, including due dates and fines.
Frontend (Angular)
Book List: View a list of available books with details and availability status.
Member Registration: Register new members with their names and emails.
Member History: View a list of registered members, their issued books, debts, and returned books.
Book Rental: Issue and return books, calculate fines for late returns, and update member debt.
Getting Started
To run the project, follow these steps:

Backend (Django):

Make sure you have Python and Django installed.
Navigate to the LibraryManagementBack-end/my_site directory.
Run migrations: python manage.py migrate
Start the development server: python manage.py runserver
Frontend (Angular):

Make sure you have Node.js and Angular CLI installed.
Navigate to the LibraryManagementFront-end directory.
Install dependencies: npm install
Start the development server: ng serve
Access the application at:

Frontend (Angular): http://localhost:4200/
Backend (Django): http://localhost:8000/
