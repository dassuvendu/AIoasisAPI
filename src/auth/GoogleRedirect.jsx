import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../reducers/AuthSlice';
import { Spinner } from 'flowbite-react';

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isloggedIn } = useSelector((state) => state.auth);

  // const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    // Retrieve the access token from wherever you have stored it
    const token = localStorage.getItem('googleAccessToken');
    dispatch(googleSignIn(token)).then(() => {
      const userToken = localStorage.getItem('userToken');
      if (userToken !== null) {
        localStorage.removeItem('googleAccessToken');

        navigate('/dashboard');
      } else {
        localStorage.removeItem('googleAccessToken');
        navigate('/');
      }
    });
  }, [dispatch, googleSignIn]);
  return (
    <div className='h-96 flex justify-center items-center'>
      <Spinner />
    </div>
  );
};

export default GoogleRedirect;
