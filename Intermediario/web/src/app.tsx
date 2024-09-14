import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { ExmptyGoals } from './components/empty-goals'
import { Dialog } from './components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <ExmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}

// EU N SEI + Q PORRA EU TO FAZENDO AKI
