# FROM node:16 
# EXPOSE 3001 
# WORKDIR /src 
# RUN npm install i npm@latest -g 
# COPY package*.json ./
# COPY prisma ./prisma/ 
# RUN npm install 
# COPY . .  
# CMD ["npm", "run", "dev"]
