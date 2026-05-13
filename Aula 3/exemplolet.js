// Exemplo prático
let contador = 1;
if (true) {
    let contador = 2; // Esta é a uma nova variável, local ao ifconsole.log (contador); // Saída: 2
    console.log(contador); // Saída: 2
}
console.log(contador); // Saída: 1 (valor original)

// Reatribuição
let x = 10;
x = 20; // Permitido