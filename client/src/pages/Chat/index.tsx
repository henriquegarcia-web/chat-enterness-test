import { Button } from '@/components/ui/button'

import { useAuth } from '@/contexts/AuthContext'

const ChatPage = () => {
  const { handleLogout } = useAuth()

  return (
    <div className="">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default ChatPage
