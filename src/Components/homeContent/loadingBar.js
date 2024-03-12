const LoadingBar = ({ isLoading }) => {
  return (
    <div>
      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{
            width: `${isLoading}%`,
          }}
        ></div>
      </div>
      <div className="game-text-container centered">Loading {isLoading} %</div>
    </div>
  );
};
export default LoadingBar;
