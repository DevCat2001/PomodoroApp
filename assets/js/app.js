document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded!');
    
    let p = new Pomodoro();
    let d = new Pomodoro(5,5,6);
    p.countAtZero(25,13);


});

class Pomodoro{
    constructor(pomodoro_time=null, short_time=null, long_time=null){
        this.pomodoro_time = pomodoro_time ?? 25;
        this.short_time = short_time ?? 5;
        this.long_time = long_time ?? 15;
      
        this.setTime('00:00');
        this.setAction('ready to action!')
        this.setPercentage(55);
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
        let progress_bar = document.querySelector('.progress');

        progress_bar.style.width = percentage;

        percentage = percentage+'%';
        percentage_position.innerHTML = percentage;
    }

    update(time){
        let sec = time/1000;
        let min = Math.floor(sec/60);
        sec = sec - (min*60);
        time = `${min}:${sec}`
        this.setTime(time);
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
