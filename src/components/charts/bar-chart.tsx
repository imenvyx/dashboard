'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface BarChartProps {
  data: { category: string; value: number }[];
  className?: string;
  height?: number;
}

export function BarChart({ data, className, height = 300 }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn("flex items-center justify-center border rounded-lg bg-gray-50", className)} style={{ height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("p-4 border rounded-lg bg-white shadow-sm", className)}>
      <h3 className="text-center font-medium mb-4 text-gray-700">Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12 }}
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
          />
          <Legend />
          <Bar 
            dataKey="value" 
            name="Value"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm" style={{ height }}>
      <div className="flex justify-center mb-4">
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="w-full h-full" />
    </div>
  );
}