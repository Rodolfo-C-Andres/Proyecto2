# importando la 

from Publicacion import publicacion

class Crud_posts:

    def __init__(self):
        self.arreglo_post = []
     
    def Crear_post (self,tipo, url,date,category,author):
        id = len(self.arreglo_post)
        nuevo = publicacion(id,tipo, url,date,category,author)
        self.arreglo_post.append(nuevo)
        return id

    def Leer_un_post(self,id):
        for search_post in self.arreglo_post:
            if search_post.id == int(id):
                return search_post.retornar()
        return None
    
    def Read_all_posts (self):
        all_posts = []
        for post in self.arreglo_post:
            all_posts.append(post.retornar())
        return all_posts
    
    #def updatpost
    def updatelike(self,id):
        for post in self.arreglo_post:
            if post.id == int(id):
                post.likes += 1                
                return post.retornar()
        return None                  
    
    def updatepost(self,id,tipo, url,date,category,like,author):
        for post in self.arreglo_post:
            if post.id == int(id):
                post.tipo = tipo
                post.url = url
                post.date = date
                post.category = category
                post.likes = like
                post.author = author
                return post.retornar()
        return None
    
    # Eliminar post
    def eliminarposts(self, id):
        for post in self.arreglo_post:
            if post.id == int(id):
                self.arreglo_post.remove(post)
                return "ok"
        return "no"  

# Carga masiva 
    def cargaMasiva(self, posts_cm):
        if (len(self.arreglo_post)==0):
            for post_cm in posts_cm:
                self.Crear_post("images", post_cm['url'], post_cm['date'], post_cm['category'], post_cm['author'])
            return "OK"
        else:
            for post_cm in posts_cm:
                self.Crear_post("videos", post_cm['url'], post_cm['date'], post_cm['category'], post_cm['author'])
            return "OK" 