import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
      <button
        className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="px-1">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded-lg ${
            p === page ? "bg-[#145A58] text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1">...</span>}
          <button
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
