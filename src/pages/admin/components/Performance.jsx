import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Avatar from "./Avatar";

const data = [
  { name: "Jan", value: 4.0 },
  { name: "Feb", value: 3.5 },
  { name: "Mar", value: 3.0 },
  { name: "Apr", value: 4.6 },
  { name: "May", value: 5.0 },
  { name: "Jun", value: 4.2 },
  { name: "Jul", value: 3.7 },
];
const bestPerformance = [
  { name: "Faris Ali", course:"Engineering" },
  { name: "Ahmed Hassan", course:"Computer Science" },
  { name: "Omar Khalil", course:"Buisness"},
]
export default function Performance() {
  return (
    <div className="flex flex-wrap gap-3 justify-between">
    <div className="rounded-xl border border-gray-200 bg-white  p-4 w-[100%] lg:w-[78%]">
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-800">Performance Overview</p>
        <p className="text-xs text-gray-500">Average rate of courses over time</p>
      </div>

      <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillTeal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#176D69" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#176D69" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#176D69"
              strokeWidth={2}
              fill="url(#fillTeal)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[20%]">
        <div className="mb-3 ">
        <p className="text-sm font-semibold text-gray-800">Top Performerce</p>
        {bestPerformance.map((user, index) => (
        <div
        key={index}
        className="flex justify-between items-center mt-8" >
      <div className="flex gap-4 items-center">
        <Avatar
        name={user.name}
        size={40}
        // src={user.avatar}  
        />
      <div className="flex flex-col">
        <p className="text-[14px] text-gray-800">{user.name}</p>
        <p className="text-[12px] text-gray-500">{user.course}</p>
      </div>
    </div>
        <p className="bg-gray-200 rounded-md p-1 text-[12px]">
        #{index + 1}
        </p>
    </div>
))}

        
      </div>
      </div>
    </div>
  );
}
