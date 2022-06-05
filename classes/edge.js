class RoadEdge {
    constructor(properties) {
        this.id = properties.id;
        this.roadName = properties.roadName;
        this.cityOne = properties.cityOne;
        this.cityTwo = properties.cityTwo;
        this.discovered = false;
        this.direction = properties.direction | "";
        this.distance = properties.distance || 1;
    }
}

module.exports = RoadEdge;