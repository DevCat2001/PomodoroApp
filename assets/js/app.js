document.addEventListener('DOMContentLoaded', () => {
    let p = new Pomodoro();

    let pomodoro = document.querySelector('#pomodoro');
    pomodoro.addEventListener('click', () => {
        launchPomodoro(p,'pomodoro');
    });

    let short = document.querySelector('#short');
    short.addEventListener('click', () => {
        launchPomodoro(p,'short');
    });

    let long = document.querySelector('#long');
    long.addEventListener('click', () => {
        launchPomodoro(p,'long');
    });
});

function launchPomodoro(pomodoro_class,timer_name){
    let minute;
    let seconds;

    switch (timer_name) {
        case 'pomodoro':
            minute=25;
            seconds=30;
            break;
        case 'short':
            minute=5;
            seconds=0;
            break;
        case 'long':
            minute=15;
            seconds=0;
            break;
        default:
            let error_check=true;
            break;
        
    }

    let launch = document.querySelector('#launch')
    launch.addEventListener('click',()=>{
        if(error_check){
            let error_message = 'Scegli uno dei bottoni in alto';
            document.querySelector('#error_zone').innerHTML = error_message;
        }else{
            pomodoro_class.countAtZero(minute,seconds,false);
            launch.innerHTML = 'stop'
            launch.addEventListener('click',()=>{
                pomodoro_class.countAtZero(0,0,true);
            });
        }
    });
}

class Pomodoro{
    constructor(pomodoro_time=null, short_time=null, long_time=null){
        this.pomodoro_time = pomodoro_time ?? 25;
        this.short_time = short_time ?? 5;
        this.long_time = long_time ?? 15;
      
        this.setTime('00:00');
        this.setAction('ready to action!')
        this.setPercentage(0);
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
        min<10 ? min='0'+min : console.log('hi');
        sec<10 ? sec='0'+sec : console.log('hello');
        time = `${min}:${sec}`;
        this.setTime(time);
        /*this.setPercentage(
            percentageCalc(time)
        );*/
    }
    
    countAtZero(minute,seconds,stop){
        let time = 1000*((minute * 60) + seconds);
        console.log('minute:'+minute+'\n'+'seconds'+seconds);
        console.log('time:'+time+'ms');
        
        setInterval(() => {
            time = time - 1000;
            this.update(time);
        }, 1000);
        if (stop==true) {
            clearInterval();
            this.update(time);
        }
        
    }
}

function percentageCalc(actual_time) {
    return ((actual_time*100)/0);
}