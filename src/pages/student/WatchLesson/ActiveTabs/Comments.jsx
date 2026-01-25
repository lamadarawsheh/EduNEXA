import React, { useState } from 'react';


const ReplyIcon = ({ className = "text-gray-400" }) => (
  <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CommentItem = ({ comment, onReply, isReply = false }) => {
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyText, setReplyText] = useState("");

  const submitReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText); 
    setReplyText("");
  };

  return (
    <div className={`flex gap-3 md:gap-4 ${isReply ? 'ml-6 md:ml-12 mt-4 md:mt-6 border-l-2 border-gray-100 pl-4 md:pl-6' : 'mt-8'}`}>
   
      <img 
        src={comment.avatar} 
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0" 
        alt={comment.user} 
      />
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="font-bold text-[#08332e] text-sm md:text-[15px]">{comment.user}</h4>
          <span className="text-gray-400 text-xs">• {comment.time}</span>
        </div>
        
        <p className="text-[#3c5a5a] text-sm md:text-[15px] leading-relaxed mb-3 break-words">
          {comment.text}
        </p>
        
        {!isReply && (
          <button 
            onClick={() => setShowReplySection(!showReplySection)}
            className="flex items-center gap-2 text-[#1b5e54] text-[12px] font-bold hover:opacity-80 transition-opacity uppercase tracking-wider"
          >
            <ReplyIcon className="text-[#1b5e54] w-5 h-5" />
            {showReplySection ? "HIDE REPLIES" : "REPLY"}
            {comment.replies?.length > 0 && !showReplySection && (
              <span className="ml-1 text-gray-400 font-normal">({comment.replies.length})</span>
            )}
          </button>
        )}

        {showReplySection && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
              <div className="flex-1 flex items-center border border-gray-200 rounded-sm px-4 bg-white focus-within:ring-1 focus-within:ring-[#1b5e54] transition-all shadow-sm">
                <ReplyIcon className="text-gray-400 mr-3 w-5 h-5 shrink-0" />
                <input 
                  type="text" 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitReply()}
                  placeholder="Write your reply..." 
                  className="w-full outline-none text-sm md:text-[15px] py-3 text-[#3c5a5a] placeholder:text-gray-400 bg-transparent"
                />
              </div>
              <button 
                onClick={submitReply}
                className="bg-[#1b5e54] text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-[#14453d] active:scale-95 transition-all shadow-sm"
              >
                Post Reply
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {comment.replies && comment.replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  onReply={onReply} 
                  isReply={true} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CommentsSection({ comments, onAddComment, onAddReply }) {
  const [newText, setNewText] = useState("");

  const handlePost = () => {
    if (!newText.trim()) return;
    onAddComment(newText);
    setNewText("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white font-sans">

      <h2 className="text-lg md:text-xl font-bold text-[#08332e] mb-6 pb-2 border-b border-gray-50 text-left">
        Comments ({comments?.length || 0})
      </h2>

      <div className="divide-y divide-gray-50">
        {comments && comments.map((comment) => (
          <div key={comment.id} className="pb-4">
            <CommentItem 
              comment={comment} 
              onReply={onAddReply} 
            />
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 flex items-center border border-gray-200 rounded-sm px-4 bg-white focus-within:ring-1 focus-within:ring-[#1b5e54] transition-all shadow-sm">
            <ReplyIcon className="text-gray-400 mr-3 w-5 h-5 shrink-0" />
            <input 
              type="text" 
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePost()}
              placeholder="Write your comment here..." 
              className="w-full outline-none text-sm md:text-[15px] py-3 text-[#3c5a5a] placeholder:text-gray-400 bg-transparent"
            />
          </div>
          <button 
            onClick={handlePost}
            className="bg-[#1b5e54] text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-[#14453d] active:scale-95 transition-all shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}