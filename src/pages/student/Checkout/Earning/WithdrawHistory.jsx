export default function WithdrawHistory(){
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
        <h3 className="text-[#093332] text-lg font-bold mb-6">Withdraw History</h3>
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600">
            <tr>
                <th className="p-4">DATE</th>
                <th className="p-4">METHOD</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">STATUS</th>
            </tr>
            </thead>
            <tbody className="divide-y">
            {[1,2,3,4,5,6,7,8].map((i) => (
                <tr key={i}>
                 <td className="p-4 text-teal-800 text-sm">1 DEC, 2025 AT 10:14 PM</td>
                <td className="p-4 text-teal-800 text-sm">Mastercard</td>
                <td className="p-4 text-teal-800 text-sm">American Express</td>
                <td className="p-4 text-teal-800 text-sm">Pending</td>
                </tr>
                
            ))}
            </tbody>
            
        </table>
    </div>
  );
};