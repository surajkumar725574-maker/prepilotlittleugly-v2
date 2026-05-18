const API_BASE = "https://prepilotlittleugly-v2.onrender.com/";

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="user-message">${message}</div>
    `;

    input.value = "";

    try {
        const response = await fetch("https://prepilotlittleugly-v2.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-message">${data.reply}</div>
        `;

    } catch (error) {
        console.error(error);

        chatBox.innerHTML += `
            <div class="bot-message">
                Backend connection failed.
            </div>
        `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
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