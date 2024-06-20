"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

// import { BlockNoteView, useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/core/style.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
// import { pb } from "@/lib/pb";
// import { DocumentFile } from "@/types/database";

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

// function useCreateBlockNote(options?: BlockNoteEditorOptions): BlockNoteEditor;

const Editor = ({ editable, initialContent, onChange }: EditorProps) => {
	const { edgestore } = useEdgeStore();
	const params = useParams();
	const { resolvedTheme } = useTheme();

	const handleFileUpload = async (file: File) => {
		// Add this to edgestore bucket
		const response = await edgestore.publicFiles.upload({ file });

		return response.url;
	};

	const editor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: handleFileUpload,
	});

	return (
		<div>
			<BlockNoteView
				editable={editable}
				editor={editor}
				theme={resolvedTheme === "dark" ? "dark" : "light"}
				onChange={() => {
					onChange(JSON.stringify(editor.document, null, 2));
				}}
			/>
		</div>
	);
};

export default Editor;
