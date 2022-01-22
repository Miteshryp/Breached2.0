import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router'

export default function AccountRedirect({name, forceUpdate}) {

  let navigate = useNavigate();

   return (
      <div className="w-fit text-right top-6">
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {name}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 px-2 py-1 w-30 md:w-48 mt-3 origin-top-right backdrop-blur-3xl bg-white/50 shadow-lg shadow-white/40 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className={`${
                      active ? 'bg-contest-card-hover text-white font-light' : 'text-gray-900 font-medium'
                    } group flex rounded-md justify-end items-center w-full px-2 py-2 text-sm font-inter`}
                  >
                    Dashboard
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
                      forceUpdate(prev => prev++);
                    }}
                    className={`${
                      active ? 'bg-contest-card-hover text-white font-light' : 'text-gray-900 font-medium'
                    } group flex rounded-md justify-end items-center w-full px-2 py-2 text-sm font-inter`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      navigate("/login");
                      forceUpdate(prev => prev++);
                    }}
                    className={`${
                      active ? 'bg-contest-card-hover text-white font-light' : 'text-gray-900 font-medium'
                    } group flex rounded-md justify-end items-center w-full px-2 py-2 text-sm font-inter`}
                 >
                    Login
                  </button>
                )}
              </Menu.Item>
            </div>
            
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
   )
}





function EditInactiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         d="M4 13V16H7L16 7L13 4L4 13Z"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
     </svg>
   )
 }
 
 function EditActiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         d="M4 13V16H7L16 7L13 4L4 13Z"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
     </svg>
   )
 }
 
 function DuplicateInactiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         d="M4 4H12V12H4V4Z"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
       <path
         d="M8 8H16V16H8V8Z"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
     </svg>
   )
 }
 
 function DuplicateActiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         d="M4 4H12V12H4V4Z"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
       <path
         d="M8 8H16V16H8V8Z"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
     </svg>
   )
 }
 
 function ArchiveInactiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <rect
         x="5"
         y="8"
         width="10"
         height="8"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
       <rect
         x="4"
         y="4"
         width="12"
         height="4"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
       <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
     </svg>
   )
 }
 
 function ArchiveActiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <rect
         x="5"
         y="8"
         width="10"
         height="8"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
       <rect
         x="4"
         y="4"
         width="12"
         height="4"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
       <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
     </svg>
   )
 }
 
 function MoveInactiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
       <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
       <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
     </svg>
   )
 }
 
 function MoveActiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
       <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
       <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
     </svg>
   )
 }
 
 function DeleteInactiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <rect
         x="5"
         y="6"
         width="10"
         height="10"
         fill="#EDE9FE"
         stroke="#A78BFA"
         strokeWidth="2"
       />
       <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
       <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
     </svg>
   )
 }
 
 function DeleteActiveIcon(props) {
   return (
     <svg
       {...props}
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <rect
         x="5"
         y="6"
         width="10"
         height="10"
         fill="#8B5CF6"
         stroke="#C4B5FD"
         strokeWidth="2"
       />
       <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
       <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
     </svg>
   )
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