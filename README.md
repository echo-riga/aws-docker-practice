# IT204 E-commerce Services

A Node.js and Express exercise for running independent product and customer APIs locally or in Docker. The GitHub repository is named **aws-docker-practice**.

## Services

| Service | Default URL | Data |
| --- | --- | --- |
| Product | http://localhost:3001/products | Name, price, stock |
| Customer | http://localhost:3002/customers | Name, email |

Both services keep records in memory. Restarting a service restores its sample data. There is no database, authentication, or storefront in this repository.

## Run locally

Use Node.js 24 to match the Docker images. In separate terminals, run:

```sh
cd product-service
npm ci
node server.js
```

```sh
cd customer-service
npm ci
node server.js
```

Each service supports a PORT environment variable. There is no npm start script; start the server directly as shown above.

## Run with Docker

From the repository root:

```sh
docker build -t it204-products ./product-service
docker build -t it204-customers ./customer-service
docker run --rm -p 3001:3001 it204-products
```

In another terminal:

```sh
docker run --rm -p 3002:3002 it204-customers
```

## API

Replace RESOURCE with products or customers and use the corresponding service port.

| Method | Path | Action |
| --- | --- | --- |
| GET | /RESOURCE | List records |
| GET | /RESOURCE/:id | Retrieve a record |
| POST | /RESOURCE | Create a record |
| PUT | /RESOURCE/:id | Replace editable fields |
| DELETE | /RESOURCE/:id | Delete a record |

POST and PUT require Content-Type: application/json. Product bodies include a nonempty name, a nonnegative numeric price, and a nonnegative integer stock. Customer bodies include a nonempty name and a valid email. IDs are assigned by the server.

Example product body:

```json
{ "name": "Notebook", "price": 50, "stock": 20 }
```

Example customer body:

```json
{ "name": "Jamie Reyes", "email": "jamie@example.test" }
```

## Verification

Start both services and request their list endpoints. The package.json test scripts are placeholders and do not run automated tests. Supporting materials are in [documentation](documentation).
