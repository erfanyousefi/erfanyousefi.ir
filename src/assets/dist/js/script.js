(function() {
    const elmHamburger = document.querySelector('.hamburger')
    if (elmHamburger) {
        elmHamburger.addEventListener('click', () => {

            elmHamburger.classList.toggle('is-opened-navi');
        });
    }

}());

// const baners = document.querySelectorAll(".baner");
// baners.forEach(baner => {
//     baner.addEventListener("mouseenter", () => {
//         baner.querySelector(".cover").classList.add("show-cover")
//     })
//     baner.addEventListener("mouseleave", () => {
//         baner.querySelector(".cover").classList.remove("show-cover")
//     })
// })
window.addEventListener("scroll", () => {
    // if (window.scrollY > 15) {
    //     document.querySelector("header").style.boxShadow = "5px 5px 10px #333"
    // } else {
    //     document.querySelector("header").style.boxShadow = "unset"
    // }

    if (window.scrollY > 350) {
        document.querySelector(".moveUp").style.display = "flex"
    } else {
        document.querySelector(".moveUp").style.display = "none"
    }
})
document.querySelector(".moveUp").addEventListener("click", () => {
    window.scrollTo({
        top: 0
    });
})

const ease = {
    exponentialIn: (t) => {
        return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
    },
    exponentialOut: (t) => {
        return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    },
    exponentialInOut: (t) => {
        return t == 0.0 || t == 1.0 ?
            t :
            t < 0.5 ?
            +0.5 * Math.pow(2.0, (20.0 * t) - 10.0) :
            -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
    },
    sineOut: (t) => {
        const HALF_PI = 1.5707963267948966;
        return Math.sin(t * HALF_PI);
    },
    circularInOut: (t) => {
        return t < 0.5 ?
            0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t)) :
            0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
    },
    cubicIn: (t) => {
        return t * t * t;
    },
    cubicOut: (t) => {
        const f = t - 1.0;
        return f * f * f + 1.0;
    },
    cubicInOut: (t) => {
        return t < 0.5 ?
            4.0 * t * t * t :
            0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    },
    quadraticOut: (t) => {
        return -t * (t - 2.0);
    },
    quarticOut: (t) => {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    },
}

class ShapeOverlays {
    constructor(elm) {
        this.elm = elm;
        this.path = elm.querySelectorAll('path');
        this.numPoints = 2;
        this.duration = 600;
        this.delayPointsArray = [];
        this.delayPointsMax = 0;
        this.delayPerPath = 200;
        this.timeStart = Date.now();
        this.isOpened = false;
        this.isAnimating = false;
    }
    toggle() {
        this.isAnimating = true;
        for (let i = 0; i < this.numPoints; i++) {
            this.delayPointsArray[i] = 0;
        }
        if (this.isOpened === false) {
            this.open();
        } else {
            this.close();
        }
    }
    open() {
        this.isOpened = true;
        this.elm.classList.add('is-opened');
        this.timeStart = Date.now();
        this.renderLoop();
    }
    close() {
        this.isOpened = false;
        this.elm.classList.remove('is-opened');
        this.timeStart = Date.now();
        this.renderLoop();
    }
    updatePath(time) {
        const points = [];
        for (let i = 0; i < this.numPoints; i++) {
            const thisEase = this.isOpened ?
                (i == 1) ? ease.cubicOut : ease.cubicInOut :
                (i == 1) ? ease.cubicInOut : ease.cubicOut;
            points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
        }

        let str = '';
        str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
        for (let i = 0; i < this.numPoints - 1; i++) {
            const p = (i + 1) / (this.numPoints - 1) * 100;
            const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
            str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
        }
        str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
        return str;
    }
    render() {
        if (this.isOpened) {
            for (let i = 0; i < this.path.length; i++) {
                this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
            }
        } else {
            for (let i = 0; i < this.path.length; i++) {
                this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
            }
        }
    }
    renderLoop() {
        this.render();
        if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
            requestAnimationFrame(() => {
                this.renderLoop();
            });
        } else {
            this.isAnimating = false;
        }
    }
}

(function() {
    const elmHamburger = document.querySelector('.hamburger');
    const gNavItems = document.querySelectorAll('.global-menu__item');
    const elmOverlay = document.querySelector('.shape-overlays');
    const overlay = new ShapeOverlays(elmOverlay);

    elmHamburger.addEventListener('click', () => {
        if (overlay.isAnimating) {
            return false;
        }
        overlay.toggle();
        if (overlay.isOpened === true) {
            elmHamburger.classList.add('is-opened-navi');
            for (let i = 0; i < gNavItems.length; i++) {
                gNavItems[i].classList.add('is-opened');
            }
        } else {
            elmHamburger.classList.remove('is-opened-navi');
            for (let i = 0; i < gNavItems.length; i++) {
                gNavItems[i].classList.remove('is-opened');
            }
        }
    });
}());