class CityNode {
    constructor(properties) {
        this.id = properties.id;
        this.cityName = properties.cityName;
        this.stateName = properties.stateName;
        this.discovered = false;
    }
}

module.exports = CityNode;