FROM node:9.6.1

RUN mkdir /usr/src/todolist
WORKDIR /usr/src/todolist

ENV PATH /usr/src/todolist/node_modules/.bin:$PATH

COPY package.json /usr/src/todolist/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g

CMD ["npm", "run", "build"]
