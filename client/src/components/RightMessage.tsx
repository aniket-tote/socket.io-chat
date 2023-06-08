const RightMessage = ({ message, name }: any) => {
  return (
    <div className="rightMessage">
      <div className="rmessage">
        <div className="messageNamel">You</div>
        <div>{message}</div>
      </div>
      <div className="tmpr"></div>
    </div>
  );
};

export default RightMessage;
