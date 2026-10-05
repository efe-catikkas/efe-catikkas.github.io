document.addEventListener("DOMContentLoaded", () => {
  const galleries = {
    btt: {
      title: "Operations & Regional Performance Dashboard",
      images: [
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
      ],
      actions: [
        {
          label: "Open Interactive Dashboard",
          href: "projects/btt-humana.html",
          primary: true
        }
      ]
    },

    logistics: {
      title: "Logistics Performance Dashboard",
      images: [
        {
          src: "assets/projects/logistics-performance/logistics%20dashboard%2001.png",
          alt: "Logistics Hub Performance Summary dashboard"
        },
        {
          src: "assets/projects/logistics-performance/logistics%20dashboard%2002.png",
          alt: "Operations and Inventory Control dashboard"
        }
      ],
      actions: [
        {
          label: "View Case Study",
          href: "projects/logistics-performance.html",
          primary: true
        }
      ]
    },

    bank: {
      title: "Bank Marketing Response Prioritization",
      images: [
        {
          src: "assets/projects/bank-marketing/dashboard_01_campaign_decision.png",
          alt: "Campaign Decision and Search Priority dashboard"
        },
        {
          src: "assets/projects/bank-marketing/dashboard_02_target_profile.png",
          alt: "Profile of Prioritized Records dashboard"
        },
        {
          src: "assets/projects/bank-marketing/dashboard_03_model_limitations.png",
          alt: "Model and Limitations dashboard"
        }
      ],
      actions: [
        {
          label: "View Case Study",
          href: "projects/bank-marketing.html",
          primary: true
        },
        {
          label: "View on GitHub",
          href: "https://github.com/efe-catikkas/bank-marketing-response-prioritization_v1",
          external: true
        }
      ]
    }
  };

  let overlay = null;
  let activeGallery = null;
  let currentIndex = 0;

  const closeGallery = () => {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    activeGallery = null;
    currentIndex = 0;
    document.body.classList.remove("project-gallery-open");
  };

  const renderImage = (nextIndex) => {
    if (!overlay || !activeGallery) return;

    const gallery = galleries[activeGallery];
    currentIndex =
      (nextIndex + gallery.images.length) % gallery.images.length;

    const image = overlay.querySelector(".project-gallery-image");
    const counter = overlay.querySelector(".project-gallery-counter");
    const dots = overlay.querySelectorAll(".project-gallery-dot");

    image.src = gallery.images[currentIndex].src;
    image.alt = gallery.images[currentIndex].alt;
    counter.textContent = `${currentIndex + 1} / ${gallery.images.length}`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const openGallery = (galleryKey) => {
    const gallery = galleries[galleryKey];
    if (!gallery) return;

    closeGallery();
    activeGallery = galleryKey;
    currentIndex = 0;

    overlay = document.createElement("div");
    overlay.className = "project-gallery-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `${gallery.title} gallery`);

    const frame = document.createElement("div");
    frame.className = "project-gallery-frame";

    const header = document.createElement("div");
    header.className = "project-gallery-header";

    const title = document.createElement("h2");
    title.textContent = gallery.title;

    const closeButton = document.createElement("button");
    closeButton.className = "project-gallery-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close gallery");
    closeButton.textContent = "×";

    header.appendChild(title);
    header.appendChild(closeButton);

    const stage = document.createElement("div");
    stage.className = "project-gallery-stage";

    const image = document.createElement("img");
    image.className = "project-gallery-image";

    const prevButton = document.createElement("button");
    prevButton.className = "project-gallery-nav project-gallery-prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Previous dashboard");
    prevButton.textContent = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "project-gallery-nav project-gallery-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Next dashboard");
    nextButton.textContent = "›";

    stage.appendChild(image);

    if (gallery.images.length > 1) {
      stage.appendChild(prevButton);
      stage.appendChild(nextButton);
    }

    const footer = document.createElement("div");
    footer.className = "project-gallery-footer";

    const navigation = document.createElement("div");
    navigation.className = "project-gallery-navigation";

    const dots = document.createElement("div");
    dots.className = "project-gallery-dots";

    gallery.images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "project-gallery-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Show dashboard ${index + 1}`);
      dot.addEventListener("click", () => renderImage(index));
      dots.appendChild(dot);
    });

    const counter = document.createElement("span");
    counter.className = "project-gallery-counter";

    navigation.appendChild(dots);
    navigation.appendChild(counter);

    const actions = document.createElement("div");
    actions.className = "project-gallery-actions";

    gallery.actions.forEach((action) => {
      const link = document.createElement("a");
      link.href = action.href;
      link.className =
        "project-gallery-action" +
        (action.primary ? " is-primary" : "");

      if (action.external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      link.textContent = action.label;
      actions.appendChild(link);
    });

    footer.appendChild(navigation);
    footer.appendChild(actions);

    frame.appendChild(header);
    frame.appendChild(stage);
    frame.appendChild(footer);
    overlay.appendChild(frame);
    document.body.appendChild(overlay);
    document.body.classList.add("project-gallery-open");

    closeButton.addEventListener("click", closeGallery);

    prevButton.addEventListener("click", () => {
      renderImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      renderImage(currentIndex + 1);
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeGallery();
      }
    });

    frame.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    renderImage(0);
    closeButton.focus();
  };

  document.querySelectorAll(".project-gallery-trigger").forEach((trigger) => {
    const galleryKey = trigger.dataset.projectGallery;

    trigger.addEventListener("click", () => {
      openGallery(galleryKey);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGallery(galleryKey);
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGallery();
      return;
    }

    if (!overlay || !activeGallery) return;

    if (event.key === "ArrowLeft") {
      renderImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      renderImage(currentIndex + 1);
    }
  });
});
