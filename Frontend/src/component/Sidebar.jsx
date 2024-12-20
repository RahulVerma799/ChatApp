import Conversation from "./Conversation"
import LogoutButton from "./LogoutButton"
import Searchinput from "./Searchinput"


const Sidebar = () => {
  return (
   <>
    <div className="border-r border-slate-400 p-4 flex flex-col">
        <Searchinput/>
        <div className="divider px-3"></div>

        <Conversation/>

        <LogoutButton/>
    </div>
   </>
  )
}

export default Sidebar