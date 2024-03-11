const timeoutedSetter = (values, setFunc, delay) => {
  if (values[1]) {
    setFunc(values[1]);
  }
  setTimeout(() => {
    setFunc(values[0]);
  }, delay);
};

export default timeoutedSetter;
