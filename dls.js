//Perform depth-limited search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Will not examine paths longer than "depth_limit" (i.e. paths that have "depth_limit" states in them, or "depth_limit-1" actions in them)
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function depth_limited_search(initial_state,depth_limit) {

  /***Your code for depth-limited search here!***/
  
  /***DO NOT do repeated state or loop checking!***/
  
  /*
    Hint: You may implement DLS either iteratively (with open set) or recursively.
    
    In the iterative case, you will need to do similar to breadth-first search and augment
    the state. In addition to predecessor and action, you will also need to store depth.
    (You should be able to re-use your BFS code and only make a small amount of changes to
     accomplish this. Be sure to remove repeat checking!)

    In the recursive case, you don't need the above. Building the solution path is a little
    trickier, but I suggest you look into the Array.unshift() function.
  */

  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  //let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

  /***Your code for depth-first search here***/

  let current = {
    state: [],
    predecessor: [],
    action: [],
  };

  let found = false;

  //add initial, add adj nodes to queue, pop current from queue into closed

  open.push({
    state: initial_state,
    predecessor: [],
    action: []
  });

  while (!found && open.length != 0) {
    current = open.shift();

    if (!closed.has(state_to_uniqueid(current.state))) {

      if (is_goal_state(current.state)) {
        found = true;
      }

      else {
        let successors = find_successors(current.state);
        while (successors.length != 0) {

          element = successors.shift();

          let predecessor_path = current.predecessor.map(x => x);
          predecessor_path.push(current.state);

          let action_path = current.action.map(x => x);
          action_path.push(element.actionID);

          open.push({
            state: element.resultState,
            predecessor: predecessor_path,
            action: action_path
          })
        }
        closed.add(state_to_uniqueid(current.state));

      }
    }
  }

  /*
  Hint: In order to generate the solution path, you will need to augment
  the states to store the predecessor/parent state they were generated from
  and the action that generates the child state from the predecessor state.
  
  For example, make a wrapper object that stores the state, predecessor and action.
  Javascript objects are easy to make:
  let object={
  member_name1 : value1,
  member_name2 : value2
  };
  
  Hint: Because of the way Javascript Set objects handle Javascript objects, you
  will need to insert (and check for) a representative value instead of the state
  object itself. The state_to_uniqueid function has been provided to help you with
  this. For example
  let state=...;
  closed.add(state_to_uniqueid(state)); //Add state to closed set
  if(closed.has(state_to_uniqueid(state))) { ... } //Check if state is in closed set
  */

  /***Your code to generate solution path here***/

  if (found) {
    current.predecessor.shift();
    current.predecessor.push(current.state)
    return {
      actions: current.action /*array of action ids*/,
      states: current.predecessor /*array of states*/
    };
  }

  //OR

  //No solution found
  return null;
}
