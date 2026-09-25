import type { Metadata } from 'next';
import { VisitorDashboard } from './visitor-dashboard';

export const metadata: Metadata = {
  title: 'Visitor Dashboard — Malleable Software',
  description: 'Visitor analytics dashboard preview.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <main id="main" className="container dashboard-page"><VisitorDashboard /></main>;
}
