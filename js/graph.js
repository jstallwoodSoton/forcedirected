class Vertex {
    constructor(label) {
        this.label = label;
        this.neighborhood = [];
    }
}

class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

class NGraph {
    constructor(graphObject) {
        this.parseGraphObject(graphObject);
    }

    parseGraphObject(graphObject) {
        this.vertices = {};
        let vKeys = Object.keys(this.vertices);
        graphObject["vertices"].forEach(v => {
            vKeys = Object.keys(this.vertices);
            if(!vKeys.includes(v)) {
                this.vertices[v] = new Vertex(v);
            }
        });

        vKeys = Object.keys(this.vertices);
        this.edges = {};
        graphObject["edges"].forEach(e => {

            let a = e["from"];
            let b = e["to"];

            vKeys = Object.keys(this.vertices);

            if(!vKeys.includes(a)) {
                this.vertices[a] = new Vertex(a);
            }

            if(!vKeys.includes(b)) {
                this.vertices[b] = new Vertex(b);
            }

            this.edges[a+b] = new Edge(this.vertices[a], this.vertices[b]);
            this.vertices[a].neighborhood.push(b);
            this.vertices[b].neighborhood.push(a);
        });

        
        this.edgeIDS = Object.keys(this.edges);
        this.vertexIDS = Object.keys(this.vertices);
    }

}
