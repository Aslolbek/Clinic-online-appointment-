CREATE DATABASE klinika;

\c klinika;


CREATE TABLE mijozlar(
    id SERIAL PRIMARY KEY not null, 
    ism varchar,
    familiya varchar,
    yosh varchar,
    tel varchar,
    password varchar,
    create_at timestamp with time zone Default CURRENT_TIMESTAMP
);

CREATE TABLE clinikalar(
    id SERIAL PRIMARY KEY not null, 
    Clinika_nomi varchar,
    create_at timestamp with time zone Default CURRENT_TIMESTAMP

);

 INSERT INTO clinikalar(Clinika_nomi)
  VALUES('MEDPlus');
  
CREATE TABLE xizmatlar(
    id SERIAL PRIMARY KEY not null,
     xizmat_nomi varchar,
     xizmat_narxi integer,
     Clinika_id integer,
     FOREIGN KEY (Clinika_id) REFERENCES clinikalar(id),
     create_at timestamp with time zone Default CURRENT_TIMESTAMP
);

INSERT INTO xizmatlar(xizmat_nomi, xizmat_narxi, Clinika_id)
Values('lor', '50', 1);
INSERT INTO xizmatlar(xizmat_nomi, xizmat_narxi, Clinika_id)
Values('stamatalog', '50', 2);

CREATE TABLE shifokorlar(
    id SERIAL PRIMARY KEY not null,
     Clinika_id integer,
     FOREIGN KEY (Clinika_id) REFERENCES clinikalar(id),
     ism varchar,
     familiya varchar,
     tel varchar,
     rasm varchar,
     mutaxasisligi varchar,
     xizmat_id integer,
     FOREIGN KEY (xizmat_id) REFERENCES xizmatlar(id),
     ish_vaqti varchar,
     ish_kuni varchar,
     malakasi varchar,
     xona varchar,
     etaj varchar,
     create_at timestamp with time zone Default CURRENT_TIMESTAMP

);

insert into shifokorlar(Clinika_id, ism, familiya, tel, rasm, mutaxasisligi, ish_vaqti, ish_kuni, malakasi, xona, etaj)
values(2, 'lor12', 'lor2', '999999999', 'rasim', 'logopet', '9:30  16:00', 'dushanba', '3 yil', '2-xona', '2-etaj');





CREATE TABLE navbat(
    id SERIAL PRIMARY KEY not null,
    shifokor_id integer,
    FOREIGN KEY (shifokor_id) REFERENCES shifokorlar(id),
    mijoz_id integer,
    FOREIGN KEY (Mijoz_id) REFERENCES mijozlar(id),
    status varchar(20),
    create_at timestamp with time zone Default CURRENT_TIMESTAMP
);

insert into navbat(shifokor_id, mijoz_id, status) Values(13,9, 'false');


CREATE TABLE tashxislar(
    id SERIAL PRIMARY KEY not null,
    mijoz_id integer,
    FOREIGN KEY (mijoz_id) REFERENCES mijozlar(id),
    shifokor_id integer,
    FOREIGN KEY (shifokor_id) REFERENCES shifokorlar(id),
    tashxis text,
    create_at timestamp with time  zone Default CURRENT_TIMESTAMP
);  

INSERT INTO tashxislar(mijoz_id, shifokor_id, tashxis) Values (1, 13, 'yotal');

