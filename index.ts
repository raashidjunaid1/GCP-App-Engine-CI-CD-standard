require('dotenv').config()

const fastify = require('fastify')({
    logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: process.env.API_KEY})
})

// Run the server!
fastify.listen(process.env.PORT, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})