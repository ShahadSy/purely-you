document.addEventListener('DOMContentLoaded', function () {
    const cartItems = localStorage.getItem('cartItems') || '';
    const cartItemsArray = cartItems ? cartItems.split(';') : [];
    const cartTableBody = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const messageBox = document.getElementById('discountMessages'); // Optional container for messages

    let total = 0;
    let totalQuantity = 0;
    let freeDelivery = false;
    let discountApplied = false;

    // Render cart items
    cartItemsArray.forEach(item => {
        const [name, price, quantity] = item.split(',');
        if (name && price) {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const priceCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const removeCell = document.createElement('td');

            nameCell.textContent = name.trim();
            priceCell.textContent = price.trim();
            quantityCell.textContent = quantity || '1';

            const itemQuantity = parseInt(quantity) || 1;
            const itemPrice = parseFloat(price.replace('$', '').trim()) || 0;

            totalQuantity += itemQuantity;
            total += itemPrice * itemQuantity;

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.background = '#d17878';
            removeBtn.style.color = 'white';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '5px';
            removeBtn.style.cursor = 'pointer';

            removeBtn.addEventListener('click', () => {
                cartItemsArray.splice(cartItemsArray.indexOf(item), 1);
                localStorage.setItem('cartItems', cartItemsArray.join(';'));
                location.reload();
            });

            removeCell.appendChild(removeBtn);

            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(removeCell);
            cartTableBody.appendChild(row);
        } else {
            console.warn("Invalid cart item:", item);
        }
    });

    // Check and apply discounts
    if (totalQuantity >= 4) {
        discountApplied = true;
        total *= 0.8;
        if (messageBox) {
            const msg = document.createElement('p');
            msg.textContent = '🎉 20% discount applied for purchasing 4 or more items!';
            msg.style.color = '#4CAF50';
            messageBox.appendChild(msg);
        }
    }

    if (total >= 50) {
        freeDelivery = true;
        if (messageBox) {
            const msg = document.createElement('p');
            msg.textContent = '🚚 Free delivery for orders above $50!';
            msg.style.color = '#3f51b5';
            messageBox.appendChild(msg);
        }
    }

    cartTotalElement.textContent = total.toFixed(2);

    // Handle confirm order
    document.getElementById('confirmOrderBtn').addEventListener('click', function () {
        const locationInput = document.getElementById('locationInput').value.trim();
        if (!locationInput) {
            alert('Please enter your location!');
            return;
        }

        const paymentMethod = document.getElementById('paymentMethod').value.trim();
        if (!paymentMethod) {
            alert('Please select a payment method!');
            return;
        }

        if (total === 0) {
            alert('Your cart is empty! Please add items before confirming.');
            return;
        }

        alert('Your order is on the way!');

        // Clear data
        ['cartItems'].forEach(item => localStorage.removeItem(item));

        // Feedback dialog
        const feedbackDialog = document.createElement('div');
        feedbackDialog.style.position = 'fixed';
        feedbackDialog.style.top = '50%';
        feedbackDialog.style.left = '50%';
        feedbackDialog.style.transform = 'translate(-50%, -50%)';
        feedbackDialog.style.backgroundColor = '#fff';
        feedbackDialog.style.padding = '20px';
        feedbackDialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        feedbackDialog.style.zIndex = '1000';

        const question = document.createElement('p');
        question.textContent = 'Did you enjoy the experience?';

        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', function () {
            alert('We are glad to hear this!');
            feedbackDialog.remove();
        });

        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.addEventListener('mouseover', function () {
            noButton.style.position = 'absolute';
            noButton.style.top = `${Math.random() * 80}%`;
            noButton.style.left = `${Math.random() * 80}%`;
        });

        feedbackDialog.appendChild(question);
        feedbackDialog.appendChild(yesButton);
        feedbackDialog.appendChild(noButton);
        document.body.appendChild(feedbackDialog);
    });
});
