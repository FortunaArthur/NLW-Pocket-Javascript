import logo from '../assets/logo-in-orbit.svg'
import lotsStart from '../assets/lets-start-illustration.svg'
import { DialogTrigger } from './ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

export function ExmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={lotsStart} alt="in.orbit" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        TU NAUM VAI CADASTRAR META NÃO? SE FUDEU, VAI CADASTRA AGORA
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
      {/* <button
        type="button"
        className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 text-sm font-medium tracking-tight hover:bg-violet-600"
      >
        <Plus className="size-4" />
        Cadastrar meta
      </button> */}
    </div>
  )
}
