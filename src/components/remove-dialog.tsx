"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { ConvexError } from "convex/values";
import { type PropsWithChildren, useState } from "react";
import { toast } from "sonner";

import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";
import { removeRoom } from "@/app/documents/[documentId]/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RemoveDialogProps {
  documentId: Id<"documents">;
}

export const RemoveDialog = ({
  documentId,
  children,
}: PropsWithChildren<RemoveDialogProps>) => {
  const router = useRouter();
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isRemoving}
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);

              remove({ id: documentId })
                .then(async () => {
                  router.push("/");
                  setIsRemoving(false);
                  await removeRoom(documentId, window.location.origin);
                })
                .catch((error) => {
                  const errorMessage =
                    error instanceof ConvexError
                      ? error.data
                      : "Something went wrong!";
                  toast.error(errorMessage);
                  setIsRemoving(false);
                });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
