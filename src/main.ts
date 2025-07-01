import "./styles/main.css";
import "./styles/lapis/lapis.css";
import "./styles/lapis/lapis-dark.css";
import "./styles/toc.css";
import "virtual:uno.css";
import Alpine from "alpinejs";
import { initToc } from "./scripts/toc";

window.Alpine = Alpine;

export function enableResizeImage() {
  if (window.location.pathname === "/moments") {
    return;
  }

  // Resize images automatically, set width to 80%, or 100% for small screens
  function resizeImage(): void {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(".write img");
    const screenWidth: number = window.innerWidth;

    images.forEach((img: HTMLImageElement) => {
      img.removeAttribute("width");
      img.removeAttribute("height");

      const aspectRatio: number = img.naturalHeight / img.naturalWidth;

      if (screenWidth > 768) {
        img.style.width = "80%";
        if (aspectRatio > 1.5) {
          img.style.width = "50%";
        }
      } else {
        img.style.width = "100%";
      }

      // Center the image
      (img.parentElement as HTMLParagraphElement).style.textAlign = "center";
    });
  }
  resizeImage();

  window.addEventListener("resize", resizeImage);
}

Alpine.data("prefersColorScheme", () => ({
  colorScheme: "color-scheme-light",
  colorSchemeQuery: window.matchMedia("(prefers-color-scheme: dark)"),
  themeMode: "auto",
  init() {
    // Get theme mode from data attribute
    this.themeMode = document.body.dataset.themeMode || "auto";
    console.log("Theme mode:", this.themeMode);
    
    this.colorSchemeQuery.addEventListener("change", () => {
      if (this.themeMode === "auto") {
        this.updateColorScheme();
      }
    });
    this.updateColorScheme();
  },
  updateColorScheme() {
    const oldScheme = this.colorScheme;
    switch (this.themeMode) {
      case "light":
        this.colorScheme = "color-scheme-light";
        break;
      case "dark":
        this.colorScheme = "color-scheme-dark";
        break;
      case "auto":
      default:
        this.colorScheme = "color-scheme-auto";
        break;
    }
    console.log("Color scheme changed from", oldScheme, "to", this.colorScheme);
  },
}));

Alpine.start();

// Initialize TOC for post pages
document.addEventListener("DOMContentLoaded", () => {
  initToc();
});
