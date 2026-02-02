import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
import Avatar from "./Avatar";

export default function Performance({ courses }) {

  const safeCourses = Array.isArray(courses) ? courses : [];

  const sortedCourses = useMemo(() => {
    return [...safeCourses].sort(
      (a, b) => (b.studentsCount || 0) - (a.studentsCount || 0)
    );
  }, [safeCourses]);

  const top3Courses = sortedCourses.slice(0, 3);

  const chartData = sortedCourses.slice(0, 5).map((c) => ({
    name: c?.title || "-",
    value: c?.studentsCount || 0,
  }));

  return (
    <div className="flex flex-wrap gap-3 justify-between">

      <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[78%]">

        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">
            Performance Overview
          </p>
          <p className="text-xs text-gray-500">
            Average rate of courses over time
          </p>
        </div>

        <div className="h-56 w-full">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >

              <defs>
                <linearGradient id="fillTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#176D69" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#176D69" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" vertical={false} />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                className="text-[12px]"
              />

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

        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">
            Top Performers
          </p>
        </div>

        {top3Courses.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-6">
            No Data Available
          </p>
        )}

        {top3Courses.map((course) => (

          <div
            key={course?.id || course?.title}
            className="flex justify-between items-center mt-8"
          >

            <div className="flex gap-4 items-center">

              <Avatar
                name={course?.instructorName || "Unknown"}
                size={40}
              />

              <div className="flex flex-col">

                <p className="text-[14px] text-gray-800">
                  {course?.instructorName || "-"}
                </p>

                <p className="text-[12px] text-gray-500">
                  {course?.title || "-"}
                </p>

              </div>

            </div>

            <p className="bg-gray-200 rounded-md px-2 py-1 text-[12px]">
              {course?.studentsCount || 0}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
