// 1. what is API
// 2. How do I call API
// 3. Explain code
const host = "https://provinces.open-api.vn/api/";
var callAPI = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data, "province");
        });
}
callAPI('https://provinces.open-api.vn/api/?depth=1');
var callApiDistrict = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.districts, "district");
        });
}
var callApiWard = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.wards, "ward");
        });
}

$("#quan").hide();
$("#xa").hide();
$("#so").hide();

var renderData = (array, select) => {
    let row = ' <option disable value="">Chọn vùng</option>';
    array.forEach(element => {
        row += `<option value="${element.code}">${element.name}</option>`
    });
    document.querySelector("#" + select).innerHTML = row
}

$("#province").change(() => {
    if ($("#province").val() != "") {
        callApiDistrict(host + "p/" + $("#province").val() + "?depth=2");
        $("#quan").show()
        $("#xa").hide();
        $("#so").hide();
    } else {
        $("#quan").hide();
        $("#xa").hide();
        $("#so").hide();
    }
});
$("#district").change(() => {
    if ($("#district").val() != "") {
        callApiWard(host + "d/" + $("#district").val() + "?depth=2");
        $("#xa").show();
        $("#so").hide();
    } else {
        $("#xa").hide();
        $("#so").hide();
    }
});
$("#ward").change(() => {
    if ($("#ward").val() != "") {
        $("#so").show();
    } else {
        $("#so").hide();
    }
    printResult();
    $("#so").show();
})

var printResult = () => {
    if ($("#district").val() != "" && $("#province").val() != "" &&
        $("#ward").val() != "") {
        let result = $("#province option:selected").text() +
            " | " + $("#district option:selected").text() + " | " +
            $("#ward option:selected").text();
        $("#result").text(result)
    }
}