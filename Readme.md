# Usando MongoDB

Realizando funciones que se puedan ejectuar en consola, utilizando comando de mongoShell

## Acciones a Realizar

-   Cree una base de datos llamada 'my_first_db'.
-   Crear colección de estudiantes.
-   Cada documento que inserte en esta colección debe tener el siguiente formato:({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
-   Crea 5 estudiantes con la información adecuada.
-   Consigue todos los estudiantes.
-   Recupera a todos los estudiantes que son de California (San Jose Dojo) o Washington (Seattle Dojo).
-   Obten todos los estudiantes cuyo número de la suerte sea mayor que 3
-   Obten todos los estudiantes cuyo número de la suerte sea menor o igual a 10
-   Obten todos los estudiantes cuyo número de la suerte esté entre 1 y 9 (inclusive)
-   Agrega un campo a cada colección de estudiantes llamado 'intereses' que es un ARRAY. Debe contener las siguientes entradas: 'codificación', 'brunch', 'MongoDB'. Haz esto en UNA operación.
-   Agrega algunos intereses únicos para cada estudiante en particular en cada una de sus matrices de intereses.
-   Agrega los 'impuestos' de intereses a la matriz de intereses de alguien.
-   Elimina los intereses de 'impuestos' que acaba de agregar.
-   Eliminar a todos los estudiantes que son de California.
-   Eliminar a un alumno por su nombre.
-   Retira a un estudiante cuyo número de la suerte sea mayor que 5 (SOLO UNO)
-   Agrega un campo a cada colección de estudiantes llamado 'number_of_belts' y configúralo en 0.
-   Incrementa este campo en 1 para todos los estudiantes en Washington (Seattle Dojo).
-   Cambia el nombre del campo 'number_of_belts' a 'belts_earned'
-   Elimina el campo 'lucky_number'.
-   Agrega un campo 'updated_on' y establece el valor como la fecha actual.
