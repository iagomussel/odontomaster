# OdontoMaster - Plano de Produto Abrangente

## Visao Geral
OdontoMaster e um sistema completo de gerenciamento para clinicas odontologicas, construido com Vue 3 (frontend) e Express/Sequelize/MySQL (backend). O sistema abrange desde o cadastro de pacientes ate o controle financeiro.

---

## Arquitetura

### Stack Tecnologico
- **Frontend:** Vue 3 + Vue Router + Materialize CSS + Axios
- **Backend:** Express.js + Sequelize ORM + MySQL
- **Autenticacao:** JWT (JSON Web Tokens)
- **Containerizacao:** Docker + Docker Compose

### Padroes de Design
- **MVC:** Controllers separam logica de negocio das rotas
- **Auto-discovery:** Models e Controllers sao carregados automaticamente via filesystem scan
- **Component-based:** Frontend usa componentes reutilizaveis (hi-table, hi-field-list, hi-select, etc.)
- **RESTful API:** Endpoints seguem convencoes REST

---

## Modulos Implementados

### 1. Dashboard
- Cards com metricas: total de pacientes, consultas, consultas canceladas, horarios disponiveis
- Status: **Completo**

### 2. Gestao de Pacientes
- CRUD completo com paginacao
- Dados basicos (nome, ficha, data nascimento, sexo, email)
- Enderecos com busca automatica via CEP (ViaCEP API)
- Telefones multiplos com tipo (celular, fixo, trabalho)
- Vinculo com dentistas e convenios
- Observacoes
- Upload de imagem
- Status: **Completo**

### 3. Anamnese (Ficha Medica)
- Formulario completo de historico medico do paciente
- Saude geral: tratamento medico, medicamentos, alergias
- Condicoes medicas: diabetes, hipertensao, problemas cardiacos, respiratorios, renais, hepaticos, gastrointestinais, articulares, disturbios sanguineos, epilepsia, HIV, hepatite
- Habitos: tabagismo, consumo de alcool, bruxismo
- Saude bucal: sangramento gengival, sensibilidade dental, dor na ATM
- Campos especificos para mulheres: gestante, lactante
- Informacoes complementares: cirurgias anteriores, observacoes
- Integrado na ficha do paciente com historico de anamneses
- Status: **Completo (v1.1)**

### 4. Gestao de Dentistas
- CRUD completo com paginacao
- Dados profissionais (nome, CRM, especialidade, imagem)
- Configuracao de dias e horarios disponiveis
- Vinculo com usuario do sistema
- Status: **Completo**

### 5. Convenios
- CRUD completo com paginacao
- Status: **Completo**

### 6. Procedimentos
- CRUD completo com paginacao
- Dados: nome, valor, duracao, periodicidade, codigo TUSS
- Status: **Completo**

### 7. Agendamento de Consultas
- Calendario visual por dia
- Horarios disponiveis por profissional
- Encaixe de consultas
- Cancelamento
- Status: **Completo (base)**

### 8. Autenticacao
- Login/Registro com JWT
- Middleware de autenticacao em todas as rotas protegidas
- Status: **Completo**

### 9. Upload de Arquivos
- Upload generico de imagens
- Busca de imagens externas por termo
- Status: **Completo**

### 10. Configuracoes
- Pagina de configuracoes (base)
- Status: **Parcial**

---

## Roadmap - Proximas Funcionalidades

### Fase 2 - Prontuario e Odontograma (Prioridade Alta)
- [ ] **Odontograma interativo** - Mapa dental visual com status de cada dente
- [ ] **Prontuario eletronico** - Registro completo de evolucao do paciente
- [ ] **Receituario** - Geracao de receitas medicas vinculadas ao paciente
- [ ] **Listar consultas no cadastro de pacientes** - Historico de consultas na ficha

