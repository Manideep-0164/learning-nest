---
⭐Deployed Link:- https://learning-nest-delta.vercel.app/
---

# LearningNest

## Introduction

Welcome to LearningNest, the innovative Learning Management System (LMS) designed to redefine education. Our platform simplifies course management, assignment tracking, and communication for students, instructors, and institutions. Beyond the basics, LearningNest leverages AI for personalized learning and fosters collaboration through Collaborative Learning Spaces, ensuring education is a dynamic, adaptive experience.

## Key Features

- **Student Dashboard**: Easily manage courses and assignments.
- **Intuitive Instructor Dashboard**: Streamlined assignment creation.
- **Student Enrollment and Assignment Submission**: Seamless interaction.
- **Generative AI Chatbot**: Enhances user interaction.
- **Cutting-edge AI Assignment Generator**: Automates assignment creation.
- **Announcement System**: Disseminate crucial updates.

## Tech Stack

- Frontend: Angular
- Backend: Node.js
- Database: MySQL

## Backend

The backend is built on Node.js.

## Installation & Getting Started

To run the project locally, follow these steps:

```bash
    git clone https://github.com/Manideep-0164/learning-nest.git

    cd learning-nest/backend
    npm install
    npm run server

    cd ../frontend
    npm install
    ng serve
```

## Usage

### Student Section:

- Users should register and log in to access the student features.
- After logging in, students can enroll in courses.
- The dashboard displays all enrolled courses. Click on a course to access related assignments.
- In the assignments section, students can view, filter, and submit assignments for their enrolled courses.
- Students can check for announcements in a dedicated section.
- Explore the chatbot feature for additional assistance.

### Instructor Section:

- Instructors should register and log in to access instructor features.
- During registration, instructors choose the course they will teach.
- The dashboard displays enrolled students and their assignment submission statistics for the chosen course.
- Manually post assignments.
- Use AI to generate assignments based on course, concept, and difficulty level.
- Instructors can post announcements specific to their courses.

## Endpoints

### Student

- `GET /api/student`: Fetch all students.
- `POST /api/student/signup`: Register a new student.
- `POST /api/student/signin`: Login a student.
- ...

### Instructor

- `GET /api/instructor`: Fetch all instructors.
- `POST /api/instructor/signup`: Register a new instructor.
- `POST /api/instructor/signin`: Login an instructor.
- ...

### Department

- `GET /api/department`: Fetch all departments.
- `POST /api/department`: Create a new department.
- ...

### Course

- `GET /api/course`: Fetch all courses.
- `POST /api/course`: Create a new course.
- ...

### Enrollment

- `GET /api/enrollment`: Fetch all enrollments.
- `POST /api/enrollment`: Enroll a student in a course.
- ...

### Assignment

- `GET /api/assignment`: Fetch all assignments.
- `POST /api/assignment`: Create a new assignment.
- ...

### Submission

- `GET /api/submission`: Fetch all submissions.
- `POST /api/submission`: Submit an assignment.
- ...

### Announcement

- `GET /api/announcement`: Get all announcements.
- `GET /api/announcement/:id`: Get a specific announcement.
- `POST /api/announcement`: Post a new announcement.
- ...

### AI Chat

- `POST /api/ai/chat`: Post a message for chatbot AI.

### AI Assignment

- `POST /api/ai/assignment`: Get assignment information using AI.

---

<h1 align="center">✨Thank You✨</h1>
