# School ERP System - Backend

A comprehensive School ERP (Enterprise Resource Planning) backend system built with Node.js, Express, and Prisma.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin, Teacher, Student, and Parent modules
- **Attendance Tracking**: Monitor and manage student attendance
- **Timetable Management**: Create and manage class schedules
- **Parent-Teacher Meetings (PTM)**: Schedule and manage parent-teacher interactions
- **API Documentation**: Swagger/OpenAPI documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger

## Project Structure

```
back-end/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middlewares
│   ├── utils/              # Utility functions
│   └── docs/               # API documentation
└── prisma/
    ├── schema.prisma       # Database schema
    ├── seed.js             # Database seeding
    └── migrations/         # Database migrations
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Database (PostgreSQL/MySQL/SQLite)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Scool-ERP/back-end
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the back-end directory:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npx prisma db seed
```

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Admin
- `GET /api/admin/*` - Admin management endpoints

### Teachers
- `GET /api/teacher/*` - Teacher management endpoints

### Students
- `GET /api/student/*` - Student management endpoints

### Parents
- `GET /api/parent/*` - Parent management endpoints

### Attendance
- `GET /api/attendance/*` - Attendance tracking endpoints

### Timetable
- `GET /api/timetable/*` - Timetable management endpoints

### PTM (Parent-Teacher Meetings)
- `GET /api/ptm/*` - PTM scheduling endpoints

## API Documentation

Access Swagger documentation at: `http://localhost:3000/api-docs`

## Database Schema

The application uses Prisma ORM. View the schema in `prisma/schema.prisma`.

To visualize the database schema:
```bash
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
