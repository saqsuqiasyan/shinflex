import { useLayoutEffect, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
            bottom: "30px",
            right: "30px",
            padding: "10px",
            fontSize: "18px",
            backgroundColor: "#DF3030",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "opacity 0.3s",
          }}
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
}
