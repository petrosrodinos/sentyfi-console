import React, { useState } from "react";
import { IconArrowRightDashed, IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import { useSearch } from "@/context/search-context";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { sidebarData } from "./layout/data/sidebar-data";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";

export function CommandMenu() {
  const router = useNavigate();
  const { open, setOpen } = useSearch();
  const [theme, setTheme] = useState<string>("light");

  const handleSetTheme = (theme: string) => {
    setTheme(theme);
  };

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => router(navItem.url));
                      }}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  );

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => {
                      runCommand(() => router(subItem.url));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ));
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => handleSetTheme("light"))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => handleSetTheme("dark"))}>
              <IconMoon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => handleSetTheme("system"))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
