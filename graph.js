
exports.getGraph = function(company)
{
  var name = company;
  var dataPoints1 = [], dataPoints2 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    colorSet: "colorSet2",
    title:{
      text: name,
    },
    charts: [{
      axisY: {
        prefix: "€"
      },
      data: [{
        type: "ohlc",
        yValueFormatString: "€#,###.00",
        dataPoints : dataPoints1
      }]
    }],
    navigator: {
      data: [{
        type: "area",
        dataPoints: dataPoints2
      }],
      slider: {
        minimum: new Date(2018, 06, 01),
        maximum: new Date(2018, 07, 01)
      }
    }
  });
  $.getJSON("Stock List.json", function(data) {
    for(var i = 0; i < data.length; i++){
      if(name === data[i].key){
      dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
  }
    stockChart.render();
  });
}