# DevSecOps / AWS

## How it works

### Copy and edit .env

```shell
cp .env.sample .env
```
Then edit `.env` file and set your own database values.

### Launch application

#### With Docker
```shell
docker run -d -p 80:8000 --name devsecops --rm maengdok/mds-devsecops:latest
```

#### Without Docker
```shell
npm start
```

### Routes

#### Requirements

- Postman

### `/user/register`
**Payload**

```json
{
  "email": YOUR_EMAIL,
  "password": YOUR_PASSWORD
}
```

### `/user/login`
**Payload**

```json
{
  "email": YOUR_EMAIL,
  "password": YOUR_PASSWORD
}
```
