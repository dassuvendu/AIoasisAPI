import React from 'react';
import OutsideLayout from '../ui/layout/OutsideLayout.jsx';
import AboutUs from '../pages/AboutUs/aboutUS.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Blog from '../pages/Blog/blog.jsx';
import Profile from '../pages/Profile/profile.jsx';
import Pricing from '../pages/Pricing/pricing.jsx';
import Chat from '../pages/Chat/chat.jsx';
import EditCharacter from '../pages/EditCharacter/EditCharacter.jsx';
import EditCharacterPage from '../pages/EditCharacter/EditCharacterPage.jsx';
import Payment from '../pages/Pricing/payment.jsx';
import PaymentRedirect from '../pages/stripe/PaymentRedirect.jsx';
import InsideLayout from '../ui/layout/InsideLayout.jsx';
import GoogleRedirect from '../auth/GoogleRedirect.jsx';
import Tokenomics from '../pages/Tokenomics/Tokenomics.jsx';
import Roadmap from '../pages/Roadmap/Roadmap.jsx';
import Faq from '../pages/FAQ/Faq.jsx';
import AllTopModels from '../pages/AllTopmodels/AllTopModels.jsx';
import AllFreeModels from '../pages/AllFreeModels/AllFreeModels.jsx';
import InsideAboutUs from '../pages/AboutUs/InsideAboutUs.jsx';
import AllTopModelsIndise from '../pages/AllTopmodels/AllTopModelsIndise.jsx';
import AllFreeModelsInside from '../pages/AllFreeModels/AllFreeModelsInside.jsx';
import OwnedCharacter from '../pages/Home/OwnedCharacter.jsx';

const Home = React.lazy(() => import('../pages/Home/home.jsx'));
const CreateCharacter = React.lazy(() =>
  import('../pages/CreateCharacter/createcharacter.jsx')
);
const CommunityGuidelines = React.lazy(() =>
  import('../pages/CommunityGuidelines/CommunityGuidelines.jsx')
);
const PrivacyPolicy = React.lazy(() =>
  import('../pages/PrivacyPolicy/PrivacyPolicy.jsx')
);
const TermsOfUse = React.lazy(() =>
  import('../pages/TermsOfUse/TermsOfUse.jsx')
);
const CharacterDetails = React.lazy(() =>
  import('../pages/CharacterDetails/CharacterDetails.jsx')
);
const SubscriptionHistory = React.lazy(() =>
  import('../pages/Pricing/SubscriptionHistory.jsx')
);

const Dashboard = React.lazy(() => import('../pages/Home/Dashboard.jsx'));

const allRoutes = [
  {
    path: '/',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/dashboard',
    element: <InsideLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: '/about-us',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <AboutUs /> },
      // { path: 'about-us', element: <AboutUs /> },
    ],
  },
  {
    path: '/tokenomics',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Tokenomics /> },
      // { path: 'about-us', element: <AboutUs /> },
    ],
  },
  {
    path: '/roadmap',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Roadmap /> },
      // { path: 'about-us', element: <AboutUs /> },
    ],
  },
  {
    path: '/faq',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Faq /> },
      // { path: 'about-us', element: <AboutUs /> },
    ],
  },
  // {
  //   path: '/about-us',
  //   element: <CommonLayout />,
  //   children: [{ path: '', element: <CommonLayout /> }],
  // },
  {
    path: '/create-character',
    element: <InsideLayout />,
    children: [
      { index: true, element: <CreateCharacter /> },
      // { path: 'home', element: <CreateCharacter /> },
    ],
  },
  {
    path: '/edit-character',
    element: <InsideLayout />,
    children: [
      { index: true, element: <EditCharacter /> },
      { path: 'editCharacter', element: <EditCharacter /> },
    ],
  },
  {
    path: '/edit-characterPage/:id',
    element: <InsideLayout />,
    children: [
      { index: true, element: <EditCharacterPage /> },
      // { path: 'edit-characterPage/:id', element: <EditCharacterPage /> },
    ],
  },
  {
    path: '/all-top-models',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <AllTopModels /> },
      { path: '/all-top-models', element: <AllTopModels /> },
    ],
  },
  {
    path: '/all-top-models-inside',
    element: <InsideLayout />,
    children: [
      { index: true, element: <AllTopModelsIndise /> },
      { path: '/all-top-models-inside', element: <AllTopModelsIndise /> },
    ],
  },
  {
    path: '/owned-character',
    element: <InsideLayout />,
    children: [
      { index: true, element: <OwnedCharacter /> },
      { path: '/owned-character', element: <OwnedCharacter /> },
    ],
  },
  {
    path: '/all-free-models',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <AllFreeModels /> },
      { path: '/all-free-models', element: <AllFreeModels /> },
    ],
  },
  {
    path: '/all-free-models-inside',
    element: <InsideLayout />,
    children: [
      { index: true, element: <AllFreeModelsInside /> },
      { path: '/all-free-models-inside', element: <AllFreeModelsInside /> },
    ],
  },
  {
    path: '/contact',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Contact /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/chat',
    children: [
      { index: true, element: <Chat /> },
      // { path: 'home', element: <Chat /> },
    ],
  },
  {
    path: '/character-details',
    element: <InsideLayout />,
    children: [
      { index: true, element: <CharacterDetails /> },
      // { path: 'character-details', element: <CharacterDetails /> },
    ],
  },
  {
    path: '/profile',
    element: <InsideLayout />,
    children: [
      { index: true, element: <Profile /> },
      // { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/pricing',
    element: <InsideLayout />,
    children: [
      { index: true, element: <Pricing /> },
      // { path: 'pricing', element: <Pricing /> },
    ],
  },
  {
    path: '/subscription-history',
    element: <InsideLayout />,
    children: [
      { index: true, element: <SubscriptionHistory /> },
      // { path: 'pricing', element: <Pricing /> },
    ],
  },
  {
    path: '/community-guidelines',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <CommunityGuidelines /> },
      // { path: 'community-guidelines', element: <CommunityGuidelines /> },
    ],
  },
  {
    path: '/privacy-policy',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <PrivacyPolicy /> },
      // { path: 'privacy-policy', element: <PrivacyPolicy /> },
    ],
  },
  {
    path: '/Terms-of-Use',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <TermsOfUse /> },
      // { path: 'Terms-of-Use', element: <TermsOfUse /> },
    ],
  },
  {
    path: '/google-redirect',
    element: <GoogleRedirect />,
  },
  {
    path: '/payment',
    element: <InsideLayout />,
    children: [
      { index: true, element: <Payment /> },
      // { path: 'payment', element: <Payment /> },
    ],
  },
  {
    path: '/payment-redirect',
    element: <InsideLayout />,
    children: [
      { index: true, element: <PaymentRedirect /> },
      // { path: 'payment-redirect', element: <PaymentRedirect /> },
    ],
  },
  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;
