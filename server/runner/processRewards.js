module.exports = {
  id: 'task-processrewards',
  tickInterval: 10,
  totalRuns: 0,
  callback (task) {
    // code to be executed on each run
    console.log(`${task.id} task has run ${task.currentRuns} times.`)
  }
}
