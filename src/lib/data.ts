// Define types according to sample data
export interface Report {
  id: string;
  name: string;
  cards: {
    total: number;
    average: number;
  };
  line: {
    date: string;
    value: number;
  }[];
  bar: {
    category: string;
    value: number;
  }[];
}

export interface ReportsData {
  reports: Report[];
}

const API_URL = "/data/reports.json";

export async function fetchReports() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function fetchReport(id: string) {
  const { reports } = await fetchReports();
  return reports.find((r: Report) => r.id === id);
}
