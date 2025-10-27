Feature: Projetos
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar projetos
  Para organizar e acompanhar meus projetos profissionais

  Rule: Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem projetos cadastrados no sistema
      When eu crio um novo projeto
      Then o ID do projeto deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: Timestamp de criação
    Scenario: Projeto deve ter timestamp de criação
      Given que estou autenticado no sistema
      When eu crio um novo projeto
      Then o projeto deve ser criado com timestamp de criação
      And deve registrar a data e hora exata da criação

  Rule: Filtros opcionais na listagem
    Scenario: Listar projetos sem filtros
      Given que existem projetos cadastrados no sistema
      When eu listo os projetos sem aplicar filtros
      Then o sistema deve retornar todos os projetos cadastrados

    Scenario: Listar projetos filtrados por período
      Given que existem projetos com diferentes datas de vencimento
      When eu listo os projetos filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas os projetos com data de vencimento neste período

    Scenario: Listar projetos filtrados por responsável
      Given que existem projetos com diferentes responsáveis
      When eu listo os projetos filtrando por responsável "João Silva"
      Then o sistema deve retornar apenas os projetos do responsável "João Silva"

    Scenario: Listar projetos com múltiplos filtros
      Given que existem projetos cadastrados com diferentes características
      When eu listo os projetos filtrando por período e responsável
      Then o sistema deve retornar apenas os projetos que atendem todos os filtros informados

  Rule: Validação na atualização e exclusão
    Scenario: Atualizar projeto existente
      Given que existe um projeto cadastrado com ID 1
      When eu atualizo o projeto com ID 1
      Then o projeto deve ser atualizado com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar projeto inexistente
      Given que não existe projeto com ID 999
      When eu tento atualizar o projeto com ID 999
      Then o sistema deve retornar erro específico de projeto não encontrado

    Scenario: Deletar projeto existente
      Given que existe um projeto cadastrado com ID 1
      When eu deleto o projeto com ID 1
      Then o projeto deve ser removido com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar projeto inexistente
      Given que não existe projeto com ID 999
      When eu tento deletar o projeto com ID 999
      Then o sistema deve retornar erro específico de projeto não encontrado

  Rule: Aplicação de período sobre dueDate
    Scenario: Filtro de período deve considerar data de vencimento
      Given que existem projetos com datas de vencimento diferentes
      When eu filtro projetos por período específico
      Then o sistema deve aplicar o filtro sobre o campo dueDate dos projetos
      And deve retornar apenas projetos cuja dueDate está dentro do período informado
