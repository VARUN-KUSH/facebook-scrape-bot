// export {}
// console.log("content script is up and running")

// // Run the function once the page has completely loaded
// // run on only seller page
// // this gets all the listings urls
// //when extension on to scrape then scrape data using these urls either use iframes or manually open page and do the scraping then save it into a filesheet
// // Set an interval to check for the div with role="main"

// // Function to simulate a human-like mouse click

// function scrapeandgetdesireddata() {
    
// }

// function waitForPageLoadAndCheckDiv() {
//   // Run only on the seller page
//   if (
//     window.location.href.includes(
//       "https://www.facebook.com/marketplace/you/selling"
//     )
//   ) {
//     const interval = setInterval(() => {
//       const xpathofmorebutton =
//         "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[3]/div/div/span/div/div/div/div/div/div/div[2]/div/div[2]/div/div[3]/div/div"

//       // Use `document.evaluate` to find the share button element
//       const shareButton = document.evaluate(
//         xpathofmorebutton,
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue

//       console.log("shareButton>>>>>>>>", shareButton)
//       if (shareButton) {
//         clearInterval(interval) // Stop checking once the share button is found
//         const event = new MouseEvent("click", {
//           bubbles: true,
//           cancelable: true,
//           view: window
//         })
//         console.log("Copy Link button found and clicked")
//         shareButton.dispatchEvent(event) //
        
//         console.log("Share button clicked")

//         // Wait for the popup to load and find the "Copy Link" button
//         const popupInterval = setInterval(() => {
//           const xpathofclickbutton =
//             "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[2]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[1]/div/a"

//           const copyLinkButton = document.evaluate(
//             xpathofclickbutton,
//             document,
//             null,
//             XPathResult.FIRST_ORDERED_NODE_TYPE,
//             null
//           ).singleNodeValue

//           if (copyLinkButton) {
//             console.log("copylink>>>>>>>>>>>", copyLinkButton)
//             clearInterval(popupInterval) // Stop checking once the copy button is found
//             // Simulate human-like click on the "Copy Link" button
//             // Using dispatchEvent()
//             setTimeout(() => {
//               const event = new MouseEvent("click", {
//                 bubbles: true,
//                 cancelable: true,
//                 view: window
//               })
//               console.log("Copy Link button found and clicked")
//               copyLinkButton.dispatchEvent(event) // More likely to trigger all event listeners
//               // Retrieve the copied URL from the clipboard
//             }, 2000)
//           } else {
//             console.log("Copy Link button not found")
//           }
//         }, 200) // Check every 500ms for the popup
//       } else {
//         console.log("Share button not found")
//       }
//     }, 100) // Check every 500ms for the main page button
//   }
// }

// window.addEventListener("load", waitForPageLoadAndCheckDiv)
