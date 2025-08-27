# Taller #1 Bases de Datos II

**Isaac Villalobos Bonilla**  
**Carlos Abarca Mora**  
**Dilan Hernández Sánchez**  
**Natalia Orozco Delgado**

---

## Para levantar todo

Desde la raíz del proyecto se corre:
```bash
chmod +x start-all.sh
./start-all.sh
```

---

O manualmente:

1. Meterse a la carpeta de API y UI y correr:
   ```bash
   docker-compose build
   docker-compose up -d
   ```
2. Meterse a la carpeta del observer y correr:
   ```bash
   docker-compose build
   docker-compose up
   ```

---

## Para comprobar la conexión con mongo

```bash
docker exec -ti tournament-designer-db bash
mongosh
```

Se puede probar con: (por ejemplo)
```bash
show dbs
```

---
## 🚀 Guía de Inicio Rápido: Configuración del Proyecto

A continuación, se detallan los pasos necesarios para configurar y ejecutar el proyecto. Sigue las instrucciones en el orden indicado para asegurar una correcta instalación y conexión entre los servicios.

### 💻 Instalación de Dependencias

1.  **Instalar Angular CLI:**
    Para que la interfaz de usuario (UI) funcione correctamente y se carguen sus elementos, primero debemos instalar Angular CLI globalmente.
    ```bash
    npm install -g @angular/cli
    ```

2.  **Instalar dependencias del observador:**
    Navega a la carpeta `observer` e instala las dependencias del proyecto, incluyendo `kafkajs`.
    ```bash
    cd Torneos\observer
    npm i
    npm install kafkajs
    ```

---

### 🌐 Configuración de la Red y Docker

1.  **Crear la red de Docker:**
    Crea una red interna para que los contenedores de la API/UI y Kafka puedan comunicarse entre sí dentro del entorno de Docker.
    ```bash
    docker network create internal_net
    ```

2.  **Verificar la red:**
    Asegúrate de que todos los contenedores se estén ejecutando en la misma red.
    ```bash
    docker network inspect internal_net
    ```
    Este comando te mostrará los detalles de la red, incluyendo los contenedores conectados.

3.  **Iniciar el contenedor de Kafka:**
    Dentro de la carpeta `observer`, inicia los servicios de Docker definidos en `docker-compose.yml`.
    ```bash
    docker-compose up --build -d
    ```

---

### 🔄 Reiniciar el Consumidor

1.  **Reiniciar la aplicación del observador:**
    Como el consumidor se levanta al mismo tiempo que el **Broker** de Kafka, es necesario reiniciarlo para que se conecte correctamente una vez que el **Broker** esté completamente operativo.
    ```bash
    docker-compose restart node-app
    ```

