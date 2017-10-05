ARG MONGODB_URL
#ARG GA_ID
FROM google/nodejs

LABEL maintainer="ekl@ntu.im"

ADD . /var/www/
WORKDIR /var/www/
RUN npm install --silent

ENV MONGODB_URL=${MONGODB_URL}
#ENV GA_ID=${GA_ID}


CMD []
ENTRYPOINT ["node", "app.js"]
