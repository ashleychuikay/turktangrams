//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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


// Create timeline
var timeline = [];

// Welcome screen
var welcome = {
	type: "html-keyboard-response",
    stimulus: "<p>Welcome to the experiment! </p>"+
    "<p>By answering the following questions, you are participating in a study being performed by cognitive scientists in the University of Chicago Department of Psychology.</p>"+
    "<p>If you have questions about this research, please contact us at <a href='mailto:callab.uchicago@gmail.com'>callab.uchicago@gmail.com</a>.</p>"+
    "<p>You must be  at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you. Note however that we have recently been made aware that your public Amazon.com profile can be accessed via your worker ID if you do not choose to opt out. If you would like to opt out of this feature, you may follow instructions available <a href='https://www.amazon.com/gp/help/customer/display.html?nodeId=16465241'>here</a>.</p>"+
    "<p>Press any key to begin.</p>",
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
     post_trial_gap: 200,
     on_finish: function(){
        jsPsych.setProgressBar(2/24);
    }
};

timeline.push(instructions);

trialnum = 2

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

	allTrials = trials.slice()

		for(i=0; i<allTrials.length; i++){	
			
		leftpic = "images/" + allTrials[i][0] + ".jpg";
		rightpic = "images/" + allTrials[i][1] + ".jpg";

		allStim.push({stimulus: "<table align = 'center'><tr><td height = 200><img src=" + leftpic + " height = 160></td><td width = 150></td><td height = 200><img src =" + rightpic + " height = 160></td></tr></table>"})
	};


	var test = {
	    type: 'html-slider-response',
	    stimulus: jsPsych.timelineVariable('stimulus'),
	    prompt: "<p>How similar are these two tangrams? Please respond using the slider above.</p>",
	    labels: ["Not similar", "Very similar"],
	    post_trial_gap: 100,
	  response_ends_trial: true,
	  on_finish: function(){
	    trialnum = trialnum + 1;
        jsPsych.setProgressBar(trialnum/24); 
    	}
	};


	var test_procedure = {
	  timeline: [test],
	  timeline_variables: allStim
	};

	timeline.push(test_procedure);
	
	var endtest = {
		type: 'html-keyboard-response',
		stimulus: "<p>This is the end of the study. Thank you for participating! Please press any key to end the experiment.</p>",
		on_finish: function(){
        jsPsych.setProgressBar(1);
    	}
	};

	timeline.push(endtest);

	//Preview mode
	var preview = jsPsych.turk.turkInfo().previewMode;


	if(preview == false){
		jsPsych.init({
			timeline:timeline,
			show_progress_bar: true,
			auto_update_progress_bar: false,
			on_finish: function(){ 
				var slider_answers = jsPsych.data.get().filter({trial_type: 'html-slider-response'}).csv();
                data= {
                    slider_answers : slider_answers,
                    trial_info : trials,
                    };

				turk.submit(data);
		}
	});
  }
}
};
xhr.send();





