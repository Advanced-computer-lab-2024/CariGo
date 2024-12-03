import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Clock, Earth, Star, TentTree } from 'lucide-react';
import useMasonry from "./useMasonry";

export default function Testimonials() {
  const masonryContainer = useMasonry();
  const [category, setCategory] = useState(1);
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [sortedItineraries, setSortedItineraries] = useState([]);
  const [sortedActivities, setSortedActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const userId = localStorage.getItem("id");
        if (!token || !userId) throw new Error("No token or user ID found");

        const userResponse = await fetch(`/cariGo/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!userResponse.ok) throw new Error(`Failed to fetch user data`);

        const user = await userResponse.json();
        const tags = user.selectedTags || [];

        const queryString = tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&");

        // Fetch itineraries
        const itinerariesResponse = await fetch(`/cariGo/Event/suggested?${queryString}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const fetchedItineraries = await itinerariesResponse.json();
        setItineraries(fetchedItineraries);

        // Fetch activities
        const activitiesResponse = await fetch(`/cariGo/Event/suggestedActivities?${queryString}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const fetchedActivities = await activitiesResponse.json();
        setActivities(fetchedActivities);

      } catch (error) {
        console.error("Error fetching itineraries or activities:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (category === 4) { // Most Recent
      setSortedItineraries([...itineraries].sort((a, b) => new Date(b.start_date) - new Date(a.start_date)));
      setSortedActivities([...activities].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (category === 5) { // Cheapest
      setSortedItineraries([...itineraries].sort((a, b) => a.price - b.price));
      setSortedActivities([...activities].sort((a, b) => a.price - b.price));
    }
  }, [category, itineraries, activities]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-[#01324c] via-[#01324c] to-[#01324c] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl flex items-center justify-center space-x-4">
            <span>_______</span>
            <Earth className="text-[#01324c]" width={24} height={24} />
            <span>_______</span>
          </h2>
        </div>

        <div>
          {/* Buttons */}
          <div className="flex justify-center pb-12 max-md:hidden md:pb-16">
            <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-[#01324c] p-1">
              {/* Button #1 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 1
                    ? "relative bg-gradient-to-b from-[#01324c] via-[#037bba] to-[#01324c] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] text-white"
                    : "opacity-65 transition-opacity hover:opacity-90 text-gray-300"
                }`}
                aria-pressed={category === 1}
                onClick={() => setCategory(1)}
              >
                <svg
                  className={`fill-current ${
                    category === 1 ? "text-[#FF683C]" : "text-gray-600"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height={16}
                >
                  <path d="M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" />
                </svg>
                <span>View All</span>
              </button>
              {/* Button #2 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 2
                    ? "relative bg-gradient-to-b from-[#01324c] via-[#037bba] to-[#01324c] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] text-white"
                    : "opacity-65 transition-opacity hover:opacity-90 text-gray-300"
                }`}
                aria-pressed={category === 2}
                onClick={() => setCategory(2)}
              >
                <Star className={` ${
                    category === 2 ? "text-[#FF683C]" : "text-gray-600"
                  }`} width={16} height={16} />
                <span>Activities</span>
              </button>
              {/* Button #3 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 3
                    ? "relative bg-gradient-to-b from-[#01324c] via-[#037bba] to-[#01324c] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] text-white"
                    : "opacity-65 transition-opacity hover:opacity-90 text-gray-300"
                }`}
                aria-pressed={category === 3}
                onClick={() => setCategory(3)}
              >
                <TentTree className={`${
                    category === 3 ? "text-[#FF683C]" : "text-gray-600"
                  }`} width={16} height={16} />
                <span>Itineraries</span>
              </button>
              {/* Button #4 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 4
                    ? "relative bg-gradient-to-b from-[#01324c] via-[#037bba] to-[#01324c] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] text-white"
                    : "opacity-65 transition-opacity hover:opacity-90 text-gray-300"
                }`}
                aria-pressed={category === 4}
                onClick={() => setCategory(4)}
              >
                <Clock className={` ${
                    category === 4 ? "text-[#FF683C]" : "text-gray-600"
                  }`} width={16} height={16} />
                <span>Most Recent</span>
              </button>
              {/* Button #5 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 5
                    ? "relative bg-gradient-to-b from-[#01324c] via-[#037bba] to-[#01324c] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] text-white"
                    : "opacity-65 transition-opacity hover:opacity-90 text-gray-300"
                }`}
                aria-pressed={category === 5}
                onClick={() => setCategory(5)}
              >
                <CircleDollarSign className={` ${
                    category === 5 ? "text-[#FF683C]" : "text-gray-600"
                  }`} width={16} height={16} />
                <span>Cheapest</span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
            ref={masonryContainer}
          >
            {category === 1 || category === 3 ? 
              itineraries.map((itinerary, index) => (
                <div key={index} className="group">
                  <Testimonial item={itinerary} category={category} type={3} />
                </div>
              )) : null
            }
            {category === 1 || category === 2 ? 
              activities.map((activity, index) => (
                <div key={index} className="group">
                  <Testimonial item={activity} category={category} type={2} />
                </div>
              )) : null
            }
            {category === 4 || category === 5 ? 
              <>
                {sortedItineraries.slice(0, 1).map((itinerary, index) => (
                  <div key={index} className="group">
                    <Testimonial item={itinerary} category={category} type={3} />
                  </div>
                ))}
                {sortedActivities.slice(0, 1).map((activity, index) => (
                  <div key={index} className="group">
                    <Testimonial item={activity} category={category} type={2} />
                  </div>
                ))}
              </> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ item, category, type }) {
  return (
    <article
      className={`relative rounded-2xl bg-gradient-to-br from-[#037bba] via-[#01324c] to-[#037bba] p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] ${
        category !== 1 && type !== category ? "opacity-40" : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="text-gray-300">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-200">Price: ${item.price}</span>
          <span className="text-gray-200">
            {type === 2 ? `Date: ${new Date(item.date).toLocaleDateString()}` : 
             `${new Date(item.start_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleDateString()}`}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-200">
          <span>Author: {item.author?.name}</span>
        </div>
      </div>
    </article>
  );
}


