var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswered = 0;
var arrayCount = 0;
var count = Math.floor(Math.random() * 3);
var wait;
var rightAns;
var timer;
var clockRunning = false;

function resetPage(){
			correctAnswer = 0;
			incorrectAnswer = 0;
			unanswered = 0;
			arrayCount = 0;
			count = Math.floor(Math.random() * 3);
			wait;
			rightAns;
			timer;
			clockRunning = false;
			time.stop();
			$("#startOver").hide();
			$("#didYouWin").empty();
			$("#correctWas").empty();
			$("#startButton").show();
			$('#ans0').empty();
			$("#ans1").empty();
			$("#ans2").empty();
			$('#ans3').empty();
			$("#stats").empty();
			$("#timer").html("Time Remaining: 30 Seconds");
			}

	function createImage(src){
		var img = new Image();
		img.src = src;
		return img;
	}

	var question1Pic = createImage("assets/images/nes.png");
	var question2Pic = createImage("assets/images/shyguy.png");
	var question3Pic = createImage("assets/images/n64.jpg");
  //var question4Pic = createImage("#");
  //var question5Pic = createImage("#");

	var myImages = [question1Pic, question2Pic, question3Pic];

		var time = {
			timeLeft: 30,

			reset: function(){
				time.timeLeft = 30;
				$("#timer").html("Time Remaining: 30 Seconds");

				if(!clockRunning){
				timer = setInterval(time.count, 1000);
				clockRunning = true;

				}

			},

			start: function(){

				if(!clockRunning){
				timer = setInterval(time.count, 1000);
				clockRunning = true;

				}
			},

			stop: function(){

				clearInterval(timer);
				clockRunning = false;
			},

			count: function(){

				time.timeLeft--;


				$("#timer").html("Time Remaining: " + time.timeLeft + " Seconds");

				if(time.timeLeft <= 0){
				clearInterval(timer);
				clockRunning = false;

				outOfTime();
				}
			}
		}

		function nextQuestion(){

			if (arrayCount <= 1) {
				time.reset();
				arrayCount++;

				$('#question').html(triviaArray[arrayCount].question);
				$('#didYouWin').empty();
				$('#didYouWinPic').empty();
				$('#correctWas').empty();

				for (var j = 0; j < 4; j++) {

					$("#ans" + j).append("<div class = 'answer'>" + triviaArray[arrayCount].answers[count] + "</div>");
					count++;

					if (count === 4) {
						count-=4;
					}

				}
			}
			else{
				gameOver();
			}
		}


		function Correct(){
			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("CORRECT!!!");
			$('#didYouWinPic').html(myImages[arrayCount]);


			correctAnswer++;

			wait = setTimeout(nextQuestion, 5000);
		}

		function Incorrect(){
			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("WRONG ANSWER");
			$('#didYouWinPic').html(myImages[arrayCount]);
			$('#correctWas').html("The correct answer was " + rightAns);

			incorrectAnswer++;
			wait = setTimeout(nextQuestion, 5000);
		}



		function outOfTime(){
			rightAns = triviaArray[arrayCount].correct;

			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("OUT OF TIME");
			$('#correctWas').html("The correct answer was " + rightAns);
			$('#didYouWinPic').html(myImages[arrayCount]);

			unanswered++;

			wait = setTimeout(nextQuestion, 5000);
		}

		function gameOver(){
			$("#stats").html("All done! Here are your stats:");
			$("#ans0").html("Correct Answers: " + correctAnswer);
			$("#ans1").html("Incorrect Answers: " + incorrectAnswer);
			$("#ans2").html("Unanswered: " + unanswered);
			$("#didYouWinPic").empty();
			$('#didYouWin').empty();
			$("#startOver").show();
			$("#correctWas").empty();
		}



	function Trivia(question, answer1, answer2, answer3, correct){
		this.question = question;
		this.answers = [answer1, answer2, answer3, correct];
		this.correct = correct;
	};


		var trivia0 = new Trivia("In what year did Nintendo release its first game console in North America?", " 1990", "1993", "1979", "1985");
		var trivia1 = new Trivia("Which bad guy was intoduced in Supar Mario Bros 2?", "Goomba", "Koopa Troopa", "Lakitu", "Shy Guy");
		var trivia2 = new Trivia("In what year was the Nintendo 64 officially released?", "1990", "2000", "1993", "1996");
    //var trivia3 = new Trivia("Which Zelda game did the Master Sword first appear in?", "Ocarina of Time", "Wind Waker", "Twilight Princess", "A Link To The Past");
    //var trivia4 = new Trivia("What is the name of links Fairy in the Zelda games?", "Iris", "Tail", "Heal", "Navi");

		var triviaArray = [trivia0, trivia1, trivia2];



$(document).ready(function(){

	$("#startOver").hide();
		$('#startButton').click(function(){
			$('#startButton').hide();
			$("#didYouWin").empty();
			$("#correctWas").empty();

			time.start();

			$('#question').html(triviaArray[arrayCount].question);

			for (var j = 0; j < 4; j++) {

				$("#ans" + j).append("<div class = 'answer'>" + triviaArray[arrayCount].answers[count] + "</div>");
				count++;

				if (count === 4) {
					count-=4;
				}

			}

		})


		$('h3').click(function(){
			time.stop();



			rightAns = triviaArray[arrayCount].correct;
			var clickedAns = $(this).text();

			if (clickedAns == rightAns) {

				Correct();
			}
			else{

				Incorrect();
			}

		})

	$("#startOver").click(function(){

		resetPage();
	})
});
