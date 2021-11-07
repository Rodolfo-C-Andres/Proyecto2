const txtCorreo = document.getElementById('txtCorreo')
const txtPassword = document.getElementById('txtPassword')

async function login(){
    // `${nombre_variable}`
    //alert(`${txtCorreo.value} ${txtPassword.value}`)
    
    const data = {"correo": txtCorreo.value, "pwd": txtPassword.value}

    // Peticion a servidor con fetch
    // await -> esperar a que la peticion se termine
    const rawResponse = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })

    // Convertir de STRING a JSON
    const response = await rawResponse.json()

    if (rawResponse.status == 200){
        // localStorage para almacenar la informacion
        localStorage.setItem("usuario", JSON.stringify(response.data))
        alert(`Bienvenido ${response.data.nombre}`)
        window.location.href = "index.html"
    } else {
        alert(`${response.mensaje}`)
    }
    
}