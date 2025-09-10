CREATE TABLE "users" (
    "id"            UUID PRIMARY KEY,
    "username"      VARCHAR(17) NOT NULL UNIQUE,
    "permission"   SMALLINT NOT NULL
);
