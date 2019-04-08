import React, { Component } from 'react';
import './App.css';
import GroupList from './components/group_list';
import { TASK_PAYLOAD } from './utils/data';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TaskList from './components/task_list';


class App extends Component {
  /* The main application for the app. The Router is
  * in the render */
  constructor(props) {
    // digest task list as object for easier lookup later on.
    super(props)
    let tasks = {}
    for (let task of TASK_PAYLOAD) {
      tasks[task.id] = task
    }
    this.state = { tasks }
    // bind this handler because it's being passed to a child
    this.checkHandler = this.checkHandler.bind(this)
  }
  checkHandler(e) {
    // Toggle the createdAt value on a given task from null to now
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
    // get object representing the distinct groups mapped to their
    // number of completed tasks/total tasks.
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
          <Route exact path="/" render={() => {
            return <GroupList groups={this.getGroups()} />
          }} />
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
