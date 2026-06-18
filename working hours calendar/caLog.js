var currentYear = 0;
var currentMonth = 0;
var workHours = {};

loadHours();

function generateCalendar() {
    var input = document.getElementById("dateInput").value;
    var message = document.getElementById("message");

    message.textContent = "";

    if (input.length !== 6) {
        message.textContent = "YYYYMM の6文字で入力してください。";
        return;
    }

    var year = Number(input.slice(0, 4));
    var month = Number(input.slice(4, 6));

    if (isNaN(year) || isNaN(month)) {
        message.textContent = "数字で入力してください。";
        return;
    }

    if (month < 1 || month > 12) {
        message.textContent = "月は 01 から 12 までです。";
        return;
    }

    currentYear = year;
    currentMonth = month;

    drawCalendar();
}

function drawCalendar() {
    var firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    var lastDay = new Date(currentYear, currentMonth, 0).getDate();

    document.getElementById("monthTitle").textContent =
        currentYear + "年 " + currentMonth + "月";

    var html = "";

    html += "<table>";
    html += "<tr>";
    html += "<th class='sun'>日</th>";
    html += "<th>月</th>";
    html += "<th>火</th>";
    html += "<th>水</th>";
    html += "<th>木</th>";
    html += "<th>金</th>";
    html += "<th class='sat'>土</th>";
    html += "</tr>";

    html += "<tr>";

    for (var i = 0; i < firstDay; i++) {
        html += "<td class='empty'></td>";
    }

    for (var day = 1; day <= lastDay; day++) {
        var weekIndex = (firstDay + day - 1) % 7;
        var className = "";

        if (weekIndex === 0) {
            className = "sun";
        }

        if (weekIndex === 6) {
            className = "sat";
        }

        if (isToday(day)) {
            className += " today";
        }

        if (getSevenDaysTotal(day) > 28) {
            className += " over";
        }

        var dateKey = makeDateKey(currentYear, currentMonth, day);
        var hourValue = "";

        if (workHours[dateKey] !== undefined) {
            hourValue = workHours[dateKey];
        }

        html += "<td class='" + className + "'>";
        html += "<div>" + day + "</div>";
        html += "<input class='hour-input' type='text' value='" + hourValue + "'";
        html += " onchange=\"changeHours('" + dateKey + "', this.value)\">";
        html += "</td>";

        if ((firstDay + day) % 7 === 0) {
            html += "</tr><tr>";
        }
    }

    var totalCells = firstDay + lastDay;
    var rest = totalCells % 7;

    if (rest !== 0) {
        for (var j = 0; j < 7 - rest; j++) {
            html += "<td class='empty'></td>";
        }
    }

    html += "</tr>";
    html += "</table>";

    document.getElementById("calendar").innerHTML = html;
    updateTotalHours();
}

function changeHours(dateKey, value) {
    if (value === "") {
        delete workHours[dateKey];
    } else {
        var hours = Number(value);

        if (isNaN(hours) || hours < 0) {
            hours = 0;
        }

        workHours[dateKey] = hours;
    }

    saveHours();
    drawCalendar();
}

function getSevenDaysTotal(day) {
    var total = 0;
    var baseDate = new Date(currentYear, currentMonth - 1, day);

    for (var i = 0; i < 7; i++) {
        var checkDate = new Date(baseDate);
        checkDate.setDate(baseDate.getDate() - i);

        var y = checkDate.getFullYear();
        var m = checkDate.getMonth() + 1;
        var d = checkDate.getDate();

        var key = makeDateKey(y, m, d);

        if (workHours[key] !== undefined) {
            total += Number(workHours[key]);
        }
    }

    return total;
}

function updateTotalHours() {
    var total = 0;
    var lastDay = new Date(currentYear, currentMonth, 0).getDate();

    for (var day = 1; day <= lastDay; day++) {
        var key = makeDateKey(currentYear, currentMonth, day);

        if (workHours[key] !== undefined) {
            total += Number(workHours[key]);
        }
    }

    document.getElementById("totalHours").textContent =
        "今月の合計: " + total + " 時間";
}

function prevMonth() {
    if (currentYear === 0) {
        return;
    }

    currentMonth--;

    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }

    updateInput();
    drawCalendar();
}

function nextMonth() {
    if (currentYear === 0) {
        return;
    }

    currentMonth++;

    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }

    updateInput();
    drawCalendar();
}

function updateInput() {
    document.getElementById("dateInput").value =
        currentYear + makeTwo(currentMonth);
}

function isToday(day) {
    var today = new Date();

    if (
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth() + 1 &&
        day === today.getDate()
    ) {
        return true;
    }

    return false;
}

function makeDateKey(year, month, day) {
    return year + "-" + makeTwo(month) + "-" + makeTwo(day);
}

function makeTwo(num) {
    if (num < 10) {
        return "0" + num;
    }

    return "" + num;
}

function saveHours() {
    localStorage.setItem("workHours", JSON.stringify(workHours));
}

function loadHours() {
    var data = localStorage.getItem("workHours");

    if (data !== null) {
        workHours = JSON.parse(data);
    }
}