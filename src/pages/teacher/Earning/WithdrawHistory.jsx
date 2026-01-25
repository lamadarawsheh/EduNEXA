export default function WithdrawHistory() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-4 sm:p-6 pb-0">
        <h3 className="text-[#093332] text-lg font-bold mb-4 sm:mb-6">Withdraw History</h3>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left min-w-[600px] border-collapse">
          <thead className="bg-gray-50 text-[#606060]">
            <tr>
              <th className="p-4 text-base font-semibold uppercase tracking-wider">DATE</th>
              <th className="p-4 text-base font-semibold uppercase tracking-wider">METHOD</th>
              <th className="p-4 text-base font-semibold uppercase tracking-wider">AMOUNT</th>
              <th className="p-4 text-base font-semibold uppercase tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-[#0E4F4F] text-sm whitespace-nowrap">
                  1 DEC, 2025 AT 10:14 PM
                </td>
                <td className="p-4 text-[#0E4F4F] text-sm whitespace-nowrap">
                  Mastercards
                </td>
                <td className="p-4 text-[#0E4F4F] text-sm whitespace-nowrap font-medium">
                  American Express
                </td>
                <td className="p-4 text-sm whitespace-nowrap">
                  <span className="text-[#2D6A6A]">Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}