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
   const idade = document.getElementById("Idade").value;
   const email = document.getElementById("Email").value;
   const sexo = document.getElementById("Sexo").value;
   const senha = document.getElementById("Senha").value;

   let pessoa = new Cadastro(nome, CPF, idade, email, sexo, senha);

   historicoCadastrados.cadastrados.push(pessoa);

   mostraTela();
});

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
           inputar(contar, registrador);
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
   
}

function apagarCadastro(dado) {
   historicoCadastrados.cadastrados.splice(dado, 1);

   mostraTela();
   if (historicoCadastrados.cadastrados.length === 0) {
       title2.style.display = 'none';
   } else {
       title2.style.display = 'block';
   }
}

function inputar(contador, registrador) {
   let inputnome = document.createElement('input');
   registrador.appendChild(inputnome);
   inputnome.value = historicoCadastrados.cadastrados[contador].nome;
   inputnome.className = 'inputsEdit'
   inputnome.placeholder = "Nome";
   let inputCPF = document.createElement('input');
   registrador.appendChild(inputCPF);
   inputCPF.value = historicoCadastrados.cadastrados[contador].CPF;
   inputCPF.className = 'inputsEdit'
   inputCPF.placeholder = "CPF";
   let inputidade = document.createElement('input');
   registrador.appendChild(inputidade);
   inputidade.value = historicoCadastrados.cadastrados[contador].idade;
   inputidade.className = 'inputsEdit'
   inputidade.placeholder = "Idade";
   let inputemail = document.createElement('input');
   registrador.appendChild(inputemail);
   inputemail.value = historicoCadastrados.cadastrados[contador].email;
   inputemail.className = 'inputsEdit'
   inputemail.placeholder = "Email";
   let inputsexo = document.createElement('input');
   registrador.appendChild(inputsexo);
   inputsexo.value = historicoCadastrados.cadastrados[contador].sexo;
   inputsexo.className = 'inputsEdit'
   inputsexo.placeholder = "Sexo";
   let inputsenha = document.createElement('input');
   registrador.appendChild(inputsenha);
   inputsenha.value = historicoCadastrados.cadastrados[contador].senha;
   inputsenha.className = 'inputsEdit'
   inputsenha.placeholder = "Senha";

   let atualizar = document.createElement('button');
   atualizar.className = 'botaoAtualizar'
   registrador.appendChild(atualizar);
   atualizar.innerHTML = 'Atualizar';
   atualizar.addEventListener('click', () => {
       editando(contador, inputnome, inputCPF, inputidade, inputemail, inputsexo, inputsenha);
   });
}

function editando(contador, inputnome, inputCPF, inputidade, inputemail, inputsexo, inputsenha) {
   const pessoa = historicoCadastrados.cadastrados[contador];

   pessoa.nome = inputnome.value;
   pessoa.CPF = inputCPF.value;
   pessoa.idade = inputidade.value;
   pessoa.email = inputemail.value;
   pessoa.sexo = inputsexo.value;
   pessoa.senha = inputsenha.value;

   mostraTela();
}
