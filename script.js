class Cadastro {
   constructor(nome, sobrenome, idade, email, sexo, senha) {
       this.nome = nome
       this.sobrenome = sobrenome
       this.idade = idade
       this.email = email
       this.sexo = sexo
       this.senha = senha
   }
}

let historicoCadastrados = {
   cadastrados: []
};

const title2 = document.getElementById("title2");

title2.style.display = 'none'

document.getElementById("Enviar").addEventListener('click', function (e) {
   e.preventDefault()

   const nome = document.getElementById("Nome").value
   const sobrenome = document.getElementById("Sobrenome").value
   const idade = Number(document.getElementById("Idade").value)
   const email = document.getElementById("Email").value
   const sexo = document.getElementById("Sexo").value
   const senha = document.getElementById("Senha").value

   let pessoa = new Cadastro(nome, sobrenome, idade, email, sexo, senha);

   historicoCadastrados.cadastrados.push(pessoa)

   mostraTela()
});

function mostraTela() {
   const sessao = document.getElementById("sessao-divs")
   sessao.innerHTML = ""

   historicoCadastrados.cadastrados.forEach((pessoa, contar) => {
       const registrador = document.createElement("div")
       const apagar = document.createElement("button")
       registrador.className = "registrador"
       apagar.className = "button-apagar"
       registrador.innerHTML = `
           <h2>Pessoa ${contar + 1}</h2>
           <p><h4>Nome:</h4> ${pessoa.nome}</p>
           <p><h4>Sobrenome:</h4>  ${pessoa.sobrenome}</p>
           <p><h4>Idade:</h4>  ${pessoa.idade}</p>
           <p><h4>Email:</h4>  ${pessoa.email}</p>
           <p><h4>Sexo:</h4>  ${pessoa.sexo}</p>
           <p><h4>Senha:</h4>  ${pessoa.senha}</p>`
       apagar.innerHTML = "Remover Cadastro";
       apagar.addEventListener('click', () => {
           apagarCadastro(contar);
       });
       registrador.appendChild(apagar)
       sessao.appendChild(registrador)
   });

   title2.style.display = 'block'
   console.log(`Total de Pessoas: ${historicoCadastrados.cadastrados.length}`)
   limpa()
}

function limpa() {
   const inputs = document.getElementsByClassName("input");
   for (let i = 0; i < inputs.length; i++) {
       inputs[i].value = ""
   }
}

function apagarCadastro(index) {
   historicoCadastrados.cadastrados.splice(index, 1);

   mostraTela();
   if (historicoCadastrados.cadastrados.length === 0) {
      title2.style.display = 'none'
   } else {
      title2.style.display = 'block'
   }
}
