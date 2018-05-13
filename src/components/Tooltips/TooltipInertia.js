// The value und which the tooltip accelerates to hide itself
const THRESHOLD = 100;

export default class TooltipInertia {
    constructor({
       update
    }) {
        this.updateCallback = update;
        this.bound = 100;
        this.animationFrame = undefined;
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
        if(this.track.length >= 2) {
            const first = this.track[0];
            const last = this.track[this.track.length - 1];

            const delta = last.value - first.value;
            const timeDelta = last.time - first.time;

            if(timeDelta > 0) {
                this.velocity  = delta / (timeDelta / 15);
            }
        }

        requestAnimationFrame(this.decelerate);
    }

    decelerate() {
        this.velocity *= this.friction;
        this.value += this.velocity;

        // TODO: add bounce
        if(this.value < this.bound) {
            if(this.velocity > -1) {
                this.value = this.bound - (this.bound - this.value) * 0.9;
                if(this.bound - this.value < 1) {
                    this.value = this.bound;
                }

                this.velocity = 0;
            } else {
                // decelerate faster
                this.velocity *= 0.5;
            }
        }

        if(this.value > -THRESHOLD) {
            // speed up if we are below the threshold
            this.velocity *= 1.2;
        }

        if(this.value > 0) {
            this.value = 0;
            this.velocity = 0;
        }

        if(Math.abs(this.velocity) > 1 || this.value < this.bound) {
            this.animationFrame = requestAnimationFrame(this.decelerate);
        }

        this.updateCallback(this.value);
    }

    stop() {
        cancelAnimationFrame(this.animationFrame);
        this.velocity = 0;
        this.track = [];
    }
}
