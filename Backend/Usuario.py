class Usuario:
    def __init__(self,id, email,password,name,gener,name_user):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.gener = gener
        self.username = name_user

    def retornar(self):
        return {
            'id':self.id,
            'email':self.email,
            'password':self.password,
            'name':self.name,
            'gener':self.gener,
            'username':self.username
        }

    def getname(self):
        return self.name
    
    def getemail(self):
        return self.email
    
    def Actualizar_name(self,nuevoname):
        self.name=nuevoname