## Instalação

- Faça o clone do projeto para a sua máquina

```bash
$ git clone https://github.com/rsjayme-orgs/hublocal-backend.git
```

- Vá para a pasta do projeto e instale as dependências

```bash
$ npm install
```


## Env File

- Crie um arquivo .env na raiz do projeto da seguinte forma

```js
// ex: DATABASE_URL="file:./dev.db"
DATABASE_URL=""

// ex: FRONT_END_HOST="http://localhost:5173"
FRONT_END_HOST=""
```

## Prisma

- Rode o seguinte comando para gerar um prisma client correspondente ao schema já criado

```bash
$ npx prisma generate
```

## Rodando o projeto

```bash
$ npm run start
```

