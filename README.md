# Org
Projeto de organização de tarefas escolares ou diversas

FUNÇÕES:

validaFormulario<

Recebe uma variável chamada "validacao" como sendo true, recebe da lista de Input selecionada nos parâmetros, utiliza if() para cada tipo de Input, caso seja um InputData o código fará uma comparação com a data atual, caso a data do Input seja menor do que a data atual a função ira retornar false, caso quaquer um dos três inputs estejam vazios a função retornará false.


criaCard<

Faz uma nova data com o Input Data selecionado nos parâmetros para ser utilizada no card(apenas mês e dia), caso o item tenha o objeto vencida como true, o card será criado na tabela vencida, se não, será criado na tabela completadas caso a chave "check" seja true e na tabela pendentes caso contrário.

>

salvaItem<

É basicamente apenas um push de objetos na lista selecionada, porém a função organiza os itens pela data na forma crescente.

>

identificaID<

Gera um ID novo para cada item de cada lista quando a lista se atualiza, nescessário devido a organização por datas que ocorre no salvaItem();

>

deletar<

Captura a lista do botão de delete clicado, e, utiliza a lista para apagar com o splice() o item do botão pelo id.

>

editar<

Captura o ID do item clicado, se o item clicado for diferente item que esta sendo editado:
  todos os Inputs são dedsativados e os span reativados, o editado dá seu indice como indiceEditado , o item clicado recebe um forEach para cada input/span,  se for span, o conteudoDoTexto recebe o valor que está no span, se for input, o input recebe o valor que está no conteudoDoTexto, e reseta o conteudoDoTexto, se for data, o input recebe seu ID, que seria a data completa.
Se não:
  Reseta todas as configurações de aparição de Inputs/Span, o indice do editado e valida a edição, se não for válida o item é apagado, se for válida os spans do item recebem os valores dos Inputs respectivamente.
  
>

atualizaLista<

Identifica o ID dos itens de todas as listas, zera o innerHTML de todas as listas, verifica se a data de cada item da lista de tarefas pendentes está vencido,
utiliza a função criaCard,verifica os inputChecks dos item, quando clicados, caso eles estejam na lista pendentes sua chaves check serão true, caso estejaam na lista completadas suas chaves check serão false, então criamos um novo card com o item nas suas listas "opostas", e apagamos o item da sua lista original.
Por fim, chamamos as funções deletar e editar para que eleas funcionem, e salvamos as listas no localStorage.

>
