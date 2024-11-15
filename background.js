export {}

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveData") {
    console.log("Received data:", message.data);
    
    chrome.storage.local.get(["SheetId"], async (result) => {
      const spreadsheetId = result.SheetId;
      if (!spreadsheetId) {
        console.error("Spreadsheet ID not found. Please enter a valid Google Sheet URL.");
        sendResponse({ status: "error", message: "Spreadsheet ID not found" });
        return;
      }
      
      try {
        // Replace with your Next.js server URL
        const response = await fetch('https://sheets-adder.vercel.app/api/update-sheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: message.data,
            sheetId: spreadsheetId
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server response:', result);
        sendResponse({ status: "success", message: "Data sent to Google Sheets successfully" });
      } catch (error) {
        console.error('Error sending data to server:', error);
        sendResponse({ status: "error", message: error.message });
      }
    });

    return true; // Keeps the message channel open for async response
  }
});
