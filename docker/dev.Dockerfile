FROM node:8.11-alpine

#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN npm i -g @angular/cli --unsafe\
  && npm i -g typescript --unsafe

WORKDIR /ng-app

# COPY package.json /ng-app/
# RUN npm install

COPY ./ /ng-app/

CMD ["sh", "init.sh"]
# CMD ["npm", "start"]
