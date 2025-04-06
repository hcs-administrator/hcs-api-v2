require('dotenv').config()
const express = require('express')
const cors = require('cors')

// GraphQL
const { buildSchema } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const { root } = require('./__graphql/open/resolvers')
const { schema } = require('./__graphql/open/schema')

// SWAGGER UI
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const YAML = require('yamljs');
const basicAuth = require('express-basic-auth');

// Instances
const app = express()
const theme = new SwaggerTheme();
const swaggerDefinition = YAML.load('./swagger.yaml');

// Variables
const port = process.env.PORT || 3000

// Middleware (Security)
app.use(cors()) //This needs to be secured

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// ROUTES
const useMainRouter = require('./__routes/open/main')
app.use('/', useMainRouter)

const useLoginRouter = require('./__routes/open/token')
app.use('/token', useLoginRouter)

// May not need this one
// const useJWTRouter = require('./routes/jwt')
// app.use('/jwt', useJWTRouter)

// const useGoogleCalendarRouter = require('./__routes/secure/google/calendar')
// app.use('/gcal', useGoogleCalendarRouter)

// const useGoogleDocsRouter = require('./__routes/secure/google/docs')
// app.use('/gdoc', useGoogleDocsRouter)

const useOpenNocoRouter = require('./__routes/open/noco')
app.use('/open-noco', useOpenNocoRouter)

const useNocoRouter = require('./__routes/secure/noco')
app.use('/noco', useNocoRouter)

const usePapercutRouter = require('./__routes/secure/papercut')
app.use('/pc', usePapercutRouter)

const useVoipRouter = require('./__routes/secure/voip')
app.use('/voip', useVoipRouter)

const useKamarRouter = require('./__routes/secure/kamar')
app.use('/kamar', useKamarRouter)

//Graphql Schema and Routes
// const schema = buildSchema(`type Query { hello: String } `);

// const root = {
//     hello() {
//       return 'Hello world!';
//     },
// };

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

// Serve the GraphiQL IDE.
app.get('/pg', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

// Swagger Themes
const optionsV1 = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};
  
const optionsV2 = {
    explorer: false,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.MUTED)
}

// Swagger Docs
const options = {
    swaggerDefinition,
    apis: ['./routes/**/*.js'],
};
  
const swaggerSpec = swaggerJSDoc(options);

app.use('/_dark', basicAuth({
    users: { '22222' : 'x-api' },
    challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerSpec, optionsV1));

app.use('/_light', basicAuth({
  users: { '22222' : 'x-api' },
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerSpec, optionsV2));

//Graphql Endpoint

app.listen(port, () => console.log(`App listening on port ${port}!`));