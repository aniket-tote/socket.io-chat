const LeftMessage = ({ message, name }: any) => {
  return (
    <div className="leftMessage">
      <div className="tmp"></div>
      <div className="lmessage">
        <div className="messageNamel">{name}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default LeftMessage;
