$(document).ready(function () {

    let groupDropdown = document.getElementById("groupDropdown");
    let classDropdown = document.getElementById("classDropdown");

    $.getJSON("http://sandbox.gibm.ch/berufe.php").done(function (data) {
        $.each(data, function (index, group) {
            let option = "<option value='" + group.beruf_id + "'>" + group.beruf_name + "</option>"
            groupDropdown.insertAdjacentHTML("beforeend", option)
        })
    })

    groupDropdown.addEventListener("change", function () {
        let selectedGroup = groupDropdown.value;

        $.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedGroup).done(function (data) {
            $.each(data, function (index, className) {
                let option = "<option value='" + className.klasse_id + "'>" + className.klasse_longname + "</option>"
                classDropdown.insertAdjacentHTML("beforeend", option);
            })
        })
    })
})