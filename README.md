# statstag

![CI/CD](https://github.com/mfinelli/statstag/actions/workflows/default.yml/badge.svg)
![Image Size](https://img.shields.io/docker/image-size/mfinelli/statstag)

## migrations

After doing quite a bit of research for how to handle database migrations I have
come to the conclusion that the Node JS ecosystem is in a sorry state of
affairs. I have decided to use the [slonik](https://github.com/gajus/slonik) to
interact with the database, but that library doesn't handle migrations, and one
of the most popular [tools](https://github.com/mmkal/slonik-tools) to do so has
not been updated since several major releases so they are not compatible.

I also investigated several other tools and libraries, but nothing was able to
meet my needs (one of which is principally that I want to write the migrations
in plain SQL, not in a Javascript or Typescript DSL). So, I have decided instead
to roll my own. This of course has its drawbacks but my use-case is pretty
simple and I don't need a lot of the features that other libraries or frameworks
provide so it's an acceptable risk, for now.

One very important note is that migrations are configured to run automatically
on application startup and there is currently no way to do a rollback. "Down"
migrations should still be written, but in the event that they need to be
applied they will need to be applied manually using `psql`.

### creating new migration files

In the event that I can one day switch to the `@slonik/migrator` tool which uses
[umzug](https://github.com/sequelize/umzug) under the hood, migration files
should follow their pattern. You can create new migrations using a simple shell
command:

```shell
touch migrations/{down/,}$(date '+%Y.%m.%dT%H.%M.%S').migration_name.sql
```
