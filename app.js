const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const GraphClass = require(path.join(__dirname, '/classes/graph.js'));
const CityNode = require(path.join(__dirname, '/classes/city_node.js'))
const Edge = require(path.join(__dirname, '/classes/edge.js'))

let instance = null;
class App {
    constructor() {
        this.Graph = new GraphClass();
        this.intitialized = false;
    }

    intitialize() {
        return new Promise((resolve, reject) => {
            Utility.build_graph(this.Graph)
            .then(() => { 
                console.log("Graph built");
                this.intitialized = true;
                resolve();
            }, (err) => {
                console.log(err);
                reject();
            })
        })    
    }
    static getInstance() {
        if(!instance)
            instance = new App();
        return instance;
    }
    get_city(city_name) {
        console.log(city_name);
        let node = this.Graph.findNode(city_name);
        if(node) {
            return {
                city: node.cityName,
                state: node.stateName
            }
        } else {
            return false;
        }
    }
    route(start_location, end_location) {
        if(!this.intitialized) {
            console.log("Not Initialized");
            return false;
        }
        if(!this.Graph.nodeExists(start_location) || !this.Graph.nodeExists(end_location)) {
            console.log("Location not found");
            return false;
        }


        let directions = [];
        let edge;
        console.log("Routing");

        let cities = this.Graph.Dijkstra(start_location, end_location);
        for(let i = 0; i < cities.length; i++) {
            edge = this.Graph.findEdge(cities[i], cities[i+1]);

            directions.push({
                city: cities[i],
                road: edge.roadName || directions[directions.length-1].road,
                distance: edge.distance
            })
        }
        // this.printDirections(directions.reverse());
        return directions.reverse();
    }
}

const Utility = {
    nodes_file: '/data/cities_list_2.csv',
    edges_file: '/data/road_mark_list_2.csv',
    graph: null,
    build_graph: function(graph) {
        this.graph = graph;
        let edgeList = [];
        let cityList = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, this.nodes_file))
            .pipe(csv())
            .on('data', (data) => cityList.push(data))
            .on('end', () => {
                fs.createReadStream(path.join(__dirname, this.edges_file))
                .pipe(csv())
                .on('data', (data) => edgeList.push(data))
                .on('end', () => {
                    this.create_cities(cityList);
                    this.create_edges(edgeList);
                    resolve();
                })
            })
        })
    },
    create_cities: function(arr) {
        for(let i = 0; i < arr.length; i++) {
            this.graph.addNode(new CityNode( {
                id: arr[i].id,
                cityName: arr[i].city_name,
                stateName: arr[i].state
            }))
        }
    },
    create_edges: function(arr) {
        let cleanData = [];
        for(let i = 0; i < arr.length; i++) {
            if(this.graph.nodeExists(arr[i].marker)) {
                cleanData.push(arr[i]);
            }
        }
        for(let i = 0; i < cleanData.length-1; i++) {
            if(cleanData[i].name == cleanData[i+1].name) {
                this.graph.addEdge( new Edge(
                    {
                        id: cleanData[i].id,
                        roadName:cleanData[i].name,
                        cityOne: cleanData[i].marker,
                        cityTwo: cleanData[i+1].marker,
                        distance: cleanData[i+1].distance
                    }
                    ))
                }
            }   
        }
    }
    
    module.exports = App;