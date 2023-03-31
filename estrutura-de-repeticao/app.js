const listArgumentos = process.argv.slice(2);
console.log('--------------------- Executando um For -------------------------');
for (let controladorFor = 0; controladorFor < listArgumentos.length; controladorFor++) {
    console.log(`Posicao ${controladorFor} valor lido = ${listArgumentos[controladorFor]}`);
}

console.log('--------------------- Executando um While -------------------------');
let controladorWhile = 0;
while (controladorWhile < listArgumentos.length) {
    console.log(`Posicao ${controladorWhile} valor lido = ${listArgumentos[controladorWhile]}`);
    controladorWhile++;
}

console.log('--------------------- Executando um DoWhile -------------------------');
let controladorDoWhile = 0;
do {
    console.log(`Posicao ${controladorDoWhile} valor lido = ${listArgumentos[controladorDoWhile]}`);
    controladorDoWhile++;
} while (controladorDoWhile < listArgumentos.length)

console.log('--------------------- Executando um For Of -------------------------');
let controladorForOf = 0;
for (const argumentos of listArgumentos) {
    console.log(`valor lido = ${argumentos}`)
}