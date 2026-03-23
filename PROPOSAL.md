# OdontoMaster - Product Plan

## Visão Geral
OdontoMaster é um sistema de gestão para clínicas odontológicas, projetado para gerenciar pacientes, profissionais, agendamentos, procedimentos, convênios e finanças.

## Stack Tecnológica
- **Backend:** Node.js + Express + Sequelize ORM (PostgreSQL/MySQL)
- **Frontend:** Vue.js 3 + Materialize CSS
- **Autenticação:** JWT (JSON Web Tokens)
- **Infraestrutura:** Docker + Docker Compose

---

## Módulos

### 1. Autenticação e Usuários ✅
- [x] Login com JWT
- [x] Registro de usuários
- [x] Refresh token automático
- [ ] Recuperação de senha
- [ ] Controle de permissões por perfil (admin, dentista, recepcionista)

### 2. Pacientes ✅
- [x] Cadastro completo (dados pessoais, endereço, telefones)
- [x] Listagem paginada com busca
- [x] Vinculação com profissionais
- [x] Vinculação com convênios/planos
- [x] Observações do paciente
- [x] Upload de imagem
- [ ] Histórico clínico completo
- [ ] Anamnese (ficha médica)
- [ ] Odontograma interativo

### 3. Profissionais/Dentistas ✅
- [x] Cadastro com CRM e especialidade
- [x] Configuração de dias/horários disponíveis
- [x] Vinculação com usuário do sistema
- [ ] Dashboard individual do profissional
- [ ] Relatório de produtividade

### 4. Procedimentos ✅
- [x] Cadastro com valor, duração e periodicidade
- [x] Código TUSS
- [x] Listagem paginada com busca
- [ ] Categorização de procedimentos
- [ ] Tabela de preços por convênio

### 5. Convênios ✅
- [x] Cadastro de convênios
- [x] Vinculação com pacientes via planos
- [x] Convênio padrão
- [ ] Tabela de cobertura por procedimento
- [ ] Gestão de guias/autorizações

### 6. Agendamento/Consultas ✅
- [x] Agendamento com data/horário
- [x] Verificação de horários disponíveis
- [x] Encaixes
- [x] Cancelamento de consultas
- [x] Visualização por profissional
- [ ] Confirmação via notificação
- [ ] Reagendamento facilitado
- [ ] Status de consulta (aguardando, em atendimento, finalizada)

### 7. Financeiro 🔄 (Em desenvolvimento)
- [x] Modelo de lançamentos financeiros (receitas e despesas)
- [x] Vinculação com consulta, paciente e profissional
- [x] Listagem paginada com busca e filtros por período
- [x] Formulário de lançamento manual
- [x] Edição de lançamentos existentes
- [x] Dashboard financeiro (totais de receita, despesa, saldo)
- [ ] Geração de recibos/notas
- [ ] Relatórios financeiros por período
- [ ] Integração com convênios (faturamento)
- [ ] Controle de inadimplência
- [ ] Fluxo de caixa

### 8. Dashboard ✅
- [x] Cards com métricas (pacientes, consultas, horários disponíveis)
- [x] Card financeiro (receita do mês)
- [ ] Gráficos de tendência
- [ ] Próximas consultas do dia
- [ ] Alertas e notificações

### 9. Relatórios (Planejado)
- [ ] Relatório de atendimentos por período
- [ ] Relatório financeiro
- [ ] Relatório de procedimentos realizados
- [ ] Relatório de pacientes por convênio
- [ ] Exportação para PDF/Excel

### 10. Configurações ✅
- [x] Página de configurações
- [ ] Configuração de horário da clínica
- [ ] Personalização de campos
- [ ] Backup e restauração

---

## Roadmap

### Fase 1 - MVP ✅
- Cadastro de pacientes, profissionais, procedimentos e convênios
- Agendamento de consultas
- Dashboard básico
- Autenticação

### Fase 2 - Financeiro 🔄
- Módulo financeiro completo
- Dashboard com dados financeiros
- Lançamentos vinculados a consultas

### Fase 3 - Clínico (Próximo)
- Anamnese/ficha médica
- Odontograma
- Histórico clínico do paciente
- Prontuário digital

### Fase 4 - Relatórios e Integrações
- Relatórios gerenciais
- Exportação PDF/Excel
- Integração com convênios (faturamento TISS)
- Notificações (SMS/WhatsApp/Email)

### Fase 5 - Avançado
- Controle de estoque
- Multi-clínica
- App mobile
- Assinatura digital de documentos
