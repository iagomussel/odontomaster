# OdontoMaster - Plano de Produto Abrangente

## Visao Geral
OdontoMaster e um sistema completo de gerenciamento para clinicas odontologicas, construido com Vue 3 (frontend) e Express/Sequelize/MySQL (backend). O sistema abrange desde o cadastro de pacientes ate o controle financeiro, prontuario eletronico e odontograma interativo.

---

## Arquitetura

### Stack Tecnologico
- **Frontend:** Vue 3.5 + Vue Router 4 + Materialize CSS + Bootstrap 5 + Axios
- **Backend:** Express.js 4.22 + Sequelize 6.37 ORM + MySQL
- **Autenticacao:** JWT 9.x (JSON Web Tokens) + Bcrypt 5.1
- **Containerizacao:** Docker + Docker Compose

### Padroes de Design
- **MVC:** Controllers separam logica de negocio das rotas
- **Auto-discovery:** Models e Controllers sao carregados automaticamente via filesystem scan
- **Component-based:** Frontend usa componentes reutilizaveis (hi-table, hi-field-list, hi-select, hi-select-ajax, etc.)
- **RESTful API:** Endpoints seguem convencoes REST
- **SRP (Single Responsibility):** Cada controller/model trata uma unica entidade
- **DRY:** Componentes reutilizaveis no frontend e utilitarios compartilhados no backend
- **Lazy Loading:** Todas as rotas frontend usam dynamic import para code splitting

### Estrutura do Banco de Dados
- 16 entidades Sequelize com associacoes relacionais
- Soft deletes (paranoid mode) em todas as tabelas
- Timestamps automaticos (created_at, updated_at, deleted_at)
- Nomenclatura underscored (snake_case)

---

## Modulos Implementados

### 1. Dashboard
- Cards com metricas: total de pacientes, consultas, consultas canceladas, horarios disponiveis
- Card de receita mensal (financeiro)
- Card de consultas do dia
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

### 8. Financeiro
- Lancamentos financeiros (receitas e despesas)
- Vinculacao com paciente, profissional, consulta e procedimento
- Listagem paginada com busca e filtros por periodo/tipo
- Formulario de lancamento com forma de pagamento e status
- Edicao de lancamentos existentes
- Resumo financeiro (totais de receita, despesa, saldo do mes)
- Card de receita mensal no Dashboard
- Rotas REST: GET /financeiro, GET /financeiro/resumo, GET /lancamento/:id, POST /financeiro, POST /lancamento/:id
- Status: **Completo (v1.2)**

### 9. Prontuario Eletronico - Historico de Consultas
- Historico completo de consultas do paciente na ficha
- Visualizacao de data, horario, dentista, procedimento e status
- Sistema de evolucoes clinicas por consulta (CRUD)
- Registro de notas clinicas com data e profissional responsavel
- Model Evolution com descricao, tipo e data de registro
- Componente ConsultationHistory integrado na ficha do paciente
- Rotas REST: GET /consultas/paciente/:patient_id, POST /evolucao/:consultation_id, DELETE /evolucao/:id
- Status: **Completo (v1.3)**

### 10. Odontograma Interativo
- Mapa dental visual com 32 dentes (notacao FDI internacional)
- Arcadas superior e inferior com quadrantes direito/esquerdo
- SVG interativo com representacao das 5 faces dentais (V, L, M, D, O)
- 10 condicoes dentais: higido, cariado, restaurado, ausente, fraturado, implante, endodontia, protese, selante, em tratamento
- Codigo de cores por condicao com legenda visual
- Registro por face individual do dente ou condicao geral
- Historico completo de alteracoes por dente com data, profissional e observacao
- Vinculacao com procedimento realizado
- Estado atual do odontograma (ultima condicao por dente/face)
- Cadastro em lote de multiplos dentes
- Integrado na ficha do paciente (acima do historico de consultas)
- Pagina dedicada acessivel via /paciente/:id/odontograma
- Model Odontograma com dente, face, condicao, observacao, data_registro
- Associacoes com Patient, Professional, Procedure
- Controller com CRUD + current state + batch + tooth history
- Rotas REST: GET /odontograma/:patient_id, GET /odontograma/:patient_id/atual, GET /odontograma/:patient_id/dente/:dente, POST /odontograma/:patient_id, POST /odontograma/:patient_id/lote, DELETE /odontograma/registro/:id
- Status: **Completo (v1.4)**

