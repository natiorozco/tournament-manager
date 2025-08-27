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
## Guía de Inicio Rápido: Configuración del Proyecto

A continuación, se detallan los pasos necesarios para configurar y ejecutar el proyecto. Sigue las instrucciones en el orden indicado para asegurar una correcta instalación y conexión entre los servicios.

### 💻 Instalación de Dependencias

1.  **Instalar Angular CLI:**
    Para que la interfaz de usuario (UI) funcione correctamente y se carguen sus elementos, primero debemos instalar Angular CLI globalmente.
    ```bash
    npm i
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

3.  **Crear la red de Docker:**
    Crea una red interna para que los contenedores de la API/UI y Kafka puedan comunicarse entre sí dentro del entorno de Docker. Además hay que crear una partición y Topic.
    ```bash
    docker network create internal_net

    docker exec -it observer-kafka-1 kafka-topics --create --topic tournament-events --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

    docker exec -it observer-kafka-1 kafka-topics --list --bootstrap-server localhost:9092 // Sirve para darse cuenta si se creó el TOPIC correctamente
    ```

4.  **Iniciar el contenedor de Kafka:**
    Dentro de la carpeta `observer`, inicia los servicios de Docker definidos en `docker-compose.yml`.
    ```bash
    docker-compose up --build -d
    ```

5. ### 🔄 Reiniciar el Consumidor
    Como el consumidor se levanta al mismo tiempo que el **Broker** de Kafka, es necesario reiniciarlo para que se conecte correctamente una vez que el **Broker** esté completamente operativo.
    ```bash
    docker-compose restart node-app
    ```

6.  **Verificar la red y ver mensajes:**
    Hay que asegurar que Kafka esté corriendo dentro de la red que hemos creado. Además, para darnos cuenta que Kafka funciona correctamente tenemos que iniciar la consola para asegurarnos con el mensaje de confirmación entonnces iniciamos una terminal y la dejamos reportando.
    ```bash
    docker network inspect internal_net
    docker logs -f <id del contenedor>
    ```

7. **Iniciar API/UI**
   Dentro de la carpeta principal, osea la raíz, ejecutamos el siguiente comando solo si ya está inicializado el Kafka.
   ```bash
    docker-compose up --build -d
    ```

8. **Probar con Postman**
   Abrimos Postman para probar las funcionalidades de Kafka y la inserción de torneos, para eso utilizamos el siguiente comando para dejar las dos consolas de los contenedores listas:
   ```bash
    docker-compose logs -f <id del contenedor>
    ```
   Ahora mediante la siguiente dirección enviamos el JSON respectivo:

   http://localhost:3000/upload-data

   ```json
    [
     {
       "title": "Senior Avanzados Hombres",
       "type": "single_elimination",
       "roster": [
         {
           "id": 93,
           "name": "93 - [Karate Patito] Juan Perez",
           "weight": 83,
           "age": 45
         },
         {
           "id": 94,
           "name": "94 - [Karate los pollitos] Pedro Picapiedra",
           "weight": 82,
           "age": 44
         }
       ]
     }
   ]
    ```
---



