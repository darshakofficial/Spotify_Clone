import LoggedInContainer from "../containers/LoggedInContainer";

const Download = () => {
  return (
    <LoggedInContainer curActiveScreen={"download"}>
      {/* <ComingSoon csText={"Download page is under development."} /> */}
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        Download page is under development.
      </div>
    </LoggedInContainer>
  );
};

export default Download;
