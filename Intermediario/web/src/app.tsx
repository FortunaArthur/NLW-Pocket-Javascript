import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
// import { ExmptyGoals } from './components/empty-goals'
import { Dialog } from './components/ui/dialog'

export function App() {
  // return <h1>SALVE GARAI</h1>
  return (
    <Dialog>
      {/* <ExmptyGoals /> */}
      <Summary />
      <CreateGoal />
    </Dialog>
  )
}

// EU N SEI + Q PORRA EU TO FAZENDO AKI
