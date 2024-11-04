import React, { useEffect } from 'react';

const Popup = () => {
  // Function to handle the start button click
  const handleStart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'start'}, (response) => {
        console.log('Response from content script:', response);
      });
    }
  });
  };

  const handleStop = () => {
    
  }


  // Listen for messages from background.js
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'start') {
        console.log('Received "start" message from background.js');
        // Run your function here
        handleFunction();
        sendResponse({ status: 'function executed' });
      }
      return true; // keep the listener active
    });
  }, []);

  // Your function to run when "start" message is received
  const handleFunction = () => {
    console.log('Running the function as "start" message was received.');
    // Add functionality here
  };

  return (
    <div>
     
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Start</button>
    </div>
  );
};

export default Popup;
