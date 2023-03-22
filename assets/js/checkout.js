$('#checkout_place_order').click(function (e) {
    validateCheckout()
});

function validateCheckout() {

    var name = $('input[name = "name"]').val()
    var province = $("#province option:selected").text()
    var district = $("#district option:selected").text()
    var ward = $("#ward option:selected").text()
    var detail = $("#detail").val()
    var phone = $('input[name = "phone"]').val()
    if(name == "" || province == "Chọn vùng" || district == "Chọn vùng" || ward == "Chọn vùng" || detail == "" || phone == "") {
        toast({
            title: "Thất bại!",
            message: "Các trường đánh dấu không được để trống",
            type: "error",
            duration: 5000
        });
        return
    } 

    for (let index = 0; index < phone.length; index++) {
        if(isNaN(phone[index])) {
            toast({
                title: "Thất bại!",
                message: "Số điện thoại chỉ được nhập số",
                type: "error",
                duration: 5000
            });
            $('input[name = "phone"]').focus();
            return
        }
    }

    if(phone.length != 10) {
        toast({
            title: "Thất bại!",
            message: "Số điện thoại phải có 10 số",
            type: "error",
            duration: 5000
        });
        $('input[name = "phone"]').focus();
        return
    }

    var order_comments = $('input[name = "order_comments"]').val()
    var pttt = $('input[name = "payment_method"]:checked').val();
    var total = Number($('.subtotal-price span').text().slice(1))
    var shipValue = $('input[name = "shipping_method"]:checked').val()
    var address = detail + ", " + ward + ", " + district + ", " + province

    console.log(address )
}


$('.shipping-methods').click(function (e) {
    orderTotal()
});

$(document).ready(function () {
    orderTotal()
    // validateCheckout()
});


