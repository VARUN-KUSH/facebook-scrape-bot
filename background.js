export {}
console.log("backgroundjs is up and running")

// In background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'focusTab') {
      // Focus the tab that sent the request, using sender.tab.id
      if (sender.tab && sender.tab.id) {
        chrome.tabs.update(sender.tab.id, { active: true }, () => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            sendResponse({ success: true });
          }
        });
      } else {
        sendResponse({ success: false, error: 'Tab ID not found.' });
      }
      return true; // Keeps the message channel open for async response
    }
  });
  