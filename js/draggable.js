// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class Draggable {
    constructor() {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = 100;
        this.y = 100;

        this.w = 400; //Width of the box
        this.profileWidth = 60; //profile picture width
        this.profileHeight = 60; //profile picture height
        this.tweetMarginLeft = 20; //margin left
        this.tweetMarginRight = 20; //margin right
        this.tweetMarginTop = 20; //margin top
        //Width of the text field
        this.textWidth =
            this.w - this.tweetMarginLeft - this.profileWidth
            - this.tweetMarginLeft - this.tweetMarginRight;
        //Height of the box
        this.h = 5 * (this.profileHeight + this.tweetMarginTop) + this.tweetMarginTop;
    }
    show() {
        stroke(0);
        // Different fill based on state
        if (this.dragging) {
            fill(100);
        } else if (this.rollover) {
            fill(200);
        } else {
            fill(200, 200, 200);
        }
        rect(this.x, this.y, this.w, this.h);
        // ellipse(this.x, this.y, this.w, this.h);
        //Do other drawing thing here.
        fill(0, 0, 0);
        if (tweets != null && tweets.data && tweets.data.length > 0) {
            for (let i = 0; i < Math.min(5, tweets.data.length); i++) {
                let t = tweets.data[i];
                image(t.user.profile_image,
                    this.x + this.tweetMarginLeft,
                    this.y + this.tweetMarginTop + i * (this.tweetMarginTop + this.profileHeight),
                    this.profileWidth,
                    this.profileHeight);
                text(t.text,
                    this.x + this.tweetMarginLeft + this.profileWidth + this.tweetMarginLeft,
                    this.y + this.tweetMarginTop + i * (this.tweetMarginTop + this.profileHeight),
                    this.textWidth,
                    this.profileHeight);
            }
        }
    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }

    }

    update() {
        // Adjust location if being dragged
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    pressed() {
        // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
    }
}
