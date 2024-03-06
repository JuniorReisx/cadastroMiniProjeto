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

