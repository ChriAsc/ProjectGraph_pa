FROM node:lts-stretch-slim

WORKDIR usr/src/app
COPY . .
RUN npm install
RUN tsc
CMD ["node", "index.js"]