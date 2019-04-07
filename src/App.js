import React, { Component } from 'react';
import './App.css';
import GroupList from './components/group_list';
import { TASK_PAYLOAD } from './utils/data';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TaskList from './components/task_list';


class App extends Component {
  constructor() {
    super()
    let tasks = {}
    for (let task of TASK_PAYLOAD) {
      tasks[task.id] = task
    }
    this.state = { tasks }
    this.checkHandler = this.checkHandler.bind(this)
  }
  checkHandler(e) {
    const id = e.currentTarget.id
    const now = Date.now()
    let tasks = this.state.tasks
    const task = tasks[id]
    if (task.completedAt == null){
      tasks[id].completedAt = now;
    } else {
      tasks[id].completedAt = null;
    }
    this.setState({tasks})
  }
  getGroups() {
    let groups = {}
    for (let task of Object.values(this.state.tasks)) {
      if (task.group in groups) {
        groups[task.group].total += 1
        groups[task.group].completed += task.completedAt !== null ? 1 : 0
      } else {
        groups[task.group] = {
          total: 1,
          completed: task.completedAt !== null ? 1 : 0
        }
      }
    }
    return groups
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <GroupList groups={this.getGroups()} />} />
          <Route
            path="/:group"
            render={
              (group) => <TaskList
                tasks={this.state.tasks}
                group={group.match.params.group}
                checkHandler={this.checkHandler}
                />
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;
