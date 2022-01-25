// Library
import { Fragment } from 'react'
import { useNavigate } from 'react-router'

// Component
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

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
          <Menu.Items className="absolute right-0 px-2 py-1 w-30 md:w-48 mt-3 origin-top-right backdrop-blur-3xl bg-white/50 shadow-white/40 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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