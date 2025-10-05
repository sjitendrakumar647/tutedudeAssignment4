{/* <script> */}
  let cart = [];
  let totalPrice = 0;

  function addItem(service, price) {
    cart.push({ service, price });
    totalPrice += price;
    renderCart();
  }

  function removeItem(service) {
    const index = cart.findIndex(item => item.service === service);
    if (index !== -1) {
      totalPrice -= cart[index].price;
      cart.splice(index, 1);
      renderCart();
    }
  }

  function renderCart() {
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = "";
    cart.forEach((item, index) => {
      cartBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.service}</td>
          <td>₹${item.price}</td>
        </tr>
      `;
    });
    document.getElementById("total").innerText = "Total: ₹" + totalPrice;
  }

  // Booking form submission (demo)
  document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("confirmation").style.display = "block";
    this.reset();
    cart = [];
    totalPrice = 0;
    renderCart();
  });
  
// </script>
