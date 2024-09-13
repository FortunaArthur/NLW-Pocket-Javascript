import dayjs from 'dayjs'
import { db } from '../db'
import { and, count, gte, lte, sql, eq } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'

export async function getWeekPendingGoals() {
  const firstDayofWeek = dayjs().startOf('week').toDate()
  const LastDayofWeek = dayjs().endOf('week').toDate()

  const goalsCreastedUpToWeek = db.$with('goals-created_up-to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desireWeeklyFrequency: goals.desireWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, LastDayofWeek))
  )

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
          lte(goalCompletions.createdAt, LastDayofWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreastedUpToWeek, goalCompleteCounts)
    .select({
      id: goalsCreastedUpToWeek.id,
      title: goalsCreastedUpToWeek.title,
      desireWeeklyFrequency: goalsCreastedUpToWeek.desireWeeklyFrequency,
      completionCount: sql`
      COALESCE(${goalCompleteCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreastedUpToWeek)
    .leftJoin(
      goalCompleteCounts,
      eq(goalCompleteCounts.goalId, goalsCreastedUpToWeek.id)
    )

  return { pendingGoals }
}
