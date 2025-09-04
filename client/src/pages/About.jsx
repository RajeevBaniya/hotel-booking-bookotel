import React, { useEffect, useState } from "react";

const About = () => {
  const SLIDE_INTERVAL_MS = 5000;
  const images = [
    "/images/room.jpeg",
    "/images/room2.jpg",
    "/images/room3.jpg",
    "/images/room4.jpeg",
    "/images/room5.jpg",
    "/images/room6.jpg",
    "/images/room7.jpg",
    "/images/room8.jpg",
    "/images/room9.png",
    "/images/room10.png",
    "/images/room11.png",
    "/images/room12.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [images.length]);
  return (
    <div className="bg-white text-gray-800">
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center opacity-20 transition-opacity duration-700"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
        </div>
        <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-28 md:pt-36 pb-14 md:pb-20 min-h-[70vh] md:min-h-[80vh] flex flex-col justify-end">
          <span className="inline-flex w-fit items-center text-xs tracking-widest uppercase bg-[#0a4a78] text-white rounded-full px-3 py-1 shadow-sm">
            Our Story
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 max-w-3xl font-playfair">
            Crafted Stays for Modern Travelers Who Love Comfort and Design
          </h1>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-gray-600 max-w-2xl">
            Bookotel brings curated hotels villas and city escapes together in one elegant place. Find destinations that feel like home and service that feels personal.
          </p>
        </div>
      </section>

      {/* value props */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl shadow-sm border p-6 bg-gradient-to-br from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <h3 className="text-xl font-semibold text-gray-900 font-playfair">Handpicked Stays</h3>
            <p className="mt-2 text-gray-700">
              Every property is reviewed for location comfort and design so you can book with confidence.
            </p>
          </div>
          <div className="rounded-2xl shadow-sm border p-6 bg-gradient-to-br from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <h3 className="text-xl font-semibold text-gray-900 font-playfair">Transparent Pricing</h3>
            <p className="mt-2 text-gray-700">
              Clear rates secure checkout and no surprises at the end of your journey.
            </p>
          </div>
          <div className="rounded-2xl shadow-sm border p-6 bg-gradient-to-br from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <h3 className="text-xl font-semibold text-gray-900 font-playfair">Human Support</h3>
            <p className="mt-2 text-gray-700">
              Our team is available to help with date changes special requests and local tips.
            </p>
          </div>
        </div>
      </section>

      {/* trust badges */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-8 md:pb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <div className="flex-1 rounded-full border shadow-sm px-5 py-3 flex items-center gap-3 bg-gradient-to-r from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <svg className="h-5 w-5 text-[#0a4a78]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <p className="text-gray-800 font-medium">Secure Payments</p>
          </div>
          <div className="flex-1 rounded-full border shadow-sm px-5 py-3 flex items-center gap-3 bg-gradient-to-r from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <svg className="h-5 w-5 text-[#0a4a78]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
            <p className="text-gray-800 font-medium">24/7 Support</p>
          </div>
          <div className="flex-1 rounded-full border shadow-sm px-5 py-3 flex items-center gap-3 bg-gradient-to-r from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <svg className="h-5 w-5 text-[#0a4a78]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z"/></svg>
            <p className="text-gray-800 font-medium">Best Price Guarantee</p>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-10 md:pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a4a78] via-[#085a8f] to-[#046494] text-white p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold">1000+</p>
              <p className="text-white/80">Verified Stays</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold">98%</p>
              <p className="text-white/80">Guest Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold">30+</p>
              <p className="text-white/80">Cities Worldwide</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold">24/7</p>
              <p className="text-white/80">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border shadow-sm p-6 md:p-8 bg-gradient-to-br from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px] border-[#bfdbfe]">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair">Our Mission</h2>
            <p className="mt-3 text-gray-600">
              Travel should be simple inspiring and reliable. We partner with hosts who care about the little details from crisp linens to effortless check in so your stays feel premium without being complicated.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2 leading-relaxed"><span className="h-2 w-2 rounded-full bg-[#0a4a78]"/>Fair and flexible policies</li>
              <li className="flex items-center gap-2 leading-relaxed"><span className="h-2 w-2 rounded-full bg-[#0a4a78]"/>Eco conscious choices</li>
              <li className="flex items-center gap-2 leading-relaxed"><span className="h-2 w-2 rounded-full bg-[#0a4a78]"/>Local experiences curated for you</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#ffffff,rgba(255,255,255,0.6))] border border-white/50 backdrop-blur-md p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 font-playfair">Why Travelers Choose Us</h3>
            <p className="mt-3 text-gray-600">
              We combine design led spaces with reliable tech and responsive support so you can focus on the journey not the logistics.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white shadow-sm border border-[#bfdbfe] p-4">
                <p className="text-sm text-gray-500">Average Check‑In Time</p>
                <p className="text-2xl font-bold text-gray-900">2 min</p>
              </div>
              <div className="rounded-xl bg-white shadow-sm border border-[#bfdbfe] p-4">
                <p className="text-sm text-gray-500">Partner Hotels</p>
                <p className="text-2xl font-bold text-gray-900">100+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-12 md:pb-16">
        <div className="rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8 bg-gradient-to-br from-[#0a4a78]/10 via-[#085a8f]/10 to-transparent backdrop-blur-[2px]">
          <h3 className="text-xl font-semibold text-gray-900 font-playfair">Frequently Asked Questions</h3>
          <div className="mt-4 divide-y divide-gray-100">
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-gray-800 font-medium">
                How do cancellations work?
                <span className="ml-4 h-5 w-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 text-gray-600">Most stays offer flexible policies. You can review the exact policy on each room before you book.</p>
            </details>
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-gray-800 font-medium">
                Is my payment secure?
                <span className="ml-4 h-5 w-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 text-gray-600">Yes we use PCI compliant processors and industry standard encryption to protect your data.</p>
            </details>
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-gray-800 font-medium">
                Can I request early check‑in?
                <span className="ml-4 h-5 w-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 text-gray-600">Absolutely add your request at checkout or contact support and we will coordinate with the host.</p>
            </details>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-16">
        <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0a4a78] via-[#085a8f] to-[#046494] text-white shadow-md">
          <div>
            <h4 className="text-xl md:text-2xl font-bold font-playfair">Ready for Your Next Getaway</h4>
            <p className="text-white/80 mt-1">Browse our latest destinations and exclusive offers.</p>
          </div>
          <a href="/rooms" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#0a4a78] text-white hover:bg-[#063a5c] border border-white transition-colors">
            Explore Stays
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;


