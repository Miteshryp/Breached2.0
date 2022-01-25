// Library
import { useNavigate } from "react-router";
import {Tab} from "@headlessui/react"

export default function MyPopover(props) {

    // screens: [{screenComponent, iconComponent}]
    let {screens, HomeLogo, bgColor,highlightColor, homeRedirect} = props;
    let navigate = useNavigate();
    
    return (
      <div className="md:h-screen flex flex-col md:flex-row w-screen justify-start">
      <Tab.Group manual>
        <div className={`w-screen fixed top-0 left-0 z-50 h-24 md:h-full md:w-20 pt-2 pb-0 md:py-4 flex flex-col md:flex-row justify-end ${bgColor}`}>
          <Tab.List className="w-full h-full flex-grow flex flex-row justify-center md:justify-start md:flex-col gap-3">
            <div
              onClick={() => {
                navigate(homeRedirect)
              }} 
              className={"w-full px-4 md:w-auto my-auto md:my-0 stroke-gray-900 md:mb-10"} >
                 <HomeLogo className="w-full"/>
            </div>
            {
              screens.map((element) => {
                let Icon = element.iconComponent;
                return (
                 <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md ${selected ? 'md:mr-2 md:px-4' : 'md:rounded-r-none md:rounded-l-md'} ${(selected ? `hover:${highlightColor ? highlightColor : 'bg-sky-400'}` : 'hover:bg-white')}  ${selected ? (highlightColor ? highlightColor : 'bg-sky-400') : ''} transition-all ease-in-out duration-300`)} ><Icon     className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab>
                
              )})
            }
          </Tab.List>
        </div>
      
        <Tab.Panels className={"w-full mt-24 md:mt-0 md:ml-20"}>
          {
            screens.map((element) => {
              let Screen = element.screenComponent;
              return (
              <Tab.Panel className="relative w-full">
                <Screen />
              </Tab.Panel>
              )
            })
          }
        </Tab.Panels>
      </Tab.Group>
      </div>
    )
}