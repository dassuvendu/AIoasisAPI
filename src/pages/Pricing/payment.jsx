/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
// import { paymentIcon } from '../../../ui/layout/outside-login/images';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../stripe/CheckoutForm';
import { paymentIcon, stripeIcon } from '../../assets/images/images';

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [options, setOptions] = useState(null);

  const [errorMessage, setErrorMessage] = useState();

  const {
    stripeClientSecret,
    customer_id,
    subscription_id,
    stripePublishableKey,
    email,
    user_id,
    planId,
  } = props;

  useEffect(() => {
    const promise = loadStripe(stripePublishableKey);
    setStripePromise(promise);

    const stripe_options = {
      clientSecret: stripeClientSecret,
    };
    setOptions(stripe_options);
  }, []);

  return (
    <>
      <div className='w-full max-w-4xl p-6 mx-auto my-0 shadow-xl bg-sky-100 rounded-2xl lg:p-10'>
        <div className='container mx-auto my-0'>
          <div className='flex'>
            <div className='flex items-center justify-center w-2/5 sm:hidden lg:block'>
              <div className='text-center'>
                <img src={paymentIcon} />
                <img src={stripeIcon} className='w-28 inline-block' />
                <br />
                <h2 className='text-lg font-normal text-red-500'>
                  Payment is done by Stripe
                </h2>
              </div>
            </div>
            <div className='w-full lg:w-3/5'>
              <div className='register_cont'>
                <h2 className='mb-5 text-3xl font-bold text-center text-blue-800'>
                  Make Payment
                </h2>
                <div className='stripe-error text-red-600'>{errorMessage}</div>
                {stripePublishableKey &&
                  customer_id &&
                  subscription_id &&
                  planId &&
                  user_id && (
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm
                        customer_id={customer_id}
                        subscription_id={subscription_id}
                        plan_id={planId}
                        user_id={user_id}
                      />
                    </Elements>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
