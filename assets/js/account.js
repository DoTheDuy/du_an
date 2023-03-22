$('#save-changes').click(() => {
    var name = $("input[name='account_name']").val()
    var passCur = $("input[name='password_current']").val()
    var password_1 = $("input[name='password_1']").val()
    var password_2 = $("input[name='password_2']").val()
    var email = $("input[name='account_email']").val()

    if(name == "" || passCur == "" || password_1 == 0 || password_2 == 0) {
        toast({
            title: "Thất bại!",
            message: "Các trường đánh dấu không được bỏ trống",
            type: "error",
            duration: 5000
        });
        return
    }

    if(password_1.length < 6 || password_2 < 6) {
        toast({
            title: "Thất bại!",
            message: "Password không được ngắn hơn 6 ký tự",
            type: "error",
            duration: 5000
        });
        return
    }

    if(password_1 != password_2) {
        toast({
            title: "Thất bại!",
            message: "Password không giống nhau xin mời xem lại",
            type: "error",
            duration: 5000
        });
        return
    }

    var form_data = new FormData();
    form_data.append('email', email);
    form_data.append('password', passCur);
    form_data.append('passwordNew', password_1);
    form_data.append('name', name);
    $.ajax({
        url: "api/main.php?act=checkPassword", //Server api to receive the file
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (suc) {
            var ms = JSON.parse(suc)
            if (ms) {
                $.ajax({
                    url: "api/main.php?act=changeInfo", //Server api to receive the file
                    type: "POST",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    success: function (suc) {
                        toast({
                            title: "Thành công!",
                            message: "Thông tin đã được thay đổi",
                            type: "success",
                            duration: 5000
                        });
                    }
                });
            } else {
                toast({
                    title: "Thất bại!",
                    message: "Password sai xin mời xem lại",
                    type: "error",
                    duration: 5000
                });
                $("input[name='password_current']").focus();
            }
        }
    });


})