// Exemplo de if/else aninhados

let usuarioLogado = true;
let temPermissao = true;

if (usuarioLogado){ //mesma coisa que usuarioLogado == true
    if(temPermissao){
        console.log("Acesso Permitido");
    }
    else{
        console.log("Acesso Negado! Você não tem permissão");
    }
}
else{
    console.log("Acesso Negado: Faça login primeiro.");
}