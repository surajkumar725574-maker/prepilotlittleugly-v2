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
async function generatePlan() {

    const input = document.getElementById("topic-input");
    const output = document.getElementById("plan-output");

    const topic = input.value.trim();

    if (!topic) {
        alert("Please enter a topic");
        return;
    }

    output.innerHTML = "Generating study plan...";

    try {

        const response = await fetch(
            "https://prepilotlittleugly-v2.onrender.com/generate-plan",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topic: topic
                })
            }
        );

        const data = await response.json();

        output.innerHTML = `
            <div class="bot-message">
                ${data.result}
            </div>
        `;

    } catch (error) {

        console.log(error);

        output.innerHTML = `
            <div class="bot-message">
                Failed to generate study plan.
            </div>
        `;
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
function uploadNotes() {
  const fileInput = document.getElementById("notesFile");
  const notesList = document.getElementById("notesList");
  const message = document.getElementById("notesMessage");

  if (!fileInput || !notesList) return;

  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${file.name}</span>
    <button onclick="removeItem(this)">Remove</button>
  `;

  notesList.appendChild(li);

  message.innerText = "Notes uploaded successfully.";
  fileInput.value = "";
}

function createAssignment() {
  const title = document.getElementById("assignmentTitle");
  const details = document.getElementById("assignmentDetails");
  const list = document.getElementById("assignmentList");

  if (!title || !details || !list) return;

  if (title.value.trim() === "" || details.value.trim() === "") {
    alert("Please enter assignment title and details.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <div>
      <strong>${title.value}</strong>
      <p>${details.value}</p>
    </div>
    <button onclick="removeItem(this)">Remove</button>
  `;

  list.appendChild(li);

  title.value = "";
  details.value = "";
}

function addStudyMaterial() {
  const title = document.getElementById("materialTitle");
  const link = document.getElementById("materialLink");
  const list = document.getElementById("materialList");

  if (!title || !link || !list) return;

  if (title.value.trim() === "" || link.value.trim() === "") {
    alert("Please enter material title and link/topic.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <div>
      <strong>${title.value}</strong>
      <p>${link.value}</p>
    </div>
    <button onclick="removeItem(this)">Remove</button>
  `;

  list.appendChild(li);

  title.value = "";
  link.value = "";
}

function removeItem(button) {
  button.parentElement.remove();
}