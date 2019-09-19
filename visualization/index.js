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
var typearray = [];
 d3.csv("visualization/data.csv", function(dataCSV){
   // d3.csv("data - Copy - Copy.csv", function(dataCSV){
   delete dataCSV['2D First'];
   delete dataCSV['Order']
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

      if (typearray.indexOf(arrayCoding[coding]) == -1) typearray.push(arrayCoding[coding]);

   }
}).then(()=>{

   // console.log('HELLO', globalArray)
   // var j = 0;
   for (var i in globalArray){

      var array = globalArray[i];
      // console.log(i)

      var arraySorted = array.sort(function(a, b) {
         return b.part - a.part;
     });
     for (var k = 0; k<arraySorted.length; k++){
         // console.log(k)
         arraySorted[k]['id_'] = k+1;
      }

     data_ = data_.concat(arraySorted)
   //   j++
   //   break;
   //   console.log(arraySorted)
   }
   console.log(globalArray)
   // console.log(data_)
   // data_ = data_.sort(function(a,b) {
   //    var x = a.concat - b.concat;
   //    return x == 0? a.Participant - b.Participant : x;
   // })

   launchViz(data_);
   // console.log('HELLO', data_)
});
// launchViz(data);
function launchViz(data){



      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 300},
         width = 3000 - margin.left - margin.right,
         height = 1000 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleLinear()
               .range([0, width])
               
      var y = d3.scaleBand()
               .range([height, 0])
               .padding(0.1);


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
      y.domain(data.map(function(d) { return d.type; }));

      var y1 = d3.scaleBand()
            .rangeRound([0, y.bandwidth()])
            .padding(0.1)
            .domain(data.map(function(d) { return d.Condition; }));


      // var scaleX = d3.scaleLinea();

      // append the rectangles for the bar chart
      var place = svg.selectAll(".bar")
            .data(data)
            .enter().append('g').attr('class', 'bar')
            .style('cursor', 'pointer')
            .attr("transform", function(d) {
               // console.log(y(d.type))
               return "translate(0, " +  (y(d.type))+")"; 
            })
            .on("mouseover", function(d) {	
               
               
               var BB = d3.select(this).node().getBoundingClientRect();
               // console.log(BB)
               div.transition()		
                  .duration(0)		
                  .style("opacity", .9);		
               div.html(d.Participant +" - "+d.Observations)	
                  .style("left", (BB.x +10) + "px")		
                  .style("top", (window.scrollY + BB.y - 35) + "px");	
               })					
               .on("mouseout", function(d) {		
                     div.transition()		
                        .duration(0)		
                        .style("opacity", 0);	
               });


         // MY BAR ==> GROUP OF BARS
            var g = place.append('g')
            .attr("transform", function(d) {
               // if (d.type == "Personal - Making it personal" && d.Condition == "VR") console.log(d)

               var y = y1(d.Condition);
               var x = (Math.ceil (d.id_));
               var y2 = (d.id_ - x) * 25; 
               return "translate("+(x*25)+","+(y+y2+60)+")"; 
            
            })
            
         g.append("rect")
            .attr("class", "bar")
            .attr("x", -1)
            .attr("width", 22)
            .attr("y", -2)
            .attr("height",22)
            // .attr("fill",function(d,i){ 
            //    if (d.part == 13) return 'red'
            // })
            .attr("fill",function(d,i){ 
               // if (d.type == "Personal - Making it personal" && d.id_ == 1) return 'red'
               // else  
               return colorParticipant(d.Participant) 
            });//console.log(dParticipant)})

         g.append("svg:image")
         .attr('x', 0)
         .attr('y', 0)
         .attr('width', 20)
         .attr('height', 20)
         .attr("xlink:href", function(d,i){
            if (d.type == "Not Enjoy - any verbal expression/word of non-enjoyment (sigh, frustration, dislike, uncomfort)")  return  "visualization/avatar.png";
            else return  "visualization/sun.png";
            // console.log(d)
           

         })
         // .attr("xlink:href", "visualization/avatar.png")
         .attr('class', 'svgimg')

      // add the x Axis
//   svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));

// add the y Axis
svg.append("g").call(d3.axisLeft(y));

// console.log(d3.axisLeft(y))

      var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);



            
           
      svg.selectAll('.tick text').each(insertLinebreaks);
      svg.selectAll('.tick text')
         .style('font-family',  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif');

         // console.log(typearray)
            var tickSecond = svg.selectAll('.secondTick')
               .data(typearray).enter()
               .append("g").attr('class','.secondTick')
               .attr("transform", function(d){
                 return "translate(-25,"+(y(d) + 93)+")"
               })
               tickSecond.append("text")
               .attr("class", "bar")
               .attr("x", 3)
               .attr("y", -33).style('font-weight',  '700')
               .text(function (d) { return "VR"; } );

               tickSecond.append("text")
               .attr("class", "bar")
               .attr("x", 3)
               .attr("y", 62).style('font-weight',  '700')
               .text(function (d) { return "2D"; } );
            
         // place.selectAll("text")
         // .data(function (d) { return d.Condition; })
         // .enter()
         // .append("text")
         // .attr("x", function (d) { console.log(d); return x(d.column) })
         // // .attr("y", function (d) { )})
         // .text(function (d) { return "hello"; } );
      //    svg.append("g")return y1(d.Condition) - 6;
      //   .selectAll("g")
      //   .data(data_).enter()
      //   .append("g")
      //       .attr("class", "axis")
      //       .attr("transform", "translate("+width+",0)")
      //       .attr("y", function (d) { return y1(d.Condition); })
      //       .call(d3.axisBottom(y1))

}
var insertLinebreaks = function (d) {
   var el = d3.select(this);
   var words = d.split('-');
   el.text('');
   var j =0
   for (var i = 0; i < words.length; i++) {
       var tspan = el.append('tspan').text(words[i]+" ");
       if (i!=0){
         tspan.attr('x', -10).attr('dy', '15');
         tspan.style('font-size',  '10px')
       }
       else{
         tspan.style('font-size',  '18px')
         tspan.style('font-weight',  '700')
       }
      //  j++
      //  if (j > 3){
         
      //    j=0;
      //  }
          
   }
};