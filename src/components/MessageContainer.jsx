import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react"
import Message from "./Message"
import MessageInput from './MessageInput'
import { useEffect, useState } from "react"
import useShowToast from "../Hooks/useShowToast"
import { SelectedConversationAtom, conversationAtom } from "../atoms/messageAtoms"
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from 'recoil'


const MessageContainer = () => {
    const showToast = useShowToast()
    const [selectedConversation, setSelectedConversation] = useRecoilState(SelectedConversationAtom)
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [messages, setMessages] = useState([])
    const currentUser = useRecoilValue(userAtom)

    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true)
            setMessages([])
            try {
                if (selectedConversation.mock) return
                const res = await fetch(`/api/messages/${selectedConversation.userid}`)
                const data = await res.json()
                if (data.error) {
                    showToast('error', data.error, 'error')
                    return
                }
                // console.log(data)
                setMessages(data)
            } catch (error) {
                showToast('error', error.message, 'error')
            } finally {
                setLoadingMessages(false)
            }
        }
        getMessages()
    }, [showToast, selectedConversation.userid])
    return (
        <Flex flex={'70'}
            bg={useColorModeValue('gray.200', 'gray.dark')}
            borderRadius={'md'}
            p={2}
            flexDirection={'column'}
        >
            <Flex w={'full'} h={12} alignItems={'center'} gap={2}>
                <Avatar src={selectedConversation.userProfiePic} size={'sm'} />
                <Text display={'flex'} alignItems={'center'}>
                    {selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>

            </Flex>
            <Divider />
            <Flex flexDir={'column'} gap={4} my={4} height={'400px'} px={2} overflowY={'auto'}>
                {loadingMessages &&
                    [0, 1, 2].map((_, i) => (
                        <Flex key={i} gap={2} alignItems={'center'} p={1} borderRadius={'md'} alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}>
                            {i % 2 === 0 && <SkeletonCircle size={7} />}
                            <Flex flexDir={'column'} gap={2}>
                                <Skeleton h={'8px'} w={'250px'} />
                                <Skeleton h={'8px'} w={'250px'} />

                            </Flex>
                            {i % 2 !== 0 && <SkeletonCircle size={7} />}
                        </Flex>
                    ))}
                {!loadingMessages && (
                    messages.map((messages) => (
                        <Message key={messages._id} message={messages} ownMessage={currentUser._id === messages.sender} />
                    ))
                )}
            </Flex>
            <MessageInput  setMessages={setMessages}/>
        </Flex>
    )
}

export default MessageContainer