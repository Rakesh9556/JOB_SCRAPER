import { fetchApplicationDetails } from '../services/internshalaJobServices.js';
import { fetchUnstopDetails } from '../services/unstopJobServices.js';

export const getApplications = async (req, res) => {
  const { email, password, platform } = req.body;

  try {
    let internshalaApplications = [];
    let unstopApplications = [];

    // Check the platform provided and fetch applications sequentially
    if (platform === 'internshala' || platform === 'both') {
      // Fetch Internshala applications
      internshalaApplications = await fetchApplicationDetails(email, password);
    }

    if (platform === 'unstop' || platform === 'both') {
      // Fetch Unstop applications if required
      unstopApplications = await fetchUnstopDetails(email, password);
    }

    // Combine both application arrays into one
    const allApplications = {
      internshala: internshalaApplications,
      unstop: unstopApplications,
    };

    res.status(200).json({ applications: allApplications });
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ error: 'Failed to fetch applications. Please try again.' });
  }
};
