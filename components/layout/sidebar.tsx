import {
  BarChart3Icon,
  FolderIcon,
  HistoryIcon,
  HomeIcon,
  Settings2Icon,
} from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Analytics", href: "/analytics", icon: BarChart3Icon },
  { name: "History", href: "/history", icon: HistoryIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Settings", href: "/settings", icon: Settings2Icon },
];

export function Sidebar() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-64 flex-col border-r">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}