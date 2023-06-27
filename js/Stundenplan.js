$(document).ready(function () {

    let groupDropdown = document.getElementById("groupDropdown");
    let classDropdown = document.getElementById("classDropdown");

    $.getJSON("http://sandbox.gibm.ch/berufe.php").done(function (data) {
        $.each(data, function (index, group) {
            let option = "<option value='" + group.beruf_id + "'>" + group.beruf_name + "</option>"
            groupDropdown.insertAdjacentHTML("beforeend", option)
        })

        if (localStorage.getItem("groupDropdown") != null) {
            loadClass(localStorage.getItem("groupDropdown"))
            $("#groupDropdown").val(localStorage.getItem("groupDropdown"))
        }
    })

    groupDropdown.addEventListener("change", function () {
        let selectedGroup = groupDropdown.value;
        localStorage.setItem("groupDropdown", selectedGroup);
        loadClass(selectedGroup)
    })

    function loadClass(selectedValue) {
        let selectedGroup = groupDropdown.value;

        $.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedGroup).done(function (data) {
            $.each(data, function (index, className) {
                let option = "<option value='" + className.klasse_id + "'>" + className.klasse_longname + "</option>"
                classDropdown.insertAdjacentHTML("beforeend", option);
            })
        })

        if (localStorage.getItem("classDropdown") != null) {
            loadClass(localStorage.getItem("classDropdown"))
            $("#groupDropdown").val(localStorage.getItem("classDropdown"))
        }
    }

    classDropdown.addEventListener("change", function () {
        let selectedClass = classDropdown.value;
        localStorage.setItem("classDropdown", selectedClass);
        loadTable(selectedClass)
    })

    function loadTable(selectedClass) {
        let  wochentag = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        let tableHead = "<table class='table'><tr><th>Datum</th><th>Wochentag</th><th>Von</th><th>Bis</th><th>Lehrer</th><th>Fach</th><th>Raum</th></tr>"

        $.getJSON("http://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedClass).done(function (data) {
            $.each(data, function (index, lession) {
                let week = "<tr><td>" + lession.tafel_datum + "</td><td>" + wochentag[lession.tafel_wochentag] +"</td><td>" + lession.tafel_von +"</td><td>" + lession.tafel_bis +"</td><td>" + lession.tafel_lehrer +"</td><td>" + lession.tafel_longfach +"</td><td>" + lession.tafel_raum +"</td></tr>"
                tableHead += week;
            })
            tableHead += "</table>"
            document.getElementById("outputDiv").innerHTML = tableHead
        })
    }
})