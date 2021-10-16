'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })

  fastify.get('/new', async function(request, reply){
    return ' new example'
  })
}
