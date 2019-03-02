var name, role, startDate, monthRate, idCount = 0;
var convertedDate, bill;
var config = {
    apiKey: "AIzaSyDm0UMofhUoJANudQ4nhzW1nwkMWKuRZh8",
    authDomain: "first-project-94590.firebaseapp.com",
    databaseURL: "https://first-project-94590.firebaseio.com",
    projectId: "first-project-94590",
    storageBucket: "first-project-94590.appspot.com",
    messagingSenderId: "517441565271"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (e) {
    e.preventDefault();
    name = $('#name').val().trim();
    role = $('#role').val().trim();
    startDate = $('#start-date').val().trim();
    monthRate = $('#month-rate').val().trim();
    if (name !== "" && role !== "" && startDate !== "" && monthRate !== "") {
        idCount++;
        id = "data-set-" + idCount;
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthRate: monthRate,
            id: id,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $('#name').val('');
        $('#role').val('');
        $('#start-date').val('');
        $('#start-date').val('');
        $('#month-rate').val('');
    } else {
        alert("all fields are required, please fill them all");
    }

});

database.ref().on("child_added", function (childSnapshot) {
    convertedDate = moment(childSnapshot.val().startDate).format("MM/DD/YYYY");
    bill = (childSnapshot.val().monthRate) * (moment().diff(convertedDate, "month"));

    var tr = $('<tr>');
    tr.attr('id', childSnapshot.val().id);

    var tdName = $('<td>').text(childSnapshot.val().name);
    var tdRole = $('<td>').text(childSnapshot.val().role);
    var tdStartDate = $('<td>').text(convertedDate);
    var tdMonthWorked = $('<td>').text((moment().diff(convertedDate, "month")) + " month");
    var tdMonthRate = $('<td>').text('$' + childSnapshot.val().monthRate);
    var tdBill = $('<td>').text('$' + bill);

    $(tr).append(tdName);
    $(tr).append(tdRole);
    $(tr).append(tdStartDate);
    $(tr).append(tdMonthWorked);
    $(tr).append(tdMonthRate);
    $(tr).append(tdBill);

    $('#employee').append(tr);
});