import { VStack, Text, Flex, Box, Avatar, Link, MenuButton, Menu, Portal, MenuList, MenuItem, useToast, Button, useRangeSlider } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import userAtom from '../atoms/userAtom'
import { useRecoilValue } from 'recoil'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from "react"
import useShowToast from '../Hooks/useShowToast'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



const UserHeader = ({ user }) => {
    const toast = useToast()
    const currrentUser = useRecoilValue(userAtom)
    const [following, setFollowing] = useState(user.followers.includes(currrentUser?._id))
    const showToast = useShowToast()
    const [updating, setUpdating] = useState(false)
    const copyURL = () => {
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                description: "URL Copied",
                duration: 1500,
            })
        })
    }

    const handleFollowUnfollow = async () => {
        if (!currrentUser) {
            showToast("Error", 'Please Login First', 'error')
        }
        if (updating) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()

            if (data.error) {
                showToast("ERROR", data.error, 'error')
                return;
            }
            if (following) {
                showToast("Unfollowed", `unfollowed ${user.name}`, "success")
                user.followers.pop()
            }
            else {
                showToast("Followed", `Following ${user.name}`, "success")
                user.followers.push(currrentUser?._id)
            }
            setFollowing(!following)
        } catch (error) {
            showToast("Error", error, "error")
        } finally {
            setUpdating(false)
        }
    }
    return (
        <VStack gap={4} alignItems={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={'bold'}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text fontSize={"xs"} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar name={user.name} src={user.profilePic} size={"xl"} />
                    )}
                    {!user.profilePic && (
                        <Avatar name={user.name} src="https://bit.ly/tioluwani-kolawole" size={"xl"} />
                    )}
                </Box>
            </Flex>
            <Text>{user.bio}</Text>
            {currrentUser?._id === user._id && (

                <Link as={RouterLink} to="/update">
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}
            {currrentUser?._id !== user._id && (
                <Button size={"sm"}
                    onClick={handleFollowUnfollow}
                    isLoading={updating}
                >{following ? "Unfollow" : "Follow"}</Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
                    <Box w='1' h='1' bg={'gray.light'} borderRadius={'full'}></Box>
                    <Link color={'gray.light'} href="https://www.instagram.com/l_i_n_g_a_r_a_j/"> instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={'grey.dark'}>
                                    <MenuItem bg={'grey.dark'} onClick={copyURL}>
                                        Copy Link
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>











            {/* <Flex w={"full"}
                flexDirection={'column'}
            > */}

                {/* <Flex flex={1} borderBottom={"1.5px solid  white"} justifyContent={"center"} pb={"3"} cursor={"pointer"}>
                    <Text fontWeight={"bold"}
                    as={RouterLink} to={`/${user.username}`}>Threads</Text>
                </Flex> */}
                {/* <Tabs isFitted variant='enclosed' colorScheme="twitter">
                    <TabList>
                        <Tab as={RouterLink} to={`/${user.username}`}>Threads</Tab>
                        <Tab as={RouterLink} to={`/${user.username}/details`}>Details
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>Threads</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Details</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs> */}

                {/* <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={"3"} cursor={'pointer'}>
                    <Text fontWeight={"bold"}>
                        <Link
                        as={RouterLink} to={`/${user.username}/details`}
                        >Details</Link>
                    </Text>
                </Flex> */}

            {/* </Flex> */}
        </VStack>
    )
}

export default UserHeader