const form = document.querySelector('.formulario');
const inputNome = document.getElementById('input-nome');
const inputTipo = document.getElementById('input-tipo');
const inputData = document.getElementById('input-data');
const listaInput = document.querySelectorAll('input');
const listaMensagem = document.querySelectorAll('.mensagem-erro');
const listaDocument = document.querySelector('.lista__ul');
const listaDocumentCompletados = document.querySelector('#completadas');
const listaDocumentVencidas = document.querySelector('#vencidas');



let listaDeTarefas = [];
let listaDeTarefasCompletas = [];
let listaDeTarefasVencidas = [];
let listaInputCheck = document.querySelectorAll('.item__check');
let btnEditar = document.querySelectorAll('.btn-edit');
let btnDeletar = document.querySelectorAll('.btn__del');
let indice;
let indiceEditado;

listaDeTarefas = JSON.parse(localStorage.getItem('listaPendente'));
listaDeTarefasCompletas = JSON.parse(localStorage.getItem('listaCompleta'));
listaDeTarefasVencidas = JSON.parse(localStorage.getItem('listaVencida'));
atualizaLista();


form.addEventListener('submit',e => {
    e.preventDefault();
    if(validaFormulario(listaInput, inputData, inputNome, inputTipo, true)){
        salvaItem(inputNome.value, inputTipo.value, inputData.value, listaDeTarefas, false);
        atualizaLista();
        inputNome.value = '';
        inputTipo.value = '';
        inputData.value = undefined;
    }
})




function validaFormulario(listaInput, inputData, inputNome, inputTipo, mostrarMensagem){
    
    let validacao = true
    listaInput.forEach(input => {
        if(input == inputData){
            const partesData = inputData.value.split('-');

            const dataAtual = new Date();
            const dataSelecionada = new Date(partesData[0], partesData[1] - 1, partesData[2])

            if(!inputData.value || dataSelecionada <= dataAtual){
                if(mostrarMensagem){
                    listaMensagem[2].style.display = 'block';
                }
                validacao = false
            } else{
                listaMensagem[2].style.display = 'none';
            }
        }  
        if(input == inputNome){
            if(!input.value){
                if(mostrarMensagem){
                    listaMensagem[0].style.display = 'block';
                }
                validacao = false
            } else{
                listaMensagem[0].style.display = 'none';
            }
        }
        if(input == inputTipo){
            if(!input.value){
                if(mostrarMensagem){
                    listaMensagem[1].style.display = 'block';
                }
                validacao = false
            } else{
                listaMensagem[1].style.display = 'none';
            }
        }
        
    });
    return validacao;
}

