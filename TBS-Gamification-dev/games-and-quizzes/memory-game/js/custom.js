
function preventZoomAndRefresh(event) {
    const isTouchMove = event.touches.length > 1;
    if (isTouchMove) {
        event.preventDefault();
    }
}
function encryptData(data) {  
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.SECRET,
      ).toString(); }

document.addEventListener('touchmove', preventZoomAndRefresh, { passive: false });
async function gameScript() {
    var host = process.env.API_URL+"/"
    var token = `Bearer ${process.env.API_KEY}`
    var level = 1
    var timer =60;
    var isMobile = window.innerWidth < 992 ? true : false
    var origin = window.location.origin
    var url = window.location.href
    var gamePlayed = false
    var queryString = url.split("?")[1]?.toLowerCase(); // Get the query string part
    var urlParams = new URLSearchParams(queryString);
    var gameType = urlParams.get("gametype");
    var gameOn = await GetApi('checkGameStatus?gameId=2')
    if (gameOn === false) {
        let Playbutton = document.querySelectorAll('#game_button, #howPlay')
        Playbutton.forEach((ele)=>{
            ele.style.pointerEvents = "none"
            ele.style.opacity = 0.6
            ele.textContent = "Not Available"
        })
        
    }
    gameType = gameType == "event" ? gameType : "archive"

    var closeBtn = document.querySelectorAll(".close, .playAgain");
    closeBtn.forEach((closeBtn) => {
        closeBtn.href = url
    })

    var totalScore = 0;

    if (gameType === "event") {
        let rule = document.querySelector('.rule_regulation')
        document.querySelector('#back').style.display="none"
        rule.style.display = "block"
        rule.addEventListener('click', () => {
           window.open(origin + "/giveaway-contest/", '_blank');
        })

    }
    //How To Play//
        
    document.getElementById("howtoplay").onclick = function(){
        document.querySelector('.memory_logo_box').style.display = 'none'
        document.querySelector('.how_to_play_intro').style.display = 'block'
        document.removeEventListener('touchmove', preventScroll, { passive: false });
    }

    //End How To Play//



    function preventScroll(event) {
        event.preventDefault();
      }
      document.addEventListener('touchmove', preventScroll, { passive: false });
// Disable zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
});

    // Attach event listener to the 'touchmove' event
 

    document.querySelector('#back a').addEventListener('click', (e) => {
        e.preventDefault()
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/games-and-quizzes/";
    });



    if (/iPhone/i.test(navigator.userAgent) == false) {
        var link = document.createElement("link");
        link.href = "css/android.css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
    }


    function documentHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        doc.style.setProperty('--doc-width', `${window.innerWidth}px`)
        adjust()
    }


    documentHeight()
    window.addEventListener('resize', documentHeight)

    window.addEventListener('orientationchange', () => gamePlayed == false && documentHeight())
  
    if (/iPhone|iPad|iPod/.test(navigator.userAgent) == true) {

        if (!/Safari/.test(navigator.userAgent) || /Chrome|CriOS/.test(navigator.userAgent)) {
            window.addEventListener('orientationchange', documentHeight);
        }
    
    }


    document.querySelectorAll('.container_main')[0].style.display = 'block'
    document.querySelectorAll('.container_main')[1].style.display = 'none'
    document.querySelectorAll('.container_main')[2].style.display = 'none'


    document.querySelector('#game_button').addEventListener('click', () => {
        playButtonClicked()
        
    })
    function preventScroll(event) {
        event.preventDefault();
      }
    document.querySelector('#howPlay').addEventListener('click', () => {
        playButtonClicked()
        
          document.addEventListener('touchmove', preventScroll, { passive: false });
       
    })
    function playButtonClicked(){
       
        document.querySelectorAll('.container_main')[0].style.display = 'none'
        document.querySelectorAll('.container_main')[1].style.display = 'block'
        document.querySelectorAll('.container_main')[2].style.display = 'none'
        gamePlayed = true
        if (gameOn)
            playGame()


    }

    function adjust() {
        let cloudImages = document.querySelectorAll('.cloud_img');
        let containerImages = document.querySelectorAll('.bgImg');
        let mainsection = document.querySelectorAll('.mainsection');
       
        for (let i = 0; i < containerImages.length; i++) {

            let mainHeight = 0;
            cloudImages[i].style.height = "";
            mainsection[i].style.height = "";
            var adjustCloude = setTimeout(() => {
                let cloudImages = document.querySelectorAll('.cloud_img');
                let containerImages = document.querySelectorAll('.bgImg');
                let mainsection = document.querySelectorAll('.mainsection');

                let containerHeight = containerImages[i].offsetHeight;

                let cloudHeight = cloudImages[i].offsetHeight;
                mainHeight = containerHeight - cloudHeight;
                cloudImages[i].style.height = ((cloudHeight - 120) / containerHeight) * 100 + '%';
                mainsection[i].style.height = ((mainHeight + 120) / containerHeight) * 100 + '%';
                mainsection[i].style.marginTop = "-10%";
                document.querySelector('.loaderOne').style.display = "none"
            }, 100)


        }
    }
    adjust()
    async function playGame() {
        //lock screen stop//
        // Disable zooming and refreshing on mobile and tablets by scrolling
        

        var data = await GetApi('memorygame/getcards')

        var hiddenCount = 0
        var beerMatches = [
            {
                "id": data[0].id,
                "beerMatches": 0
            },
            {
                "id": data[1].id,
                "beerMatches": 0
            },
            {
                "id": data[2].id,
                "beerMatches": 0
            },
            {
                "id": data[3].id,
                "beerMatches": 0
            },
            {
                "id": data[4].id,
                "beerMatches": 0
            },
            {
                "id": data[5].id,
                "beerMatches": 0
            }

        ]


        var objects = [
            { className: "coloured-glass", bin: data[0].id, img: data[0].imageUrl },
            { className: "alumunium-cans", bin: data[1].id, img: data[1].imageUrl },
            { className: "alumunium-cans", bin: data[2].id, img: data[2].imageUrl },
            { className: "clear-glass", bin: data[3].id, img: data[3].imageUrl },
            { className: "others-material", bin: data[4].id, img: data[4].imageUrl },
            { className: "others-material", bin: data[5].id, img: data[5].imageUrl },
        ];

        var selectedObject = 0;

        // Show the appropriate score board based on the device
        if (isMobile) {
            selectedObject = 1;
        } else {
            selectedObject = 0;
        }

        var gameLevel = document.querySelectorAll("#gameLevel")[selectedObject];

        var scoreValue = document.querySelectorAll("#score-value")[selectedObject];
        var timerValue = document.querySelectorAll("#timer-value")[selectedObject];
        timerValue.textContent = "1:00";

        let selected = []
        var boxes


        function startTiming() {
            fliper();
            setTimeout(() => {
                var myInterval = setInterval(() => {
             
                    if (timer == 1) {
                        if(gameType==="event")
                        document.querySelector('.thankYou').textContent="Thank you for playing our Memory Game.  Please complete the below details to be entered in our contest for a chance to win a $100 gift card to The Beer Store.  Plus for Ice cold deals, exciting contests, beer infused recipes and the latest on all-things beer, straight to your inbox. Sign up for our weekly newsletter today!"
                        document.querySelector('#memoryForm').style.display = 'block'
                        document.querySelector('.game_board_wrapper').style.zIndex=-1;
                        document.removeEventListener('touchmove', preventScroll, { passive: false });
                    }
                    if (timer == 0) {
                        removeClicking();
                        clearInterval(myInterval);
                        timerValue.classList.remove("scale-animation");

                    } else {
                        timer--;
                        if (timer < 10) {
                            timerValue.textContent = "00:" + "0" + timer;
                        } else {
                            timerValue.textContent = "00:" + timer;
                        }
                        if (timer < 11) {
                            timerValue.classList.add("scale-animation");
                        }
                        if (selectedObject == 1) {
                            document.querySelectorAll("#gameLevel")[0].textContent = document.querySelectorAll("#gameLevel")[selectedObject].textContent
                            document.querySelectorAll("#score-value")[0].textContent = document.querySelectorAll("#score-value")[selectedObject].textContent;
                            document.querySelectorAll("#timer-value")[0].textContent = document.querySelectorAll("#timer-value")[selectedObject].textContent;
                        }
                    }
                    if (hiddenCount == 6) {
                        clearInterval(myInterval);
                        removeAllObjects();
                        hiddenCount = 0;
                        totalScore = totalScore + 10
                        scoreValue.textContent = totalScore;
                        let position = {
                            left: window.innerWidth / 2,
                            top: window.innerHeight / 2,
                        };
                        setTimeout(() => {
                            popupAnimation(position, parseInt(10));
                        }, 500);

                        setTimeout(() => {
                            applyScaleAnimation();
                            createObject();
                            level = level + 1;
                            timerValue.classList.add("scale-animation");
                            scoreValue.classList.add("scale-animation");
                            setTimeout(() => {
                                timerValue.classList.remove("scale-animation");
                                scoreValue.classList.remove("scale-animation");
                            }, 500)

                            gameLevel.textContent = level;
                        }, 1500);
                    }
                }, 1000);
            }, 4000);
        }

        function speakNumber(number) {
            var speechSynthesis = window.speechSynthesis;

            // Create a SpeechSynthesisUtterance object and set the text to be spoken
            var utterance = new SpeechSynthesisUtterance(number);

            // Use the speech synthesis API to speak the utterance
            speechSynthesis.speak(utterance);
        }

        function removeAllObjects() {
            document.querySelectorAll('.card_container').forEach((ele) => {
                ele.remove()
            })
        }

        function fliper() {
            boxes = document.querySelectorAll('.card_container');
            boxes.forEach((ele, i) => {
                if (ele.className == "card_container") {

                    ele.classList.add('active')
                }
            })
            setTimeout(() => {
                document.querySelectorAll('.active').forEach((div) => {
                    div.classList.remove('active')
                })
            }, 3000)

        }
        function playSound() {
            var audio = document.getElementById("myAudioTwo");
            audio.volume = 0.1;
            audio.play();
           

        }
        function createObject() {
            var draggableItems = document.querySelector(".game_board_wrapper");
            draggableItems.innerHTML = ""; // Clear existing elements

            // Shuffle the objects array
            var shuffledObjects = shuffleArray([...shuffleArray(objects), ...shuffleArray(objects)]);

            for (i = 0; i < 12; i++) {
                var object = shuffledObjects[i];

                var cardContainer = document.createElement("div");
                cardContainer.setAttribute("data-box", object.bin);
                cardContainer.className = "card_container";

                var card = document.createElement("div");
                card.className = "card";

                var cardBack = document.createElement("div");
                cardBack.className = "card_back";

                var cardFront = document.createElement("div");
                cardFront.className = "card_front kort2";
                cardFront.style.backgroundImage = `url(${object.img})`;

                card.appendChild(cardBack);
                card.appendChild(cardFront);
                cardContainer.appendChild(card);
                if (cardContainer) {
                    document.querySelector('.loader').style.display = 'none'
                }
                draggableItems.appendChild(cardContainer);
            }
            startTiming();
            playOnClick();
        }

        function shuffleArray(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // Swap the current element with a random element within the remaining range
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;

                // Randomize the position of the current element within the remaining range
                var newPosition = Math.floor(Math.random() * currentIndex);
                array.splice(newPosition, 0, array.splice(currentIndex, 1)[0]);
            }

            return array;
        }

        createObject()



        function playOnClick() {
            var selectedElements = []
            boxes = document.querySelectorAll('.card_container');
            boxes.forEach((ele, i) => {

                ele.addEventListener('click', () => {

                    if (ele.className == "card_container") {
                        selected.push(ele.dataset.box)
                        selectedElements.push(ele)
                        ele.classList.add('active')
                        ele.onclick = function () {
                            // Your custom logic here
                            return false;
                        };
                        if (selected.length == 2) {
                            removeClicking()
                            if (selected[0] == selected[1]) {

                                hideBox(selectedElements)
                                beerMatches.forEach((ele, i) => {
                                    if (selectedElements[0].dataset.box == ele.id) {
                                        beerMatches[i].beerMatches += 1
                                    }
                                })


                            } else {
                                setTimeout(() => {
                                    document.querySelectorAll('.active').forEach((div) => {
                                        div.classList.remove('active')
                                    })
                                }, 1000)
                            }
                            selected = []
                            selectedElements = []
                        }
                    }
                })

            })
        }


        function removeClicking() {

            const elements = document.querySelectorAll('.card_container');

            elements.forEach(function (element) {
                element.style.pointerEvents = 'none';
            });

            // Enable pointer events after 2 seconds
            setTimeout(function () {
                elements.forEach(function (element) {
                    element.style.pointerEvents = 'auto';   
                });
            }, 1000);

        }


        function hideBox(data) {

            let position = {
                left: data[0].getBoundingClientRect().x,
                top: data[0].getBoundingClientRect().y
            }
            totalScore = totalScore + level
            scoreValue.innerText = totalScore
            hiddenCount += 1

            boxes.forEach((ele, i) => {
                data.forEach((dataBin, i) => {
                    if (ele == dataBin) {
                        setTimeout(() => {
                            popupAnimation(position, level)
                        }, 500)
                        setTimeout(() => {
                            ele.style.opacity = "0"
                        }, 1000)

                    }
                })

            })
        }



        function popupAnimation(position, score) {

            let bgColorOfPopup
            let borderColor

            bgColorOfPopup = "black"
            borderColor = "#ffff"
            // Create a new H1 tag
            popupAnimationTag = document.createElement("h1");
            popupAnimationTag.textContent = '+' + score;
            popupAnimationTag.classList.add('popupScore')
            document.body.appendChild(popupAnimationTag);

            // Set the initial position of the H1 tag
            popupAnimationTag.style.position = "absolute";
            popupAnimationTag.style.left = position.left + "px";
            popupAnimationTag.style.top = position.top + "px";

            popupAnimationTag.style.transform = "scale(3)";
            popupAnimationTag.style.backgroundColor = bgColorOfPopup
            popupAnimationTag.style.borderColor = borderColor
            // Define the animation using CSS keyframes
            playSound()
            const keyframes = `
      @keyframes popup {
        0% {
          transform: scale(4);
        }
        25% {
          transform: translate(-50%, -100%) scale(3);
        }
        50% {
            transform: translate(-50%, -100%) scale(2);
          }
          75% {
            transform: translate(-50%, -100%) scale(1);
          }
        100% {
          transform: translate(-50%, -150%) scale(0);
        }
      }
    `;

            // Add the animation to the stylesheet
            const style = document.createElement("style");
            style.textContent = keyframes;
            style.backgroundColor = "green"
            document.head.appendChild(style);

            // Start the animation
            popupAnimationTag.style.animation = "popup 1s ease-out";
            setTimeout(() => {
                popupAnimationTag.remove()
                document.querySelectorAll('.popupScore').forEach((ele) => {
                    ele.remove()
                })
            }, 500)

        }

        function applyScaleAnimation() {
            gameLevel.classList.add("scale-animation");

            setTimeout(function () {
                gameLevel.classList.remove("scale-animation");
            }, 500);
        }



        documentHeight()
       
        document.querySelectorAll('.tabs-nav li').forEach((ele, i) => {
            if (i == 0)
                ele.addEventListener('click', () => myFunction('tab-2'))
            else
                ele.addEventListener('click', () => myFunction('tab-1'))
        }
        )

        function myFunction(id) {
            document.getElementById(id).style.display = 'none'

            const activeElement = document.querySelectorAll('.tabs-nav li');

            if (id == 'tab-1') {
                var element = document.getElementById("tab-2");
                element.style.display = "block"

                if (element.style.display = "block") {

                    activeElement[0].classList.add("Show");
                    activeElement[1].classList.remove("Show");
                }
            }
            else {
                if (id == 'tab-2') {
                    var element = document.getElementById("tab-1");
                    element.style.display = "block"
                    if (element.style.display = "block") {
                        activeElement[1].classList.add("Show");
                        activeElement[0].classList.remove("Show");
                    }

                }
            }
        }

        function validateForm() {
            var fname = document.getElementById("fname").value.trim(); // Trim leading and trailing spaces
            var lname = document.getElementById("lname").value.trim();
            var email = document.getElementById("email").value.trim();
            var checkbox = document.getElementById("above_19").checked;

            var fnameError = document.getElementById("fnameError");
            var lnameError = document.getElementById("lnameError");
            var emailError = document.getElementById("emailError");
            var subscribe = document.getElementById("memory_subscribe_newsletter").checked;

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
            }else if (!/^[a-zA-Z\-]+$/.test(fname)) {
                fnameError.textContent = "First name should not contain special characters.";
              }
            

            if (!checkbox) {
                document.getElementById("above_19_error").textContent = "Please select the checkbox.";
            }

            if (subscribe||email.length) {
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
            var fname = document.getElementById("fname").value.trim();
            var lname = document.getElementById("lname").value.trim();
            var email = document.getElementById("email").value.trim();

            var subscribe = document.getElementById("memory_subscribe_newsletter").checked;
            let body = {
                firstName: fname,
                lastName: lname,
                email: email,
                score: totalScore,
                expireTime:moment().utc(0).unix() + 60,
                gameId: 2,
                Issubscribe: subscribe,
                tags: gameType==="event"?"MemoryGame-Event":"MemoryGame-Archive",
                source: "website",
                gameType: gameType,
                beerMatches: beerMatches
            }
            PostApi(body)
            document.querySelectorAll('.container_main')[0].style.display = 'none'
            document.querySelectorAll('.container_main')[1].style.display = 'none'

            document.querySelectorAll('#memoryForm')[0].style.display = 'none'
            document.querySelectorAll('.container_main')[2].style.display = 'block'
        }

        function validateEmail(email) {
            var re =  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
            return re.test(email);
          }
          


        document.querySelector('.submit').addEventListener('click', validateForm)

    }



    async function GetApi(path) {
        var myHeaders = new Headers();
     
        var url = host + path
        var data = []
        myHeaders.append("Authorization", token);



        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => data = result)


        return JSON.parse(data);
    }

    async function PostApi(body) {
        var myHeaders = new Headers();
        var url = host + 'saveData';

        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({encryptString:encryptData(body)}),
            redirect: 'follow'
        };

        await fetch(url, requestOptions)
            .then(response => response.text())
            .then(async (result) => {
                const { id } = JSON.parse(result)
                const data = GetApi(`leaderboard?userId=${id}&gameId=2&gameType=${gameType}&source=website`)
                data.then(res => {
                    const leaderboardContainer = document.querySelectorAll('#screBoard');

                    // Generate the HTML structure for leaderboard using the data

                    let leaderboardHTML = '';
                    let leaderboardHTMLTwo = '';
                    res.firstFiveRecords.forEach((item, index) => {
                        const rank = item.rank;
                        const name = item.firstName;
                        leaderboardHTML += `<div class="leaderboard_main_list ${(item.currentUser && rank < 6 ? 'leaderboard_current_rank' : '')}  ${rank > 5 && "leaderboard_current_rank"} ${index === 0 ? ' leaderboard_active border_none' : ''}">
                        <div class="leaderboard_box">
                          <p class="leaderboard_name"><span class="intro_num">${rank > 99 ? "99+" : rank}</span> ${name}</p>
                          <p> Score: ${item.score} Pts</p>
                        </div>
                      </div>`
                    })
                    leaderboardContainer[0].innerHTML = `
                
                    <div class="game_box_table_content">
                    ${leaderboardHTML}
                    
                   </div>
                  `;

                    res.gameBeerType.forEach((item, index) => {
                        var baseUrl = window.location.origin;
                        var shopNowLink = document.querySelectorAll(".shop");
                        shopNowLink.forEach((shopNowLink) => {
                            shopNowLink.href = baseUrl + "/beers"   
                            shopNowLink.setAttribute("target","_blank")
                        })

                        var beerStyle = item.beerTypeId;
                        var type = item.type
                        var urlWithStyle = `${baseUrl}/beers/?${type}[]=${beerStyle}`;
                        leaderboardHTMLTwo += `
                    <div class="leaderboard_main_list ${index == 0 && 'leaderboard_active'} border_none">
                    <div class="leaderboard_box">
                        <p class="leaderboard_name"><span class="intro_num">${index + 1}</span>${item.name}</p>
                        <p>${item.gameBeerMatch} matches<a target="_blank" href="${urlWithStyle}"><img src="images/link-expand.svg"></a></p>
                    </div>
                    </div>
                    `
                    })

                    if (leaderboardHTMLTwo) {
                        document.querySelector('.loaderTwo').style.display = "none"
                    }
                    leaderboardContainer[1].innerHTML = `
                
                    <div class="game_box_table_content">
                    ${leaderboardHTMLTwo}
                    
                   </div>
                  `;
                })

            }
            )

    }
}
setTimeout(() => {
    gameScript()
}, 1000)