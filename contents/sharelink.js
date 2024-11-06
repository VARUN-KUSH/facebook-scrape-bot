export {}
console.log("content script is up and running")

// Run the function once the page has completely loaded
// run on only seller page
// this gets all the listings urls
//when extension on to scrape then scrape data using these urls either use iframes or manually open page and do the scraping then save it into a filesheet
// Set an interval to check for the div with role="main"

// Function to simulate a human-like mouse click

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// // In content_script.js
// async function readClipboardWithFocus() {
//     // Request the background script to focus the tab
//     chrome.runtime.sendMessage({ action: 'focusTab' }, async (response) => {
//       if (response.success) {
//         try {
//           await delay(200);
//           const copiedText = await navigator.clipboard.readText();
//           console.log('Clipboard content:', copiedText);
//         } catch (error) {
//           console.error('Failed to read clipboard:', error.message);
//         }
//       } else {
//         console.error('Failed to focus tab:', response.error);
//       }
//     });
//   }

// function scrapeAndGetDesiredData(iframe) {
//   const iframeDocument = iframe.contentDocument || iframe.contentWindow.document

//   // Scrape the required data from the iframe content here
//   const data = iframeDocument.querySelector("YOUR_TARGET_SELECTOR")
//   console.log("Scraped Data:", data ? data.textContent : "No data found")

//   // Further processing with the scraped data if needed
// }


// async function sendMessageToBackground(message) {
//   return new Promise((resolve, reject) => {
//     chrome.runtime.sendMessage(message, (response) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// }

// function waitForPageLoadAndCheckDiv() {
//   // Run only on the seller page
//   // Run only on the seller page
//   if (
//     !window.location.href.includes(
//       "https://www.facebook.com/marketplace/you/selling"
//     )
//   ) {
//     return
//   }

//   const xpathoflistings =
//     "/html/body/div[1]/div/div[1]/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[3]/div/div/span/div/div"

//   const listingsElement = document.evaluate(
//     xpathoflistings,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   ).singleNodeValue

//   if (listingsElement) {
//     console.log("listingsElement>>>>>>>>>>", listingsElement)
//     const innerDivs = Array.from(listingsElement.children).filter(
//       (child) => child.tagName === "DIV"
//     )
//     console.log("innerDiv>>>>>>>", innerDivs)
//     // console.log("Number of direct div children:", totalNum)
//     // innerDivs.forEach((div, index) => {
//       const interval = setInterval(() => {
//         const xpathofmorebutton =
//           "//*[@id]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[3]/div/div/span/div/div/div[1]/div/div/div/div[2]/div/div[2]/div/div[3]/span/div/div/span/div"

//         // Use `document.evaluate` to find the share button element
//         const shareButton = document.evaluate(
//           xpathofmorebutton,
//           document,
//           null,
//           XPathResult.FIRST_ORDERED_NODE_TYPE,
//           null
//         ).singleNodeValue

//         console.log("shareButton>>>>>>>>", shareButton)
//         if (shareButton) {
//           clearInterval(interval) // Stop checking once the share button is found
//           const event = new MouseEvent("click", {
//             bubbles: true,
//             cancelable: true,
//             view: window
//           })
//           console.log("Copy Link button found and clicked")
//           shareButton.dispatchEvent(event) //

//           console.log("Share button clicked")

//           // Wait for the popup to load and find the "Copy Link" button
//           const popupInterval = setInterval(() => {
//             const xpathofclickbutton =
//               "/html/body/div[1]/div/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[5]/div/div/div/div/div/div[2]/div/div/div[3]/div"

//             const copyLinkButton = document.evaluate(
//               xpathofclickbutton,
//               document,
//               null,
//               XPathResult.FIRST_ORDERED_NODE_TYPE,
//               null
//             ).singleNodeValue

//             if (copyLinkButton) {
//               ;(async () => {
//                 console.log("copylink>>>>>>>>>>>", copyLinkButton)
//                 clearInterval(popupInterval) // Stop checking once the copy button is found
//                 // Simulate human-like click on the "Copy Link" button

//                 setTimeout(async () => {
                  
//                   const event = new MouseEvent("click", {
//                     bubbles: true,
//                     cancelable: true,
//                     view: window
//                   })

//                   copyLinkButton.dispatchEvent(event) // More likely to trigger all event listeners
//                   console.log("Copy Link button found and clicked")
//                   // Retrieve the copied URL from the clipboard

//                   // Retrieve the copied URL after a short delay to ensure it's copied
//                   // Focus on the window to ensure it can access the clipboard
//                    // Wait 3 seconds to let any popup disappear
  
//                   ;(async () => {
//                     try {
//                       // const response = await sendMessageToBackground({ action: "REQUEST_DATA" });
//                       const copiedLink =
//                         await window.navigator.clipboard.readText()
//                       console.log("Copied Link:", copiedLink)

//                       // Create and configure the iframe
//                       // const iframe = document.createElement("iframe")
//                       // iframe.src = copiedLink
//                       // iframe.style.display = "none" // Hide the iframe if you don't need to show it
//                       // document.body.appendChild(iframe)

//                       // // Wait for the iframe to load completely before scraping
//                       // iframe.onload = () => {
//                       //   console.log("Iframe loaded, starting data scraping")
//                       //   scrapeAndGetDesiredData(iframe)
//                       // }
//                     } catch (error) {
//                       console.error("Failed to retrieve copied link:", error)
//                     }
//                   })()
//                   //   , 800) // Adjust delay as needed
//                 }, 200)
//               })()
//             } else {
//               console.log("Copy Link button not found")
//             }
//           }, 200) // Check every 500ms for the popup
//         } else {
//           console.log("Share button not found")
//         }
//       }, 100)
//     // }) // Check every 500ms for the main page button
//   }
// }

// // window.addEventListener("load", waitForPageLoadAndCheckDiv)

// // Listener for messages from the popup or content scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "start") {
//     console.log('Received "start" message from popup')
//     waitForPageLoadAndCheckDiv()
//     sendResponse({ status: "Start function executed" })
//   }
//   return true // Keep the listener active if async response is needed
// })
