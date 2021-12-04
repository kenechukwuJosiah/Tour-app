// const stripe = Stripe(
//   'pk_test_51JrrEOH9wwaU9HsNjivDTR2FSkA0IBpied4SMYtAB7aYwTJXpkco6ASH8WtnccDh2eyXaSn0ab5SbjVtDs2YG4xl00xQvDB7El'
// );
import { showAlert } from './alert';
import axios from 'axios';
import Stripe from 'stripe';
const stripe = new Stripe(
  'pk_test_51JrrEOH9wwaU9HsNjivDTR2FSkA0IBpied4SMYtAB7aYwTJXpkco6ASH8WtnccDh2eyXaSn0ab5SbjVtDs2YG4xl00xQvDB7El'
);

export const bookTour = async (tourId) => {
  try {
    //1) get checkout session from the api
    const session = await axios(
      `http://127.0.0.1:3300/api/v1/booking/checkout-session/${tourId}`
    );
    console.log(session);
    //2) Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
