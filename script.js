<<<<<<< HEAD
=======
// ===== Referências aos elementos da página =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoTema = document.getElementById('botao-alterar-tema');
const mensagemErro = document.getElementById('mensagem-erro');
<<<<<<< HEAD
const campoPrazo = document.getElementById('campo-prazo');

let tarefas = [];

=======

// ===== Estado da aplicação =====
// Cada tarefa: { id, texto, concluida }
let tarefas = [];

// ===== Persistência (localStorage) =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
function salvarTarefas() {
    try {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } catch (erro) {
        console.error('Não foi possível salvar as tarefas:', erro);
    }
}

function carregarTarefas() {
    try {
        const salvas = JSON.parse(localStorage.getItem('tarefas'));
<<<<<<< HEAD
        if (Array.isArray(salvas)) {
            // Tarefas antigas (sem prazo) continuam funcionando
            tarefas = salvas.map(t => ({ ...t, prazo: t.prazo || null }));
        }
=======
        if (Array.isArray(salvas)) tarefas = salvas;
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
    } catch (erro) {
        tarefas = [];
    }
}

<<<<<<< HEAD
=======
// ===== Tema claro/escuro =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
function aplicarTema(escuro) {
    document.body.classList.toggle('modo-escuro', escuro);
    const icone = botaoTema.querySelector('i');
    icone.className = escuro ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    try {
        localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
    } catch (erro) {
        console.error('Não foi possível salvar o tema:', erro);
    }
}

function carregarTema() {
    let escuro = false;
    try {
        escuro = localStorage.getItem('tema') === 'escuro';
    } catch (erro) {
        escuro = false;
    }
    aplicarTema(escuro);
}

<<<<<<< HEAD
// Data de hoje no formato AAAA-MM-DD (fuso local)
function hojeISO() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
}

// Converte AAAA-MM-DD em DD/MM/AAAA
function formatarData(iso) {
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Texto e situação do prazo de uma tarefa
function situacaoPrazo(tarefa) {
    const hoje = hojeISO();
    if (tarefa.concluida) return { texto: `Prazo: ${formatarData(tarefa.prazo)}`, classe: '' };
    if (tarefa.prazo < hoje) return { texto: `Atrasada desde ${formatarData(tarefa.prazo)}`, classe: 'atrasada' };
    if (tarefa.prazo === hoje) return { texto: 'Vence hoje', classe: 'hoje' };
    return { texto: `Prazo: ${formatarData(tarefa.prazo)}`, classe: '' };
}

=======
// ===== Mensagens de erro =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    mensagemErro.hidden = false;
    campoTarefa.classList.add('invalido');
}

function limparErro() {
    mensagemErro.hidden = true;
    campoTarefa.classList.remove('invalido');
<<<<<<< HEAD
    campoPrazo.classList.remove('invalido');
}

function atualizarContador() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.concluida).length;
    const hoje = hojeISO();
    const atrasadas = tarefas.filter(t => !t.concluida && t.prazo && t.prazo < hoje).length;
    const sufixoAtraso = atrasadas > 0 ? ` - ${atrasadas} atrasada${atrasadas === 1 ? '' : 's'}` : '';
=======
}

// ===== Contador =====
function atualizarContador() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.concluida).length;
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9

    if (total === 0) {
        contadorTarefas.textContent = '0 tarefas na lista';
    } else if (total === 1) {
        contadorTarefas.textContent = pendentes === 1
            ? '1 tarefa na lista (1 pendente)'
            : '1 tarefa na lista (concluída)';
<<<<<<< HEAD
        contadorTarefas.textContent += sufixoAtraso;
    } else {
        contadorTarefas.textContent = `${total} tarefas na lista (${pendentes} pendente${pendentes === 1 ? '' : 's'})${sufixoAtraso}`;
    }
}

=======
    } else {
        contadorTarefas.textContent = `${total} tarefas na lista (${pendentes} pendente${pendentes === 1 ? '' : 's'})`;
    }
}

