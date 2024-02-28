import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { stripePayment } from '../../reducers/PaymentSlice';

const PaymentRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: null, text: null });
  const [showReloadMessage, setshowReloadMessage] = useState(true);

  const token =
    JSON.parse(localStorage.getItem('userToken')) ||
    JSON.parse(localStorage.getItem('regToken'));

  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  const redirectStatus = urlParams.get('redirect_status');
  const customer_id = urlParams.get('customer_id')
    ? decodeURIComponent(urlParams.get('customer_id'))
    : null;
  const subscription_id = urlParams.get('subscription_id')
    ? decodeURIComponent(urlParams.get('subscription_id'))
    : null;
  const plan_id = urlParams.get('plan_id');
  const user_id = urlParams.get('user_id');

  useEffect(() => {
    if (customer_id && subscription_id && plan_id && user_id) {
      dispatch(
        stripePayment({
          token: token?.token,
          user_id: user_id,
          plan_id: plan_id,
          customer_id: customer_id,
          subscription_id: subscription_id,
          entity: 'subscription_complete',
        })
      );
      if (redirectStatus === 'succeeded') {
        setshowReloadMessage(false);
        setMessage({
          type: 'success',
          text: 'Subscription updated successfully',
        });
      } else {
        setshowReloadMessage(false);
        setMessage({ type: 'fail', text: 'Failed to update subscription' });
      }
    }
  }, []);

  useEffect(() => {
    if (redirectStatus === 'succeeded') {
      setTimeout(() => {
        navigate('/pricing');
      }, 2000);
    }
  }, [redirectStatus]);

  return (
    <div className='h-96 flex justify-center items-center'>
      <div className='container mx-auto mt-3'>
        {showReloadMessage && (
          <p className='text-center'>Please do not refresh the page</p>
        )}
        {/* Alert with success style */}
        {message?.type !== null && message?.type === 'success' && (
          <div
            className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4'
            role='alert'
          >
            <p className='font-bold'>Success! </p>
            <p>{message.text} </p>
          </div>
        )}
        {message?.type !== null && message?.type === 'fail' && (
          <div
            className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
            role='alert'
          >
            <p className='font-bold'>Failed! </p>
            <p>{message.text}</p> <br />
            <Button
              className='m-2 p-2 rounded-md'
              color='gray'
              onClick={() => navigate('/pricing')}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentRedirect;
