# 🚀 Requisitos

- [Node.js](https://nodejs.org)  
- npm (se instala junto con Node.js)  
- [Git](https://git-scm.com/downloads)  

---

# ▶️ Cómo correr el proyecto

### 1. Instalar **npm** (a través de Node.js)  

- **Windows 10**:  
  Ve a [nodejs.org/en/download](https://nodejs.org/en/download) y descarga el instalador `Windows Installer (.msi)`.

- **Linux**:  
  Abre una terminal y ejecuta:  

  ```sh
  # Instala nvm:
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

  # Carga nvm sin reiniciar la shell:
  \. "$HOME/.nvm/nvm.sh"

  # Instala Node.js:
  nvm install 22

  # Verifica la versión de Node:
  node -v   # Ejemplo: v22.20.0

  # Verifica la versión de npm:
  npm -v    # Ejemplo: 10.9.3
  ```

Ahora ya tienes `npm` funcionando.  

---

### 2. Instalar **Git**

Descarga e instala Git desde:  
👉 [git-scm.com/downloads](https://git-scm.com/downloads)  

(O puedes descargar el ZIP del repositorio si no quieres usar Git).  

---

### 3. Clonar el repositorio

```sh
git clone URL_DEL_REPO
cd NOMBRE_DEL_REPO
```

---

### 4. Instalar dependencias

Con tu gestor de paquetes preferido (ejemplo `npm`):  

```sh
npm install
```

---

### 5. Correr la app en Android

```sh
npm run android
```

> ⚠️ Debes tener tu celular conectado por **USB** con el **USB debugging** activado.  

---

# 🧪 Cómo ejecutar tests

1. Instala y configura Jest siguiendo la guía oficial de Expo:  
   👉 [Unit Testing con Jest](https://docs.expo.dev/develop/unit-testing/)

2. Ejecuta los tests:  

```sh
pnpm test
```

---

# 🏗️ Decisiones arquitectónicas

- **Paginación**: Implementada con *infinite scroll* usando la prop `onEndReached` de `FlatList`.  
- **Búsqueda**:  
  - Usuarios: búsqueda por `username` o `name`.  
  - Posts: búsqueda por `title`.  
- **Orden**: Orden ascendente/descendente en Posts usando `.sort()` y `toLocaleCompare()`.  
  - *Nota*: El `Picker` tiene un bug visual, no pude cambiar el color de la opción seleccionada sin afectar el modal.  
- **Testing**: Implementé 2 unit tests. Al inicio hubo errores con Babel/Jest (posible incompatibilidad de versiones), pero luego funcionó correctamente.  
- **Favoritos**:  
  - Usé **React Native MMKV** + un pequeño Context para manejar cambios en la UI.  
  - Otra alternativa más elegante sería un **hook personalizado** que actúe como `useState()` pero persistente, con tipado y sincronización automática con la UI. Ejemplo:  

    ```js
    const [storage, setStorage] = useStorage()
    ```

---

# 📸 Capturas

### 🔎 Búsqueda de usuarios
![giphy](https://github.com/user-attachments/assets/ede01367-d987-4acb-9683-e820f0b8c4be)

### 📝 Posts
![giphy](https://github.com/user-attachments/assets/4852b68d-4153-41ed-8181-3be7ed8d5b7c)  
![giphy](https://github.com/user-attachments/assets/64c9154a-4e10-40c9-b350-3184213599a8)

### ⭐ Favoritos
![giphy](https://github.com/user-attachments/assets/bfb517c3-d2bb-4562-91c7-e36d48f59cea)
