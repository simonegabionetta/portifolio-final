Feature: Autenticação e Usuários
  Como um usuário do sistema
  Eu quero poder me registrar, fazer login e gerenciar meu perfil
  Para ter acesso as funcionalidades do sistema

  Rule:Validação de email único no cadastro
    Scenario: Tentar cadastrar usuário com email já existente
      Given que existe um usuário cadastrado com email "usuario@teste.com"
      When eu tento cadastrar um novo usuário com email "usuario@teste.com"
      Then o sistema deve retornar erro "Usuário já existe"
      And o usuário não deve ser cadastrado

    Scenario: Cadastrar usuário com email único
      Given que não existe usuário cadastrado com email "novo@teste.com"
      When eu cadastro um usuário com email "novo@teste.com"
      Then o usuário deve ser cadastrado com sucesso
      And deve retornar os dados do usuário sem a senha

  Rule: Criptografia de senhas
    Scenario: Senha deve ser criptografada no cadastro
      Given que estou cadastrando um novo usuário
      When eu informo a senha "minhasenha123"
      Then a senha deve ser armazenada criptografada usando bcrypt com salt 8
      And a senha em texto plano não deve ser armazenada

  Rule: Validação de credenciais no login
    Scenario: Login com email inexistente
      Given que não existe usuário cadastrado com email "inexistente@teste.com"
      When eu tento fazer login com email "inexistente@teste.com" e senha "qualquer"
      Then o sistema deve retornar erro "Usuário não encontrado"

    Scenario: Login com senha incorreta
      Given que existe um usuário cadastrado com email "usuario@teste.com" e senha "senha123"
      When eu tento fazer login com email "usuario@teste.com" e senha "senhaerrada"
      Then o sistema deve retornar erro "Senha inválida"

    Scenario: Login com credenciais corretas
      Given que existe um usuário cadastrado com email "usuario@teste.com" e senha "senha123"
      When eu faço login com email "usuario@teste.com" e senha "senha123"
      Then o sistema deve retornar um token JWT válido
      And deve retornar os dados do usuário sem a senha

  Rule: Expiração de token JWT
    Scenario: Token JWT deve expirar em 1 hora
      Given que um usuário fez login com sucesso
      When o sistema gera um token JWT
      Then o token deve ter expiração de 1 hora
      And após 1 hora o token deve ser inválido

  Rule: Senha nunca retornada no perfil
    Scenario: Buscar perfil do usuário
      Given que existe um usuário cadastrado
      When eu busco o perfil do usuário
      Then o sistema deve retornar os dados do usuário
      And a senha nunca deve ser incluída na resposta

  Rule: Re-criptografia de senhas atualizadas
    Scenario: Atualizar senha do usuário
      Given que existe um usuário cadastrado
      When eu atualizo a senha para "novasenha123"
      Then a nova senha deve ser re-criptografada antes de armazenar
      And a senha anterior deve ser substituída

  Rule: Limitação do histórico de atividades
    Scenario: Histórico padrão limitado a 10 registros
      Given que um usuário possui mais de 10 atividades no histórico
      When eu busco o histórico de atividades sem parâmetros
      Then o sistema deve retornar apenas os 10 registros mais recentes

  Rule: Ordenação do histórico por data
    Scenario: Novas atividades no início do histórico
      Given que existe um histórico de atividades
      When uma nova atividade é registrada
      Then a nova atividade deve aparecer no início da lista
      And as atividades anteriores devem ser deslocadas

  Rule: Paginação do histórico
    Scenario: Histórico com paginação personalizada
      Given que um usuário possui histórico de atividades
      When eu busco o histórico com limit=5 e offset=10
      Then o sistema deve retornar 5 registros a partir da posição 10
      And deve respeitar os parâmetros de paginação informados

    Scenario: Histórico com valores padrão de paginação
      Given que um usuário possui histórico de atividades
      When eu busco o histórico sem parâmetros de paginação
      Then o sistema deve usar limit=10 e offset=0 por padrão
