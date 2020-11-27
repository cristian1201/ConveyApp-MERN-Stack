import React from "react"
import { Link } from "gatsby"

import "../utils/globals.css"
import Layout from "../components/layout"

function NonePage() {
    return (
        <Layout>
            <div className="mx-auto pl-10 bg-mainBack lg:pl-20 flex flex-col justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
                <div className="p-20 mx-auto">
                    <p className="text-2xl mb-16">The order has no shipment.</p>
                    <Link to="/">
                        <button className="bg-primary rounded-xl px-5 py-2 text-white">Back</button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default NonePage;