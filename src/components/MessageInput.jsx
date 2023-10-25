import { InputGroup, Input, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from "../Hooks/useShowToast"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { SelectedConversationAtom, conversationAtom } from "../atoms/messageAtoms"



const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("")
  const showToast = useShowToast()
  const selectedConversation = useRecoilValue(SelectedConversationAtom)
  const setConversations = useSetRecoilState(conversationAtom)


  const handleSendMesssage = async (e) => {
    e.preventDefault();
    if (!messageText) {
      // console.log(selectedConversation.userid)
      return
    }

    try {
      const res = await fetch('/api/messages', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userid
        })
      })
      // console.log(recipientId)
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
      }
      setMessages((message) => [...message, data])




      setConversations(prevConvs => {
        const updatedConversations = prevConvs.map(conversation => {
          // console.log(conversation._id)
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender
              },
            }
          }
          return conversation
        })
        return updatedConversations
      })


      setMessageText('')

    } catch (error) {
      showToast('Error', error, 'error')
    }
  }
  return (
    <form>
      <InputGroup onSubmit={handleSendMesssage}>
        <Input
          w={'full'} placeholder="type a message" onChange={(e) => setMessageText(e.target.value)} value={messageText}
        />
        <InputRightElement onClick={handleSendMesssage} cursor={'pointer'} >
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default MessageInput