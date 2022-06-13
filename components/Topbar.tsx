import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MENUS = [
  {
    href: "/market-diff",
    text: "Market Diff",
  },
  {
    href: "/chart",
    text: "Chart",
  },
  {
    href: "/trade",
    text: "Trade",
  },
];

const Topbar = () => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <nav className="bg-white border-gray-200  sm:px-4 py-4  dark:bg-gray-800 static  ">
    <div className="container flex flex-wrap justify-between items-center mx-auto ">
   
    <div className=" flex ">
    <img src="/2.png" className="mr-3 h-6 sm:h-7 lg:h-12" alt="fin-logo" />
        <div>
        <p className="self-center lg:text-xl font-semibold whitespace-nowrap dark:text-white sm: text-sm">FINSTABLE</p>
        <p className="font-medium text-lightblue lg:text-lg sm: text-xs">Training</p>
        </div>
    </div>

    
    <div>
    <button data-collapse-toggle="mobile-menu" type="button"className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
        <div className="flex text-white space-x-12  " >
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {MENUS.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <li><a
              className={`hover:text-lightblue transition font-medium ${
                router.pathname === menu.href ? "text-lightblue" : "          "
              }`}
            >
              <div className="space-x-4 lg:text-lg sm:text-sm space-x-reverse...">
              {menu.text}
              </div>
            </a></li>
          </Link>
        ))}
        </ul>
      </div>
      
    </div></div>
  </div>
  
</nav>
  );
};

export default Topbar;