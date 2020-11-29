import React, { useState, useEffect } from "react"

import "../utils/globals.css"
import Layout from "../components/layout"
import { getShipments } from "../services/orderService";
import { Link } from "gatsby";
import images from "../constants/images";
import Modal from "react-modal";


function OrderPage() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const [shipments, setShipments] = useState([]);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);

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

        setShipments(shipments);
        setTotal(total);
    };

    const getQuantityOfCurrentShipment = () => {
        if (shipments.length === 0) return 0;
        if (shipments[current].quantity === undefined) return 0;
        return shipments[current].quantity;
    };

    const userFriendlyStatus = {
        "B": "B",
        'in_transit': "In Transit",
        'scheduled': "Scheduled"
    };


    const PanelHeader = ({ children }) => {
        if (shipments.length === 0) return (<p className="text-xl">No Shipments</p>);
        const currentShipment = shipments[current];
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
        if (shipments.length === 0) return "";
        // const carrier = shipments[current].carrier;
        var buffer = "";
        const events = shipments[current].events.sort((a, b) => { return a.createdDateTime > b.createdDateTime; });
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

    const ShipmentList = ({children, shipment, index}) => {
        const date = new Date(shipment.dates.estimatedDeliveryDate);
        console.log(index);
        return (
            <div className="flex flex-col py-5 border-b">
                <p className="text-gray-600 uppercase">estimated delivery</p>
                <p className="text-2xl font-bold mb-5">{ date.toLocaleDateString([], { day: 'numeric', month: 'short', weekday: 'short' }) }</p>
                <div className="flex justify-between">
                    <p>Quantity</p>
                    <p>{shipment.quantity}</p>
                </div>
                <div className="flex justify-between">
                    <p>Ref #</p>
                    <p>{shipment.referenceNumber}</p>
                </div>
                <div className="flex justify-between">
                    <p>Description</p>
                    <p style={{ maxWidth: "60%", textAlign:"right" }}>{shipment.description}</p>
                </div>
                <button className="primary-sm w-full mt-5" onClick={ () => {setCurrent(index); toggleModal();}}>see tracking details</button>
            </div>
        )
    };
    return (
        <Layout>
            <div className="mx-auto lg:pl-20 flex justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
                <div className="flex min-w-full justify-between flex-col">
                    <div className="flex flex-col min-w-full ">
                        <div className="p-10 flex mx-auto">
                            This shipment includes {getQuantityOfCurrentShipment()} of your {total} items.
                            <p className="font-bold underline cursor-pointer" onClick={toggleModal}>See Full Order</p>
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
                                    <button className="secondary">
                                        shop our gift guide
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="primary mb-16" onClick={toggleModal}>
                            see all items in your order
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        position: 'absolute',
                        top: '0',
                        left: '',
                        right: '0',
                        bottom: '0',
                        width: '400px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '0',
                        zIndex: 50
                    }
                }}
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
            >
                <div className="flex justify-between border-b p-5">
                    <p className="text-2xl">Order Overview</p>
                    <button onClick={toggleModal}>
                        <img src={images.IMAGE_IC_CLOSE}></img>
                    </button>
                </div>
                <div className="flex flex-col p-5">
                    { shipments.map((shipment, index) => (
                        <ShipmentList shipment={shipment} index={index} key={index} />
                    )) }
                </div>
            </Modal>
        </Layout >
    )
}

export default OrderPage
