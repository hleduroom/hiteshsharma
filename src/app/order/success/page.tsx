import { Suspense } from 'react';
import OrderSuccessContent from './order-success-content';

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-300 rounded-full p-4 animate-pulse">
              <div className="w-16 h-16"></div>
            </div>
          </div>
          <div className="h-8 bg-gray-300 rounded animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 w-3/4 mx-auto"></div>
          {/* Skeleton for other content */}
        </div>
      </div>
    </div>
  );
}