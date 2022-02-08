
-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: --- Donatien Dinyad Yeto


-- L'éxecuter dans la base centralemeteo




-- Création de l'hypertable mesures
-- -----------------------------------

-- object: public.mesures | type: TABLE --
-- DROP TABLE IF EXISTS public.mesures CASCADE;
CREATE TABLE public.mesures (
	recordno serial NOT NULL,
	recordtime timestamp  WITH TIME ZONE NOT NULL,
	valeur numeric NOT NULL,
	id_sortie serial NOT NULL
);

-- ddl-end --

 
-- Création table user
-- ---------------------------

-- object: public.user | type: TABLE --
-- DROP TABLE IF EXISTS public.user CASCADE;
CREATE TABLE public.user (
	id serial NOT NULL,
	email varchar NOT NULL,
	passwordhash varchar NOT NULL,
	isAdmin boolean default false,
	isUser boolean default false,
	CONSTRAINT user_pk PRIMARY KEY (id)

);	
-- ddl-end --




 
-- Création table capteur
-- ---------------------------

-- object: public.capteur | type: TABLE --
-- DROP TABLE IF EXISTS public.capteur CASCADE;
CREATE TABLE public.capteur (
	nom varchar NOT NULL,
	description text NOT NULL,
	CONSTRAINT capteur_pk PRIMARY KEY (nom)

);	
-- ddl-end --





-- Création table tables
-- ---------------------------

-- object: public.tables | type: TABLE --
-- DROP TABLE IF EXISTS public.tables CASCADE;
CREATE TABLE public.tables (
	id serial NOT NULL,
	nom varchar NOT NULL,
	description varchar NOT NULL,
	auteur serial REFERENCES public.user(id),
	periode  numeric NOT NULL,
	CONSTRAINT tables_pk PRIMARY KEY (id)
);
-- ddl-end --


-- Création table parametre
-- ---------------------------

-- object: public.parametre | type: TABLE --
-- DROP TABLE IF EXISTS public.parametre CASCADE;
CREATE TABLE public.parametre (
	id serial NOT NULL,
	id_table serial REFERENCES public.tables(id),
	sortie varchar NOT NULL,
	fonction varchar NOT NULL,
	CONSTRAINT parametre_pk PRIMARY KEY (id)

);
-- ddl-end --




-- Création table user-table
-- ---------------------------

-- object: public.user_table | type: TABLE --
-- DROP TABLE IF EXISTS public.user_table CASCADE;
CREATE TABLE public.user_table (
	id serial NOT NULL,
	user_id serial REFERENCES public.user(id),
	table_id serial REFERENCES public.tables(id),
	
	CONSTRAINT user_table_pk PRIMARY KEY (id)

);
-- ddl-end --


-- Créaction de la table sortie
-- ------------------------------------

-- object: public.sortie | type: TABLE --
-- DROP TABLE IF EXISTS public.sortie CASCADE;
CREATE TABLE public.sortie (
	id serial NOT NULL,
	nom_sortie varchar NOT NULL,
	unite varchar NOT NULL,
	valeur_min numeric NOT NULL,
	valeur_max numeric NOT NULL,
	nom_capteur varchar NOT NULL,
	CONSTRAINT sortie_pk PRIMARY KEY (id)

);
-- ddl-end --





-- object: capteur_fk | type: CONSTRAINT --
-- ALTER TABLE public.sortie DROP CONSTRAINT IF EXISTS capteur_fk CASCADE;
ALTER TABLE public.sortie ADD CONSTRAINT capteur_fk FOREIGN KEY (nom_capteur)
REFERENCES public.capteur (nom) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: sortie_fk | type: CONSTRAINT --
-- ALTER TABLE public.mesures DROP CONSTRAINT IF EXISTS sortie_fk CASCADE;
ALTER TABLE public.mesures ADD 	CONSTRAINT sortie_fk FOREIGN KEY (id_sortie)
REFERENCES public.sortie (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --
