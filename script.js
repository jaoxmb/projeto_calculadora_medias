const activities = [];
const form = document.querySelector("form");
const minNote = parseFloat(prompt("Qual é a nota miníma?"));

function calc_media(array) {
  const sum = array
    .reduce((p,c) => p + c);
  const media = (sum/activities.length).toFixed(1);

  return media;
}

function load_results() {
  const media = calc_media(activities.map((i) => i.note));
  const approved = media >= minNote;

  document.querySelector("#media")
    .innerHTML = `${media}`;

  document.querySelector("#approved")
    .innerHTML = 
      approved ? 
        `<span class="approved">Aprovado</span>` : 
        `<span class="disapproved">Reprovado</span>`;
}

function load_activities() {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";

  activities.map((activity) => {
    const {name, note, approved} = activity;

    tableBody.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${note}</td>
        <td>
        ${approved ? 
          `<img src="./images/aprovado.png" alt="Foi aprovado"/>` :
          `<img src="./images/reprovado.png" alt="Não foi aprovado"/>`
        }
        </td>
      </tr>
    `
  })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const note = parseInt(e.target[1].value);
  const activityExist = activities.map((i) => i.name).includes(name); 
  
  if (activityExist) {
    alert(`A atividade ${name} já existe!`);
  } else {
    activities.push({
      name: name,
      note: note,
      approved: note >= minNote
    })
    load_activities();
    load_results();
  }

  form.reset();
})