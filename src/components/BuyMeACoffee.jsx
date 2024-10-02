import React, { useEffect } from "react";

const BuyMeACoffe = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "Nosawkid");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", ""); // If you want to set a custom message, add it here
    script.setAttribute("data-color", "#5F7FFF");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    // Call window on load to show the image
    script.onload = () => {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      const bmcButton = document.getElementById("bmc-wbtn");
      if (bmcButton) {
        document.body.removeChild(bmcButton);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  return null;
};

export default BuyMeACoffe;
