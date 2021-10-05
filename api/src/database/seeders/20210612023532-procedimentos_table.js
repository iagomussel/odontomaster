'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('procedimentos', [
        {
            "TUSS": "85300080",
            "nome": "TRATAMENTO DE PERICORONARITE",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85300071",
            "nome": "TRATAMENTO DE GENGIVITE NECROSANTE AGUDA - GNA",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85300063",
            "nome": "TRATAMENTO DE ABSCESSO\r\nPERIODONTAL AGUDO",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85200034",
            "nome": "PULPECTOMIA",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100048",
            "nome": "COLAGEM DE FRAGMENTOS DENTÁRIOS",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001650",
            "nome": "TRATAMENTO DE ALVEOLITE",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001499",
            "nome": "SUTURA DE FERIDA EM\r\nREGIÃO BUCO-MAXILO- FACIAL",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001251",
            "nome": "REIMPLANTE DENTÁRIO COM CONTENÇÃO",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001197",
            "nome": "LUXAÇÃO DE ARTICULAÇÃO TÊMPORO-MANDIBULAR",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001030",
            "nome": "INTRA-ORAL DE ABSCESSO, REHDEUMÇÃAOTOSMIMAPEL/EOSUDE",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82001022",
            "nome": "INCISÃO E DRENAGEM\r\nEXTRA-ORAL DE ABSCESSO,\r\nINHCIESMÃOATEODMRAENEA/OGEUM",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000170",
            "nome": "DIAGNÓSTICO ANATOMOPATOLÓGICO EM PUNÇÃO NA REGIÃO BUCO-\r\nMAXILO-FACIAL",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000154",
            "nome": "DIAGNÓSTICO ANATOMOPATOLÓGICO EM PEÇA CIRÚRGICA NA REGIÃO BUCO-MAXILO-FACIAL",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000138",
            "nome": "DIAGNÓSTICO\r\nANATOMOPATOLÓGICO EM MATERIAL DE BIÓPSIA NA REGIÃO BUCO-MAXILO-",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000111",
            "nome": "DIAGNÓSTICO\r\nANATOMOPATOLÓGICO EM CITOLOGIA ESFOLIATIVA NA REGIÃO BUCO-MAXILO-",
            "valor": 0,
            "periodicidade": 0,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000057",
            "nome": "CONSULTA ODONTOLÓGICA DE URGÊNCIA 24 HS",
            "valor": 0,
            "periodicidade": 1,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000049",
            "nome": "CONSULTA ODONTOLÓGICA DE URGÊNCIA",
            "valor": 0,
            "periodicidade": 1,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85400041",
            "nome": "CONSERTO EM PRÓTESE\r\nPARCIAL REMOVÍVEL (EXCLUSIVAMENTE EM",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85300055",
            "nome": "REMOÇÃO DOS FATORES DE RETENÇÃO DO BIOFILME DENTAL (PLACA BACTERIANA)",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000198",
            "nome": "PROFILAXIA: POLIMENTO CORONÁRIO",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000163",
            "nome": "CONTROLE DE BIOFILME (PLACA BACTERIANA)",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000139",
            "nome": "ATIVIDADE EDUCATIVA EM SAÚDE BUCAL",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000090",
            "nome": "APLICAÇÃO TÓPICA DE FLÚOR",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "82000506",
            "nome": "CONTROLE POS-OPERATORIO EM ODONTOLOGIA",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000260",
            "nome": "DIAGNOSTICO POR MEIO DE PROCEDIMENTOS LABORATORIAIS",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000243",
            "nome": "DIAGNOSTICO POR MEIO DE ENCERAMENTO",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000235",
            "nome": "DIAGNOSTICO E TRATAMENTO DE XEROSTOMIA",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000219",
            "nome": "DIAGNOSTICO E TRATAMENTO DE HALITOSE",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000200",
            "nome": "DIAGNOSTICO E\r\nTRATAMENTO DE ESTOMATITE POR CANDIDOSE",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000197",
            "nome": "DIAGNOSTICO E TRATAMENTO DE\r\nESTOMATITE HERPETICA",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000189",
            "nome": "DIAGNOSTICO E PLANEJAMENTO PARA\r\nTRATAMENTO",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000073",
            "nome": "CONSULTA ODONTOLÓGICA PARA AVALIAÇÃO TÉCNICA\r\nDE AUDITORIA",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000065",
            "nome": "CONSULTA ODONTOLÓGICA INICIAL",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "81000030",
            "nome": "CONSULTA ODONTOLÓGICA",
            "valor": 0,
            "periodicidade": 6,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85300012",
            "nome": "DESSENSIBILIZACAO DENTARIA",
            "valor": 0,
            "periodicidade": 12,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000252",
            "nome": "TESTE PH  DE SALIVA",
            "valor": 0,
            "periodicidade": 12,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000244",
            "nome": "TESTE DE FLUXO SALIVAR",
            "valor": 0,
            "periodicidade": 12,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000074",
            "nome": "APLICAÇÃO DE SELANTE DE FÓSSULAS E FISSURAS",
            "valor": 0,
            "periodicidade": 18,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000058",
            "nome": "APLICAÇÃO DE SELANTE - TÉCNICA INVASIVA",
            "valor": 0,
            "periodicidade": 18,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85400211",
            "nome": "NÚCLEO DE PREENCHIMENTO",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85400025",
            "nome": "AJUSTE OCLUSAL POR DESGASTE SELETIVO",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85400017",
            "nome": "AJUSTE OCLUSAL POR ACRÉSCIMO",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100226",
            "nome": "RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 4 FACES OU MAIS FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100218",
            "nome": "RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 3 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100200",
            "nome": "RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 2 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100196",
            "nome": "RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 1 FACE",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100161",
            "nome": "RESTAURACAO EM\r\nIONOMERO DE VIDRO - 4 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100153",
            "nome": "RESTAURACAO EM\r\nIONOMERO DE VIDRO - 3 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100145",
            "nome": "RESTAURACAO EM IONOMERO DE VIDRO - 2\r\nFACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100137",
            "nome": "RESTAURACAO EM IONOMERO DE VIDRO - 1\r\nFACE",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100129",
            "nome": "RESTAURAÇÃO DE AMÁLGAMA - 4 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100110",
            "nome": "RESTAURAÇÃO DE AMÁLGAMA - 3 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100102",
            "nome": "RESTAURAÇÃO DE AMÁLGAMA - 2 FACES",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100099",
            "nome": "RESTAURAÇÃO DE AMÁLGAMA - 1 FACE",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "85100064",
            "nome": "FACETA DIRETA EM RESINA FOTOPOLIMERIZÁVEL",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        },
        {
            "TUSS": "84000031",
            "nome": "APLICAÇÃO DE CARIOSTÁTICO",
            "valor": 0,
            "periodicidade": 24,
            "created_at": new Date(),
            "updated_at": new Date()
        }
      ],{});
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Procedimentos', null, {});

  }
};
