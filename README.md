# schoolplatform


-http://localhost:8080/see          -> se ve la colección de datos completa.
-http://localhost:8080/see/:id      -> se puede buscar al estudiante segun el id ingresado en :id
-http://localhost:8080/search/:name -> se puede buscar al estudiante segun el nombre
                                      (first_name o second_name) ingresado en :name 
 
-http://localhost:8080/create -> se puede crear un estudiante como se muestra en el modelo student.js

-http://localhost:8080/login  -> se "abre sesión del estudiante", chequeandose su mail y contraseña. 
|:
|->"email":"qwerty@gmail.com"-> (puede cambiarse segun los datos a subir en create)
|->"password":"idontknowmen" -> (puede cambiarse segun los datos a subir en create)
|->"remember":true  -> (true: guarda el dato en session/cookie false: no guarda los datos en session/cookie)
 
-http://localhost:8080/logout     -> se "cierra sesión del estudiante". 
-http://localhost:8080/edit/:id   -> se puede editar los datos de un estudiante segun el id ingresado en :id
-http://localhost:8080/delete/:id -> se puede borrar los datos de un estudiante segun el id ingresado en :id




