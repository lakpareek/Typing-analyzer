var sysQuoteLen = 0, usrQuoteLen = 0, mistakes = 0, timeTaken = 0, attempt = 0, speed = 0, accuracy = 0;
var wpmList = [], accuracyList = [];




async function getQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    const quotations = data.content;
    return quotations;
}

var startTime;

function updateTime(seconds) {
    const timeElement = document.querySelector(".time");
    timeElement.textContent = seconds + " seconds";
}

function display() {
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000; 
    var seconds = Math.floor(timeDiff);

    updateTime(seconds);

    setTimeout(display, 1000);
    timeTaken = timeDiff;
}

startTime = new Date(); // Set the start time
display(); // Start the countdown



async function fetchAndDisplayQuote() {
    const quote = await getQuote();
    startTime = new Date();
    setTimeout(display, 1000);
    var a = quote;
    var sysQuote = [];
    for(var i = 0; i<a.length; i++){//the id giving + span creaation loop
        var tag = document.createElement("span");
        if (a[i] === ' ') {
            var space = document.createTextNode('\u00A0');
            element.appendChild(space);
        }
        var text = document.createTextNode(a[i]);
        tag.appendChild(text);
        var element = document.getElementById("givenQuote");
        element.appendChild(tag);
        sysQuoteLen++;
    }
    var niq = 0;
    var spans = document.getElementsByTagName("span");
    Array.from(spans).forEach(span => {
        var newID = 'span' + niq;
        span.setAttribute('id', newID);
        niq++;
    });
    console.log(quote);
    const textarea = document.getElementById("typedText");
    textarea.addEventListener("input", ev => {
        const userTypedText = textarea.value;
        for (var i = 0; i < sysQuoteLen; i++) {
        if(userTypedText.length === quote.length && userTypedText === quote){
            textarea.value = "";
            attempt++
            nextQuote();
            break;
        }
        if (i >= userTypedText.length) {
            // Remove classes for the remaining spans when Backspace is pressed
            document.getElementById("span" + i).classList.remove("right", "wrong");
            mistakes++;
        } else if (quote[i] === userTypedText[i]) {
            document.getElementById("span" + i).classList.add("right");
            document.getElementById("span" + i).classList.remove("wrong");
        } else {
            document.getElementById("span" + i).classList.add("wrong");
            document.getElementById("span" + i).classList.remove("right");
        }
    }
    });    
}


function nextQuote(){
    const divToRemove = document.querySelector(".qText");

// Remove all children of the div
    while (divToRemove.firstChild) {
      divToRemove.removeChild(divToRemove.firstChild);
    }
    console.log(timeTaken);
    wpmList.push(sysQuoteLen/(timeTaken/60));
    accuracyList.push(((sysQuoteLen - mistakes)/sysQuoteLen)*100);
    sumWPM = 0;
    for(var i = 0; i<wpmList.length; i++){
        sumWPM += wpmList[i];
    }
    wpm = sumWPM/wpmList.length;
    document.getElementById("speed").innerHTML = Math.floor(wpm) + "CPM";
    var sumAccuracy = 0;
    for(var i = 0; i<accuracyList.length; i++){
        sumAccuracy += accuracyList[i];
    }
    accuracy = sumAccuracy/accuracyList.length;
    document.getElementById("accu").innerHTML = Math.floor(accuracy) + "%";
    sysQuoteLen = 0;
    sysQuote = [];
    quote = "";
    quotations = "";
    mistakes = 0;
    fetchAndDisplayQuote();
}


fetchAndDisplayQuote();



