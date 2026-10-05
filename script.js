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
     BTT HUMANA GALLERY
     Hover opens a full-screen gallery.
     Gallery remains open so arrows are clickable.
  ========================= */
  const bttTrigger = document.querySelector(
    ".btt-card .btt-project-preview"
  );

  const bttImages = [
    {
      src: "assets/projects/btt-humana/btt%20dashboard%2001.png",
      alt: "BTT Humana Operations and Regional Performance dashboard"
    },
    {
      src: "assets/projects/btt-humana/btt%20dashboard%2002.png",
      alt: "BTT Humana Regional Sales and Inventory Analysis dashboard"
    },
    {
      src: "assets/projects/btt-humana/btt%20dashboard%2003.png",
      alt: "BTT Humana Store Performance and Ranking dashboard"
    }
  ];

  let bttOverlay = null;
  let bttCurrentIndex = 0;

  const closeBttGallery = () => {
    if (!bttOverlay) return;

    bttOverlay.remove();
    bttOverlay = null;
    document.body.classList.remove("btt-gallery-open");
  };

  const showBttImage = (nextIndex) => {
    if (!bttOverlay) return;

    bttCurrentIndex =
      (nextIndex + bttImages.length) % bttImages.length;

    const image = bttOverlay.querySelector(".btt-gallery-image");
    const counter = bttOverlay.querySelector(".btt-gallery-counter");
    const dots = bttOverlay.querySelectorAll(".btt-gallery-dot");

    const current = bttImages[bttCurrentIndex];

    image.src = current.src;
    image.alt = current.alt;

    counter.textContent =
      `${bttCurrentIndex + 1} / ${bttImages.length}`;

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "is-active",
        index === bttCurrentIndex
      );
    });
  };

  const createBttGallery = () => {
    if (!hoverCapable.matches || bttOverlay) return;

    closeBankPreview();
    removeLogisticsPreview();

    bttCurrentIndex = 0;

    bttOverlay = document.createElement("div");
    bttOverlay.className = "btt-gallery-overlay";
    bttOverlay.setAttribute("role", "dialog");
    bttOverlay.setAttribute("aria-modal", "true");
    bttOverlay.setAttribute(
      "aria-label",
      "BTT Humana dashboard gallery"
    );

    const frame = document.createElement("div");
    frame.className = "btt-gallery-frame";

    const image = document.createElement("img");
    image.className = "btt-gallery-image";

    const closeButton = document.createElement("button");
    closeButton.className = "btt-gallery-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close gallery");
    closeButton.textContent = "×";

    const prevButton = document.createElement("button");
    prevButton.className = "btt-gallery-nav btt-gallery-prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Previous dashboard");
    prevButton.textContent = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "btt-gallery-nav btt-gallery-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Next dashboard");
    nextButton.textContent = "›";

    const footer = document.createElement("div");
    footer.className = "btt-gallery-footer";

    const dots = document.createElement("div");
    dots.className = "btt-gallery-dots";

    bttImages.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "btt-gallery-dot";
      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        `Show dashboard ${index + 1}`
      );

      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        showBttImage(index);
      });

      dots.appendChild(dot);
    });

    const counter = document.createElement("span");
    counter.className = "btt-gallery-counter";

    footer.appendChild(dots);
    footer.appendChild(counter);

    closeButton.addEventListener("click", closeBttGallery);

    prevButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showBttImage(bttCurrentIndex - 1);
    });

    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showBttImage(bttCurrentIndex + 1);
    });

    bttOverlay.addEventListener("click", (event) => {
      if (event.target === bttOverlay) {
        closeBttGallery();
      }
    });

    frame.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    frame.appendChild(image);
    frame.appendChild(closeButton);
    frame.appendChild(prevButton);
    frame.appendChild(nextButton);
    frame.appendChild(footer);

    bttOverlay.appendChild(frame);
    document.body.appendChild(bttOverlay);
    document.body.classList.add("btt-gallery-open");

    showBttImage(0);
    closeButton.focus();
  };

  if (bttTrigger) {
    bttTrigger.addEventListener("mouseenter", createBttGallery);

    bttTrigger.addEventListener("focus", () => {
      if (!hoverCapable.matches) return;
      createBttGallery();
    });
  }


  /* =========================
     GLOBAL KEYBOARD BEHAVIOR
  ========================= */
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBankPreview();
      removeLogisticsPreview();
      closeBttGallery();
      return;
    }

    if (!bttOverlay) return;

    if (event.key === "ArrowLeft") {
      showBttImage(bttCurrentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showBttImage(bttCurrentIndex + 1);
    }
  });

  hoverCapable.addEventListener?.("change", () => {
    closeBankPreview();
    removeLogisticsPreview();
    closeBttGallery();
  });
});
