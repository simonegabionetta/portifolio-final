Feature: Anotações
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar anotações
  Para registrar e organizar minhas observações e notas importantes

  Rule: Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem anotações cadastradas no sistema
      When eu crio uma nova anotação
      Then o ID da anotação deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: Data e hora de criação
    Scenario: Anotação deve ter data e hora de criação
      Given que estou autenticado no sistema
      When eu crio uma nova anotação
      Then a anotação deve ser criada com data e hora de criação

  Rule: Filtro por período na listagem
    Scenario: Listar anotações sem filtros
      Given que existem anotações cadastradas no sistema
      When eu listo as anotações sem aplicar filtros
      Then o sistema deve retornar todas as anotações cadastradas

    Scenario: Listar anotações filtradas por período
      Given que existem anotações com diferentes datas
      When eu listo as anotações filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas as anotações com data neste período

  Rule: Validação na atualização e exclusão
    Scenario: Atualizar anotação existente
      Given que existe uma anotação cadastrada com ID 1
      When eu atualizo a anotação com ID 1
      Then a anotação deve ser atualizada com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar anotação inexistente
      Given que não existe anotação com ID 999
      When eu tento atualizar a anotação com ID 999
      Then o sistema deve retornar erro específico de anotação não encontrada

    Scenario: Deletar anotação existente
      Given que existe uma anotação cadastrada com ID 1
      When eu deleto a anotação com ID 1
      Then a anotação deve ser removida com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar anotação inexistente
      Given que não existe anotação com ID 999
      When eu tento deletar a anotação com ID 999
      Then o sistema deve retornar erro específico de anotação não encontrada

  Rule: Data automática na criação
    Scenario: Anotação deve armazenar data automaticamente
      Given que estou autenticado no sistema
      When eu crio uma nova anotação
      Then a anotação deve armazenar a data atual automaticamente
      And não deve depender do usuário informar a data

  Rule: Aplicação de período sobre data da anotação
    Scenario: Filtro de período deve considerar data da anotação
      Given que existem anotações com datas diferentes
      When eu filtro anotações por período específico
      Then o sistema deve aplicar o filtro sobre a data das anotações
      And deve retornar apenas anotações cuja data está dentro do período informado
