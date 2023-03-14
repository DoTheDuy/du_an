

function addCart(id, qtt, ele) {

    var form_data = new FormData();
    form_data.append('id', id);
    form_data.append('qtt', qtt);
    $.ajax({
        url: "api/main.php?act=addCart", //Server api to receive the file
        type: "POST",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (suc) {
            showBtnCart(ele)
            loadCart()
        }
    });

}

function loadCart() {
    var headerDesktop = document.querySelector('.header-desktop')
    var cartCount = headerDesktop.querySelector(".cart-count")
    var cartBlock = headerDesktop.querySelector('.cart-popup')
    cartBlock.innerHTML = `
        <div class="cart-list-wrap">
            <ul class="cart-list ">

            </ul>
            <div class="total-cart">
                <div class="title-total">Total: </div>
                <div class="total-price"><span>$100.00</span></div>
            </div>
            <div class="free-ship">
                <div class="title-ship">Buy <strong>$400</strong> more to
                    enjoy <strong>FREE Shipping</strong></div>
                <div class="total-percent">
                    <div class="percent" style="width:20%"></div>
                </div>
            </div>
            <div class="buttons">
                <a href="?act=shop-cart" class="button btn view-cart btn-primary">View cart</a>
                <a href="shop-checkout.html" class="button btn checkout btn-default">Check out</a>
            </div>
        </div>
    `
    var totalCart = headerDesktop.querySelector('.total-cart')
    var totalPrice = totalCart.querySelector('.total-price').querySelector('span')
    var freeShip = headerDesktop.querySelector('.free-ship')
    var cart = headerDesktop.querySelector(".cart-list")

    $.ajax({
        url: "api/main.php?act=loadCart", //Server api to receive the file
        type: "GET",
        cache: false,
        contentType: false,
        processData: false,
        success: function (suc) {
            var listPro = JSON.parse(suc)
            cartCount.style.display = "none"
            if (listPro.length == 0) {
                cartBlock.innerHTML = `
                <div class="cart-list-wrap">
                    <ul class="cart-list">
                        <li class="empty">
                            <span>No products in the cart.</span>
                            <a class="go-shop" href="?act=shop-grid-left">GO TO
                                SHOP<i aria-hidden="true" class="arrow_right"></i></a>
                        </li>
                    </ul>
                </div>
                `

            } else {
                cartCount.style.display = "block"
                cartCount.innerHTML = listPro.length
                var cartHTML = ``
                var total = 0
                listPro.forEach((pro) => {
                    var id = pro['id'];
                    var name = pro['name'];
                    var img = pro['img'];
                    var qtt = Number(pro['qtt']);
                    var price = Number(pro['price']) * qtt;
                    total += price
                    cartHTML += `
                        <li class="mini-cart-item">
                            <a href="#" class="remove" title="Remove this item" onclick="removeCart(${id})"><i class="icon_close"></i></a>
                            <a href="shop-details.html" class="product-image"><img width="600" height="600" src="media/product/${img}" alt=""></a>
                            <a href="shop-details.html" class="product-name">${name}</a>
                            <div class="quantity">Qty: ${qtt}</div>
                            <div class="price">$${price}</div>
                        </li>
                    `
                })

                cart.innerHTML = cartHTML
                totalPrice.innerHTML = `$${total.toFixed(2)}`
            }
        }
    });
}

function removeCart(id) {

    var form_data = new FormData();
    form_data.append('id', id);
    $.ajax({
        url: "api/main.php?act=removeCart", //Server api to receive the file
        type: "POST",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (suc) {
            loadCart()
            if (location.href.includes('shop-cart')) loadTableCart()
        }
    });


}

loadCart()

function addCartQtt(id, ele) {
    // Event.preventDefault()
    var qtt = document.querySelector("input[name='quantity']").value
    addCart(id, Number(qtt), ele)
}
var a = document.querySelector('a')
// a.parentElement
function showBtnCart(ele) {
    var btn = ele.parentElement
    var btnAdd = ele

    btnAdd.classList.add("loading")
    setTimeout(() => {
        btnAdd.classList.remove('loading')
        btnAdd.classList.add("added")
        btn.innerHTML = `
        <a href="?act=shop-cart" class="added-to-cart product-btn show" title="View cart" tabindex="0">View cart</a>
    `
    }, 1000);
}

