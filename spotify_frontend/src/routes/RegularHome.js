import LoggedInContainer from "../containers/LoggedInContainer";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Deep Focus",
    description: "Keep clam and focus with music",
    imgUrl:
      "https://images.unsplash.com/photo-1520446266423-6daca23fe8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in background",
    imgUrl:
      "https://images.unsplash.com/photo-1541697349791-30e88807ccc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    title: "Focus Flow",
    description: "Uptempo instrumental hip hop beats",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664304564509-b9ce20619d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGZvY3VzJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1529611748075-29a49d2faf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGZvY3VzJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
];

const RegularHome = () => {
  return (
    <LoggedInContainer curActiveScreen={"regularHome"}>
      <PlaylistView titleText={"Focus"} cardsData={focusCardsData} />
      <PlaylistView
        titleText={"Spotify Playlists"}
        cardsData={focusCardsData}
      />
      <PlaylistView titleText={"Sound of India"} cardsData={focusCardsData} />
    </LoggedInContainer>
  );
};


const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-4">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2 ">
        <img className="w-full rounded-md" src={imgUrl} alt="song image" />
      </div>
      <div className="text-white py-3 font-semibold">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default RegularHome;
