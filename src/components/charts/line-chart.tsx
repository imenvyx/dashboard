'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LineChartProps {
  data: { date: string; value: number }[];
  className?: string;
  height?: number;
}

export function LineChart({ data, className, height = 300 }: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn("flex items-center justify-center border rounded-lg bg-gray-50", className)} style={{ height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("p-4 border rounded-lg bg-white shadow-sm", className)}>
      <h3 className="text-center font-medium mb-4 text-gray-700">Time Series</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Intl.NumberFormat('en-US', { 
              notation: 'compact', 
              maximumFractionDigits: 1 
            }).format(value)}
          />
          <Tooltip 
            formatter={(value) => [new Intl.NumberFormat('en-US').format(Number(value)), 'Value']}
            labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            name="Value"
            stroke="#3b82f6" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm" style={{ height }}>
      <div className="flex justify-center mb-4">
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="w-full h-full" />
    </div>
  );
}