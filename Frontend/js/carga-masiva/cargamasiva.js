
async function cargaMasiva(){
    let archivo = document.getElementById('inputCM').files[0]
    console.log(archivo)

    const reader = new FileReader()

    reader.addEventListener("load", (event) => {
        console.log(event.target.result)
        enviarInfo(JSON.parse(event.target.result))
    })

    reader.readAsText(archivo, "UTF-8")
}

async function enviarInfo(jsonCM){
    console.log(jsonCM)
    const rawResponse = await fetch("http://127.0.0.1:4000/usuarios/carga-masiva", {
        method: "POST",
        body: JSON.stringify({ "usuarios": jsonCM.usuarios }),
        headers: { "Content-Type": "application/json" },
    })

    console.log(rawResponse)
    const response = await rawResponse.json()
    console.log(response)
}