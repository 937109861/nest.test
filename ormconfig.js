model.exports = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'123123',
    database:'postgres',
    entities:['dist/**/*.entity.js'],
    migrations:['dist/migrations/*.js'],
    cli:{
        migrationsDir:'src/migrations',
    },
};