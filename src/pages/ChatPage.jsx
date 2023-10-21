import { Box, Text, Input, Flex, Button, useColorModeValue, SkeletonCircle } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import Conversations from "../components/Conversations"
import { GiConversation } from 'react-icons/gi'
import MessageContainer from "../components/MessageContainer"
const ChatPage = () => {
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
                    <form>
                        <Flex alignItems={'center'} gap={2}>
                            <Input placeholder='Search for a user' />
                            <Button size='sm'>
                                <Search2Icon />
                            </Button>
                        </Flex>

                    </form>
                    {false &&
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
                    <Conversations />
                    <Conversations />
                    <Conversations />
                    <Conversations />
                </Flex>
                {/* <Flex flex={'70'}
                    borderRadius={'md'}
                    p={2}
                    justifyContent={'center'}
                    height={'400px'}
                    flexDirection={'column'}
                    alignItems={'center'}>
                    <GiConversation size={100}/>
                    <Text fontSize={'20'}>Select a Chat</Text>
                </Flex> */}
                {/* <Flex flex={70}>MessageContainer</Flex> */}
                <MessageContainer />
            </Flex>
        </Box>

    )
}
export default ChatPage
