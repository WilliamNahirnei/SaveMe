# Ler todos os pontos adicionados.
# Setup
  - Tenha o docker e docker-compose instalados na maquina.
  - Execute o arquivo setup-loca.sh que o setup sera feito automaticamente.
  - Na pasta raiz execute o comando docker-compose up, a api esta rodando na porta 3000, o frontend esta rodando na porta 3005.
  
  - Caso opte por fazer o setup manualmente, abra o arquivo setup-local.sh e execute comando a comando no cmd.
  
# Caso não utilize docker
  - Copie os arquivos .env.example para .env, nas pastas frontend e backend.
  - Configure-os com os dados corretamente.
  - Crie um banco de dados.
  - Execute o comando npm i nas pastas frontend e backend.
  - Execute o comando  npm start nas pastas frontend e backend.
  - Dentro da pasta backend rode o comando : npx sequelize-cli db:migrate
  - Caso tenha erro com o sequelize-cli, instale globalmente, e rode o comando : npx sequelize-cli db:migrate dentro da pasta backend.
