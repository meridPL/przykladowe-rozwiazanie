import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import HomePage from '../Page/HomePage';
import ChooseComment from '../Page/ChooseComment';
import AddComment from '../Page/AddComment';
import { Provider } from './Context';
import store from '../Mobx/Store';
import { observer } from 'mobx-react';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';

const heightMenu = "90px";
const Nav = styled.nav`
	height: ${heightMenu};
	margin-bottom: 3rem;
`;
const LinkSC = styled(NavLink)`
	text-decoration: none;
	color: white;
	font-size: 1.3rem;
	border: 1px solid white;
	border-radius: 10px;
	padding: 10px;
	&.active{
		/* color: blue; */
		border: none;
		/* font-size: 1.5rem; */
	}
	`;
const Li = styled.li`
	transition: transform .3s;
		&:hover{
			transform: scale(1.3)
		}
		`;
const Ul = styled.ul`
	background-color:#2fb32f;
	position: absolute;
	left:0;
	right: 0;
	top: 0;
	margin:0;
	padding: 0 20% ;
	height: ${heightMenu};
	position: fixed;
	display: flex;
	flex-direction: row;
	width: auto;
	justify-content: space-between;
	align-items: center;
	list-style: none;
	z-index: 99999;
`;

const Div = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	h1{
		color: white;
		font-weight: bold;
		margin: 0;
		margin-left: 2rem;
	}
`;
@observer
class Layout extends Component {
	componentDidMount() {
		this.loadData();
	}

	loadData = async () => {
		const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=20")
		const json = await response.json();
		store.updateListComment(json);
	}

	getTitle = () => {
		switch (store.path) {
			case "/wybrane-komentarze":
				return "Ulubione komentarze"
			case "/nowy-komentarz":
				return "Nowy komentarz"
		}

	}

	render() {
		return (
			<Provider value={store}>
				<Router>
					<div>
						<Nav>
							<Ul>
								{store.path == "/" ?
									<Li>
										<LinkSC activeClassName="active" to="/"><Icon fontSize={"large"}>home</Icon></LinkSC>

									</Li>
									:
									<Div>
										<Li>
											<LinkSC activeClassName="active" to="/"><Icon>arrow_back_ios</Icon></LinkSC>
										</Li>
										<h1>{(this.getTitle)()}</h1>
									</Div>
								}
								{store.path == "/" &&
									<>
										<Li>
											<LinkSC activeClassName="active" to="/wybrane-komentarze">Wybrane komentarze</LinkSC>
										</Li>
										<Li>
											<LinkSC activeClassName="active" to="/nowy-komentarz">Nowy komentarz</LinkSC>
										</Li>
									</>
								}
							</Ul>
						</Nav>

						<Switch>
							<Route path="/wybrane-komentarze" component={ChooseComment} />
							<Route path="/nowy-komentarz" component={AddComment} />
							<Route exact path="/">
								<HomePage />
							</Route>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default Layout;
