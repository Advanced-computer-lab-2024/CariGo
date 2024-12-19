import { Avatar } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import useMasonry from "./useMasonry";
import { useState } from "react";
import { Star, BookHeart, BicepsFlexed, Crown } from "lucide-react";

import Omar from "./images/Omar.jpg";
import Yasmeen from "./images/Yasmeen.jpg";
import Menna from "./images/Menna.jpg";
import ArwaShahd from "./images/Arwa&Shahd.jpg";
import Mohamed from "./images/Mohamed.jpg";
import Zakzouk from "./images/Zakzouk.jpg";
import Ali from "./images/Ali.jpg";
import Rahma from "./images/Rahma.jpg";
import Shahd from "./images/Shahd.jpg";
import Deer from "./images/deer.png";
// import ClientImg02 from "./images/client-logo-02.svg";
// import ClientImg03 from "./images/client-logo-03.svg";
// import ClientImg04 from "./images/client-logo-04.svg";
// import ClientImg05 from "./images/client-logo-05.svg";
// import ClientImg06 from "./images/client-logo-06.svg";
// import ClientImg07 from "./images/client-logo-07.svg";
// import ClientImg08 from "./images/client-logo-08.svg";
// import ClientImg09 from "./images/client-logo-09.svg";

const testimonials = [
  {
    img: Omar,
    clientImg: Deer,
    name: "Omar M.",
    company: "GUC",
    content:
      "What I'm most excited about with CariGo is how seamlessly it integrates the products feature. It makes browsing, checking reviews, and finding the perfect purchase super intuitive and user-friendly!",
    categories: [1, 4],
  },
  {
    img: Yasmeen,
    clientImg: Deer,
    name: "Yasmeen Sh.",
    company: "GUC",
    content:
      "I really appreciate Carigo's  notifications feature. It keeps users informed in real-time about important updates, booking reminders, etc., adding an extra layer of convenience, ensuring they're always in the loop without having to check manually!",
    categories: [1, 3],
  },
  {
    img: Menna,
    clientImg: Deer,
    name: "Menna W.",
    company: "GUC",
    content:
      "Our Accomadation & Transportation booking feature is something I'm really proud of! It brings all your travel needs into one place, making it super easy to plan and book without any hassle.",
    categories: [1, 3],
  },
  {
    img: ArwaShahd,
    clientImg: Deer,
    name: "Arwa S. & Shahd M.",
    company: "GUC",
    content:
      "We're really excited about our Activities tab! It lets users discover and book amazing experiences effortlessly, turning every trip into a memorable adventure.",
    categories: [1, 3],
  },
  {
    img: Mohamed,
    clientImg: Deer,
    name: "Mohamed A.",
    company: "GUC",
    content:
      "Carigo brings everything together—booking flights, hotels, activities, and exploring historical places—all in one intuitive platform. It truly offers a seamless and stress-free experience for travelers, and I'm proud of how it all came together!",
    categories: [1, 2, 4],
  },
  {
    img: Zakzouk,
    clientImg: Deer,
    name: "AbdElRahman Z.",
    company: "GUC",
    content:
      "What excites me the most about the app is the secure booking and payment feature. It makes transactions smooth, safe, and hassle-free for every user!",
    categories: [1, 4],
  },
  {
    img: Ali,
    clientImg: Deer,
    name: "Ali H.",
    company: "GUC",
    content:
      "Our Historical Places feature is so helpfull! Users can access key details like opening hours, ticket prices, and must-know info about iconic landmarks. It's a simple, intuitive way to help history enthusiasts plan their visits without the hassle!",
    categories: [1, 4],
  },
  {
    img: Rahma,
    clientImg: Deer,
    name: "Rahma",
    company: "GUC",
    content:
      "The Itineraries tab is a game-changer for users looking for seamless travel experiences. It offers expertly crafted trip plans where verything is pre-planned for a hassle-free getaway. All users have to do is choose the itinerary that fits their vibe and start packing!",
    categories: [1, 3],
  },
  {
    img: Shahd,
    clientImg: Deer,
    name: "Shahd W.",
    company: "GUC",
    content:
      "What I love about CariGo's UI/UX is how intuitive and user-friendly it is. This makes the experience seamless, allowing users to find what they need quickly and easily. A great UI/UX really enhances the overall experience, and this one does it perfectly!",
    categories: [1, 3],
  },
];
export default function Testimonials() {
  const masonryContainer = useMasonry();
  const [category, setCategory] = useState(1);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-[#01324c] via-[#01324c] to-[#01324c] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl flex items-center justify-center space-x-4">
            <span>_______</span>
            <Star className="text-[#01324c]" width={24} height={24} />
            <span>_______</span>
          </h2>
          <p className="mt-4 text-lg text-transparent bg-gradient-to-r from-[#4f7489] to-[#037bba] bg-clip-text">
            You won't regret joining the cariGo world , just ask our team.
          </p>
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
                    category === 1 ? "text-[#f7c59f]" : "text-gray-600"
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
                <Crown
                  className={`${
                    category === 2 ? "text-[#f7c59f]" : "text-gray-600"
                  }`}
                  width={16}
                  height={16}
                />
                <span>Team Lead</span>
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
                <BookHeart
                  className={`${
                    category === 3 ? "text-[#f7c59f]" : "text-gray-600"
                  }`}
                  width={16}
                  height={16}
                />
                <span>Girl Power</span>
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
                <BicepsFlexed
                  className={`${
                    category === 4 ? "text-[#f7c59f]" : "text-gray-600"
                  }`}
                  width={16}
                  height={16}
                />
                <span>Men Power</span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
            ref={masonryContainer}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <Testimonial testimonial={testimonial} category={category}>
                  {testimonial.content}
                </Testimonial>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonial({ testimonial, category, children }) {
  const isVisible = testimonial.categories.includes(category);

  return (
    <article
      className={`relative rounded-2xl p-5 backdrop-blur-sm transition-opacity ${
        isVisible
          ? "bg-gradient-to-br from-[#01324c] via-[#004e89] to-[#01324c] text-[#f7e1c6]"
          : "bg-[#093249] text-gray-500 opacity-30"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div>
          <img
            src={testimonial.clientImg}
            width={40}
            height={40}
            alt="Client logo"
            className={isVisible ? "opacity-100" : "opacity-50"}
          />
        </div>
        <p
          className={`before:content-['“'] after:content-['”'] ${
            isVisible ? "text-[#f7e1c6]" : "text-gray-500"
          }`}
        >
          {children}
        </p>
        <div className="flex items-center gap-3">
          <img
            className={`inline-flex shrink-0 rounded-full ${
              isVisible ? "opacity-100" : "opacity-50"
            }`}
            src={testimonial.img}
            width={36}
            height={36}
            alt={testimonial.name}
          />
          <div
            className={`text-sm font-medium ${
              isVisible ? "text-[#f7e1c6]" : "text-gray-500"
            }`}
          >
            <span>{testimonial.name}</span>
            <span className="text-gray-700"> - </span>
            <a
              className={`transition-colors ${
                isVisible
                  ? "text-[#f7e1c6] hover:text-white"
                  : "text-gray-500 hover:text-gray-400"
              }`}
              href="#0"
            >
              {testimonial.company}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
