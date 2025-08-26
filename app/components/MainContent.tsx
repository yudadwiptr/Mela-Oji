"use client";

import { useState, useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import CountdownTimer from "./Countdown";
import Form from "./Form";
import WishesList from "./WishesList";
import DigitalWallet from "./DigitalWallet";
import { config } from "@/lib/config";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Add TypeScript declaration for YT namespace
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerEvent: any;
    };
  }
}

type WeddingScreenProps = {
  name?: string;
};

const WeddingScreen = ({ name }: WeddingScreenProps) => {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const displayName = toParam || name || "Guest";

  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  // Untuk fade-in pertama kali
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeClass("opacity-100");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && audioRef.current) {
      // Play music when "Open" is clicked
      (audioRef.current as HTMLAudioElement).play();
    }
  };

  const { ref: mainRef, inView: isMainInView } = useInView({
    threshold: 0.5,
  });
  const { ref: main2Ref, inView: isMain2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide1Ref, inView: isSlide1InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide2Ref, inView: isSlide2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide3Ref, inView: isSlide3InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide4Ref, inView: isSlide4InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide5Ref, inView: isSlide5InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide6Ref, inView: isSlide6InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide7Ref, inView: isSlide7InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide8Ref, inView: isSlide8InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide9Ref, inView: isSlide9InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide10Ref, inView: isSlide10InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide11Ref, inView: isSlide11InView } = useInView({
    threshold: 0.5,
  });

  // Import YouTube IFrame API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT) {
      loadYouTubeAPI();
    }
  }, []);

  useEffect(() => {
    const video = document.querySelector("iframe");
    if (video && window.YT) {
      const player = new window.YT.Player(video, {
        events: {
          onReady: (event: any) => {
            if (isSlide8InView) {
              event.target.playVideo();
            } else {
              event.target.pauseVideo();
            }
          },
        },
      });

      return () => {
        player.destroy();
      };
    }
  }, [isSlide8InView]);

  return (
    <div
      className={`h-screen w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000`}
    >
      {/* Gambar sisi kiri Wide Untuk Komputer */}
      <div
        className="md:flex justify-center hidden items-end pb-12 w-2/3 h-1/2 md:h-full"
      >
        <Image
          src="/foto_1_samping.jpeg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          priority
          placeholder="blur"
          blurDataURL="/foto_1_samping.jpeg"
        />
        <div
          className={`bottom-10 left-20 font-ovo text-lg text-black tracking-[5px] uppercase`}
        >
          {config.coupleNames}
        </div>
      </div>

      {/* Konten teks sisi kanan bisa scroll untuk pc dan mobile */}
      <div className="w-full md:w-1/3 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <div
          id="backgroundWedding"
          className=" snap-start w-full h-screen flex items-center justify-center scroll-mt-20"
        >
          <div className="text-center p-5 flex flex-col h-full justify-between py-20">
            <div className="gap-y-2 md:gap-y-4 flex flex-col">
              <h5
                className={`text-sm font-legan text-black uppercase fadeMain ${isMain2InView ? "active" : ""
                  } `}
                ref={main2Ref}
              >
                The Wedding Of
              </h5>
              <h1
                className={`text-4xl md:text-4xl font-ovo t text-black uppercase fadeMain ${isMainInView ? "active" : ""
                  } `}
                ref={mainRef}
              >
                {config.coupleNames}
              </h1>
              <h5
                className={`text-sm font-legan text-black uppercase tracking-wide  fadeMain2 ${isMain2InView ? "active" : ""
                  } `}
                ref={main2Ref}
              >
                {new Date(config.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h5>
            </div>
            <div>
              <p className="mt-5 text-lg uppercase font-ovo t text-black">
                {`Dear ${displayName},`}
              </p>
              {!isOpen ? (
                <button
                  className="animate-bounce  mt-5 px-5 py-1 uppercase text-xs border border-grey hover:text-white hover:bg-transparent rounded-full bg-white text-black transition"
                  onClick={handleOpen}
                >
                  Open Invitation
                </button>
              ) : (
                <IoIosArrowUp
                  stroke="4"
                  className="mx-auto mt-20 animate-upDown text-black"
                />
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <>
            {/* Slide 1 */}
            <div
              className={`text-white h-screen flex pt-8 sm:pt-12 p-4 sm:p-5 px-6 sm:px-12 snap-start relative`}
            >
              <video
                src="/mela-oji.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div
                ref={slide1Ref}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center ${isSlide1InView ? "active" : ""} fadeInMove`}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "1rem",
                }}
              >
                <h1 className="text-xl sm:text-xl md:text-4xl font-ovo tracking-wide uppercase mb-4">
                  {config.bibleVerse}
                </h1>
                <p className="text-sm sm:text-sm font-legan text-justify">
                  {config.bibleVerseContent}
                </p>
              </div>
            </div>
            {/* Slide 2 */}
            <div
              className="snap-start text-black h-screen flex flex-col justify-start pt-10 sm:pt-16 px-6 sm:px-12"
              style={{
                backgroundImage: `url(/slide_3.JPG)`,
                backgroundSize: "cover",
                backgroundPosition: "left",
              }}
            >
              <div
                ref={slide2Ref}
                className={`fadeInMove ${isSlide2InView ? "active" : ""}  `}
              >
                <p className="font-legan text-s sm:text-sm my-1 sm:my-2">The Bride</p>
                <h1 className="text-2xl sm:text-xl md:text-4xl text-black font-ovo">
                  {config.bride}
                </h1>
                <h3 className="font-legan text-xs sm:text-4xl text-black">{config.brideNickName}</h3>
                <p className="text-xs sm:text-sm mt-3 sm:mt-5 font-legan text-black">
                  {config.brideBio}
                </p>
                <Link
                  href={`https://www.instagram.com/${config.brideInstagram}`}
                  target="_blank"
                  className="cursor-pointer hover:bg-black hover:text-white text-xs sm:text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-3 sm:mt-5 bg-[#E5E5E5] w-fit px-3 sm:px-4 py-1 sm:py-2 text-black"
                >
                  <FaInstagram /> {config.brideInstagram}
                </Link>
              </div>
            </div>
            {/* Slide 3 */}
            <div
              className={`h-screen flex flex-col justify-start pt-10 sm:pt-16 px-6 sm:px-12 snap-start`}
              style={{
              backgroundImage: `url(/slide_2.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              }}
            >
              {/* Display the content when the button is clicked */}
              <div
              ref={slide3Ref}
              className={`fadeInMove ${isSlide3InView ? "active" : ""}  `}
              >
              <p className="font-legan text-s sm:text-sm my-1 sm:my-2 text-black">The Groom</p>
              <h1 className="text-2xl sm:text-xl md:text-4xl text-black font-ovo">
                {config.groom}
              </h1>
              <h3 className="font-legan text-xs sm:text-4xl text-black">{config.groomNickName}</h3>
              <p className="text-xs sm:text-sm mt-3 sm:mt-5 font-legan text-black">
                {config.groomBio}
              </p>
              <Link
                href={`https://www.instagram.com/${config.groomInstagram}`}
                target="_blank"
                className="cursor-pointer hover:bg-black hover:text-white text-xs sm:text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-3 sm:mt-5 bg-[#E5E5E5] w-fit px-3 sm:px-4 py-1 sm:py-2 text-black"
              >
                <FaInstagram /> {config.groomInstagram}
                </Link>
              </div>
            </div>
            {/* Slide 4 */}
            <div
              className="snap-start text-white h-screen pt-6 sm:pt-8 flex px-6 sm:px-12 overflow-y-auto"
              style={{
                backgroundImage: `url(/slide_4c.JPG)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="pb-8 sm:pb-0">
                <h1
                  ref={slide4Ref}
                  className={`text-xl sm:text-xl md:text-5xl text-white font-ovo fadeInMove ${isSlide4InView ? " active" : ""
                    }`}
                >
                  A journey in love
                </h1>
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-m sm:text-xl mt-3 sm:mt-5 mb-1 sm:mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_1}
                </h3>
                {/* Render timeline_1_content with a new paragraph and larger font after the emoticon */}
                {(() => {
                  const content = config.timeline_1_content;
                  // Split at the emoticon and new line
                  const match = content.match(/(.*?😁)(\\n|\n)(.*)/);
                  if (match) {
                    return (
                      <>
                        <p className={`text-xs sm:text-sm font-legan text-white fadeInLeftSlow ${isSlide4InView ? "active" : ""} text-justify`}>{match[1]}</p>
                        <p className={`text-xs sm:text-sm font-legan text-white fadeInLeftSlow ${isSlide4InView ? "active" : ""} mt-2 text-justify`}>{match[3]}</p>
                      </>
                    );
                  } else {
                    return (
                      <p className={`text-xs sm:text-sm font-legan text-white fadeInLeftSlow ${isSlide4InView ? "active" : ""} text-justify`}>{content}</p>
                    );
                  }
                })()}
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-base sm:text-xl mt-3 sm:mt-5 mb-1 sm:mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_2}
                </h3>
                <p
                  ref={slide4Ref}
                  className={`text-xs sm:text-sm font-legan text-white fadeInLeftSlow${isSlide4InView ? " active" : ""} text-justify`}
                >
                  {config.timeline_2_content}
                </p>
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-base sm:text-xl mt-3 sm:mt-5 mb-1 sm:mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_3}
                </h3>
                <p
                  ref={slide4Ref}
                  className={`text-xs sm:text-sm font-legan text-white fadeInLeftSlow ${isSlide4InView ? "active" : ""} text-justify`}
                >
                  {config.timeline_3_content}
                </p>
                <div
                  ref={slide4Ref}
                  className={`relative flex items-center mt-3 sm:mt-5 fadeInLeft ${isSlide4InView ? " active" : ""
                    }`}
                >
                  <hr className="w-[80px] sm:w-[120px] mx-2 border-t border-gray-300" />
                  <span className="px-2 font-thesignature text-2xl sm:text-3xl">
                    {config.coupleNames}
                  </span>
                </div>
              </div>
            </div>
            {/* Slide 5 */}
            <div
              className="snap-start text-white h-screen flex flex-col items-center justify-center px-6 sm:px-12"
              style={{
                backgroundImage: `url(/slide_5.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                ref={slide5Ref}
                className={` ${isSlide5InView ? "active" : ""
                  }  fadeInMove flex items-center flex-col`}
              >
                <div className="text-center mb-4">
                  <h3 className="uppercase font-legan text-xs sm:text-sm tracking-wide mb-1.5 text-black">
                    SAVE OUR DATE
                  </h3>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-ovo uppercase leading-tight">
                    {new Date(config.eventDate).toLocaleDateString("en-US", {
                      weekday: "long",
                    })} <br />  {new Date(config.eventDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric", 
                      year: "numeric"
                    })}
                  </h1>
                </div>
                
                <div className="grid gap-2.5 w-full px-0 sm:max-w-md">
                  {/* Akad Section - More compact with better styling */}
                  <div className="w-full bg-black/50 backdrop-blur-sm rounded-md p-3 border border-white/10 transform transition-all">
                    <h3 className="uppercase font-ovo text-sm text-center text-amber-200">
                      AKAD
                    </h3>
                    <p className="text-sm text-center font-legan text-white font-semibold">
                      09:00 WIB
                    </p>
                    <div className="border-t border-gray-700/50 my-1.5"></div>
                    <p className="text-2xs sm:text-xs text-center font-legan text-white/90">
                      Gedung Serbaguna Sukasari <br />
                      Lawanggintung RT.01/RW.03, Kec. Bogor Sel., Kota Bogor
                    </p>
                  </div>

                  {/* Resepsi Section - More compact with better styling */}
                  <div className="w-full bg-black/50 backdrop-blur-sm rounded-md p-3 border border-white/10 transform transition-all">
                    <h3 className="uppercase font-ovo text-sm text-center text-amber-200">
                      RESEPSI
                    </h3>
                    <p className="text-sm text-center font-legan text-white font-semibold">
                      11:00 WIB
                    </p>
                    <div className="border-t border-gray-700/50 my-1.5"></div>
                    <p className="text-2xs sm:text-xs text-center font-legan text-white/90">
                      Gedung Serbaguna Sukasari <br />
                      Lawanggintung RT.01/RW.03, Kec. Bogor Sel., Kota Bogor
                    </p>
                  </div>
                  
                  {/* Compact Location Button */}
                  <div className="flex justify-center mt-2">
                    <Link
                      href="https://maps.app.goo.gl/P1XLQcCiQ9WB9pTM6"
                      target="_blank"
                      className="cursor-pointer hover:bg-white/20 transform hover:scale-105 transition-all flex items-center gap-x-1.5 text-center font-legan text-xs bg-black/60 backdrop-blur-sm border border-white/20 rounded-full w-fit px-4 py-1.5 text-white shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="animate-pulse">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                      </svg>
                      Lihat Lokasi di Maps
                    </Link>
                  </div>
                  
                  {/* Couple Names - Similar to Journey in Love */}
                  <div className="mt-8 flex items-center justify-center w-full">
                    <div className="flex items-center">
                      <div className="h-[1px] w-12 sm:w-16 bg-white/40"></div>
                      <span className="px-3 font-thesignature text-2xl sm:text-3xl text-white">
                        {config.coupleNames}
                      </span>
                      <div className="h-[1px] w-12 sm:w-16 bg-white/40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slide 6 */}
            <div
              className="snap-start text-white h-screen flex flex-col items-center justify-start pt-16 px-12"
              style={{
              backgroundImage: `url(/slide_6.JPG)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              }}
            >
              <div
              ref={slide6Ref}
              className={` ${isSlide6InView ? "active" : ""} fadeInMove flex items-center flex-col w-full`}
              >
              <div className="mb-6 w-full flex justify-center">
                <h1 className="text-2xl text-center text-black font-ovo">
                ALMOST TIME FOR OUR CELEBRATION
                </h1>
              </div>
              {/* Countdown Timer */}
              <div className="w-full flex flex-col items-center" style={{color: 'black'}}>
                <CountdownTimer />
                {/* Add to Calendar Button - More Compact */}
                <div className="mt-6 flex justify-center w-full">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${config.coupleNames}`)}&dates=${encodeURIComponent(new Date(config.eventDate).toISOString().replace(/-|:|\.\d+/g, ""))}&details=${encodeURIComponent(`Akad: ${config.holyMatrimony.time} - ${config.holyMatrimony.place}. Resepsi: ${config.weddingReception.time} - ${config.weddingReception.place}`)}&location=${encodeURIComponent(config.weddingReception.place)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:bg-black/20 transition-colors flex items-center gap-x-1.5 text-center font-legan text-xs bg-white/80 backdrop-blur-sm border border-black/20 rounded-full w-fit px-4 py-1.5 text-black shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                  </svg>
                  Add to Calendar
                </a>
                </div>
              </div>
              </div>
            </div>
            {/* Slide 7 */}
            {config.livestreaming.enabled && (
              <div
                className="snap-start  text-white h-screen flex flex-col justify-between pt-16 pb-32 px-12 "
                style={{
                  backgroundImage: `url(/foto_1_samping.jpeg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1
                  ref={slide7Ref}
                  className={`text-2xl text-white  font-ovo fadeInMoveSlow ${isSlide7InView ? "active" : ""
                    }`}
                >
                  JOIN OUR EXCLUSIVE LIVE STREAMING EVENT
                </h1>

                <div
                  className={`mt-5 mx-auto flex flex-col fadeInMove ${isSlide7InView ? "active" : ""
                    }`}
                  ref={slide7Ref}
                >
                  <h3 className="uppercase font-ovo text-sm mt-5 mb-2">
                    {new Date(config.eventDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <br /> {config.livestreaming.time}
                  </h3>
                  <p className="text-sm font-legan text-white">
                    {config.livestreaming.detail}
                  </p>
                  <Link
                    href={config.livestreaming.link}
                    target="_blank"
                    className="cursor-pointer hover:text-white/20 text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#3B3B3B] w-fit px-6 py-2 text-white"
                  >
                    Join Live Streaming
                  </Link>
                </div>
              </div>)}
            {/* SLIDE 8 */}
            {config.prewedding.enabled && (
              <div
                className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8 "
                style={{
                  backgroundImage: `url(/slide_8.jpeg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  ref={slide8Ref}
                  className={`${isSlide8InView ? "active" : ""} fadeInMove `}
                >
                  <h1 className="text-3xl text-white  font-ovo text-center uppercase">
                    Unveiling Our Prewedding Story
                  </h1>
                  <div
                    className="mt-10 mx-auto w-full max-w-2xl relative"
                    style={{ paddingBottom: "56.25%", height: 0 }}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/uhvvhkbaHac?autoplay=1&mute=1&enablejsapi=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="-mt-12 w-72 transform skew-x-6 drop-shadow">
                    <p className="text-3xl font-thesignature text-white/80 ">
                      {config.prewedding.detail}
                    </p>
                  </div>
                </div>
              </div>)}

            {/* SLIDE 9 */}
            {config.rsvp.enabled && (
            <div
              className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8"
              style={{
                backgroundImage: `url(/slide_9.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                ref={slide9Ref}
                className={`${isSlide9InView ? "active" : ""} fadeInMove`}
              >
                <h1 className="text-3xl text-white font-ovo text-center uppercase">
                  RSVP AND WISHES
                </h1>
                <p className="text-sm font-legan text-white/80 text-center">
                {config.rsvp.detail}
                </p>

                <Form />
              </div>
            </div>
            )}

            {/* SLIDE 10 - Wishes */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-start pt-12 pb-8 px-4 sm:px-8 overflow-y-auto"
              style={{
                backgroundImage: `url(/slide_9.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                ref={slide10Ref}
                className={`${isSlide10InView ? "active" : ""} fadeInMove w-full`}
              >
                <h1 className="text-xl sm:text-3xl text-black font-ovo text-center uppercase mb-4">
                  Ucapan & Doa
                </h1>
                <p className="text-xs sm:text-sm text-center text-black/80 mb-4 font-legan max-w-md mx-auto">
                  Berikan ucapan dan doa terbaik Anda untuk mempelai pengantin
                </p>
                <WishesList />
              </div>
            </div>

            {/* Digital Wallet Slide */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8"
              style={{
                backgroundImage: `url(/slide_7.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                ref={slide11Ref}
                className={`${isSlide11InView ? "active" : ""} fadeInMove`}
              >
                <DigitalWallet />
                {/* Address for sending gifts */}
                
              </div>
            </div>

            {/* SLIDE AKHIR */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-start pt-8 pb-16 px-12 "
              style={{
                backgroundImage: `url(/slide_10.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Ucapan terima kasih benar-benar di atas */}
              <div className="w-full flex flex-col items-center fadeIn">
                <h1 className="text-3xl text-black font-ovo text-center uppercase mb-2">
                  {config.thankyou}
                </h1>
                <div className="sm:mt-3 mx-auto flex flex-col ">
                  <p className="text-xs sm:text-sm font-legan text-black text-center">
                    {config.thankyouDetail}
                  </p>
                  <p className="text-xs sm:text-sm rounded-full text-center font-ovo mt-6 sm:mt-8 px-4 sm:px-6 py-1 sm:py-2 text-black uppercase">
                    {config.coupleNames}
                  </p>
                </div>
              </div>

  <div className="flex-grow" />
  <footer className="flex flex-col items-center mt-auto mb-4 sm:mb-6">
    <p className="text-[0.4rem] sm:text-[0.5rem] uppercase text-center">
      Created By
    </p>
    <p className="text-[0.5rem] sm:text-xs">© YUMA STUDIO | 2025</p>
  </footer>
</div>

{/* New Section: Our Love Story (Masonry) */}
<div
  className="snap-start text-black h-screen flex flex-col pt-16 pb-16 px-8 overflow-y-auto"
  style={{
    backgroundImage: "url(/foto_utama.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
              <div className="text-center mb-6">
                <h1 className="text-xs text-black font-ovo uppercase mb-2">Our Love Story</h1>
                <p className="text-3xl font-legan text-black/80">The journey that brought us together</p>
                <p className="text-xs font-ovo text-black/70 mt-2">Every moment tells our story, every smile captures our love</p>
              </div>

              {/* Masonry container */}
              <div className="mx-auto w-full max-w-3xl md:max-w-4xl
                              columns-2 md:columns-3 gap-4
                              [column-fill:_balance]">
                {/* Gunakan mb-4 + break-inside avoid agar layout rapi */}
                {[
                  "/foto_1.jpeg","/foto_2.jpeg","/foto_3.jpeg","/foto_4.jpeg",
                  "/foto_5.jpeg","/foto_6.jpeg","/foto_7.jpeg","/foto_8.jpeg",
                  "/foto_9.jpeg","/foto_10.jpeg","/foto_11.jpeg","/foto_12.jpeg",
                  "/foto_13.jpeg","/foto_14.jpeg","/foto_15.jpeg","/foto_16.jpeg",
                ].map((src, i) => (
                  <img
                    key={src}
                    src={typeof src === 'string' ? src : ''}
                    alt={`Love story photo ${i + 1}`}
                    loading="lazy"
                    className="mb-4 w-full rounded-lg shadow-lg object-cover
                               [break-inside:avoid] hover:opacity-95 transition"
                  />
                ))}
              </div>

              {/* Signature at the bottom */}
              <div className="mt-4 flex items-center justify-center w-full">
                <div className="flex items-center">
                  <div className="h-[1px] w-12 sm:w-16 bg-black/40"></div>
                  <span className="px-3 font-thesignature text-2xl sm:text-3xl text-black">
                    Mela & Oji
                  </span>
                  <div className="h-[1px] w-12 sm:w-16 bg-black/40"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/wedding_song.mp3" preload="auto" />
    </div>
  );
};

export default WeddingScreen;
