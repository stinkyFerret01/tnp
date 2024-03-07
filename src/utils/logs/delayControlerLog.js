import dateFormatter from "../dateFormatter";

//--> checks if the delay is negative
const delayControlerLog = (delay) => {
  if (delay < 0 && delay > -10000) {
    //that means beat is super late and has to increase more than 1 to re-synch
    console.log("PROBLEM", dateFormatter());
    console.log("next beat delay -(", delay, "ms )- should not be negative");
  }
};

export default delayControlerLog;
//---- (control purpose -- LOG ONLY) ----
