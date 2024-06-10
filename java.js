const exibeTarefas = () => {
    const tabela = document.getElementById('idTabela');
    const tbody = tabela.querySelector('tbody');

    tbody.innerHTML =
   ` <tr>
        <th>DATA</th>
        <th>NOME</th>
        <th>STATUS</th> 
        <th>EDITAR</th> 
        <th>EXCLUIR</th>
        </tr>`;
    const tarefas = JSON.parse(localStorage.getItem('tarefas'))

    tarefas.forEach((tarefa, index) => {
        const conteudoTabela =
        `<tr>
        <td>${tarefa.data}</td> 
        <td>${tarefa.nome}</td>
        <td>${tarefa.status}</td> 
        <td ><button class="btnEditar" onclick="editarTarefa(${index})"><i class="fa fa-pencil-square fa-2x"  aria-hidden="true"></i></button></td> 
        <td><button class="btnExcluir" onclick="deletaTarefa(${index})"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button></td>
    </tr>`;
        const row = tbody.insertRow();
        row.innerHTML= conteudoTabela;
    });
}

const addTarefa = (event) =>{
    event.preventDefault();
    let form = document.getElementById("infor");
    let nome = document.getElementById("tarefaNome").value.trim();
    let data = document.getElementById("tarefaData").value.trim();
    let status = document.getElementById("idStatus").value.trim();
    let campoVazio = [];

    nome == "" ? campoVazio.push("Nome"): "";
    status == ""? campoVazio.push("Status"): "";
    data == "" ? campoVazio.push("Data"): "";

    if (nome == ""|| status == ""|| data ==""){
        alert("Preecha o Campo Vazio" + campoVazio);
    }else{
        const tarefa = {
            nome: nome,
            status: status,
            data: data,
        }
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        
        tarefas.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        form.reset();
        exibeTarefas();
    };
}
const deletaTarefa = (index) =>{
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; 
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    exibeTarefas();
}
const editarTarefa = (index) => {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefa = tarefas[index];

    document.getElementById("tarefaData").value = tarefa.data;
    document.getElementById("tarefaNome").value = tarefa.nome;
    document.getElementById("idStatus").value = tarefa.status;

    const atualizaTarefa = (event) => {
        event.preventDefault();

        tarefa.data = document.getElementById("tarefaData").value.trim();
        tarefa.nome = document.getElementById("tarefaNome").value.trim();
        tarefa.status = document.getElementById("idStatus").value.trim();

        const upTarefa = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', upTarefa);

        exibeTarefas();
        document.getElementById('infor').reset();

        document.querySelector('.adicionar').removeEventListener('click', atualizaTarefa);
        document.querySelector('.adicionar').addEventListener('click', addTarefa);

    }
    document.querySelector('.adicionar').removeEventListener('click', addTarefa);
    document.querySelector('.adicionar').addEventListener('click', atualizaTarefa);  
}
const init = () => {
    document.querySelector('.adicionar').addEventListener('click', addTarefa);    
    exibeTarefas();
}
init();