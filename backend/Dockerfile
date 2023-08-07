FROM node:lts-bullseye-slim
EXPOSE 4000
EXPOSE 3000

COPY ./dist /dist
COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json
COPY ./src/prisma /src/prisma/
COPY ./.env.dockercompose /.env

RUN npm install
RUN npx prisma generate
CMD ["bash", "-c", "npx prisma migrate deploy && node dist/src/api/index.js"]
