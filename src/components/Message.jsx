import { Avatar, Flex, Text } from '@chakra-ui/react'


const Message = ({ ownMessage }) => {
    return (
        <>
            {ownMessage ? (
                <Flex gap={2}
                    alignSelf={'flex-end'}>
                    <Text maxW={'350px'} bg={'blue.400'}
                        p={1} borderRadius={'md'}>
                        Lorem ipsum, dolor sit
                    </Text>
                    <Avatar src='https://static-koimoi.akamaized.net/wp-content/new-galleries/2023/10/shah-rukh-khan-once-destroyed-a-journalist-who-rudely-asked-him-to-be-serious-during-a-press-meet-saying-ask-me-more-i-will-answer-you-when-he-ran-out-of-questions-01.jpg' w={7} h={7} />
                </Flex>) : (
                <Flex gap={2}>
                    <Avatar src='https://s.ndtvimg.com//images/entities/120/virat-kohli-967.png' w={7} h={7} />
                    <Text maxW={'350px'} bg={'gray.400'}
                        p={1} borderRadius={'md'}>
                        Lorem ipsum, dolor sit
                    </Text>
                </Flex>

            )}
        </>
    )
}

export default Message