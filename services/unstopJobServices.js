import puppeteer from 'puppeteer';

export const fetchUnstopDetails = async (email, password) => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto('https://unstop.com/auth/login?returnUrl=%2Flogin');

    // Wait for the email input field to load
    await page.waitForSelector('input[type="email"]');
    
    // Type the email into the email input field
    await page.type('input[type="email"]', email);

    // Type the password into the password input field
    await page.type('input[type="password"]', password);

    // Wait for the login button to be clickable
    await page.waitForSelector('button[type="submit"]');
    
    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

    // Step 3: Navigate to the applications page
    await page.goto('https://unstop.com/dashboard/applications', { waitUntil: 'networkidle2' });

    // Step 4: Extract application details from the table
    const applications = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.application-row'));
      return rows.map(row => {
        const company = row.querySelector('.company-name')?.innerText.trim();
        const profile = row.querySelector('.profile')?.innerText.trim();
        const appliedOn = row.querySelector('.applied-on')?.innerText.trim();
        const applicants = row.querySelector('.applicant-count')?.innerText.trim();
        const status = row.querySelector('.application-status')?.innerText.trim();
        const reviewLink = row.querySelector('.review-link')?.href;

        return {
          company,
          profile,
          appliedOn,
          applicants,
          status,
          reviewLink,
        };
      });
    });

    console.log('Unstop Applications retrieved:', applications);
    return applications; // Return the extracted applications
  } catch (error) {
    console.error('Error during login or data extraction:', error.message);
    throw error;
  } finally {
    await browser.close(); // Close the browser regardless of success or error
  }
};
