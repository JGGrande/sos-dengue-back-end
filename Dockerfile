FROM node:20.13.0

RUN apt-get update -y
RUN apt-get install -y build-essential libpq-dev
RUN apt-get install -y openssl
RUN npm install -g yarn --force

WORKDIR /home/root/app

COPY . .

RUN yarn install --force

RUN if [ -d "dist" ]; then rm -r dist; fi

RUN yarn build

CMD if [ "$NODE_ENV" = "homologacao" ] || [ "$NODE_ENV" = "production" ]; then \
  yarn start ; \
  else \
  yarn start:dev ; \
  fi