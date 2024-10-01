document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.header__menu-icon');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const openCartIcon = document.getElementById('cartIconOpen');
    const cartSection = document.querySelector(".cart");
    const closeCartButton = document.getElementById("closeCart");
    const addToCartButtons = document.querySelectorAll('.products__add-to-cart');
    const cartItemsContainer = document.querySelector('.cart');
    const cartBadge = document.getElementById('cartBadge'); 
    let cartItemCount = 0;

    function openSidebar() {
        sidebar.classList.add('sidebar--active');
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar--active');
    }

    function openCart() {
        cartSection.classList.add('cart--active');
    }

    function isCartVisible() {
        return cartSection.classList.contains('cart--active');
    }

    function updateCartBadge() {
        cartBadge.textContent = cartItemCount; 
        if (cartItemCount > 0) {
            cartBadge.style.display = 'block'; 
        } else {
            cartBadge.style.display = 'none'; 
        }
    }

    // Se trabajan los event listeners
    menuIcon.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    openCartIcon.addEventListener('click', openCart);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (isCartVisible()) { // Evaluamos que el carrito esté visible
                const product = e.target.closest('.products__items');
                const productName = product.querySelector('.products__description').textContent;
                const productPrice = product.querySelector('.products__price').textContent;
                const productImg = product.querySelector('.products__img').src;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart__items');
                cartItem.innerHTML = `
                    <img class="cart__img" src="${productImg}" alt="">
                    <p class="cart__price">${productPrice}</p>
                    <p>${productName}</p>
                    <i class="cart__icon"><img src="img/basura.png" alt="Icono eliminar" class="delete__item"></i>
                `;

                cartItemsContainer.appendChild(cartItem);
                cartItemCount++; // Incrementar el contador
                updateCartBadge(); 

                cartItem.querySelector('.delete__item').addEventListener('click', function() {
                    cartItem.remove();
                    cartItemCount--; 
                    updateCartBadge(); 
                });
            } else {
                alert("Por favor, abre el carrito antes de agregar un producto.");
            }
        });
    });

    closeCartButton.addEventListener("click", () => {
        cartSection.classList.remove('cart--active');
    });

    
    updateCartBadge();
});
