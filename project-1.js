const API_BASE = "https://prepilotlittleugly-v2.onrender.com/";

async function sendMessage(){
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if(!input || !chatBox) return;

  const message = input.value.trim();

  if(message === ""){
    alert("Please type something.");
    return;
  }

  addMessage(message, "user-message");
  input.value = "";

  const loading = addMessage("Thinking...", "bot-message");

  try{
    const response = await fetch(`${API_BASE}/api/chat`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:message
      })
    });

    const data = await response.json();

    loading.innerText = data.reply || "No response received.";

  }catch(error){
    loading.innerText = "Could not connect to AI backend.";
    console.log(error);
  }
}

function addMessage(text, className){
  const chatBox = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.className = className;
  div.innerText = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  return div;
}

async function generatePlan(){
  const input = document.getElementById("topic-input");
  const output = document.getElementById("plan-output");

  if(!input || !output) return;

  const topic = input.value.trim();

  if(topic === ""){
    alert("Please enter a topic.");
    return;
  }

  output.innerText = "Generating study plan...";

  try{
    const response = await fetch(`${API_BASE}/generate-plan`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        topic:topic
      })
    });

    const data = await response.json();

    output.innerText = data.result || "No plan received.";

  }catch(error){
    output.innerText = "Backend connection failed.";
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const subjectCards = document.querySelectorAll(".subject-card");

  subjectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const input = document.getElementById("user-input");

      if(input){
        input.value = "Explain " + card.innerText + " in simple words";
        sendMessage();
      }
    });
  });
});