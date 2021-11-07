function mostrar(valor) {
    if (valor == 1) { 
        document.getElementById("crear").style.display = ""; }
    else { document.getElementById("crear").style.display = "none"; }

    if (valor == 2) { 
        mostrarU();
        mostrarpost();  
        document.getElementById("mostrar").style.display = ""; 
    } else { document.getElementById("mostrar").style.display = "none"; }
    
    if (valor == 3) { 
        document.getElementById("editar").style.display = ""; }
    else { document.getElementById("editar").style.display = "none"; }

    if (valor == 4) { 
        document.getElementById("eliminar").style.display = ""; }
    else { document.getElementById("eliminar").style.display = "none"; }
}
function mostrar1(valor) {
    if (valor == 1) { 
        mostrarU();  
        document.getElementById("mostraruser").style.display = ""; 
    } else { document.getElementById("mostraruser").style.display = "none"; }  
    if (valor == 2) { 
        mostrarpost();  
        document.getElementById("mostrarpost").style.display = ""; 
    } else { document.getElementById("mostrarpost").style.display = "none"; }
}
function mostrar2(valor) {    
    if (valor == 1) { 
        mostrarpost2();  
        document.getElementById("mostrarpost").style.display = ""; 
    } else { document.getElementById("mostrarpost").style.display = "none"; }
}
async function crear(){    
    let email = document.getElementById("correo-crear").value
    let password = document.getElementById("password-crear").value
    let name = document.getElementById("nombre-crear").value
    let gener = document.getElementById("genero-crear").value
    let username = document.getElementById("nombre_usuario-crear").value

    let peticion = await fetch("http://localhost:4000/usuario", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            gener: gener,
            username: username
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)
    document.getElementById("correo-crear").value = ""
    document.getElementById("password-crear").value = ""
    document.getElementById("nombre-crear").value = ""
    document.getElementById("genero-crear").value = ""
    document.getElementById("nombre_usuario-crear").value = ""
    window.history.back ()
}
async function crearpost(){ 
    document.getElementById("author-crear").value = localStorage.getItem("username1")   
    let tipo = document.getElementById("tipo-crear").value
    let url = document.getElementById("url-crear").value
    let date = document.getElementById("date-crear").value
    let category = document.getElementById("category-crear").value
    let author = document.getElementById("author-crear").value

    let peticion = await fetch("http://localhost:4000/post", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            tipo: tipo,
            url: url,
            date: date,
            category: category,
            author: author
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)
    document.getElementById("tipo-crear").value = ""
    document.getElementById("url-crear").value = ""
    document.getElementById("date-crear").value = ""
    document.getElementById("category-crear").value = ""
    document.getElementById("author-crear").value = ""
    window.history.back ()
}
async function mostrarU() {
    let cuerpo = document.getElementById("tbody1")
     //innerHTML: modifica el contenido que se encuentra como hijo de la etiqueta especificada
    cuerpo.innerHTML = "";

    let peticion = await fetch("http://localhost:4000/devolver_todo", {
        method: "GET"
    })
    let respuesta = await peticion.json()

    for (let i = 0; i < respuesta.length; i++){
        // createElement(): crea una etiqueta del tipo que es pasado por parametro
        let tr = document.createElement("tr")        

        let td = document.createElement("td")
        td.innerHTML = respuesta[i].id
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].email
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].password
        tr.appendChild(td)
        
        td = document.createElement("td")
        td.innerHTML = respuesta[i].name
        tr.appendChild(td)
       
        td = document.createElement("td")
        td.innerHTML = respuesta[i].gener
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].username
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = `<button onclick="veruser('${respuesta[i].email}')" class="btn btn-info btn-circle btn-sm">
                            <i class="fas fa-flag"></i>
                        </button>
                        <button  onclick="edituser('${respuesta[i].email}')" class="btn btn-success btn-circle btn-sm">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button onclick="eliminar('${respuesta[i].email}')" class="btn btn-danger btn-circle btn-sm">
                            <i class="fas fa-trash"></i>
                        </button>
                        `
        tr.appendChild(td)

        
        cuerpo.appendChild(tr);
    }    
}
async function mostrarpost() {
    let cuerpo = document.getElementById("tbody2")
     //innerHTML: modifica el contenido que se encuentra como hijo de la etiqueta especificada
    cuerpo.innerHTML = "";

    let peticion = await fetch("http://localhost:4000/devolver_Posts", {
        method: "GET"
    })
    let respuesta = await peticion.json()

    for (let i = 0; i < respuesta.length; i++){
        // createElement(): crea una etiqueta del tipo que es pasado por parametro
        let tr = document.createElement("tr")
        
        let td = document.createElement("td")
        td.innerHTML = respuesta[i].id
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].tipo
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].url
        tr.appendChild(td)
        
        td = document.createElement("td")
        td.innerHTML = respuesta[i].date
        tr.appendChild(td)
       
        td = document.createElement("td")
        td.innerHTML = respuesta[i].category
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].likes
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].author
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = `<button onclick="verpost('${respuesta[i].id}')" class="btn btn-info btn-circle btn-sm">
                            <i class="fas fa-flag"></i>
                        </button>
                        <button onclick="editpost('${respuesta[i].id}')"  class="btn btn-success btn-circle btn-sm">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button onclick="eliminarpost('${respuesta[i].id}')" class="btn btn-danger btn-circle btn-sm">
                            <i class="fas fa-trash"></i>
                        </button>
                        `
                        
        tr.appendChild(td)
        
        cuerpo.appendChild(tr);
    }    
}
async function mostrarpost2() {
    let cuerpo = document.getElementById("tbody2")
     //innerHTML: modifica el contenido que se encuentra como hijo de la etiqueta especificada
    cuerpo.innerHTML = "";

    let peticion = await fetch("http://localhost:4000/devolver_Posts", {
        method: "GET"
    })
    let respuesta = await peticion.json()

    for (let i = 0; i < respuesta.length; i++){
        if (respuesta[i].author==localStorage.getItem("username1")){
            // createElement(): crea una etiqueta del tipo que es pasado por parametro
            let tr = document.createElement("tr")
            
            let td = document.createElement("td")
            td.innerHTML = respuesta[i].id
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = respuesta[i].tipo
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = respuesta[i].url
            tr.appendChild(td)
            
            td = document.createElement("td")
            td.innerHTML = respuesta[i].date
            tr.appendChild(td)
        
            td = document.createElement("td")
            td.innerHTML = respuesta[i].category
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = respuesta[i].likes
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = respuesta[i].author
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = `<button onclick="verpost('${respuesta[i].id}')" class="btn btn-info btn-circle btn-sm">
                                <i class="fas fa-flag"></i>
                            </button>
                            <button onclick="editpost('${respuesta[i].id}')"  class="btn btn-success btn-circle btn-sm">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            <button onclick="eliminarpost('${respuesta[i].id}')" class="btn btn-danger btn-circle btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                            `
                            
            tr.appendChild(td)
            
            cuerpo.appendChild(tr);
        }
    }    
}
async function eliminar(correo) {
    let email = correo
    let peticion = await fetch("http://localhost:4000/eliminar", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email            
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)
    location.reload()
}
async function eliminarpost(Id) {
    let id = Id
    let peticion = await fetch("http://localhost:4000/eliminarpost", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)
    location.reload()

}
async function editar() {
    let email = document.getElementById("correo-editar").value
    let password = document.getElementById("password-editar").value
    let name = document.getElementById("nombre-editar").value
    let gener = document.getElementById("genero-editar").value
    let username = document.getElementById("nombre_usuario-editar").value

    let peticion = await fetch("http://localhost:4000/actualizar", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            gener: gener,
            username: username
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("correo-editar").value = ""
    document.getElementById("password-editar").value = ""
    document.getElementById("nombre-editar").value = ""
    document.getElementById("genero-editar").value = ""
    document.getElementById("nombre_usuario-editar").value = ""
    window.history.back ();
}
async function editarpost() { 
    let id = document.getElementById("id-editar").value
    let tipo = document.getElementById("tipo-editar").value
    let url = document.getElementById("url-editar").value
    let date = document.getElementById("date-editar").value
    let category = document.getElementById("category-editar").value
    let likes = document.getElementById("likes-editar").value
    let author = document.getElementById("author-editar").value
    
    let peticion = await fetch("http://localhost:4000/actualizarpost", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
            tipo: tipo,
            url: url,
            date: date,
            category: category,
            likes: likes,
            author: author
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("id-editar").value = ""
    document.getElementById("tipo-editar").value = ""
    document.getElementById("url-editar").value = ""
    document.getElementById("date-editar").value = ""
    document.getElementById("category-editar").value = ""
    document.getElementById("likes-editar").value = ""
    document.getElementById("author-editar").value = ""
    
    window.history.back ()
}
async function edituser(correo) {
    let email = correo
    let peticion = await fetch("http://localhost:4000/buscar_usuario", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email            
        })
    })
    let respuesta = await peticion.json()

    localStorage.setItem("email", respuesta.email)
    localStorage.setItem("password", respuesta.password)
    localStorage.setItem("name", respuesta.name)
    localStorage.setItem("gener", respuesta.gener)
    localStorage.setItem("username", respuesta.username)
    
    window.location.href = "editaruser.html"
    
}
async function editpost(Id) {
    let id = Id
    let peticion = await fetch("http://localhost:4000/buscar_post", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id            
        })
    })
    let respuesta = await peticion.json()

    localStorage.setItem("id", respuesta.id)
    localStorage.setItem("tipo", respuesta.tipo)
    localStorage.setItem("url", respuesta.url)
    localStorage.setItem("date", respuesta.date)
    localStorage.setItem("category", respuesta.category)
    localStorage.setItem("likes", respuesta.likes)
    localStorage.setItem("author", respuesta.author)
    
    window.location.href = "editarpost.html"
    
}
async function veruser(correo) {
    let email = correo
    let peticion = await fetch("http://localhost:4000/buscar_usuario", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email            
        })
    })
    let respuesta = await peticion.json()

    localStorage.setItem("email", respuesta.email)
    localStorage.setItem("password", respuesta.password)
    localStorage.setItem("name", respuesta.name)
    localStorage.setItem("gener", respuesta.gener)
    localStorage.setItem("username", respuesta.username)
    
    window.location.href = "veruser.html"
    
}
async function verpost(Id) {
    let id = Id
    let peticion = await fetch("http://localhost:4000/buscar_post", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id            
        })
    })
    let respuesta = await peticion.json()

    localStorage.setItem("id", respuesta.id)
    localStorage.setItem("tipo", respuesta.tipo)
    localStorage.setItem("url", respuesta.url)
    localStorage.setItem("date", respuesta.date)
    localStorage.setItem("category", respuesta.category)
    localStorage.setItem("likes", respuesta.likes)
    localStorage.setItem("author", respuesta.author)
    
    window.location.href = "verpost.html"
    
}
async function entrar() {
    let email = document.getElementById("correo").value
    let password = document.getElementById("pass").value
    let peticion = await fetch("http://localhost:4000/Login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,            
        })

    })
    let respuesta = await peticion.json()         
    if (peticion.status == 200){        
        document.getElementById("correo").value = ""
        document.getElementById("pass").value = ""       
        
        localStorage.setItem("id1", respuesta.data.id)
        localStorage.setItem("email1", respuesta.data.email)
        localStorage.setItem("password1", respuesta.data.password)
        localStorage.setItem("name1", respuesta.data.name)
        localStorage.setItem("gener1", respuesta.data.gener)
        localStorage.setItem("username1", respuesta.data.username)
        console.log(localStorage.getItem("username1"))
        alert("Bienvenido " + respuesta.data.name)
        
        if (localStorage.getItem("username1")=="admin"){
            location.href = "indexadmin.html"
        }else{
            location.href = "indexuser.html"
        }
        
    }else{
        alert(respuesta.mensaje)
    } 
}
async function cargaMasiva(){
    let archivo = document.getElementById('inputCM').files[0]
    const reader = new FileReader()

    reader.addEventListener("load", (event) => {
        enviarInfo(JSON.parse(event.target.result))
    })

    reader.readAsText(archivo, "UTF-8")
    localStorage.setItem("usuarios", JSON.stringify(respuesta.data))
}
async function enviarInfo(jsonCM){
    const rawResponse = await fetch("http://localhost:4000/usuarios/carga-masiva", {
        method: "POST",
        body: JSON.stringify({ "usuarios": jsonCM.usuarios }),
        headers: { "Content-Type": "application/json" },
    })

    const respuesta = await rawResponse.json()
    alert(respuesta.mensaje)
    window.history.back ()
}
async function cargaMasivapost(){
    let archivo = document.getElementById('inputCM').files[0]
    const reader = new FileReader()

    reader.addEventListener("load", (event) => {
        enviarInfoposti(JSON.parse(event.target.result))
        enviarInfopostv(JSON.parse(event.target.result))
    })

    reader.readAsText(archivo, "UTF-8")
}
async function enviarInfoposti(jsonCM){
    const rawResponse = await fetch("http://localhost:4000/post/carga-masivai", {
        method: "POST",
        body: JSON.stringify({ "images": jsonCM.images }),
        headers: { "Content-Type": "application/json" },
    })

    const respuesta = await rawResponse.json()
    alert(respuesta.mensaje)
}
async function enviarInfopostv(jsonCM){
    const rawResponse = await fetch("http://localhost:4000/post/carga-masivav", {
        method: "POST",
        body: JSON.stringify({"videos": jsonCM.videos }),
        headers: { "Content-Type": "application/json" },
    })

    const respuesta = await rawResponse.json()
    alert(respuesta.mensaje)
    window.history.back ()
}
function cargar(){   
    document.getElementById("correo-editar").value = localStorage.getItem("email")
    document.getElementById("password-editar").value = localStorage.getItem("password")
    document.getElementById("nombre-editar").value = localStorage.getItem("name")
    document.getElementById("genero-editar").value = localStorage.getItem("gener")
    document.getElementById("nombre_usuario-editar").value = localStorage.getItem("username")
}
function cargar2(){ 
    document.getElementById("id-editar").value = localStorage.getItem("id")
    document.getElementById("tipo-editar").value = localStorage.getItem("tipo")
    document.getElementById("url-editar").value = localStorage.getItem("url")
    document.getElementById("date-editar").value = localStorage.getItem("date")
    document.getElementById("category-editar").value = localStorage.getItem("category")
    document.getElementById("likes-editar").value = localStorage.getItem("likes")
    document.getElementById("author-editar").value = localStorage.getItem("author")
}
function cargar3(){ 
    document.getElementById("id-editar").value = localStorage.getItem("id")
    document.getElementById("tipo-editar").value = localStorage.getItem("tipo")
    document.getElementById("date-editar").value = localStorage.getItem("date")
    document.getElementById("category-editar").value = localStorage.getItem("category")
    document.getElementById("likes-editar").value = localStorage.getItem("likes")
    document.getElementById("author-editar").value = localStorage.getItem("author")
    image(localStorage.getItem("tipo"))
}
function cargar4(){     
    let cuerpo = document.getElementById("posad")
    let a = localStorage.getItem("name1")
    cuerpo.innerHTML = "";
    document.getElementById("posad").innerHTML=`<p> ${a}</p>`;           
}
function cargar5(){     
    let cuerpo = document.getElementById("posus")
    let a = localStorage.getItem("name1")
    cuerpo.innerHTML = "";
    document.getElementById("posus").innerHTML=`<p> ${a}</p>`;           
}
function cargar6(){
    document.getElementById("author-crear").value = localStorage.getItem("username1")
}
async function image(tip) {
    let cuerpo = document.getElementById("pos")
    let direccion = localStorage.getItem("url")
    cuerpo.innerHTML = "";

    if (tip=="images"){
        document.getElementById("pos").innerHTML=`<img src="${direccion}" width="500" height="300"/>`;           
    }
    if (tip=="videos"){ 
                   
        document.getElementById("pos").innerHTML=`<video width="500" height="300" controls>
        <source src="${direccion}" type="video/mp4">
    </video> `;           
    }           
}

 