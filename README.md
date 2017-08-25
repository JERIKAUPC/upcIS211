# INSTALACIÓN

## En local
```
$ git clone https://github.com/oscarpasache/upcIS211.git
$ cd upcIS211/
```

## En Cloud9
- Entrar a la web de c9.io
- Iniciar sesión y asociar su cuenta github con la de C9
- Una vez completado en el dashboard de C9 ingresar a la opción __repositories__
- Ahi deberia salir todos los repositorios que tienen en su cuenta de GITHUB incluido el repositorio __upcIS211__
- Click en __clone to edit__
- Completar el formulario, pero se deben fijar si el campo __Clone from Git or Mercurial URL__ esta lleno, ejemplo (git@github.com:oscarpasache/upcIS211.git)
- Una verificado que todos los datos están completos le damos click en __Create workspace__

# Primeros pasos
Luego de clonado el repositorio, ya sea en local o en C9, debemos ejecutar lo siguiente en la consola
```
$ bundle install
```
En local para correr el proyecto se debe hacer con el siguiente comando
```
$ Rails server
```
Por defecto la url es http://localhost:3000

# Enviar cambios al servidor de GITHUB
## Preparar envio
```
$ git status
$ git add .
$ git commit -m "NOMBRE DE LA TAREA REALIZADA"
```
## Actualizar repositorio
Antes de enviar cualquier cambios al servidor primero debemos actualizar nuestro proyecto con los ultimos cambios
```
$ git fetch --all
$ git pull origin master
```
## Enviar cambios a GITHUB
```
$ git push origin master
```
