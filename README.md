GymPass Style App


# RF (Requisitos Funcionais) 
- Deve ser possível se cadastrar;
- Deve ser possível se autenticar; 
- Deve ser possível obter o perfil de usuário logado; 
- Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- Deve ser possível o usuário obter o histórico de check-ins;
- Deve ser possível buscar academias próximas; 
- Deve ser possível usuário buscar academias pelo nome; 
- Deve ser possível o usuário fazer check-in na academia; 
- Deve ser possível validar o check-in do usuário; 
- Deve ser possível cadastrar uma academia;  

# RN (Regras de Negócio) 
- O usuário não deve poder se cadastrar com e-mail duplicado;
- O usuário não pode fazer mais de um check-in no mesmo dia; 
- O usuário não pode fazer check-in se não tiver a pelo menos 100m da academia;
- O check-in só pode ser validado em até 20min de ser criado;
- O check-in só pode ser validado por administradores;
- A academia só pode ser cadastrada por administradores;

# RNF (Requisitos não Funcionais) 
- A senha do usuário precisa estar criptografada
- Os dados da aplicação precisam estar persistidos em um banco PostgreeSQL
- Todas listas de dados precisam estar paginadas com 20 items por página
- O usuário deve ser identificado por JWT

