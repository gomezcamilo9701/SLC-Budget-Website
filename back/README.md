mvn clean package

docker-compose up

Teniendo postgres instalado en la pc pueden acceder rapidamente por medio del cmd a el contenedor de la base de datos
con este comando:

docker exec -it slc_budget_db  psql -U postgres -d postgres

\dt -> ver las tablas

SELECT * FROM users; -> ver usuarios

***
RECORDAR

Primero registrar un usuario, luego hacer el login con el username y password
copiar el token en Authorization/Type/BearerToken 