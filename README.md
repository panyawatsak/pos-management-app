POS Management App

A simple management system for backoffice operations. This application allows staff to manage products, and categories through a REST API and an Angular-based frontend.

Features:

This Backoffice POS Management App allows staff to manage products, orders, and categories seamlessly. Users can perform essential CRUD (Create, Read, Update, Delete) operations on these entities through a simple and interactive Angular-based UI. The backend, powered by Node.js and Express, provides a RESTful API for handling data operations. The app is fully Dockerized for easy setup and deployment, ensuring a consistent environment across different systems.

How to Interact with the App:

1. Access the Application:
   - Open your browser and navigate to http://localhost:4200/index.html for the frontend interface.
   - Use http://localhost:5000 to access the API directly.

2. Manage Products and Categories:
   - Use the UI to add, view, update, and delete records.
   - Each entity has a dedicated section for streamlined management.

3. API Interaction:
   - Utilize API endpoints to interact with the database programmatically (refer to the API section below for detailed endpoints).

CRUD Operations: Create, Read, Update, Delete for:
- Products
- Orders
- Categories

Database Integration: SQLite database for persistent storage.

Dockerized: Fully containerized for easy deployment with Docker and Docker Compose.

Angular Frontend: Interactive UI for managing POS entities.

Node.js Backend: RESTful API for managing business logic.

Tech Stack:

- Frontend: Angular
- Backend: Node.js with Express
- Database: SQLite
- Containerization: Docker & Docker Compose

Getting Started:

Prerequisites:

- Docker
- Docker Compose

Setup Instructions:

1. Clone the Repository:

git clone <your-repo-url>
cd pos-management-app

2. Start the Application with Docker:

docker-compose up --build

3. Access the Application:

- Frontend (Angular UI): http://localhost:4200/index.html
- Backend (API): http://localhost:5000

4. Stop the Application:

docker-compose down

Assumptions:

- SQLite is used for simplicity (easily switchable to PostgreSQL/MySQL).
- Basic error handling is implemented.
- Products and orders are linked via foreign key relationships.

Future Improvements:

- Add user authentication for better security.
- Implement pagination for large datasets.
- Enhance the UI with advanced filters and search.
