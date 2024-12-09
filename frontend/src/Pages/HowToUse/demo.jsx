import React, { useState } from 'react';
import { ChevronDown, Search, UserCircle, Calendar, Compass, Layout, ShoppingCart, MessageSquare, X } from 'lucide-react';

const MainSection = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#1a659e]/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#f7e1c6] transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg font-medium text-[#004e89]">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#1a659e] transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="bg-[#f7e1c6]">
          {children}
        </div>
      )}
    </div>
  );
};

const SubSection = ({ title, content, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="border-t border-[#1a659e]/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 pl-12 flex items-center justify-between hover:bg-[#f7e1c6]/50 transition-colors text-[#004e89]"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#1a659e] transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 pl-12 bg-white/50">
          {content}
        </div>
      )}
    </div>
  );
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const sections = {
    account: {
      title: "Account Management",
      icon: <UserCircle className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "How to SignUp/LogIn",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Follow these steps to create an account or log in:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Click the "Sign Up" button in the top right corner</li>
                <li>Enter your email and create a strong password</li>
                <li>Verify your email address</li>
                <li>Complete your profile information</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=200&width=400" alt="SignUp/LogIn Process" className="w-full" />
              </div>
            </div>
          )
        },
        {
          title: "Forgot Password",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">If you've forgotten your password:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Click the "Forgot Password" link on the login page</li>
                <li>Enter your email address</li>
                <li>Check your email for a password reset link</li>
                <li>Create a new password</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <video controls className="w-full">
                  <source src="#" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )
        },
        {
          title: "Change Password",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To change your password:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to your account settings</li>
                <li>Click on "Change Password"</li>
                <li>Enter your current password</li>
                <li>Enter your new password</li>
                <li>Confirm your new password</li>
              </ol>
            </div>
          )
        },
        {
          title: "Edit Preferences",
          content: <p className="text-[#1a659e]">Instructions on editing preferences will be displayed here.</p>
        },
        {
          title: "Delete Account",
          content: <p className="text-[#1a659e]">Instructions on deleting your account will be displayed here.</p>
        },
      ]
    },
    bookings: {
      title: "Bookings & Reservations",
      icon: <Calendar className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "How to Book/Pay (promo)",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To make a booking and apply a promo code:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Select your desired service or activity</li>
                <li>Choose your dates and options</li>
                <li>Click "Book Now"</li>
                <li>Enter your promo code in the designated field</li>
                <li>Complete the payment process</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=200&width=400" alt="Booking Process" className="w-full" />
              </div>
            </div>
          )
        },
        {
          title: "Book Flights/Hotels/Transportation",
          content: <p className="text-[#1a659e]">Instructions on booking flights, hotels, and transportation will be displayed here.</p>
        },
        {
          title: "See My Bookings/Orders",
          content: <p className="text-[#1a659e]">Instructions on viewing your bookings and orders will be displayed here.</p>
        },
        {
          title: "Cancel Booking",
          content: <p className="text-[#1a659e]">Instructions on canceling a booking will be displayed here.</p>
        },
        {
          title: "Notify when Booking Opens",
          content: <p className="text-[#1a659e]">Instructions on setting up notifications for booking openings will be displayed here.</p>
        },
        {
          title: "View My Booked Activities/Itineraries",
          content: <p className="text-[#1a659e]">Instructions on viewing your booked activities and itineraries will be displayed here.</p>
        }
      ]
    },
    search: {
      title: "Search & Discovery",
      icon: <Compass className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "How to Search/Filter for Itineraries",
          content: <p className="text-[#1a659e]">Instructions on searching and filtering for itineraries will be displayed here.</p>
        },
        {
          title: "Search for Activities",
          content: <p className="text-[#1a659e]">Instructions on searching for activities will be displayed here.</p>
        },
        {
          title: "Find Historical Places",
          content: <p className="text-[#1a659e]">Instructions on finding historical places will be displayed here.</p>
        },
        {
          title: "Browse Products",
          content: <p className="text-[#1a659e]">Instructions on browsing products will be displayed here.</p>
        }
      ]
    },
    features: {
      title: "Features & Tools",
      icon: <Layout className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Share Link",
          content: <p className="text-[#1a659e]">Instructions on sharing links will be displayed here.</p>
        },
        {
          title: "Add Products To Wishlist",
          content: <p className="text-[#1a659e]">Instructions on adding products to your wishlist will be displayed here.</p>
        },
        {
          title: "Bookmark Activities",
          content: <p className="text-[#1a659e]">Instructions on bookmarking activities will be displayed here.</p>
        },
        {
          title: "Notifications",
          content: <p className="text-[#1a659e]">Instructions on managing notifications will be displayed here.</p>
        },
        {
          title: "Badges and Loyalty Points",
          content: <p className="text-[#1a659e]">Instructions on badges and loyalty points will be displayed here.</p>
        },
        {
          title: "Choose Currency",
          content: <p className="text-[#1a659e]">Instructions on choosing your preferred currency will be displayed here.</p>
        }
      ]
    },
    shopping: {
      title: "Shopping & Checkout",
      icon: <ShoppingCart className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Add Product to Cart",
          content: <p className="text-[#1a659e]">Instructions on adding products to your cart will be displayed here.</p>
        },
        {
          title: "Checkout Cart",
          content: <p className="text-[#1a659e]">Instructions on checking out your cart will be displayed here.</p>
        },
        {
          title: "Add a New Delivery Address",
          content: <p className="text-[#1a659e]">Instructions on adding a new delivery address will be displayed here.</p>
        },
        {
          title: "Wallet",
          content: <p className="text-[#1a659e]">Instructions on managing your wallet will be displayed here.</p>
        }
      ]
    },
    reviews: {
      title: "Reviews & Feedback",
      icon: <MessageSquare className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Review TourGuide",
          content: <p className="text-[#1a659e]">Instructions on reviewing a tour guide will be displayed here.</p>
        },
        {
          title: "Review Activity/Itinerary",
          content: <p className="text-[#1a659e]">Instructions on reviewing an activity or itinerary will be displayed here.</p>
        },
        {
          title: "File Complaint",
          content: <p className="text-[#1a659e]">Instructions on filing a complaint will be displayed here.</p>
        }
      ]
    }
  };

  const isSubsectionVisible = (subsection) => {
    if (!searchQuery) return true;
    return subsection.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const isSectionVisible = (section) => {
    if (!searchQuery) return true;
    return section.subsections.some(subsection => 
      subsection.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || section.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#004e89]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#004e89]">How can we help you?</h1>
          <div className="relative max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white border border-[#1a659e]/20 focus:outline-none focus:border-[#ff6b36] text-[#004e89] placeholder-[#1a659e]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#1a659e]" />
              </button>
            )}
            {!searchQuery && (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1a659e]" />
            )}
          </div>
        </div>
        
        <div className="space-y-px rounded-lg overflow-hidden border border-[#1a659e]/20 bg-white">
          {Object.values(sections).map((section, index) => (
            isSectionVisible(section) && (
              <MainSection
                key={index}
                title={section.title}
                icon={section.icon}
              >
                {section.subsections.map((subsection, subIndex) => (
                  <SubSection
                    key={subIndex}
                    title={subsection.title}
                    content={subsection.content}
                    isVisible={isSubsectionVisible(subsection)}
                  />
                ))}
              </MainSection>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

