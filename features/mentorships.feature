Feature: Mentorias
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar registros de mentoria
  Para acompanhar minhas sessões de mentoria e desenvolvimento

  Rule: Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem mentorias cadastradas no sistema
      When eu crio uma nova mentoria
      Then o ID da mentoria deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: Timestamp de criação
    Scenario: Mentoria deve ter timestamp de criação
      Given que estou autenticado no sistema
      When eu crio uma nova mentoria
      Then a mentoria deve ser criada com timestamp de criação
      And deve registrar a data e hora exata da criação

  Rule: Filtros opcionais na listagem
    Scenario: Listar mentorias sem filtros
      Given que existem mentorias cadastradas no sistema
      When eu listo as mentorias sem aplicar filtros
      Then o sistema deve retornar todas as mentorias cadastradas

    Scenario: Listar mentorias filtradas por período
      Given que existem mentorias com diferentes datas
      When eu listo as mentorias filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas as mentorias com data neste período

    Scenario: Listar mentorias filtradas por responsável
      Given que existem mentorias com diferentes responsáveis
      When eu listo as mentorias filtrando por responsável "Maria Santos"
      Then o sistema deve retornar apenas as mentorias do responsável "Maria Santos"

    Scenario: Listar mentorias com múltiplos filtros
      Given que existem mentorias cadastradas com diferentes características
      When eu listo as mentorias filtrando por período e responsável
      Then o sistema deve retornar apenas as mentorias que atendem todos os filtros informados

  Rule: Validação na atualização e exclusão
    Scenario: Atualizar mentoria existente
      Given que existe uma mentoria cadastrada com ID 1
      When eu atualizo a mentoria com ID 1
      Then a mentoria deve ser atualizada com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar mentoria inexistente
      Given que não existe mentoria com ID 999
      When eu tento atualizar a mentoria com ID 999
      Then o sistema deve retornar erro específico de mentoria não encontrada

    Scenario: Deletar mentoria existente
      Given que existe uma mentoria cadastrada com ID 1
      When eu deleto a mentoria com ID 1
      Then a mentoria deve ser removida com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar mentoria inexistente
      Given que não existe mentoria com ID 999
      When eu tento deletar a mentoria com ID 999
      Then o sistema deve retornar erro específico de mentoria não encontrada

  Rule: Aplicação de período por data
    Scenario: Filtro de período deve considerar data da mentoria
      Given que existem mentorias com datas diferentes
      When eu filtro mentorias por período específico
      Then o sistema deve aplicar o filtro sobre o campo date das mentorias
      And deve retornar apenas mentorias cuja date está dentro do período informado
