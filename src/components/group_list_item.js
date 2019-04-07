import React, { Component } from 'react';
import icon from '../assets/Group.svg'
import { Link } from 'react-router-dom'

export default class GroupListItem extends Component {
	handleClick(e) {
		console.log(e.currentTarget.id);
	}
	render() {
		const { group } = this.props;
		return (
			<li className="uk-panel">
				<div className="uk-align-left">
					<img src={icon} alt="expand" height="10" width="10"/>
				</div>
				<Link to={ group.name } className="uk-button uk-button-text">
					<span className="uk-text-large">{ group.name }</span>
				</Link><br/>
				<span className="uk-text-muted">{ group.info }</span>
			</li>
		)
	}
}