import {Tab} from "@headlessui/react"

export default function MyPopover(props) {

    // screens: [{screenComponent, iconComponent}]
    let {screens, HomeLogo} = props;
  
    return (
      <div className="flex flex-col md:flex-row w-screen justify-start">
      <Tab.Group manual>
        <div className="w-screen h-24 md:h-screen md:w-20 pt-2 pb-0 md:py-4 flex flex-col md:flex-row justify-end bg-[#120F05]">
          <Tab.List className="w-full h-full flex-grow flex flex-row justify-center md:justify-start md:flex-col gap-3">
            <div className={"w-[100%] px-4 md:w-auto my-auto md:my-0 md:mb-10"} > <HomeLogo className="w-full"/></div>
            {
              screens.map((element) => {
                let Icon = element.iconComponent;
                return (
                 <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md ${selected ? 'md:mr-2 md:px-4' : 'md:rounded-r-none md:rounded-l-md'} ${selected ? 'hover:bg-sky-400' : 'hover:bg-white'}  ${selected ? 'bg-sky-400' : ''} transition-all ease-in-out duration-300`)} ><Icon     className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab>
                
              )})
            }
          </Tab.List>
        </div>
      
        <Tab.Panels className={"w-full"}>
          {
            screens.map((element) => {
              let Screen = element.screenComponent;
              return (
              <Tab.Panel className="relative w-full self-stretch">
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