export default class TooltipInertia {
    constructor({
       update
    }) {
        this.updateCallback = update;
        this.bound = 100;
        this.running = false;
        this.track = [];
        this.friction = 0.89;
        this.value = 0;
        this.velocity = 0;
        this.decelerate = this.decelerate.bind(this);
    }

    setBound(value) {
        this.bound = value;
    }

    update(value, time) {
        if(isNaN(value)) {
            debugger;
        }

        this.value = value;

        if(this.value < this.bound) {
            this.value = this.bound;
            this.velocity = 0;
        }

        this.updateCallback(this.value);

        // remove all old tracking points older than 100ms
        while(this.track.length > 0) {
            if(time - this.track[0].time <= 100) {
                break;
            }

            this.track.shift();
        }

        // add this new point to the track
        this.track.push({value, time});
    }

    start() {
        const first = this.track[0];
        const last = this.track[this.track.length - 1];

        const delta = last.value - first.value;
        const timeDelta = last.time - first.time;

        this.velocity  = delta / (timeDelta / 15);

        requestAnimationFrame(this.decelerate);

        console.log('start');
    }

    decelerate() {
        console.log('decelerate');

        this.velocity *= this.friction;
        this.value += this.velocity;

        // TODO: add bounce
        if(this.value < this.bound) {
            this.value = this.bound;
            this.velocity = 0;
        }

        // TODO: make this nicer
        if(this.value > -50) {
            this.velocity++;
        } else {
            if(Math.abs(this.velocity) > 1) {
                requestAnimationFrame(this.decelerate);
            }
        }

        this.updateCallback(this.value);
    }

    stop() {
        if(this.value < -50) {
            console.log('stop+');

            this.velocity = 0;
        } else {
            console.log('stop-');
        }
    }
}
