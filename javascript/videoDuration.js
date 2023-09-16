function getDuration(duration) {
  let want = ["H", "M", "S"];
  let dur = duration.split("P")[1].split("T")[1];
  let time = [];
  want.forEach((e) => {
    if (dur.includes(e)) {
      dur = dur.split(e);
      time.push(dur[0]);
      dur = dur[1];
    } else {
      time.push("0");
    }
  });

  let newDuration = time.map((e, i) => {
    if (time[0] !== "0") {
      if (time[1] !== "0") {
        if (time.indexOf(e) == time.indexOf(time[time.length - 1])) {
          return e;
        } else {
          return e + ":";
        }
      } else {
        return e;
      }
    } else {
      if (time.indexOf(e) == time.indexOf(time[time.length - 1])) {
        return e;
      } else {
        return e + ":";
      }
    }
  });
  if (Number(newDuration[0].split(":")[0]) === 0) {
    newDuration.shift();
  }
  if( Number(newDuration[1].split(":")[0]) < 10){
    newDuration[1] = "0"+newDuration[1];
  }else{

  }
  return newDuration.join("");
}

export default getDuration;
