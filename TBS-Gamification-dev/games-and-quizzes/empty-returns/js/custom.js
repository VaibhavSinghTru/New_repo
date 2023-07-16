function preventScroll(event) {
    event.preventDefault();
}
///
var doc = document.documentElement;

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

var Baseurl = window.location.href

var queryString = Baseurl.split("?")[1]?.toLowerCase();;
var urlParams = new URLSearchParams(queryString);
var gameType = urlParams.get("gameType");
gameType = gameType ? gameType : "archive"

///
var closeBtn = document.querySelectorAll(".close, .playAgain");
closeBtn.forEach((closeBtn) => {
    closeBtn.href = Baseurl
})


window.addEventListener('touchmove', preventScroll, { passive: false });

window.addEventListener('touchstart', preventScroll, { passive: false });

var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.screen.height;
var gameContainer = document.getElementById("game-container");

var userAgent = navigator.userAgent;
var score = 0;
var strikes = 0;
var timer = 60;
var timeInterval;
var fallInterval;
var objects = [
    { className: "clear-glass-up", bin: "clear-glass", img: 'images/brown-bottle-up.svg' },
    { className: "coloured-glass-green", bin: "coloured-glass", img: 'images/green-bottle.svg' },
    { className: "alumunium-cans", bin: "alumunium-cans", img: 'images/alumunium-cans-right.svg' },
    { className: "others-material", bin: "others-material", img: 'images/paper-pack.svg' },
    { className: "clear-glass-brown", bin: "coloured-glass", img: 'images/brown-bottle.svg' },
    { className: "others-material", bin: "others-material", img: 'images/plastic-pack.svg' },
    { className: "alumunium-cans", bin: "alumunium-cans", img: 'images/alumunium-cans-up.svg' },
    { className: "clear-glass-down", bin: "clear-glass", img: 'images/brown-bottle-down.svg' },
    { className: "others-material", bin: "others-material", img: 'images/plastic-pack-right.svg' },
];
var selectedObject = null;
var offsetX = 0;
var offsetY = 0;
var gameContainer = document.getElementById("game-container");
var gameOver = document.getElementById("game-over");
var scoreValue = document.getElementById("score-value");
var strikesValue = document.getElementById("strikes-value");
var timerValue = document.getElementById("timer-value");
var scoreTimer = document.getElementById('scoreTimer');
var timernode = scoreTimer.getElementsByTagName('span');
var timerImg = document.getElementById('timeimg');
var velocity = { x: 0, y: 0 };
var acceleration = { x: 0, y: 0.1 };
var binPosition
var fallObjectsIntervalSet
var index
var previousIncrement
var lastNum1 = -1;
var lastNum2 = -1
        var isDragging = false;
        var currentDraggable = null;



function getRandomNumber() {
    var num;
    do {
        num = Math.floor(Math.random() * objects.length);
    } while (num === lastNum1 && num === lastNum2);
    lastNum2 = lastNum1;
    lastNum1 = num;
    return num;
}

function createObject() {
    var randomNum = getRandomNumber()
    if (randomNum === index) {
        if (randomNum === 0)
            index = Math.floor(Math.random() * objects.length)
        else
            index = index - 1
    } else index = randomNum

    var object = objects[index];
    if (window.orientation === 0||window.orientation===180) {
        var screenWidth = window.innerHeight - 50;
    } else
        var screenWidth = window.innerWidth;
    var gap = Math.floor(Math.random() * 300) + 20
    var totalScreen = screenWidth < 950 ? 400 : (screenWidth - 150)
    var increment = Math.floor(Math.random() * (screenWidth - 100));
    increment += gap;

    if (increment > screenWidth - screenWidth / 12) {
        const randomNumber = Math.floor(Math.random() * 9) + 2;

        if (/iPhone/i.test(userAgent) == true)
            increment = screenWidth / randomNumber
        else increment = screenWidth / randomNumber
    }

    var obj = document.createElement("img");
    obj.classList.add("object");
    obj.classList.add(object.className);
    obj.setAttribute("src", object.img);
    obj.setAttribute("alt", object.name);
    obj.dataset.bin = object.bin;
    let differ = previousIncrement - increment

    if (Math.abs(previousIncrement - increment) < 60) {
        if (previousIncrement > increment)
            increment = 50
        else increment += 50
    }
 
    obj.style.left = increment + "px";
    obj.style.top = "-150px";
    obj.setAttribute("draggable", "true");
    obj.setAttribute("id", "drag-" + Math.random().toString(36).substr(2, 9));
    const containerElement = document.querySelector('.draggable-items');
    if(navigator.userAgent.includes("Firefox")){
        containerElement.addEventListener('mousedown', dragStartF);
        document.addEventListener('mousemove', dragMoveF);
        document.addEventListener('mouseup', dragEndF);
        
       }
     else{
        obj.addEventListener("dragstart", dragStart);
     }
    if (navigator.platform.indexOf('Mac') != -1) {
        obj.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }

    obj.addEventListener("touchstart", dragStart, { passive: true });

    var draggableItems = document.querySelector(".draggable-items");
    draggableItems.appendChild(obj);
    previousIncrement = increment
}

