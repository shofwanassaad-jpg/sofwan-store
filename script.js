const products = [
    { name: "VIERCORE", price: 50000 },
    { name: "HECTIC", price: 75000 },
    { name: "The dream started chasing me", price: 120000 }
];

const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartTotalItemsElement = document.getElementById('cart-total-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let total = 0;
let itemCount = 0;

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = products[index];
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <span>${product.name} - Rp ${product.price.toLocaleString('id-ID')}</span>
            <button class="remove-from-cart" data-price="${product.price}">🗑️</button>
        `;
        cartItems.appendChild(listItem);
        total += product.price;
        itemCount++;
        updateCartDisplay();
    });
});

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const itemToRemove = event.target.closest('.cart-item');
        const itemPrice = parseInt(event.target.dataset.price);
        itemToRemove.remove();
        total -= itemPrice;
        itemCount--;
        updateCartDisplay();
    }
});

function updateCartDisplay() {
    totalPriceElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    cartTotalItemsElement.textContent = itemCount;
    const emptyCartMessage = document.querySelector('#cart-items p');
    if (itemCount > 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    }
}