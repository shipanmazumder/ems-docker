# Online Exam Management System (QEMS)

Online Quiz Examination System is a fast method to collect answers, auto-mark submissions, and develop examination methods with accuracy. QEMS supports secure login, speed, and requires less manpower to handle multiple instructors. It also offers portability features. Almost all organizations today use online examination systems to manage exams, reducing time in examinations. QEMS includes features like resumption capability, random question selection, random question distribution, and random student's time in examinations.

## Project Functions:

### For Everybody
- Show Home Page

### For Teacher
- Teacher Registration
- Teacher Login
- Create Class
- Upload Class Materials
- Create Quiz Exam

### For Student
- Student Registration
- Student Login
- Join Class
- Archive Class
- Show/Download Class Material
- Give Exam
- Show Exam Result

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/shipanmazumder/ems-docker.git
    cd ems-docker
    ```

2. Create a `.env` file in the api root and configure any environment variables needed by your Node.js application. For example:

    ```env
    DATABASE_URL="mongodb://mongo:27017/ems"
    PORT=4000
    AWS_BUCKET_NAME="your bucket name"
    AWS_BUCKET_REGION="aws region"
    AWS_ACCESS_KEY="access key"
    AWS_SECRET_KEY="secret key"

    REDIS_HOST=redis
    REDIS_PORT=6379
    REDIS_CACHE_TIMEOUT=120
    ```

3. Start the application using Docker Compose:

    ```bash
    docker-compose up
    ```

    This will build the Docker images and start the containers.

4. Access your application at `http://localhost:3000` in your web browser.

## Stopping the Application

To stop the application and remove the containers, run:

```bash
docker-compose down
