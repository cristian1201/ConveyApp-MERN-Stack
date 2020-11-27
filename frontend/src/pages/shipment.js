import React from "react"

import "../utils/globals.css"
import Layout from "../components/layout"
import { Router } from "@reach/router"

const SomeSubPage = (props) => {
    return (
        <div>
            Hi from SubPage with id: {props.id}
        </div>
    )
};

function ShipmentPage() {
    return (
        <Layout>
            <div className="mx-auto pl-10 bg-mainBack lg:pl-20 flex justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
                <div className="flex min-w-full justify-between flex-col">
                    <div className="flex flex-col min-w-full ">
                        <p className="p-10 mx-auto">There are 2 orders and please select.</p>
                        <Router>
                            <SomeSubPage path="/shipment/:id" />
                        </Router>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default ShipmentPage
