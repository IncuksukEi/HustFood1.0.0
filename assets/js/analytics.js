new Morris.Line({
  // ID of the element in which to draw the chart.
  element: "myfirstchart",
  lineColors: ["#8da2fb"],
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { year: "2008", value: 20 },
    { year: "2009", value: 10 },
    { year: "2010", value: 5 },
    { year: "2011", value: 5 },
    { year: "2012", value: 20 },
    { year: "2013", value: 50 },
    { year: "2014", value: 40 },
    { year: "2015", value: 30 },
    { year: "2016", value: 70 },
  ],
  // The name of the data record attribute that contains x-values.
  xkey: "year",
  // A list of names of data record attributes that contain y-values.
  ykeys: ["value"],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ["Value"],
});

Morris.Donut({
  element: "donut-example",
  data: [
    { label: "Món gà rán", value: 12 },
    { label: "Burger và cơm", value: 30 },
    { label: "Thức ăn nhẹ", value: 20 },
    { label: "Tráng miệng", value: 20 },
    { label: "Đồ uống", value: 20 },
  ],
  colors: ["orange", "#0072f2", "#fde9ea", "#3d6e45", "#56eaf2"],
});
