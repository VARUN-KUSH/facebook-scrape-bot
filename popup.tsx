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


  
  return (
    <div>
     
      <button onClick={handleStart}>Start</button>
      
    </div>
  );
};

export default Popup;
