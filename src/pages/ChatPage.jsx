import { Box, Text, Input, Flex, Button, useColorModeValue, SkeletonCircle } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import useShowToast from '../Hooks/useShowToast'
import Conversations from "../components/Conversations"
import { GiConversation } from 'react-icons/gi'
import MessageContainer from "../components/MessageContainer"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { SelectedConversationAtom, conversationAtom } from "../atoms/messageAtoms"
import userAtom from "../atoms/userAtom"



const ChatPage = () => {
    const showToast = useShowToast()
    const [loadingConversation, setLoadingConversation] = useState(true)
    const [conversation, setConversation] = useRecoilState(conversationAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(SelectedConversationAtom)
    const [searchText, setSearchText] = useState()
    const currentUser = useRecoilValue(userAtom)
    const [searchingUser, setSearchingUser] = useState(false)

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await fetch('/api/messages/conversations')
                const data = await res.json()
                if (data.error) {
                    showToast('error', data.error, 'error')
                    return
                }
                // console.log(data)
                setConversation(data)
            } catch (error) {
                showToast('error', error.message, 'error')
            } finally {
                setLoadingConversation(false)
            }

        }
        getConversation()
    }, [showToast, setConversation])

    const handleConversationSearch = async (e) => {
        e.preventDefault()
        setSearchingUser(true)
        try {
            const res = await fetch(`/api/users/profile/${searchText}`)
            const searchedUser = await res.json()
            if (searchedUser.error) {
                showToast('error', searchedUser.error, 'error')
                return
            }
            //if user try to msg himself
            if (searchedUser._id === currentUser._id) {
                showToast('Error', 'Cannot send msg to self', 'error')
                return
            }

            //if user was already in conversation
            if (conversation.find((conversation) => conversation.participants[0]._id === searchedUser._id)) {
                setSelectedConversation({
                    _id: conversation.find((conversation) => conversation.participants[0]._id === searchedUser._id)._id,
                    userid: searchedUser._id,
                    username: searchedUser.username,
                    userProfiePic: searchedUser.profilePic,
                })
                // console.log(SelectedConversationAtom)
                return
            }



            const mockConversation = {
                mock: true,
                lastMessage: {
                    text: '',
                    sender: ''
                },
                _id: Date.now(),
                participants: [
                    {
                        _id: searchedUser._id,
                        username: searchedUser.username,
                        profilePic: searchedUser.profilePic

                    }
                ]
            }
            setConversation((prevConvs) => [...prevConvs, mockConversation])
        } catch (error) {
            showToast('error', error.message, 'error')
        } finally {
            setSearchingUser(false)
        }
    }

    return (
        <Box position={'absolute'}
            left={'50%'}
            w={{
                lg: '750px',
                md: '80%',
                base: '100%'
            }}
            // border={'1px solid red'}
            transform={'translateX(-50%)'}
        >
            <Flex gap={4} flexDirection={{
                base: 'column',
                md: 'row'
            }}
                maxW={{
                    sm: '400px',
                    md: 'full'
                }}
                mx={'auto'}
            >
                <Flex flex={30} gap={2} flexDirection={'column'}
                    maxW={{
                        sm: '250px',
                        md: 'full'
                    }}
                    mx={'auto'}
                >
                    <Text fontWeight={700} color={useColorModeValue('gray.600', 'gray.400')}>Your Conversations</Text>
                    <form onSubmit={handleConversationSearch}>
                        <Flex alignItems={'center'} gap={2}>
                            <Input placeholder='Search for a user' onChange={(e) => setSearchText(e.target.value)} />
                            <Button size='sm' onClick={handleConversationSearch} isLoading={searchingUser}>
                                <Search2Icon />
                            </Button>
                        </Flex>

                    </form>
                    {loadingConversation &&
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex key={i} gap={4} alignItems={'center'} p={1} borderRadius={'md'}>
                                <Box>
                                    <SkeletonCircle size={'10'} />
                                </Box>
                                <Flex w={'full'} flexDirection={'column'} gap={3}>
                                    <SkeletonCircle h={'10px'} w={'80px'} />
                                    <SkeletonCircle h={'8px'} w={'90%'} />

                                </Flex>
                            </Flex>
                        ))}
                    {!loadingConversation &&
                        conversation.map(conversation => (
                            <Conversations key={conversation._id} conversation={conversation} />
                        ))}

                </Flex>
                {!selectedConversation._id && (
                    <Flex flex={'70'}
                        borderRadius={'md'}
                        p={2}
                        justifyContent={'center'}
                        height={'400px'}
                        flexDirection={'column'}
                        alignItems={'center'}>
                        <GiConversation size={100} />
                        <Text fontSize={'20'}>Select a Chat</Text>
                    </Flex>
                )}
                {selectedConversation._id &&
                    <MessageContainer />
                }
            </Flex>
        </Box>

    )
}
export default ChatPage
