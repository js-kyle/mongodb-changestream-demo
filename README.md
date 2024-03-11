# MongoDB Change Stream demo

## Setup

### Prerequisites

**Start MongoDB container using Docker**

```bash
docker run -d --rm -p 27017:27017 --name mongo1 mongo:7 mongod --replSet rs0 --bind_ip_all
```


**Configure MongoDB Replica Set**

```bash
docker exec mongo1 mongosh --quiet --eval "\
  var rs = rs.initiate({\
    '_id': 'rs0',\
    'members': [{'_id': 0, 'host': 'localhost:27017'}]\
  }).ok;\
  print('Replica set init result', rs);
"
```

**Install Node.js dependencies**

```bash
yarn
```

**Run the Demo Change Stream**

```bash
yarn start
```

Seed the database and make updates using the VSCode MongoDB Playgrounds.
