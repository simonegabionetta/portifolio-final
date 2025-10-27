# Regras de Negócio - API de Gestão de Desenvolvimento Pessoal e Profissional

## Tabela de Regras de Negócio

| ID | Regra de Negócio | Entradas do Usuário | Saídas do Sistema |
|---|---|---|---|
| RN001 | Ao registrar um novo usuário, o sistema deve verificar se o email já está cadastrado. Caso esteja, retornar erro. | Nome, email, senha | Registro bem-sucedido com dados sem senha OU mensagem de erro "Usuário já existe" |
| RN002 | Senhas de usuários devem ser armazenadas criptografadas usando bcrypt com salt 8. | Senha em texto plano | Senha criptografada com hash bcrypt |
| RN003 | Ao fazer login, o sistema deve verificar se o email existe e se a senha está correta. Caso contrário, retornar erro específico. | Email e senha | Token JWT válido OU mensagem "Usuário não encontrado" OU "Senha inválida" |
| RN004 | Tokens JWT gerados no login devem expirar em 1 hora. | Email e senha válidos | Token JWT com expiração de 1h |
| RN005 | Ao buscar o perfil de um usuário, a senha nunca deve ser retornada. | ID do usuário | Dados do usuário sem o campo senha |
| RN006 | Senhas atualizadas no perfil devem ser re-criptografadas antes de armazenar. | Nova senha | Senha criptografada atualizada |
| RN007 | Histórico de atividades deve ser limitado a 10 registros por padrão, com paginação opcional. | ID do usuário, limit (opcional), offset (opcional) | Lista de histórico limitada OU histórico completo se não especificado |
| RN008 | Novas ações no histórico devem ser adicionadas no início da lista (mais recente primeiro). | Ação realizada | Histórico atualizado com nova ação no topo |
| RN009 | Ao criar uma meta, ela deve ter status inicial "planejada". | Dados da meta | Meta criada com status "planejada" e data de criação |
| RN010 | ID de metas, projetos, mentorias, melhorias, aprendizados e anotações deve ser gerado incrementalmente baseado no comprimento do array. | Dados da entidade | ID sequencial (length + 1) |
| RN011 | Listagem de metas deve permitir filtros por tipo, status e período. Filtros são opcionais. | Tipo (opcional), status (opcional), período (opcional) | Lista filtrada de metas OU todas as metas se nenhum filtro |
| RN012 | Ao atualizar uma meta que não existe, o sistema deve retornar erro. | ID da meta, dados de atualização | Meta atualizada OU mensagem "Meta não encontrada" |
| RN013 | Ao deletar uma meta que não existe, o sistema deve retornar erro. | ID da meta | Meta removida OU mensagem "Meta não encontrada" |
| RN014 | Filtro de período nas metas deve considerar metas com data de vencimento entre start e end (inclusivo). | Período (start, end) | Metas com dueDate entre start e end |
| RN015 | Ao criar projeto, mentoria, melhoria, aprendizado, o sistema deve adicionar timestamp de criação. | Dados da entidade | Entidade criada com campo createdAt |
| RN016 | Listagem de projetos, mentorias e melhorias deve permitir filtros por período e responsável. | Período (opcional), responsável (opcional) | Lista filtrada OU todos os registros |
| RN017 | Listagem de aprendizados deve permitir filtros por tipo, período e responsável. | Tipo (opcional), período (opcional), responsável (opcional) | Lista filtrada OU todos os aprendizados |
| RN018 | Listagem de anotações deve permitir filtro por período. | Período (opcional) | Lista filtrada OU todas as anotações |
| RN019 | Ao atualizar ou deletar qualquer entidade (projeto, mentoria, melhoria, aprendizado, anotação) que não existe, o sistema deve retornar erro específico. | ID da entidade | Entidade atualizada/removida OU mensagem específica de erro |
| RN020 | Anotações devem armazenar a data automaticamente no momento da criação. | Conteúdo da anotação | Anotação criada com data atual |
| RN021 | Resumo de metas deve agrupar contagens por tipo (Pessoal/Profissional) e por status (planejada/concluída). | Nenhuma (usa todas as metas) | Objeto com contadores: pessoal {planejada, concluida}, profissional {planejada, concluida} |
| RN022 | Cada meta deve ser contada apenas uma vez no resumo. | Meta com tipo e status | Contador incrementado na categoria correspondente |
| RN023 | Gráfico de progresso deve agrupar metas por mês (formato YYYY-MM) e contar planejadas vs concluídas. | Período (opcional) | Objeto com chaves de mês e valores {planejada, concluida} |
| RN024 | Filtro do dashboard segue as mesmas regras de filtro de metas (tipo, status, período). | Tipo, status, período (opcionais) | Lista filtrada de metas para o dashboard |
| RN025 | Todas as entidades devem ter tratamento de erro quando não encontradas nas operações de leitura, atualização e exclusão. | ID de qualquer entidade | Entidade encontrada OU mensagem de erro específica |
| RN026 | Busca por ID em qualquer entidade deve converter o parâmetro para número antes de comparar. | ID em formato string ou número | ID convertido para número antes da busca |
| RN027 | Filtros opcionais devem funcionar de forma inclusiva (AND lógico). Todos os filtros informados devem ser satisfeitos. | Múltiplos filtros | Lista que atende TODOS os filtros informados |
| RN028 | Períodos devem ser aplicados sobre a data da entidade (date para mentorias/melhorias/aprendizados, dueDate para metas/projetos). | start e end do período | Registros onde date/dueDate está entre start e end |
| RN029 | Histórico de usuário deve permitir paginação com offset e limit. | limit (padrão 10), offset (padrão 0) | Array de itens de histórico limitado com slice(offset, offset + limit) |
| RN030 | Atualização de entidades deve preservar todos os campos não fornecidos e sobrescrever apenas os fornecidos (Object.assign). | ID e campos a atualizar | Entidade com campos atualizados mantendo os demais |

## Observações Importantes

- **Validação de Existência**: Todas as operações de atualização e exclusão validam se a entidade existe antes de executar a ação
- **Filtros Flexíveis**: Todos os filtros são opcionais e podem ser combinados
- **Segurança**: Senhas nunca são expostas nas respostas do sistema
- **Incremento de ID**: IDs são sempre incrementais baseados no tamanho do array + 1
- **Timestamps**: Todas as entidades criadas recebem timestamp automático
- **Paginação**: Sistema de paginação aplicado apenas no histórico de usuário

