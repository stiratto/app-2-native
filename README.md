# Requisitos:
- Node.js
- npm
- git


# Como correr el proyecto?
Primero, necesitas un gestor de paquetes, el más famoso es `npm`.
Para instalar npm, primero necesitas instalar Node.
Ve a https://nodejs.org/en/download y en la parte de abajo, descarga el `Windows Installer (.msi)` si estas en Windows 10, o si estas en Linux, abre una terminal y copia esto:

```sh
# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# en lugar de reiniciar la shell
\. "$HOME/.nvm/nvm.sh"

# Descarga e instala Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.20.0".

# Verifica versión de npm:
npm -v # Debería mostrar "10.9.3".

```
Después de hacer eso, si haces `npm -v` en una consola te deberia decir la versión de tu gestor de paquetes.

También necesitas Git para clonar el repositorio (puedes descargar el ZIP directamente si no quieres usar git).
Ve a https://git-scm.com/downloads, selecciona tu plataforma y completa el proceso de instalación. 

Ahora, abre una terminal (puede ser cmd o powershell, la de tu preferencia) y clona el repositorio
`git clone URL`.

Despues de clonar o descargar el repositorio, accede a la carpeta y:
Con tu gestor de paquetes preferido, instala los paquetes, ej: `npm i`.
Despues, puedes usar `npm run android` para correr el proyecto en el dispositivo Android (debes habilitar el USB debugging en tu celular y conectarlo por USB a tu  PC).

Listo! Ya tienes la app corriendo.

# Como ejecutar tests
Para ejecutar tests, necesitas instalar y configurar Jest en tu proyecto Expo, puedes seguir el tutorial oficial de Expo para Unit Testing con Jest: https://docs.expo.dev/develop/unit-testing/

Despues que todo esté bien configurado, puedes usar `pnpm test`.

## Decisiones arquitectónicas
- Paginación: Para la paginación en la vista de Posts, empleé un infinite scroll aprovechando la prop onEndReached de la FlatList.

- Búsqueda: La lista de usuarios y posts cuenta con una búsqueda por query, en el caso de usuarios, se puede buscar un usuario por su username y por su name.

- Orden: En la vista de Posts, implementé una ordenacion por orden ascendente y descendente utilizando `.sort()` y `toLocaleCompare()`. Tiene un pequeño error en la UI debido a que el `Picker` que utilicé no logro poder cambiarle el color a la opción seleccionada sin cambiarselo también a las opciones del modal, esto causa que las opciones del modal no se puedan ver fácilmente.

- Testing: Para la parte de testing hice 2 unit tests, al principio tuve errores con Babel y Jest y variedad de otras cosas pero al otro día ya funcionaba con normalidad, quizá eran errores de compatibilidad entre versiones.

- Favoritos: Respecto a la funcionalidad de favoritos, opté por usar React Native MMVK y un contexto pequeño para manejar cambios en la UI ya que MMVK no trae consigo una manera facil de actualizar UI, no hay acceso a un estado reactivo que nos permita manejar cambios en la UI fluidamente. Aparte de usar un Context, puede haber otra manera: un hook personalizado que actue como un `useState()` y que nos permita acceder al storage persistente pero con tipados, como tambien modificar el storage y que los cambios se reflejen en la UI inmediatamente. Ejemplo de uso:

```js
const [storage, setStorage] = useStorage() 
````

Esta solucion también nos permitiria acceder por keys específicas del storage. Es una solución más tardada si se implementa correctamente y tipado, por eso no la implementé.

## Captures
### Busqueda de usuarios:
- ![giphy](https://github.com/user-attachments/assets/43a0f03c-9821-41ab-a3db-61e680a6e18e)

### Posts:
- ![giphy](https://github.com/user-attachments/assets/dc0e7202-b15a-4cd5-9e7c-c775ea967a75)
- ![giphy](https://github.com/user-attachments/assets/e827d7c2-9956-4383-a368-5c9905ce52f5)

### Favoritos:
- ![giphy](https://github.com/user-attachments/assets/f1a58065-2d19-492f-92f4-3a9c693b10d4)



