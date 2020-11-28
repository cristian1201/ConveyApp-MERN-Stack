import React, { useState, useEffect } from "react"

import "../utils/globals.css"
import Layout from "../components/layout"
import { getShipments } from "../services/orderService";
import { Link } from "gatsby";
import images from "../constants/images";

function OrderPage() {
    const [state, setState] = useState({
        shipments: [],
        current: 0,
        total: 0
    });

    useEffect(() => {
        getData();
    }, []);

    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    const getData = async () => {
        const { data: shipments } = await getShipments(id);

        var total = 0;

        shipments.forEach(item => {
            if (item.quantity !== undefined) total += item.quantity;
        });

        const data = {
            shipments: shipments,
            current: 0,
            total: total
        };
        setState(data);
    };

    const getQuantityOfCurrentShipment = () => {
        if (state.shipments.length === 0) return 0;
        if (state.shipments[0].quantity === undefined) return 0;
        return state.shipments[0].quantity;
    };

    const userFriendlyStatus = {
        "B": "B",
        'in_transit': "In Transit",
        'scheduled': "Scheduled"
    };

    console.log(state);

    const PanelHeader = ({ children }) => {
        if (state.shipments.length === 0) return (<p className="text-xl">No Shipments</p>);
        const currentShipment = state.shipments[state.current];
        const date = new Date(currentShipment.dates.estimatedDeliveryDate);
        return (
            <div className="flex flex-col items-center text-xl">
                <p className="font-bold">{userFriendlyStatus[currentShipment.status]}</p>
                <div className="flex">
                    Estimated Delivery: 
                    <p className="font-bold">{date.toLocaleDateString([], { day: 'numeric', month: 'short', weekday: 'short' })}</p>
                </div>
            </div>
        );
    };

    const EventList = ({ children, className }) => {
        if (state.shipments.length === 0) return "";
        // const carrier = state.shipments[state.current].carrier;
        var buffer = "";
        const events = state.shipments[state.current].events.sort((a, b) => { return a.createdDateTime > b.createdDateTime; });
        return events.map((event, index) => {
            const dt = new Date(event.createdDateTime);
            var showDate = true;

            if (index !== 0 && dt.toDateString() === buffer) showDate = false;

            buffer = dt.toDateString();
            return (<div className={"flex flex-col px-3 " + className} key={index}>
                {showDate && <p className="text-lg pt-3 font-bold">{dt.toLocaleDateString([], { day: 'numeric', month: 'short', weekday: 'short' })}</p>}
                <div className="flex justify-between bg-gray-200 my-2 p-3">
                    <div className="flex flex-col justify-center pr-2">
                        <img className="h-6" src={images.IMAGE_FEDEX}></img>
                        <p className="text-gray-600 mt-2">
                            {dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                    </div>
                    <div className="border-l"></div>
                    <div className="flex flex-col justify-center w-full pl-2">
                        <div className="flex w-full justify-between">
                            <p className="text-lg mb-2 font-bold">{userFriendlyStatus[event.status]}</p>
                            {event.status === "in_transit" && <p>{event.city}, <strong>{event.state}</strong></p>}
                        </div>
                        <p>{event.statusDesc}</p>
                    </div>

                </div>
            </div>)
        });
    };
    return (
        <Layout>
            <div className="mx-auto lg:pl-20 flex justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
                <div className="flex min-w-full justify-between flex-col">
                    <div className="flex flex-col min-w-full ">
                        <div className="p-10 flex mx-auto">
                            This shipment includes {getQuantityOfCurrentShipment()} of your {state.total} items.
                            <p className="font-bold underline">See Full Order</p>
                        </div>
                        <div className="flex mb-16">
                            <div className="bg-white flex flex-col w-1/2 mx-2 shadow">
                                <img className="mx-auto p-8" src={images.IMAGE_PICKUP}></img>
                                <PanelHeader />
                                <div className="my-10 border-b"></div>
                                <EventList className="mx-5" />
                            </div>
                            <div className="flex flex-col w-1/2 mx-2 shadow">
                                <img className="w-full" src={images.IMAGE_PROMO}></img>
                                <div className="bg-customBlack h-full flex flex-col justify-center items-center pt-5 pb-10">
                                    <p className="text-5xl text-white pb-5">Gift holiday cheer!</p>
                                    <button className="mx-auto bg-white rounded-lg px-6 py-4 text-gray-900 uppercase">
                                        shop our gift guide
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="mx-auto bg-primary rounded-lg px-6 py-4 mb-16 text-white uppercase">
                            see all items in your order
                        </button>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default OrderPage
