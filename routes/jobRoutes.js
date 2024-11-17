import express from 'express';
import { getApplications } from '../controllers/jobController.js';

const router = express.Router();

// Route for fetching job applications (from Internshala and Unstop)
router.post('/applications', getApplications);

export default router;
