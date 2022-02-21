FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
EXPOSE 3000
EXPOSE 3306
CMD ["npm", "run", "start"]
