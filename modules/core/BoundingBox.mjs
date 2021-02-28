class BoundingBox {
    constructor(go) {
        this.update(go)
    }

    update(go) {
        this.x = go.position.x
        this.y = go.position.y
        this.w = go.size.width
        this.h = go.size.height
        this.layer = go.layer
    }

    left() {
        return this.x
    }
    right() {
        return this.x + this.w
    }

    top() {
        return this.y
    }

    bottom() {
        return this.y + this.h
    }


    intersect(bbox) {
        return (bbox.layer == this.layer
            && Math.abs(bbox.x - this.x) < Math.abs(bbox.w - this.w)
            && Math.abs(bbox.y - this.y) < Math.abs(bbox.h - this.h)
        )
    }
}

export { BoundingBox };