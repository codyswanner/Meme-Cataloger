CREATE DATABASE IF NOT EXISTS memecataloger2;
CREATE USER "django" IDENTIFIED BY "wheeze";
GRANT ALL PRIVILEGES ON memecataloger2.* to "django";
FLUSH PRIVILEGES;

