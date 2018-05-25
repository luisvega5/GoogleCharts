/**
 * Created by manuel on 5/8/18.
 */

// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['corechart', 'columnchart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
    drawMessagePerDayChart();
    drawReplyPerDayChart();
    drawLikePerDayChart();
    drawDislikePerDayChart();
    drawActiveUserPerChart();
    drawHashTagPerDayChart();
}
function drawMessagePerDayChart() {
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/messages/count",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Number of Messages');
    data.addRows(reformatData(JSON.parse(jsonData).MessagesPerDay,'Day'));

    options = {
                title: 'Number of Messages per Day',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Messages per Day'
                       },
                colors:['red'],
                };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
        chart.draw(data, options);
}

function drawReplyPerDayChart() {
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/replies/count",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Number of Replies');
    data.addRows(reformatData(JSON.parse(jsonData).RepliesPerDay,'Day'));
    options = {
                title: 'Number of Replies per Day',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Replies per Day'
                       },
                colors:['blue'],
              };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
}

function drawLikePerDayChart() {
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/likes/count",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Number of Likes');
    data.addRows(reformatData(JSON.parse(jsonData).LikesPerDay,'Day'));
    options = {
                title: 'Number of Likes per Day',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Likes per Day'
                       },
                colors:['darkgreen'],
              };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div3'));
        chart.draw(data, options);
}

function drawDislikePerDayChart(){
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/dislikes/count",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Number of Dislikes');
    data.addRows(reformatData(JSON.parse(jsonData).DislikesPerDay,'Day'));
    options = {
                title: 'Number of Dislikes per Day',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Dislikes per Day'
                       },
                colors:['orange'],
              };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div4'));
        chart.draw(data, options);
}

function drawActiveUserPerChart(){
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/users/top",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Number of Active Users');
    data.addRows(reformatData(JSON.parse(jsonData).NumOfActiveUsersPerDay,'Day'));
    options = {
                title: 'Number of Active Users per Day',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Top Active Users'
                       },
                colors:['gold'],
              };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div5'));
        chart.draw(data, options);
}

function drawHashTagPerDayChart(){
    var jsonData = $.ajax({
        url: "https://db-chatapp-papaya.herokuapp.com/ChatApp/hashtags/top",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Top Trending HashTags');
    data.addColumn('number', 'Number of HashTags');
    data.addRows(reformatData(JSON.parse(jsonData).TopHashtags,'htext'));
    options = {
                title: 'Top Trending HashTags',
                width: 500,
                height: 300,
                bar: {groupWidth: "50%"},
                hAxis: {
                            title: 'Total Number',
                            minValue: 0
                       },
                vAxis: {
                            title: 'Top Trending HashTags'
                       },
                colors:['#990099'],
              };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div6'));
        chart.draw(data, options);
}

function reformatData(jsonData,xAxis){
    var temp= jsonData;
    var result = [];
    var i;
    var row;
    for (i=0; i < temp.length; i++){
        row= temp[i];
        dataElement = [];

        if(xAxis == 'Day')
            dataElement.push(JSON.stringify(row.day).substring(1,17));

        if(xAxis == 'htext')
            dataElement.push(JSON.stringify(row.htext));

        dataElement.push(row.count);
        result.push(dataElement);
    }
    return result;
}

google.charts.load('current', {packages: ['controls','corechart', 'columnchart']});
google.charts.setOnLoadCallback(drawChart);


