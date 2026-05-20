const formularioCadastro = document.getElementById("formulario-cadastro-usuario");
const formularioLogin = document.getElementById("formulario-login");

if (formularioCadastro) {

    formularioCadastro.addEventListener("submit", function(event) {

        event.preventDefault();
    
        const nome = document.getElementById("nome").value;
        const sobrenome = document.getElementById("sobrenome").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const dataDeNascimento = document.getElementById("datadenascimento").value;

        const dadosDeCadastro = {nome, sobrenome, telefone, email, senha, dataDeNascimento};
        localStorage.setItem("usuarioCadastro", JSON.stringify(dadosDeCadastro));

        alert("Cadastro realizado com sucesso!");

        window.location.href = "login/tela-login.html";

    });

}

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailLogin = document.getElementById("email-login").value;
        const senhaLogin = document.getElementById("senha-login").value;
        const dadosSalvos = JSON.parse(localStorage.getItem("usuarioCadastro"));

        if (!dadosSalvos) {

            alert("Nenhum usuário cadastrado!");

            return;

        }

        if (emailLogin == dadosSalvos.email && senhaLogin == dadosSalvos.senha) {

            alert("Login realizado!");

            window.location.href = "../pagina-inicial/pagina-inicial.html";

        } else {

            alert("Usuário ou senha incorretos!");

        }

    });

}