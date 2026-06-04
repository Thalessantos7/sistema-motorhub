const formularioCadastroUsuario = document.getElementById("formulario-cadastro-usuario")
const formularioCadastroOficina = document.getElementById("formulario-cadastro-oficina")
const formularioLogin = document.getElementById("formulario-login")
const botaoSair = document.querySelector(".botao-sair")
const campoSenha = document.getElementById("senha")
const botaoMostrarSenha = document.getElementById("mostrarSenha")

const Storage = {

    getUsuarios() {

        return JSON.parse(localStorage.getItem("usuarios")) || []

    },

    salvarUsuario(usuario) {

        const usuarios = this.getUsuarios()
        const jaExiste = usuarios.find(u => u.email === usuario.email)

        if (jaExiste) {

            return { sucesso: false, mensagem: "E-mail já cadastrado" }

        }

        usuarios.push(usuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        
        return { sucesso: true }

    },

    buscarPorEmail(email) {

        return this.getUsuarios().find(u => u.email === email) || null

    },

    salvarSessao(usuario, lembrar = false) {

        const sessao = {

            nome: usuario.nome || usuario.nomeOficina,
            email: usuario.email,
            tipoConta: usuario.tipoConta,

        }

        const dados = JSON.stringify(sessao)

        if (lembrar) {

            localStorage.setItem("sessaoAtiva", dados)

        } else {

            sessionStorage.setItem("sessaoAtiva", dados)

        }

    },

    getSessao() {

        return JSON.parse(localStorage.getItem("sessaoAtiva")) || JSON.parse(sessionStorage.getItem("sessaoAtiva"))

    },

    encerrarSessao() {

        localStorage.removeItem("sessaoAtiva")
        sessionStorage.removeItem("sessaoAtiva")

    }

}

const Rotas = {

    usuario: "pagina-inicial/pagina-inicial.html",
    oficina: "painel-controle/painel-controle.html"

}

if (formularioCadastroUsuario) {

    formularioCadastroUsuario.addEventListener("submit", (event) => {

        event.preventDefault()
    
        const novoUsuario = {

            tipoConta: "usuario",
            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            dataDeNascimento: document.getElementById("datadenascimento").value

        }

        const resultado = Storage.salvarUsuario(novoUsuario)

        if (!resultado.sucesso) {

            alert(resultado.mensagem)

            return

        }

        alert("Cadastro realizado com sucesso!")

        window.location.href = "../index.html"

    })

}

if (formularioCadastroOficina) {

    formularioCadastroOficina.addEventListener("submit", (event) => {

        event.preventDefault()

        const checkboxes = document.querySelectorAll('input[name="servicos"]:checked')
        const servicosMarcados = []

        checkboxes.forEach((checkbox) => {

            servicosMarcados.push(checkbox.value)
            
        })

        const novaOficina = {

            tipoConta: "oficina",
            nomeOficina: document.getElementById("nome-oficina").value,
            cnpj: document.getElementById("cnpj").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            servicos: servicosMarcados,
            endereco: {
                cep: document.getElementById("cep").value,
                rua: document.getElementById("rua").value,
                numero: document.getElementById("numero").value,
                bairro: document.getElementById("bairro").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value
            }

        }

        const resultado = Storage.salvarUsuario(novaOficina)

        if (!resultado.sucesso) {

            alert(resultado.mensagem)

            return

        }

        alert("Oficina cadastrada com sucesso!")

        window.location.href = "../index.html"

    })

}

if (formularioLogin) {

    formularioLogin.addEventListener("submit", (event) => {

        event.preventDefault()

        const email = document.getElementById("email-login").value
        const senha = document.getElementById("senha").value
        const lembrar = document.getElementById("lembrar").checked
        const usuario = Storage.buscarPorEmail(email)

        if (!usuario) {

            alert("Usuário não encontrado!")

            return

        }

        if (usuario.senha !== senha) {

            alert("Senha incorreta!")

            return

        }

        Storage.salvarSessao(usuario, lembrar)

        window.location.href = Rotas[usuario.tipoConta]

    })

}

if (botaoSair) {

  botaoSair.addEventListener("click", () => {

    Storage.encerrarSessao();
    window.location.href = "../index.html";

  })

}

function verificarAcesso(tipoPermitido) {

  const sessao = Storage.getSessao()

  if (!sessao) {

    window.location.href = "../index.html"

    return null

  }

  if (tipoPermitido && sessao.tipoConta !== tipoPermitido) {

    alert("Acesso não autorizado!")
    window.location.href = "../index.html"

    return null

  }

  return sessao

}

if (campoSenha && botaoMostrarSenha) {

    const icone = botaoMostrarSenha.querySelector("i")

    botaoMostrarSenha.addEventListener("click", () => {

        if (campoSenha.type === "password") {

            campoSenha.type = "text"
            icone.classList.replace("fa-eye", "fa-eye-slash")

        } else {

            campoSenha.type = "password"
            icone.classList.replace("fa-eye-slash", "fa-eye")

        }

    })

}

function aumentar(botao) {

    const card = botao.closest('.card')
    const valor = card.querySelector('.value')

    valor.textContent = Number(valor.textContent) + 1

}

function diminuir(botao) {

    const card = botao.closest('.card')
    const valor = card.querySelector('.value')

    const numero = Number(valor.textContent)

    if (numero > 0) {

        valor.textContent = numero - 1

    }

}