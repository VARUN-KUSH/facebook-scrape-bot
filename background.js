export {}
import XLSX from "xlsx.full.min.js";

console.log("background is up and running")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveData") {
    console.log("Received data:", message.data);
    
    // Store data in an Excel file
    const data = [
      ["Customer Name", "Phone", "Monthly Rent", "Marketplace URL", "Bed/Bath", "Address"],
      ["", "", message.data.monthly_rent, message.data.marketplace_URL, message.data.bed_bath, message.data.address]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marketplace Data");

    // Use 'base64' type instead of 'blob'
    const workbookOutput = XLSX.write(workbook, { 
      bookType: "xlsx", 
      type: "base64"
    });

    // Create data URL from base64 string
    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${workbookOutput}`;
    
    // Download the file
    chrome.downloads.download({
      url: dataUrl,
      filename: "MarketplaceData.xlsx",
      saveAs: true
    });

    // sendResponse({ status: "Data saved successfully" });
    // return true; // Important: keeps the message channel open for async response
  }
});