//}
function dragStartF(event) {
    event.preventDefault();
    isDragging = true;
    currentDraggable = event.target;
    var offsetX = event.clientX - currentDraggable.offsetLeft;
    var offsetY = event.clientY - currentDraggable.offsetTop;
    currentDraggable.setAttribute("data-offset-x", offsetX);
    currentDraggable.setAttribute("data-offset-y", offsetY);
  }
  
  function dragMoveF(event) {
    if (isDragging) {
      var offsetX = parseInt(currentDraggable.getAttribute("data-offset-x"));
      var offsetY = parseInt(currentDraggable.getAttribute("data-offset-y"));
      var newTop = event.clientY - offsetY;
      var newLeft = event.clientX - offsetX;
      currentDraggable.style.top = newTop + "px";
      currentDraggable.style.left = newLeft + "px";
    }
  }
  
  function dragEndF(event) {
    isDragging = false;
    currentDraggable = null;
  }

function fallObjects() {

    var objects = document.querySelectorAll(".object");
    objects.forEach(function (obj) {

        if (obj === selectedObject) {
            var newX = parseInt(obj.style.left) + (obj.offsetLeft);
            var newY = parseInt(obj.style.top) + (obj.offsetTop);
            obj.style.left = newX + "px";
            obj.style.top = newY + "px";
        } else {
            var top = parseInt(obj.style.top);
            var newTop = top + 5;
            obj.style.top = newTop + "px";
        }
        if (window.orientation === 0 || window.orientation === 180) {
            var screenHeight = window.innerWidth;

            if (newTop > screenHeight) {

                obj.remove();
                score = score + 1;

            }
            if (newTop > screenHeight - document.querySelector('.bin_bottom_part').clientWidth - document.querySelector('.line1').clientWidth - 20) {

                findTheBoxIndexIncrease(obj)

            }
            if (newTop > screenHeight - document.querySelector('.droppable').clientWidth) {
                findTheBox(obj)

            }
        } else {
            var screenHeight = window.innerHeight;

            if (newTop > screenHeight) {

                obj.remove();
                score = score + 1;

            }
            if (newTop > screenHeight - document.querySelector('.bin_bottom_part').clientHeight - document.querySelector('.line1').clientHeight - 50) {

                var objParam = obj.getBoundingClientRect()
               
                document.querySelectorAll('.bin_image .line1').length && document.querySelectorAll('.bin_image .line1').forEach((ele, i) => {
                    var eleParam = ele.getBoundingClientRect()
                    if (objParam.left > eleParam.left && eleParam.right > objParam.right) {

                        if (obj.dataset.bin === ele.dataset.bin) {

                            obj.style.zIndex = 1
                            isDragging=false
                            obj.setAttribute("draggable", "false");
                           obj.removeEventListener("touchstart", dragStart, { passive: true });
                           obj.removeEventListener("touchmove", drag, { passive: false });
                           obj.removeEventListener("touchend", dragEnd, { passive: false })
                           obj.removeEventListener("dragstart", dragStart, { passive: true });
                           obj.removeEventListener("drag", drag, { passive: false });
                            obj.removeEventListener("dragend", dragEnd, { passive: false });
                            
                         
                        }

                    }
                   
                })

            }
            if (newTop > screenHeight - document.querySelector('.droppable').clientHeight) {
                var objParam = obj.getBoundingClientRect()
                document.querySelectorAll('.bin_image .line1').length && document.querySelectorAll('.bin_image .line1').forEach((ele, i) => {
                    var eleParam = ele.getBoundingClientRect()
                    if (objParam.left > eleParam.left && eleParam.right > objParam.right) {

                        if (obj.dataset.bin === ele.dataset.bin) {

                            scoreValue.textContent = parseInt(scoreValue.textContent) + 1;
                         
                            obj.remove();
                        }

                    }
                })

            }
        }
    });
}


