import React from "react";
import CustomImage from "@components/CustomImage";
import { MusicWithImageSimplified } from "../../types/type";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";

interface NonEmptyPlaylistProps {
  playlist: MusicWithImageSimplified[];
}

const NonEmptyPlaylist: React.FC<NonEmptyPlaylistProps> = ({ playlist }) => {
  return (
    <div className="h-screen overflow-y-auto p-4">
      <ul className="pt-4 pb-40 w-full max-w-3xl mx-auto">
        {playlist.map((item: MusicWithImageSimplified, index: number) => (
          <li
            key={item.ctg}
            className="flex flex-col md:flex-row items-center w-full max-w-xl mx-auto mb-10"
          >
            {/* For mobile view (number with text in the same line) */}
            <div className="flex items-center justify-center mb-4 md:hidden">
              {/* Number */}
              <span className="text-2xl font-bold mr-2">{index + 1}.</span>

              {/* Text content */}
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {extractAuthorName(item.name)}
                </div>
                <div className="text-sm">{extractMusicName(item.name)}</div>
              </div>
            </div>

            {/* Number for desktop (left side of the image) */}
            <span className="hidden md:block text-2xl font-bold w-8 text-right mr-16">
              {index + 1}.
            </span>

            {/* Image */}
            <div className="flex-shrink-0 mr-8">
              <CustomImage
                src={item.imgUrl}
                alt={item.name}
                dataUrl={item.url ?? ""}
                className="cursor-pointer rounded-lg transition-all object-cover" // Tailwind class for object fit
                width={260}
                height={130}
                ctg={item.ctg}
                mood={item.mood}
              />
            </div>

            {/* Text beside image for desktop */}
            <div className="hidden md:block flex flex-col md:flex-grow md:ml-4">
              <div className="font-bold text-blue-900 text-lg md:text-xl">
                {extractAuthorName(item.name)}
              </div>
              <div className="text-gray-800 text-sm md:text-base whitespace-nowrap overflow-hidden">
                {extractMusicName(item.name)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NonEmptyPlaylist;
