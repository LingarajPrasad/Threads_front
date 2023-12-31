import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import LogoutButton from "./components/LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from './atoms/userAtom'
function App() {
    const user = useRecoilValue(userAtom)

    return (
        <Box position={'relative'} w={'full'}>
        {/* <Container maxW="620px"> */}
        <Container maxW="620px">
            <Header />
            <Routes>
                <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to='/' />} />
                <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
                <Route path="/:username" element={

                    user ? (
                        <>
                            <UserPage />
                            <CreatePost />
                        </>) : (<UserPage />)} />
                <Route path="/:username/post/:pid" element={<PostPage />} />
                <Route path="/chat" element={user ? <ChatPage /> : <Navigate to={'/auth'} />} />
            </Routes>

            {/* {user && <LogoutButton />} */}

            {/* {user && <CreatePost />} */}

        </Container>
    </Box>
    )
}

export default App;
