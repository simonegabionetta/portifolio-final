# API de Gestão de Desenvolvimento Pessoal e Profissional

Esta API RESTful permite a gestão de desenvolvimento pessoal e profissional, incluindo funcionalidades para usuários, metas, projetos, mentorias, melhorias, aprendizados, anotações e dashboard de estatísticas.

## Tecnologias Utilizadas
- Node.js
- Express
- JWT para autenticação
- Banco de dados em memória
- Documentação Swagger

## Estrutura do Projeto
- `src/models`: Modelos de dados
- `src/services`: Lógica de negócio
- `src/controllers`: Controladores das rotas
- `src/routes`: Definição das rotas
- `src/middleware`: Middlewares de autenticação e outros
- `resources/swagger.yaml`: Documentação da API

## Como rodar o projeto
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

## Funcionalidades

### Autenticação e Usuários
- Cadastro de novos usuários
- Login e autenticação com JWT
- Gerenciamento de perfil
- Logout
- Histórico de atividades

### Metas
- Criar metas (Pessoais ou Profissionais)
- Listar metas com filtros (tipo, status, período)
- Obter detalhes de uma meta específica
- Atualizar meta
- Deletar meta

### Projetos
- Criar projetos
- Listar projetos com filtros (período, responsável)
- Obter detalhes de um projeto específico
- Atualizar projeto
- Deletar projeto

### Mentorias
- Criar registro de mentoria
- Listar mentorias com filtros (período, responsável)
- Obter detalhes de uma mentoria específica
- Atualizar mentoria
- Deletar mentoria

### Melhorias
- Criar registro de melhoria
- Listar melhorias com filtros (período, responsável)
- Obter detalhes de uma melhoria específica
- Atualizar melhoria
- Deletar melhoria

### Aprendizados
- Criar aprendizado (cursos, palestras, workshops, etc.)
- Listar aprendizados com filtros (tipo, período, responsável)
- Obter detalhes de um aprendizado específico
- Atualizar aprendizado
- Deletar aprendizado

### Anotações
- Criar anotação
- Listar anotações com filtros (período)
- Obter detalhes de uma anotação específica
- Atualizar anotação
- Deletar anotação

### Dashboard
- Resumo de metas (total, concluídas, em progresso, planejadas)
- Gráfico de evolução por período
- Filtros de dados por tipo, status e período

## Endpoints Principais

### Autenticação
- `POST /users/register` - Cadastro de usuário
- `POST /users/login` - Login de usuário
- `GET /users/me` - Obter perfil do usuário logado
- `PUT /users/me` - Atualizar perfil
- `POST /users/logout` - Logout
- `GET /users/me/history` - Histórico de atividades

### Metas
- `POST /goals` - Criar meta
- `GET /goals` - Listar metas
- `GET /goals/:id` - Obter meta por ID
- `PUT /goals/:id` - Atualizar meta
- `DELETE /goals/:id` - Deletar meta

### Projetos
- `POST /projects` - Criar projeto
- `GET /projects` - Listar projetos
- `GET /projects/:id` - Obter projeto por ID
- `PUT /projects/:id` - Atualizar projeto
- `DELETE /projects/:id` - Deletar projeto

### Mentorias
- `POST /mentorships` - Criar mentoria
- `GET /mentorships` - Listar mentorias
- `GET /mentorships/:id` - Obter mentoria por ID
- `PUT /mentorships/:id` - Atualizar mentoria
- `DELETE /mentorships/:id` - Deletar mentoria

### Melhorias
- `POST /improvements` - Criar melhoria
- `GET /improvements` - Listar melhorias
- `GET /improvements/:id` - Obter melhoria por ID
- `PUT /improvements/:id` - Atualizar melhoria
- `DELETE /improvements/:id` - Deletar melhoria

### Aprendizados
- `POST /learning` - Criar aprendizado
- `GET /learning` - Listar aprendizados
- `GET /learning/:id` - Obter aprendizado por ID
- `PUT /learning/:id` - Atualizar aprendizado
- `DELETE /learning/:id` - Deletar aprendizado

### Anotações
- `POST /notes` - Criar anotação
- `GET /notes` - Listar anotações
- `GET /notes/:id` - Obter anotação por ID
- `PUT /notes/:id` - Atualizar anotação
- `DELETE /notes/:id` - Deletar anotação

### Dashboard
- `GET /dashboard/goals-summary` - Resumo de metas
- `GET /dashboard/progress-graph` - Gráfico de evolução
- `GET /dashboard/filter` - Filtrar dados

## Autenticação

A maioria dos endpoints requer autenticação via JWT. Para obter o token:

1. Faça o cadastro ou login através dos endpoints `/users/register` ou `/users/login`
2. Use o token retornado no header das requisições:
   ```
   Authorization: Bearer <seu_token>
   ```

## Documentação

Consulte a documentação Swagger completa em: `http://localhost:3000/api-docs` para detalhes de cada endpoint, modelos de requisição/resposta e códigos de erro.