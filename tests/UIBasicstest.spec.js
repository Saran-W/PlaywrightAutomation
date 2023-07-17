const {test,expect} = require('@playwright/test');



test('Browser context Playwright test', async ({ context }) => {

    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardsTitles = page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    
    // You can use 2 locator types css ,xpath selectors best is use CSS 
    await userName.type("rahulshetty"); // the locator is added as a variable 
    await page.locator("[type='password']").type('learning');
    await signIn.click();
    console.log (await page.locator("[style*='block']").textContent()); // no need to add waits on playwright 
    await expect(page.locator("[style*='block']")).toContainText('Incorrect'); // check that a text is available on a page 

    // entering data into a field i.e edit box you can either typr or fill. This remove the name saran on the username field
    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    // adding a promise race condition . This will ensure all the products are loded and we wont get an empty list here console.log(alltitles);` This is only requireswhen you have allTextContents
    await Promise.all(
      [

        page.waitForNavigation(), //after clicking sign in we are navigation to another page but on the same tab
           signIn.click(),
      ]
    );
  

    // console.log(await cardsTitles.first().textContent('iphone X'));
    // console.log(await cardsTitles.nth(1).textContent()); // to get second ellement use nth (1)

    const alltitles = await cardsTitles.allTextContents();
    console.log(alltitles);

  });

test('page declaration', async ({page})=>
{
await page.goto('https://google.com');
// get the title of the page 
console.log(await page.title());

// Add your test assertions here using 'expect'
await expect(page).toHaveTitle("Google");
    
});

test('UI Controls', async ({page})=>
{
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const documentLink =page.locator("[href*='documents-request']");
  const dropdown =page.locator("select.form-control");
  await dropdown.selectOption("Consultant"); // selesction a dropdown option
  //await page.pause();

  //assertion if a radio button is clicked 
   await page.locator(".radiotextsty").last().click();  // to select the last option use .last
   await page.locator("#okayBtn").click();
   console.log(await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked(); 

    // on a check filled then assert its checked
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked(); 
    //to uncheck a checkbox
    await page.locator("#terms").uncheck(); 
    expect (await page.locator("#terms").isChecked()).toBeFalsy(); // Falsy because the button is already unchecked 

    //Check is a pop up is blinking on a page
    await expect (documentLink).toHaveAttribute("class","blinkingText");
   
});


test('Child window handling', async ({browser})=>
{
  let text;
    // clicking a link that opens in a new page 
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink =page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([ // pass newpage object as an array incase severay pages are opened. if its opening 2 pages the array is [newPage, newPage2]

    context.waitForEvent('page'),
    await documentLink.click(),
  ])

   text = await newPage.locator(".red").textContent(); //tO cpnfim you are on the new page opened 
   //picking a text from the new page apart of a text only 
   const arraytext = text.split("@")
   const domain = arraytext[1].split(" ")[0] // this means first get the right side of array from @ the //get the text after a space on the right side 
    console.log(domain);
   await  page.locator("#username").type(domain);
  //  await page.pause();
    console.log (await page.locator("#username").textContent());

    await newPage.close(); // Close the new page
  await page.close(); // Close the original page

});