### 11. Autenticacao
- Login/Registro com JWT
- Middleware de autenticacao em todas as rotas protegidas
- Status: **Completo**

### 12. Upload de Arquivos
- Upload generico de imagens
- Busca de imagens externas por termo
- Status: **Completo**

### 13. Configuracoes
- Pagina de configuracoes (base)
- Status: **Parcial**

---

## Roadmap - Proximas Funcionalidades

### Fase 3 - Prontuario e Odontograma (Prioridade Alta) - CONCLUIDA
- [x] **Historico de consultas na ficha do paciente** - Listagem completa com evolucoes
- [x] **Evolucoes clinicas** - Registro de notas por consulta com profissional responsavel
- [x] **Card de consultas do dia no Dashboard** - Visao rapida das consultas agendadas
- [x] **Odontograma interativo** - Mapa dental visual SVG com status por dente e face, historico e vinculacao com procedimentos
- [ ] **Receituario** - Geracao de receitas medicas vinculadas ao paciente

### Fase 4 - Comunicacao (Prioridade Media)
- [ ] **Lembretes por e-mail** - Lembretes automaticos de consultas
- [ ] **Lembretes por SMS** - Integracao com gateway SMS
- [ ] **Lembretes por WhatsApp** - Integracao com WhatsApp Business API
- [ ] **Templates de mensagens** - Templates customizaveis para e-mail/SMS/WhatsApp
- [ ] **Integracao Google Calendar** - Sincronizacao com Google Calendar

### Fase 5 - Medicamentos e Exames (Prioridade Media)
- [ ] **Cadastro de medicamentos** - Base de medicamentos com posologia
- [ ] **Geracao de receitas** - Receitas com medicamentos cadastrados
- [ ] **Cadastro de exames** - Tipos de exames e resultados
- [ ] **Sugestao de locais para compra** - Farmacias com preco total

### Fase 6 - Financeiro Avancado (Prioridade Media-Alta)
- [ ] **Geracao de recibos/notas** - PDF de recibos
- [ ] **Relatorios financeiros por periodo** - Graficos e exportacao
- [ ] **Integracao com convenios** - Faturamento TISS
- [ ] **Controle de inadimplencia** - Alertas de pagamentos pendentes
- [ ] **Fluxo de caixa** - Visualizacao de entradas e saidas
- [ ] **Emissao de boletos** - Integracao com gateway de pagamento (IUGU)

### Fase 7 - Relatorios (Prioridade Media)
- [ ] **Relatorio de pacientes** - Exportacao e filtros
- [ ] **Relatorio de consultas** - Por periodo, dentista, procedimento
- [ ] **Relatorio de procedimentos** - Mais realizados, receita por procedimento
- [ ] **Relatorio de exames** - Pendentes, realizados
- [ ] **Relatorio de medicamentos** - Mais prescritos
- [ ] **Relatorio de receitas** - Por paciente, periodo

### Fase 8 - Administracao (Prioridade Baixa)
- [ ] **Configuracoes de e-mail** - SMTP settings
- [ ] **Configuracoes de WhatsApp** - API credentials
- [ ] **Configuracoes de SMS** - Gateway settings
- [ ] **Configuracoes gerais** - Dados da clinica, logo
- [ ] **Credenciais para APIs externas** - SMS, IUGU, Google
- [ ] **Cadastro de especializacoes** - Filtro em procedimentos por especialidade
- [ ] **Listar pacientes vinculados ao dentista** - Na ficha do dentista

### Fase 9 - Seguranca e Backup (Prioridade Baixa)
- [ ] **Backup de dados** - Exportacao completa do banco
- [ ] **Backup de imagens** - Exportacao de arquivos
- [ ] **Backup de arquivos** - Exportacao geral
- [ ] **Logs de erros** - Registro e visualizacao de erros
- [ ] **Logs de acesso** - Auditoria de acessos
- [ ] **Notificacoes de erros** - Alertas de erros criticos
- [ ] **Notificacoes de acesso** - Alertas de acessos suspeitos

