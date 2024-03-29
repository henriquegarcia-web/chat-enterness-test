import { CircleUser, Menu, Search, MessagesSquare } from 'lucide-react'

import {
  ChatInputField,
  CreateRoomDialog,
  Logo,
  NotSelectedChat
} from '@/components'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { useAuth } from '@/contexts/AuthContext'
import { useChat } from '@/contexts/ChatContext'

const ChatPage = () => {
  const { handleLogout } = useAuth()
  const { handleEntryRoom, currentRoom, rooms } = useChat()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo minify />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <ul>
                <li className="mb-2">
                  <CreateRoomDialog />
                </li>

                {rooms.map((room) => {
                  const isRoomActive = currentRoom === room.roomId
                  const roomLinkClass = isRoomActive ? 'bg-muted' : ''

                  return (
                    <li
                      key={`room-${room.roomId}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:cursor-pointer active:bg-muted ${roomLinkClass}`}
                      onClick={() => handleEntryRoom(room.roomId)}
                    >
                      <MessagesSquare className="h-4 w-4" />
                      {room.roomName}
                      {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge> */}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {/* @ts-ignore */}
            <SheetContent side="left" className="flex flex-col">
              <nav>
                <ul className="flex flex-col">
                  <li className="py-5">
                    <CreateRoomDialog />
                  </li>
                  <ul className="flex flex-col gap-y-2">
                    {rooms.map((room) => {
                      const isRoomActive = currentRoom === room.roomId
                      const roomLinkClass = isRoomActive ? 'bg-muted' : ''

                      return (
                        <li
                          key={`room-${room.roomId}`}
                          className={`flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground active:bg-muted ${roomLinkClass}`}
                          onClick={() => handleEntryRoom(room.roomId)}
                        >
                          <MessagesSquare className="h-4 w-4" />
                          {room.roomName}
                          {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            6
                          </Badge> */}
                        </li>
                      )
                    })}
                  </ul>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            {currentRoom ? <></> : <NotSelectedChat />}
          </div>
          <ChatInputField />
        </main>
      </div>
    </div>
  )
}

export default ChatPage
