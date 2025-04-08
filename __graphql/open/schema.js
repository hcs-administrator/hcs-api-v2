const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');

const schema1 = buildSchema(`
    
    type Login {
      token: String
    }

    type Query {
      getToken(eid: String, password: String): Login
      getTokenWithTime(eid: String, password: String, time: String): Login
    }

`);

module.exports = { schema1 }