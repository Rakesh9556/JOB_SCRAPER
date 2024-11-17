import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes.js'; // Import the jobRoutes file
// import authRoutes from './routes/authRoutes.js'; // Uncomment if you have auth routes
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // To handle CORS

// Routes
app.use('/api/jobs', jobRoutes); // Job-related routes
// app.use('/api/auth', authRoutes); // Auth-related routes (uncomment if you have auth)

app.use(errorHandler); // Error handling middleware

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
