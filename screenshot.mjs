import puppeteer from 'puppeteer';

const SCREENSHOTS_DIR = '/Users/macbookpro/.gemini/antigravity/brain/e0101bf5-3374-49ca-afa9-f2b7beefdf53/scratch';

// Traits: skin,face,hair,hairColor,headwear,fabric,brow,eye,eyeColor,nose,mouth,beard,glasses,earrings,necklace,marks,bg
// Encode each as base-36 digit
function encodeTraits(traits) {
  const keys = ['skin','face','hair','hairColor','headwear','fabric','brow','eye','eyeColor','nose','mouth','beard','glasses','earrings','necklace','marks','bg'];
  return '2' + keys.map(k => Math.floor(traits[k] || 0).toString(36)).join('');
}

const headwearConfigs = [
  { name: 'gele', headwear: 1, fabric: 0, skin: 8, face: 0, hair: 0, hairColor: 1, brow: 0, eye: 0, eyeColor: 0, nose: 0, mouth: 1, beard: 0, glasses: 0, earrings: 0, necklace: 0, marks: 0, bg: 1 },
  { name: 'filah', headwear: 2, fabric: 0, skin: 8, face: 0, hair: 0, hairColor: 1, brow: 0, eye: 0, eyeColor: 0, nose: 0, mouth: 1, beard: 0, glasses: 0, earrings: 0, necklace: 0, marks: 0, bg: 1 },
  { name: 'okpu_agu', headwear: 3, fabric: 0, skin: 8, face: 0, hair: 0, hairColor: 1, brow: 0, eye: 0, eyeColor: 0, nose: 0, mouth: 1, beard: 0, glasses: 0, earrings: 0, necklace: 0, marks: 0, bg: 1 },
  { name: 'kufi', headwear: 4, fabric: 0, skin: 8, face: 0, hair: 0, hairColor: 1, brow: 0, eye: 0, eyeColor: 0, nose: 0, mouth: 1, beard: 0, glasses: 0, earrings: 0, necklace: 0, marks: 0, bg: 1 },
];

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox']
  });

  for (const config of headwearConfigs) {
    const code = encodeTraits(config);
    const url = `http://localhost:5180/?face=${code}`;
    console.log(`Screenshotting ${config.name}: ${url}`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for SVG to render
    await page.waitForSelector('#portrait-svg');
    
    // Screenshot just the portrait area
    const element = await page.$('.portrait-frame');
    if (element) {
      await element.screenshot({ 
        path: `${SCREENSHOTS_DIR}/${config.name}.png`,
        type: 'png'
      });
    } else {
      await page.screenshot({ 
        path: `${SCREENSHOTS_DIR}/${config.name}.png`,
        type: 'png'
      });
    }
    
    await page.close();
  }

  await browser.close();
  console.log('Done! Screenshots saved.');
}

main().catch(console.error);
