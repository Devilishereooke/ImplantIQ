# ImplantIQ

A full-stack web application for identifying dental implant class from the X-ray images

## 🚀 Quick Setup Guide

### Prerequisites
- Python 3.8+
- Node.js v16+
- Git

### Installation

1. **Clone the repository**:
   ```zsh
   git clone https://github.com/Devilishereooke/ImplantIQ.git
   cd ImplantIQ

2. **Set up backend:
   ```zsh
   cd backend
   python -m venv venv  # this command might change depending upon the python version. (If this doesn't work try python3)
   source venv/bin/activate #for linux/macOS
   \venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   
3. ##Run Backend Server:
   ```zsh
   fastapi dev main.py
The server runs at http://localhost:8000

4. ##Set up and run frontend(use new terminal):
   ```zsh
   cd ../frontend
   npm install  # To install all the required dependencies 
   npm run dev  # To run the frontend
Frontend runs at http://localhost:5173



## 🎉 You're Done!

Access the application at: http://localhost:5173

## 📂 Project Structure
```zsh
backend/       # FastAPI server
frontend/      # React/Vite app
models/        # ML model weights (git-lfs)
