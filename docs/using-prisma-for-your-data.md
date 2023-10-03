# Using Prisma for your data

Our starter kit uses Prisma as an ORM to define your database schema, and to access and modify your data in a typesafe way.

## Local development

To develop locally, make sure you're running your local db via docker:

```sh
colima start # this will start your docker runtime

docker-compose up --build # this will run the postgres database container
```

Once you've done this, you can inspect or directly modify the data available on your database by using [Prisma Studio](https://www.prisma.io/studio).

```sh
npx prisma studio
```

See [their docs](https://www.prisma.io/studio) for more info.

## FAQ

#### **I get an error in Prisma Studio about the `DATABASE_URL` not being set?**

Copy the `DATABASE_URL` var from the `.env.example` into your own `.env` file.
