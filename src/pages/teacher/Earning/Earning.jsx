
import EarningStats from './EarningStats';
import WithdrawHistory from './WithdrawHistory';
import EarningPayments from './EarningPayments';
export default function Earning() {
  return (
    <div className="p-1 bg-white min-h-screen">
      <h1 className="text-[#093332] text-lg font-bold mb-6">Earnings</h1>
      <EarningStats />
      <EarningPayments />
      <WithdrawHistory />
      
    </div>
  )
}
