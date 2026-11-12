"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Settings, Keyboard, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UserNavProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
    initials?: string;
    role?: string;
  };
  onProfileClick?: () => void;
  onBillingClick?: () => void;
  onSettingsClick?: () => void;
  onShortcutsClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export function UserNav({
  user = {
    name: "Alex Morgan",
    email: "alex@enterprise.io",
    initials: "AM",
    role: "Admin",
  },
  onProfileClick,
  onBillingClick,
  onSettingsClick,
  onShortcutsClick,
  onLogoutClick,
  className,
}: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20", className)}
        >
          <Avatar className="h-8 w-8">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
              {user.initials || user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2.5">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold leading-none">{user.name}</p>
              {user.role && (
                <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                  <Shield className="mr-1 h-2.5 w-2.5" />
                  {user.role}
                </Badge>
              )}
            </div>
            <p className="text-[11px] leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onProfileClick} className="text-xs cursor-pointer">
            <User className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onBillingClick} className="text-xs cursor-pointer">
            <CreditCard className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSettingsClick} className="text-xs cursor-pointer">
            <Settings className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShortcutsClick} className="text-xs cursor-pointer">
            <Keyboard className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogoutClick}
          className="text-xs text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
