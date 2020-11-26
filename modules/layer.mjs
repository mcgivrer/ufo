
class Layer {
    constructor(index) {
        this.index = index
        this.objects = []
    }
    sort() {
        this.objects.sort((o1, o2) => {
            return (o1.priority > o2.priority ? 1 : -1)
        })
    }
}

export {Layer};