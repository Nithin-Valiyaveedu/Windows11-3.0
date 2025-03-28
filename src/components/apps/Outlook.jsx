import React, { useState } from "react";
import Draggable from "react-draggable";

function Outlook({ isAppOpen, toggleOutlook, bounds }) {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([
    { 
      id: 1, 
      from: 'support@example.com', 
      subject: 'Welcome to Outlook', 
      date: '2023-07-20', 
      read: false,
      content: `Dear User,

Welcome to our Outlook clone! We're excited to have you on board.

This is a demonstration of our email viewing capabilities. You can:
- View email content
- Switch between folders
- See read/unread status

Best regards,
The Development Team`
    },
    { 
      id: 2, 
      from: 'team@company.com', 
      subject: 'Project Update', 
      date: '2023-07-19', 
      read: true,
      content: `Hello Team,

Here's the latest project update:
1. Completed UI enhancements
2. Added email viewing functionality
3. Improved folder navigation

Let's keep up the good work!
Project Manager`
    }
  ]);

  return (
    <div className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={bounds}>
        <div className="window bg-white h-[45rem] w-[90rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto">
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
                    onClick={() => {
                      setSelectedFolder(folder.toLowerCase());
                      setSelectedEmail(null);
                    }}
                  >
                    {folder}
                  </div>
                ))}
              </nav>
            </div>
            <div className="w-96 border-r border-gray-200 flex flex-col">
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold capitalize">{selectedFolder}</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {emails.map(email => (
                  <div
                    key={email.id}
                    className={`flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer ${
                      selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedEmail(email);
                      setEmails(prev => prev.map(e => 
                        e.id === email.id ? {...e, read: true} : e
                      ));
                    }}
                  >
                    <div className="w-6 mr-3">
                      {!email.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{email.from}</div>
                      <div className="text-sm text-gray-600 truncate">{email.subject}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {email.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              {selectedEmail ? (
                <>
                  <div className="border-b p-4">
                    <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                    <div className="text-sm text-gray-600 mt-1">
                      From: <span className="font-medium">{selectedEmail.from}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Date: {selectedEmail.date}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 whitespace-pre-wrap">
                    {selectedEmail.content}
                  </div>
                  <div className="border-t p-3 bg-gray-50">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                      Reply
                    </button>
                    <button className="ml-2 bg-gray-200 px-4 py-2 rounded">
                      Forward
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select an email to view its content
                </div>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Outlook; 