const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Esse programa vai checar se voce e maior de 18 anos e tem habilitação para saber se voce pode netra no kart');
console.log('alem da sua verificções, prescisamos verificar se voce esta na esta de prenseça do horario');

readLine.question('Qual o ano do seu nascimento?', ano => {
    if (ano > 2004 || temHabilitação){
        console.log('voce nao tem 18 anos');
    }else{
        readLine.question("voce tem habilitação? (Sim/Não)", temHabilitação => {
            if(!(temHabilitação.toUpperCase() === "SIM")){
                console.log('voce nao tem habilitação para entra no kart');
            }else{
                readLine.question("qual seu nome?", nome =>{
                    switch(nome){
                        case 'Lucas' :
                            console.log('Bem vindo ao kart Lucas');
                            break;
                        case 'Carol':
                            console.log('Bem vindo ao Kart Carol');
                            break;
                        default:
                            console.log('Seu nome nao foi indentificado na lista de presença');
                            break;
                    }
                });
            }
        })
    }
})