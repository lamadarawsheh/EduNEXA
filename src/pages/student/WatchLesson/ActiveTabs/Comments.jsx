import React, { useState } from 'react';

const commentsData = [
  {
    id: 1,
    user: "Ronald Richards",
    time: "1 week ago",
    avatar: "../../../../../image/A1.PNG",
    text: "Maecenas risus tortor, tincidunt nec purus eu, gravida suscipit tortor.",
    replies: [
      {
        id: 101,
        user: "Kristin Watson",
        role: "ADMIN",
        time: "1 week ago",
        avatar: "../../../../../image/A2.PNG",
        text: "Nulla pellentesque leo vitae lorem hendrerit, sit amet elementum ipsum rutrum. Morbi ultricies volutpat orci quis fringilla.",
      },
      {
        id: 102,
        user: "Cody Fisher",
        time: "1 week ago",
        avatar: "../../../../../image/A3.PNG",
        text: "Thank You so much sir, you're a great mentor.",
      }
    ]
  },
  {
    id: 2,
    user: "Guy Hawkins",
    time: "2 weeks ago",
    avatar: "../../../../../image/A1.PNG",
    text: "Thank you for your helpful video. May I ask what is the application use to demo the animation at [4:24], is it the runnable mobile application?",
  },
  {
    id: 3,
    user: "Theresa Webb",
    time: "3 weeks ago",
    avatar: "../../../../../image/A2.PNG",
    text: "Now i know that i will spent that 5 minutes of my life with pure pleasure",
  }
];

const ReplyIcon = ({ className = "text-gray-400" }) => (
  <svg 
    className={className} 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CommentItem = ({ comment, isReply = false }) => (
  <div className={`flex gap-3 md:gap-4 ${isReply ? 'ml-6 md:ml-12 mt-4 md:mt-6 border-l border-gray-100 pl-4 md:pl-6' : 'mt-8'}`}>
    <img 
      src={comment.avatar} 
      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0" 
      alt={comment.user} />

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h4 className="font-bold text-[#08332e] text-sm md:text-[15px]">{comment.user}</h4>
        <span className="text-gray-400 text-xs">• {comment.time}</span>
      </div>
      <p className="text-[#3c5a5a] text-sm md:text-[15px] leading-relaxed mb-3 break-words">
        {comment.text}
      </p>
      
      <button className="flex items-center gap-2 text-[#1b5e54] text-[12px] font-bold hover:opacity-80 transition-opacity uppercase tracking-wider">
        <ReplyIcon className="text-[#1b5e54] w-5 h-5" />
        REPLY
      </button>

      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  </div>
);

export default function CommentsSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white font-sans animate-fadeIn">
      <h2 className="text-lg md:text-xl font-bold text-[#08332e] mb-6 pb-2 border-b border-gray-50">
        Comments (154)
      </h2>

      <div className="divide-y divide-gray-50">
        {commentsData.map((comment) => (
          <div key={comment.id} className="pb-4">
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 ml-0 md:ml-14">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 flex items-center border border-gray-200 rounded-sm px-4 bg-white focus-within:ring-1 focus-within:ring-[#1b5e54] transition-all">
            <ReplyIcon className="text-gray-400 mr-3 w-5 h-5 shrink-0" />
            <input 
              type="text" 
              placeholder="Write your reply" 
              className="w-full outline-none text-sm md:text-[15px] py-3 text-[#3c5a5a] placeholder:text-gray-400 bg-transparent"
            />
          </div>
          
          <button className="bg-[#1b5e54] text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-[#14453d] transition-colors whitespace-nowrap shadow-sm active:scale-95">
            Post Reply
          </button>
        </div>
      </div>

      <div className="flex justify-start"> 
        <button 
          onClick={handleLoadMore}
          disabled={isLoading}
          className={`
            mt-6 flex items-center gap-2 py-2
            font-bold text-[12px] uppercase tracking-widest transition-all
            ${isLoading 
              ? 'text-[#1b5e54] cursor-not-allowed' 
              : 'text-[#1b5e54] hover:text-[#14453d] active:opacity-70'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading Comments...</span>
            </div>
          ) : (
            <>
              <span>Load More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}