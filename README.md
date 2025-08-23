# Taller #1 Bases de Datos II

**Isaac Villalobos Bonilla**  
**Carlos Abarca Apellido**  
**Dilan Apellido Apellido**  
**Natalia Orozco Delgado**

---

## Para levantar todo

Desde la raíz:
```bash
chmod +x start-all.sh
./start-all.sh
```

---

O bien, manualmente:

1. Métete a la carpeta de API y UI y corre:
   ```bash
   docker-compose build
   docker-compose up -d
   ```
2. Después, métete a la carpeta del observer y corre:
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

Se puede probar con:
```bash
show dbs
```


