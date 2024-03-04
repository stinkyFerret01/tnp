const Control = ({ beat }) => {
  return (
    <article>
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
