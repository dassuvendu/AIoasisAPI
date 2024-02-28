import { useEffect, useState } from "react";
import { AiOutlineCheck } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSubscription,
  subscriptionPlans,
} from "../../reducers/PlanSlice";
import Payment from "./payment";
import { editProfile } from "../../reducers/MyProfileSlice";
import { stripePayment, stripePlanKeys } from "../../reducers/PaymentSlice";

const Pricing = () => {
  const dispatch = useDispatch();
  const { userPlan, profile } = useSelector((state) => state.profile);
  const plansList = useSelector((state) => state.plans?.plans);
  // const planId = localStorage.getItem('planId')?.planId;
  const { email, user_id } = useSelector((state) => state.auth?.currentUser);
  const planId = JSON.parse(localStorage.getItem("isSubscribed"))?.isSubscribed;

  const [plans, SetPlans] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cancellationStatus, setCancellationStatus] = useState("active");

  const [showPayment, setShowPayment] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: null,
    user_id: profile?.details?.id,
    plan_id: null,
  });

  useEffect(() => {
    setUserId(profile?.details?.id);
  }, [profile]);

  const [showSubscription, setShowSubscription] = useState(true);
  const [userPlanDetails, setUserPlanDetails] = useState();

  useEffect(() => {
    if (Object.keys(userPlan).length) {
      setUserPlanDetails(userPlan);
    }
  }, [userPlan]);

  const subscribedPlan = plans.find((plan) => plan.id === planId);
  const {
    stripeClientSecret,
    customer_id,
    subscription_id,
    stripePublishableKey,
  } = useSelector((state) => state.payment);

  const createSubscription = (planId) => {
    setUserDetails(() => ({
      ...userDetails,
      plan_id: planId,
    }));
    dispatch(stripePlanKeys());
    dispatch(
      stripePayment({
        plan_id: planId,
        user_id: userId,
        entity: "payment_intent",
      })
    );
    setShowPayment(true);
    setShowSubscription(false);
  };

  const handleCancelSubscription = () => {
    const cancelUserSubscription = {
      user_id: userId,
      stripe_subscription_id: userPlan?.details?.stripe_subscription_id,
      entity: "cancel_subscription",
    };

    dispatch(cancelSubscription(cancelUserSubscription))
      .then((result) => {
        console.log("Subscription canceled successfully");
        setCancellationStatus("cancelled");
        localStorage.setItem("cancellationStatus", "cancelled");
      })
      .catch((error) => {
        console.error("Failed to cancel subscription", error);
        setCancellationStatus("active");
        localStorage.setItem("cancellationStatus", "active");
      });
  };

  const dateFormatting = (date) => {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const purchaseDate = new Date(userPlanDetails?.details?.plan_period_start);
  const endDate = new Date(userPlanDetails?.details?.plan_period_end);
  const stripe_subscription_id =
    userPlanDetails?.details?.stripe_subscription_id;
  const isActive = userPlanDetails?.details?.subscription;

  // Determine if the subscription is active
  const isSubscriptionActive = isActive === "active";

  useEffect(() => {
    dispatch(subscriptionPlans()).then(() => {
      setUserDetails({
        email: email,
        user_id: user_id,
      });
      dispatch(editProfile());
    });
  }, []);

  useEffect(() => {
    SetPlans(plansList);
  }, [plansList]);

  return (
    <>
      {showSubscription && (
        <div className="create_character_wrap px-3 md:px-0 ml-0 md:ml-4">
          <div className="py-0 lg:py-0">
            <div className="container mx-auto my-0">
              <div className="grid grid-cols-3 gap-4">
                {subscribedPlan ? (
                  <div className="p-4 bg-white rounded-2xl border border-[#00a3ff] shadow-xl">
                    <p className="iconcolor text-2xl font-bold mb-3 text-center">
                      {subscribedPlan.name}
                    </p>
                    <p className="text-black text-4xl font-bold mb-3 text-center">
                      {subscribedPlan.currency} {subscribedPlan.price}
                      <span className="iconcolor text-base">
                        {subscribedPlan.plan_interval}
                      </span>
                    </p>
                    <ul className="mb-4">
                      {subscribedPlan.description
                        .split("#")
                        .map((desc, ind) => (
                          <li
                            key={ind}
                            className="text-sm font-medium pb-1 flex items-top"
                          >
                            <AiOutlineCheck className="text-base mr-1" /> {desc}
                          </li>
                        ))}
                    </ul>
                    <div className="flex">
                      <button className="w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-[#00a3ff] hover:bg-black mr-2">
                        <span className="text-white font-medium">Active</span>
                      </button>

                      {cancellationStatus === "active" ? (
                        <button className="w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-[#00a3ff] hover:bg-black">
                          <span
                            className="text-white font-medium "
                            onClick={() => handleCancelSubscription()}
                          >
                            Cancel
                          </span>
                        </button>
                      ) : (
                        <p style={{ color: "red" }}>
                          Subscription has been cancelled.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-[#00a3ff] shadow-xl">
                      <p className="iconcolor text-2xl font-bold mb-3 text-center">
                        Free Plan
                      </p>
                      <p className="text-black text-4xl font-bold mb-3 text-center">
                        USD 0<span className="iconcolor text-base">/mo</span>
                      </p>
                      <ul className="mb-4">
                        <li className="text-sm font-medium pb-1 flex items-top">
                          <AiOutlineCheck className="text-base mr-1" /> 50 free
                          messages
                        </li>
                        <li className="text-sm font-medium pb-1 flex items-top">
                          <AiOutlineCheck className="text-base mr-1" /> Create 5
                          free bots
                        </li>
                        <li className="text-sm font-medium pb-1 flex items-top">
                          <AiOutlineCheck className="text-base mr-1" /> Interact
                          with 5 different bots which are not theirs
                        </li>
                        <li className="text-sm font-medium pb-1 flex items-top">
                          <AiOutlineCheck className="text-base mr-1" />5
                          conversations back up maximum
                        </li>
                      </ul>
                    </div>
                    {Array.isArray(plans) &&
                      plans?.length > 0 &&
                      plans?.map((plan, plankey) => (
                        <div
                          className="p-4 bg-white rounded-2xl border border-[#00a3ff] shadow-xl"
                          key={"plan_" + plankey}
                        >
                          <p className="iconcolor text-2xl font-bold mb-3 text-center">
                            {plan.name || "plan name"}
                          </p>
                          <p className="text-black text-4xl font-bold mb-3 text-center">
                            {plan.currency} {plan.price}
                            <span className="iconcolor text-base">
                              {plan.plan_interval}
                            </span>
                          </p>
                          <ul className="mb-4">
                            {plan.description.split("#").map((desc, ind) => (
                              <li
                                key={ind}
                                className="text-sm font-medium pb-1 flex items-top"
                              >
                                <AiOutlineCheck className="text-base mr-1" />{" "}
                                {desc}
                              </li>
                            ))}
                          </ul>
                          <button
                            className="w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-white bg-[#00a3ff] hover:bg-black"
                            onClick={() => {
                              createSubscription(plan.id, user_id);
                            }}
                          >
                            <span className="text-white font-medium">
                              Subscribe
                            </span>
                          </button>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showPayment &&
        stripeClientSecret &&
        customer_id &&
        subscription_id &&
        stripePublishableKey && (
          <Payment
            planId={userDetails.plan_id}
            email={userDetails.email}
            user_id={userId}
            stripeClientSecret={stripeClientSecret}
            stripePublishableKey={stripePublishableKey}
            customer_id={customer_id}
            subscription_id={subscription_id}
          />
        )}
    </>
    //   {/* {showSubscription && planId && subscribedPlan ? (
    //     <div className='create_character_wrap px-3 md:px-0 ml-0 md:ml-4'>
    //       <div className='py-0 lg:py-0'>
    //         <div className='container mx-auto my-0'>
    //           <div className='grid grid-cols-3 gap-4'>
    //             <div className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'>
    //               <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                 {subscribedPlan.name}
    //               </p>
    //               <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                 {subscribedPlan.currency} {subscribedPlan.price}
    //                 <span className='iconcolor text-base'>
    //                   {subscribedPlan.plan_interval}
    //                 </span>
    //               </p>
    //               <ul className='mb-4'>
    //                 {subscribedPlan.description.split('#').map((desc, ind) => (
    //                   <li
    //                     key={ind}
    //                     className='text-sm font-medium pb-1 flex items-top'
    //                   >
    //                     <AiOutlineCheck className='text-base mr-1' /> {desc}
    //                   </li>
    //                 ))}
    //               </ul>
    //               <div className='flex'>
    //                 <button className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black mr-2'>
    //                   <span className='text-white font-medium'>Active</span>
    //                 </button>

    //                 <button className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black'>
    //                   <span
    //                     className='text-white font-medium'
    //                     onClick={() => handleCancelSubscription()}
    //                   >
    //                     Cancel
    //                   </span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <div className='create_character_wrap px-3 md:px-0 ml-0 md:ml-4'>
    //         <div className='py-0 lg:py-0'>
    //           <div className='container mx-auto my-0'>
    //             <div className='grid grid-cols-3 gap-4'>
    //               <div className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'>
    //                 <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                   Free Plan
    //                 </p>
    //                 <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                   USD 0<span className='iconcolor text-base'>/mo</span>
    //                 </p>
    //                 <ul className='mb-4'>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> 50 free
    //                     messages
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> Create 3
    //                     free bots
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> Interact
    //                     with 5 different bots which are not theirs
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' />5
    //                     conversations back up maximum
    //                   </li>
    //                 </ul>
    //               </div>
    //               {Array.isArray(plans) &&
    //                 plans?.length &&
    //                 plans?.map((plan, plankey) => (
    //                   <div
    //                     className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'
    //                     key={'plan_' + plankey}
    //                   >
    //                     <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                       {plan.name || 'plan name'}
    //                     </p>
    //                     <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                       {plan.currency} {plan.price}
    //                       <span className='iconcolor text-base'>/mo</span>
    //                     </p>
    //                     <ul className='mb-4'>
    //                       {plan.description.split('#').map((desc, ind) => (
    //                         <li
    //                           key={ind}
    //                           className='text-sm font-medium pb-1 flex items-top'
    //                         >
    //                           <AiOutlineCheck className='text-base mr-1' />{' '}
    //                           {desc}
    //                         </li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    //   {showPayment &&
    //     stripeClientSecret &&
    //     customer_id &&
    //     subscription_id &&
    //     stripePublishableKey && (
    //       <Payment
    //         planId={userDetails.plan_id}
    //         email={userDetails.email}
    //         user_id={userId}
    //         stripeClientSecret={stripeClientSecret}
    //         stripePublishableKey={stripePublishableKey}
    //         customer_id={customer_id}
    //         subscription_id={subscription_id}
    //       />
    //     )}
    // </> */}
    // <>
    //   {showSubscription && planId && subscribedPlan ? (
    //     <div className='create_character_wrap px-3 md:px-0 ml-0 md:ml-4'>
    //       <div className='py-0 lg:py-0'>
    //         <div className='container mx-auto my-0'>
    //           <div className='grid grid-cols-3 gap-4'>
    //             <div className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'>
    //               <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                 {subscribedPlan.name}
    //               </p>
    //               <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                 {subscribedPlan.currency} {subscribedPlan.price}
    //                 <span className='iconcolor text-base'>
    //                   {subscribedPlan.plan_interval}
    //                 </span>
    //               </p>
    //               <ul className='mb-4'>
    //                 {subscribedPlan.description.split('#').map((desc, ind) => (
    //                   <li
    //                     key={ind}
    //                     className='text-sm font-medium pb-1 flex items-top'
    //                   >
    //                     <AiOutlineCheck className='text-base mr-1' /> {desc}
    //                   </li>
    //                 ))}
    //               </ul>
    //               <div className='flex'>
    //                 <button className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black mr-2'>
    //                   <span className='text-white font-medium'>Active</span>
    //                 </button>

    //                 <button className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black'>
    //                   <span
    //                     className='text-white font-medium'
    //                     onClick={() => handleCancelSubscription()}
    //                   >
    //                     Cancel
    //                   </span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <div className='create_character_wrap px-3 md:px-0 ml-0 md:ml-4'>
    //         <div className='py-0 lg:py-0'>
    //           <div className='container mx-auto my-0'>
    //             <div className='grid grid-cols-3 gap-4'>
    //               <div className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'>
    //                 <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                   Free Plan
    //                 </p>
    //                 <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                   USD 0<span className='iconcolor text-base'>/mo</span>
    //                 </p>
    //                 <ul className='mb-4'>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> 50 free
    //                     messages
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> Create 3
    //                     free bots
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' /> Interact
    //                     with 5 different bots which are not theirs
    //                   </li>
    //                   <li className='text-sm font-medium pb-1 flex items-top'>
    //                     <AiOutlineCheck className='text-base mr-1' />5
    //                     conversations back up maximum
    //                   </li>
    //                 </ul>
    //               </div>
    //               {Array.isArray(plans) &&
    //                 plans?.length &&
    //                 plans?.map((plan, plankey) => (
    //                   <div
    //                     className='p-4 bg-white rounded-2xl border border-red-800 shadow-xl'
    //                     key={'plan_' + plankey}
    //                   >
    //                     <p className='iconcolor text-2xl font-bold mb-3 text-center'>
    //                       {plan.name || 'plan name'}
    //                     </p>
    //                     <p className='text-black text-4xl font-bold mb-3 text-center'>
    //                       {plan.currency} {plan.price}
    //                       <span className='iconcolor text-base'>/mo</span>
    //                     </p>
    //                     <ul className='mb-4'>
    //                       {plan.description.split('#').map((desc, ind) => (
    //                         <li
    //                           key={ind}
    //                           className='text-sm font-medium pb-1 flex items-top'
    //                         >
    //                           <AiOutlineCheck className='text-base mr-1' />{' '}
    //                           {desc}
    //                         </li>
    //                       ))}
    //                     </ul>
    //                     {/* {!subscribedPlan ? ( */}
    //                     <button
    //                       className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black'
    //                       onClick={() => {
    //                         createSubscription(plan.id, user_id);
    //                       }}
    //                     >
    //                       <span className='text-white font-medium'>
    //                         Subscribe
    //                       </span>
    //                     </button>
    //                     {/* ) : (
    //                       <button className='w-full block text-base font-normal mb-0 py-2 rounded-lg cursor-pointer text-center text-yellow-400 bg-red-900 hover:bg-black'>
    //                         <span className='text-white font-medium'>
    //                           Active
    //                         </span>
    //                       </button>
    //                     )} */}
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    //   {showPayment &&
    //     stripeClientSecret &&
    //     customer_id &&
    //     subscription_id &&
    //     stripePublishableKey && (
    //       <Payment
    //         planId={userDetails.plan_id}
    //         email={userDetails.email}
    //         user_id={userId}
    //         stripeClientSecret={stripeClientSecret}
    //         stripePublishableKey={stripePublishableKey}
    //         customer_id={customer_id}
    //         subscription_id={subscription_id}
    //       />
    //     )}
    // </>
  );
};

export default Pricing;