### Fase 3 - Comunicacao (Prioridade Media)
- [ ] **Lembretes por e-mail** - Lembretes automaticos de consultas
- [ ] **Lembretes por SMS** - Integracao com gateway SMS
- [ ] **Lembretes por WhatsApp** - Integracao com WhatsApp Business API
- [ ] **Templates de mensagens** - Templates customizaveis para e-mail/SMS/WhatsApp
- [ ] **Integracao Google Calendar** - Sincronizacao com Google Calendar

### Fase 4 - Medicamentos e Exames (Prioridade Media)
- [ ] **Cadastro de medicamentos** - Base de medicamentos com posologia
- [ ] **Geracao de receitas** - Receitas com medicamentos cadastrados
- [ ] **Cadastro de exames** - Tipos de exames e resultados
- [ ] **Sugestao de locais para compra** - Farmacias com preco total

### Fase 5 - Financeiro (Prioridade Media-Alta)
- [ ] **Gestao de custos** - Registro de custos por procedimento
- [ ] **Analise de lucros** - Dashboard financeiro
- [ ] **Emissao de boletos** - Integracao com gateway de pagamento (IUGU)
- [ ] **Relatorios financeiros** - Receita, despesas, lucro

### Fase 6 - Relatorios (Prioridade Media)
- [ ] **Relatorio de pacientes** - Exportacao e filtros
- [ ] **Relatorio de consultas** - Por periodo, dentista, procedimento
- [ ] **Relatorio de procedimentos** - Mais realizados, receita por procedimento
- [ ] **Relatorio de exames** - Pendentes, realizados
- [ ] **Relatorio de medicamentos** - Mais prescritos
- [ ] **Relatorio de receitas** - Por paciente, periodo

### Fase 7 - Administracao (Prioridade Baixa)
- [ ] **Configuracoes de e-mail** - SMTP settings
- [ ] **Configuracoes de WhatsApp** - API credentials
- [ ] **Configuracoes de SMS** - Gateway settings
- [ ] **Configuracoes gerais** - Dados da clinica, logo
- [ ] **Credenciais para APIs externas** - SMS, IUGU, Google
- [ ] **Cadastro de especializacoes** - Filtro em procedimentos por especialidade
- [ ] **Listar pacientes vinculados ao dentista** - Na ficha do dentista

### Fase 8 - Seguranca e Backup (Prioridade Baixa)
- [ ] **Backup de dados** - Exportacao completa do banco
- [ ] **Backup de imagens** - Exportacao de arquivos
- [ ] **Backup de arquivos** - Exportacao geral
- [ ] **Logs de erros** - Registro e visualizacao de erros
- [ ] **Logs de acesso** - Auditoria de acessos
- [ ] **Notificacoes de erros** - Alertas de erros criticos
- [ ] **Notificacoes de acesso** - Alertas de acessos suspeitos

### Fase 9 - Lembretes Automatizados (Prioridade Baixa)
- [ ] **Lembretes de consultas** - Antes da consulta
- [ ] **Lembretes de exames** - Exames pendentes
- [ ] **Lembretes de medicamentos** - Renovacao de receitas
- [ ] **Lembretes de aniversarios** - Felicitacoes automaticas

---

## Historico de Versoes

### v1.1.0 - Anamnese (2026-03-23)
- Adicionado modulo completo de Anamnese (ficha medica)
- Model Sequelize com 25+ campos de historico medico
- Controller com CRUD completo
- Rotas REST: GET /anamneses/:patient_id, GET /anamnese/:id, POST /anamnese/:patient_id, DELETE /anamnese/:id
- Componente Vue AnamneseForm com secoes: saude geral, condicoes medicas, habitos, saude bucal, informacoes adicionais
- Componente AnamneseList integrado na ficha do paciente
- Campos condicionais (gestante/lactante para pacientes femininas)
- Campos com revelacao condicional (descricao de alergias, medicamentos, tratamento)

### v1.0.0 - Base
- Dashboard com metricas
- CRUD de pacientes, dentistas, convenios, procedimentos
- Agendamento de consultas com calendario
- Autenticacao JWT
- Upload de arquivos
