// script.js

const PRODUCTS = [
  {
    id: 1,
    name: "12mm Plywood",
    price: 25.99,
    image: "images/12mm.jpg",
    desc: "Durable 12mm plywood, ideal for furniture and construction."
  },
  {
    id: 2,
    name: "6mm Plywood",
    price: 15.99,
    image: "images/6mm.jpg",
    desc: "Lightweight 6mm plywood, perfect for paneling and crafts."
  },
  {
    id: 3,
    name: "18mm Plywood",
    price: 32.99,
    image: "images/18mm.jpg",
    desc: "Heavy-duty 18mm plywood for structural applications."
  },
  {
    id: 4,
    name: "Waterproof Plywood",
    price: 39.99,
    image: "images/waterproof.jpg",
    desc: "Water-resistant plywood suitable for kitchens and bathrooms."
  },
  {
    id: 5,
    name: "Fireproof Plywood",
    price: 49.99,
    image: "images/fireproof.jpg",
    desc: "Fire-retardant plywood for enhanced safety."
  },
  {
    id: 6,
    name: "High-Quality Plywood",
    price: 45.99,
    image: "images/highquality.jpg",
    desc: "Premium plywood with smooth finish for luxury interiors."
  },
  {
    id: 7,
    name: "Block Boards",
    price: 29.99,
    image: "images/blockboard.jpg",
    desc: "Strong block boards for doors and partitions."
  },
  {
    id: 8,
    name: "Flush Doors",
    price: 59.99,
    image: "images/flushdoor.jpg",
    desc: "Sturdy flush doors with elegant design."
  }
];

// --- Cart Logic ---
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(id) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
  alert('Added to cart!');
  updateCartCount();
}
function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}
function updateQty(id, qty) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) item.qty = qty;
  saveCart(cart);
  renderCart();
  updateCartCount();
}
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// --- Render Products (for products.html) ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <p class="price">$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

// --- Render Cart (for cart.html) ---
function renderCart() {
  const table = document.getElementById('cart-table-body');
  const totalEl = document.getElementById('cart-total');
  if (!table || !totalEl) return;
  const cart = getCart();
  let total = 0;
  table.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;
    return `
      <tr>
        <td><img src="${p.image}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>$${p.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" style="width:50px"
            onchange="updateQty(${item.id}, this.valueAsNumber)">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
      </tr>
    `;
  }).join('');
  totalEl.textContent = '$' + total.toFixed(2);
  if (cart.length === 0) {
    table.innerHTML = `<tr><td colspan="6" style="text-align:center">Your cart is empty.</td></tr>`;
  }
}

// --- On page load ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  updateCartCount();
});
