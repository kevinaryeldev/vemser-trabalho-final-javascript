# Sistema de Vagas de Emprego

Esse projeto usa como base uma fake api criada com Json-Server + Json-Server-Auth rodando num servidor local. 

## inicializar o servidor
```
npm run start
```

## Endpoints
```
/users
/vagas
```

### Cadastro

POST - /register ou  /users ou /signup – criar usuarios 

body: 
```
{
    “nome”: “Jhon Doe”,
    “email”: “exemplo@email.com”,
    “password”: 123456,
    “funcao”: Candidato || Recrutador
    "nascimento": "aaaa-mm-dd"
}
```

response:
```
{
    "accessToken": "eyJhahsaisjiqoko..."
    "user":{
        “email”: “exemplo@email.com”,
        "id": 4,
        "funcao": "Recrutador"  || "Candidato",
        "nome": "Jhon Doe",
        "nascimento": "aaaa-mm-dd"
    }
}
```


### Resgatar info do usuario

Required Auth: Bearer Token

GET - /users/id


### Login
POST - /login /signin – login usuarios

body:
```
{
	“email”: “exemplo@email.com”,
	“password”: 123456
}
```


response:
```
{
    "accessToken": "eyJhahsaisjiqoko...",
    "user":{
        “email”: “exemplo@email.com”,
        "id": 4,
        "funcao": "Recrutador"  || "Candidato",
        "nome": "usuarioA",
        "nascimento": "aaaa-mm-dd"
    }
}
```
### Vagas
GET  - /vagas - listar vagas

GET  - /vagas/?id - listar vaga com o id

POST - /vagas – criar vaga

Required Auth: Bearer token

body:
```
{
    "candidatos": [],
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    “ownerID”: 1,
    "payment": "R$ 5000",
    "title":"Lorem ipsum"
}
```

response:
```
{
    "candidatos": [],
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    “ownerID”: 1,
    "payment": "R$ 5000",
    "title":"Lorem ipsum",
    id:1
}
```

PATCH - /vagas/id - editar vaga

Required Auth: Bearer token

body:
```
{
    "payment": "R$ 6000",
}
```

response:
```
{
    "candidatos": [],
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	“ownerID”: 1,
    "payment": "R$ 6000",
    "title":"Lorem ipsum",
    id:1
}
```

DELETE - /vagas/id - deletar vaga

Required Auth: Bearer token

body:
```
{}
```

response:
```
{}
```