function findTheBoxIndexIncrease(obj) {

    var objParam = obj.getBoundingClientRect()
    //obj.setAttribute("draggable", "false");
    document.querySelectorAll('.bin_image .line1').length && document.querySelectorAll('.bin_image .line1').forEach((ele, i) => {
        var eleParam = ele.getBoundingClientRect()
        if (objParam.top > eleParam.top && eleParam.bottom > objParam.bottom && eleParam.left - 90 < objParam.left) {

            if (obj.dataset.bin === ele.dataset.bin) {
                obj.style.zIndex = 1
                obj.setAttribute("draggable", "false");
                isDragging=false
               obj.removeEventListener("touchstart", dragStart, { passive: true });
               obj.removeEventListener("touchmove", drag, { passive: false });
                obj.removeEventListener("touchend", dragEnd, { passive: false });
                obj.removeEventListener("dragstart", dragStart, { passive: true });
                obj.removeEventListener("drag", drag, { passive: false });
                 obj.removeEventListener("dragend", dragEnd, { passive: false });
    
            }

        }
    })
}

function findTheBox(obj) {

    var objParam = obj.getBoundingClientRect()
    document.querySelectorAll('.bin_image .line1').length && document.querySelectorAll('.bin_image .line1').forEach((ele, i) => {
        var eleParam = ele.getBoundingClientRect()
        if (objParam.top > eleParam.top && eleParam.bottom > objParam.bottom && eleParam.left < objParam.left) {

            if (obj.dataset.bin === ele.dataset.bin) {

                scoreValue.textContent = parseInt(scoreValue.textContent) + 1;
         
                obj.remove();
            }

        }
    })
}



var createObjectInterval = 1700;
var baseInterval = 60; 
var intervalDecreaseFactor = 0.01; // Adjust this factor as desired
var fallObjectsInterval
function updateFallObjectsInterval() {
  var screenWidth = window.innerWidth;
  var adjustedInterval = baseInterval;

  if (screenWidth > 1992) {
    var excessWidth = screenWidth - 1992;
    var intervalDecrease = excessWidth * intervalDecreaseFactor;
    adjustedInterval = baseInterval - intervalDecrease;
  }

  fallObjectsInterval = Math.max(adjustedInterval, 0); 
}


updateFallObjectsInterval();

window.addEventListener('resize', function() {
  updateFallObjectsInterval();
});

var maxObjects = 10;
var model = 0
function startGame() {

    if (window.innerWidth > 320 && window.innerWidth <= 1279.99 && window.innerHeight >= 550) {
        document.querySelectorAll('.cloud_img').forEach((ele) => ele.style.display = 'none')
    }
    var startTime = 0
    timeInterval = setInterval(async function () {
        startTime++

        if (startTime > 1)
            timer--;
        timerValue.textContent = timer;
        if (timer === 0) {
            clearInterval(timeInterval);
            clearInterval(fallInterval);
            clearInterval(fallObjectsIntervalSet)
            window.removeEventListener('touchmove', preventScroll, { passive: false });
            window.removeEventListener('touchstart', preventScroll, { passive: false });
            let htmlDiv = document.querySelector('html').style
            let bgDiv = document.querySelector('.game_start').style.display = "none"
            htmlDiv.transform = "none"
            htmlDiv.overflow = 'hidden'
            htmlDiv.height = "100vh"
            htmlDiv.width = "100vw"
            htmlDiv.position = "fixed"
            htmlDiv.top = "0px"
            htmlDiv.left = "0"
            if(navigator.userAgent.includes("Firefox")){
                document.removeEventListener('mousedown', dragStartF);
                document.removeEventListener('mousemove', dragMoveF);
                document.removeEventListener('mouseup', dragEndF);
                
               }
            var bgColor = document.querySelectorAll('.bg_color')
            bgColor.forEach((ele, i) => {
                ele.style.height = '100vh';
                ele.style.width = '100vw';
            })
            document.querySelector(".draggable-items").style.display = 'none'
            // do nothing
            document.querySelector("#emptyForm").style.display = "block"


        }
        else if (timer <= 10) {
            for (var i = 0; i < timernode.length; i++) {
                timernode[i].style.color = "#BF1332";
            }
            timerImg.src = 'images/time.svg'

        }

        // increase difficulty every 30 seconds
        setTimeout(() => {
            if (timer % 6 == 0 && timer > 10) {
                fallObjectsInterval -= window.innerWidth>1900?2:4;
                clearInterval(fallObjectsIntervalSet)
                fallObjectsIntervalSet = setInterval(() => {



                    fallObjects()

                }, fallObjectsInterval);
            }
        }, 1000)


        if (timer === 50 || timer === 40 || timer === 15) {

            createObjectInterval -= 500;
            timer === 15 ? createObjectInterval = 400 : createObjectInterval

            if (createObjectInterval < 500) {
                createObjectInterval = 500;
            }


            clearInterval(fallInterval); // Clear the previous interval
            fallInterval = setInterval(() => {
                if (objects.length < maxObjects && timer > 0)
                createObject()
            }, createObjectInterval);


        }

    }, 1000);


    setIntervals()
    fallObjects()
    speedIncrease()
}

