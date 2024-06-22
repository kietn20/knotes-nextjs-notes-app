"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = () => {
		const promise = create({ title: "Untitled" }).then((documentId) =>
			router.push(`/documents/${documentId}`)
		);

		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New note created!",
			error: "Failed to create a new note.",
		});
	};

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				src="/empty.png"
				height={300}
				width={300}
				alt="empty"
				className="dark:hidden"
				priority
			/>
			<Image
				src="/empty-dark.png"
				height={300}
				width={300}
				alt="empty"
				className="dark:block hidden"
				priority
			/>
			<h2 className="text-lg font-medium">
				Welcome to {user?.username}&apos;s KeyNotes
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle className="w-4 h-4 mr-2" />
				Create a note
			</Button>
		</div>
	);
};

export default DocumentsPage;
