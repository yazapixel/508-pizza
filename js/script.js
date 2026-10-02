// Arabic Menu Data and Interactivity

const menuData = {
    pizzas: [
        { name: "بيتزا 508 الخاصة", price: 28, desc: "الخلطة الخاصة بالمطعم من الموتزاريلا، الببروني، اللحم المتبل، الفطر، الفلفل الحلو، والزيتون الأسود." },
        { name: "مارغريتا كلاسيك", price: 18, desc: "جبن فاور دي لاتي موتزاريلا الطازج، صلصة طماطم سان مارزانو الغنية، أوراق الريحان الطازج، وزيت الزيتون البكر." },
        { name: "ببروني باشن", price: 24, desc: "شرائح الببروني الحارة الفاخرة فوق طبقة وفيرة من الموتزاريلا وصلصة الطماطم." },
        { name: "أربع أجبان (كواترو فورماجي)", price: 26, desc: "مزيج فاخر من أجبان الموتزاريلا، جورجونزولا، البارميزان، والبروفولون مع لمسة زعتر بري." },
        { name: "بي بي كيو تشيكن", price: 25, desc: "قطع صدور الدجاج المشوية، صوص باربيكيو المدخن، البصل الأحمر، الكزبرة، وجبن الموتزاريلا." },
        { name: "سوبريم الخضار", price: 22, desc: "فطر، فلفل حلو، ذرة حلوة، شرائح الطماطم، زيتون أسود، وبصل أحمر طازج." }
    ],
    sides: [
        { name: "أطراف بالثوم والجبن", price: 12, desc: "عجينة مخبوزة طازجة مدهونة بزبدة الأعشاب والثوم ومغطاة بجبن الموتزاريلا الذائب." },
        { name: "أجنحة دجاج حارة", price: 16, desc: "أجنحة دجاج مقرمشة مغموسة بصوص البافلو الحار والخاص." },
        { name: "بطاطا ودجز مقرمشة", price: 10, desc: "أصابع البطاطا المتبلة والمخبوزة حتى العصر مع صوص التغميس الخاص." }
    ],
    drinks: [
        { name: "مشروبات غازية (كولا، دييت كولا، سبرايت)", price: 4, desc: "علب باردة 330 مل." },
        { name: "عصير ليمون بالنعناع الطازج", price: 7, desc: "عصير منعش محضر يدويًا مع أوراق النعناع الطازجة." },
        { name: "مياه معدنية", price: 2, desc: "مياه شرب نقية معبأة (500 مل)." }
    ],
    desserts: [
        { name: "كالتزون نوتيلا", price: 15, desc: "عجينة بيتزا مخبوزة محشوة بشوكولاتة النوتزلا الدافئة والكريمة ومزينة بسكر البودرة." },
        { name: "تيراميسو", price: 18, desc: "حلوى إيطالية كلاسيكية من بسكويت السافوياردي المنقوع بالإسبريسو وطبقات الماسكاربوني." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    function renderMenu(category) {
        const items = menuData[category] || [];
        menuContainer.innerHTML = items.map(item => `
            <div class="menu-card" data-name="${item.name}" data-price="${parseInt(item.price)}">
                <div class="menu-item-header">
                    <span class="menu-item-title">${item.name}</span>
                    <span class="menu-item-price">${item.price} دينار</span>
                </div>
                <p class="menu-item-desc">${item.desc}</p>
            </div>
        `).join('');

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

    const modal = document.getElementById('order-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalTrigger = document.getElementById('nav-order-btn');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const toast = document.getElementById('toast');

    let currentItem = { name: "بيتزا 508 الخاصة", basePrice: 28, sizePrice: 0, crustPrice: 0 };

    function openOrderModal(itemName, basePrice) {
        currentItem.name = itemName;
        currentItem.basePrice = basePrice;
        currentItem.sizePrice = 0;
        currentItem.crustPrice = 0;

        document.getElementById('modal-item-name').innerText = itemName;
        
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
        document.getElementById('modal-total-price').innerText = total + " دينار";
    }

    if (modalTrigger) {
        modalTrigger.addEventListener('click', () => openOrderModal("بيتزا 508 الخاصة", 28));
    }

    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

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
            currentItem.crustPrice = chip.getAttribute('data-crust') === 'محشوة بالجبن' ? 4 : 0;
            updateModalPrice();
        });
    });

    confirmOrderBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        showToast("تم إرسال طلبك بنجاح! نحن نقوم بتحضير طلبك الآن.");
    });

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

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

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-secondary)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
                navLinks.style.textAlign = 'right';
            }
        });
    }
});