function speedIncrease() {
    fallObjectsIntervalSet = setInterval(() => {



        fallObjects()

    }, fallObjectsInterval);
}
function setIntervals() {


    fallInterval = setInterval(function () {

        var objects = document.querySelectorAll(".object");
        if (objects.length < maxObjects && timer > 0) {
            createObject()
        }

    }, createObjectInterval);


}


var droppableElems = document.querySelectorAll(".droppable");

droppableElems.forEach((elem) => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
    elem.addEventListener("touchstart", dragEnter);
    elem.addEventListener("touchmove", dragOver);
    elem.addEventListener("touchend", dragLeave);
    elem.addEventListener("touchcancel", drop);
});

var currentDraggable = null;

function encryptData(data) {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.SECRET,
    ).toString();
}



function dragEnd(event) {

    var element = event.target;
    var top = parseInt(element.style.top);
    var left = parseInt(element.style.left);
    var newTop = top + event.clientY;
    var newLeft = left + event.clientX;

    if (newTop < 0) {
        newTop = 0;
    } else if (newTop > window.innerHeight - element.offsetHeight) {
        newTop = window.innerHeight - element.offsetHeight;
    }
    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft > window.innerWidth - element.offsetWidth) {
        newLeft = window.innerWidth - element.offsetWidth;
    }

    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";

    element.removeEventListener("drag", drag);
    element.removeEventListener("dragend", dragEnd);
    element.removeEventListener("touchmove", drag);
    element.removeEventListener("touchend", dragEnd);
}


function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}



function dragStart(event) {
    var rect = event.target.getBoundingClientRect();
    var offsetX, offsetY;

    if (event.type === "touchstart") {
        var touch = event.changedTouches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        event.target.setAttribute("data-offset-x", offsetX);
        event.target.setAttribute("data-offset-y", offsetY);
        currentDraggable = event.target;
        var dataId = currentDraggable.getAttribute("data_id");

        event.target.addEventListener("touchmove", drag);
        event.target.addEventListener("touchend", dragEnd);
    } else {
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        event.target.setAttribute("data-offset-x", offsetX);
        event.target.setAttribute("data-offset-y", offsetY);
        currentDraggable = event.target;
        var dataId = currentDraggable.getAttribute("data_id");

        event.target.addEventListener("drag", drag);
        if (!isMac)
            event.target.addEventListener("dragend", dragEnd);
    }

    event.target.style.touchAction = "none";
}




function drag(event) {

    var pageX, pageY;

    if (event.type.startsWith("touch")) {
        // Handle touch events
        var touch = event.touches[0];
        if (window.orientation === 0|| window.orientation === 180) {
            const body = document.getElementsByTagName('body')

            var reduce = 0
            if (/iPhone/i.test(userAgent) == true) {
                reduce = 40
            } else reduce = 10
            pageX = touch.pageX
            pageY = body[0].clientWidth - touch.pageY - reduce;

        }
        else {
            pageX = (touch.pageX);
            pageY = (touch.pageY);
        }


    } else {
        // Handle mouse events
        pageX = event.pageX;
        pageY = event.pageY;
    }

    if (currentDraggable) {
        var offsetX = parseInt(currentDraggable.getAttribute("data-offset-x"));
        var offsetY = parseInt(currentDraggable.getAttribute("data-offset-y"));
        if (window.orientation === 0|| window.orientation === 180) {
            var newTop = pageX
            var newLeft = pageY
        }
        else {
            var newTop = pageY - offsetY;
            var newLeft = pageX - offsetX;
        }
        currentDraggable.style.top = newTop + "px";
        currentDraggable.style.left = newLeft + "px";
    }
}








