// order/success/page.tsx

import OrderSuccessContext from './order-success-content';

// This is the server component page wrapper
export default function OrderSuccessPage() {
  return (
    // The main logic is handled by the client component, 
    // ensuring URL parameters are correctly parsed within the client environment.
    <OrderSuccessContext />
  );
}
