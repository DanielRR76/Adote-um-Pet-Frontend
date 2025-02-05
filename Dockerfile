# Etapa 1: Construção da imagem
FROM node:20 AS build

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o código da aplicação para o container
COPY . .

# Copiar o arquivo .env para dentro do container
COPY .env .env

# Construir a aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos de build para o diretório do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 para acesso ao conteúdo da aplicação
EXPOSE 80

# Iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
