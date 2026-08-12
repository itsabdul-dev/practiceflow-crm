const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/scheduling', { waitUntil: 'networkidle2' });
  
  // Click 'New Appointment'
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('New Appointment'));
    if (btn) btn.click();
  });
  
  await page.waitForTimeout(1000);
  
  const options = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('select')).map(s => s.innerHTML);
  });
  
  console.log(options);
  await browser.close();
})();
