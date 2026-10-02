// Interactive Script for 508 Pizza Redesign

const menuData = {
    pizzas: [
        { name: "Signature 508 Special", price: 28, desc: "House special blend of mozzarella, pepperoni, seasoned beef, mushrooms, bell peppers, and black olives." },
        { name: "Classic Margherita", price: 18, desc: "Fresh Fior di Latte mozzarella, rich San Marzano tomato sauce, fresh basil leaves, and extra virgin olive oil." },
        { name: "Pepperoni Passion", price: "24", desc: "Generous layers of premium spicy pepperoni slices over melted mozzarella and tomato base." },
        { name: "Quattro Formaggi", price: 26, desc: "Mozzarella, gorgonzola, parmesan, and provolone cheese blend with a touch of oregano." },
        { name: "BBQ Chicken", price: 25, desc: "Grilled chicken breast chunks, smoky barbecue sauce drizzle, red onions, cilantro, and mozzarella." },
        { name: "Vegetarian Supreme", price: 22, desc: "Mushroom, bell peppers, sweet corn, sliced tomatoes, black olives, and fresh red onions." }
    ],
    sides: [
        { name: "Garlic Butter Crust with Cheese", price: 12, desc: "Fresh baked artisan dough brushed with garlic herb butter and topped with melted mozzarella." },
        { name: "Spicy Buffalo Wings", price: 16, desc: "Crispy chicken wings tossed in our signature tangy and spicy buffalo sauce." },
        { name: "Crispy Potato Wedges", price: 10, desc: "Seasoned golden potato wedges served with house special dipping sauce." }
    ],
    drinks: [
        { name: "Soft Drinks (Cola, Diet Cola, Sprite)", price: 4, desc: "Chilled 330ml canned beverages." },
        { name: "Fresh Lemon Mint Juice", price: 7, desc: "Hand-crafted refreshing lemonade blended with fresh mint leaves." },
        { name: "Mineral Water", price: 2, desc: "Pure bottled drinking water (500ml)." }
    ],
    desserts: [
        { name: "Nutella Calzone", price: 15, desc: "Folded artisan pizza crust filled with warm creamy Nutella hazelnut spread and dusted with powdered sugar." },
        { name: "Tiramisu", price: 18, desc: "Classic Italian dessert with ladyfingers dipped in espresso, layered with whipped mascarpone." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Menu Rendering & Filtering
    const menuContainer = document.getElementById('menu-items');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    function renderMenu(category) {
        const items = menuData[category] || [];
        menuContainer.innerHTML = items.map(item => `
            <div class="menu-card" data-name="${item.name}" data-price="${parseInt(item.price)}">
                <div class="menu-item-header">
                    <span class="menu-item-title">${item.name}</span>
                    <span class="menu-item-price">${item.price} LYD</span>
                </div>
                <p class="menu-item-desc">${item.desc}</p>
            </div>
        `).join('');

        // Attach click listeners to menu cards to open modal
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const basePrice = parseInt(card.getAttribute('data-price'));
                openOrderModal(name, basePrice);
            });
        });
    }

    renderMenu('pizzas');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(btn.getAttribute('data-category'));
        });
    });

    // Modal Handling
    const modal = document.getElementById('order-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalTrigger = document.getElementById('order-modal-trigger');
    const exploreBtn = document.getElementById('explore-menu-btn');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const toast = document.getElementById('toast');

    let currentItem = { name: "Signature 508 Special", basePrice: 28, sizePrice: 0, crustPrice: 0 };

    function openOrderModal(itemName, basePrice) {
        currentItem.name = itemName;
        currentItem.basePrice = basePrice;
        currentItem.sizePrice = 0;
        currentItem.crustPrice = 0;

        document.getElementById('modal-item-name').innerText = itemName;
        
        // Reset chips
        document.querySelectorAll('#size-options .chip').forEach((c, idx) => {
            c.classList.toggle('active', idx === 0);
        });
        document.querySelectorAll('#crust-options .chip').forEach((c, idx) => {
            c.classList.toggle('active', idx === 0);
        });
        document.getElementById('order-notes').value = '';

        updateModalPrice();
        modal.classList.add('active');
    }

    function updateModalPrice() {
        const total = currentItem.basePrice + currentItem.sizePrice + currentItem.crustPrice;
        document.getElementById('modal-total-price').innerText = total + " LYD";
    }

    if (modalTrigger) {
        modalTrigger.addEventListener('click', () => openOrderModal("Signature 508 Special", 28));
    }
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }

    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Size & Crust Chip selection
    document.querySelectorAll('#size-options .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('#size-options .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentItem.sizePrice = parseInt(chip.getAttribute('data-price'));
            updateModalPrice();
        });
    });

    document.querySelectorAll('#crust-options .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('#crust-options .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentItem.crustPrice = chip.getAttribute('data-crust') === 'Cheese Stuffed' ? 4 : 0;
            updateModalPrice();
        });
    });

    confirmOrderBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        showToast("Order placed successfully! We are preparing your fresh pizza.");
    });

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Lightbox handling
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-secondary)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
});
