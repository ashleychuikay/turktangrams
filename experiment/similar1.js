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
var tangrams = ["A1", "A2" "B1", "B2", "C2", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"];
var tangramslist = [];
var allimages = [];


shuffle(tangrams)
for (i=0; i<tangrams.length; i++){
	var newtangram = tangrams[i];
	tangramslist.push(newtangram);
}

// consent to participate.
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  }
  return false;
};

// Create timeline
var timeline = [];

// Welcome screen
var welcome = {
	type:'external-html',
  	url: "external_page.html",
  	cont_btn: "start",
  	check_fn: check_consent,
	on_finish: function(){
		jsPsych.setProgressBar(1/24);
	}
};

timeline.push(welcome)

// Create the object table (tr=table row; td= table data)

	//HTML for the first object on the left
	pic1 = "images/" + tangramslist[0] + ".jpg";

	pic2 = "images/" + tangramslist[1] + ".jpg";

	pic3 = "images/" + tangramslist[2] + ".jpg";

	pic4 = "images/" + tangramslist[3] + ".jpg";
	
	pic5 = "images/" + tangramslist[4] + ".jpg";
	
	pic6 = "images/" + tangramslist[5] + ".jpg";

	pic7 = "images/" + tangramslist[6] + ".jpg";

	pic8 = "images/" + tangramslist[7] + ".jpg";

	pic9 = "images/" + tangramslist[8] + ".jpg";
	
	pic10 = "images/" + tangramslist[9] + ".jpg";
	
	pic11 = "images/" + tangramslist[10] + ".jpg";

	pic12 = "images/" + tangramslist[11] + ".jpg";

	pic13 = "images/" + tangramslist[12] + ".jpg";

	pic14 = "images/" + tangramslist[13] + ".jpg";

	pic15 = "images/" + tangramslist[14] + ".jpg";

	pic16 = "images/" + tangramslist[15] + ".jpg";
	
	pic17 = "images/" + tangramslist[16] + ".jpg";
	
	pic18 = "images/" + tangramslist[17] + ".jpg";

	pic19 = "images/" + tangramslist[18] + ".jpg";

	pic20 = "images/" + tangramslist[19] + ".jpg";

	pic21 = "images/" + tangramslist[20] + ".jpg";
	
	pic22 = "images/" + tangramslist[21] + ".jpg";
	
	pic23 = "images/" + tangramslist[22] + ".jpg";

	pic24 = "images/" + tangramslist[23] + ".jpg";

	pic25 = "images/" + tangramslist[24] + ".jpg";
	
	pic26 = "images/" + tangramslist[25] + ".jpg";

	pic27 = "images/" + tangramslist[26] + ".jpg";
 
var instructions = {
     type: "html-keyboard-response",
     stimulus: "<p>In this experiment, you will see pairs of tangrams drawn from the following set of 12. </p>" +
          "<p>For each pair, you will be asked how similar the two tangrams are to each other.</p>" +
          "<p>There will be a slider on the screen for you to indicate similarity.</p>" +
          "<table align = center><tr><td><img src=" + pic1 + " height = 200></td>" +
          "<td><img src=" + pic2 +  " height = 200></td>" +
          "<td><img src=" + pic3 + " height = 200></td>" +
          "<td><img src=" + pic4 + " height = 200></td>" +
          "<td><img src=" + pic5 + " height = 200></td>" +
          "<td><img src=" + pic6 + " height = 200></td>" +
          "<td><img src=" + pic7 + " height = 200></td>" +
          "<td><img src=" + pic9 + " height = 200></td></tr><tr height=100></tr>" +
          "<tr><td><img src=" + pic10 + " height = 200></td>" +
          "<td><img src=" + pic11 + " height = 200></td>" +
          "<td><img src=" + pic12 + " height = 200></td>" +
          "<td><img src=" + pic13 + " height = 200></td>" +
          "<td><img src=" + pic14 + " height = 200></td>" +
          "<td><img src=" + pic15 + " height = 200></td>" +
          "<td><img src=" + pic16 + " height = 200></td>" +
          "<td><img src=" + pic17 + " height = 200></td>" +
          "<td><img src=" + pic18 + " height = 200></td></tr><tr height=100></tr>" +
          "<tr><td><img src=" + pic19 + " height = 200></td>" +
          "<td><img src=" + pic20 + " height = 200></td>" +
          "<td><img src=" + pic21 + " height = 200></td>" +
          "<td><img src=" + pic22 + " height = 200></td>" +
          "<td><img src=" + pic23 + " height = 200></td>" +
          "<td><img src=" + pic24 + " height = 200></td>" +
          "<td><img src=" + pic25 + " height = 200></td>" +
          "<td><img src=" + pic26 + " height = 200></td>" +
          "<td><img src=" + pic27 + " height = 200></td></tr></table>" +
          "<p>Press any key to begin.</p>",
     post_trial_gap: 200
};

timeline.push(instructions);


// Read in .csv from server
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://cdn.rawgit.com/ashleychuikay/turktangrams/master/turktrials.csv";

xhr.open(method, url, true);

xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

    trials = $.csv.toArrays(xhr.responseText);

    shuffle(trials)
    // console.log(trials)
    // allTrials = new Array

		for(i=0; i<trials.length; i++){
			shuffle(trials[i])
		};

	//Making stimulus set
	var allStim = []

		for(i=0; i<trials.length; i++){
			
		leftpic = "images/" + trials[i][0] + ".jpg";
		rightpic = "images/" + trials[i][1] + ".jpg";

		allStim.push({stimulus: "<table align = center><tr><td><img src=" + leftpic + " height = 350></td><td><img src =" + rightpic + " height = 350></td></tr><tr height = 80></tr></table>"})

		trials.splice(0,1);
	};

	console.log(allStim)


	var test = {
	    type: 'html-slider-response',
	    stimulus: jsPsych.timelineVariable('stimulus'),
	    prompt: "<p>How similar are these two tangrams? Please respond using the slider above.</p>",
	    labels: ["Not similar", "Very similar"],
	    post_trial_gap: 100,
	  response_ends_trial: true
	};


	var test_procedure = {
	  timeline: [test],
	  timeline_variables: allStim
	};

	timeline.push(test_procedure);

	jsPsych.init({
		timeline:timeline
		// on_finish: function(data){
			//
		//}
	});
  }
};
xhr.send();





