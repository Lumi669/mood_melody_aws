import React, { useState } from "react";

interface UiProps {
  children: React.ReactNode; // Define children's type explicitly
}

const Ui: React.FC<UiProps> = ({ children }) => {
  const imageUrl =
    "https://mood-melody.s3.eu-north-1.amazonaws.com/happy/images/happy-beagle-with-droopy-ears-blue-background.jpg";
  const musicUrl =
    "https://mood-melody.s3.eu-north-1.amazonaws.com/happy/musics/Danny+Shields+-+Muchacho+-+Instrumental+Version.mp3";

  const [play, setPlay] = useState(false);

  return (
    <div>
      {children}
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          height: "100vh",
          backgroundColor: "red", // This is just for testing
        }}
      >
        {play ? (
          <audio autoPlay loop src={musicUrl}>
            Your browser does not support the audio element...
          </audio>
        ) : (
          <button onClick={() => setPlay(true)}>Play Music</button>
        )}
      </div>
    </div>
  );
};

export default Ui;
