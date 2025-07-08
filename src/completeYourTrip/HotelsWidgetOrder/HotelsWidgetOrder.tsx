import { completeYourTripModel } from 'src/completeYourTrip';

// its important to keep const {orderData} here
export const HotelsWidgetOrder = () => {
  const { orderData } = completeYourTripModel.useHotelsWidgetDataSelector();

  return null;
};
