import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-3 pb-5">
      <div></div>
      <Link href="/">
        <div className="font-bold text-red-700 text-3xl">Movies</div>
      </Link>
      <Link href="/login">
        <div className="text-neutral-400 text-sm">login</div>
      </Link>
    </header>
  );
};

export default Header;
