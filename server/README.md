# Realtime Chat - SERVIDOR

## Instalação e Uso

### Configuração do Banco de Dados MySQL com XAMPP

1. Inicie o XAMPP:

   > Certifique-se de que o XAMPP esteja instalado e em execução. Inicie o Apache e o MySQL no painel de controle do XAMPP.

2. Acesse o phpMyAdmin:

   > Abra o navegador da web e acesse o phpMyAdmin. O endereço padrão costuma ser http://localhost/phpmyadmin.

3. Criação do Banco de Dados:

   > No phpMyAdmin, clique em "Banco de dados" no menu superior e crie um novo banco de dados com o nome `chat_enterness_test`.

### Configuração do Projeto

1. Para instalar as dependências do servidor (back-end), navegue até a pasta "server":

   > Na raiz do projeto: `cd server` e em seguida `npm install` ou `yarn`

2. Crie um arquivo .env na raiz da pasta 'server' com os dados:

   `DB_HOST=mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com`<br/>
   `DB_USER=s7ujnjni8xsgc7z6`<br/>
   `DB_PASSWORD=mjwsdqm8jk64gnw1`<br/>
   `DB_NAME=t4j4s571cbfbzk2k`<br/>
   `DB_PORT=3306`<br/>
   `SERVER_PORT=5000` <br/>
   `CLIENT_URL=http://localhost:5173` <br/>
   `SECRET_TOKEN_KEY=A1B2C3D4E5F6G7H8I9J0`

3. Inicie o servidor de desenvolvimento:

   > Dentro da pasta 'server': `npm run dev` ou `yarn dev`

4. Abra seu navegador da web:

   > Visite `http://localhost:5000` para visualizar o servidor.
