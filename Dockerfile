FROM nginx

WORKDIR /var/www

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs git

RUN npm install -g pm2 sequelize-cli serve

COPY ./start.sh /tmp/start.sh
COPY app/package.json app/

# Install app dependencies
RUN npm install --prefix app

COPY ./app ./app

COPY api/package.json api/

RUN npm install --prefix api

COPY ./api ./api

RUN npm run build --prefix app

CMD ["/tmp/start.sh"]