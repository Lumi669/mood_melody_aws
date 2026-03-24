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
            className="mb-10 w-full max-w-xl mx-auto
                       flex flex-col items-center
                       md:grid md:grid-cols-[2rem_260px_1fr] md:items-center md:gap-x-8"
          >
            {/* Mobile */}
            <div className="flex items-center justify-center mb-4 md:hidden">
              <span className="text-2xl font-bold mr-2">{index + 1}.</span>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {extractAuthorName(item.name)}
                </div>
                <div className="text-sm">{extractMusicName(item.name)}</div>
              </div>
            </div>

            {/* Desktop number */}
            <span className="hidden md:block text-2xl font-bold w-8 text-right">
              {index + 1}.
            </span>

            {/* Image */}
            <div className="w-[260px] h-[130px] shrink-0">
              <CustomImage
                src={item.imgUrl}
                alt={item.name}
                dataUrl={item.url ?? ""}
                className="w-full h-full object-cover rounded-lg cursor-pointer transition-all"
                width={260}
                height={130}
                ctg={item.ctg}
                mood={item.mood}
              />
            </div>

            {/* Desktop text */}
            <div className="hidden md:block min-w-0">
              <div className="font-bold text-blue-900 text-lg md:text-xl">
                {extractAuthorName(item.name)}
              </div>
              <div className="text-gray-800 text-sm md:text-base truncate">
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
