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

## To migrate or not to migrate?
Throughout the development cycle, you'll probably be making a lot of changes to your database structure, models and schema, while you prototype what works for your needs.

When you modify your schema, any existing data may need to be modified or recreated, in order to match the new schema. If you don't do this, you will end up with inconsistent data, and/or broken experiences.

There are a couple of strategies that you can take in this situation.

### Wipe the DB and repopulate
This approach involves clearing your database, or the affected portion, and repopulating it with new data.

This approach is good when:
- You're making lots of frequent changes to your database schema (eg. you're prototyping the structure in a local dev environment)
- You aren't worried about the data that you will lose (eg. if it's dev data, rather than customer data)
- You are confident that you can recreate the data you need
- The history of the data changes aren't important (eg. you aren't trying to keep multiple environments consistent)

How to follow this strategy:


### Create a data migration
This approach involves programmatically taking your data from the old schema to the new schema, using a migration script.

This approach is good when:
- You need to prevent any data loss (eg. if you're dealing with customer data, or data in a production environment)
- You want to track the history of your data changes (eg. you're trying to maintain consistency between environments with existing data)

How to follow this strategy:

## FAQ

#### **I get an error in Prisma Studio about the `DATABASE_URL` not being set?**

Copy the `DATABASE_URL` var from the `.env.example` into your own `.env` file.
