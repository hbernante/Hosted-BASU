import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  MapPinIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
// import PageComponent from '../components/PageComponent'

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  const about = [
    { name: 'Who', description: <span><b>Client:</b> Mrs. Moana Marie C. Dingle</span> },
    { name: 'What', description: 'A tracking and reservation system for the shuttle vehicle.' },
    { name: 'When', description: 'Unknown Date' },
    { name: 'Why', description: 'To provide a digitized experience on the \nShuttle Service System.' },
    { name: 'Vision', description: 'To be Edited' },
    { name: 'Mission', description: 'To be Edited' },
  ]


  return (
    <PageComponent
      title=""
      buttons={
        <TButton onClick={() => setOpen(true)}>
          <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
          Information
        </TButton>
      }
    >
      {/*Content Here*/}
      <div className="relative overflow-hidden bg-gray">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to BASU
              </h1>
              <h2 className="text-2xl font-normal tracking-tight text-gray-900 sm:text-2xl">
                APC's Shuttle Tracking and Reservation System
              </h2>
              <h2 className="text-1xl font-thin tracking-tight text-gray-400 sm:text-1xl">
                BASU:APC Shuttle Location Mapping and Reservation
              </h2>
              <p className="mt-10 text-xl text-gray-500 font-mono">
                A digitized system for Students, Faculty, and Shuttle Service
                Administrators of{" "}
                <span className="block text-yellow-500 font-bold underline text-3xl sm:text-1xl">
                  Asia Pacific College
                </span>
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="/images/sparkle4.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/images/sparkle5.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/images/sparkle5.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/images/sparkle5.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/images/sparkle3.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/images/sparkle3.gif"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="./images/sparkle3.gif"
                            alt="Description of GIF"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/locationtrack"
                  className="inline-flex rounded-md border border-transparent bg-blue-500 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  <MapPinIcon className="w-6 h-6 mr-2" />
                  Check Shuttle Location
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/*About Section*/}
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About:
            </h2>
            <p className="mt-4 text-gray-500">
              This system is developed by the APPTECH team for APC's
              Purchasing and Logistics Office Administrators.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {about.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="/images/apc-logo.png"
              alt=""
              className="rounded-lg bg-gray-100"
            />
            <img
              src="/images/basu-icon-transparent.png"
              alt=""
              className="rounded-lg bg-gray-100"
            />
            <img
              src="/images/apc_shuttle_bus.png"
              alt=""
              className="rounded-lg bg-gray-100"
            />
            <img
              src="/images/apc-logo-2.png"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/*Side Panel*/}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Quick Links
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <TButton color="green" to="/shuttle/storage">Shuttle Storage</TButton>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </PageComponent>
  );
}
