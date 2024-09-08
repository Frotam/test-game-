let startgame = document.querySelector(".startgame");
let sec = document.querySelector(".maing");
let startingphase = document.querySelector(".startingphase");
let body = document.querySelector("body");
let playerh = document.querySelector(".playerh");
let enemh = document.querySelector(".enemh");
let rules = document.querySelector(".rules");
let closerules = document.querySelector(".closerules");
let Playagain = document.querySelector(".Playagain");

closerules.addEventListener("click", () => {
  rules.style.display = "none";
});

// starts the game
startgame.addEventListener("click", (e) => {
  sartinggame(1)
});

let sartinggame=(value)=>{
  if(value===1)startingphase.style.display = "none";
  else  endgamediv.style.display = "none";
  sec.style.display = "block";
  document.body.style.background = "darkolivegreen";

  let startaud = new Audio("./fight-deep-voice-172194.mp3");
  startaud.volume = 1;
  startaud.play().catch((error) => {
    console.log("Autoplay was prevented for startaud:", error);
  });

  setTimeout(() => {
    const song = document.getElementById("song");
    song.volume = 0.2;
    song.play().catch((error) => {
      console.log("Autoplay was prevented for song:", error);
    });
  }, 1000);
  setTimeout(() => {
    rules.style.display = "none";
  }, 10000);

}
let playerHealth = 100;
let enemyHelth = 100;

let healthup = (player, enemie) => {
  let pbar = document.querySelector(".pbar");
  let ebar = document.querySelector(".ebar");
  if(player<=0)callendgame(0)
  else if(enemie<=0)callendgame(1)
  else{
  
    playerh.innerHTML = `${player}% `;
    enemh.innerHTML = `${enemie}% `;
    pbar.style.width = `${player}% `;
    ebar.style.width = `${enemie}% `;
  }
 
};

let playerhits = 0;
let enemyhts = 0;
let criticalhitcount = 0;
let loghistory = [];
let reset=()=>{
  playerhits = 0;
  enemyhts = 0;
  criticalhitcount = 0;
  loghistory = [];
  playerHealth = 100;
  enemyHelth = 100;
  healthup(playerHealth,enemyHelth)
  criticalhiting(criticalhitcount)
  heathcount=1
  healcc()
  console.log()

}

let headbtn = document.querySelector(".headbtn");
let critbutton = document.querySelector(".critbutton");

headbtn.addEventListener("click", () => {
  let pdamage = Math.floor(Math.random() * 5) + 1;
  let edamage = Math.floor(Math.random() * 7) + 1;
  if (playerHealth <= 0) {
    //0 for player lose
    callendgame(0); // not created yet
  } else if (enemyHelth <= 0) {
    // 1 for player win
    callendgame(1);
  } else {
    playerHealth -= edamage;
    enemyHelth -= pdamage;
    let audio = new Audio("/punch-140236.mp3");
    audio.play();
    let value = `Player got ${edamage} % damage by eneime and enime got ${pdamage}`;
    loghistory.push(value);
    // playerminus(edamage)//to make
    // enemyminus(pdamage)// to make
    playerhits++;
    enemyhts++;
    healthup(playerHealth, enemyHelth);
    console.log(playerhits);

    if (playerhits % 3 === 0) {
      criticalhitcount++;
      console.log(criticalhitcount, "hi");
      criticalhiting(criticalhitcount);
    }
  }
});

critbutton.addEventListener("click", () => {
  console.log("working");
  console.log(criticalhitcount);

  if (criticalhitcount >= 3) {
    if (playerHealth < 10 || playerHealth <= 100) {
       let pdamage=Math.floor(Math.random() * (20 - 10 + 1)) + 15;
      enemyHelth -= pdamage
     
      let audio = new Audio("./swords-collide-230574.mp3");
      audio.play();
      //   enemyminus(pdamage)// to make
      healthup(playerHealth, enemyHelth);
      let value = `Player played clitical hit and gave ${pdamage} % damage`;
      loghistory.push(value);
      console.log(loghistory)
      criticalhitcount = 0;
      criticalhiting(criticalhitcount);
      if (enemyHelth <= 0) {
       
        callendgame(1);
      }
    }
    }
    else{
      rulechanger("Your critcal hit is not ready yet")
    }
  
});

let hit1 = document.querySelector(".hit1");
let hit2 = document.querySelector(".hit2");
let hit3 = document.querySelector(".hit3");

let criticalhiting = (value) => {
  switch (value) {
    case 0:
      hit1.style.background = "white";
      hit2.style.background = "white";
      hit3.style.background = "white";
      break;
    case 1:
      hit1.style.background = "red";
      hit2.style.background = "white";
      hit3.style.background = "white";
      break;
    case 2:
      hit1.style.background = "red";
      hit2.style.background = "red";
      hit3.style.background = "white";
      break;
    case 3:
      hit1.style.background = "red";
      hit2.style.background = "red";
      hit3.style.background = "red";
      break;

    default:
      break;
  }
};

let healc = document.querySelector(".Heals");

let healbtn = document.querySelector(".healbtn");
let heathcount = 1;
healbtn.addEventListener("click", () => {
  console.log(heathcount);
  if (heathcount === 1) {
    if (playerHealth < 100 && playerHealth > 90) {
      playerHealth = 100;
      heathcount = 0;
      healthup(playerHealth, enemyHelth);
      healcc();
    } else if (playerHealth < 90 && playerHealth > 70) {
      playerHealth += 20;
      heathcount = 0;
      healthup(playerHealth, enemyHelth);
      healcc();
    } else if (playerHealth < 70) {
      playerHealth += 25;
      heathcount = 0;
      healthup(playerHealth, enemyHelth);
      healcc();
    }
  } else if (heathcount === 0) {
    console.log("heh");
    rulechanger(" No heath is left <br> find special combo to get one more");
  }
});
let healcc = () => {
  healc.innerHTML = heathcount;
};

let rulechanger = (value) => {
  rules.style.display = "block";
  rules.innerHTML = value;
  setTimeout(() => {
    rules.style.display = "none";
  }, 2000);
};

let endgamediv = document.querySelector(".endgamediv");
let endheading = document.querySelector(".endheading");


let callendgame = (value) => {
  endgamediv.style.display = "block";
  sec.style.display = "none";
  if (value == 1) {
    endheading.innerHTML="Congratulations, <br> you have defeated the end boss";
  } else {
    endheading.innerHTML="Game over";
  }
};
let endbtn = document.querySelector(".endbtn");
let looog = document.querySelector(".looog");

// Show the log history when endbtn is clicked
endbtn.addEventListener("click", () => {
  looog.style.display = "block";
  looog.innerHTML = ""; // Clear previous content before appending new content
  looog.style.marginTop='100px'
  
  let btn=document.createElement("button")
  btn.className="xbutton";
  btn.innerHTML="Close"
  btn.style.color="white"

  btn.style.width="150px"
  btn.style.height="50px"
  btn.style.marginTop="90px"
  btn.style.backgroundColor="red"

  
  looog.appendChild(btn)
  btn.addEventListener("click", () => {
    looog.style.display = "none";
  });
  loghistory.map((element) => {
    let elem = document.createElement("p"); // Correctly create <p> elements
    elem.textContent = element; // Set the text content of <p> elements
    looog.appendChild(elem); // Append <p> elements to .looog
  });
});

// let xbutton = document.querySelector(".xbutton");


// Hide the log history when xbutton is clicked

Playagain.addEventListener("click",()=>{
  sartinggame(0)
  reset()
})