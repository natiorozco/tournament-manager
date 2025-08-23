# Taller #1 Bases de Datos II

**Isaac Villalobos Bonilla**  
**Carlos Abarca Apellido**  
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


