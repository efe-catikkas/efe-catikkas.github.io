document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(
    ".bank-marketing-card .project-image-preview"
  );
  const overlay = document.querySelector(
    ".bank-marketing-hover-overlay"
  );

  if (!trigger || !overlay) return;

  const hoverCapable = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const openPreview = () => {
    if (!hoverCapable.matches) return;
    document.body.classList.add("bank-preview-open");
  };

  const closePreview = () => {
    document.body.classList.remove("bank-preview-open");
  };

  trigger.addEventListener("mouseenter", openPreview);
  trigger.addEventListener("mouseleave", closePreview);

  trigger.addEventListener("focus", openPreview);
  trigger.addEventListener("blur", closePreview);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePreview();
    }
  });

  hoverCapable.addEventListener?.("change", closePreview);
});
