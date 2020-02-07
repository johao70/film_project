create database cine;
use cine;
create table personas(id int auto_increment not null primary key, nombre varchar(150), correo varchar(150), clave varchar(150));

create table peliculas(id int auto_increment not null primary key, titulo varchar(150), resumen varchar(150), categoria char (150), valorBoleto char(150), 
imagen text, estado boolean);

create table horarios(id int auto_increment not null primary key, hora date);

create table salas(id int auto_increment not null primary key, nombre varchar(150), descripcion varchar(150), 
idpelicula int, foreign key (idpelicula) references peliculas(id),
idhorario int, foreign key (idhorario) references horarios(id));

create table compras(id int auto_increment not null primary key, numero_boletos varchar(150), idpersona int, foreign key (idpersona) references personas(id),
idsala int, foreign key (idsala) references salas(id));
insert into personas values(1,'admin','admin@gmail.com','1234');