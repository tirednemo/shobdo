var recognition = new webkitSpeechRecognition();
// recognition.lang = "bn-IN";
recognition.continuous = false;
recognition.interimResults = true;

document.querySelectorAll(".collapsible-body").forEach((body) => {
  body.style.display = "none";
});

document.querySelectorAll(".collapsible-header").forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    document.querySelectorAll(".collapsible-body").forEach((otherBody) => {
      if (otherBody !== body) {
        otherBody.style.display = "none";
      }
    });
    body.style.display = body.style.display === "block" ? "none" : "block";
  });
});

var interval;
var scrollInterval;
var mode = "";
function closeMenu() {
  $(".menu").removeClass("active");
}

function start() {
  recognition.stop();
  var micOn = document.getElementById("mic-on");
  var micOff = document.getElementById("mic-off");
  micOff.style.display = "none";
  micOn.style.display = "block";
  recognition.start();
  console.log("hi");

  recognition.onresult = function (event) {
    console.log("chatting");

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var res = event.results[i][0].transcript.toLowerCase().trim();
        res = res.replace(/[\.。।]$/, "");
        console.log(res);

        if (res.startsWith("click")) {
          clickItem(res);
        } else if (res.startsWith("go")) {
          navigate(res);
        } else if (res.startsWith("open ")) {
          let siteName = res.slice(5); // Remove the "open " part of the command
          let url;
        
          if (siteName === "google") {
            url = "https://www.google.com";
          } else if (siteName === "facebook") {
            url = "https://www.facebook.com";
          } else {
            speak("Sorry, I don't know how to open that site.");
            return;
          }
        
          window.open(url, '_blank');
          speak("Opening " + siteName);
        } else if (res === "stop") {
          stop();
        }
        console.log("going");
        interval = setInterval(getRid, 3000);
      }
    }
  };
}

function getRid() {
  console.log("gone");
  clearInterval(interval);
  start();
}

function stop() {
  // speak("do not say this is goodbye. it is more of a see you later");
  recognition.stop();
  var micOn = document.getElementById("mic-on");
  var micOff = document.getElementById("mic-off");
  micOn.style.display = "none";
  micOff.style.display = "block";
  console.log("bye");
  gotoItem("#one");
}

// talkback
var button = document.getElementById("speak");
var speechMsgInput = document.getElementById("speech-msg");
var voiceSelect = document.getElementById("voice");
var volumeInput = document.getElementById("volume");
var rateInput = document.getElementById("rate");
var pitchInput = document.getElementById("pitch");

function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.volume = 1;
  msg.voice = speechSynthesis.getVoices().filter(function (voice) {
    return voice.name == "Fred";
  })[0];
  window.speechSynthesis.speak(msg);
}

function gotoItem(which) {
  closeMenu();
  $(which)[0].scrollIntoView(true);
}

$("nav ul")
  .find("a")
  .click(function () {
    var $href = $(this).attr("href");
    gotoItem($href);
    return false;
  });

function clickItem(res) {
  mode = "click";
  if (res === "click" || res === "click audio" || res === "click media") {
    let audioElement = document.querySelector("audio");
    if (audioElement.paused) {
      audioElement.play();
      speak("Audio started.");
    } else {
      audioElement.pause();
      speak("Audio paused.");
    }
  } else if (res === "click button") {
    let buttonElement = document.querySelector("button");
    buttonElement.click();
    speak("Button clicked.");
  } else if (res === "click checkbox") {
    let checkboxElement = document.querySelector('input[type="checkbox"]');
    checkboxElement.checked = !checkboxElement.checked;
    speak("Checkbox toggled.");
  } else if (res === "click color") {
    let colorElement = document.querySelector('input[type="color"]');
    colorElement.click();
    speak("Color input clicked.");
  } else if (res === "click date") {
    let dateElement = document.querySelector('input[type="date"]');
    dateElement.click();
    speak("Date input clicked.");
  } else if (res === "click file") {
    let fileElement = document.querySelector('input[type="file"]');
    fileElement.click();
    speak("File input clicked.");
  } else if (res === "click image") {
    let imageElement = document.querySelector("img");
    imageElement.click();
    speak("Image clicked.");
  } else if (res === "click link") {
    let linkElement = document.querySelector("a");
    linkElement.click();
    speak("Link clicked.");
  } else if (res === "click range") {
    let rangeElement = document.querySelector('input[type="range"]');
    rangeElement.click();
    speak("Range input clicked.");
  } else if (res === "click radio") {
    let radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach((radio, index) => {
      if (index === 0 && !radio.checked) {
        radio.checked = true;
        speak("Radio button A selected.");
      } else {
        radio.checked = false;
      }
    });
  } else if (res === "click select") {
    let selectElement = document.querySelector("select");
    selectElement.click();
    speak("Select input clicked.");
  } else if (res === "click text") {
    let textElement = document.querySelector('input[type="text"]');
    textElement.focus();
    speak("Text input focused.");
  } else if (res === "click video" || res === "click media") {
    let videoElement = document.querySelector("video");
    if (videoElement.paused) {
      videoElement.play();
      speak("Video started.");
    } else {
      videoElement.pause();
      speak("Video paused.");
    }
  }
}


function navigate(res){
  if (res === "go back") {
    window.history.back();
    speak("Navigated back.");
  } else if (res === "go forward") {
    window.history.forward();
    speak("Navigated forward.");
  } else if (res === "reload") {
    location.reload();
    speak("Page reloaded.");
  } else if (res === "stop") {
    window.stop();
    speak("Page loading stopped.");
  }
}