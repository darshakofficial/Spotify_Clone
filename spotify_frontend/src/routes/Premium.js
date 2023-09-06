import LoggedInContainer from "../containers/LoggedInContainer";


const Premium = () => {
  return (
    <LoggedInContainer curActiveScreen={"premium"}>
      {/* <ComingSoon csText={"Download page is under development."} /> */}
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        Premium page is under development.
      </div>
    </LoggedInContainer>
  );
};

export default Premium;
