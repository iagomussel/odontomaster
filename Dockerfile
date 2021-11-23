FROM nginx

WORKDIR /var/www


#install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs git yarn

#install pm2 sequelize
RUN yarn global add pm2 sequelize-cli

COPY ./start.sh /tmp/start.sh
COPY app/package.json app/
COPY api/package.json api/

RUN yarn --cwd app &&\
    yarn --cwd api &&\
    yarn --cwd app build

COPY ./app ./app
COPY ./api ./api

RUN chmod +x /tmp/start.sh

CMD ["/tmp/start.sh"]