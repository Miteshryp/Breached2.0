// import { useState } from 'react'
// import { Tab } from '@headlessui/react'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function MyPopover() {
//   let [categories] = useState({
//     Recent: [
//       {
//         id: 1,
//         title: 'Does drinking coffee make you smarter?',
//         date: '5h ago',
//         commentCount: 5,
//         shareCount: 2,
//       },
//       {
//         id: 2,
//         title: "So you've bought coffee... now what?",
//         date: '2h ago',
//         commentCount: 3,
//         shareCount: 2,
//       },
//     ],
//     Popular: [
//       {
//         id: 1,
//         title: 'Is tech making coffee better or worse?',
//         date: 'Jan 7',
//         commentCount: 29,
//         shareCount: 16,
//       },
//       {
//         id: 2,
//         title: 'The most innovative things happening in coffee',
//         date: 'Mar 19',
//         commentCount: 24,
//         shareCount: 12,
//       },
//     ],
//     Trending: [
//       {
//         id: 1,
//         title: 'Ask Me Anything: 10 answers to your questions about coffee',
//         date: '2d ago',
//         commentCount: 9,
//         shareCount: 5,
//       },
//       {
//         id: 2,
//         title: "The worst advice we've ever heard about coffee",
//         date: '4d ago',
//         commentCount: 1,
//         shareCount: 2,
//       },
//     ],
//   })

//   return (
//     <div className="w-full max-w-md px-2 py-16 sm:px-0">
//       <Tab.Group>
//         <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
//           {Object.keys(categories).map((category) => (
//             <Tab
//               key={category}
//               className={({ selected }) =>
//                 classNames(
//                   'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
//                   'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
//                   selected
//                     ? 'bg-white shadow'
//                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
//                 )
//               }
//             >
//               {category}
//             </Tab>
//           ))}
//         </Tab.List>
//         <Tab.Panels className="mt-2">
//           {Object.values(categories).map((posts, idx) => (
//             <Tab.Panel
//               key={idx}
//               className={classNames(
//                 'bg-white rounded-xl p-3',
//                 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
//               )}
//             >
//               <ul>
//                 {posts.map((post) => (
//                   <li
//                     key={post.id}
//                     className="relative p-3 rounded-md hover:bg-coolGray-100"
//                   >
//                     <h3 className="text-sm font-medium leading-5">
//                       {post.title}
//                     </h3>

//                     <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
//                       <li>{post.date}</li>
//                       <li>&middot;</li>
//                       <li>{post.commentCount} comments</li>
//                       <li>&middot;</li>
//                       <li>{post.shareCount} shares</li>
//                     </ul>

//                     <a
//                       href="#"
//                       className={classNames(
//                         'absolute inset-0 rounded-md',
//                         'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
//                       )}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </Tab.Panel>
//           ))}
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   )
// }






import { Transition, Popover, Tab } from "@headlessui/react"
import {ChartBarIcon, ChevronDownIcon, DocumentIcon, HomeIcon} from "@heroicons/react/solid"
import {ReactComponent as IeeeLogo} from "./../Assets/svg/ieee_logo.svg"
import { Fragment } from "react"


const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
]

export default function MyPopover(props) {

  // screens: [{screenComponent, iconComponent}]
  let {screens, HomeLogo} = props;

  return (
    <div className="flex flex-col md:flex-row w-screen justify-start">
    <Tab.Group manual>
      <div className="w-screen h-24 md:h-screen md:w-20 pt-2 pb-0 md:py-4 flex flex-col md:flex-row justify-end bg-[#120F05]">
        <Tab.List className="w-full h-full flex-grow flex flex-row justify-center md:justify-start md:flex-col gap-0">
          <div className={"w-[100%] px-4 md:w-auto my-auto md:my-0 md:mb-10"} > <HomeLogo className="w-full"/></div>
          {
            screens.map((element) => {
              let Icon = element.iconComponent;
              return <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md md:rounded-r-none md:rounded-l-md ${selected ? 'hover:bg-sky-400' : 'hover:bg-white'}  ${selected ? 'bg-sky-400' : ''} transition-all ease-in-out duration-300`)} ><Icon     className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab>
            })
          }
          {/* <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md md:rounded-r-none md:rounded-l-md ${selected ? 'hover:bg-sky-400' : 'hover:bg-white'}  ${selected ? 'bg-sky-400' : ''} transition-all ease-in-out duration-300`)} ><HomeIcon     className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab>
          <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md md:rounded-r-none md:rounded-l-md ${selected ? 'hover:bg-sky-400' : 'hover:bg-white'}  ${selected ? 'bg-sky-400' : ''} transition-all ease-in-out duration-300`)} ><ChartBarIcon className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab>
          <Tab className={({selected}) => (`group w-full md:h-[12%] md:w-auto mx-0 mb-[1%] mt-[1%] md:ml-3 md:mr-0 md:my-0 pl-0 px-4 py-7 text-white rounded-md md:rounded-r-none md:rounded-l-md ${selected ? 'hover:bg-sky-400' : 'hover:bg-white'}  ${selected ? 'bg-sky-400' : ''} transition-all ease-in-out duration-300`)} ><DocumentIcon className="w-full h-full group-hover:text-black transition-all ease-in-out duration-300"/></Tab> */}
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
        {/* <Tab.Panel className="w-full self-stretch">Content 1</Tab.Panel>
        <Tab.Panel className="w-full self-stretch">Content 2</Tab.Panel>
        <Tab.Panel className="w-full self-stretch">Content 3</Tab.Panel> */}
      </Tab.Panels>
    </Tab.Group>
    </div>
  )

    // return (
    //     <div className="w-full max-w-sm px-4 fixed top-16">
    //     <Popover className="relative">
    //       {({ open }) => (
    //         <>
    //           <Popover.Button
    //             className={`
    //               ${open ? '' : 'text-opacity-90'}
    //               text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    //           >
    //             <span>Solutions</span>
    //             <ChevronDownIcon
    //               className={`${open ? '' : 'text-opacity-70'}
    //                 ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
    //               aria-hidden="true"
    //             />
    //           </Popover.Button>
    //           <Transition
    //             as={Fragment}
    //             enter="transition ease-out duration-200"
    //             enterFrom="opacity-0 translate-y-1"
    //             enterTo="opacity-100 translate-y-0"
    //             leave="transition ease-in duration-150"
    //             leaveFrom="opacity-100 translate-y-0"
    //             leaveTo="opacity-0 translate-y-1"
    //           >
    //             <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
    //               <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    //                 <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
    //                   {solutions.map((item) => (
    //                     <a
    //                       key={item.name}
    //                       href={item.href}
    //                       className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    //                     >
    //                       <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
    //                         <item.icon aria-hidden="true" />
    //                       </div>
    //                       <div className="ml-4">
    //                         <p className="text-sm font-medium text-gray-900">
    //                           {item.name}
    //                         </p>
    //                         <p className="text-sm text-gray-500">
    //                           {item.description}
    //                         </p>
    //                       </div>
    //                     </a>
    //                   ))}
    //                 </div>
    //                 <div className="p-4 bg-gray-50">
    //                   <a
    //                     href="##"
    //                     className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    //                   >
    //                     <span className="flex items-center">
    //                       <span className="text-sm font-medium text-gray-900">
    //                         Documentation
    //                       </span>
    //                     </span>
    //                     <span className="block text-sm text-gray-500">
    //                       Start integrating products and tools
    //                     </span>
    //                   </a>
    //                 </div>
    //               </div>
    //             </Popover.Panel>
    //           </Transition>
    //         </>
    //       )}
    //     </Popover>
    //   </div>
    // )
}


function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}