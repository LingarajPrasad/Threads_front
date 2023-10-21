import SignupCard from "../components/SignupCard"
import LoginCard from "../components/LoginCard"
import authScreenAtom from "../atoms/authAtom"
import { useRecoilValue } from "recoil"


export const AuthPage = () => {
    const authScreenState=useRecoilValue(authScreenAtom)
    // console.log(authScreenState)
    return (
      <>{authScreenState==='login'?<LoginCard />:<SignupCard />}</>
    )
  }
  
  export default AuthPage