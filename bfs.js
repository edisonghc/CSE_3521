//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function breadth_first_search(initial_state) {
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

  /***Your code for breadth-first search here***/

	let current={
		state: [],
		predecessor: [],
		action: []
	};

	let found = false;

	//1. Initialize Open to contain initial state
	open.push({
		state: initial_state,
		predecessor: [],
		action: []
	});

	while(!found && open.length!=0) {

		//2. Choose/remove one state from Open
		current = open.shift();
		
		//3. Jump to (8) if already in visited
		if(!closed.has(state_to_uniqueid(current.state))) {
			
			//4. Check if state is a goal state (done if so)
			if(is_goal_state(current.state)) {
				found = true;
			}
			else {

				//5. Get child states using successor function
				let successors = find_successors(current.state);

				//6. Insert children into Open
				while(successors.length!=0){
					
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

				//7. Insert original state into closed
				closed.add(state_to_uniqueid(current.state));
			}
		}

		//8. Repeat from (2)
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
	
	if(found){
		current.predecessor.push(current.state);
		current.predecessor.shift();
		return {
			actions : current.action /*array of action ids*/,
			states : current.predecessor /*array of states*/
		  };
	}

  //OR

  //No solution found
  return null;
}
