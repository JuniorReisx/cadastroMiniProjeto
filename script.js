class Cadastro {
   constructor(nome, CPF, idade, email, sexo, senha) {
       this.nome = nome;
       this.CPF = CPF;
       this.idade = idade;
       this.email = email;
       this.sexo = sexo;
       this.senha = senha;
   }
}

let historicoCadastrados = {
   cadastrados: []
};

const title2 = document.getElementById("title2");

title2.style.display = 'none';

document.getElementById("Enviar").addEventListener('click', function (para) {
   para.preventDefault();

   const nome = document.getElementById("Nome").value;
   const CPF = document.getElementById("CPF").value;
   const idade = Number(document.getElementById("Idade").value);
   const email = document.getElementById("Email").value;
   const sexo = document.getElementById("Sexo").value;
   const senha = document.getElementById("Senha").value;

   let pessoa = new Cadastro(nome, CPF, idade, email, sexo, senha);

   historicoCadastrados.cadastrados.push(pessoa);

   mostraTela();
});

function editando(index) {
   const pessoa = historicoCadastrados.cadastrados[index];

   const registrador = document.getElementsByClassName("registrador")[index];
   registrador.innerHTML = ""; // Clear the content

   // Create input fields for each property
   const nomeInput = createInputField("Nome", pessoa.nome);
   const CPFInput = createInputField("CPF", pessoa.CPF);
   const idadeInput = createInputField("Idade", pessoa.idade);
   const emailInput = createInputField("Email", pessoa.email);
   const sexoInput = createInputField("Sexo", pessoa.sexo);
   const senhaInput = createInputField("Senha", pessoa.senha);

   // Create a button to confirm the changes
   const confirmButton = document.createElement("button");
   confirmButton.innerHTML = "Confirmar Edição";
   confirmButton.addEventListener('click', () => {
       confirmEdicao(index);
   });

   // Append the input fields and confirm button to the registrador div
   registrador.appendChild(nomeInput);
   registrador.appendChild(CPFInput);
   registrador.appendChild(idadeInput);
   registrador.appendChild(emailInput);
   registrador.appendChild(sexoInput);
   registrador.appendChild(senhaInput);
   registrador.appendChild(confirmButton);
}

function createInputField(label, value) {
   const inputDiv = document.createElement("div");
   inputDiv.setAttribute("data-label", label); // Add data-label attribute
   const labelElement = document.createElement("label");
   labelElement.innerText = label;
   const inputElement = document.createElement("input");
   inputElement.value = value;
   inputDiv.appendChild(labelElement);
   inputDiv.appendChild(inputElement);
   return inputDiv;
}

function confirmEdicao(index) {
   const pessoa = historicoCadastrados.cadastrados[index];

   // Get the edited values from the dynamically created input fields
   const nome = document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="Nome"] input`).value;
   const CPF = document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="CPF"] input`).value;
   const idade = Number(document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="Idade"] input`).value);
   const email = document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="Email"] input`).value;
   const sexo = document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="Sexo"] input`).value;
   const senha = document.querySelector(`.registrador:nth-child(${index + 1}) [data-label="Senha"] input`).value;

   // Create a new Cadastro instance with the edited data and replace the existing one
   historicoCadastrados.cadastrados[index] = new Cadastro(nome, CPF, idade, email, sexo, senha);

   // Redraw the list with the updated information
   mostraTela();
}

function mostraTela() {
   const sessao = document.getElementById("sessao-divs");
   sessao.innerHTML = "";

   historicoCadastrados.cadastrados.forEach((pessoa, contar) => {
       const registrador = document.createElement("div");
       const apagar = document.createElement("button");
       const editar = document.createElement("button");
       editar.className = "editar";
       registrador.className = "registrador";
       apagar.className = "button-apagar";
       registrador.innerHTML = `
           <h2>Pessoa ${contar + 1}</h2>
           <p><h4>Nome Completo:</h4> ${pessoa.nome}</p>
           <p><h4>CPF:</h4>  ${pessoa.CPF}</p>
           <p><h4>Idade:</h4>  ${pessoa.idade}</p>
           <p><h4>Email:</h4>  ${pessoa.email}</p>
           <p><h4>Sexo:</h4>  ${pessoa.sexo}</p>
           <p><h4>Senha:</h4>  ${pessoa.senha}</p>`;
       editar.innerHTML = "Editar";
       editar.addEventListener('click', () => {
           editando(contar);
       });
       apagar.innerHTML = "Remover Cadastro";
       apagar.addEventListener('click', () => {
           apagarCadastro(contar);
       });
       registrador.appendChild(apagar);
       registrador.appendChild(editar);
       sessao.appendChild(registrador);
   });

   title2.style.display = 'block';
   console.log(`Total de Pessoas: ${historicoCadastrados.cadastrados.length}`);
   limpa();
}

function limpa() {
   const inputs = document.getElementsByClassName("input");
   for (let i = 0; i < inputs.length; i++) {
       inputs[i].value = "";
   }
}

function apagarCadastro(index) {
   historicoCadastrados.cadastrados.splice(index, 1);

   mostraTela();
   if (historicoCadastrados.cadastrados.length === 0) {
       title2.style.display = 'none';
   } else {
       title2.style.display = 'block';
   }
}