function dragEnter(e) {
    e.target.classList.add("droppable-hover");
}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.target.classList.remove("droppable-hover");
}


function drop(event) {
    event.preventDefault();



    // Set unique data for both elements 
    var draggableElemData = currentDraggable.dataset.bin;
    var droppableElemData = event.target.id;

    // Check if element is positioned correctly 
    if (draggableElemData === droppableElemData) {
        // Get elements
        scoreValue.textContent = parseInt(scoreValue.textContent) + 1;

    } else {
        event.target.classList.remove("droppable-hover");
    }
}

startGame();

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
var vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


var documentHeight = () => {

    if (window.orientation === 0) {

        var doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerWidth}px`)
        doc.style.setProperty('--doc-width', `${window.innerHeight - 70}px`)
    } else {

        var doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        doc.style.setProperty('--doc-width', `${window.innerWidth}px`)
    }


}
window.addEventListener('resize', documentHeight)

document.querySelector('.submit').addEventListener('click', validateForm)

function validateForm() {
    var fname = document.getElementById("fname").value.trim(); // Trim leading and trailing spaces
    var lname = document.getElementById("lname").value.trim();
    var email = document.getElementById("email").value.trim();
    var checkbox = document.getElementById("above_19").checked;
   
    var fnameError = document.getElementById("fnameError");
    var lnameError = document.getElementById("lnameError");
    var emailError = document.getElementById("emailError");
    var subscribe = document.getElementById("empty_subscribe_newsletter").checked;

    fnameError.textContent = "";
    lnameError.textContent = "";
    emailError.textContent = "";
    document.getElementById("above_19_error").textContent = "";

    if (fname === "") {
        fnameError.textContent = "Please enter your first name.";
    } else if (fname.length >= 18) {
        fnameError.textContent = "First name should be less than 18 characters.";
    } else if (!/^[^\s]+$/.test(fname)) {
        fnameError.textContent = "First name should not contain spaces.";
    } else if (!/^[a-zA-Z\-]+$/.test(fname)) {
        fnameError.textContent = "First name should not contain special characters.";
    }


    if (!checkbox) {
        document.getElementById("above_19_error").textContent = "Please select the checkbox.";
    }

    if (subscribe || email.length) {

        if (email === "") {
            emailError.textContent = "Please enter your email address.";
        } else if (!validateEmail(email)) {
            emailError.textContent = "Please enter a valid email address.";
        }
    }

    if (subscribe) {
        if (
            fnameError.textContent === "" &&
            subscribe &&
            emailError.textContent === "" &&
            document.getElementById("above_19_error").textContent === ""
        ) {
            dataManufacturing()

        }
    } else if (!subscribe) {
        if (fnameError.textContent === "" && document.getElementById("above_19_error").textContent === "") {

            dataManufacturing()
        }
    }
}
function dataManufacturing() {


    var subscribe = document.getElementById("empty_subscribe_newsletter").checked;
    const data = {
        firstName: document.getElementById('fname').value.trim(),
        lastName: document.getElementById('lname').value.trim(),
        email: document.getElementById('email').value.trim(),
        score: document.getElementById('score-value').textContent,
        Issubscribe: subscribe,
        gameId: "1",
        expireTime: moment().utc(0).unix() + 60,
        tags: gameType === "event" ? "EmptyReturns-Event" : "empty-returns",
        source: "website",
        gameType: gameType,
        beerMatches: []
    };
    PostApiCall(data)
    document.querySelectorAll('.container_main')[0].style.display = 'none'
    document.querySelectorAll('.container_main')[1].style.display = 'none'

    document.querySelectorAll('#emptyForm')[0].style.display = 'none'
    document.querySelectorAll('.container_main')[2].style.display = 'block'
}
function validateEmail(email) {

    var re = /^[^@]+@[^@]+\.[^@]+$/;
    return re.test(email);
}

async function PostApiCall(data) {

    if (/iPhone/i.test(userAgent) == true) {
        document.querySelector('#loader').style.position = "absolute"
        document.querySelector('#loader').style.top = "45%"
    }
    document.querySelector('#intro').style.display = 'none'

    document.querySelector('#emptyForm').style.display = 'none'
    document.querySelectorAll('.container_main')[2].style.display = 'block'
    document.querySelectorAll('.container_main')[2].style.position = 'absolute'
    document.querySelectorAll('.container_main')[2].style.top = '0'

    var userId
    const host = process.env.API_URL
    const url = host + '/saveData';
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
    var checkbox = document.getElementById("empty_subscribe_newsletter").checked;





    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ encryptString: encryptData(data) }),
        redirect: 'follow'
    };

    await fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            userId = data.id

        })
        .catch(error => {

        });

    //get Data
    const Geturl = host + `/leaderboard?userId=${userId}&gameId=1&gameType=${gameType}&source=website`
    const GetrequestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
   fetch(Geturl, GetrequestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async (data) => {


            const leaderboardContainer = document.querySelector('#screBoard');


            let leaderboardHTML = '';


            data.firstFiveRecords.forEach((item, index) => {
                // Get the rank and name for each leaderboard item
                const rank = item.rank;
                const name = `${item.firstName} ${item.lastName.split("")[0] ? item.lastName.split("")[0] : ""}`;

                // Generate the HTML structure for leaderboard item
                leaderboardHTML += `
                <div class="leaderboard_main_list ${(item.currentUser && rank < 6 ? 'leaderboard_active_light' : '')}  ${rank > 5 && "leaderboard_current_rank"} ${index === 0 ? ' leaderboard_active border_none' : ''}">
                  <div class="leaderboard_box">
                    <p class="leaderboard_name"><span class="intro_num">${rank > 99 ? "99+" : rank}</span> ${name}</p>
                    <p>${item.score} Pts</p>
                  </div>
                </div>
              `;
            });

            if (leaderboardHTML) {
                document.querySelector('#loader').style.display = "none"

            }
            // Replace the existing HTML structure with the new leaderboard HTML structure
            leaderboardContainer.innerHTML = `
            <a href="./" class="close"><img src="images/close-icon.svg"></a>
              <div class="game_box_heading">
                <h6>Leaderboard</h6>
              </div>
              <div class="game_box_table_content">
              ${leaderboardHTML}
              <div class="leaderboard_button playAgain">
                                <a  class="game_button w-100 playAgain">
                                    Return your Empties
                                </a>
                            </div>
                            <div class="leaderboard_button shop_now">
                            <a href="./" class="game_button w-100 shop btn_bg">Explore Our Beers</a>
                        </div>
             </div>
            `;
            leaderboardResoluton()
            const currentElement = document.querySelector('.leaderboard_active_light');
            const previousCurrentElement = currentElement.previousElementSibling;
            previousCurrentElement.classList.add('leaderboard_before_current_rank');




        })
        .catch(error => {

        });
 

    if (/iPhone|iPad|iPod/.test(navigator.userAgent) == true) {
    if (!/Safari/.test(navigator.userAgent) || /Chrome|CriOS/.test(navigator.userAgent)) {
        var returnBtn=setInterval(()=>{
            var closeBtns = document.querySelectorAll(".close, .playAgain");
            if(closeBtns.length==5){
                
                closeBtns.forEach((closeBtn) => {
                  
                    closeBtn.href = Baseurl
                   
                })
                var baseUrl = window.location.origin;
                var shopNowLink = document.querySelectorAll(".shop");
                shopNowLink.forEach((shopNowLink) => {
                    shopNowLink.href = baseUrl + "/beers"   
                    shopNowLink.setAttribute("target","_blank")
                })
                clearInterval(returnBtn)
            }
           
        },100)
       
    }

}
 
}

function leaderboardResoluton() {

    var closeBtn = document.querySelectorAll(".close, .playAgain");

    closeBtn.forEach((closeBtn,i) => {
        closeBtn.href = Baseurl
    })
    var baseUrl = window.location.origin;
    var shopNowLink = document.querySelectorAll(".shop");
    shopNowLink.forEach((shopNowLink) => {
        shopNowLink.href = baseUrl + "/beers"   
        shopNowLink.setAttribute("target","_blank")
    })

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) == true) {
        if (window.orientation === 0 && window.innerHeight > 600) {
            document.querySelector('#leaderboard .game_intro_box').style.top = "45%";
        }
        else {
            if (/CriOS/i.test(navigator.userAgent) == true) {
                document.querySelector('#leaderboard .game_intro_box').style.top = "45%";
            } else {
                document.querySelector('#leaderboard .game_intro_box').style.top = "40%";
            }
        }



    }

}

window.addEventListener('orientationchange', leaderboardResoluton)