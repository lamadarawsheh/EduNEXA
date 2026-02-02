import React, { useState } from 'react';
import Description from './Description';
import Notes from './Notes';
import Files from './Files';
import ReviewsPage from './ReviewsPage';

export default function ActiveTab({
  reviews,
  isLoading,
  description,
  notes,
  files
}) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'notes', label: 'Lectures Notes' },
    { id: 'files', label: 'Attach File', count: '01' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="flex border-b border-[#176D69] mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-6 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id
              ? "text-[#176D69] border-b-2 border-[#176D69]"
              : "text-gray-400 hover:text-[#176D69]"
              }`}
          >
            {tab.id === 'reviews' ? `Reviews (${reviews?.length || 0})` : tab.label}

            {tab.count && tab.id !== 'reviews' && (
              <span className="ml-2 bg-emerald-100 text-[#176D69] px-1.5 py-0.5 rounded text-[10px]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="w-full py-4 text-gray-600 leading-relaxed text-left">
        {activeTab === 'description' && <Description content={description} />}
        {activeTab === 'notes' && <Notes content={notes} />}
        {activeTab === 'files' && <Files files={files} />}

        {activeTab === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}