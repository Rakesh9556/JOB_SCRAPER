import puppeteer from 'puppeteer';

export const loginToInternshala = async (email, password) => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false if you want to see the browser interaction
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

    // Wait for navigation after login (optional)
    await page.waitForNavigation();

    // Check if login is successful by verifying the page content or user dashboard presence
    const successMessage = await page.evaluate(() => {
      return document.body.innerText.includes('dashboard') ? 'Login successful' : 'Login failed';
    });

    console.log(successMessage);
  } catch (error) {
    console.error('Error during login:', error);
  } finally {
    // Close the browser after completion
    await browser.close();
  }
};
