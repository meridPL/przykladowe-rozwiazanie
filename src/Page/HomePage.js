import React, { Component } from 'react';
import Store from '../Mobx/Store'

class HomePage extends Component {    
	componentDidMount() {
        console.log('TCL: HomePage -> componentDidMount -> componentDidMount', Store);
        this.loadData()
    }
    
    loadData = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=20")
        const json = await response.json();
        console.log("TCL: HomePage -> loadData -> json", json)
    } 

	render() {
		console.log('TCL: HomePage -> render -> render');
		return (
			<div>
				<h1>HomePage</h1>
                {}
			</div>
		);
	}
}

export default HomePage;
