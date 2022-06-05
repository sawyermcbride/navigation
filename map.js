

let importFile;
/*
    Node object
        String cityName
        String stateName
        Boolean discovered
    RoadEdge object
        String roadName
        String cityOne
        String cityTwo

    MapGraph
        Function nodeExists(str cityName)
            returns true or false if node is found in node list

        Function findNode (str cityName)
            returns Object node obj from nodes arr

        Function findEdge(str cityOne, str cityTwo)
            returns Object edge object containing both cityOne and cityTwo
        
        Function adjacentEdges(str cityName) {
            returs Array of edges with cityOne or cityTwo equaling cityName in edge object
        }
        
*/

class MapGraph {
    constructor() {
            this.nodes = [];
            this.edges = [];
    }
    DFS(start,end) {
        let s = [];
        let v = {};
        let adj = [];
        let startCity = start || "";
        let endCity = end || "";
        let path = new Map();


        s.push(startCity);

        while(s.length > 0) {
            v = s.pop();    
            if(v == endCity)
                break;
            adj = this.adjacentEdges(v);

            for(let i = 0; i < adj.length; i++) {
                if(this.findNode(adj[i]).discovered == false) {
                    s.push(adj[i]);
                    this.findNode(adj[i]).discovered = true;
                    path.set(adj[i], v);
                }
            }
        }
        let child = endCity;
        let steps = [];
        steps.push(child);
        while(path.has(child)) {
            child = path.get(child);
            steps.push(child);
        }

        this.resetSearch();

        return steps;

    }
    Dijkstra(start, end) {
        let node, adj, v, newCost;
        let queue = [];
        const costs = new Map();
        const path = new Map();     
        
        for(let i = 0; i < this.nodes.length; i++) {
            costs.set(this.nodes[i].cityName, Infinity);
            queue.unshift(this.nodes[i].cityName);
        }
        costs.set(start, 0);

        while(queue.length > 0) {
            
            v = this.lowestCost(queue, costs);
            if(v == end || costs.get(v) == Infinity)
                break;

            if(this.findNode(v).discovered == false) {    
                adj = this.adjacentEdges(v);
                for(let i = 0; i < adj.length; i++) {
                    newCost = costs.get(adj[i]);
                    if(newCost > costs.get(v)) {
                        newCost = costs.get(v)+1;
                        costs.set(adj[i], newCost);
                        path.set(adj[i],v);
                    }
                }
            }
            queue.splice(queue.indexOf(v), 1);
            this.findNode(v).discovered = true;
        }
            let child = end;
            let arr = [child];
            while(path.has(child)) {
                arr.push(path.get(child));
                child = path.get(child);
            }
            return arr;
    }
    lowestCost(queue, costsMap) {
        let node = queue[0];
        let lowest = costsMap.get(queue[0]);
        for(let i = 0; i < queue.length; i++) {
            if(costsMap.get(queue[i]) < lowest) {
                lowest = costsMap.get(queue[i]);
                node = queue[i];
            }
        }
        return node;
        
    }
    addNode(obj) {
        this.nodes.push(obj);
    }
    
    nodeExists(name) {
        for(let i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].cityName == name)
                return true;
        }
        return false;
    }
    getRoad(roadName) {
        let arr = [];
        for(let i = 0; i < this.edges.length; i++) {
            if(this.edges[i].roadName == roadName) {
                arr.push(this.edges[i]);
            }
        }
        return arr;
    }
    addEdge(edgeObj) {
        this.edges.push(edgeObj);        
    }
    getNodes() {
        return this.nodes;
    }
    printNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            console.log(this.nodes[i]);   
        }
    }
    printEdges() {
        for (let i = 0; i < this.edges.length; i++) {
            console.log(this.edges[i]);   
        }
    }

    resetSearch() {
        for(let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].discovered = false;
        }
        for(let i = 0; i < this.edges.length; i++) {
            this.edges[i].discovered = false;
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
    findEdge(cityOne, cityTwo) {
        // console.log(cityOne + " " + cityTwo);
        for(let i = 0; i < this.edges.length; i++) {
            if( (this.edges[i].cityOne == cityOne 
                && this.edges[i].cityTwo == cityTwo) ||
                (this.edges[i].cityOne == cityTwo &&
                    this.edges[i].cityTwo == cityOne )  ) {
                return this.edges[i];
            }
           
        }
        return {};
    }

    adjacentEdges(cityName) {

        let arr = [];
        for(let i = 0; i < this.edges.length; i++) {
            let obj = this.edges[i]; 
            if(obj.cityOne == cityName && this.edges[i].discovered == false) {
                arr.push(this.edges[i].cityTwo);
                this.edges[i].discovered = true;
            }
            if(obj.cityTwo == cityName && this.edges[i].discovered == false) {
                arr.push(this.edges[i].cityOne);
                this.edges[i].discovered = true;
            }
        }
        return arr;
    }
}

class CityNode {
    constructor(properties) {
        this.cityName = properties.cityName;
        this.stateName = properties.stateName;
        this.discovered = false;
        this.tenative = Infinity;
    }
}

class RoadEdge {
    constructor(properties) {
        this.roadName = properties.roadName;
        this.cityOne = properties.cityOne;
        this.cityTwo = properties.cityTwo;
        this.discovered = false;
        this.direction = properties.direction | "";
        this.distance = properties.distance || 1;
    }
}


class Utility {
    static 
}


module.exports.MapGraph = MapGraph;
module.exports.RoadEdge = RoadEdge;
module.exports.CityNode = CityNode;
