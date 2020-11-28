import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import "../utils/globals.css"
import Layout from "../components/layout"
import images from "../constants/images"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { getOrders } from "../services/orderService"

function IndexPage() {
  var [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data: data } = await getOrders();
    setOrders(data);
    console.log(data);
  };

  console.log("isMobile: " + isMobile);
  return (
    <Layout>
      <div className="mx-auto pl-10 lg:pl-20 flex justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
        <div className="flex min-w-full justify-between flex-col">
          <div className="flex flex-col min-w-full ">
            <p className="p-10 mx-auto">There are 2 orders and please select.</p>
            <div className="mx-15p flex flex-wrap">
              {orders.map((order, index) => (
                <Link to={order.shipments.length === 0 ? "/none" : "/order/" + order.orderNumber} key={index}>
                  <div className="m-2 rounded-lg text-white px-10 py-5 bg-primary">
                    Order {index + 1}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default IndexPage
