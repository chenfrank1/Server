import * as puppeteer from 'puppeteer'
 
export let takeScreenshot =  async (url: string) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const d: Date = new Date();
  const fileName = `screenshot${d}.png`

  await page.goto(url);
  await page.screenshot({path: fileName});
  console.log('file created:' + fileName)
  await browser.close();

}
