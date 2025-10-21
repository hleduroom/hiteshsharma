"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Analytics features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}