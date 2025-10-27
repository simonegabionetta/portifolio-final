Feature: Metas
  Como um usuário do sistema
  Eu quero poder criar, listar, atualizar e deletar metas pessoais e profissionais
  Para organizar e acompanhar meus objetivos

  Rule: RN009 - Status inicial da meta
    Scenario: Criar nova meta com status planejada
      Given que estou autenticado no sistema
      When eu crio uma nova meta
      Then a meta deve ser criada com status "planejada"
      And deve ter a data de criação registrada

  Rule: RN010 - Geração incremental de ID
    Scenario: ID deve ser gerado incrementalmente
      Given que existem metas cadastradas no sistema
      When eu crio uma nova meta
      Then o ID da meta deve ser gerado incrementalmente baseado no comprimento do array
      And deve ser único no sistema

  Rule: RN011 - Filtros opcionais na listagem
    Scenario: Listar metas sem filtros
      Given que existem metas cadastradas no sistema
      When eu listo as metas sem aplicar filtros
      Then o sistema deve retornar todas as metas cadastradas

    Scenario: Listar metas filtradas por tipo
      Given que existem metas pessoais e profissionais cadastradas
      When eu listo as metas filtrando por tipo "Pessoal"
      Then o sistema deve retornar apenas as metas pessoais

    Scenario: Listar metas filtradas por status
      Given que existem metas com diferentes status cadastradas
      When eu listo as metas filtrando por status "concluída"
      Then o sistema deve retornar apenas as metas concluídas

    Scenario: Listar metas filtradas por período
      Given que existem metas com diferentes datas de vencimento
      When eu listo as metas filtrando por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar apenas as metas com data de vencimento neste período

    Scenario: Listar metas com múltiplos filtros
      Given que existem metas cadastradas com diferentes características
      When eu listo as metas filtrando por tipo "Profissional" e status "planejada"
      Then o sistema deve retornar apenas as metas profissionais planejadas

  Rule: RN012 - Validação na atualização de meta
    Scenario: Atualizar meta existente
      Given que existe uma meta cadastrada com ID 1
      When eu atualizo a meta com ID 1
      Then a meta deve ser atualizada com sucesso
      And deve retornar os dados atualizados

    Scenario: Tentar atualizar meta inexistente
      Given que não existe meta com ID 999
      When eu tento atualizar a meta com ID 999
      Then o sistema deve retornar erro "Meta não encontrada"

  Rule: RN013 - Validação na exclusão de meta
    Scenario: Deletar meta existente
      Given que existe uma meta cadastrada com ID 1
      When eu deleto a meta com ID 1
      Then a meta deve ser removida com sucesso
      And não deve mais existir no sistema

    Scenario: Tentar deletar meta inexistente
      Given que não existe meta com ID 999
      When eu tento deletar a meta com ID 999
      Then o sistema deve retornar erro "Meta não encontrada"

  Rule: RN014 - Filtro de período inclusivo
    Scenario: Filtro de período deve ser inclusivo
      Given que existem metas com datas de vencimento "2024-01-01", "2024-06-15" e "2024-12-31"
      When eu filtro metas por período de "2024-01-01" até "2024-12-31"
      Then o sistema deve retornar todas as três metas
      And deve incluir metas com data igual ao início e fim do período

  Rule: RN021 - Agrupamento no resumo de metas
    Scenario: Resumo deve agrupar por tipo e status
      Given que existem metas pessoais e profissionais com diferentes status
      When eu solicito o resumo de metas
      Then o sistema deve agrupar contagens por tipo (Pessoal/Profissional)
      And deve agrupar contagens por status (planejada/concluída)
      And deve retornar objeto com estrutura organizada

  Rule: RN022 - Contagem única de metas
    Scenario: Cada meta deve ser contada apenas uma vez
      Given que existe uma meta pessoal planejada
      When eu solicito o resumo de metas
      Then a meta deve ser contada apenas uma vez na categoria "pessoal planejada"
      And não deve ser contada em outras categorias

  Rule: RN023 - Agrupamento por mês no gráfico
    Scenario: Gráfico deve agrupar metas por mês
      Given que existem metas criadas em diferentes meses
      When eu solicito o gráfico de progresso
      Then o sistema deve agrupar metas por mês no formato YYYY-MM
      And deve contar planejadas vs concluídas para cada mês

  Rule: RN024 - Filtros do dashboard
    Scenario: Dashboard deve seguir regras de filtro de metas
      Given que existem metas cadastradas
      When eu aplico filtros no dashboard por tipo e status
      Then o dashboard deve usar as mesmas regras de filtro das metas
      And deve retornar dados consistentes com a listagem de metas
