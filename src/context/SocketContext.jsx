import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client'
import userAtom from "../atoms/userAtom";

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)
    const user = useRecoilValue(userAtom)

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query: {
                userid: user?._id
            }
        })
        setSocket(socket)
        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users)
        })
        return () => socket && socket.close()
    }, [user?._id])
    console.log(onlineUsers,"Online")

    return (
        <SocketContext.Provider value={{ socket,onlineUsers}}>{children}</SocketContext.Provider>
    )
}