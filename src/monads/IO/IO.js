import * as _ from "lodash";

class IO {
    constructor(effect) {
        if (!_.isFunction(effect)) {
            throw 'IO Usage: function required';
        }
        this.effect = effect;
    }

    static of(a) {
        return new IO(() => a);
    }

    static from(fn) {
        return new IO(fn);
    }

    map(fn) {
        let self = this;
        return new IO(function () {
            return fn(self.effect());
        });
    }

    chain(fn) {
        return fn(this.effect());
    }

    run() {
        return this.effect();
    }
}

export default IO