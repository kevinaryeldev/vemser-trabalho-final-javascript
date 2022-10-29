let url = "http://localhost:3001/vagas";
let isRecruiter = true;
let vagas = [];
window.addEventListener("load", () => requisicaoVagas());

async function requisicaoVagas() {
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => (vagas = data))
    .finally(mostrarVagas())
    .catch((err) => console.log(error));
}

function checkRecruiter(isRecruiter) {
  if (isRecruiter) {
    let container = document.getElementById("home-vaga-container-principal");
    let button = document.createElement("button");
    button.classList.add("button-cadastrar");
    button.innerText = "Cadastrar vaga";
    button.onclick = () => criarModalCriarVaga();
    container.appendChild(button);
  }
}

checkRecruiter(isRecruiter);

function registerVacancy() {
  window.location.href = "../pages/home/index.html";
}

function mostrarVagas() {
  let container = document.getElementById("home-vaga-container");
  if (vagas.length > 0) {
    vagas.forEach((el) => {
      container.innerHTML += `<div class="home-vaga">
            <p class="home-vaga-titulo">${el.title}</p>
            <p class="home-vaga-salario">${el.payment}</p>
            </div>`;
    });
  } else {
    container.innerHTML = `<div class="home-vaga home-vaga-vazia">
                <p class="home-vaga-titulo">Nenhuma vaga cadastrada</p>
            </div>`;
  }
}

checkRecruiter();

function criarModalCriarVaga() {
  let backdrop = document.createElement("div");
  backdrop.classList.add("home-modal-criar-vaga-backdrop");
  //
  let title = document.createElement("h2");
  title.classList.add("home-modal-criar-vaga-title");
  backdrop.appendChild(title);
  //
  let modalContainer = document.createElement("form");
  modalContainer.classList.add("home-modal-criar-vaga-container");
  backdrop.appendChild(modalContainer);
  backdrop.onclick = (event) =>
    destruirModalCriarVagaComClickAway(event, backdrop, modalContainer);
  modalContainer.onsubmit = (event, backdrop) => {
    event.preventDefault();
    criarVaga(event, backdrop);
  };
  //
  let labelTitle = document.createElement("label");
  labelTitle.innerText = "Título da vaga:";
  labelTitle.classList.add("home-modal-criar-vaga-input-label");
  modalContainer.appendChild(labelTitle);
  //
  let inputTitle = document.createElement("input");
  inputTitle.classList.add("home-modal-criar-vaga-input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("required", "");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("placeholder", "Exemplo: QA Jr");
  modalContainer.appendChild(inputTitle);
  //
  let labelDescription = document.createElement("label");
  labelDescription.innerText = "Descrição da vaga:";
  labelDescription.classList.add("home-modal-criar-vaga-input-label");
  modalContainer.appendChild(labelDescription);
  //
  let inputDescription = document.createElement("input");
  inputDescription.classList.add("home-modal-criar-vaga-input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("required", "");
  inputDescription.setAttribute("name", "description");
  inputDescription.setAttribute(
    "placeholder",
    "Exemplo: Automatizar testes..."
  );
  modalContainer.appendChild(inputDescription);
  //
  let labelPayment = document.createElement("label");
  labelPayment.innerText = "Remuneração inicial:";
  labelPayment.classList.add("home-modal-criar-vaga-input-label");
  modalContainer.appendChild(labelPayment);
  //
  let inputPayment = document.createElement("input");
  inputPayment.classList.add("home-modal-criar-vaga-input");
  inputPayment.setAttribute("type", "text");
  inputPayment.setAttribute("required", "");
  inputPayment.setAttribute("name", "payment");
  inputPayment.setAttribute("placeholder", "Exemplo: R$ 5000");
  modalContainer.appendChild(inputPayment);
  //
  let buttonRegister = document.createElement("button");
  buttonRegister.classList.add("home-modal-criar-vaga-button");
  buttonRegister.setAttribute("type", "submit");
  buttonRegister.innerText = "Cadastrar vaga";
  modalContainer.onsubmit = (event) => {
    event.preventDefault();
    criarVaga(event, backdrop);
  };
  modalContainer.appendChild(buttonRegister);
  //
  document.body.appendChild(backdrop);
}

function destruirModalCriarVaga(modal) {
  document.body.removeChild(modal);
}

function destruirModalCriarVagaComClickAway(e, modal, container) {
  if (e.target != container && e.target.parentNode != container) {
    document.body.removeChild(modal);
  }
}

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlY3J1dGFkb3JAZ21haWwuY29tIiwiaWF0IjoxNjY3MDA5NzMzLCJleHAiOjE2NjcwMTMzMzMsInN1YiI6IjQifQ.QJ0XpKTfnNcDin_naYvz3NcPl7WCm6m_tVAvLJzl8Os";

async function criarVaga(e, modal) {
  formData = new FormData(e.target).entries();
  data = Object.fromEntries(formData);
  data.candidatos = [];
  //    data.ownerID = localStorage.getItem('@trabalho-final-js-userID')
  try {
    axios
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  } finally {
    destruirModalCriarVaga(modal);
  }
}
