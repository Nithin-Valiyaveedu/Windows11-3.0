import React, { useState } from "react";
import Draggable from "react-draggable";

function Outlook({ isAppOpen, toggleOutlook, bounds }) {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [emails, setEmails] = useState([
    { 
      id: 1, 
      from: 'support@example.com', 
      subject: 'Welcome to Outlook', 
      date: '2023-07-20', 
      read: false,
      attachments: [
        { name: 'Welcome Guide.pdf', size: '2.3MB', icon: '📄' },
        { name: 'Setup Instructions.docx', size: '1.1MB', icon: '📄' }
      ]
    },
    { 
      id: 2, 
      from: 'team@company.com', 
      subject: 'Project Update', 
      date: '2023-07-19', 
      read: true,
      attachments: [
        { name: 'Q3 Report.xlsx', size: '3.4MB', icon: '📊' }
      ]
    }
  ]);

  const renderAttachments = (attachments) => (
    <div className="mt-2">
      <div className="text-sm text-gray-500 mb-1">Attachments:</div>
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 cursor-pointer"
            onClick={() => alert(`Downloading ${attachment.name}...`)}
          >
            <span className="mr-2">{attachment.icon}</span>
            <div>
              <div className="text-sm font-medium">{attachment.name}</div>
              <div className="text-xs text-gray-500">{attachment.size}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={bounds}>
        <div className="window bg-white h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto">
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none">
            <div className="m-1 ml-4 font-normal">Outlook</div>
            <div className="flex">
              <button
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-xl"
                onClick={toggleOutlook}
              >
                minimize
              </button>
              <button
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-sm"
              >
                check_box_outline_blank
              </button>
              <button
                className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                onClick={toggleOutlook}
              >
                close
              </button>
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-64 bg-gray-100 border-r border-gray-300 p-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
                New Message
              </button>
              <nav className="space-y-1">
                {['Inbox', 'Sent Items', 'Drafts'].map(folder => (
                  <div
                    key={folder}
                    className={`p-2 rounded cursor-pointer ${
                      selectedFolder.toLowerCase() === folder.toLowerCase()
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedFolder(folder.toLowerCase())}
                  >
                    {folder}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold capitalize">{selectedFolder}</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {emails.map(email => (
                  <div
                    key={email.id}
                    className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                  >
                    <div className="w-6 mr-3">
                      {!email.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{email.from}</div>
                      <div className="text-sm text-gray-600 truncate">{email.subject}</div>
                      {email.attachments && email.attachments.length > 0 && renderAttachments(email.attachments)}
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {email.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Outlook; 