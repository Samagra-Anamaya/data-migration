FROM node:16 AS builder

# Create app directory
WORKDIR /app

# copy dependency files
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
# Required if not done in postinstall
# RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY ./details.xlsx ./details.xlsx

EXPOSE 3000
CMD ["/bin/sh", "-c", "npm run start:migrate:prod;"]