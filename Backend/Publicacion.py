class publicacion:
    def __init__(self,id,tipo, url,date,category,author):
        self.id = id
        self.tipo = tipo
        self.url = url
        self.date = date
        self.category = category
        self.likes = 0
        self.author = author

    def retornar(self):
        return {
            'id':self.id,
            'tipo':self.tipo,
            'url':self.url,
            'date':self.date,
            'category':self.category,
            'likes':self.likes,
            'author':self.author
        }

    def getNombre(self):
        return self.nombre
    
    def getCorreo(self):
        return self.correo
    
    def Actualizar_nombre(self,nuevonombre):
        self.nombre=nuevonombre