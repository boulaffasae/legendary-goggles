import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Next App/);
});

test('should fetch blog data', async ({ page }) => {
  // Step 1: Fetch data from the API
  const response = await page.request.get('https://api.vercel.app/blog');
  expect(response.ok()).toBeTruthy();
  
  const blogData = await response.json();
  const apiBlogCount = blogData.length;

  // Step 2: Navigate to the webpage
  await page.goto('/');

  // Step 3: Count the number of <li> elements on the webpage
  const liCount = await page.locator('li').count();

  // Step 4: Compare the number of blog items and <li> elements
  expect(apiBlogCount).toEqual(liCount);

  // Step 5: Check that each blog title from the API exists in an <li> on the page
  for (let i = 0; i < blogData.length; i++) {
    const title = blogData[i].title;
    // Check if the title is present in any of the <li> elements
    const titleExists = await page.locator(`li:has-text("${title}")`).count();
    expect(titleExists).toBeGreaterThan(0); // Ensure the title exists in at least one <li>
  }
});
