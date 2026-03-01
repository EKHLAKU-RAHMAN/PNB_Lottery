# Punjab Lottery Result Website

A modern, responsive lottery result website with real-time updates and admin panel.

## Features

### Frontend
- **Modern UI/UX**: Navy blue + Gold premium theme
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion animations
- **Real-time Updates**: Socket.io integration
- **Single Page Application**: All sections on one scrollable page

### Backend
- **RESTful API**: Express.js with MongoDB
- **Real-time Communication**: Socket.io
- **JWT Authentication**: Secure admin access
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, CORS, helmet

### Sections
1. **Hero Section**: Eye-catching landing with CTA
2. **Check Ticket**: Real-time ticket verification
3. **Recent Winners**: Dynamic winner display
4. **Prize Structure**: 6-tier prize display
5. **Contact Section**: Contact form with validation
6. **Admin Panel**: Complete ticket management

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- Socket.io Client
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT
- bcryptjs
- CORS
- Helmet

## Project Structure

```
PNB Lottery/
├── backend/
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── ticketController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Ticket.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── tickets.js
│   │   └── contact.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── config/
│   │   └── database.js
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CheckTicketSection.jsx
│   │   │   ├── WinnersSection.jsx
│   │   │   ├── PrizeStructureSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LoginForm.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/punjab-lottery
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## Database Setup

### MongoDB Collections

#### Admin Collection
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  role: String (default: 'admin')
}
```

#### Ticket Collection
```javascript
{
  ticketNumber: String (unique, required),
  customerName: String (required),
  phoneNumber: String (required),
  prizeAmount: Number (default: 0),
  resultDate: Date (required),
  status: String (enum: ['active', 'won', 'lost']),
  isWinner: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `POST /api/admin/create-default` - Create default admin

### Ticket Routes
- `GET /api/tickets/check` - Check ticket result (public)
- `GET /api/tickets/winners` - Get recent winners (public)
- `POST /api/tickets` - Create ticket (admin only)
- `GET /api/tickets` - Get all tickets (admin only)
- `PUT /api/tickets/:id` - Update ticket (admin only)
- `DELETE /api/tickets/:id` - Delete ticket (admin only)

### Contact Routes
- `POST /api/contact` - Submit contact form

## Real-time Features

### Socket.io Events

#### Client to Server:
- `checkTicket` - When checking a ticket
- `adminActivity` - Admin activities

#### Server to Client:
- `ticketCreated` - New ticket created
- `ticketUpdated` - Ticket updated
- `ticketDeleted` - Ticket deleted
- `ticketCheckActivity` - Someone checking ticket
- `adminUpdate` - Admin update notification

## Default Admin Account

To create the default admin account, send a POST request to:
```
POST http://localhost:5000/api/admin/create-default
```

Default credentials:
- Email: `admin@punjablottery.com`
- Password: `admin123`

**Important**: Change the default password in production!

## Deployment

### Production Environment Variables

Backend:
```env
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

Frontend:
```env
VITE_API_URL=https://your-api-domain.com
```

### Build Commands

Frontend:
```bash
npm run build
```

Backend (production):
```bash
npm start
```

## Security Features

- JWT Authentication for admin routes
- Password hashing with bcryptjs
- Rate limiting to prevent abuse
- CORS configuration
- Helmet for security headers
- Input validation and sanitization
- Environment variable protection

## Performance Features

- Database indexing for fast queries
- Pagination for large datasets
- Real-time updates without page refresh
- Optimized animations with Framer Motion
- Lazy loading and code splitting ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: info@punjablottery.com
- Phone: +91 98765 43210
