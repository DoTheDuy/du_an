var validateLogin = (inputEmail, inputPassword) => {
    var email = $(inputEmail).val()
    var password = $(inputPassword).val()

    var form_data = new FormData();
    form_data.append('email', email);
    form_data.append('password', password);
    $.ajax({
        url: "api/main.php?act=login", //Server api to receive the file
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (suc) {
            var ms = JSON.parse(suc)
            if (ms) {
                if ($(location).attr('href').includes("act=page-login")) window.location = "index.php"
                else location.reload()
            } else {
                toast({
                    title: "Thất bại!",
                    message: "Đăng nhập thất bại vui lòng xem lại email và password",
                    type: "error",
                    duration: 5000
                });
            }
        }
    });
}





var validateRegister = (inputRegEmail, inputRegPassword) => {
    var email = $(inputRegEmail).val()
    var password = $(inputRegPassword).val()

    if (email.length > 0 && password.length > 0) {
        var ms = []
        var isEmail = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!isEmail) ms.push('Trường email phải nhập email')

        if (password.length < 6) ms.push('Password phải có từ 6 ký tự trở lên')

        if (ms.length == 0) {
            var form_data = new FormData();
            form_data.append('email', email);
            form_data.append('password', password);
            $.ajax({
                url: "api/main.php?act=register", //Server api to receive the file
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                success: function (suc) {
                    var ms = JSON.parse(suc)
                    if (ms) {
                        toast({
                            title: "Thành công",
                            message: "Đăng ký thành công hệ thống sẽ tự động đăng nhập sau 2s",
                            type: "success",
                            duration: 5000
                        })
                        setTimeout(() => {
                            $.ajax({
                                url: "api/main.php?act=login", //Server api to receive the file
                                type: "POST",
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,
                                success: function (suc) {
                                    var ms = JSON.parse(suc)
                                    if (ms) {
                                        if ($(location).attr('href').includes("act=page-login")) window.location = "index.php"
                                        else location.reload()
                                    } else {
                                        toast({
                                            title: "Thất bại!",
                                            message: "Đăng nhập thất bại vui lòng xem lại email và password",
                                            type: "error",
                                            duration: 5000
                                        });
                                    }
                                }
                            });
                        }, 2000);

                    } else {
                        toast({
                            title: "Thất bại!",
                            message: "Email đã tồn tại",
                            type: "error",
                            duration: 5000
                        });
                    }
                }
            });

        } else {
            ms.forEach(message => {
                toast({
                    title: "Thất bại!",
                    message: message,
                    type: "error",
                    duration: 5000
                });
            })
        }
    } else {
        toast({
            title: "Thất bại!",
            message: "Email hoặc password không được để trống",
            type: "error",
            duration: 5000,
        });
    }

}


