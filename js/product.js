(() => {
    // Common Product Functions
    const initProducts = () => {
        document.querySelectorAll('.product').forEach(product => {
            const increaseBtn = product.querySelector('.increase-btn');
            const decreaseBtn = product.querySelector('.decrease-btn');
            const quantitySpan = product.querySelector('.quantity');
            const buyBtn = product.querySelector('.buy-btn');
            const wishlistIcon = product.querySelector('.wishlist-icon');
            const ratingStars = product.querySelectorAll('.rating-stars i');

            // Quantity controls
            [increaseBtn, decreaseBtn].forEach(btn => {
                btn?.addEventListener('click', function (e) {
                    e.stopPropagation();
                    let val = parseInt(quantitySpan.textContent);
                    if (btn === increaseBtn && val < 99) val++;
                    if (btn === decreaseBtn && val > 1) val--;
                    quantitySpan.textContent = val;
                });
            });

            // Wishlist toggle
            wishlistIcon?.addEventListener('click', function (e) {
                e.stopPropagation();
                this.classList.toggle('active');
                const title = product.querySelector('.title').textContent.trim();
                let wishlist = localStorage.getItem('wishlist')?.split('||') || [];
//this part was added for creating the wishlist
                if (this.classList.contains('active')) {
                    if (!wishlist.includes(title)) wishlist.push(title);
                } else {
                    wishlist = wishlist.filter(item => item !== title);
                }

                localStorage.setItem('wishlist', wishlist.join('||'));
            });

            // Rating system
            ratingStars?.forEach((star, index) => {
                star.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const productTitle = product.querySelector('.title').textContent.trim();
                    ratingStars.forEach((s, i) => {
                        s.classList.toggle('active', i <= index);
                    });
                    localStorage.setItem(`rating_${productTitle}`, index + 1);
                });
            });

            // Add to Cart
            buyBtn?.addEventListener('click', function (e) {
                e.stopPropagation();
                const title = product.querySelector('.title').textContent.trim();
                const price = product.querySelector('.price').textContent.trim();
                const quantity = parseInt(quantitySpan.textContent);
                const cartItems = localStorage.getItem('cartItems')?.split(';') || [];

                const newItem = `${title},${price},${quantity}`;
                cartItems.push(newItem);
                localStorage.setItem('cartItems', cartItems.join(';'));
                alert(`${title} (x${quantity}) added to cart!`);
            });
        });
    };

    // Swiper Config
    const initSwiper = () => {
        if (typeof Swiper !== "undefined") {
            new Swiper(".mySwiper", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                slidesPerView: 1,
                spaceBetween: 50,
                breakpoints: {
                    599: {
                        slidesPerView: 3,
                    }
                }
            });
        }
    };

    // Search Functionality
    window.toggleSearch = function () {
        const searchBox = document.getElementById("search-box");
        if (!searchBox) return;
        searchBox.style.display = searchBox.style.display === "none" ? "block" : "none";
        if (searchBox.style.display === "block") searchBox.focus();
    };

    window.searchProduct = function (event) {
        if (event.key === "Enter" || event.type === "click") {
            const query = document.getElementById("search-box").value.trim().toLowerCase();
            if (!query) return;

            let found = false;
            document.querySelectorAll('.product').forEach(product => {
                const title = product.querySelector('.title').textContent.toLowerCase();
                product.classList.remove('highlight');

                if (title.includes(query)) {
                    product.scrollIntoView({ behavior: "smooth", block: "center" });
                    product.classList.add('highlight');
                    found = true;
                }
            });

            if (!found) alert("No products found matching your search.");
        }
    };

    // Sort Functionality
    window.sortProducts = function () {
        const container = document.querySelector(".product-container");
        if (!container) return;

        const products = Array.from(container.children);
        const isAscending = !container.dataset.sorted || container.dataset.sorted === "desc";

        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace("$", ""));
            return isAscending ? priceA - priceB : priceB - priceA;
        });

        container.innerHTML = "";
        products.forEach(product => container.appendChild(product));
        container.dataset.sorted = isAscending ? "asc" : "desc";
    };

    // Initialization on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        initProducts();
        initSwiper();
        AOS?.init?.();

        // Load saved ratings
        document.querySelectorAll('.product').forEach(product => {
            const title = product.querySelector('.title').textContent.trim();
            const rating = localStorage.getItem(`rating_${title}`);
            if (rating) {
                product.querySelectorAll('.rating-stars i').forEach((star, index) => {
                    star.classList.toggle('active', index < rating);
                });
            }
        });
    });
})();
//offer part
function addSpecial(type) {
    let itemName, price;

    if (type === 'skincare') {
        itemName = 'Skincare Routine Package';
        price = '25';
    } else if (type === 'haircare') {
        itemName = 'Haircare Routine Package';
        price = '30';
    } else {
        return;
    }

    const cartItems = localStorage.getItem('cartItems') || '';
    const cartItemsArray = cartItems ? cartItems.split(';') : [];

    // Prevent duplicates
    const exists = cartItemsArray.some(item => item.startsWith(itemName));
    if (!exists) {
        cartItemsArray.push(`${itemName},$${price},1`);
        localStorage.setItem('cartItems', cartItemsArray.join(';'));
        alert(`${itemName} added to your cart!`);
    } else {
        alert(`${itemName} is already in your cart.`);
    }
}
