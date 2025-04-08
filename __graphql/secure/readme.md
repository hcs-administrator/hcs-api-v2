## VOIP Queries

```
mutation addVoipUser($token: String, $name: String, $displayname: String, $password: String, $confirm: String, $emailaddress: String, $extension: String) {
  addVoipUser(token: $token, name: $name, displayname: $displayname, password: $password, confirm: $confirm, emailaddress: $emailaddress, extension: $extension) {
    message
  }
}

mutation deleteVoipUser($token: String, $id: String) {
  deleteVoipUser(token: $token, id: $id) {
    message
  }
}

query V1($token:String) {
  getVoipUser(token: $token, user: "jk9") {
    useruniqueid
    name
  }
}

query V2($token:String) {
  getVoipMe(token: $token) {
    useruniqueid
    name
  }
}

query V3($token:String) {
  getVoipUsers(token: $token) {
    useruniqueid
    name
  }
}
```

```
{	
    "token": "SUPER_ADMIN",
    "id" : "274",
    "name" : "Jeff2 Test2",
    "displayname" : "Jeff2 Test2",
    "password" : "Base1234!",
    "confirm" : "Base1234!",
    "emailaddress" : "jk9@hcs.kiwi",
    "extension" : "9419"
}
```

## Papercut Queries

```
query P1($token:String) {
  getPapercutUser(token: $token, user: "proprietors2") {
    name
  }
}

query P2($token:String) {
  getPapercutMe(token: $token) {
    name
  }
}

query P3($token:String) {
  getPapercutUsers(token: $token)
}

mutation addPapercutUser($token: String, $username: String, $password: String, $fullname: String, $email: String, $card: String, $pin: String) {
  addPapercutUser(token: $token, username: $username, password: $password, fullname: $fullname, email: $email, card: $card, pin: $pin) {
    message
  }
}

mutation deletePapercutUser($token: String, $username: String) {
  deletePapercutUser(token: $token, id: $username) {
    message
  }
}
```

```
{	
    "token": "SUPER_ADMIN",
    "username" : "proprietors2",
    "password" : "NZceb335",
    "fullname" : "HCS Proprietors",
    "email" : "admin2@hcsinc.nz",
    "card" : "3342",
    "pin" : "9966"
}
```

# KAMAR Queries

Note that KAMAR queries pull data directly from KAMAR and there is no write function in their API, so only read queries are provided below

```
#Ability to set fields, should you need them - if a a lot of data is queried then it could save traffic
query K1($token:String, $type: String, $fields: [String]) {
  getKamarUsers(token: $token, type: $type, fields:$fields) {
   	name
    username
    email
  }
}

#Fields are set to [], so that you only need to filter them in the query itself.
query K1a($token:String, $type: String) {
  getKamarUsers(token: $token, type: $type, fields:[]) {
   	name
    username
    email
  }
}

#Ability to set fields, should you need them - although a single object does not send a lot of data, the option is nice, could be for security
query K2($token:String, $id: String, $fields: [String]) {
  getKamarUser(token: $token, id: $id, fields: $fields) {
   	name
    username
    email
  }
}

#Fields are set to [], so that you only need to filter them in the query itself.
query K2a($token:String, $id: String) {
  getKamarUser(token: $token, id: $id, fields:[]) {
   	name
    username
    email
  }
}
```

```
{	
    "token": "SUPER_ADMIN",
  	"id" : "ethkra52",
    "type" : "staff",
  	"fields" : ["username"]
}
```

