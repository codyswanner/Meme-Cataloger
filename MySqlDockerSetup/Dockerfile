# syntax=docker/dockerfile:1

FROM mysql:8

ENV MYSQL_ROOT_PASSWORD = "yeet"

COPY ./MySQL-Setup-Script.sql /docker-entrypoint-initdb.d/

