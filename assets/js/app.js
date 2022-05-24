document.addEventListener("DOMContentLoaded", () => {
  launch_button = document.getElementById("launch");
  error_message_box = document.getElementById("error-zone");

  let p = new Pomodoro(launch_button, error_message_box);

  document.querySelectorAll("input[name='interval']")
      .forEach((item) => {
          item.addEventListener('change', (event) => {
            p.resetTimer(event.target.id)
          });
        });
});

class Pomodoro {
  constructor(launch_button, error_message_box) {
    this.setTime("00:00");
    this.setAction("Ready to action!");
    this.setPercentage(0);

    this.default_time = 25;
    this.short_time = 5;
    this.long_time = 15;

    this.minutes = this.default_time;
    this.seconds = 0;
    this.timer_started = false;

    launch_button.addEventListener("click", this.toggleStartStop());
  }

  setIntervalTime(minutes) {
    this.minutes = minutes;
  }

  stopTimer() {
    this.startTimer(this.minutes, this.seconds, this.timer_started);
    this.launch_button.innerHTML = "stop";
    this.launch_button.addEventListener("click", () => {
      this.startTimer(0, false);
    });
  }

  startTimer(minutes, stopSignal) {
    let seconds = 0;
    let time = 1000 * (minutes * 60 + seconds);
    console.log("minutes:" + minutes + "\n" + "seconds" + seconds);
    console.log("time:" + time + "ms");

    if (stopSignal === true) {
      clearInterval();
      this.update(time);
    }
    if (stopSignal === false) {
      setInterval(() => {
        time = time - 1000;
        this.update(time);
      }, 1000);
    }
  }

  toggleStartStop() {
    if (this.timer_started === true) {
      this.stopTimer();
    } else {
      this.startTimer(0, 0, true);
    }
  }

  resetTimer(timer_name) {
    switch (timer_name) {
      case "default":
        this.minutes = this.default_time;
        break;
      case "short":
        this.minutes = this.short_time;
        break;
      case "long":
        this.minutes = this.long_time;
        break;
      default:
        const error_message = `Reset timer failed, no case \"${timer_name}\"`;
        console.log(error_message);
        break;
    }
  }

  setTime(timeStamp) {
    let time_position = document.querySelector("#time");
    time_position.innerHTML = timeStamp;
  }

  setAction(action_name) {
    let action_position = document.querySelector("#action");
    action_position.innerHTML = action_name;
  }

  setPercentage(percentage) {
    percentage = percentage.toString();

    let percentage_position = document.querySelector("#percentage");
    let progress_bar = document.querySelector("#progress");

    percentage = `${percentage}%`;

    progress_bar.setAttribute("style", `width: ${percentage};`);
    percentage_position.innerHTML = percentage;
  }

  update(time) {
    let sec = time / 1000;
    let min = Math.floor(sec / 60);
    sec = sec - min * 60;
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    time = `${min}:${sec}`;
    this.setTime(time);
    /*this.setPercentage(
            percentageCalc(time)
        );*/
  }

  startTimer(minute, seconds, stopSignal) {
    let time = 1000 * (minute * 60 + seconds);
    console.log("minute:" + minute + "\n" + "seconds" + seconds);
    console.log("time:" + time + "ms");

    if (stopSignal === false) {
      clearInterval();
      this.update(time);
    }
    if (stopSignal === true) {
      setInterval(() => {
        time = time - 1000;
        this.update(time);
      }, 1000);
    }
  }
}

function percentageCalc(actual_time) {
  return (actual_time * 100) / 0;
}
