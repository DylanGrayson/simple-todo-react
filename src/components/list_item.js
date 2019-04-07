import React, { Component } from 'react';
import unchecked from '../assets/Incomplete.svg'
import checked from '../assets/Completed.svg'
import lockedLogo from '../assets/Locked.svg'

export default class ListItem extends Component {
	render () {
		const { item, checkHandler } = this.props
		let checkBox;
		let classes = "";
		let onClick;
		if (item.locked){
			checkBox = <img src={lockedLogo} alt="Locked" />
			classes = "uk-text-muted"
		} else if (item.completedAt === null) {
			checkBox = <img src={unchecked} alt="Incomplete" />
			onClick = checkHandler
		} else {
			checkBox = <img src={checked} alt="Complete" />
			classes = "strikethrough"
		}
		return (
			<li className="task-item" onClick={onClick} id={item.id}>
				<span className="uk-padding-small">{checkBox}</span>
				<span className={classes}>{item.task}</span>
			</li>
		)
	}
}