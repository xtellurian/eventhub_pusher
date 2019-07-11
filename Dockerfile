FROM node:11

COPY package.json .

RUN npm install

COPY . .

CMD [ "node", "indes.js" ]
