import dateFormatter from "../dateFormatter";

const timejumpControlerLog = (dif) => {
  console.log("PROBLEM", dateFormatter());
  console.log("reference time has jumped a -(", dif, "ms )- timejump");
};
export default timejumpControlerLog;
//---- (control purpose -- LOG ONLY) ----
