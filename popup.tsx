import React, { useEffect, useState } from "react"

const Popup = () => {
  // Function to handle the start button click
  const [SheetInfopresent, setSheetInfopresent] = useState(false)
  const [SheetInfo, setSheetInfo] = useState("")
  
  const handleStart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, (response) => {
          console.log("Response from content script:", response)
        })
      }
    })
  }

  const handleSheetInfo = (e) => {
    setSheetInfo(e.target.value)
  }

  const saveSheetInfo = () => {
    // Trim and validate the SheetInfo string
    const trimmedSheetInfo = SheetInfo.trim()

    // Check if the trimmed SheetInfo is empty
    if (trimmedSheetInfo === "") {
      console.log("Empty input detected. Skipping save.")
      return
    }
   
    // Check if the input is a valid Google Sheets URL and extract the ID
  const match = trimmedSheetInfo.match(/\/d\/([a-zA-Z0-9-_]+)\//);
  if (match && match[1]) {
    const sheetId = match[1]; // Extracted Sheet ID
    chrome.storage.local.set({ SheetId: sheetId }, function () {
      alert("Sheet ID saved successfully!");
      setSheetInfopresent(true);
    });
  } else {
    alert("Please enter a valid Google Sheets URL.");
  }
  }

  useEffect(() => {
    chrome.storage.local.get(["SheetId"], function (result) {
      const sheetId = result.SheetId || "";
      setSheetInfo(sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit` : "");
      setSheetInfopresent(!!sheetId);
    })
  }, [])

  const deleteSheetInfo = () => {
    chrome.storage.local.remove("SheetId", () => {
      console.log("Sheet info removed.")
      setSheetInfo("")
      setSheetInfopresent(false)
    })
  }
  
  return (
    <div
  style={{
    minWidth: "300px",
    minHeight: "200px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  }}
>
  <textarea
    id="SheetInfo"
    name="SheetInfo"
    value={SheetInfo}
    placeholder="Enter sheet info here..."
    onChange={handleSheetInfo}
    disabled={SheetInfopresent}
    style={{
      width: "100%",
      height: "80px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "10px",
      boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.1)",
      resize: "none",
      fontSize: "14px",
    }}
  ></textarea>
  {SheetInfopresent ? (
    <button
      onClick={deleteSheetInfo}
      style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 16px",
        cursor: "pointer",
        borderRadius: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px 5px 0 0",
        fontSize: "14px",
      }}
    >
      Delete
    </button>
  ) : (
    <button
      onClick={saveSheetInfo}
      style={{
        backgroundColor: "blue",
        color: "white",
        border: "none",
        padding: "10px 16px",
        cursor: "pointer",
        borderRadius: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px 5px 0 0",
        fontSize: "14px",
      }}
    >
      Save
    </button>
  )}
  <button
    onClick={handleStart}
    style={{
      backgroundColor: "green",
      color: "white",
      border: "none",
      padding: "10px 16px",
      cursor: "pointer",
      borderRadius: "20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      margin: "10px 0 0",
      fontSize: "14px",
    }}
  >
    Start
  </button>
</div>
  )
}

export default Popup
