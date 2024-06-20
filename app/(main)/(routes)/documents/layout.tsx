"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	
	if (isLoading) {
		return (
			// switched to h-screen from h-full
			<div className="h-screen flex items-center justify-center"> 
				<Spinner size="lg" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return redirect("/");
	}
	return (
		<div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
			<main className="w-full h-screen">
				<SearchCommand />
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
