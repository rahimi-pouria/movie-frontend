"use client";

import * as React from "react";
import { useState } from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Menubar } from "radix-ui";
import {CheckIcon,ChevronRightIcon,DotFilledIcon,} from "@radix-ui/react-icons";


const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];




export default function MenuBar(){
    const [checkedSelection, setCheckedSelection] = React.useState([CHECK_ITEMS[1],]);
	const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);
    return (
        <>
        <Menubar.Root className="MenubarRoot">

			<Menubar.Menu>
				<Menubar.Trigger className="MenubarTrigger">فیلم</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content
                        className="MenubarContent"
                        align="start"
                        sideOffset={5}
                        alignOffset={-3}
                    >
                        <Menubar.Item className="MenubarItem">
                            انیمیشن <div className="RightSlot">⌘ T</div>
                        </Menubar.Item>
                        <Menubar.Item className="MenubarItem">
                            وحشتناک <div className="RightSlot">⌘ N</div>
                        </Menubar.Item>
                        <Menubar.Item className="MenubarItem" disabled>
                            هیجان اگیز
                        </Menubar.Item>
                        <Menubar.Separator className="MenubarSeparator" />
                        <Menubar.Sub>
                            <Menubar.SubTrigger className="MenubarSubTrigger">
                                Share
                                <div className="RightSlot">
                                    <ChevronRightIcon />
                                </div>
                            </Menubar.SubTrigger>
                            <Menubar.Portal>
                                <Menubar.SubContent
                                    className="MenubarSubContent"
                                    alignOffset={-5}
                                >
                                    <Menubar.Item className="MenubarItem">
                                        Email Link
                                    </Menubar.Item>
                                    <Menubar.Item className="MenubarItem">Messages</Menubar.Item>
                                    <Menubar.Item className="MenubarItem">Notes</Menubar.Item>
                                </Menubar.SubContent>
                            </Menubar.Portal>
                        </Menubar.Sub>
                        <Menubar.Separator className="MenubarSeparator" />
                        <Menubar.Item className="MenubarItem">
                            Print… <div className="RightSlot">⌘ P</div>
                        </Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
			</Menubar.Menu>
		</Menubar.Root>
        </>
    )
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title: string;
  }
>(({ className, children, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a ref={ref} className={classNames("ListItemLink", className)} {...props} >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
});

ListItem.displayName = "ListItem";