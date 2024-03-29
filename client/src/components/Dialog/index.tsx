import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

interface IDialog {
  title: string
  legend: string
  triggerLabel: string
  inputLabel: string
  inputDisabled?: boolean
  onSubmit?: () => void
  children: React.ReactNode
}

const Dialog = ({
  title,
  legend,
  triggerLabel,
  inputLabel,
  inputDisabled = false,
  onSubmit,
  children
}: IDialog) => {
  return (
    <DialogUI>
      <DialogTrigger asChild>
        <Button className="w-full ">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit && onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{legend}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">{children}</div>
          <DialogFooter>
            <Button type="submit" disabled={inputDisabled}>
              {inputLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogUI>
  )
}

export default Dialog
