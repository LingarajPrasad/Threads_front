import { Avatar, Text, AvatarBadge, Flex, Stack, WrapItem, useColorModeValue, Image, useColorMode } from "@chakra-ui/react"
import userAtom from '../atoms/userAtom'
import { SelectedConversationAtom } from '../atoms/messageAtoms'
import { useRecoilValue, useRecoilState } from "recoil"
import { BsCheck2All } from 'react-icons/bs'


const Conversations = ({ conversation }) => {
    const user = conversation.participants[0]
    const lastMessage = conversation.lastMessage
    const currentUser = useRecoilValue(userAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(SelectedConversationAtom)
    const colorMode = useColorMode()
    // console.log(user)
    return (
        <Flex gap={'4'}
            alignItems={'center'}
            padding={'1'}
            _hover={{
                cursor: 'pointer',
                bg: useColorModeValue('gray.600', 'gray.dark'),
                color: 'white'
            }}
            onClick={() =>
                setSelectedConversation({
                    _id: conversation._id,
                    userid: user._id,
                    userProfiePic: user.profilePic,
                    username: user.username,
                    mock:conversation.mock
                })
            }
            bg={selectedConversation?._id === conversation._id ? (colorMode === 'light' ? 'gray.600' : 'gray.dark') : ''}
            borderRadius={'md'}>
            <WrapItem>
                <Avatar size={{
                    base: 'xs',
                    sm: 'sm',
                    md: 'md',
                }} src={user.profilePic}>
                    <AvatarBadge boxSize={'1em'} bg='green.500' />
                </Avatar>
            </WrapItem>
            <Stack direction={'column'} fontSize={'sm'}>
                <Text fontWeight={'700'} display={'flex'} alignItems={'center'} >
                    {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
                    {currentUser._id === lastMessage.sender ? <BsCheck2All size={16} /> : ''}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + "..." : lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversations
