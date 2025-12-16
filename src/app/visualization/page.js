'use client';

import { useState } from "react";
import { useData } from "@/context/DataContext";
import Link from "next/link";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getAverageMilesPerPerson,
  getTotalMilesPerPerson,
  getPersonTrendData,
  getOverallMetrics,
  getPersonMetrics,
} from "@/lib/metrics";

export default function Visualization() {
  const { parsedData } = useData();
  const [selectedPerson, setSelectedPerson] = useState(null);

  if (!parsedData) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">No Data Available</h1>
          <p className="text-muted-foreground mb-6">
            Please upload a CSV file first to view visualizations and metrics.
          </p>
          <Link href="/">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Go Back to Upload
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const overallMetrics = getOverallMetrics(parsedData.normalizedRows);
  const avgMilesData = getAverageMilesPerPerson(parsedData.normalizedRows);
  const totalMilesData = getTotalMilesPerPerson(parsedData.normalizedRows);
  const people = Object.keys(parsedData.groupedByPerson).sort();
  const currentPerson = selectedPerson || people[0];
  const personTrendData = getPersonTrendData(parsedData.normalizedRows, currentPerson);
  const personMetrics = getPersonMetrics(parsedData.normalizedRows, currentPerson);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Visualizations & Metrics</h1>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm text-muted-foreground mb-2">Total Runs</h3>
          <p className="text-3xl font-bold">{overallMetrics.totalRuns}</p>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm text-muted-foreground mb-2">Total People</h3>
          <p className="text-3xl font-bold">{overallMetrics.totalPeople}</p>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm text-muted-foreground mb-2">Total Miles</h3>
          <p className="text-3xl font-bold">{overallMetrics.totalMiles}</p>
        </div>
      </div>

      {/* Chart 1: Average Miles Run per Person */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
        <h2 className="text-xl font-bold mb-6">Average Miles Run per Person</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={avgMilesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#64748b" />
              <XAxis dataKey="person" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="average" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Total Miles Contribution by Person */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
        <h2 className="text-xl font-bold mb-6">Total Miles Contribution by Person</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={totalMilesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#64748b" />
              <XAxis dataKey="person" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-Person View */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Per-Person Analysis</h2>
          <div className="flex items-center gap-4">
            <label htmlFor="personSelect" className="text-sm font-medium">
              Select Person:
            </label>
            <select
              id="personSelect"
              value={selectedPerson || ""}
              onChange={(e) => setSelectedPerson(e.target.value || null)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
            >
              {people.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Per-Person Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs text-muted-foreground mb-1">Total Miles</h3>
            <p className="text-2xl font-bold">{personMetrics.totalMiles}</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs text-muted-foreground mb-1">Run Count</h3>
            <p className="text-2xl font-bold">{personMetrics.runCount}</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs text-muted-foreground mb-1">Average per Run</h3>
            <p className="text-2xl font-bold">{personMetrics.averageMiles}</p>
          </div>
        </div>

        {/* Chart 3: Running Trend Over Time */}
        <h3 className="text-lg font-bold mb-4">Running Trend Over Time</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={personTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#64748b" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="miles"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Raw Data Preview */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
        <h2 className="text-xl font-bold mb-4">Data Preview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Person</th>
                <th className="text-left p-2">Miles</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.normalizedRows.slice(0, 10).map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-2">{row.date}</td>
                  <td className="p-2">{row.person}</td>
                  <td className="p-2">{row.miles}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {parsedData.rowCount > 10 && (
            <p className="text-sm text-muted-foreground mt-2">
              Showing 10 of {parsedData.rowCount} rows
            </p>
          )}
        </div>
      </div>

      <Link href="/">
        <button className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
          Back to Upload
        </button>
      </Link>
    </main>
  );
}
