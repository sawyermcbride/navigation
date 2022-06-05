

let importFile;

class MapGraph {
    constructor() {
            this.nodes = [];
    }

    addNode(obj) {
        this.nodes.push(obj);
    }
    addEdge(edgeObj) {
        for(let i = 0; i < this.nodes.length; i++) {
            let current = this.nodes[i]
            if(edgeObj.startNode.cityName == current.cityName) {
                current.edges.push(edgeObj);
            }
        }
        
    }
    getNodes() {
        return this.nodes;
    }
    printNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            console.log(this.nodes[i]);   
        }
    }
    
    findNode(cityName) {
        for(let i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].cityName == cityName) {
                return this.nodes[i];
            }
        }
        console.log("No node found");
        return null;
    }
}

class CityNode {
    constructor(properties) {
        this.cityName = properties.cityName;
        this.stateName = properties.stateName;
        this.edges = [];
    }
}

class RoadEdge {
    constructor(properties, map) {
        this.roadName = properties.roadName;
        this.startNode = map.findNode(properties.startCityName);
        this.endNode = map.findNode(properties.endCityName);
        this.distance = properties.distance;
    }
}


(function() {

    function createCitys(arr, map) {
        for(let i = 2; i < arr.length; i+=2) {
            map.addNode(new CityNode({
                cityName: arr[i],
                stateName: arr[i+1]
            }))
        }
    }

    let map = new MapGraph();

    $.get("./cities.csv", (data) => {
        let cities = data.split(",");
        createCitys(cities, map);
    })      

    /*map.addNode(new CityNode(
        {
            cityName: "San Francisco",
            stateName: "California",

        }
    ))
    
    map.addNode(new CityNode(
        {
            cityName: "Los Angeles",
            stateName: "California",
        }
    ))
        
    map.addEdge( new RoadEdge(
        {
            roadName: "Highway 101",
            startCityName: "San Francisco",
            endCityName: "Los Angeles",
            distance: 100
        },
        map
    ))*/
    
            
    map.printNodes();
})();