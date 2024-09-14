import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'

export function Summary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de Pandora</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>58%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          MORRER
        </OutlineButton>

        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          MORRER
        </OutlineButton>

        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          MORRER
        </OutlineButton>

        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          MORRER
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">TUA SEMANINHA</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            DUMINGO
            <span className="text-zinc-400 text-xs">(10 de warcraft)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                COMPLETOU <span className="text-zinc-100">JOOJ</span> 5 PRAS{' '}
                <span className="text-zinc-100">NUNCA NEM VI</span>{' '}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
