# Como correr el proyecto?

Despues de clonar el repositorio, accede al directorio que dejó el git clone y:
Con tu gestor de paquetes preferido, instala los paquetes, ej: `pnpm i`.
Despues, puedes usar `pnpm android` para correr el proyecto en el dispositivo Android.

# Como ejecutar tests
Para ejecutar tests, necesitas instalar y configurar Jest en tu proyecto Expo, puedes seguir el tutorial oficial de Expo para Unit Testing con Jest: https://docs.expo.dev/develop/unit-testing/

Despues que todo esté bien configurado, puedes usar `pnpm test`.

## Decisiones arquitectónicas
- Paginación: Para la paginación en la vista de Posts, empleé un infinite scroll aprovechando la prop onEndReached de la FlatList. No se nota casi el fetch que ocurre al entrar en el threshold del end reached.

- Búsqueda: La lista de usuarios y posts cuenta con una búsqueda por query, en el caso de usuarios, se puede buscar un usuario por su username y por su name.

- Orden: En la vista de Posts, implementé una ordenacion por orden ascendente y descendente utilizando .sort() y toLocaleCompare(). Tiene un pequeño error en la UI debido a que el `Picker` que utilicé no logro poder cambiarle el color a la opción seleccionada sin cambiarselo también a las opciones del modal, esto causa que las opciones del modal no se puedan ver fácilmente.

- Testing: Para la parte de testing hice 2 unit tests, al principio tuve errores con Babel y Jest y variedad de otras cosas pero al otro día ya funcionaba con normalidad, quizá eran errores de compatibilidad entre versiones.

## Captures
Busqueda de usuarios:
![giphy](https://github.com/user-attachments/assets/43a0f03c-9821-41ab-a3db-61e680a6e18e)

Posts:
![giphy](https://github.com/user-attachments/assets/dc0e7202-b15a-4cd5-9e7c-c775ea967a75)
![giphy](https://github.com/user-attachments/assets/e827d7c2-9956-4383-a368-5c9905ce52f5)

Favoritos:
![giphy](https://github.com/user-attachments/assets/f1a58065-2d19-492f-92f4-3a9c693b10d4)



