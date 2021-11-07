from flask import Flask, json, request, jsonify
from flask_cors import CORS
from Crud_Usuarios import Crud_Users
from Crud_publicaciones import Crud_posts

crud_usuarios = Crud_Users()
crud_publiciones = Crud_posts()
app = Flask(__name__)
CORS(app)

# Insertar nuevo usuario
@app.route('/usuario', methods=["PUT"])
def insertarUsuario():
    email = request.json["email"]
    pwd = request.json["password"]
    name = request.json["name"]
    gener = request.json["gener"]
    username = request.json["username"]

    resultado = crud_usuarios.Crear_User(email, pwd, name, gener, username)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200

# Insertar nuevo post
@app.route('/post', methods=["PUT"])
def insertarpost():
    tipo = request.json["tipo"]
    url = request.json["url"]
    date = request.json["date"]
    category = request.json["category"]
    author = request.json["author"]

    resultado = crud_publiciones.Crear_post(tipo, url,date,category,author)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200

# Login
@app.route('/Login', methods=["POST"])
def Login():
    email = request.json["email"]
    password = request.json["password"]

    resultado = crud_usuarios.login(email, password)
    if resultado:
        return jsonify({"data": resultado, "mensaje": "OK"}), 200
    else:
        return jsonify({"mensaje": "Credenciales incorrectas"}), 404
    
# Recuperar usuarios
@app.route('/devolver_todo',methods=["GET"])
def devolver_usuarios():
    resultado = crud_usuarios.Read_all_users()
    return jsonify(resultado),200

# Recuperar posts
@app.route('/devolver_Posts',methods=["GET"])
def devolver_posts():
    resultado = crud_publiciones.Read_all_posts()
    return jsonify(resultado),200

# Buscar un usuario 
@app.route('/buscar_usuario', methods=["POST"])
def buscar_un_usuario():
    email = request.json["email"]
    resultado = crud_usuarios.Leer_un_usuario(email)
    return jsonify(resultado), 200

# Buscar un post 
@app.route('/buscar_post', methods=["POST"])
def buscar_un_post():
    id = request.json["id"]
    resultado = crud_publiciones.Leer_un_post(id)
    return jsonify(resultado), 200    

# Actualizar usuario
@app.route('/actualizar', methods = ["POST"])
def metodoactualizar():
    email = request.json["email"]
    pwd = request.json["password"]
    name = request.json["name"]
    gener = request.json["gener"]
    username = request.json["username"]

    resultado = crud_usuarios.updateUser(email, pwd, name, gener, username)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200


# Actualizar post
@app.route('/actualizarpost', methods = ["POST"])
def metodoactualizarpost():
    id = request.json["id"]    
    tipo = request.json["tipo"] 
    url = request.json["url"] 
    date = request.json["date"] 
    category = request.json["category"] 
    likes = request.json["likes"] 
    author = request.json["author"] 

    resultado = crud_publiciones.updatepost(id,tipo, url,date,category,likes,author)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200

# Actualizar like
@app.route('/actualizarlike', methods = ["POST"])
def metodoactualizarlike():
    id = request.json["id"]    
    
    resultado = crud_publiciones.updatepost(id)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200

# Eliminar usuario
@app.route('/eliminar',methods=["DELETE"])
def eliminar():
    email = request.json["email"]
    resultado = crud_usuarios.eliminarUsuario(email)
    return jsonify({"mensaje":resultado}), 200

# Eliminar post
@app.route('/eliminarpost',methods=["DELETE"])
def eliminarpost():
    id = request.json["id"]
    resultado = crud_publiciones.eliminarposts(id)
    return jsonify({"mensaje":resultado}), 200
 

# Carga masiva usuarios
@app.route('/usuarios/carga-masiva', methods=["POST"])
def cargaMasiva():
    usuarios = request.json["usuarios"]
    resultado = crud_usuarios.cargaMasiva(usuarios)
    if resultado == "OK":
        return jsonify({"data": crud_usuarios.Read_all_users(), "mensaje": "OK"}), 200
    else:
        return jsonify({"mensaje": "Hubo un error en la carga masiva"}), 400

# Carga masiva post
@app.route('/post/carga-masivai', methods=["POST"])
def cargaMasivaposti():
    images = request.json["images"]
    resultado = crud_publiciones.cargaMasiva(images)
    

    if resultado == "OK":
        return jsonify({"data": crud_publiciones.Read_all_posts(), "mensaje": "OK images"}), 200
    else:
        return jsonify({"mensaje": "Hubo un error en la carga masiva"}), 400

@app.route('/post/carga-masivav', methods=["POST"])
def cargaMasivapostv():
    videos = request.json["videos"]
    resultado = crud_publiciones.cargaMasiva(videos)
    

    if resultado == "OK":
        return jsonify({"data": crud_publiciones.Read_all_posts(), "mensaje": "OK videos"}), 200
    else:
        return jsonify({"mensaje": "Hubo un error en la carga masiva"}), 400
#ruta por defecto
@app.route('/', methods=["GET"])
def Raiz():
    return jsonify({"mensaje":"Servidor Levantado"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=4000)