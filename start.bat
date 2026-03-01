@echo off
echo Starting Punjab Lottery Result Website...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm install && npm run dev"

echo.
echo Starting Frontend Server...
cd ../frontend
start "Frontend Server" cmd /k "npm install && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin
echo.
echo Default Admin Credentials:
echo Email: admin@punjablottery.com
echo Password: admin123
echo.
pause
