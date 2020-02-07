create database cine;
use cine;
create table personas (
id int auto_increment not null primary key,
nombre char (150),
correo char(150),
clave char (150),
rol char(150)
);

create table peliculas (
id int auto_increment not null primary key,
resumen char(150),
categoria char (150),
valorBoleto char(150),
imagen text,
estado bool
);

create table horarios (
id int auto_increment not null primary key,
hora date
);

create table salas (
id int auto_increment not null primary key,
nombre char (150),
descripcion char(150),
idpelicula int,
foreign key (idpelicula) references peliculas(id),
idhorario int,
foreign key (idhorario) references horarios(id)
);

create table compras (
id int auto_increment not null primary key,
numero_boletos char(150),
idpersona int,
foreign key (idpersona) references personas(id),
idsala int,
foreign key (idsala) references salas(id)
);
