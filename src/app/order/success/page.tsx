import { Suspense } from 'react';
import { OrderSuccessContent } from './order-success-content';

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
                <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Loading...
            </h1>
            <p className="text-muted-foreground">
              Please wait while we load your order details.
            </p>
          </div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}