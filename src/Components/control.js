const Control = ({ beat, currentTime }) => {
  return (
    <article>
      <p>Current Time: {currentTime}</p>
      <p>Beat ----: {beat}</p>
      <button
        onClick={() => {
          console.log("Beat :", beat);
        }}
      >
        BeatLog
      </button>
    </article>
  );
};
export default Control;
