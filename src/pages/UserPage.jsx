import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TabIndicator,
    TableContainer,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../Hooks/useShowToast'
import { Spinner, Flex } from '@chakra-ui/react'
import Posts from '../components/Posts'
import useGetUserProfile from '../Hooks/useGetUserProfile'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'



const UserPage = () => {
    const { user, loading } = useGetUserProfile()
    const { username } = useParams()
    const showToast = useShowToast()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [fetchingPosts, setfetchingPosts] = useState(true)


    useEffect(() => {
        const getPosts = async () => {
            setfetchingPosts(true)
            try {
                const res = await fetch(`/api/posts/user/${username}`,)
                const data = await res.json()
                // console.log(data)
                setPosts(data)
            } catch (error) {
                showToast('Error', error, 'error')
                setPosts([])
            } finally {
                setfetchingPosts(false)
            }
        }
        getPosts()
    }, [username, showToast, setPosts])
    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size='xl' />
            </Flex>
        )
    }
    if (!user && !loading) return <h1>User Not Found</h1>

    return (<>
        <UserHeader user={user} />
        <Flex w={"full"}
            flexDirection={'column'}
        >
            <Tabs mb={'1em'} isFitted variant='unstyled' colorScheme="twitter"
                position={'relative'}
            >
                <TabList>
                    <Tab>Threads</Tab>
                    <Tab>Details
                    </Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                        {!fetchingPosts && posts.length === 0 && <h1>User has no Posts.</h1>}
                        {fetchingPosts && (
                            <Flex justifyContent={'center'} my={12}>
                                <Spinner size={'xl'} />
                            </Flex>
                        )}
                        {posts.map((post) => (
                            <Posts key={post._id} post={post} postedBy={post.postedBy} />
                        ))}
                    </TabPanel>

                    <TabPanel>
                        {/* <Details> */}
                        <TableContainer>
                            <Table size='sm' variant={'unstyled'}>
                                {/* <Thead>
            <Tr>
              <Th>Qn</Th>
              <Th>Ans</Th>
            </Tr>
          </Thead> */}
                                <Tbody >
                                    <Tr>
                                        <Td>Name</Td>
                                        <Td>{user.name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Email</Td>
                                        <Td>{user.email}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Joined</Td>
                                        <Td>{user.createdAt}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>username</Td>
                                        <Td>{user.username}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Last Updated At</Td>
                                        <Td>{user.updatedAt}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Followers</Td>
                                        <Td>{user.followers.length}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Following</Td>
                                        <Td>{user.following.length}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>No. of Posts</Td>
                                        <Td>{posts.length}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>

    </>)
}

export default UserPage