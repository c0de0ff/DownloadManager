//work to do in future release

var downloadStats = loadDownloadStatsFromDisk();
var fileStats = loadFileStatsFromDisk();

var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();

//drawPieChart(generateFileChartData(year,month),month,year);
//drawLineChart(generateDownloadedStatsData(year,month),month,year);


function registerChartListeners(){
    document.getElementById('DDPre').onclick = function(){
        downloadStats = loadDownloadStatsFromDisk(); //change month or year, then fetch data
        drawLineChart(generateDownloadedStatsData(year,month),month,year);
    }
    document.getElementById('DDNext').onclick = function(){
        downloadStats = loadDownloadStatsFromDisk(); //change month or year, then fetch data
        var chart = $('#lineGraph').highcharts();
        chart.setTitle({text: "New Title"});
        chart.series[0].setVisible(false);
        chart.series[0].setData(generateDownloadedStatsData(year,month),true);
        chart.series[0].setVisible(true, true);
    }
    document.getElementById('DFPre').onclick = function(){
        fileStats = loadFileStatsFromDisk(); //change month or year, then fetch data
        drawPieChart(generateFileChartData(year,month),month,year);
    }
    document.getElementById('DFNext').onclick = function(){
        fileStats = loadFileStatsFromDisk(); //change month or year, then fetch data
        var chart = $('#pieChart').highcharts();
        chart.setTitle({text: "New Title"});
        //chart.series[0].setVisible(false);
        chart.series[0].setData(generateFileChartData(year,month),false);
        //chart.series[0].setVisible(true, true);
        chart.redraw(true);
    }
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function getFileStatsData(year,month){
    return fileStats[year+""+month];
}

function getDownloadStatsData(year,month,day){
    return downloadStats[year+""+month][year+""+month+""+day];
}

function generateDownloadedStatsData(year,month){
    var totalDays = daysInMonth(month+1,year);
    var data = Array();
    for (var day = 1; day <= totalDays; day++) {
        data[day-1] = [Date.UTC(year, month, day),getDownloadStatsData(year,month,day)];
    };
    return data;        
}

function generateFileChartData(year,month){
    var cat = getFileStatsData(year,month);
    var keys = Object.keys(cat);
    var dataPie = Array();

    for (var i = 0; i <keys.length; i++) {
        dataPie[i] = [keys[i],cat[keys[i]]];
    }; 
    return dataPie;
}

function drawLineChart(data,month,year){
    $(function () { 
        $('#lineGraph').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: months[month]+", "+year
            },
             xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'MB'
                }
            },
            credits: { 
                enabled: false 
            },
            series: [{
                name: "Data Downloaded",
                data: data
            }]
        });
    });
}

function drawPieChart(data,month,year){
    $(function () {
            
            // Radialize the colors
            Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
                return {
                    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            });
            
            // Build the chart
            $('#pieChart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: months[month]+", "+year
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage*100)/100 +' %';
                            }
                        }
                    }
                },
                credits: { 
                    enabled: false 
                },
                series: [{
                    type: 'pie',
                    name: 'Download share',
                    data: data
                }]
            });
        });
}

function loadDownloadStatsFromDisk(){
    var data = {"20140":
                {"201401":getRandomInt(1,100),
                "201402":getRandomInt(1,100),
                "201403":getRandomInt(1,100),
                "201404":getRandomInt(1,100),
                "201405":getRandomInt(1,100),
                "201406":getRandomInt(1,100),
                "201407":getRandomInt(1,100),
                "201408":getRandomInt(1,100),
                "201409":getRandomInt(1,100),
                "2014010":getRandomInt(1,100),
                "2014011":getRandomInt(1,100),
                "2014012":getRandomInt(1,100),
                "2014013":getRandomInt(1,100),
                "2014014":getRandomInt(1,100),
                "2014015":getRandomInt(1,100),
                "2014016":getRandomInt(1,100),
                "2014017":getRandomInt(1,100),
                "2014018":getRandomInt(1,100),
                "2014019":getRandomInt(1,100),
                "2014020":getRandomInt(1,100),
                "2014021":getRandomInt(1,100),
                "2014022":getRandomInt(1,100),
                "2014023":getRandomInt(1,100),
                "2014024":getRandomInt(1,100),
                "2014025":getRandomInt(1,100),
                "2014026":getRandomInt(1,100),
                "2014027":getRandomInt(1,100),
                "2014028":getRandomInt(1,100),
                "2014029":getRandomInt(1,100),
                "2014030":getRandomInt(1,100),
                "2014022":20}
                };
    return data;
}
 
function loadFileStatsFromDisk(){
    var data = {"20140":
                {"Media":getRandomInt(1,100),
                "Documents":getRandomInt(1,100),
                "Images":getRandomInt(1,100),
                "Programs":getRandomInt(1,100),
                "Other":getRandomInt(1,100)
                }
            };
    return data;
} 

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}      
