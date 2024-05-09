"use client";

import { useEffect, useState } from "react";
const BestContributedBuyer = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    fetch("/api/purchases/repeatbuyer")
      .then((response) => response.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);
  return (
    <div className="py-10">
      <p className="text-4xl font-bold text-center uppercase py-6">
        Best Buyers
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 py-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Total quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total price
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.buyerName}
                </td>
                <td className="px-6 py-4">{item.buyerEmail}</td>
                <td className="px-6 py-4">{item.totalQuantity}</td>
                <td className="px-6 py-4">${item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestContributedBuyer;
