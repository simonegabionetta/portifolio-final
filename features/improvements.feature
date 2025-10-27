Feature: Melhorias
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar registros de melhorias
  Para acompanhar minhas melhorias pessoais e profissionais

  Rule: Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem melhorias cadastradas no sistema
      When eu crio uma nova melhoria
      Then o ID da melhoria deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: Timestamp de criação
    Scenario: Melhoria deve ter timestamp de criação
      Given que estou autenticado no sistema
      When eu crio uma nova melhoria
      Then a melhoria deve ser criada com timestamp de criação
      And deve registrar a data e hora exata da criação

  Rule: Filtros opcionais na listagem
    Scenario: Listar melhorias sem filtros
      Given que existem melhorias cadastradas no sistema
      When eu listo as melhorias sem aplicar filtros
      Then o sistema deve retornar todas as melhorias cadastradas

    Scenario: Listar melhorias filtradas por período
      Given que existem melhorias com diferentes datas
      When eu listo as melhorias filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas as melhorias com data neste período

    Scenario: Listar melhorias filtradas por responsável
      Given que existem melhorias com diferentes responsáveis
      When eu listo as melhorias filtrando por responsável "Pedro Costa"
      Then o sistema deve retornar apenas as melhorias do responsável "Pedro Costa"

    Scenario: Listar melhorias com múltiplos filtros
      Given que existem melhorias cadastradas com diferentes características
      When eu listo as melhorias filtrando por período e responsável
      Then o sistema deve retornar apenas as melhorias que atendem todos os filtros informados

  Rule: Validação na atualização e exclusão
    Scenario: Atualizar melhoria existente
      Given que existe uma melhoria cadastrada com ID 1
      When eu atualizo a melhoria com ID 1
      Then a melhoria deve ser atualizada com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar melhoria inexistente
      Given que não existe melhoria com ID 999
      When eu tento atualizar a melhoria com ID 999
      Then o sistema deve retornar erro específico de melhoria não encontrada

    Scenario: Deletar melhoria existente
      Given que existe uma melhoria cadastrada com ID 1
      When eu deleto a melhoria com ID 1
      Then a melhoria deve ser removida com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar melhoria inexistente
      Given que não existe melhoria com ID 999
      When eu tento deletar a melhoria com ID 999
      Then o sistema deve retornar erro específico de melhoria não encontrada

  Rule: Aplicação de período sobre date
    Scenario: Filtro de período deve considerar data da melhoria
      Given que existem melhorias com datas diferentes
      When eu filtro melhorias por período específico
      Then o sistema deve aplicar o filtro sobre o campo date das melhorias
      And deve retornar apenas melhorias cuja date está dentro do período informado
