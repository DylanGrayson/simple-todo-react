import React, { Component } from 'react';
import GroupListItem from './group_list_item'

export default class GroupList extends Component {
	render() {
		const { groups } = this.props
		let items = []
		for (const name in groups) {
			const completed = groups[name].completed
			const total = groups[name].total
			const info = `${completed} OF ${total} TASKS COMPLETE`
			const group = {name, info}
			items.push(<GroupListItem key={name} group={group}/>)
		}
		return (
			<div className="uk-container uk-container-small">
				<h1>Things To Do</h1>
				<hr/>
				<ul className="uk-list uk-list-divider uk-list-large">
					{items}
				</ul>
			</div>
		)
	}
}