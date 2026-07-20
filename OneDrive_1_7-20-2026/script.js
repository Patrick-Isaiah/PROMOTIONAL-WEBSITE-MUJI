document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Toggle Mechanics
  const hamburger = document.getElementById("hamburger-toggle");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
    const isOpen = hamburger.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Interactive Live Search Mechanism
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");
  const searchTrigger = document.getElementById("search-trigger");
  const accordionItems = document.querySelectorAll(".accordion-item");

  searchTrigger.addEventListener("click", (e) => {
    // Prevent collapsing on desktop if the user wants to input text
    if (window.innerWidth >= 768) {
      if (!searchContainer.classList.contains("active")) {
        e.preventDefault();
        searchContainer.classList.add("active");
        searchInput.focus();
      } else if (searchInput.value.trim() === "") {
        // Close search if empty and clicked again
        searchContainer.classList.remove("active");
      }
    }
  });

  // Close desktop input bar when user clicks outside the search area
  document.addEventListener("click", (e) => {
    if (window.innerWidth >= 768 && !searchContainer.contains(e.target)) {
      if (searchInput.value.trim() === "") {
        searchContainer.classList.remove("active");
      }
    }
  });

  // Dynamic Live Query Filtering Logic
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    accordionItems.forEach(item => {
      const headerText = item.querySelector(".accordion-header span").textContent.toLowerCase();
      
      if (headerText.includes(query)) {
        item.classList.remove("hidden");
      } else {
        item.classList.remove("active"); // Shut accordion drawer if it hides
        item.querySelector(".accordion-content").style.maxHeight = null;
        item.classList.add("hidden");
      }
    });
  });

  // Accordion Logic Functions
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const item = this.parentElement;
      const content = this.nextElementSibling;

      document.querySelectorAll(".accordion-item").forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

      item.classList.toggle("active");
      
      if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
});
