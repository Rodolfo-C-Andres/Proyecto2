# importando la 

from Usuario import Usuario

class Crud_Users:

    def __init__(self):
        self.arreglo_user = []
    
    def Crear_User (self, email,password,name,gener,username):
        id = len(self.arreglo_user)
        nuevo = Usuario(id,email,password,name,gener,username)
        self.arreglo_user.append(nuevo)
        return id

    def Leer_un_usuario(self,email):
        for search_user in self.arreglo_user:
            if search_user.email == email:
                return search_user.retornar()
        return None
    
    def Read_all_users (self,):
        all_users = []
        for user in self.arreglo_user:
            all_users.append(user.retornar())
        return all_users
    
    #def updatUser (self,email, password, name, gener, username)
    def updateUser(self,email,password,name,gener,username):
        for usuario in self.arreglo_user:
            if usuario.email == email:
                usuario.email = email
                usuario.password = password
                usuario.name = name
                usuario.gener = gener
                usuario.username = username
                return usuario.retornar()
        return None
     
    def login(self, email, password):  
        if len(self.arreglo_user)==0:
            id = len(self.arreglo_user) 
            nuevo = Usuario(id,"admin@ipc1.com","admin@ipc1","Javier Alejandro Golón López","Maculino","admin")
            self.arreglo_user.append(nuevo) 
                  
        for usuario in self.arreglo_user:
            if usuario.email == email and usuario.password == password:                 
                return usuario.retornar()
        return None
             

# Eliminar usuario
    def eliminarUsuario(self, email):
        for usuario in self.arreglo_user:
            if usuario.email == email:
                self.arreglo_user.remove(usuario)
                return "ok"
        return "no"  

# Carga masiva
    def cargaMasiva(self, usuarios_cm):
        for usuario_cm in usuarios_cm:
            self.Crear_User(usuario_cm['email'], usuario_cm['password'], usuario_cm['name'], usuario_cm['gener'],usuario_cm['username'])
        return "OK"

 