import { InputGroup, Input, InputRightElement } from "@chakra-ui/react"
import { IoSendSharp } from 'react-icons/io5'
const MessageInput = () => {
  return (
    <InputGroup>
      <Input
        w={'full'} placeholder="type a message"
      />
      <InputRightElement>
        <IoSendSharp />
      </InputRightElement>
    </InputGroup>
  )
}

export default MessageInput