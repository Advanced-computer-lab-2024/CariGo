import {
  CalendarClock,
  Shield,
  Award,
  NotebookPen,
  MessageSquareMore,
  Binoculars
} from "lucide-react";

// const features = [
//   {
//     icon: CalendarClock,
//     title: "Secure Booking",
//     description: "Track your team's progress and get insights for the week.",
//   },
//   {
//     icon: Users,
//     title: "Tailored To Your Taste",
//     description: "Collaborate with your team and get insights for the week.",
//   },
//   {
//     icon: Workflow,
//     title: "Loyalty Points",
//     description: "Build complex flows with our advanced tools.",
//   },
//   {
//     icon: Settings2,
//     title: "Arrange Events",
//     description: "Customize your workspace with our strategic tools.",
//   },
//   {
//     icon: Sliders,
//     title: "Reminders",
//     description: "Adapt your workspace to your team's needs.",
//   },
//   {
//     icon: GitBranch,
//     title: "FeedBack From You",
//     description: "Keep track of your project's history and changes.",
//   },
// ]

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
        <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-[#01324c] via-[#01324c] to-[#01324c] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl flex items-center justify-center space-x-4">
          <span>_______</span>
          <Binoculars className="text-[#01324c]" width={24} height={24} />
          <span>_______</span>
        </h2>
        <p className="mt-4 text-lg text-transparent bg-gradient-to-r from-[#4f7489] to-[#037bba] bg-clip-text">
          The caribou spirit is in your journey, Just Carry your luggage and Go.
          Explore the wide variaty of things CariGo can make easier for you.
        </p>
      </div>

      {/* <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-indigo-500" />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div> */}
      <div className="mx-auto grid max-w-sm mt-20 gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
        {/* Feature items */}
        <article>
          <Shield className="mb-3 text-[#037bba]" width={24} height={24} />
          {/* <svg className="mb-3 fill-[#037bba]" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                <path fillOpacity=".48" d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z" />
              </svg> */}
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            Secure Booking
          </h3>
          <p className="text-[#4294c3]">
            Book any activity you like, get confirmation and reasurance from our
            secure approaches for your privacy and security.
          </p>
        </article>
        <article>
          <svg
            className="mb-3 fill-[#037bba]"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
          >
            <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
            <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
          </svg>
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            Tailored To Your Taste
          </h3>
          <p className="text-[#4294c3]">
            Get up to date suggestions based on your prefrences and favorite
            what catches your eyes easily.
          </p>
        </article>
        <article>
          <Award className="mb-3 text-[#037bba]" width={24} height={24} />
          {/* <svg
                className="mb-3 fill-[#037bba]"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
                <path
                  fillOpacity=".48"
                  d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z"
                />
              </svg> */}
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            Loyalty Points
          </h3>
          <p className="text-[#4294c3]">
            Gain loyalty points after each purchase to prove you're a loyal
            Cari&Goer, and in return gain money in your wallet to purchase even
            more adventures.
          </p>
        </article>
        <article>
          <NotebookPen className="mb-3 text-[#037bba]" width={24} height={24} />
          {/* <svg
                className="mb-3 fill-[#037bba]"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z"
                />
                <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
                <path
                  d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z"
                  opacity=".48"
                />
                <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
              </svg> */}
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            Arrange Events
          </h3>
          <p className="text-[#4294c3]">
            If you're an advertiser or a tour guide, sharing your trips has
            never been this easy.
          </p>
        </article>
        <article>
          <CalendarClock
            className="mb-3 text-[#037bba]"
            width={24}
            height={24}
          />
          {/* <svg
                className="mb-3 fill-[#037bba]"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                />
                <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
              </svg> */}
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            Reminders
          </h3>
          <p className="text-[#4294c3]">
            Recieve reminders whenever your bookings are near, that way you
            never forget any adventure you've planned.
          </p>
        </article>
        <article>
          <MessageSquareMore
            className="mb-3 text-[#037bba]"
            width={24}
            height={24}
          />
          {/* <svg
                className="mb-3 fill-[#037bba]"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z"
                />
                <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
              </svg> */}
          <h3 className="bg-gradient-to-r from-[#037bba] to-[#FF683C] bg-clip-text text-2xl font-semibold text-transparent mb-1 font-nacelle text-[1rem] font-semibold">
            FeedBack From You
          </h3>
          <p className="text-[#4294c3]">
            We hear from you , and your complaints and feedbacks are deeply
            appriciated in CariGo.
          </p>
        </article>
      </div>
    </section>
  );
}
