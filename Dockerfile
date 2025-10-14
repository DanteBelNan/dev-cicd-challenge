FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm ci --omit=dev

COPY --chown=node:node ./backend ./backend

EXPOSE 3001

CMD ["node", "backend/server.js"]