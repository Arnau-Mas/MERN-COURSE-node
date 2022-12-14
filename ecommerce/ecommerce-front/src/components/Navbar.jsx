/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import ContextCesta from '../context/ContextCesta.jsx'
import ContextUser from "../context/ContextUser"
import {Sidebar} from "./Sidebar.jsx"
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Artículos', href: '/', current: true },
  { name: 'Facturas', href: '/facturas', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const {cesta} = useContext(ContextCesta);
  const {userId} = useContext(ContextUser);
  const [cantidadArticulos, setCantidadArticulos] = useState(0)

  useEffect(() => {
    console.log("nouarticle")
    const nuevaCantidad = cesta.reduce((prev, curr) => prev+curr.cantidad, 0)
    setCantidadArticulos(nuevaCantidad)
  }, [cesta]);
  return (
    <Disclosure as="nav" className="bg-gray-800 w-full fixed z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                    alt="Workflow"
                  />
                  <h1 className='text-white ml-3 text-xl font-bold'>ECOMMERCE</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                      <Link
                        key={navigation[0].name}
                        to={navigation[0].href}
                        className={classNames(
                          navigation[0].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={navigation[0].current ? 'page' : undefined}
                      >
                        {navigation[0].name}
                      </Link>
                      <Link
                        key={navigation[1].name}
                        to={navigation[1].href}
                        className={classNames(
                          navigation[1].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={navigation[1].current ? 'page' : undefined}
                      >
                        {navigation[1].name}
                      </Link>
                      <Link
                        key={navigation[2].name}
                        to={navigation[2].href}
                        className={classNames(
                          navigation[2].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={navigation[2].current ? 'page' : undefined}
                      >
                        {navigation[2].name}
                      </Link>
                      <Link
                        key={navigation[3].name}
                        to={navigation[3].href}
                        className={classNames(
                          navigation[3].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={navigation[3].current ? 'page' : undefined}
                      >
                        {navigation[3].name}
                      </Link>

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <p className='text-white'>user: {userId} | </p>
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <Link className="relative" to="/cesta">
                     <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                     <p style={{borderRadius:"100%", fontSize:"0.8rem"}} className='bg-orange-400 flex align-middle items-center justify-center w-4 h-4 absolute bottom-4 text-black left-2 font-semibold'>{cantidadArticulos}</p>
                  </Link>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            User: {userId}
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/cambiarUser"
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 bg-gray-200')}
                          >
                            Cambiar usuario
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
