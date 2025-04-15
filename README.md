# API REST Completa

Uma API REST completa construída com Node.js, Express, MySQL e Stripe.

## Funcionalidades

- Autenticação de usuários com JWT
- Sistema de roles e permissões
- Integração com Stripe para pagamentos
- Logging com Winston
- Validação de dados
- Tratamento de erros
- Documentação da API

## Pré-requisitos

- Node.js (v14 ou superior)
- MySQL
- Conta no Stripe (para pagamentos)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-rest-completa.git
cd api-rest-completa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Configure o banco de dados:
```bash
npm run migrate
```

5. Inicie o servidor:
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controllers/    # Controladores
├── models/         # Modelos do banco de dados
├── routes/         # Rotas
├── services/       # Lógica de negócios
├── middleware/     # Middlewares personalizados
├── utils/          # Funções utilitárias
└── app.js          # Arquivo principal
```

## Endpoints Principais

### Autenticação
- POST /api/auth/register - Registrar novo usuário
- POST /api/auth/login - Login de usuário

### Pagamentos
- POST /api/payments/create-payment-intent - Criar intenção de pagamento
- POST /api/payments/webhook - Webhook do Stripe

## Testes

Para executar os testes:
```bash
npm test
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 