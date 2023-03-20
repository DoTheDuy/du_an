function loadCartBill() {
    $.ajax({
        url: "api/main.php?act=loadCart", //Server api to receive the file
        type: "GET",
        cache: false,
        contentType: false,
        processData: false,
        success: function (suc) {
            var listPro = JSON.parse(suc)
            var items = ``
            var total = 0
            listPro.forEach(pro => {
                var id = pro['id'];
                var name = pro['name'];
                var img = pro['img'];
                var qty = Number(pro['qty']);
                var price = Number(pro['price']);
                var subTotal = price * qty;
                total += subTotal;
                var item = `
                    <div class="cart-item">
                        <div class="info-product">
                            <div class="product-thumbnail">
                                <img width="600" height="600" src="media/product/${img}" alt="">
                            </div>
                            <div class="product-name">
                                ${name}
                                <strong class="product-quantity">QTY : ${qty}</strong>
                            </div>
                        </div>
                        <div class="product-total">
                            <span>$${subTotal}</span>
                        </div>
                    </div>
                `
                items += item
            });
            $('.cart-items').html(items)
            $('.subtotal-price').html(`
                <span>$${total}</span>
            `)
        }
    });
}

loadCartBill()
$('.dropdown-menu').hide();
$('.remove-cart-shadow').hide();
$('.ruper-topcart').click(function (e) { 
    toast({
        title: "Cảnh báo!",
        message: "Trong bill không được chỉnh sửa giỏ hàng",
        type: "warning",
        duration: 5000
    });
});