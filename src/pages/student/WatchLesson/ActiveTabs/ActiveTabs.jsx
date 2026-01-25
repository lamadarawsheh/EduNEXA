import React, { useState } from 'react';
import Description from './Description';
import Notes from './Notes';
import Files from './Files';
import Comments from './Comments';



export default function ActiveTab({ comments, onAddComment, onAddReply  }) {
  const [activeTab, setActiveTab] = useState('description');
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'notes', label: 'Lectures Notes' },
    { id: 'files', label: 'Attach File', count: '01' },
    { id: 'comments', label: 'Comments' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4"> 
        <div className="flex border-b border-[#176D69] mb-6 overflow-x-auto">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 text-sm font-medium transition-colors relative whitespace-nowrap text-[#176D69]`}
            >
                {tab.id === 'comments' ? `Comments (${comments?.length || 0})` : tab.label}
                
                {tab.count && tab.id !== 'comments' && (
                <span className="ml-2 bg-emerald-100 text-[#176D69] px-1.5 py-0.5 rounded text-[10px]">
                    {tab.count}
                </span>
                )}

                {activeTab === 'notes' && (
                    <Notes />
                )}
                {activeTab === 'files' && (
                    <Files />
                )}
            </button>
            ))}
        </div>

        <div className="w-[100%] py-4 text-gray-600 leading-relaxed text-left">
            {activeTab === 'description' && <Description />}
            {activeTab === 'notes' && <Notes />}
            {activeTab === 'files' && <Files />}

            {activeTab === 'comments' && (
                <Comments 
                    comments={comments} 
                    onAddComment={onAddComment} 
                    onAddReply={onAddReply}
                />
            )}
        </div>
    </div> 
  );
}
