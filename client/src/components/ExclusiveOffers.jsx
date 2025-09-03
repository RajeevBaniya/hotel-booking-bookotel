import React from "react";
import Title from "./Title";
import exclusiveOfferGif from "../assets/Dark Green and White Minimalist Geometric Shape House For Sale Video.gif";

// Background Animation Component
const BackgroundAnimation = () => (
  <>
    <div className="absolute top-0 left-0 w-32 h-32 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 right-0 w-32 h-32 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-32 h-32 md:w-72 md:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </>
);

const SectionHeader = () => {
  return (
    <div className="text-center mb-8 md:mb-12 relative z-10 px-4">
      <Title
        title="Discover Amazing Destinations"
        subTitle="Explore our curated collection of stunning visuals and experiences that showcase the world's most beautiful destinations"
      />
    </div>
  );
};

// Feature Item Component
const FeatureItem = ({ text, gradientColors }) => (
  <li className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 group">
    <div className={`p-1 md:p-1.5 bg-gradient-to-r ${gradientColors} rounded-full shadow-md group-hover:scale-110 transition-transform duration-300`}>
      <svg
        className="h-3 w-3 md:h-4 md:w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">{text}</span>
  </li>
);

// Bookotel Information Component
const BookotelInfo = () => {
  const features = [
    { text: "Exclusive deals on top-rated properties", gradientColors: "from-green-400 to-emerald-500" },
    { text: "Personalized travel recommendations", gradientColors: "from-blue-400 to-cyan-500" },
    { text: "24/7 customer support for hassle-free booking", gradientColors: "from-purple-400 to-pink-500" }
  ];

  return (
    <div className="w-full lg:w-[45%] h-auto lg:h-[500px] rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col justify-center">
      <div className="space-y-4 md:space-y-6">


        {/* Main Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-playfair text-gray-800">
          Discover Extraordinary Places
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
          From boutique hotels to luxury villas and private islands,
          Bookotel helps you find the comfortable and perfect accommodation
          for your next adventure.
        </p>

        {/* Features List */}
        <div className="pt-2">
          <h4 className="font-bold text-sm md:text-lg md:mb-2 text-gray-800">
            Why Choose Bookotel:
          </h4>
          <ul>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                text={feature.text}
                gradientColors={feature.gradientColors}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, title, description, gradientColors }) => (
  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-xl transition-all duration-500 border border-white/20">
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${gradientColors} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg`}>
        <span className="text-white text-sm md:text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm md:text-lg">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

// Main Component
const ExclusiveOffers = () => {
  const infoCards = [
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Connecting travelers worldwide with premium accommodations",
      gradientColors: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description: "Curated experiences and luxury accommodations",
      gradientColors: "from-emerald-500 to-green-500"
    },
    {
      icon: "🚀",
      title: "Fast & Easy",
      description: "Seamless booking process with instant confirmation",
      gradientColors: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-30 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Section Header */}
      <SectionHeader />

      {/* Main Content */}
      <div className="w-full max-w-[1700px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-1 sm:gap-1 md:gap-2 lg:gap-8 justify-center">
          {/* Left Side - Bookotel Information */}
          <BookotelInfo />
          
          {/* Right Side - GIF */}
          <div className="w-full lg:w-[55%] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl lg:rounded-2xl overflow-hidden">
            <img 
              src={exclusiveOfferGif} 
              alt="Exclusive Offer" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12">
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              gradientColors={card.gradientColors}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