### Fase 10 - Lembretes Automatizados (Prioridade Baixa)
- [ ] **Lembretes de consultas** - Antes da consulta
- [ ] **Lembretes de exames** - Exames pendentes
- [ ] **Lembretes de medicamentos** - Renovacao de receitas
- [ ] **Lembretes de aniversarios** - Felicitacoes automaticas

### Fase 11 - Avancado
- [ ] **Controle de estoque** - Materiais odontologicos
- [ ] **Multi-clinica** - Suporte a varias unidades
- [ ] **App mobile** - Versao mobile responsiva
- [ ] **Assinatura digital** - Assinatura digital de documentos
- [ ] **RBAC** - Controle de acesso por perfil (admin, dentista, recepcionista)

---

## Metricas do Projeto

| Categoria | Quantidade |
|-----------|-----------|
| Models (Sequelize) | 16 |
| Controllers | 13 |
| Endpoints REST | 62+ |
| Views (Vue) | 23 |
| Componentes reutilizaveis | 14 |
| Rotas frontend | 25 |
| Modulos completos | 12 |
| Modulos parciais | 1 |
| Funcionalidades no roadmap | 35+ |

---

## Historico de Versoes

### v1.4.0 - Odontograma Interativo (2026-03-24)
- Adicionado Odontograma interativo com mapa dental SVG de 32 dentes (notacao FDI)
- Model Odontograma com dente, face, condicao, observacao, data_registro
- Associacoes com Patient, Professional, Procedure
- Controller com CRUD + estado atual (current) + historico por dente + cadastro em lote (batch)
- 10 condicoes dentais com codigo de cores: higido, cariado, restaurado, ausente, fraturado, implante, endodontia, protese, selante, em tratamento
- Representacao visual das 5 faces dentais (V, L, M, D, O) por dente
- Rotas REST: GET /odontograma/:patient_id, GET /odontograma/:patient_id/atual, GET /odontograma/:patient_id/dente/:dente, POST /odontograma/:patient_id, POST /odontograma/:patient_id/lote, DELETE /odontograma/registro/:id
- Componente Vue OdontogramaChart com SVG interativo, legenda, painel de edicao e historico
- Pagina dedicada OdontogramaPage acessivel via /paciente/:patient_id/odontograma
- Integrado na ficha do paciente (PacienteNew) acima do historico de consultas
- Rota frontend adicionada no router
- Dependencias atualizadas: Express 4.22, Axios 1.13, Vue 3.5

### v1.3.0 - Prontuario Eletronico (2026-03-23)
- Adicionado Historico de Consultas integrado na ficha do paciente
- Model Evolution para evolucoes clinicas (descricao, tipo, data, profissional)
- Associacao Consultation hasMany Evolution
- Controller ConsultationHistory com listagem por paciente + CRUD de evolucoes
- Rotas REST: GET /consultas/paciente/:patient_id, POST /evolucao/:consultation_id, DELETE /evolucao/:id
- Componente Vue ConsultationHistory com tabela expansivel e formulario de evolucao inline
- Dashboard atualizado com card de consultas do dia
- Dependencias atualizadas: Express 4.21, Sequelize 6.37, JWT 9.x, Bcrypt 5.1, Formidable 2.x

### v1.2.0 - Financeiro (2026-03-23)
- Adicionado modulo completo Financeiro (lancamentos de receitas e despesas)
- Model Financial com tipo, valor, data, forma de pagamento, status, observacao
- Associacoes com Patient, Professional, Consultation, Procedure
- Controller com CRUD + endpoint de resumo financeiro
- Rotas REST: GET /financeiro, GET /financeiro/resumo, POST /financeiro, etc.
- Vista FinanceiroList com cards de resumo (receitas, despesas, saldo)
- Vista FinanceiroNew com formulario completo e select ajax de paciente/profissional
- Dashboard atualizado com card de receita mensal

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
