# Agro Itajaí API

## Descrição

A Agro Itajaí API é um projeto para gerenciar informações relacionadas à agricultura na região de Itajaí. Este projeto fornece endpoints para manipulação de dados agrícolas, como informações sobre plantações, colheitas, e previsões meteorológicas.

## Funcionalidades

- Cadastro de plantações
- Registro de colheitas
- Consulta de previsões meteorológicas
- Relatórios de produtividade

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- JWT para autenticação

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/agro-itajai-api.git
```

2. Navegue até o diretório do projeto:

```bash
cd agro-itajai-api
```

3. Instale as dependências:

```bash
npm install
```

## Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes variáveis de ambiente ao arquivo `.env`:

```plaintext
PORT=3000
JWT_EXPIRATION=tempo-expiracao-jwt
JWT_SECRET=sua-chave-secreta-jwt
DATABASE_URL=string-url-do-banco
```

## Uso

1. Inicie o servidor:

```bash
npm start
```

2. Acesse a API em `http://localhost:3000`

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato pelo email: contato@agro-itajai.com
