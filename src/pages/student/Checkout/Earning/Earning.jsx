import EarningStats from '../Earning/EarningStats';
import EarningPayment from '../Earning/EarningPayment';
import WithdrawHistory from '../Earning/WithdrawHistory';
export default function Earning() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-[#093332] text-lg font-bold mb-6">Earnings</h1>
      <EarningStats />
      <EarningPayment />
      <WithdrawHistory />
      
    </div>
  )
}
