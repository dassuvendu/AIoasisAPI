import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/register', userInput);
      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        if (response?.data?.errors) {
          return rejectWithValue(response.data.errors);
        } else {
          return rejectWithValue('Something went wrong.');
        }
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sendOtp = createAsyncThunk(
  'user/send-otp',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('user/send-otp', userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        if (response?.data?.errors) {
          return rejectWithValue(response.data.errors);
        } else {
          return rejectWithValue('Failed to send OTP');
        }
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'user/verify-otp',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('user/verify-otp', userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        if (response?.data?.errors) {
          return rejectWithValue(response.data.errors);
        } else {
          return rejectWithValue('Failed to verify OTP');
        }
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const makePayment = createAsyncThunk(
  'user/payment',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/payment', userInput);
      if (response?.data?.status_code === 200) {
        console.log('response of makepayment', response.data);
        return response.data;
      } else {
        throw Error('Failed to register user');
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Google Sign In
export const googleSignIn = createAsyncThunk(
  'auth/google-signIn',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/api/google-login', {
        token: token,
      });
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        // Handle the case when status code is not 200
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      let errors = errorHandler(error);
      return rejectWithValue(errors);
    }
  }
);

const initialState = {
  message: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  currentUser: {},
  isGoogleLoggedIn: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = {};
    },
    resetAfterLoggedIn: (state) => {
      state = { ...initialState, isLoggedIn: true };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('subscriptionId');
      localStorage.removeItem('custId');
      localStorage.removeItem('planId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.message = null;
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user_id, email, otp_verified, access_token } = payload;
        state.loading = false;
        state.message = payload;
        state.currentUser = {
          user_id: user_id,
          email: email,
          otp_verified: otp_verified,
        };
        localStorage.setItem(
          'regToken',
          JSON.stringify({ token: access_token })
        );
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.message = null;
        state.error = null;
        state.loading = true;
      })

      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.loading = false;
        state.currentUser.otp_verified = 1;
        console.log('otp->', state.currentUser);
        state.message = message;
      })

      .addCase(verifyOtp.rejected, (state, response) => {
        state.loading = false;
        state.message =
          response.payload !== undefined && response.payload.message
            ? response.payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(sendOtp.pending, (state) => {
        state.error = null;
        state.loading = true;
      })

      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.currentUser.otp_verified = 1;
      })

      .addCase(sendOtp.rejected, (state, response) => {
        state.loading = false;
        state.message =
          response.payload !== undefined && response.payload.message
            ? response.payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(makePayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(makePayment.fulfilled, (state) => {
        state.loading = false;
        state.currentUser.payment_status = true;
        state.currentUser.payment_message =
          'Subscription created successfully.';
      })

      .addCase(makePayment.rejected, (state) => {
        state.loading = true;
      })

      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.isLoggedIn = false;
        state.error = false;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        const { access_token, email, name, user_id } = payload;
        state.isLoggedIn = true;
        state.currentUser = {
          user_id: user_id,
          email: email,
          name: name,
        };
        localStorage.setItem(
          'userToken',
          JSON.stringify({ token: access_token })
        );
        localStorage.setItem('userId', JSON.stringify({ user_id: user_id }));
        localStorage.removeItem('regToken');
      })

      .addCase(login.rejected, (state, { payload }) => {
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(googleSignIn.pending, (state, { payload }) => {
        state.isLoggedIn = false;
        state.isGoogleLoggedIn = false;
        // state.subscription = false;
        state.error = false;
      })

      .addCase(googleSignIn.fulfilled, (state, { payload }) => {
        const { access_token, user_id, email, otp_verified } = payload;
        state.isGoogleLoggedIn = true;
        console.log('payload in google sign in ', payload);

        console.log('state.isGoogleLoggedIn', state.isGoogleLoggedIn);
        state.isLoggedIn = true;
        state.currentUser = {
          user_id: user_id,
          email: email,
          otp_verified: otp_verified,
        };
        localStorage.setItem(
          'userToken',
          JSON.stringify({ token: access_token })
        );
      })

      .addCase(googleSignIn.rejected, (state, { payload }) => {
        state.error = true;
        state.subscription = false;
        state.isGoogleLoggedIn = false;
        state.message =
          payload !== undefined
            ? payload
            : 'Something went wrong. Try again later.';
        console.log(
          'state.isGoogleLoggedIn -> rejected',
          state.isGoogleLoggedIn
        );
      });
  },
});
export const { clearCurrentUser, resetAfterLoggedIn, logout } =
  authSlice.actions;

export default authSlice.reducer;
