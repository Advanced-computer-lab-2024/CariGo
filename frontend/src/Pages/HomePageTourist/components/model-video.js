import React, { useState, useRef, useEffect } from "react";

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'visible';
    };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.focus();
    }
  }, [modalOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Secondary illustration */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -z-10 -ml-28 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      >
        <img
          className="md:max-w-none"
          src="/images/secondary-illustration.svg"
          width={1165}
          height={1012}
          alt="Secondary illustration"
        />
      </div>

      {/* Video thumbnail */}
      <button
        className="group relative flex items-center justify-center rounded-2xl focus:outline-none focus-visible:ring focus-visible:ring-indigo-200"
        onClick={() => setModalOpen(true)}
        aria-label="Watch the video"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <figure className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/20 before:to-gray-900">
          <img
            className="opacity-100 "
            src={thumb}
            width={thumbWidth}
            height={thumbHeight}
            alt={thumbAlt}
          />
        </figure>
        {/* Play icon */}
        <span className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-[#004C74] before:duration-300 group-hover:before:scale-110">
          <span className="relative flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
            >
              <path
                fill="url(#pla)"
                fillRule="evenodd"
                d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                clipRule="evenodd"
              />
              <defs>
                <linearGradient
                  id="pla"
                  x1={10}
                  x2={10}
                  y1={0}
                  y2={20}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF683C" />
                  <stop offset={1} stopColor="#FF683C" stopOpacity=".72" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium leading-tight text-gray-300">
              Watch Demo
              <span className="text-gray-600"> - </span>
              3:47
            </span>
          </span>
        </span>
      </button>
      {/* End: Video thumbnail */}

      {modalOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center px-4 py-6 sm:px-6"
          onClick={handleBackdropClick}
        >
          <div 
            className="fixed inset-0 bg-black/70 transition-opacity duration-300 ease-out"
            aria-hidden="true"
          ></div>
          <div 
            ref={modalRef}
            className="relative mx-auto flex h-full max-w-6xl items-center"
          >
            <div className="aspect-video max-h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                ref={videoRef}
                width={videoWidth}
                height={videoHeight}
                loop
                controls
                tabIndex={0}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

