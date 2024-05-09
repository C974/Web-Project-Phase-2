"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import AllOrderList from "../components/AllOrderList";
import BestContributedBuyer from "../components/BestContributedBuyer";
import BestProducts from "../components/BestProducts";
import BuyerList from "../components/BuyerList";
import Chart from "../components/Chart";

const Statistics = () => {
  const [products, setProducts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [buyers, setBuyers] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetch("/api/buyers")
      .then((response) => response.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);

  useEffect(() => {
    fetch("/api/purchases/totalprice")
      .then((response) => response.json())
      .then((data) => setTotalPrice(data))
      .catch((error) =>
        console.error("Error fetching total price per year:", error)
      );
  }, []);
  useEffect(() => {
    fetch("/api/purchases/avgprice")
      .then((response) => response.json())
      .then((data) => setAvgPrice(data))
      .catch((error) =>
        console.error("Error fetching total price per year:", error)
      );
  }, []);

  useEffect(() => {
    const fetchBuyersData = async () => {
      try {
        const response = await fetch("/api/purchases/buyer");
        const data = await response.json();
        setBuyers(data);
      } catch (error) {
        console.error("Error fetching buyers data:", error);
      }
    };

    fetchBuyersData();
  }, []);
  console.log(buyers);
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Calculate buyers by location based on selected location
  const calculateBuyersByLocation = () => {
    const buyersByLocation = {};
    buyers.forEach((buyer) => {
      const location = buyer.city;
      buyersByLocation[location] = (buyersByLocation[location] || 0) + 1;
    });
    return buyersByLocation;
  };

  const buyersByLocation = calculateBuyersByLocation();
  return (
    <>
      <Navbar />
      <div className="w-[95%] mx-auto py-10">
        <AllOrderList />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-full w-full px-6 py-10 rounded-md shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-4">
            <p className="text-2xl font-semibold text-center">Total Amaount</p>
            <p className="text-lg font-semibold text-center">${totalPrice}</p>
            <p className="text-lg font-semibold text-center">
              Avg price: ${avgPrice}
            </p>
          </div>
          {/* buyer location */}
          <div className="h-full w-full px-6 py-10 rounded-md shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-4">
            <p className="text-2xl font-semibold text-center">
              Purchases By Location
            </p>
            <select
              onChange={handleLocationChange}
              value={selectedLocation}
              className="border w-[250px] px-2 py-1 rounded-md outline-none"
            >
              <option value="">Select a location</option>
              {Object.keys(buyersByLocation).map((location) => (
                <option key={location} value={location}>
                  {location} ({buyersByLocation[location]} buyers)
                </option>
              ))}
            </select>
            <p>
              Selected location:
              <span className="text-red-700 font-semibold pl-2">
                {selectedLocation}
              </span>
            </p>
            <p>
              Selected buyer:
              <span className="text-green-700 font-semibold pl-2">
                {buyersByLocation[selectedLocation]}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-10 gap-4">
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-lg">
            <Link href="/products"> Product List</Link>
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-lg">
            <Link href="/addbuyer">Add Buyer </Link>
          </button>
          <button className="px-4 py-2 rounded-lg bg-orange-500 text-white font-lg">
            <Link href="/purchase">Purchase list </Link>
          </button>
        </div>
        <BestContributedBuyer />
        <BestProducts />
        <BuyerList />

        <Chart />
      </div>
      <Footer />
    </>
  );
};

export default Statistics;
