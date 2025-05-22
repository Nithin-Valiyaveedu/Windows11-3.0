import React, { useState } from "react";
import Draggable from "react-draggable";
import CsvViewer from '../utilities/CsvViewer';
import { Dialog } from '@headlessui/react';

function Outlook({ isAppOpen, toggleOutlook, bounds }) {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [viewingAttachment, setViewingAttachment] = useState(null);
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: 'support@example.com',
      subject: 'Important: Security Update Required',
      date: '2023-07-20',
      read: false,
      content: `Dear Valued User,

Our security team has identified potential vulnerabilities in your account. To protect your information, we require you to:

1. Review the attached security report
2. Activate the recommended protections
3. Verify your account details

Failure to take action may result in account suspension.

This is URGENT - please activate the protections immediately.

Best regards,
Security Team`,
      attachments: [
        {
          name: 'security_update.csv',
          type: 'csv',
          size: '15KB',
          url: '/sample-data/security_update.csv'
        }
      ]
    },
    {
      id: 2,
      from: 'hr@yourcompany.com',
      subject: 'Your Salary Adjustment',
      date: '2023-07-19',
      read: true,
      content: `Dear Employee,

We're pleased to inform you about your salary adjustment for this quarter. 

Please find attached:
- Your new salary details
- Updated benefits package
- Tax adjustment forms

Click "Activate" in the attachment to confirm your acceptance.

Human Resources`,
      attachments: [
        {
          name: 'salary_details.csv',
          type: 'csv',
          size: '22KB',
          url: '/sample-data/salary_details.csv'
        }
      ]
    },
    {
      id: 3,
      from: 'no-reply@service.com',
      subject: 'Your invoice is ready',
      date: '2023-07-18',
      read: false,
      content: `Your invoice #INV-2023-987 is attached.

Total amount due: $1,299.00
Due date: 2023-07-25

Please review the attached CSV file and click "Activate It Now" to confirm your payment details.

Thank you for your business!`,
      attachments: [
        {
          name: 'invoice_details.csv',
          type: 'csv',
          size: '8KB',
          url: '/sample-data/invoice_details.csv'
        }
      ]
    }
  ]);

  return (
    <div className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={bounds}>
        <div className="window bg-white h-[45rem] w-[90rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto shadow-xl">
          <div className="title-bar flex justify-between items-center bg-blue-800 text-white h-9 select-none">
            <div className="m-1 ml-4 font-normal flex items-center">
              <span className="material-symbols-outlined mr-2">mail</span>
              Outlook
            </div>
            <div className="flex">
              <button
                className="material-symbols-outlined hover:bg-blue-700 mb-2 w-11 flex justify-center items-center text-xl"
                onClick={toggleOutlook}
              >
                minimize
              </button>
              <button
                className="material-symbols-outlined hover:bg-blue-700 mb-2 w-11 flex justify-center items-center text-sm"
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
            {/* Folder Navigation */}
            <div className="w-56 bg-gray-100 border-r border-gray-300 p-2">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined mr-2">edit</span>
                New Email
              </button>
              <nav className="space-y-1">
                {['Inbox', 'Sent Items', 'Drafts', 'Junk Email', 'Deleted Items'].map(folder => (
                  <div
                    key={folder}
                    className={`p-2 rounded cursor-pointer flex items-center ${selectedFolder.toLowerCase() === folder.toLowerCase().replace(' ', '')
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => {
                      setSelectedFolder(folder.toLowerCase().replace(' ', ''));
                      setSelectedEmail(null);
                    }}
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">
                      {folder === 'Inbox' ? 'inbox' :
                        folder === 'Sent Items' ? 'send' :
                          folder === 'Drafts' ? 'drafts' :
                            folder === 'Junk Email' ? 'report' : 'delete'}
                    </span>
                    {folder}
                  </div>
                ))}
              </nav>
            </div>

            {/* Email List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="border-b p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold capitalize">
                    {selectedFolder.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <span className="text-sm text-gray-500">{emails.length} items</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {emails.map(email => (
                  <div
                    key={email.id}
                    className={`flex items-start p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer ${selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                      } ${!email.read ? 'font-semibold' : ''}`}
                    onClick={() => {
                      setSelectedEmail(email);
                      setEmails(prev => prev.map(e =>
                        e.id === email.id ? { ...e, read: true } : e
                      ));
                    }}
                  >
                    <div className="w-6 mr-2 mt-1">
                      {!email.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div className="truncate">{email.from}</div>
                        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {email.date}
                        </div>
                      </div>
                      <div className={`text-sm ${!email.read ? 'text-gray-900' : 'text-gray-600'} truncate`}>
                        {email.subject}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {email.content.split('\n')[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 flex flex-col">
              {selectedEmail ? (
                <>
                  <div className="border-b p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                        <div className="text-sm text-gray-600 mt-1">
                          From: <span className="font-medium">{selectedEmail.from}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Date: {selectedEmail.date}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-200 rounded">
                          <span className="material-symbols-outlined">reply</span>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded">
                          <span className="material-symbols-outlined">forward</span>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 whitespace-pre-wrap bg-white">
                    <div className="prose max-w-none">
                      {selectedEmail.content}
                    </div>

                    {/* Attachments Section */}
                    {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                      <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold mb-3 flex items-center">
                          <span className="material-symbols-outlined mr-2">attach_file</span>
                          Attachments ({selectedEmail.attachments.length})
                        </h3>
                        <div className="space-y-3">
                          {selectedEmail.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"
                              onClick={() => setViewingAttachment(attachment)}
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-blue-800">CSV</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{attachment.name}</div>
                                <div className="text-sm text-gray-500">{attachment.size}</div>
                              </div>
                              <div className="text-blue-600 hover:text-blue-800 ml-3 px-3 py-1.5 rounded hover:bg-blue-50 flex items-center">
                                <span className="material-symbols-outlined mr-1">open_in_new</span>
                                View
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
                  <div className="text-center p-6">
                    <span className="material-symbols-outlined text-4xl mb-3 text-gray-400">drafts</span>
                    <p>Select an email to read</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Draggable>

      {/* Attachment Viewer Modal */}
      {viewingAttachment && (
        <Dialog open={true} onClose={() => setViewingAttachment(null)} className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg w-4/5 h-4/5 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center border-b">
              
           
              </div>
              <div className="flex-1 overflow-hidden">
                <CsvViewer 
                  fileUrl={viewingAttachment.url} 
                  onClose={() => setViewingAttachment(null)}
                  onMinimize={() => setViewingAttachment(null)}
                />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Outlook;