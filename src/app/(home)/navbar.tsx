import Image from "next/image";
import Link from "next/link";

import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="flex size-full items-center justify-between">
      <Link href="/" className="mr-6 transition-opacity hover:opacity-75">
        <div className="flex shrink-0 items-center gap-3">
          <Image src="/logo.svg" alt="Docs Logo" width={36} height={36} />

          <h3 className="hidden text-2xl font-extrabold text-indigo-600 md:block">
            DOCS
          </h3>
        </div>
      </Link>

      <SearchInput />

      <div className="flex items-center gap-3 pl-6">
        <UserButton />
      </div>
    </nav>
  );
};
