"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
// import { pb } from "@/lib/pb";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
	url?: string;
	preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
	const { edgestore } = useEdgeStore();
	const coverImage = useCoverImage();
	const removeCoverImage = useMutation(api.documents.removeCoverImage);
	const params = useParams();

	const onRemove = async () => {
		if (url) {
			await edgestore.publicFiles.delete({
				url: url,
			});
		}
		removeCoverImage({ id: params.documentId as Id<"documents"> });
	};

	return (
		<div
			className={cn(
				"relative w-full h-[35vh] group",
				!url ? "h-[12vh]" : "bg-muted"
			)}
		>
			{!!url && (
				<Image
					src={url}
					fill
					alt="Cover Image"
					className="object-center"
				/>
			)}
			{url && !preview && (
				<div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
					<Button
						variant="outline"
						size="sm"
						className="text-muted-foreground text-xs"
						onClick={() => coverImage.onReplace(url)}
					>
						<ImageIcon className="h-4 w-4 mr-2" />
						Change cover
					</Button>
					<Button
						onClick={onRemove}
						variant="outline"
						size="sm"
						className="text-muted-foreground text-xs"
					>
						<X className="h-4 w-4 mr-2" />
						Remove
					</Button>
				</div>
			)}
		</div>
	);
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
	return <Skeleton className="w-full h-[12vh]" />;
};
