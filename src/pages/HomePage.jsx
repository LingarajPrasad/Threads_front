import { Button, Flex, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useShowToast from '../Hooks/useShowToast'
import Posts from "../components/Posts"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"

export const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch('/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          showToast("Error", data.error, 'error')
          return
        }
        setPosts(data)
        // console.log(typeof(posts))
      } catch (error) {
        showToast('Error', error, 'error')
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [showToast, setPosts])
  
  return (
    <>
      {!loading && posts.length === 0 && <h1>Follow some users</h1>}
      {loading && (
        <Flex justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}

      {posts.map((post) => (
        <Posts key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>

  )
}


export default HomePage