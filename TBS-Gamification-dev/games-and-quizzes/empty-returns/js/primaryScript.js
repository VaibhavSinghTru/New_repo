if (/iPhone/i.test(navigator.userAgent) == false) {
    var link = document.createElement("link");
    link.href = "css/android.css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}


var Baseurl = window.location.href
var queryString = Baseurl.split("?")[1]?.toLowerCase();
var urlParams = new URLSearchParams(queryString);
var gameType = urlParams.get("gametype");
gameType=gameType?gameType:"archive"


document.querySelector('#back a').addEventListener('click', (e) => {
    e.preventDefault()
    var baseURL = window.location.origin;
    window.location.href = baseURL + "/games-and-quizzes/";
});
if (gameType === "event") {
    document.querySelector('#back').style.display="none"
}

var notPlay=false

const host = process.env.API_URL
const url = host + '/checkGameStatus?gameId=1';
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${process.env.API_KEY}`);
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(url, requestOptions)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then( (data) => {
   notPlay=data
if(data==false){
let Playbutton =document.querySelector('#game_button')
  Playbutton.style.pointerEvents="none"
  Playbutton.style.opacity=0.6
  Playbutton.textContent="Not Available"
}
})
function preventScroll(event) {
    event.preventDefault();
}

var audio = document.getElementById("myAudio");


var closeDiv= document.querySelectorAll('.close')
closeDiv.forEach((ele)=>{
ele.addEventListener('click',()=>{ 
    location.reload();
})
})

document.addEventListener("visibilitychange", function () {
    if(parseInt(document.getElementById("timer-value").textContent)>0&&parseInt(document.getElementById("timer-value").textContent)<60)
    if (document.hidden) {
        audio.pause();
        
    } else {
        audio.play();
    
    }
});
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && parseInt(document.getElementById("timer-value").textContent) > 2) {
         //location.reload();
    }
}

var documentHeight = () => {
    var isAndroidTablet = /(android) ([\d.]+)/i.test(navigator.userAgent) && !/mobile/i.test(navigator.userAgent);
    setInterval(()=>{if (window.innerHeight === 1008&&isAndroidTablet) {
        var doc = document.documentElement;
        document.documentElement.style.height = '950px';
        document.body.style.height = '950px';

        doc.style.setProperty('--doc-height', `${950}px`);
        doc.style.setProperty('--doc-width', `${window.innerHeight - 70}px`);
      }},100)
    var divDocGame = document.querySelector('.bg_color_light')
    if (window.orientation,(window.orientation === 0 || window.orientation === 180) && (isAndroidTablet?screen.width:window.innerWidth) > 768 && (isAndroidTablet?screen.width:window.innerWidth) < 1365 && (parseInt(document.getElementById("timer-value").textContent) > 0)) {
      
        var bgColor = document.querySelectorAll('.bg_color')
      
        bgColor.forEach((ele, i) => {
            ele.style.height = '100vw';
            ele.style.width = '100vh';
        })

    }
   
    if ((window.orientation === 0 || window.orientation === 180) && (window.innerHeight )> 500) {

        var divDoc = document.querySelectorAll('.play_container')
        if (/iPhone/i.test(userAgent) == true) {
            divDoc.forEach((ele) => {
                ele.style.position = 'absolute'
                ele.style.right = '0px'
                ele.style.left = '-100px'

            })

            intro.style.position = "absolute";
            intro.style.left = "-100px"
            intro.style.right = '0px'
            intro.style.top = '50%'
            document.querySelector('body').style.overflow = "hidden"
            divDocGame.style.position = "relative"

            divDocGame.style.right = '50px'



        }
        else {
            divDoc.forEach((ele, i) => {

                ele.style.position = 'absolute'
                ele.style.right = '0px'
                ele.style.left = '-50px'


            })
            intro.style.position = "absolute";
            intro.style.left = "-50px"
            intro.style.right = '0px'
            intro.style.top = '50%'
        }

        var doc = document.documentElement
        if (window.innerHeight === 1008) {
            document.documentElement.style.height = '950px';
            document.body.style.height = '950px';
          }
          
        doc.style.setProperty('--doc-height', `${window.innerWidth}px`)
        doc.style.setProperty('--doc-width', `${window.innerHeight - 70}px`)
        if(window.orientation === 180&&isAndroidTablet)
        {  if (screen.orientation.angle === 180) {
            // Request changing the orientation to 0 degrees (portrait)
            screen.orientation.lock('landscape')
              .then(function() {
                // Orientation change succeeded

              })
              .catch(function(error) {
                // Orientation change failed
              });
          }
          doc.style.setProperty('--doc-height', `${950}px`)
        doc.style.setProperty('--doc-width', `${window.innerHeight - 70}px`)
        }
       
        
    } else {
     
        var bgColor = document.querySelectorAll('.bg_color')
        bgColor.forEach((ele, i) => {
            if (ele.style.width == '100vh') {
                ele.style.height = isAndroidTablet?'86vh':'100vh';
                ele.style.width = '100vw';
            }
        })
        var divDoc = document.querySelectorAll('.play_container')
        if (/iPhone/i.test(userAgent) == true) {
            divDoc.forEach((ele) => {

                if (ele.style.position == 'absolute') {
                    ele.style.right = '0px'
                    ele.style.left = '0px'
                }
                if (intro.style.position == "absolute") {
                    intro.style.position = "absolute";
                    intro.style.left = "0px"
                    intro.style.right = '0px'
                    intro.style.top = '50%'
                }
            })

            if (divDocGame.style.position == 'relative' && window.innerHeight < 600) {
                divDocGame.style.right = '0px'

            }

        } else {
            divDoc.forEach((ele, i) => {
                if (ele.style.position == 'absolute') {
                    ele.style.right = '0px'
                    ele.style.left = '0px'
                }
            })
            if (intro.style.position == "absolute") {
                intro.style.position = "absolute";
                intro.style.left = "0px"
                intro.style.right = '0px'
                intro.style.top = '50%'
            }
        }
        var doc = document.documentElement;
        if (window.innerHeight === 1008) {
            document.documentElement.style.height = '950px';
            document.body.style.height = '950px';
          }
          
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        doc.style.setProperty('--doc-width', `${window.innerWidth}px`)
    }


}
window.addEventListener('resize', documentHeight)
var userAgent = navigator.userAgent;

document.querySelectorAll('.container_main')[1].style.display = 'none'
document.querySelectorAll('.container_main')[2].style.display = 'none'
function getOppositeOrientation() {
    return screen.orientation.type.startsWith("portrait") ? "landscape" : "portrait";
}

async function rotate(lockButton) {
    var isAndroidTablet = /(android) ([\d.]+)/i.test(navigator.userAgent) && !/mobile/i.test(navigator.userAgent);
    const oppositeOrientation = screen.orientation.type.startsWith("portrait")
        ? "landscape"
        : "portrait";

    try {
        await screen.orientation.lock('portrait');
        log.textContent = `Locked to ${oppositeOrientation}\n`;
        alert(`Locked to ${oppositeOrientation}\n`);
    } catch (error) {
        // Handle error
    }

    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // For WebKit-based browsers
            document.webkitExitFullscreen();
        }
    } else {
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) { // For Firefox
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) { // For Chrome and Safari
            el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (el.msRequestFullscreen) { // For IE/Edge
            el.msRequestFullscreen();
        }
    }
}


if (/iPhone|iPad|iPod/.test(navigator.userAgent) == true) {
    if (!/Safari/.test(navigator.userAgent) || /Chrome|CriOS/.test(navigator.userAgent)) {
        window.addEventListener('orientationchange', documentHeight);
    }

}

document.querySelectorAll('.playgame').forEach((ele) => ele.addEventListener('click', () => {
    notPlay=true
    document.getElementById('myAudio').play()
    setTimeout(() => {
        document.getElementById('myAudio').pause()
       
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
       
    }, 63000)
    document.querySelectorAll('.container_main')[1].style.display = 'block'
    document.querySelectorAll('.container_main')[0].style.display = 'none'
    document.querySelector('#intro').style.display = 'none'

    rotate()
   if(notPlay){
    
    var scriptUrl = 'dist/secondary.bundle.js?' + Math.random() * 40000;
    var scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    document.head.appendChild(scriptElement);
   }
   else  if(notPlay==false){
    window.location.reload()
   }

}))
documentHeight()

document.querySelector("#howtoplay").addEventListener("click", function () {
    document.querySelector(".play_container").style.display = "none";

    document.querySelector(".bgImg").style.display = "none";
    document.querySelector("#intro").style.display = "block";
    document.querySelector(".cloud_img").style.display = "none";
});
