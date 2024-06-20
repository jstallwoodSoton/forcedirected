const GRAPH_MODEL = {
    "vertices" : ["a", "b", "c", "d", "e", "f", "g"],
    "edges" : [
        {
            "from":"a",
            "to":"b"
        },
        {
            "from":"a",
            "to":"c"
        },
        {
            "from":"a",
            "to":"d"
        },
        {
            "from":"f",
            "to":"b"
        },
        {
            "from":"e",
            "to":"g"
        },
    ]
};

const GRAPH = new NGraph(GRAPH_MODEL);

const GRAPH_SKETCH = function(p) {
    let counter = 0;
    let nodeColor, labelColor;

    p.setup = function() {
        p.createCanvas(600, 400);

        nodeColor = p.color(130, 106, 237);
        labelColor = p.color(255, 183, 255);

        GRAPH.vertexIDS.forEach(ID => {
            GRAPH.vertices[ID].x = p.random(0.1*p.width, 0.9*p.width);
            GRAPH.vertices[ID].y = p.random(0.1*p.height, 0.9*p.height);
        });

        p.frameRate(10);

    }

    p.draw = function() {
        p.background(255);
        displayEdges();
        displayVertices();

        GRAPH.vertexIDS.forEach(ID => {
            let u = GRAPH.vertices[ID];
            for(let i = 0; i < u.neighborhood.length; i++) {
                let v = GRAPH.vertices[u.neighborhood[i]];
                applyAttraction(u, v, 50);
            }

            for(let i = 0; i < GRAPH.vertexIDS.length; i++) {
                let vLabel = GRAPH.vertexIDS[i];
                if(!u.neighborhood.includes(vLabel) && vLabel !== u.label) {
                    let v = GRAPH.vertices[vLabel];
                    applyRepel(u, v, 50);
                }
            }
        })

        counter += 1;
        if(counter >= 1000) {
            p.noLoop();
        }
    }

    function displayVertices() {
        GRAPH.vertexIDS.forEach(ID => {
            p.fill(nodeColor);
            p.noStroke();
            p.circle(
                GRAPH.vertices[ID].x,
                GRAPH.vertices[ID].y,
                30 
            );
            p.textAlign(p.CENTER, p.CENTER);
            p.stroke(labelColor);
            p.strokeWeight(0.1);
            p.fill(labelColor);
            p.textSize(20);
            p.text(ID, GRAPH.vertices[ID].x, GRAPH.vertices[ID].y);
        });
    }

    function displayEdges() {
        GRAPH.edgeIDS.forEach(ID => {
            p.strokeWeight(2);
            p.stroke(nodeColor, 100);
            p.noFill();
            p.line(
                GRAPH.edges[ID].a.x,
                GRAPH.edges[ID].a.y,
                GRAPH.edges[ID].b.x,
                GRAPH.edges[ID].b.y
            );
            
        })
    }

    function getDistance(u, v) {
        return p.sqrt(p.pow(u.x - v.x, 2) + p.pow(u.y - v.y, 2));
    }

    function getAttractForce(d, idealLength) {
        return 2 * p.log(d/idealLength);
    }

    function getRepelForce(d, idealLength) {
        return idealLength/(p.pow(d, 2));
    }

    function applyAttraction(u,v, idealLength) {
        let d = getDistance(u, v);
        let f = getAttractForce(d, idealLength);
        let delX = v.x - u.x;
        let delY = v.y - u.y;

        u.x += 0.1 * f * delX;
        u.y += 0.1 * f * delY;
    }

    function applyRepel(u, v, idealLength) {
        let d = getDistance(u, v);
        
        let f = getRepelForce(d, idealLength);
        let delX = u.x - v.x;
        let delY = u.y - v.y;

        u.x += 0.1 * f * delX;
        u.y += 0.1 * f * delY;
    }
}

new p5(GRAPH_SKETCH, "sk1");