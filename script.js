const hearts = document.getElementById("hearts");

function spawnHeart(){
  const h=document.createElement("div");
  h.className="float-heart";
  h.textContent=["♡","♥","✦","✧"][Math.floor(Math.random()*4)];
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(12+Math.random()*22)+"px";
  h.style.animationDuration=(5+Math.random()*6)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),12000);
}
function spawnHearts(n=5){for(let i=0;i<n;i++)setTimeout(spawnHeart,i*150)}
setInterval(spawnHeart,900);

const gateDate=document.getElementById("gateDate");
const gateNames=document.getElementById("gateNames");
const main=document.getElementById("main");

// PAGE 1 — December 2023 calendar
const calendarDays=document.getElementById("calendarDays");
const dateHint=document.getElementById("dateHint");
const dateContinue=document.getElementById("dateContinue");

// December 1, 2023 was Friday (Sunday-first calendar => index 5).
const firstDay=5;
const daysInMonth=31;

for(let i=0;i<firstDay;i++){
  const empty=document.createElement("span");
  empty.className="empty";
  calendarDays.appendChild(empty);
}

for(let day=1;day<=daysInMonth;day++){
  const button=document.createElement("button");
  button.type="button";
  button.textContent=day;
  button.setAttribute("aria-label",`December ${day}, 2023`);

  button.addEventListener("click",()=>{
    document.querySelectorAll("#calendarDays button").forEach(b=>b.classList.remove("selected","correct"));

    if(day===3){
      button.classList.add("selected","correct");
      dateHint.textContent="December 3, 2023 — that's our date. ♡";
      dateHint.classList.add("good");
      dateContinue.disabled=false;
      spawnHearts(7);
    }else{
      button.classList.add("selected");
      dateHint.textContent="Not that one, baebieee. Try again. ♡";
      dateHint.classList.remove("good");
      dateContinue.disabled=true;
    }
  });

  calendarDays.appendChild(button);
}

dateContinue.addEventListener("click",()=>{
  gateDate.classList.add("leaving");
  setTimeout(()=>{
    gateDate.style.display="none";
    gateNames.style.display="grid";
    gateNames.classList.remove("leaving");
    const input=document.getElementById("nicknameInput");
    setTimeout(()=>input.focus(),100);
    window.scrollTo({top:0,behavior:"instant"});
    spawnHearts(10);
  },650);
});

// PAGE 2 — free text input; no choices.
const nicknameInput=document.getElementById("nicknameInput");
const namesContinue=document.getElementById("namesContinue");
const nameHint=document.getElementById("nameHint");

nicknameInput.addEventListener("input",()=>{
  const value=nicknameInput.value.trim();
  namesContinue.disabled=value.length===0;

  if(value.length===0){
    nameHint.textContent="Type our special name for each other ♡";
    nameHint.classList.remove("good");
  }else{
    nameHint.textContent=`"${value}" — yep, that's ours. ♡`;
    nameHint.classList.add("good");
  }
});

nicknameInput.addEventListener("keydown",(event)=>{
  if(event.key==="Enter" && nicknameInput.value.trim()){
    namesContinue.click();
  }
});

namesContinue.addEventListener("click",()=>{
  if(!nicknameInput.value.trim()) return;

  gateNames.classList.add("leaving");
  setTimeout(()=>{
    gateNames.style.display="none";
    main.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"instant"});
    document.querySelectorAll("#main .reveal").forEach(el=>observer.observe(el));
    spawnHearts(15);
  },650);
});

// Scroll reveals
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});

document.querySelectorAll("#main .reveal").forEach(el=>observer.observe(el));

// Flip cards
document.querySelectorAll(".flip-card").forEach(card=>{
  card.addEventListener("click",()=>{
    card.classList.toggle("flipped");
    spawnHearts(3);
  });
});

// Reasons
const reasons=[
  "I love your smile. It can make an ordinary moment feel special. ♡",
  "I love how you became such an important part of my life.",
  "I love the little moments we share, even when they seem simple.",
  "I love that our story started online but became something real.",
  "I love being able to call you my baebieee. ❤️",
  "I love the memories we've already made—and the ones we haven't made yet.",
  "I love you simply because you're you. No complicated reason needed. ♡",
  "And honestly… I could keep going forever."
];
let reasonIndex=0;

document.getElementById("heartBtn").addEventListener("click",()=>{
  const btn=document.getElementById("heartBtn");
  const text=document.getElementById("reasonText");
  const count=document.getElementById("reasonCount");

  btn.style.transform="rotate(-45deg) scale(1.13)";
  setTimeout(()=>btn.style.transform="rotate(-45deg) scale(1)",180);

  text.style.opacity=0;
  setTimeout(()=>{
    text.textContent=reasons[reasonIndex % reasons.length];
    reasonIndex++;
    count.textContent=Math.min(reasonIndex,reasons.length);
    text.style.opacity=1;
  },180);
  spawnHearts(5);
});

// Letter
const envelopeBtn=document.getElementById("envelopeBtn");
envelopeBtn.addEventListener("click",()=>{
  envelopeBtn.classList.toggle("open");
  document.getElementById("letterCard").classList.toggle("show");
  if(envelopeBtn.classList.contains("open")) spawnHearts(12);
});

// Photo lightbox
document.querySelectorAll(".photo-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const img=card.querySelector("img");
    document.getElementById("lightboxImg").src=img.src;
    document.getElementById("lightboxCaption").textContent=card.dataset.caption||"";
    document.getElementById("lightbox").classList.add("show");
    document.getElementById("lightbox").setAttribute("aria-hidden","false");
  });
});

function closeLightbox(){
  document.getElementById("lightbox").classList.remove("show");
  document.getElementById("lightbox").setAttribute("aria-hidden","true");
}
document.getElementById("closeLightbox").addEventListener("click",closeLightbox);
document.getElementById("lightbox").addEventListener("click",event=>{
  if(event.target.id==="lightbox") closeLightbox();
});

// Final surprise
document.getElementById("fireworkBtn").addEventListener("click",()=>{
  for(let i=0;i<90;i++){
    setTimeout(()=>{
      const h=document.createElement("div");
      h.className="float-heart";
      h.textContent=["♥","♡","✦","✧","❤"][Math.floor(Math.random()*5)];
      h.style.left=(25+Math.random()*50)+"vw";
      h.style.bottom=(15+Math.random()*45)+"vh";
      h.style.fontSize=(12+Math.random()*25)+"px";
      h.style.animationDuration=(1.5+Math.random()*2.5)+"s";
      hearts.appendChild(h);
      setTimeout(()=>h.remove(),4500);
    },i*22);
  }
});
