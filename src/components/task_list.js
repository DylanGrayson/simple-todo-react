import React, { Component } from 'react';
import ListItem from './task_list_item'
import { Link } from 'react-router-dom'

export default class TaskList extends Component {
	render() {
		const { group, tasks, checkHandler } = this.props
		const listItems = []
		for (const task of Object.values(tasks)){
			if (task.group === group) {
				let locked = false
				for (let id of task.dependencyIds){
					if (tasks[id].completedAt == null){
						locked = true
						break
					}
				}
				task['locked'] = locked
				listItems.push(<ListItem item={ task }
					key={task.id}
					checkHandler={checkHandler}
				/>)
			}
		}
		return (
			<div className="uk-container uk-container-small">
				<div className="uk-container">
					<h1>{ group }</h1>
					<Link to="/" className="uk-align-right">ALL GROUPS</Link>
				</div>
				<ul className="uk-list uk-list-large uk-list-divider">
					{listItems}
				</ul>
			</div>
		)
	}
}