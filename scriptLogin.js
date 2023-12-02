function fazerLogin() {
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    if (usuario === "grupo" && senha === "grupo") {
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}