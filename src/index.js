var data1 = [
  {
    UK04CB3871: {
      count: 116,
      sum: 39679
    }
  },
  {
    UK06CA9885: {
      count: 111,
      sum: 34931
    }
  },
  {
    UK06CB4508: {
      count: 101,
      sum: 32475
    }
  },
  {
    UK06CB4620: {
      count: 99,
      sum: 29552
    }
  },
  {
    UK06CB4435: {
      count: 99,
      sum: 31907
    }
  },
  {
    UK06CB2475: {
      count: 98,
      sum: 25700
    }
  },
  {
    UK06CB4505: {
      count: 97,
      sum: 31980
    }
  },
  {
    UK06CB2261: {
      count: 97,
      sum: 32747
    }
  },
  {
    UK06CA9861: {
      count: 97,
      sum: 29079
    }
  },
  {
    UK06CA9233: {
      count: 91,
      sum: 29525
    }
  }
];
let parsedData = data1.map((d) => {
  let obj = Object.entries(d);
  //console.log(obj)
  return {
    vehicle: obj[0][0],
    count: obj[0][1].count,
    sum: obj[0][1].sum
  };
});
// [{vehicle: "UK04CB3871",count: 11,sum: 39679}]
console.log(parsedData);

// create svg
let svg = d3.select("svg#top10Vehicle"),
  margin = { top: 20, right: 20, bottom: 22, left: 40 },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

let xScale = d3.scaleBand().range([0, width]).padding(0.5),
  yScale = d3.scaleLinear().range([height, 0]);

let g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
///////////////////////////////////////////////////////

/////////////////////
let data = parsedData;

xScale.domain(
  data.map(function (d, i) {
    return d.vehicle;
  })
  //d3.range(data.length)
);
yScale.domain([
  0,
  d3.max(data, function (d) {
    return d.count;
  }) + 10
]);

// Create grids.
const yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat("");

g.append("g").attr("class", "fastag-x-axis-grid").call(yAxisGrid);

g.append("g")
  .attr("class", "")
  .attr("transform", "translate(0," + height + ")")
  .call(
    d3
      .axisBottom(xScale)
      .tickSize(10)
      .tickFormat((d) => d.substring(d.length - 4, d.length))
  );
g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(yScale).ticks(10));

// gradient
const defs = svg.append("defs");

const bgGradient = defs
  .append("linearGradient")
  .attr("id", "bg-gradient")
  .attr("gradientTransform", "rotate(90)");
bgGradient.append("stop").attr("stop-color", "#9CECFB").attr("offset", "0%");
bgGradient.append("stop").attr("stop-color", "#65C7F7").attr("offset", "50%");
bgGradient.append("stop").attr("stop-color", "#0052D4").attr("offset", "90%");

////// crate bars
g.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .style("fill", "url(#bg-gradient)")
  .style("cursor", "pointer")
  .attr("class", "bar")
  .attr("x", function (d, i) {
    return xScale(d.vehicle);
  })
  .attr("y", function (d) {
    return yScale(d.count);
  })
  .attr("width", xScale.bandwidth()) //
  .attr("height", function (d) {
    return height - yScale(d.count);
  })

  .on("click", function (d) {
    console.log(d);
  });
