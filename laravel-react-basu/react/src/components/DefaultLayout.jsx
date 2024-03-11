import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  ChartBarSquareIcon,
  HomeIcon,
  InboxIcon,
  MapPinIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Footer from "./Footer";

const navigation = [
  { name: "Home", to: "/", icon: HomeIcon },
  { name: "Dashboard", to: "/dashboard", icon: ChartBarSquareIcon },
  { name: "Reservation", to: "/reservation", icon: BookmarkSquareIcon },
  { name: "Shuttle", to: "/shuttle/storage", icon: InboxIcon },
  {
    name: "Inquire Reservation",
    to: "/student/reservation/list",
    icon: BookmarkSquareIcon,
  },
  { name: "Start Service", to: "/startservice", icon: MapPinIcon },
  { name: "Tracker", to: "/locationtrack", icon: MapPinIcon },
  { name: "Accounts", to: "/users", icon: UserCircleIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken, setRole } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="login" />;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      setRole(null);
    });
  };

  useEffect(() => {
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, []);

  // Define navigation items based on user's role
  const filteredNavigation = navigation.filter((item) => {
    if (currentUser.role === 1) {
      // Admin
      return [
        "Home",
        "Dashboard",
        "Reservation",
        "Shuttle",
        "Tracker",
        "Accounts",
      ].includes(item.name);
    } else if (currentUser.role === 2) {
      // Student
      return ["Home", "Inquire Reservation", "Tracker"].includes(item.name);
    } else if (currentUser.role === 3) {
      // Driver
      return ["Home", "Start Service", "Tracker"].includes(item.name);
    }
    return false; // Other roles won't see any navigation items
  });

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              {/* Navigation Header */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center">
                    {/* Logo Image */}
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12"
                        src="/images/basu-icon-transparent.png"
                        alt="BASU Icon"
                      />
                    </div>
                    <div className="font-sans font-semibold text-white">
                      BASU ➲
                    </div>
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {filteredNavigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )
                            }
                          >
                            <item.icon className="h-5 w-5 inline-block mr-2" />
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Profile Dropdown */}
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Menu as="div" className="relative ml-3">
                        {/* Profile Button */}
                        <div>
                          <Menu.Button className="relative flex items-center max-w-xs rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <UserIcon className="w-12 h-12 bg-black/25 p-2 rounded-full text-white hover:focus:ring-white" />
                          </Menu.Button>
                        </div>
                        {/* Profile Dropdown Menu */}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* User Information */}
                            <Menu.Item className="bg-slate-600">
                              <div className="block px-4 py-4 text-sm text-white">
                                Welcome | {currentUser.name}
                              </div>
                            </Menu.Item>
                            {/* Divider */}
                            <Menu.Item className="bg-slate-200">
                              <div className="block px-4 py-1 text-sm text-black">
                                {/* Additional menu items */}
                              </div>
                            </Menu.Item>
                            {/* Logout Button */}
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* Mobile Menu Button */}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              {/* Mobile Navigation Menu */}
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {filteredNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      as="a"
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 inline-block mr-2" />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className="w-12 h-12 bg-black/25 p-2 rounded-full text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {currentUser.name} {currentUser.role}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {/* Logout Button */}
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className="rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white flex items-center"
                    >
                      <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />
                      Sign Out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Render Child Components */}
        <Outlet />
        {/* Footer Component */}
        <Footer />
      </div>
    </>
  );
}
