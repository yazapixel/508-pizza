// Menu Data and Interactivity

const menuData = {
    pizzas: [
        { name: "Signature 508 Special", price: "28 LYD", desc: "House special blend of mozzarella, pepperoni, seasoned beef, mushrooms, bell peppers, and black olives." },
        { name: "Classic Margherita", price: "18 LYD", desc: "Fresh Fior di Latte mozzarella, rich San Marzano tomato sauce, fresh basil leaves, and extra virgin olive oil." },
        { name: "Pepperoni Passion", price: "24 LYD", desc: "Generous layers of premium spicy pepperoni slices over melted mozzarella and tomato base." },
        { name: "Quattro Formaggi", price: "26 LYD", desc: "Mozzarella, gorgonzola, parmesan, and provolone cheese blend with a touch of oregano." },
        { name: "BBQ Chicken", price: "25 LYD", desc: "Grilled chicken breast chunks, smoky barbecue sauce drizzle, red onions, cilantro, and mozzarella." },
        { name: "Vegetarian Supreme", price: "22 LYD", desc: "Mushroom, bell peppers, sweet corn, sliced tomatoes, black olives, and fresh red onions." }
    ],
    sides: [
        { name: "Garlic Butter Crust with Cheese", price: "12 LYD", desc: "Fresh baked artisan dough brushed with garlic herb butter and topped with melted mozzarella." },
        { name: "Spicy Buffalo Wings", price: "16 LYD", desc: "Crispy chicken wings tossed in our signature tangy and spicy buffalo sauce." },
        { name: "Crispy Potato Wedges", price: "10 LYD", desc: "Seasoned golden potato wedges served with house special dipping sauce." }
    ],
    drinks: [
        { name: "Soft Drinks (Cola, Diet Cola, Sprite)", price: "4 LYD", desc: "Chilled 330ml canned beverages." },
        { name: "Fresh Lemon Mint Juice", price: "7 LYD", desc: "Hand-crafted refreshing lemonade blended with fresh mint leaves." },
        { name: "Mineral Water", price: "2 LYD", desc: "Pure bottled drinking water (500ml)." }
    ],
    desserts: [
        { name: "Nutella Calzone", price: "15 LYD", desc: "Folded artisan pizza crust filled with warm creamy Nutella hazelnut spread and dusted with powdered sugar." },
        { name: "Tiramisu", price: "18 LYD", desc: "Classic Italian dessert with ladyfingers dipped in espresso, layered with whipped mascarpone." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    function renderMenu(category) {
        const items = menuData[category] || [];
        menuContainer.innerHTML = items.map(item => `
            <div class="menu-card">
                <div class="menu-item-header">
                    <span class="menu-item-title">${item.name}</span>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p class="menu-item-desc">${item.desc}</p>
            </div>
        `).join('');
    }

    // Initial render
    renderMenu('pizzas');

    // Category switching
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderMenu(category);
        });
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
                navLinks.style.background = '#0d0d0f';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }
});
