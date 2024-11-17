// import { loginToInternshala } from '../services/internshalaAuthService.js';

// export const loginToInternshalaAccount = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Invoke loginToInternshala to verify credentials
//     const sessionPage = await loginToInternshala(email, password);
    
//     // Return success response
//     res.status(200).json({ message: 'Login successful', session: 'Session maintained' });
    
//     // Close the browser since this controller might not need the session afterward
//     const browser = sessionPage.browser();
//     await browser.close();
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed: ' + error.message });
//   }
// };
