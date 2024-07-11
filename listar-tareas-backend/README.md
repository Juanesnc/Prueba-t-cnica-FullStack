# Requisitos previos
1. Composer
2. PHP 8.1 o más
3. Motor DB (MySQL, MariaDB o PostgreSQL)

# Instalación

1. acceder al archivo usando cd listar-tareas-backend
2. composer install
3. renombra .env.example a .env
4. crea una BD y cumplimenta sus variables en .env, entre estos datos se debe generar la clave secreta para firmar los tokens JWT mediante el codigo php artisan jwt:secret
5. php artisan migrate
6. levanta el servidor con php artisan serve
