FROM node:23-alpine

WORKDIR /src/app

COPY package.json package-lock.json* ./

RUN pnpm install 
COPY . .

RUN npx tsc -b

EXPOSE 5000

CMD [ "node","dist/index.js" ]

# docker run -p --env-file 5000:5000 imagesname

