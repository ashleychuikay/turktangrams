//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// show slide function
function showSlide(id) {
  $(".slide").hide(); //jquery - all elements with class of slide - hide
  $("#"+id).show(); //jquery - element with given id - show
}

//Show 12 tangrams in random order
var tangrams = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1"];
var tangramslist = [];
var allimages = [];


shuffle(tangrams)
for (i=0; i<tangrams.length; i++){
	var newtangram = tangrams[i];
	tangramslist.push(newtangram);
}

console.log(tangramslist)

// Create timeline
var timeline = [];

// Welcome screen
var welcome = {
	type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};

timeline.push(welcome)

// Create the object table (tr=table row; td= table data)
//var objects_html = "";

	//HTML for the first object on the left
	pic1 = "images/" + tangramslist[0] + ".jpg";
	// objects_html += '<table style = "height:100%; width:75%" align = "center"><tr><td><img src="' + pic1 + '" height = 350></td>';

	pic2 = "images/" + tangramslist[1] + ".jpg";
	// objects_html += '<td><img src="' + pic2 + '" height = 350></td>';

	pic3 = "images/" + tangramslist[2] + ".jpg";
	// objects_html += '<td><img src="' + pic3 + '" height = 350></td>';

	pic4 = "images/" + tangramslist[3] + ".jpg";
	// objects_html += '<td><img src="' + pic4 + '" height = 350></td>';
	
	pic5 = "images/" + tangramslist[4] + ".jpg";
	// objects_html += '<td><img src="' + pic5 + '" height = 350></td>';
	
	pic6 = "images/" + tangramslist[5] + ".jpg";
	// objects_html += '<td><img src="' + pic6 + '" height = 350></td></tr><tr height="100"></tr>';

	pic7 = "images/" + tangramslist[6] + ".jpg";
	// objects_html += '<tr><td><img src="' + pic7 + '" height = 350></td>';

	pic8 = "images/" + tangramslist[7] + ".jpg";
	// objects_html += '<td><img src="' + pic8 + '" height = 350></td>';

	pic9 = "images/" + tangramslist[8] + ".jpg";
	// objects_html += '<td><img src="' + pic9 + '" height = 350></td>';

	pic10 = "images/" + tangramslist[9] + ".jpg";
	// objects_html += '<td><img src="' + pic10 + '" height = 350></td>';
	
	pic11 = "images/" + tangramslist[10] + ".jpg";
	// objects_html += '<td><img src="' + pic11 + '" height = 350></td>';
	
	pic12 = "images/" + tangramslist[11] + ".jpg";
	// objects_html += '<td><img src="' + pic12 + '" height = 350></td>';
		
	// objects_html += '</tr></table>';

// $("#objects").html(objects_html); 
// showSlide("instructions");
// $("objects_html").fadeIn(); 

 
var instructions = {
     type: "html-keyboard-response",
     stimulus: "<p>In this experiment, you will see pairs of tangrams drawn from the following set of 12. </p>" +
          "<p>For each pair, you will be asked how similar the two tangrams are to each other.</p>" +
          "<p>Use the slider on the screen to indicate the similarity.</p>" +
          "<table style = height:100%; width:75% align = center><tr><td><img src=" + pic1 + " height = 350></td>" +
          "<td><img src=" + pic2 +  " height = 350></td>" +
          "<td><img src=" + pic3 + " height = 350></td>" +
          "<td><img src=" + pic4 + " height = 350></td>" +
          "<td><img src=" + pic5 + " height = 350></td>" +
          "<td><img src=" + pic6 + " height = 350></td></tr><tr height=100></tr>" +
          "<tr><td><img src=" + pic7 + " height = 350></td>" +
          "<td><img src=" + pic8 + " height = 350></td>" +
          "<td><img src=" + pic9 + " height = 350></td>" +
          "<td><img src=" + pic10 + " height = 350></td>" +
          "<td><img src=" + pic11 + " height = 350></td>" +
          "<td><img src=" + pic12 + " height = 350></td></tr></table>" +
          "<p>Press any key to begin.</p>",
     post_trial_gap: 2000
};

timeline.push(instructions);


// Read in .csv from server
// var xhr = new XMLHttpRequest(),
//     method = "GET",
//     // url = "https://raw.githubusercontent.com/ashleychuikay/animalgame/master/gamecode/trials.csv";
//     // add correct link here

// xhr.open(method, url, true);

// xhr.onreadystatechange = function () {
//   if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

//     trials = $.csv.toArrays(xhr.responseText);

//     allTrials = new Array

// 		for(i=0; i<trials.length; i++){
// 			newArr = trials[i].slice();	

// 			for(j=1; j<=2; j++){
// 				subArr = newArr.slice();
// 				subArr.push(subArr[j]);
// 				items = subArr.slice(0,2);
// 				shuffle(items);
// 				subArr.splice(0,2,items[0],items[1]);
// 				allTrials.push(subArr);
// 			}
// 		};
//   }
// };
// xhr.send();

allTrials = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1"]

//Making stimulus set
var allStim = []

for(i=0; i<allTrials.length; i++){
	
	leftpic = "images/" + allTrials[0] + ".jpg";
	rightpic = "images/" + allTrials[1] + ".jpg";

	allStim.push({stimulus: "<table align = center><tr><td><img src=" + leftpic + " height = 350></td><td><img src =" + rightpic + " height = 350></td></tr></table>"})

	allTrials.splice(0,2);
};

// var test_stimuli = allStim

console.log(allStim)

var test = {
    type: 'html-slider-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    prompt: "<p>How similar are these two tangrams? Please respond using the slider.</p>",
    labels: ["Not similar", "Very similar"],
  response_ends_trial: true
};

// timeline.push(test);

var test_procedure = {
  timeline: [test],
  timeline_variables: allStim
};

timeline.push(test_procedure);


jsPsych.init({
	timeline:timeline
});

