FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
CMD ["npm", "run", "start"]
