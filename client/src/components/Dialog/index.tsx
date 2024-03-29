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
  onSubmit?: () => void
  children: React.ReactNode
}

const Dialog = ({
  title,
  legend,
  triggerLabel,
  inputLabel,
  onSubmit,
  children
}: IDialog) => {
  return (
    <DialogUI>
      <form onSubmit={onSubmit && onSubmit}>
        <DialogTrigger asChild>
          <Button className="w-full ">{triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{legend}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">{children}</div>
          <DialogFooter>
            <Button type="submit">{inputLabel}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </DialogUI>
  )
}

export default Dialog
