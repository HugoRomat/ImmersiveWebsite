var data = [
   {"id_": 1, "type": "experience", "parameters":"VR", 'say':'hello'},
   {"id_": 2, "type": "experience", "parameters":"VR", 'say':'hello'},
   {"id_": 3, "type": "experience", "parameters":"VR", 'say':'hello'},
   {"id_": 4, "type": "experience", "parameters":"VR", 'say':'hello'},
   {"id_": 1, "type": "experience", "parameters":"2D", 'say':'hello'},
   {"id_": 2, "type": "experience", "parameters":"2D", 'say':'hello'},
   {"id_": 3, "type": "experience", "parameters":"2D"},
   {"id_": 4, "type": "experience", "parameters":"2D"},
   {"id_": 5, "type": "experience", "parameters":"2D"},
   {"id_": 6, "type": "experience", "parameters":"2D"},
   {"id_": 7, "type": "experience", "parameters":"2D"},
   {"id_": 8, "type": "experience", "parameters":"2D"},
   {"id_": 9, "type": "experience", "parameters":"2D"},
   {"id_": 1, "type": "memory", "parameters":"VR"},
   {"id_": 2, "type": "memory", "parameters":"VR"},
   {"id_": 3, "type": "memory", "parameters":"VR"},
   {"id_": 4, "type": "memory", "parameters":"VR"},
   {"id_": 5, "type": "memory", "parameters":"VR"},
   {"id_": 6, "type": "memory", "parameters":"VR"},
   {"id_": 1, "type": "memory", "parameters":"2D"},
   {"id_": 2, "type": "memory", "parameters":"2D"},
   {"id_": 3, "type": "memory", "parameters":"2D"},
   {"id_": 4, "type": "memory", "parameters":"2D"},
   {"id_": 1, "type": "memory2", "parameters":"VR"},
   {"id_": 2, "type": "memory2", "parameters":"VR"},
   {"id_": 3, "type": "memory2", "parameters":"VR"},
   {"id_": 4, "type": "memory2", "parameters":"VR"},
   {"id_": 5, "type": "memory2", "parameters":"VR"},
   {"id_": 1, "type": "memory2", "parameters":"2D"},
   {"id_": 2, "type": "memory2", "parameters":"2D"},
   {"id_": 3, "type": "memory2", "parameters":"2D"},
   {"id_": 4, "type": "memory2", "parameters":"2D"}
 ]


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data

//   if (error) throw error;

  // format the data

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.type; }));

  var x1 = d3.scaleBand()
      .rangeRound([0, x.bandwidth()])
      .padding(0.1)
      .domain(data.map(function(d) { return d.parameters; }));


// var scaleX = d3.scaleLinea();

  // append the rectangles for the bar chart
  var place = svg.selectAll(".bar")
      .data(data)
      .enter().append('g').attr('class', 'bar')
      .attr("transform", function(d) {return "translate(" +  (x(d.type) + 80) + ", -5)"; })
      .on("mouseover", function(d) {	
         
         
         var BB = d3.select(this).node().getBoundingClientRect();
         // console.log(BB)
         div.transition()		
            .duration(0)		
            .style("opacity", .9);		
         div.html(d.say)	
            .style("left", (BB.x) + "px")		
            .style("top", (BB.y - 30) + "px");	
         })					
         .on("mouseout", function(d) {		
               div.transition()		
                  .duration(0)		
                  .style("opacity", 0);	
         });


      var g = place.append('g')
      .attr("transform", function(d) {
         var x = x1(d.parameters);
         var y = (Math.ceil (d.id_/4));

         var x2 = (d.id_ - y*4) * 20;
         // console.log(x2, y)
         return "translate(" +  (x + x2) + ", "+ (height-(y*25))+")"; 
      
      })
      
   // g.append("rect")
   //    .attr("class", "bar")
   //    .attr("x", 0)
   //    .attr("width", 15)
   //    .attr("y", 0)
   //    .attr("height",15);

   g.append("svg:image")
   .attr('x', 0)
   .attr('y', 0)
   .attr('width', 20)
   .attr('height', 20)
   .attr("xlink:href", "avatar.png")

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

      

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y).tickFormat("").tickValues([]));





var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);