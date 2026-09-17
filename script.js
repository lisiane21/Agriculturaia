// ============================
// NOMES ALEATÓRIOS
// ============================

const nomes = [
    "Gabriel",
    "Ana",
    "Lucas",
    "Mariana",
    "Pedro",
    "Julia",
    "João",
    "Beatriz"
];


// ============================
// AFIRMAÇÕES ALEATÓRIAS
// ============================

const afirmacoes = [
    "A tecnologia pode ajudar a aumentar a produtividade da fazenda.",
    "O uso consciente da água é importante para a produção agrícola.",
    "A preservação do solo contribui para uma agricultura sustentável.",
    "O descarte correto de embalagens ajuda a proteger o meio ambiente.",
    "O planejamento da produção pode evitar desperdícios.",
    "A utilização de tecnologias pode facilitar o trabalho no campo."
];


// ============================
// PERGUNTAS
// ============================

const perguntas = [

    {
        pergunta: "Qual dessas práticas ajuda a conservar o solo da fazenda?",
        opcoes: [
            "Queimar toda a vegetação",
            "Evitar práticas que causem erosão",
            "Retirar toda a cobertura do solo",
            "Usar água sem controle"
        ],
        resposta: 1
    },

    {
        pergunta: "Qual é uma forma de economizar água na produção agrícola?",
        opcoes: [
            "Deixar torneiras abertas",
            "Irrigar durante todo o dia",
            "Utilizar sistemas de irrigação eficientes",
            "Desperdiçar água"
        ],
        resposta: 2
    },

    {
        pergunta: "Por que é importante cuidar das nascentes?",
        opcoes: [
            "Porque elas não possuem utilidade",
            "Para proteger os recursos hídricos",
            "Para aumentar a erosão",
            "Para retirar a vegetação"
        ],
        resposta: 1
    },

    {
        pergunta: "Qual tecnologia pode ajudar no monitoramento de uma plantação?",
        opcoes: [
            "Drones e sensores",
            "Objetos sem função",
            "Apenas ferramentas manuais",
            "Nenhuma tecnologia"
        ],
        resposta: 0
    },

    {
        pergunta: "O que pode ajudar a diminuir o desperdício de alimentos?",
        opcoes: [
            "Melhor planejamento da produção",
            "Produzir sem planejamento",
            "Jogar alimentos fora",
            "Ignorar a quantidade produzida"
        ],
        resposta: 0
    },

    {
        pergunta: "O que caracteriza uma agropecuária sustentável?",
        opcoes: [
            "Produção sem preocupação ambiental",
            "Desperdício de recursos",
            "Produção buscando equilíbrio entre economia e meio ambiente",
            "Desmatamento constante"
        ],
        resposta: 2
    }

];


// ============================
// VARIÁVEIS
// ============================

let perguntaAtual = 0;
let pontos = 0;
let nomeSelecionado = "";


// ============================
// ELEMENTOS HTML
// ============================

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const feedbackElemento = document.getElementById("feedback");

const nomeJogador = document.getElementById("nome-jogador");
const progresso = document.getElementById("progresso");

const mensagemFinal = document.getElementById("mensagem-final");
const pontuacao = document.getElementById("pontuacao");


// ============================
// FUNÇÃO PARA ESCOLHER NOME
// ============================

function escolherNome() {

    const numeroAleatorio = Math.floor(Math.random() * nomes.length);

    nomeSelecionado = nomes[numeroAleatorio];

}


// ============================
// FUNÇÃO PARA MOSTRAR AFIRMAÇÃO
// ============================

function mostrarAfirmacao() {

    const numeroAleatorio = Math.floor(
        Math.random() * afirmacoes.length
    );

    console.log(
        afirmacoes[numeroAleatorio]
    );

}


// ============================
// FUNÇÃO INICIAR JOGO
// ============================

function iniciarJogo() {

    perguntaAtual = 0;
    pontos = 0;

    escolherNome();

    telaInicial.classList.add("escondido");
    telaFinal.classList.add("escondido");
    telaJogo.classList.remove("escondido");

    mostrarPergunta();

}


// ============================
// FUNÇÃO MOSTRAR PERGUNTA
// ============================

function mostrarPergunta() {

    feedbackElemento.textContent = "";

    const pergunta = perguntas[perguntaAtual];

    progresso.textContent =
        `Pergunta ${perguntaAtual + 1}/${perguntas.length}`;

    /*
    Aqui usamos o replace() para trocar
    a palavra "você" pelo nome escolhido.
    */

    const textoPersonalizado =
        pergunta.pergunta.replace(
            /você/gi,
            nomeSelecionado
        );

    perguntaElemento.textContent = textoPersonalizado;

    nomeJogador.textContent =
        `🌾 Em 2049, ${nomeSelecionado} está na fazenda...`;

    opcoesElemento.innerHTML = "";

    pergunta.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.classList.add("opcao");

        botao.textContent = opcao;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        opcoesElemento.appendChild(botao);

    });

    mostrarAfirmacao();

}


// ============================
// VERIFICAR RESPOSTA
// ============================

function verificarResposta(indiceEscolhido) {

    const respostaCorreta =
        perguntas[perguntaAtual].resposta;

    const botoes =
        document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });


    if (indiceEscolhido === respostaCorreta) {

        pontos++;

        feedbackElemento.textContent =
            "✅ Resposta correta! Muito bem!";

    } else {

        feedbackElemento.textContent =
            "❌ Resposta incorreta. Vamos continuar!";

    }


    setTimeout(() => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            finalizarJogo();

        }

    }, 1200);

}


// ============================
// FINALIZAR JOGO
// ============================

function finalizarJogo() {

    telaJogo.classList.add("escondido");
    telaFinal.classList.remove("escondido");

    pontuacao.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

    if (pontos === perguntas.length) {

        mensagemFinal.textContent =
            `Parabéns, ${nomeSelecionado}! Você demonstrou que entende bastante sobre agropecuária e sustentabilidade.`;

    } else if (pontos >= 4) {

        mensagemFinal.textContent =
            `${nomeSelecionado}, você foi muito bem! Ainda há alguns conhecimentos do campo para aprimorar.`;

    } else {

        mensagemFinal.textContent =
            `${nomeSelecionado}, toda missão é uma oportunidade para aprender mais sobre o campo e a sustentabilidade.`;

    }

}


// ============================
// BOTÕES
// ============================

btnIniciar.addEventListener(
    "click",
    iniciarJogo
);

btnJogarNovamente.addEventListener(
    "click",
    iniciarJogo
);
