import LoggedInContainer from "../containers/LoggedInContainer";


const Support = () => {
  return (
    <LoggedInContainer curActiveScreen={"support"}>
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        Support page is under development.
      </div>
    </LoggedInContainer>
  );
};

export default Support;
