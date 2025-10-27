Feature: Aprendizados
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar registros de aprendizados
  Para acompanhar meus cursos, palestras, workshops e outras atividades de aprendizado

  Rule: Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem aprendizados cadastrados no sistema
      When eu crio um novo aprendizado
      Then o ID do aprendizado deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: Data e hora de criação
    Scenario: Aprendizado deve ter data e hora de criação
      Given que estou autenticado no sistema
      When eu crio um novo aprendizado
      Then o aprendizado deve ser criado com data e hora de criação
 

  Rule: RN017 - Filtros opcionais na listagem
    Scenario: Listar aprendizados sem filtros
      Given que existem aprendizados cadastrados no sistema
      When eu listo os aprendizados sem aplicar filtros
      Then o sistema deve retornar todos os aprendizados cadastrados

    Scenario: Listar aprendizados filtrados por tipo
      Given que existem aprendizados de diferentes tipos (curso, palestra, workshop)
      When eu listo os aprendizados filtrando por tipo "curso"
      Then o sistema deve retornar apenas os aprendizados do tipo "curso"

    Scenario: Listar aprendizados filtrados por período
      Given que existem aprendizados com diferentes datas
      When eu listo os aprendizados filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas os aprendizados com data neste período

    Scenario: Listar aprendizados filtrados por responsável
      Given que existem aprendizados com diferentes responsáveis
      When eu listo os aprendizados filtrando por responsável "Ana Lima"
      Then o sistema deve retornar apenas os aprendizados do responsável "Ana Lima"

    Scenario: Listar aprendizados com múltiplos filtros
      Given que existem aprendizados cadastrados com diferentes características
      When eu listo os aprendizados filtrando por tipo, período e responsável
      Then o sistema deve retornar apenas os aprendizados que atendem todos os filtros informados

  Rule: RN019 - Validação na atualização e exclusão
    Scenario: Atualizar aprendizado existente
      Given que existe um aprendizado cadastrado com ID 1
      When eu atualizo o aprendizado com ID 1
      Then o aprendizado deve ser atualizado com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar aprendizado inexistente
      Given que não existe aprendizado com ID 999
      When eu tento atualizar o aprendizado com ID 999
      Then o sistema deve retornar erro específico de aprendizado não encontrado

    Scenario: Deletar aprendizado existente
      Given que existe um aprendizado cadastrado com ID 1
      When eu deleto o aprendizado com ID 1
      Then o aprendizado deve ser removido com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar aprendizado inexistente
      Given que não existe aprendizado com ID 999
      When eu tento deletar o aprendizado com ID 999
      Then o sistema deve retornar erro específico de aprendizado não encontrado

  Rule: RN028 - Aplicação de período sobre date
    Scenario: Filtro de período deve considerar data do aprendizado
      Given que existem aprendizados com datas diferentes
      When eu filtro aprendizados por período específico
      Then o sistema deve aplicar o filtro sobre o campo date dos aprendizados
      And deve retornar apenas aprendizados cuja date está dentro do período informado
