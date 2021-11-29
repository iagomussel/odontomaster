#!/usr/bin/env python3

"""
get registers from old database end convert to new database system
"""
import mysql.connector
import requests
import json
import re
old_system = {
    "db": {
        "host": "localhost",
        "user": "root",
        "password": "1198ae76a51f1306a4419e6af99337e67ed2fc39e31b4d2b8131c8f2de1d6cc6",
        "database": "old_db",
        "charset": "utf8mb4"}
}
new_system = {
    "url": "localhost:3000",
    "user": "admin",
    "password": "admin",
}

query = """SELECT p.*, d.nomedentista, c.*, e.*, a.descricao as obs, cp.codigoAssociado as plano, c.nomeconvenio as convenio from pacientes p
    left join dentistas_pacientes dp on dp.pacientes_idpacientes = p.idpacientes
    left join dentistas d on dp.dentistas_iddentistas = d.iddentistas
    left join convenios_pacientes cp on cp.pacientes_idpacientes = p.idpacientes
    left join convenios c on c.idconvenios = cp.convenios_idconvenios
    left join enderecos e on e.pacientes_idpacientes = p.idpacientes
    left join anamneses a on a.pacientes_idpacientes = p.idpacientes
    ;
"""

json_data = '{{ "id":0,"ficha":"{codigoLegado}","nome":"{nome}","data_nasc":null,"email":"{email}","imagem":"{imagem}","sexo":"{sexo}","professionals":[{{ "professional":"{nomedentista}" }}],"plans":[{{ "agreement":"{convenio}","numero":"{plano}","ativo":"Sim" }}],"addresses":[ {{ "cep":"{cep}","logradouro":"{logradouro}","numero":"{numero}","complemento":"{complemento}" ,"bairro":"{bairro}","cidade":"{cidade}","uf":"{uf}" }}],"phones":[],"obs":[{{"obs":"{obs}" }}] }}'



def get_jwt():
    url = "http://{}/api/login".format(new_system["url"])
    data = {
        "username": "admin",
        "password": "admin"
    }
    response = requests.post(url, data=data)
    return response.json()["token"]

def verify(st):
    if st == "" or st == 'None' or st == None:
        return None
    if st:
        if isinstance(st, str):
            s = st.upper()
            s = re.sub(r'[^A-Z0-9 ]+', '', s)
            print(s)
            return s
    else:
        return None

def main():
    print("get JWT")
    jwt = get_jwt()
    print("connecting to old database")
    conn = mysql.connector.connect(**old_system["db"])
    print("connected")
    cursor = conn.cursor(dictionary=True)
    print("executing query")
    cursor.execute(query)
    print("query executed")
    url = "http://{}/api/pacientes".format(new_system["url"])
    print(url)
    print("start to register...")
    for row in cursor:
        print(row["codigoLegado"], row["nome"])
        json_row = json_data.format(
            codigoLegado=row["codigoLegado"],
            nome=verify(row["nome"]),
            email=verify(row["email"]),
            imagem=verify(row["imagem"]),
            sexo=verify(row["sexo"]),
            nomedentista=verify(row["nomedentista"]),
            convenio=verify(row["convenio"]),
            plano=row["plano"],
            cep=row["cep"],
            logradouro=verify(row["logradouro"]),
            numero=row["numero"],
            complemento=row["complemento"],
            bairro=verify(row["bairro"]),
            cidade=verify(row["cidade"]),
            uf=row["uf"],
            obs=verify(row["obs"])
            )
        print(json_row)
        data = json.loads(json_row)
        if row["dtNascimento"]:
            data["data_nasc"] = row["dtNascimento"].strftime("%d/%m/%Y")

        print(data)
        response = requests.post(url, json=data, headers={"Authorization": "Bearer {}".format(jwt)})
        print(response)


if __name__ == "__main__":
    main()
