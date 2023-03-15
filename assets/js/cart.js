

function addCart(id, qtt = 1) {
    
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
                <a href="shop-cart.html" class="button btn view-cart btn-primary">View cart</a>
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
                            <a class="go-shop" href="shop-grid-left.html">GO TO
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
        }
    });


}

loadCart()