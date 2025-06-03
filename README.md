# Smart Parking System

A modern parking management system with automated vehicle tracking and payment processing.

## Features

- Real-time parking slot management
- Automated entry and exit processing
- Dynamic pricing based on duration
- Real-time dashboard with statistics
- Responsive web interface

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: FastAPI (Python)
- State Management: React Hooks
- UI Components: Material-UI

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn backend.main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the frontend directory with:
```
REACT_APP_API_URL=http://localhost:8000
```

## Deployment

The application is configured for deployment on:
- Frontend: Netlify
- Backend: Render/Railway

## License

MIT 