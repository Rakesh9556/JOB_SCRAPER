async function fetchDetails() {
    try {
      const email = 'your-email@example.com';
      const password = 'your-password';
  
      const internshalaDetails = await fetchApplicationDetails(email, password);
      const unstopDetails = await fetchUnstopDetails(email, password);
  
      return { internshalaDetails, unstopDetails };
    } catch (error) {
      throw new Error('Error fetching details: ' + error.message);
    }
  }
  
  module.exports = fetchDetails;
  