# idm-demo
Build trust between microservices using jwt-hmac secret

# Redis Commands:
docker run -d --name some-redis -p 6379:6379 redis
docker exec -it some-redis bash

# Run Application:
# To install dependicies
npx lerna bootstrap

# To run H-API:
 - cd packages/HealixAPI/
 - npm start

# To run V-API:
 - cd packages/VeridAPI/
 - npm start

**Connected Healix API - http://localhost:4000** <br />
**Connected Verid API - http://localhost:3000** <br />

# APIs:
**To generate HMAC secret:** <br />
POST: http://localhost:3000/generateHmacSecret <br />
Body: {
    "orgId": "{orgId}",
    "algorithm": "sha256"
}

**To generate verid token:** <br />
POST: http://localhost:4000/generateVeridToken <br />
Body: {
    "orgId": "{orgId}",
    "username": "{username}"
}

**To get user data from verid-api with auth check:** <br />
POST: http://localhost:3000/getUser/{orgId} <br />
Header: {
    "Authorization": "Bearer {token}"
}