function loadTableCart() {
    var shopCart = document.querySelector(".shop-cart")
    var tableCart = shopCart.querySelector(".cart-items")
    var listCart = tableCart.querySelector('tbody')
    var cartSubtotal = shopCart.querySelector('.cart-subtotal').querySelector('span')
    listCart.innerHTML = ``
    var total = 0
    $.ajax({
        url: "api/main.php?act=loadCart", //Server api to receive the file
        type: "GET",
        cache: false,
        contentType: false,
        processData: false,
        success: function (suc) {
            var listPro = JSON.parse(suc)
            if (listPro.length != 0) {
                listPro.forEach(pro => {
                    var id = pro['id'];
                    var name = pro['name'];
                    var img = pro['img'];
                    var qtt = Number(pro['qtt']);
                    var price = Number(pro['price']);
                    var subTotal = price * qtt;
                    total += subTotal
                    listCart.innerHTML += `
                        <tr class="cart-item">
                            <td class="product-thumbnail">
                                <a href="shop-details.html">
                                    <img width="600" height="600" src="media/product/${img}" class="product-image" alt="">
                                </a>
                                <div class="product-name">
                                    <a href="shop-details.html">${name}</a>
                                </div>
                            </td>
                            <td class="product-price">
                                <span>$${price.toFixed(2)}</span>
                            </td>
                            <td class="product-quantity">
                                <div class="quantity">
                                    <button type="button" class="minus" onclick="changeQuantityCartTable(this, event)">-</button>
                                    <input type="number" class="qty" step="1" min="0" max="" name="quantity" value="${qtt}" title="Qty" size="4" placeholder="" inputmode="numeric" autocomplete="off" onkeyup="changeQuantityCartTable(this, event)">
                                    <button type="button" class="plus" onclick="changeQuantityCartTable(this, event)">+</button>
                                </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="price">$${subTotal.toFixed(2)}</span>
                            </td>
                            <td class="product-remove">
                                <a class="remove" onclick="removeCart(${id})">×</a>
                            </td>
                        </tr>
                    `
                })
                cartSubtotal.innerHTML = `$${total.toFixed(2)}`
            } else {
                shopCart.parentElement.innerHTML = `
                    <div class="shop-cart" style="margin-bottom: 20px;">
                        <div class="notices-wrapper">
                            <p class="cart-empty">Your cart is currently empty.</p>
                        </div>
                        <div class="return-to-shop">
                            <a class="button" href="?act=shop-grid-left">
                                Return to shop
                            </a>
                        </div>
                    </div>
                `

            }
        }
    });
}

function changeQuantityCartTable(ele, event) {
    var classEle = ele.classList
    var cartItem = ele.parentElement.parentElement.parentElement
    var quantityLast = cartItem.querySelector('.qty').value
    var quantityEle = cartItem.querySelector('.qty')
    var totalEle = cartItem.querySelector('.price')
    var productPrice = cartItem.querySelector('.product-price').querySelector('span')
    var key = event.which || event.keyCode || event.charCode;
    if (classEle.contains('qty')) {
        if (!isNaN(event.key)) {
            var quantity = Number(quantityLast + event.key)
            var price = Number(productPrice.innerHTML.slice(1))
            var total = quantity * price
            totalEle.innerHTML = `$${total.toFixed(2)}`
        }

        if(key == 8) {
            
            if(quantityLast.length == 0) {
                quantityEle.value = 1
                quantity = 1
            } else {
                quantity = quantityLast
            }
            
            var price = Number(productPrice.innerHTML.slice(1))
            var total = quantity * price
            totalEle.innerHTML = `$${total.toFixed(2)}`
        }
    } else if (classEle.contains('plus')) {
        var quantity = Number(quantityLast) + 1
        
        var price = Number(productPrice.innerHTML.slice(1))
        var total = quantity * price
        totalEle.innerHTML = `$${total.toFixed(2)}`
    } else {
        var quantity = Number(quantityLast) - 1
        if(quantity == 0) quantity = 1
        var price = Number(productPrice.innerHTML.slice(1))
        var total = quantity * price
        totalEle.innerHTML = `$${total.toFixed(2)}`
    }

}


if (location.href.includes('shop-cart')) { loadTableCart() }
