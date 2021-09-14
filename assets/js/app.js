document.addEventListener('DOMContentLoaded', () => {
    let p = new Pomodoro();

    pomodoro = document.querySelector('#pomodoro');
    pomodoro.addEventListener('click', () => {
        p.countAtZero(25,30);
    });

    short = document.querySelector('#short');
    short.addEventListener('click', () => {
        p.countAtZero(5,0);
    });

    long = document.querySelector('#long');
    long.addEventListener('click', () => {
        p.countAtZero(15,0);
    });
});


class Pomodoro{
    constructor(pomodoro_time=null, short_time=null, long_time=null){
        this.pomodoro_time = pomodoro_time ?? 25;
        this.short_time = short_time ?? 5;
        this.long_time = long_time ?? 15;
      
        this.setTime('00:00');
        this.setAction('ready to action!')
        this.setPercentage(0);
    }

    start(min,sec){
        this.countAtZero(min,sec);
    }

    setTime(timeStamp){
        let time_position = document.querySelector('#time');
        time_position.innerHTML = timeStamp;
    }

    setAction(action_name){
        let action_position = document.querySelector('#action');
        action_position.innerHTML = action_name;
    }

    setPercentage(percentage){
        percentage=percentage.toString();

        let percentage_position = document.querySelector('#percentage');
        let progress_bar = document.querySelector('#progress');

        percentage = `${percentage}%`

        progress_bar.setAttribute('style', `width: ${percentage};`);
        percentage_position.innerHTML = percentage;
    }

    update(time){
        let sec = time/1000;
        let min = Math.floor(sec/60);
        sec = sec - (min*60);
        time = `${min}:${sec}`
        this.setTime(time);
        /*this.setPercentage(
            percentageCalc(time)
        );*/
    }
    
    countAtZero(minute,seconds){
        let time = 1000*((minute * 60) + seconds);
        console.log('minute:'+minute+'\n'+'seconds'+seconds);
        console.log('time:'+time+'ms');
        
        setInterval(() => {
            time = time - 1000;
            this.update(time);
        }, 1000);
        
    }
}

function percentageCalc(actual_time) {
    return ((actual_time*100)/0);
}