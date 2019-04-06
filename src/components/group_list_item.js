import React, { Component } from 'react';

export default class GroupListItem extends Component {
	render() {
		const { group } = this.props;
		return (
			<li>
				<p>{ group.name }</p>
				<span>{ group.info }</span>
			</li>
		)
	}
}