# Baseado em Nginx, que serve arquivos estáticos
FROM nginx:alpine

# Copiar arquivos estáticos para o Nginx
COPY . /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
