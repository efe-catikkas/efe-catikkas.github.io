document.addEventListener("DOMContentLoaded", () => {
  const hoverCapable = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  /* =========================
     BANK MARKETING PREVIEW
  ========================= */
  const bankTrigger = document.querySelector(
    ".bank-marketing-card .project-image-preview"
  );
  const bankOverlay = document.querySelector(
    ".bank-marketing-hover-overlay"
  );

  const closeBankPreview = () => {
    document.body.classList.remove("bank-preview-open");
  };

  if (bankTrigger && bankOverlay) {
    bankTrigger.addEventListener("mouseenter", () => {
      if (!hoverCapable.matches) return;
      document.body.classList.add("bank-preview-open");
    });

    bankTrigger.addEventListener("mouseleave", closeBankPreview);
    bankTrigger.addEventListener("focus", () => {
      if (!hoverCapable.matches) return;
      document.body.classList.add("bank-preview-open");
    });
    bankTrigger.addEventListener("blur", closeBankPreview);
  }

  /* =========================
     LOGISTICS PREVIEW
     Created only while hovered.
  ========================= */
  const logisticsTrigger = document.querySelector(
    ".logistics-card .project-image-preview"
  );

  let logisticsOverlay = null;

  const createLogisticsPreview = () => {
    if (!hoverCapable.matches || logisticsOverlay) return;

    logisticsOverlay = document.createElement("div");
    logisticsOverlay.setAttribute("aria-hidden", "true");

    Object.assign(logisticsOverlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "10000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "rgba(3, 15, 30, 0.78)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      pointerEvents: "none"
    });

    const frame = document.createElement("div");

    Object.assign(frame.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "94vw",
      maxHeight: "92vh",
      padding: "10px",
      background: "#ffffff",
      border: "1px solid rgba(255,255,255,0.75)",
      borderRadius: "14px",
      boxShadow: "0 32px 90px rgba(0,0,0,0.48)"
    });

    const image = document.createElement("img");
    image.src =
      "assets/projects/logistics-performance/logistics%20dashboard%2001.png";
    image.alt = "Logistics Hub Performance Summary dashboard";

    Object.assign(image.style, {
      display: "block",
      width: "auto",
      height: "auto",
      maxWidth: "min(92vw, 1450px)",
      maxHeight: "calc(92vh - 20px)",
      objectFit: "contain",
      borderRadius: "8px"
    });

    frame.appendChild(image);
    logisticsOverlay.appendChild(frame);
    document.body.appendChild(logisticsOverlay);
  };

  const removeLogisticsPreview = () => {
    if (!logisticsOverlay) return;
    logisticsOverlay.remove();
    logisticsOverlay = null;
  };

  if (logisticsTrigger) {
    logisticsTrigger.style.cursor = "zoom-in";

    logisticsTrigger.addEventListener(
      "mouseenter",
      createLogisticsPreview
    );
    logisticsTrigger.addEventListener(
      "mouseleave",
      removeLogisticsPreview
    );
    logisticsTrigger.addEventListener("blur", removeLogisticsPreview);
  }

  /* =========================
     GLOBAL CLOSE BEHAVIOR
  ========================= */
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBankPreview();
      removeLogisticsPreview();
    }
  });

  hoverCapable.addEventListener?.("change", () => {
    closeBankPreview();
    removeLogisticsPreview();
  });
});
