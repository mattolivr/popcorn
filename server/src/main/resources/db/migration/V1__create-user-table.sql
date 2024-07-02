CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL,
    display_name VARCHAR(70) NOT NULL,
    email VARCHAR(120) NOT NULL,
    birth TIMESTAMP NOT NULL,
    img_profile VARCHAR(150) NULL,
    img_background VARCHAR(150) NULL
);