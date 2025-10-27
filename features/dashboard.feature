Feature: Dashboard
  Como um usuário do sistema
  Eu quero poder visualizar resumos e gráficos de evolução das minhas metas
  Para acompanhar meu progresso e tomar decisões baseadas em dados

  Rule: Agrupamento no resumo de metas
    Scenario: Resumo deve agrupar contagens por tipo e status
      Given que existem metas pessoais e profissionais com diferentes status
      When eu solicito o resumo de metas
      Then o sistema deve agrupar contagens por tipo (Pessoal/Profissional)
      And deve agrupar contagens por status (planejada/concluída)
      And deve retornar objeto com estrutura organizada

    Scenario: Resumo com metas pessoais e profissionais
      Given que existem metas pessoais planejadas e concluídas
      And existem metas profissionais planejadas e concluídas
      When eu solicito o resumo de metas
      Then o sistema deve retornar contadores separados para pessoal e profissional
      And cada tipo deve ter contadores para planejada e concluída

  Rule: Contagem única de metas
    Scenario: Cada meta deve ser contada apenas uma vez
      Given que existe uma meta pessoal planejada
      When eu solicito o resumo de metas
      Then a meta deve ser contada apenas uma vez na categoria "pessoal planejada"
      And não deve ser contada em outras categorias

    Scenario: Contagem correta com múltiplas metas
      Given que existem 3 metas pessoais planejadas e 2 metas pessoais concluídas
      And existem 4 metas profissionais planejadas e 1 meta profissional concluída
      When eu solicito o resumo de metas
      Then o sistema deve retornar contadores corretos para cada categoria
      And não deve duplicar contagens

  Rule: Agrupamento por mês no gráfico
    Scenario: Gráfico deve agrupar metas por mês
      Given que existem metas criadas em diferentes meses
      When eu solicito o gráfico de progresso
      Then o sistema deve agrupar metas por mês no formato YYYY-MM
      And deve contar planejadas vs concluídas para cada mês

    Scenario: Gráfico com formato de mês correto
      Given que existem metas criadas em janeiro e fevereiro de 2024
      When eu solicito o gráfico de progresso
      Then o sistema deve agrupar metas com chaves "2024-01" e "2024-02"
      And cada mês deve ter contadores de planejadas e concluídas

  Rule: Filtros do dashboard
    Scenario: Dashboard deve seguir regras de filtro de metas
      Given que existem metas cadastradas
      When eu aplico filtros no dashboard por tipo e status
      Then o dashboard deve usar as mesmas regras de filtro das metas
      And deve retornar dados consistentes com a listagem de metas

    Scenario: Dashboard com filtro por tipo
      Given que existem metas pessoais e profissionais
      When eu aplico filtro por tipo "Pessoal" no dashboard
      Then o dashboard deve mostrar apenas dados das metas pessoais
      And deve ignorar metas profissionais nos cálculos

    Scenario: Dashboard com filtro por status
      Given que existem metas planejadas e concluídas
      When eu aplico filtro por status "concluída" no dashboard
      Then o dashboard deve mostrar apenas dados das metas concluídas
      And deve ignorar metas planejadas nos cálculos

    Scenario: Dashboard com filtro por período
      Given que existem metas com diferentes datas de vencimento
      When eu aplico filtro por período específico no dashboard
      Then o dashboard deve considerar apenas metas dentro do período
      And deve aplicar o mesmo filtro usado na listagem de metas
