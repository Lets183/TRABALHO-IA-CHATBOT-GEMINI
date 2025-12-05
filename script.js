const perguntas = [
    { 
        chave: ["essencial", "saúde", "criança"], 
        resposta: "Alimentação equilibrada, vacinação em dia, higiene, acompanhamento pediátrico e ambiente seguro." 
    },
    { 
        chave: ["frequência", "pediatra", "consulta"], 
        resposta: "Nos primeiros anos, as consultas devem ser mensais ou trimestrais. Depois dos 2 anos, a cada 6 meses." 
    },
    { 
        chave: ["vacinação", "importante", "vacina"], 
        resposta: "As vacinas protegem contra doenças graves e fortalecem o sistema imunológico." 
    },
    { 
        chave: ["sinal", "alerta", "atendimento", "médico"], 
        resposta: "Febre alta persistente, dificuldade para respirar, vômitos intensos, manchas ou convulsões são sinais de alerta." 
    },
    { 
        chave: ["imunidade", "fortalecer", "defesas"], 
        resposta: "Boa alimentação, sono adequado, brincadeiras ao ar livre, vacinas em dia e evitar cigarro fortalecem a imunidade." 
    }
];

function buscarResposta(mensagem) {
    const texto = mensagem.toLowerCase();
    let melhorResposta = null;
    let maiorPontuacao = 0;

    perguntas.forEach(item => {
        let pontos = 0;
        item.chave.forEach(chave => {
            if (texto.includes(chave)) pontos++;
        });

        if (pontos > maiorPontuacao) {
            maiorPontuacao = pontos;
            melhorResposta = item.resposta;
        }
    });

    return melhorResposta || "❓ Não entendi. Pode perguntar de outro jeito?";
}

function limparChat() {
    document.getElementById("chat").innerHTML = "";
}

function mostrarMensagem(texto, classe) {
    const chat = document.getElementById("chat");
    const p = document.createElement("p");
    p.className = classe;
    p.textContent = texto;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
}

function enviarMensagem() {
    const campo = document.getElementById("campoMensagem");
    const msg = campo.value.trim();

    if (msg === "") return;

    mostrarMensagem("Você: " + msg, "mensagem-user");
    campo.value = "";

    fetch("gemini.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "mensagem=" + encodeURIComponent(msg)
    })
    .then(res => res.json())
    .then(data => {
        mostrarMensagem("Chatbot: " + data.resposta, "mensagem-bot");
    })
    .catch(() => { 
        mostrarMensagem("Chatbot: Erro ao se conectar ao servidor.", "mensagem-bot");
    });

    const resposta = buscarResposta(msg);

    setTimeout(() => {
        mostrarMensagem("Chatbot: " + resposta, "mensagem-bot");
    }, 400);
}

let tamanhoFonte = 16;

function aumentarFonte() {
    tamanhoFonte += 2;
    document.getElementById("chat").style.fontSize = tamanhoFonte + "px";
}

function diminuirFonte() {
    tamanhoFonte -= 2;
    if (tamanhoFonte < 10) tamanhoFonte = 10;
    document.getElementById("chat").style.fontSize = tamanhoFonte + "px";
}
