const {test,expect} = require('@playwright/test');

// Quiz automate this page https://rahulshettyacademy.com/client

// test('Client registration test', async ({page}) => {
//     await page.goto('https://rahulshettyacademy.com/client');
//     console.log(await page.title());
//     await page.locator('.text-reset').click();
//     await page.locator('#firstName').type(Saran);
//     await page.locator('#lastName').type(Saran);
//     await page.locator('#userEmail').type(Saran);
//     await page.locator('#userMobile').type(Saran);
//     await page.locator('#userMobile').type(Saran);
//     await page.click('[formcontrolname="occupation"]');
//     await page.selectOption('[formcontrolname="occupation"]', { value: '1: Doctor' });
//     const alloptions = await page.selectOption('[formcontrolname="occupation"]', { value: '1: Doctor' });
//     console.log (alloptions);
//     // await page.click('[formcontrolname="occupation"]');
//     // await page.selectOption('[formcontrolname="occupation"]', { label: 'Doctor' }); 
//     await page.click('[value="Female"]');
//     await page.locator('#userPassword').type('Test@123456');
//     await page.locator('#confirmPassword').type('Test@123456');
//     await page.click('[type="checkbox"]');
//     await page.locator('#login').click();

// });

test('Client login test', async ({page}) => {
    const email = "shirusaran+test@gmail.com";
    const productName = 'zara coat 3';
    const emailLabel = page.locator('.user__name label');
    const product = page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Test@123456");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); //when all the call are made and everything open on a page 
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);

     //select product Zara coat 4
    // const count = product.count(); // this count how many product we have on the array 
    // for(let i = 0; i < count; ++i)
    // {
    //  if   (await product.nth(0).locator("b").textContent() === productName) 
    //  {
    //      // add product to Cart
    //     await product.nth(i).locator("text= Add To Cart").click(); // you can ad locator base on the text
    //     break;
    //  }

    // }  
    //  await page.locator("[routerlink='/dashboard/cart']").click();
    //  await page.locator("div li").first().waitFor({ state: 'visible' }); // this waits for item to show on the page at least the first one
    await page.locator('.card-body b').first().waitFor({ state: 'visible' });

  // Select and add the product to the cart
  await page.click(`.card-body b:has-text("${productName}")`);
  await page.click('button:text("Add To Cart")');

//   // Go to the cart page and check if the product is added
    await page.locator("[routerlink='/dashboard/cart']").click(); 
    await page.locator("div li").first().waitFor({ state: 'visible' });
     const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // adding locator based on text checking visibility
     expect(bool).toBeTruthy(); //assert it returns true
     await page.locator("text=Checkout").click();
     await page.locator('[placeholder="Select Country"]').type("Ind",{delay:100}); //This slows down typing a letter at a time instead of pastin
    const countryDropdown =  page.locator(".ta-results");
    await countryDropdown.waitFor();
    let optionsCount;
   optionsCount = await countryDropdown.locator("button").count();
   let text;
   for(let i =0;i< optionsCount; ++i) 
   {
    text = await countryDropdown.locator("button").nth(i).textContent();
    if (text === "Indonesia")// The text has to be the exact same here or else use trim
    {
      await countryDropdown.locator("button").nth(i).click();
      break;
    }
   }
   const emailText = await emailLabel.textContent();
   await expect(emailText).toBe(email);
   await page.locator(".action__submit").click();
   const orderlable = page.locator(".hero-primary");
   const message = await orderlable.textContent();
   await expect(message).toBe(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.locator("button[routerlink*='myorder']").click();
   await page.locator("tbody").waitFor(); //the wait ensures the page is open after the click
   const row = await page.locator("tbody tr");

  for (let i=0; i<await row.count(); ++i)
  {
    const rowOrderId = await row.nth(i).locator("th");
    if(orderId.includes(rowOrderId))
  {
      await row.nth(i).locator("button"),first().click();
      break;
  }
  }
  //assert the order Id matcher on the view page 
  const orderIdDetails = await page.locator(".col-text").textContent()
  expect (orderId.includes(orderIdDetails)).toBeTruthy();
});