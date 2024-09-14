import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completions'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSumaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSumaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Conecto no server, ta rodando')
  })
