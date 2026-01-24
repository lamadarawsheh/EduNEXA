import EarningStats from './EarningStats';
import WithdrawHistory from './WithdrawHistory';
import EarningPayments from './EarningPayments';

export default function Earning() {
  return (
    <div className="w-full min-h-screen bg-white p-1 sm:p-2 lg:p-1 overflow-hidden">
      
      <h1 className="text-[#093332] text-xl sm:text-2xl font-bold mb-6 lg:mb-8 overflow-hidden">
        Earnings
      </h1>

      <div className="w-full mb-8 lg:mb-10 overflow-hidden">
        <EarningStats />
      </div>

      <div className="w-full mb-10 lg:mb-14 overflow-hidden">
        <EarningPayments />
      </div>

      <div className="w-full">
        <div className="overflow-x-auto pb-4 custom-scrollbar overflow-hidden">
          <div className="min-w-[600px] lg:min-w-full overflow-hidden">
            <WithdrawHistory />
          </div>
        </div>
      </div>
      
    </div>
  );
}