// CH 7 Delivery Robot
// A town has buildings, and roads between those buildings.
// Buildings are connected to one or more other buildings by roads,
// but not connected to every other building.

// Delivery robots need to:
// move along defined roads in the town, 
// visit each building at least once,
// pick up parcels from buildings (sender),
// drop parcels whenat their intended destination (receiver),
// and finish their route when there are no more parcels.

// Data
const roads = [
  "Alice's House -> Bob's House",
  "Alice's House -> Cabin",
  "Alice's House -> Post Office",
  "Bob's House -> Town Hall",
  "Daria's House -> Ernie's House",
  "Daria's House -> Town Hall",
  "Ernie's House -> Grete's House",
  "Grete's House -> Farm",
  "Grete's House -> Shop",
  "Marketplace -> Farm",
  "Marketplace -> Post Office",
  "Marketplace -> Shop",
  "Marketplace -> Town Hall",
  "Shop -> Town Hall",
];

// Helpers
const ALICES_HOUSE = "Alice's House";
const BOBS_HOUSE = "Bob's House";
const CABIN = "Cabin";
const DARIAS_HOUSE = "Daria's House";
const ERNIES_HOUSE = "Earnie's House";
const FARM = "Farm";
const GRETES_HOUSE = "Grete's House";
const MARKETPLACE = "Marketplace";
const POST_OFFICE = "Post Office";
const SHOP = "Shop";
const TOWN_HALL = "Town Hall";

const mailRoute = [ ALICES_HOUSE, CABIN, ALICES_HOUSE,
  BOBS_HOUSE, TOWN_HALL, DARIAS_HOUSE, ERNIES_HOUSE,
  GRETES_HOUSE, SHOP, GRETES_HOUSE, FARM, MARKETPLACE,
  POST_OFFICE,
];

const roadGraph = buildGraph(roads);

const randomPick = (array) => {
  const choice = Math.floor( Math.random() * array.length );
  return array[choice];
}

// Main
function buildGraph(edges) {
  let graph = {};
  function addEdge(from, to) {
    (graph[from] == null) ? graph[from]=[to] : graph[from].push(to);
  }
  for ( let [from, to] of edges.map(r => r.split(' -> ')) ) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
};

class VillageState {
  constructor(params) {
    this.place = params.place;
    this.parcels = params.parcels;
  }

  static random(parcelCount=5) {
    let parcels = [];
    for (let i=0; i < parcelCount; i++) {
      const receiver = randomPick( Object.keys(roadGraph) );
      const sender = randomPick(
        Object.keys(roadGraph).filter(here => here != receiver)
      );
      parcels.push( {sender, receiver, location: sender} );
    }
    return new VillageState( {place: POST_OFFICE, parcels} );
  }

  deliver(currentLocation) {
    const newParcels = this.parcels.map( p => {
      if (p.sender != this.place) {
        return p;
      } else {
        return ( {
          location: currentLocation,
          sender: p.sender,
          receiver: p.receiver
        } );
      }
    } ).reduce( (acc, p) => {
      (p.receiver != this.place)
        ? acc.push(p)
        : console.log(`Delivered parcel from ${p.sender}.`);
      return acc;
    }, [] );
    return new VillageState( {place: currentLocation, parcels: newParcels} );
  }

  move(nextStop) {
    if ( roadGraph[this.place].includes(nextStop) ) {
      return this.deliver(nextStop);
    } else {
      return this;
    }
  }
}

const findRoute = (currentLocation, destination, graph=roadGraph) => {
  let routesToEval = [ {startLocation: currentLocation, route: []} ];
  for (let i=0; i < routesToEval.length; i++) {
    let {startLocation, route} = routesToEval[i];
    for (let nextLocation of graph[startLocation]) {
      if (destination == nextLocation) {
        return route.concat(nextLocation);
      }
      if (!routesToEval.some(r => r.startLocation == nextLocation)) {
        routesToEval.push(
          {startLocation: nextLocation, route: route.concat(nextLocation)}
        );
      }
    }
  }
}

const runDeliveries = (state, robot, memory) => {
  for (let turn=0;  ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Delivery run finished in ${turn} moves.`);
      break;
    }
    const decision = robot(state, memory);
    state = state.move(decision.direction);
    memory = decision.memory;
    console.log(`Moved to ${decision.direction}.`);
  }
}

// Bots
const randomRobot = (state) => {
  return (
    {direction: randomPick(roadGraph[state.place])}
  );
}

const trainedRobot = (state, memory) => {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return (
    {direction: memory[0], memory: memory.slice(1)}
  );
}

const smartRobot = ({place, parcels}, route) => {
  if (route.length == 0) {
    const parcel = parcels[0];
    const nextDestination = parcel.location != place ? parcel.location : parcel.receiver;
    route = findRoute(place, nextDestination);
  }
  return (
    {direction: route[0], memory: route.slice(1)}
  );
}

// Tests
// const parcel = {sender, receiver, location};
const testRandomRobot = (num) => runDeliveries( VillageState.random(num), randomRobot );
const testTrainedRobot = (num) => runDeliveries( VillageState.random(num), trainedRobot, [] );
const testSmartRobot = (num) => runDeliveries( VillageState.random(num), smartRobot, [] );

testSmartRobot(20)
