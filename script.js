const formLogin = document.getElementById("formLogin");
const areaUsuario = document.getElementById("areaUsuario");

formLogin.addEventListener("submit", function(e){

    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u=> u.usuario===usuario && u.senha===senha);

    if(usuarioEncontrado){
        localStorage.setItem("usuarioLogado",JSON.stringify(usuarioEncontrado));
        carregarUsuario();
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalLogin"));
        modal.hide();

    }else{
        alert("Usuário ou senha inválidos.");

    }

});