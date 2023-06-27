$(document).ready(function () {

    let groupDropdown = document.getElementById("groupDropdown");

    $.getJSON("http://sandbox.gibm.ch/berufe.php").done(function (data) {
        console.log(data)
        $.each(data, function (index, group) {
            let option = "<option value='" + group.beruf_id + "'>" + group.beruf_name + "</option>"
            groupDropdown.insertAdjacentHTML("beforeend", option)
        })
    })
})