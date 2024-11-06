// export {}
// console.log("content script is up and running")

// // Run the function once the page has completely loaded
// // run on only seller page
// // this gets all the listings urls
// //when extension on to scrape then scrape data using these urls either use iframes or manually open page and do the scraping then save it into a filesheet
// // Set an interval to check for the div with role="main"

// // Function to simulate a human-like mouse click
async function delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrapeAndGetDesiredData() {
  if (
    !window.location.href.includes("https://www.facebook.com/marketplace/item")
  ) {
    return
  }
  console.log("scraping data points running")
  const xpath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[1]/div[2]/div/div[2]/div/div[1]/div[1]"
  // Find the element using XPath
  while (true) {
    // Find the element using XPath
    const element = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue

    // Check if the element was found
    console.log("element>>>>>>", element)
    if (element) {
      // Use querySelectorAll to find all inner divs and get their text content
      const divElements = element.querySelector(":scope > div:nth-child(1)")
      console.log("divElements>>>>>>>>>", divElements)
      const divforunitdetails = element.querySelector(
        ":scope > div:nth-child(6)"
      )
      console.log("divforunitdetails>>>>>>>>>>>", divforunitdetails)
      const secdiv = element.querySelector(":scope > div:nth-child(2)")
      console.log("secdiv>>>>>", secdiv)

       // Break out of the loop if all elements are found
       if (divElements && divforunitdetails && secdiv) {
        //data need to send to background to get stored in excel file
        // num of coloumns col1-Customer name, col2-Phone, col3-Monthly-rent, col4-marketplace url, col5-Bed/Bath col6-Address
        const monthly_rent = divElements.querySelector(":scope > div:nth-child(2)")?.innerText
        console.log("Monthly Rent:", monthly_rent);
        const marketplace_URL =  window.location.href;
        console.log("Marketplace URL:", marketplace_URL);

        const bed_bath = divforunitdetails.querySelector(":scope > div:nth-child(3)")?.innerText
        console.log("Bed & Bath Info:", bed_bath);
        const address = secdiv.querySelector("div[role='listitem']:nth-child(1)")?.innerText
        console.log("Address:", address);
        // const other details = 
        console.log("All elements found, exiting loop.");

        //check if anydata found 
        chrome.runtime.sendMessage({
            action: "saveData",
            data: {
              monthly_rent,
              marketplace_URL,
              bed_bath,
              address
            }
        //   }, (response) => {
        //     console.log("Response from background:", response);
            
          });
        window.close()
        break;
      }
    } else {
      console.log("Element not found, retrying...")
    }

    // Wait for 500 ms before the next iteration to avoid CPU overload
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

async function waitForPageLoadAndCheckDiv() {
  // Run only on the seller page
  if (
    !window.location.href.includes(
      "https://www.facebook.com/marketplace/you/selling"
    )
  ) {
    return
  }

  const xpathoflistings =
    "/html/body/div[1]/div/div[1]/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[3]/div/div/span/div/div"

  const listingsElement = document.evaluate(
    xpathoflistings,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue

  if (listingsElement) {
    console.log("listingsElement>>>>>>>>>>", listingsElement)

    const innerDivs = Array.from(listingsElement.children).filter(
      (child) => child.tagName === "DIV"
    )
    console.log("innerDiv>>>>>>>", innerDivs)

    for (const div of innerDivs) {
      // Wait until the share button and more options button are found
      await new Promise(async (resolve) => {
        while (true) {
          console.log("div>>>>>>>>>", div)

          const share = div.querySelector(
            ":scope > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div"
          )
          console.log("share>>>>>", share)

          if (share) {
            const moreoptionButton = share.querySelector(
              'div[role="button"][aria-label*="More options"]'
            )
            console.log("moreoptionButton>>>>>>>>", moreoptionButton)

            if (moreoptionButton) {
              const event = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              })
              moreoptionButton.dispatchEvent(event)

              // Wait for the popup to load and find the "Copy Link" button
              await waitForViewListingButton(moreoptionButton)
              resolve()
              break
            }
          } else {
            console.log("Share button not found")
          }

          // Wait for 500 ms before the next iteration
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      })
    }
  }
}

// Helper function to wait for the view listing button
async function waitForViewListingButton(moreoptionButton) {
  while (true) {
    const viewListingButton = document.querySelector(
      'div[role="menu"] > div > div > div > div > div:nth-child(1) > div > a[href*="marketplace/item"]'
    )
    console.log("viewListingButton", viewListingButton)

    if (viewListingButton) {
      const hrefincom = viewListingButton.getAttribute("href")
      const href = `https://www.facebook.com${hrefincom}`

      console.log(href) // Logs the href value to the console
      window.open(href, "_blank")
      moreoptionButton.click()
      await new Promise((resolve) => setTimeout(resolve, 400))
      // Breaking the loop once the button is found
      break
    } else {
      console.log("Copy Link button not found")
    }

    // Wait for 200 ms before the next iteration
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    console.log('Received "start" message from popup')
    waitForPageLoadAndCheckDiv()
    sendResponse({ status: "Start function executed" })
  }
  return true // Keep the listener active if async response is needed
})

window.addEventListener("load", scrapeAndGetDesiredData)
