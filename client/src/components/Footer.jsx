import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#e5edf3] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 site-footer">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <div className="flex items-center gap-2">
            <img
              src={assets.favicon}
              alt="favicon"
              className="h-6 w-6 brightness-0"
            />
            <h1 className="text-3xl font-bold text-gray-800">Bookotel</h1>
          </div>
          <p className="text-sm mt-3">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {/* Facebook */}
            <a href="#" className="w-6 transition-transform hover:scale-110">
              <img
                src={assets.facebookIcon}
                alt="facebook"
                className="w-full hover:[filter:drop-shadow(0_0_0_#1877F2)]"
              />
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-6 transition-transform hover:scale-110 relative group"
            >
              <img
                src={assets.instagramIcon}
                alt="instagram"
                className="w-full group-hover:opacity-0 transition-opacity"
              />
              <img
                src={assets.instagramIcon}
                alt="instagram"
                className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity [filter:drop-shadow(0_0_0_#833AB4)_drop-shadow(0_0_0_#FD1D1D)_drop-shadow(0_0_0_#F77737)]"
              />
            </a>
            {/* Twitter */}
            <a href="#" className="w-6 transition-transform hover:scale-110">
              <img
                src={assets.twitterIcon}
                alt="twitter"
                className="w-full hover:[filter:drop-shadow(0_0_0_#1DA1F2)]"
              />
            </a>
            {/* LinkedIn */}
            {/* <a href="#" className="w-6 transition-transform hover:scale-110">
              <img
                src={assets.linkendinIcon}
                alt="linkedin"
                className="w-full hover:[filter:drop-shadow(0_0_0_#0077B5)]"
              />
            </a> */}
          </div>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Cancellation Options</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            {/* <li>
              <a href="#">Accessibility</a>
            </li> */}
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              {/* Arrow icon */}
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5 invert"
              />
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-3" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Bookotel. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
