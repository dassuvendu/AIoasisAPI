import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionHistory } from "../../reducers/PlanSlice";

const SubscriptionHistory = () => {
  const dispatch = useDispatch();
  const [subscriptionHistoryList, setSubscriptionHistoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  // Fetching subscription history from the store
  const subsHistory = useSelector(
    (state) => state.plans?.subscriptionHistoryList
  );

  // Date formatting function
  const dateFormatting = (date) => {
    // Format the date as "yyyy-mm-dd"
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    dispatch(subscriptionHistory());
  }, []);

  useEffect(() => {
    if (Object.keys(subsHistory).length) {
      setSubscriptionHistoryList(subsHistory);
    }
  }, [subsHistory]);

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscriptionHistoryList?.history?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const nextPage = () => {
    if (
      currentPage <
      Math.ceil(subscriptionHistoryList?.history.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      {subscriptionHistoryList.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mx-8">
          <h2 className="mb-4 text-lg font-bold text-[#00a3ff] lg:text-2xl">
            Subscription History
          </h2>
          <div className="flex p-4 bg-white border shadow-2xl md:p-8 rounded-2xl">
            <table className="min-w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/4 text-black text-left">
                    Subscription ID
                  </th>
                  <th className="w-1/4 text-black text-left">Plan Name</th>
                  <th className="w-1/4 text-black text-left">Purchased Date</th>
                  <th className="w-1/4 text-black text-left">End Date</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="border p-2 text-black">{subscription.id}</td>
                    <td className="border p-2 text-black">
                      {subscription.plan.name}
                    </td>
                    <td className="border p-2 text-black">
                      {dateFormatting(new Date(subscription.plan_period_start))}
                    </td>
                    <td className="border p-2 text-black">
                      {dateFormatting(new Date(subscription.plan_period_end))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                marginRight: "auto",
                background: "lightgreen",
                color: "white",
                padding: "5px 10px",
              }}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={
                currentPage >=
                Math.ceil(
                  subscriptionHistoryList?.history.length / itemsPerPage
                )
                  ? "disabled"
                  : ""
              }
              style={{
                marginLeft: "auto",
                background: "lightblue",
                color: "white",
                padding: "5px 10px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionHistory;
