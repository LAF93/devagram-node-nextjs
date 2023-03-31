try{
    

    const listaDeProdutosDisponiveis = [
        "Pao",
        "Leite",
        "Cafe",
        "Laranja",
        "Macarrao",
        "Sabonete",
        "Detergente",
    ];
    
    const listaDeArgumentos = process.argv.slice(2);
    
    const listaDeProdutosSolicitadosDisponiveis = listaDeProdutosDisponiveis.filter(produto =>{
        return listaDeArgumentos.find(argumento => argumento === produto);
})

listaDeProdutosSolicitadosDisponiveis.forEach(produtos => console.log (`este produto nos temos: ${produtos}`));

const listaDeProdutosNaoDisponiveis = listaDeArgumentos.filter(argumento => {
    return !listaDeProdutosDisponiveis.find(produto => produto === argumento);
})

listaDeProdutosNaoDisponiveis.forEach(argumento => console.log(`este produto nos nao temos: ${argumento}`));

listaDeProdutosDisponiveis.sort();
listaDeProdutosDisponiveis.forEach(produto => console.log(`Este produto esta disponivel: ${produto}`));
}catch(e){
    console.log('nao foi possivel executar pedido de compra');

}