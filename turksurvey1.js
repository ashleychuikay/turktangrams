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


//function to save data
function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'turktangramsdata.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}


// Create timeline
var timeline = [];

// Welcome screen
var welcome = {
	type: "html-keyboard-response",
    stimulus: "Welcome to the experiment! Press any key to begin."
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

 
var instructions = {
     type: "html-keyboard-response",
     stimulus: "<p>In this experiment, you will see pairs of tangrams drawn from the following set of 12. </p>" +
          "<p>For each pair, you will be asked how similar the two tangrams are to each other.</p>" +
          "<p>There will be a slider on the screen for you to indicate similarity.</p>" +
          "<table align = center><tr><td><img src=" + pic1 + " height = 100></td>" +
          "<td><img src=" + pic2 +  " height = 100></td>" +
          "<td><img src=" + pic3 + " height = 100></td>" +
          "<td><img src=" + pic4 + " height = 100></td>" +
          "<td><img src=" + pic5 + " height = 100></td>" +
          "<td><img src=" + pic6 + " height = 100></td></tr><tr height=60></tr>" +
          "<tr><td><img src=" + pic7 + " height = 100></td>" +
          "<td><img src=" + pic8 + " height = 100></td>" +
          "<td><img src=" + pic9 + " height = 100></td>" +
          "<td><img src=" + pic10 + " height = 100></td>" +
          "<td><img src=" + pic11 + " height = 100></td>" +
          "<td><img src=" + pic12 + " height = 100></td></tr></table>" +
          "<p>Press any key to begin.</p>",
     post_trial_gap: 200
};

timeline.push(instructions);


// Read in .csv from server
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://cdn.rawgit.com/ashleychuikay/turktangrams/1926722b/turktrials1.csv";

xhr.open(method, url, true);

xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

    trials = $.csv.toArrays(xhr.responseText);

    shuffle(trials)

		for(i=0; i<trials.length; i++){
			shuffle(trials[i])
		};

	//Making stimulus set
	var allStim = []

		for(i=0; i<trials.length; i++){
			
		leftpic = "images/" + trials[i][0] + ".jpg";
		rightpic = "images/" + trials[i][1] + ".jpg";

		allStim.push({stimulus: "<table align = center><tr><td><img src=" + leftpic + " height = 200></td><td width = 150></td><td><img src =" + rightpic + " height = 200></td></tr><tr height = 80></tr></table>"})

		trials.splice(0,1);
	};

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

	var endtest = {
		type: 'html-keyboard-response',
		stimulus: "<p>This is the end of the study. Thank you for participating! Please press any key to end the experiment.</p>" 
	}

	turkID = jsPsych.turk.turkInfo().workerID;

	//Preview mode
	var preview = jsPsych.turk.turkInfo().previewMode
	if(preview = true){
		alert("Please accept the HIT to beging the study.");
	} else{
	jsPsych.init({
		timeline:timeline,
		show_progress_bar: true,
		on_finish: function(){ saveData("data_" + turkID + ".csv", jsPsych.data.get().csv()); }
	});
	}
  }
};
xhr.send();





