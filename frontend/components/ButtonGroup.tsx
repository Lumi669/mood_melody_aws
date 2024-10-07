import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtonGroup = () => {
  const pathname = usePathname();

  // Determine if the current page is 'mixtape' or 'songs'
  const isMixtapePage = pathname === "/songs/mixtape";
  const isSongsPage = pathname === "/songs";

  return (
    <div className="flex justify-center gap-6">
      {/* All music button stays the same for both pages */}
      <Link href="/songs/allmusic">
        <div className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-[#5a799c] transition text-lg font-semibold shadow-md cursor-pointer">
          All music
        </div>
      </Link>

      {/* My playlist button changes color based on the current page */}
      {isMixtapePage ? (
        <Link href="/">
          <div className="bg-purple-400 text-white px-8 py-4 rounded-full hover:bg-purple-500 transition text-lg font-semibold shadow-md cursor-pointer">
            Homepage
          </div>
        </Link>
      ) : (
        <Link href="/songs/mixtape">
          <div className="bg-pink-400 text-white px-8 py-4 rounded-full hover:bg-pink-500 transition text-lg font-semibold shadow-md cursor-pointer">
            My playlist
          </div>
        </Link>
      )}
    </div>
  );
};

export default ButtonGroup;
