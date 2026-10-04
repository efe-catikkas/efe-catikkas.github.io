document.addEventListener("DOMContentLoaded", () => {
  const hoverCapable = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const previews = [
    {
      triggerSelector: ".bank-marketing-card .project-image-preview",
      bodyClass: "bank-preview-open"
    },
    {
      triggerSelector: ".logistics-card .project-image-preview",
      bodyClass: "logistics-preview-open"
    }
  ];

  const closeAllPreviews = () => {
    previews.forEach(({ bodyClass }) => {
      document.body.classList.remove(bodyClass);
    });
  };

  previews.forEach(({ triggerSelector, bodyClass }) => {
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    const openPreview = () => {
      if (!hoverCapable.matches) return;
      closeAllPreviews();
      document.body.classList.add(bodyClass);
    };

    const closePreview = () => {
      document.body.classList.remove(bodyClass);
    };

    trigger.addEventListener("mouseenter", openPreview);
    trigger.addEventListener("mouseleave", closePreview);

    trigger.addEventListener("focus", openPreview);
    trigger.addEventListener("blur", closePreview);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPreviews();
    }
  });

  hoverCapable.addEventListener?.("change", closeAllPreviews);
});
