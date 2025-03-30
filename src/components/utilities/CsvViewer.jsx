import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CsvViewer({ fileUrl }) {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

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
              setError('File is empty or improperly formatted');
            } else {
              setHeaders(Object.keys(results.data[0] || {}));
              setCsvData(results.data);
            }
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [fileUrl]);

  const handleActivate = () => {
    const confirmed = window.confirm(
      "SECURITY WARNING\n\n" +
      "This file contains active content that could harm your computer.\n" +
      "Are you sure you want to activate this content?"
    );
    
    if (confirmed) {
      alert("SIMULATED ATTACK\n\n" +
        "Malicious content has been activated!\n\n" +
        "This demonstrates how activating untrusted files can:\n" +
        "• Install malware\n" +
        "• Steal sensitive data\n" +
        "• Compromise your system");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full bg-white">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading spreadsheet...</p>
      </div>
    </div>
  );

  if (error) return (
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

  return (
    <div className="w-full h-full flex flex-col bg-white border border-gray-300">
      {/* Toolbar with Activate button */}
      <div className="bg-[#f3f3f3] border-b border-gray-300 p-2 flex justify-between items-center">
        <button
          onClick={handleActivate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md flex items-center text-sm font-medium"
        >
          <span className="material-symbols-outlined mr-1 text-base">bolt</span>
          Activate
        </button>
        <div className="text-sm text-gray-600 font-medium">
          {fileUrl.split('/').pop()}
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto relative">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              {/* Empty top-left cell */}
              <th className="sticky top-0 left-0 z-20 bg-[#f3f3f3] border border-gray-300 w-8 h-8"></th>
              {/* Column headers (A, B, C...) */}
              {columnLetters.map((letter, index) => (
                <th 
                  key={index}
                  className="sticky top-0 z-10 bg-[#f3f3f3] border border-gray-300 text-xs font-mono text-gray-700 w-24 h-8"
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
                <td className="sticky left-0 z-10 bg-[#f3f3f3] border border-gray-300 text-xs font-mono text-gray-700 w-8 h-8 text-center">
                  {rowIndex + 1}
                </td>
                {/* Data cells */}
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 p-1 text-xs ${
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? 'bg-blue-100 border-blue-400'
                        : 'bg-white'
                    }`}
                    onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
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
      <div className="bg-[#f3f3f3] border-t border-gray-300 px-3 py-1 text-xs text-gray-600 flex justify-between">
        <div>Ready</div>
        <div className="flex space-x-4">
          <span>Records: {csvData.length}</span>
          <span>CSV</span>
        </div>
      </div>

      {/* Security Warning */}
      <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-2">warning</span>
          <span className="text-sm">PROTECTED VIEW - File from untrusted source</span>
        </div>
        <button
          onClick={handleActivate}
          className="bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-100 text-sm font-medium"
        >
          Enable Content
        </button>
      </div>
    </div>
  );
}

export default CsvViewer;