// ===== Renderização =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
function criarItem(tarefa) {
    const item = document.createElement('li');
    item.className = 'item-tarefa' + (tarefa.concluida ? ' concluido' : '');
    item.dataset.id = tarefa.id;

<<<<<<< HEAD
    const info = document.createElement('div');
    info.className = 'info-tarefa';

    const texto = document.createElement('span');
    texto.className = 'texto-tarefa';
    texto.textContent = tarefa.texto;
    texto.title = 'Clique para concluir';
    info.appendChild(texto);

    if (tarefa.prazo) {
        const situacao = situacaoPrazo(tarefa);
        const prazo = document.createElement('small');
        prazo.className = 'prazo-tarefa ' + situacao.classe;
        prazo.textContent = situacao.texto;
        info.appendChild(prazo);
    }
=======
    const texto = document.createElement('span');
    texto.textContent = tarefa.texto; // textContent evita injeção de HTML
    texto.title = 'Clique para concluir';
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9

    const acoes = document.createElement('div');
    acoes.className = 'acoes-tarefa';

    const botaoConcluir = document.createElement('button');
    botaoConcluir.className = 'botao-acao concluir';
    botaoConcluir.setAttribute('aria-label', 'Concluir tarefa');
    botaoConcluir.title = tarefa.concluida ? 'Desfazer' : 'Concluir';
    botaoConcluir.innerHTML = `<i class="fa-solid ${tarefa.concluida ? 'fa-rotate-left' : 'fa-check'}"></i>`;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'botao-acao excluir';
    botaoExcluir.setAttribute('aria-label', 'Excluir tarefa');
    botaoExcluir.title = 'Excluir';
    botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';

    acoes.append(botaoConcluir, botaoExcluir);
<<<<<<< HEAD
    item.append(info, acoes);
=======
    item.append(texto, acoes);
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
    return item;
}

function renderizar() {
    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        const vazio = document.createElement('li');
        vazio.className = 'lista-vazia';
        vazio.textContent = 'Nenhuma tarefa por aqui. Adicione a primeira!';
        listaTarefas.appendChild(vazio);
    } else {
        tarefas.forEach(tarefa => listaTarefas.appendChild(criarItem(tarefa)));
    }

    atualizarContador();
}

<<<<<<< HEAD
=======
// ===== Ações =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === '') {
        mostrarErro('Digite uma tarefa antes de adicionar.');
        campoTarefa.focus();
        return;
    }

    const repetida = tarefas.some(t => t.texto.toLowerCase() === texto.toLowerCase());
    if (repetida) {
        mostrarErro('Essa tarefa já está na lista.');
        campoTarefa.focus();
        return;
    }

<<<<<<< HEAD
    const prazo = campoPrazo.value || null;
    if (prazo && prazo < hojeISO()) {
        mostrarErro('O prazo não pode ser uma data que já passou.');
        campoPrazo.classList.add('invalido');
        campoPrazo.focus();
        return;
    }

    tarefas.push({ id: Date.now(), texto, concluida: false, prazo });
    campoTarefa.value = '';
    campoPrazo.value = '';
=======
    tarefas.push({ id: Date.now(), texto, concluida: false });
    campoTarefa.value = '';
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
    limparErro();
    salvarTarefas();
    renderizar();
    campoTarefa.focus();
}

function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;
    tarefa.concluida = !tarefa.concluida;
    salvarTarefas();
    renderizar();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas();
    renderizar();
}

<<<<<<< HEAD
=======
// ===== Eventos =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
botaoAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') adicionarTarefa();
});

campoTarefa.addEventListener('input', limparErro);
<<<<<<< HEAD
campoPrazo.addEventListener('input', limparErro);
campoPrazo.min = hojeISO();

=======

// Delegação de eventos: um único listener cuida de todos os itens da lista
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
listaTarefas.addEventListener('click', evento => {
    const item = evento.target.closest('.item-tarefa');
    if (!item) return;
    const id = Number(item.dataset.id);

    if (evento.target.closest('.excluir')) {
        excluirTarefa(id);
<<<<<<< HEAD
    } else if (evento.target.closest('.concluir') || evento.target.closest('.texto-tarefa')) {
=======
    } else if (evento.target.closest('.concluir') || evento.target.tagName === 'SPAN') {
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
        alternarConclusao(id);
    }
});

botaoTema.addEventListener('click', () => {
    aplicarTema(!document.body.classList.contains('modo-escuro'));
});

<<<<<<< HEAD
=======
// ===== Inicialização =====
>>>>>>> 36379eb3127aac5873cd3064c7e3a6b6c02555f9
carregarTema();
carregarTarefas();
renderizar();
