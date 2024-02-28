import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducers/AuthSlice';
import CharacterSlice from '../reducers/CharacterSlice';
import PlanSlice from '../reducers/PlanSlice';
import MyProfileSlice from '../reducers/MyProfileSlice';
import PaymentSlice from '../reducers/PaymentSlice';
import ContactSlice from '../reducers/ContactSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    character: CharacterSlice,
    plans: PlanSlice,
    profile: MyProfileSlice,
    payment: PaymentSlice,
    contact:ContactSlice
  },
  devTools: import.meta.env.DEV,
});

export default store;
