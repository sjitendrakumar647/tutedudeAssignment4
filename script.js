//Here we create a cart array to store the services.
let cart = [];

function addItem(service, price, index) {
  cart.push({ service, price });
  document.getElementById(`add-${index}`).style.display = "none";
  document.getElementById(`remove-${index}`).style.display = "inline";
  updateCart();
}

//This method is udes to remove the item from the cart.
function removeItem(service, index) {
  cart = cart.filter((item) => item.service !== service);
  document.getElementById(`remove-${index}`).style.display = "none";
  document.getElementById(`add-${index}`).style.display = "inline";
  updateCart();
}

function updateCart() {

  const cartBody = document.getElementById("cart-body");

  // It clears the previous cart content before adding new rows.
  //if we don't write this the in result shows the new list along with previously added list.
  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}</td><td>${item.service}</td><td>₹${
      item.price
    }</td>`;
    cartBody.appendChild(row);
  });

  document.getElementById("total").textContent = `Total: ₹${total}`;
}

document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the page from reloading

    const selectedServices = cart
      .map((item) => `${item.service} (₹${item.price})`)
      .join(", ");
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      services: selectedServices,
      total: `₹${totalAmount}`,
    };

    emailjs
      .send("service_wmuz8ee", "template_647g5f8", params)
      .then(() => {
        document.getElementById("confirmation").style.display = "block";
        this.reset();
        cart = [];
        updateCart();
      })
      .catch(() => alert("Email failed. Try again."));
  });

document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
  });
