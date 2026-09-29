// ===== Referências aos elementos da página =====
const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoTema = document.getElementById('botao-alterar-tema');
const mensagemErro = document.getElementById('mensagem-erro');

// ===== Estado da aplicação =====
// Cada tarefa: { id, texto, concluida }
let tarefas = [];

// ===== Persistência (localStorage) =====
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
        if (Array.isArray(salvas)) tarefas = salvas;
    } catch (erro) {
        tarefas = [];
    }
}

// ===== Tema claro/escuro =====
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

// ===== Mensagens de erro =====
function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    mensagemErro.hidden = false;
    campoTarefa.classList.add('invalido');
}

function limparErro() {
    mensagemErro.hidden = true;
    campoTarefa.classList.remove('invalido');
}

// ===== Contador =====
function atualizarContador() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.concluida).length;

    if (total === 0) {
        contadorTarefas.textContent = '0 tarefas na lista';
    } else if (total === 1) {
        contadorTarefas.textContent = pendentes === 1
            ? '1 tarefa na lista (1 pendente)'
            : '1 tarefa na lista (concluída)';
    } else {
        contadorTarefas.textContent = `${total} tarefas na lista (${pendentes} pendente${pendentes === 1 ? '' : 's'})`;
    }
}

// ===== Renderização =====
function criarItem(tarefa) {
    const item = document.createElement('li');
    item.className = 'item-tarefa' + (tarefa.concluida ? ' concluido' : '');
    item.dataset.id = tarefa.id;

    const texto = document.createElement('span');
    texto.textContent = tarefa.texto; // textContent evita injeção de HTML
    texto.title = 'Clique para concluir';

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
    item.append(texto, acoes);
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

// ===== Ações =====
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

    tarefas.push({ id: Date.now(), texto, concluida: false });
    campoTarefa.value = '';
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

// ===== Eventos =====
botaoAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') adicionarTarefa();
});

campoTarefa.addEventListener('input', limparErro);

// Delegação de eventos: um único listener cuida de todos os itens da lista
listaTarefas.addEventListener('click', evento => {
    const item = evento.target.closest('.item-tarefa');
    if (!item) return;
    const id = Number(item.dataset.id);

    if (evento.target.closest('.excluir')) {
        excluirTarefa(id);
    } else if (evento.target.closest('.concluir') || evento.target.tagName === 'SPAN') {
        alternarConclusao(id);
    }
});

botaoTema.addEventListener('click', () => {
    aplicarTema(!document.body.classList.contains('modo-escuro'));
});

// ===== Inicialização =====
carregarTema();
carregarTarefas();
renderizar();