function criaCard(item, nome, tipo, data, id, vencimento){
    let dataCompleta = new Date(data);
    const dataMes = dataCompleta.getMonth() + 1;
    const dataDia = dataCompleta.getDate() + 1;
    const dataMesDia = dataDia + '/' + dataMes ;
    
    if(vencimento){
        listaDocumentVencidas.innerHTML += `
        <li class="lista__item">                    
            <div class="item__div__text finalizado">                    
                <div class="item__div__btn  item__div__btn-vencido">
                        <button type="button" class="btn__acao completado-none" id="btn-del" alt="Excluir" ><img src="./img/lixeira-deletar-imagem.png" class="btn__img btn__del"></button>
                </div>
                <h2 class="item__nome">${nome}</h2>
                <p class="item__data">${dataMesDia}</p>
            </div>
        </li>
        `
    } else{
        if(item.check){
            listaDocumentCompletados.innerHTML += `
            <li class="lista__item" id="${id}">
            <div class="item__div">
                <div class="item__div__btn">
                    <input type="checkbox" checked class="item__check">
                    <div>
                        <button type="button" class="btn__acao completado-nome" id="btn-del" alt="Excluir" ><img src="./img/lixeira-deletar-imagem.png" class="btn__img btn__del"></button>
                    </div>
                </div>
                
                <div class="item__div__text finalizado">
                    <p class="item__tipo finalizado-nome">${tipo}</p>
                    <h2 class="item__nome">${nome}</h2>
                    <p class="item__data">${dataMesDia}</p>
                </div>
            </div>
           </li>
            `       
       }
       else{
            listaDocument.innerHTML += `
            <li class="lista__item" id="${id}">
                <div class="item__div">
                    <div class="item__div__btn">
                        <input type="checkbox" class="item__check">
                        <div>
                            <button type="button" class="btn__acao btn-edit" id="btn-edit" alt="Editar"><img src="./img/editar-imagem.png" class="btn__img"></button>
                            <button type="button" class="btn__acao" id="btn-del" alt="Excluir" ><img src="./img/lixeira-deletar-imagem.png" class="btn__img btn__del"></button>
                        </div>
                    </div>
                    
                    <div class="item__div__text">
                        <span class="tipo__span">${tipo}</span>
                        <input type="text" class="item__input-desativado" name="input"></input>
                        <span class="tipo__span">${nome}</span>
                        <input type="text" class="item__input-desativado" name="input"></input>
                        <input type="date" class="item__input-desativado" name="data" id="${data}"></input>
                        <span class="tipo__span">${dataMesDia}</span>
                    </div>
                </div>
            </li>
            `
       }
    }

}

function salvaItem(nome, tipo, data, listaDeTarefas, checkState){
    if(listaDeTarefas.length > 0){
        for(let i = 0; i < listaDeTarefas.length; i++){
            const item = listaDeTarefas[i];
            
            if(data <= item.data){ //Se o item for antes
                listaDeTarefas.splice(i, 0, {
                    'nome': nome,
                    'tipo': tipo,
                    'data': data,
                    'id': undefined,
                    'check': checkState,
                    'vencida': false
                })
                break;
            }

            if(data >= item.data && i + 1 == listaDeTarefas.length){ //Se o novo item for depois
                    listaDeTarefas.push({
                        'nome': nome,
                        'tipo': tipo,
                        'data': data,
                        'id': undefined,
                        'check': checkState,
                        'vencida': false
                    })
                    break;
            }
        }
    }  else{
        indice = 0
        listaDeTarefas.push({
            'nome': nome,
            'tipo': tipo,
            'data': data,
            'id': undefined,
            'check': checkState,
            'vencida': false
        })
    }
}

function identificaID(listaDeTarefas){
    listaDeTarefas.forEach((item, index) => {
        listaDeTarefas[index].id = index
    })
}

function deletar() {

    btnDeletar = document.querySelectorAll('.btn__del');
    btnDeletar.forEach(btn => {    
        btn.addEventListener('click', () => {
            const listaSelecionada = btn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
            if(listaSelecionada == 'pendentes'){
                listaDeTarefas.splice(btn.parentElement.parentElement.parentElement.parentElement.parentElement.id, 1)
            }
            if(listaSelecionada == 'completadas'){
                listaDeTarefasCompletas.splice(btn.parentElement.parentElement.parentElement.parentElement.parentElement.id, 1)
            }
            if(listaSelecionada == 'vencidas'){
                listaDeTarefasVencidas.splice(btn.parentElement.parentElement.parentElement.parentElement.parentElement.id, 1)
            }
            atualizaLista();
        })
    })
}

