import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState } from "react";

// Create a context for managing the sidebar state
const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
}

export default function Sidebar({ children }) {
    const { expanded, setExpanded } = useContext(SidebarContext);

    return (
        <aside className={`h-screen fixed top-[58px] ${expanded ? "w-64" : "w-16"} transition-all duration-500`}>
            <nav className="h-full flex flex-col bg-white dark:bg-neutral-900 border-r dark:border-neutral-700">
                <div className="p-4 pb-2 flex justify-end items-center">
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 dark:bg-neutral-700 dark:text-neutral-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <ul className="flex-1 px-3">{children}</ul>
            </nav>
        </aside>
    );
}

export function Content({ children }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <div
            className={`content-container transition-all duration-500 mt-10 p-10 w-screen ${expanded ? "ml-64" : "ml-16"}`}
        >
            {children}
        </div>
    );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li
            onClick={onClick} // Attach the onClick handler here
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                active
                    ? "bg-gradient-to-tr from-gray-300 to-gray-200 text-gray-900"
                    : "hover:bg-gray-200 text-gray-700 dark:text-neutral-200 dark:hover:text-neutral-800"
            }`}
        >
            {icon}
            <span className={`flex-grow whitespace-nowrap overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-gray-400 ${expanded ? "" : "top-2"}`}></div>
            )}
            {!expanded && (
                <div
                    className={`absolute whitespace-nowrap left-full rounded-md px-2 py-1 ml-6 bg-gray-100 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
