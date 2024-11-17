import puppeteer from 'puppeteer';

export const fetchApplicationDetails = async (email, password) => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto('https://internshala.com/login/user');

    // Wait for the email input field to load
    await page.waitForSelector('input#email');
    
    // Type the email into the email input field
    await page.type('input#email', email);

    // Type the password into the password input field
    await page.type('input#password', password);

    // Wait for the login button to be clickable
    await page.waitForSelector('button#login_submit');
    
    // Click the login button
    await page.click('button#login_submit');

    // Wait for navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

    // Step 3: Navigate to the applications page
    await page.goto('https://internshala.com/student/applications', { waitUntil: 'networkidle2' });

    // Step 4: Extract application details from the table
    const applications = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#applications_tbody > tr'));
      return rows.map(row => {
        const company = row.querySelector('.company_name')?.innerText.trim();
        const profile = row.querySelector('.profile .flex-row > div')?.innerText.trim();
        const appliedOn = row.querySelector('.applied_on')?.innerText.trim();
        const applicants = row.querySelector('.applicants_count span')?.innerText.trim();
        const status = row.querySelector('.app_status .status')?.innerText.trim();
        const reviewLink = row.querySelector('.review_application a')?.href;

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

    console.log('Applications retrieved:', applications);
    return applications; // Return the extracted applications
  } catch (error) {
    console.error('Error during login or data extraction:', error.message);
    throw error;
  } finally {
    await browser.close(); // Close the browser regardless of success or error
  }
};
