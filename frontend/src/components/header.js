import React, { useState } from "react"
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import images from '../constants/images'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function Header() {
  var [modal, setModal] = useState(false);
  const [isExpanded, toggleExpansion] = useState(false);
  return (
    <header>
      <Location>
        {({ location }) => {

          const lastPos = location.pathname.lastIndexOf('/');
          const len = location.pathname.length;
          const pathName = location.pathname.substr(0, lastPos === 0 ? len : lastPos);

          return (
            <div className={"flex mx-auto flex-wrap items-center justify-between z-50 " + (isMobile ? "px-3" : "px-10 lg:px-20")} style={{ maxWidth: "1440px" }}>
              <div className="my-auto">
                <Link to="/" className="">
                  <img
                    src={images.IMAGE_LOGO}
                    className={"pt-1 " + (isMobile ? "w-logomobile h-logomobile" : "w-logo h-logo md:w-logosmd md:h-logosmd")}
                    alt="page elements shape"
                  />
                </Link>
              </div>
              <button
                className="flex my-auto float-right items-center  text-lightBlack rounded md:hidden"
                onClick={() => isMobile ? setModal(true) : toggleExpansion(!isExpanded)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
              </button>
              <nav
                className={`${
                  isExpanded ? `block` : `hidden`
                  } md:flex md:items-center w-full md:w-auto`}
              >
                {[
                  {
                    route: `/`,
                    title: `men`,
                  },
                  {
                    route: `/`,
                    title: `women`,
                  },
                  {
                    route: `/`,
                    title: `kids`,
                  },
                  {
                    route: `/`,
                    title: `home`,
                  },
                  {
                    route: `/`,
                    title: `sale`,
                  },
                  {
                    route: `/`,
                    title: `get help`,
                  },
                ].map((link, index) => (
                  <div className="relative" key={index}>
                    <Link
                      className={"block text-center text-base md:inline-block md:mx-4 mb-2 md:mb-0 no-underline  hover:bg-gray-300 md:hover:bg-white uppercase"
                        + (link.route === pathName ? " text-gray-900  hover:text-gray-900 " : " text-lightBlack hover:text-gray-900")}

                      key={link.title}
                      to={link.route}
                    >
                      {link.title}
                    </Link>
                  </div>
                ))}
              </nav>
              <PureModal
                className="w-8/12 min-h-full bg-white"
                isOpen={modal}
                closeButton={
                  <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                    <img src={images.IMAGE_IC_CLOSE}></img>
                  </span>
                }
                closeButtonPosition='header'
                onClose={() => {
                  setModal(false)
                  return true;
                }}
              >
                <div className="flex flex-col min-h-screen items-center justify-center" style={{ margin: '-15px' }}>
                  {[
                    {
                      route: `/`,
                      title: `men`,
                    },
                    {
                      route: `/`,
                      title: `women`,
                    },
                    {
                      route: `/`,
                      title: `kids`,
                    },
                    {
                      route: `/`,
                      title: `home`,
                    },
                    {
                      route: `/`,
                      title: `sale`,
                    },
                    {
                      route: `/`,
                      title: `get help`,
                    },
                  ].map((link, index) => (
                    <div className="relative items-center uppercase" key={index}>
                      <Link
                        className={"block text-center text-xl mb-2 no-underline"
                          + (link.route === pathName ? " text-primary font-bold hover:text-primary " : " text-lightBlack hover:text-gray-900")}

                        key={link.title}
                        to={link.route}
                      >
                        <div className="h-16 w-48 flex flex-col justify-center items-center border-b">
                          {link.title}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </PureModal>
            </div>
          );
        }}
      </Location>
    </header >
  );
}


export default Header;

