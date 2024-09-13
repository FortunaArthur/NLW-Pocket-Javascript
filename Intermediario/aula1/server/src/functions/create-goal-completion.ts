import { and, count, gte, lte, sql, eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayofWeek = dayjs().startOf('week').toDate()
  const LastDayofWeek = dayjs().endOf('week').toDate()

  const goalCompleteCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, LastDayofWeek),
          lte(goalCompletions.createdAt, LastDayofWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalCompleteCounts)
    .select({
      desireWeeklyFrequency: goals.desireWeeklyFrequency,
      completionCount: sql`
    COALESCE(${goalCompleteCounts.completionCount}, 0)
    `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalCompleteCounts, eq(goalCompleteCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desireWeeklyFrequency } = result[0]

  if (completionCount >= desireWeeklyFrequency) {
    throw new Error('COMPLETOU')
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()
  const goalCompletion = result[0]

  return {
    goalCompletion,
  }
}
