"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Customer management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}