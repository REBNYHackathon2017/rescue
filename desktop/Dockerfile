FROM node
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

CMD PORT=3001 npm run start