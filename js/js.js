$(document).ready(function() {
    $(".reset").click( function(){
        location.reload(true);
        alert("New game button resets!");
                      });
    /*button start function to execute the instructions*/
    $(".start").click(quizGame);
    
    function quizGame(){
        console.log("the game starts");
        var scoreAry = []; //tengo que revisar de dónde viene esta var
        var questions = [{
            q: "Who was the actor of the main character in the film <i>Django, unchained</i> from Tarantino?",
            a: ["Jamie Foxx", "Samuel L. Jackson", "Will Smith"],
            c: "Jamie Foxx",
            correct: 0
        }, { //question2
            q: "Who was the director of the film <i>Star Wars: The force awakens</i>?",
            a: ["George Lucas", "Ridley Scott", "J.J.Abrams"],
            c: "J.J.Abrams",
            correct: 0
        }, { //question3
            q: "When was <i>Blade Runner</i> released in cinema?",
            a: ["1980", "1982", "2007"],
            c: "1982",
            correct: 0
        } , { //question4
            q: "How many Oscars has won Tarantino?",
            a: ["1", "2", "3"],
            c: "1",
            correct: 0
        } , { //question5
            q: "How is named the café where Amelie works?",
            a: ["Le chat noir", "Le deux moulins", "Le petit café"],
            c: "Le deux moulins",
            correct: 0
        }];
        var counter = questions.length;
        //It makes the question and answer data from the questions array and appends it to the div #questions
        //Counter of questions for apperar in the div
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].a, i) + '<button type="submit" class="next">NEXT</button></p></form>');
            }
        //This hides all except the 1st question
        for (var k = questions.length-1; k > 0; k--){
            $('#' + k).hide();
        }
    }
        //It makes the answer choices from the questions array and it returns them to makeQuestion()
        function radioButtons(ary, qNum){
            var answers = [];
            for (i = 0; i < ary.length; i++){
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '<label>');
            }
            return answers.join(" ");
        }
        
        //It adds the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array){
                return previousValue + currentValue;
            
            });
        }
        
        //It checks the user' s answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].c) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
                console.log("correct");
            } else {
                scoreAry.push(questions[qNum].correct);
                console.log("wrong");
            }
        }
        
     createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 6.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].c);
                            $("#questions").append('<p class="missed-' + j + '">You have failed: ' + questions[j].q + ' ' + questions[j].c + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});