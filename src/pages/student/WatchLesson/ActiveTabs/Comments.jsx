import React from 'react';
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
    id: 2,
    user: "Guy Hawkins",
    time: "2 weeks ago",
    avatar: "../../../../../image/A2.PNG",
    text: "Thank you for your helpful video. May I ask what is the application use to demo the animation at [4:24], is it the runnable mobile application?",
  },
    {
    id: 2,
    user: "Guy Hawkins",
    time: "2 weeks ago",
    avatar: "../../../../../image/A4.PNG",
    text: "Thank you for your helpful video. May I ask what is the application use to demo the animation at [4:24], is it the runnable mobile application?",
  },
];
const CommentItem = ({ comment, isReply = false }) => (
  <div className={`flex gap-4 ${isReply ? 'ml-12 mt-6 border-l-2 border-gray-100 pl-4' : 'mt-8'}`}>
    <img 
      src={comment.avatar} 
      className="w-10 h-10 rounded-full object-cover shrink-0" 
      alt={comment.user} />

    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-semibold text-slate-800 text-sm">{comment.user}</h4>
        {comment.role && (
          <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
            {comment.role}
          </span>
        )}
        <span className="text-gray-400 text-xs">• {comment.time}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {comment.text}
      </p>
      <button className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold hover:text-emerald-600 transition-colors uppercase tracking-wider">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        REPLY
      </button>
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  </div>
);

export default function CommentsSection() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white font-sans">
      <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2">
        Comments (154)
      </h2>
      <div className="divide-y divide-gray-50">
        {commentsData.map((comment) => (
          <div key={comment.id} className="pb-4">
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>
      <div className="mt-12 group">
        <div className="flex items-center gap-4 border rounded-lg p-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
          <div className="pl-3 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Write your reply" 
            className="flex-1 outline-none text-sm py-2 text-gray-700"
          />
          <button className="bg-emerald-800 text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-emerald-900 transition-colors">
            Post Reply
          </button>
        </div>
      </div>
      <button className="ml-10 mt-10 flex items-center gap-2 px-8 py-2.5 border border-emerald-500 text-emerald-600 rounded-md font-bold text-xs bg-emerald-50 mx-auto transition-all uppercase tracking-widest">
        Load More
      </button>
    </div>
  );
}