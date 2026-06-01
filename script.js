window.addEventListener("DOMContentLoaded", () => {
  /* ================= SLIDER ================= */
  let currentIndex = 0;
  const slides = document.getElementById("slides");

  if (slides) {
    const totalSlides = slides.children.length;

    function updateSlider() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    window.nextSlide = function () {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    };

    window.prevSlide = function () {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    };

    setInterval(() => {
      nextSlide();
    }, 2000);
  }

  /* ================= SEARCH + FILTER ================= */
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const cards = document.querySelectorAll(".card");

  function filterProducts() {
    const searchValue = search ? search.value.toLowerCase() : "";
    const filterValue = filter ? filter.value : "all";

    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;

      const matchSearch = name.includes(searchValue);
      const matchFilter = filterValue === "all" || filterValue === category;

      card.style.display = matchSearch && matchFilter ? "block" : "none";
    });
  }

  if (search && filter) {
    search.addEventListener("input", filterProducts);
    filter.addEventListener("change", filterProducts);
  }

  /* ================= CART ================= */
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  let cart = [];

  window.addToCart = function (name, price) {
    let item = cart.find((i) => i.name === name);

    if (item) {
      item.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
  };

  window.changeQty = function (index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }

    renderCart();
  };

  function renderCart() {
    if (!cartItems || !totalEl) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name}
        <button onclick="changeQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
        = $${item.price * item.qty}
      `;

      cartItems.appendChild(li);
    });
    window.clearCart = function () {
      cart = [];
      renderCart();
    };

    totalEl.textContent = total;
  }
});
