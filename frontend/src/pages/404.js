import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import "../utils/globals.css"
import Layout from "../components/layout"

function NotFound() {
  return (
    <Layout>
      <div className="mx-auto pl-10 bg-mainBack lg:pl-20 flex justify-between min-h-screen" style={{ paddingTop: "89px", maxWidth: "1440px" }}>
        <div className="flex min-w-full justify-between flex-col">
          <div className="flex flex-col min-w-full ">
            <p className="p-10 mx-auto">Not found.</p>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default NotFound