function editar(){
    btnEditar = document.querySelectorAll('.btn-edit');
    btnEditar.forEach(btn => {
        btn.addEventListener('click', () => {
            const todosInputs = btn.parentElement.parentElement.nextElementSibling.childNodes;
            const inputId = btn.parentElement.parentElement.parentElement.parentElement.id;
            let conteudoDoTexto;
            if(indiceEditado != inputId){
                const todosInputsValor = document.querySelectorAll('.item__input-ativado');
                const todosSpan = document.querySelectorAll('.tipo__span');
                todosInputsValor.forEach(input => {
                    input.classList = 'item__input-desativado';
                })
                todosSpan.forEach(span => {
                    span.classList = 'tipo__span'
                })

                indiceEditado = inputId;
                todosInputs.forEach(input => {
                    if(input.className == 'tipo__span'){
                        conteudoDoTexto = input.textContent;
                        input.classList = 'tipo__span item__input-desativado';
                    }
                    if(input.name == 'input'){
                        input.classList = 'item__input-ativado';
                        input.value = conteudoDoTexto;
                        conteudoDoTexto = '';
                    }
                    if(input.name == 'data'){
                        input.classList = 'item__input-ativado'
                        input.value = input.id;
                        conteudoDoTexto = '';
                    }
                })
            } else{
                
                const todosInputsValor = document.querySelectorAll('.item__input-ativado');
                const todosSpan = document.querySelectorAll('.tipo__span');
                const nomeValor = todosInputsValor[1];
                const tipoValor = todosInputsValor[0];
                const dataValor = todosInputsValor[2];
                todosInputsValor.forEach(input => {
                    input.classList = 'item__input-desativado';
                })
                todosSpan.forEach(span => {
                    span.classList = 'tipo__span'
                })
                indiceEditado = -1
                if(!validaFormulario(todosInputsValor, dataValor, nomeValor, tipoValor, false)){
                    listaDeTarefas.splice(inputId, 1);
                } else{
                    salvaItem(nomeValor.value, tipoValor.value, dataValor.value, listaDeTarefas, false);
                    listaDeTarefas.splice(inputId, 1)
                }
                
                atualizaLista();
            }
        })
    })
}

function atualizaLista(){
    if(listaDeTarefas[0]){
        identificaID(listaDeTarefas);
    }
    if(listaDeTarefasCompletas[0]){
        identificaID(listaDeTarefasCompletas);
    }
    if(listaDeTarefasVencidas[0]){
        identificaID(listaDeTarefasVencidas);
    }



    listaDocument.innerHTML = '';
    listaDocumentCompletados.innerHTML = '';
    listaDeTarefas.forEach(item => {
        if(new Date(item.data) <= new Date()){
            item.vencida = true;
            listaDeTarefas.splice(item.id, 1);
        }
        criaCard(item, item.nome, item.tipo, item.data, item.id, item.vencida);   
    })
    listaDeTarefasCompletas.forEach(item => {
        criaCard(item, item.nome, item.tipo, item.data, item.id)
    })
    listaInputCheck = document.querySelectorAll('.item__check');
    listaInputCheck.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            
            const listaClicada = checkbox.parentElement.parentElement.parentElement.parentElement.className;
            let itemChecado;
            const idChecado = checkbox.parentElement.parentElement.parentElement.id;

            if(listaClicada == 'lista__ul'){
                itemChecado = listaDeTarefas[idChecado];
            } else{
                itemChecado = listaDeTarefasCompletas[idChecado];
            }
            
            const nomeChecado = itemChecado.nome;
            const tipoChecado = itemChecado.tipo;
            const dataChecado = itemChecado.data;

            if(!itemChecado.check){
                listaDeTarefas.splice(idChecado, 1);
                salvaItem(nomeChecado,tipoChecado,dataChecado,listaDeTarefasCompletas, true);
                identificaID(listaDeTarefasCompletas);
            } else{
                listaDeTarefasCompletas.splice(idChecado, 1);
                salvaItem(nomeChecado, tipoChecado, dataChecado, listaDeTarefas, false);
                identificaID(listaDeTarefas);
            } 
            atualizaLista();
        })
    })

    editar();
    deletar();

    localStorage.setItem('listaPendente', JSON.stringify(listaDeTarefas));
    localStorage.setItem('listaCompleta', JSON.stringify(listaDeTarefasCompletas));
    localStorage.setItem('listaVencida', JSON.stringify(listaDeTarefasVencidas));
}   

