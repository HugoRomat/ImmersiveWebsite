var data = [
   {"id_": 1, "type": "experience", "Condition":"VR", 'say':'I didnt have much to say'},
   {"id_": 2, "type": "experience", "Condition":"VR", 'say':'hello'},
   {"id_": 3, "type": "experience", "Condition":"VR", 'say':'hihihihi'},
   {"id_": 4, "type": "experience", "Condition":"VR", 'say':'hello'},
   {"id_": 1, "type": "experience", "Condition":"2D", 'say':'hello'},
   {"id_": 2, "type": "experience", "Condition":"2D", 'say':'hello'},

   {"id_": 3, "type": "experience", "Condition":"2D"},
   {"id_": 4, "type": "experience", "Condition":"2D"},
   {"id_": 5, "type": "experience", "Condition":"2D"},
   {"id_": 6, "type": "experience", "Condition":"2D"},
   {"id_": 7, "type": "experience", "Condition":"2D"},
   {"id_": 8, "type": "experience", "Condition":"2D"},
   {"id_": 9, "type": "experience", "Condition":"2D"},

   {"id_": 1, "type": "memory", "Condition":"VR"},
   {"id_": 2, "type": "memory", "Condition":"VR"},
   {"id_": 3, "type": "memory", "Condition":"VR"},
   {"id_": 4, "type": "memory", "Condition":"VR"},
   {"id_": 5, "type": "memory", "Condition":"VR"},
   {"id_": 6, "type": "memory", "Condition":"VR"},

   {"id_": 1, "type": "memory", "Condition":"2D"},
   {"id_": 2, "type": "memory", "Condition":"2D"},
   {"id_": 3, "type": "memory", "Condition":"2D"},
   {"id_": 4, "type": "memory", "Condition":"2D"},
   {"id_": 1, "type": "memory2", "Condition":"VR"},
   {"id_": 2, "type": "memory2", "Condition":"VR"},
   {"id_": 3, "type": "memory2", "Condition":"VR"},
   {"id_": 4, "type": "memory2", "Condition":"VR"},
   {"id_": 5, "type": "memory2", "Condition":"VR"},
   {"id_": 1, "type": "memory2", "Condition":"2D"},
   {"id_": 2, "type": "memory2", "Condition":"2D"},
   {"id_": 3, "type": "memory2", "Condition":"2D"},
   {"id_": 4, "type": "memory2", "Condition":"2D"}
 ]

var data_ = []; 
var idArray = {};
var globalArray = {};
 d3.csv("data - Copy - Copy.csv", function(dataCSV){
   delete dataCSV['2D First']
   // console.log(JSON.stringify(dataCSV))

   
   var arrayCoding = [];
   for (var property in dataCSV){
      if (dataCSV[property] == "" || dataCSV[property] == "?"){
         delete dataCSV[property]
      } else if (dataCSV[property] == "1" ){
         arrayCoding.push(property);
         delete dataCSV[property]
      }
   }

   for (var coding in arrayCoding){
      var objectToCreate = JSON.parse(JSON.stringify(dataCSV));
      var concat = arrayCoding[coding]+'_'+objectToCreate['Condition'].split('-')[0]


        
      if (idArray[concat] != undefined) {
         idArray[concat]++;
      }
      else {
         idArray[concat] = 1;
         globalArray[concat] = []
      }


      objectToCreate['type'] = arrayCoding[coding];
      objectToCreate['concat'] = concat;
      objectToCreate['id_'] = idArray[concat];
      objectToCreate['Condition'] = objectToCreate['Condition'].split('-')[0];
      objectToCreate['part'] = parseInt(objectToCreate['Participant'].substring(1));

      // console.log(concat)
      // data_.push(objectToCreate);
      globalArray[concat].push(objectToCreate)

   }
}).then(()=>{

   // console.log('HELLO', globalArray)
   // var j = 0;
   for (var i in globalArray){

      var array = globalArray[i];
      // console.log(array)

      var arraySorted = array.sort(function(a, b) {
         return b.part - a.part;
     });
     for (var k = 1; k<arraySorted.length; k++){
      //   console.log(k)
         arraySorted[k]['id_'] = k;
      }

     data_ = data_.concat(arraySorted)
   //   j++
   //   break;
   //   console.log(arraySorted)
   }
   // console.log(data_)
   // data_ = data_.sort(function(a,b) {
   //    var x = a.concat - b.concat;
   //    return x == 0? a.Participant - b.Participant : x;
   // })

   launchViz(data_);
   console.log('HELLO', data_)
});
// launchViz(data);
function launchViz(data){



      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
         width = 3500 - margin.left - margin.right,
         height = 750 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleBand()
               .range([0, width])
               .padding(0.1);
      var y = d3.scaleLinear()
               .range([height, 0]);

      var colorParticipant = d3.scaleOrdinal(d3.schemeSet3);
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#resultsGraph").append("svg")
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
            .domain(data.map(function(d) { return d.Condition; }));


      // var scaleX = d3.scaleLinea();

      // append the rectangles for the bar chart
      var place = svg.selectAll(".bar")
            .data(data)
            .enter().append('g').attr('class', 'bar')
            .style('cursor', 'pointer')
            .attr("transform", function(d) {return "translate(" +  (x(d.type) + 80) + ", -5)"; })
            .on("mouseover", function(d) {	
               
               
               var BB = d3.select(this).node().getBoundingClientRect();
               // console.log(BB)
               div.transition()		
                  .duration(0)		
                  .style("opacity", .9);		
               div.html(d.part)	
                  .style("left", (BB.x +10) + "px")		
                  .style("top", (window.scrollY + BB.y - 35) + "px");	
               })					
               .on("mouseout", function(d) {		
                     div.transition()		
                        .duration(0)		
                        .style("opacity", 0);	
               });


            var g = place.append('g')
            .attr("transform", function(d) {
               var x = x1(d.Condition);
               var y = (Math.ceil (d.id_/4));

               var x2 = (d.id_ - y*4) * 20;
               // console.log(x2, y)
               return "translate(" +  (x + x2) + ", "+ (height-(y*25))+")"; 
            
            })
            
         g.append("rect")
            .attr("class", "bar")
            .attr("x", 3)
            .attr("width", 15)
            .attr("y", 0)
            .attr("height",15)
            // .attr("fill",function(d,i){ 
            //    if (d.part == 13) return 'red'
            // })
            .attr("fill",function(d,i){ return colorParticipant(d.Participant) });//console.log(dParticipant)})

         g.append("svg:image")
         .attr('x', 0)
         .attr('y', 0)
         .attr('width', 20)
         .attr('height', 20)
         .attr("xlink:href", "visualization/avatar.png")
         .attr('class', 'svgimg')

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
}