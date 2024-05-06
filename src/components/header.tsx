import { Search } from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signOut } from "@/lib/auth";

const Header = async () => {
	const session = await auth();
	return (
		<header className="w-full px-4 md:px-6 py-6 flex items-center justify-between border-b">
			<h1 className="font-semibold">Auction House</h1>
			<SearchInput />
			<div className="flex items-center gap-2">
				{session?.user ? <UserDropdown user={session.user} /> : <SignIn />}
				<ThemeDropdown />
			</div>
		</header>
	);
};

const SearchInput = () => {
	return (
		<div className="relative w-1/2">
			<Input type="text" placeholder="Search" className="" />
			<Button
				className="absolute right-0 top-0 h-full aspect-square"
				variant="ghost"
			>
				<Search className="size-4" />
			</Button>
		</div>
	);
};

const UserDropdown = ({ user }: { user: Session["user"] }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost" className="rounded-full">
					<Avatar>
						<AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
						<AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-56 mx-4">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
				<DropdownMenuSeparator />
				<SignOut>
					<DropdownMenuItem className="w-full">Sign Out</DropdownMenuItem>
				</SignOut>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

import { signIn } from "@/lib/auth";
import { Session, User } from "next-auth";

function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("discord");
			}}
		>
			<Button type="submit">Signin with Discord</Button>
		</form>
	);
}

function SignOut({ children }: { children: React.ReactNode }) {
	return (
		<form
			className="w-full"
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button type="submit" className="w-full">
				{children}
			</button>
		</form>
	);
}

export default Header;
