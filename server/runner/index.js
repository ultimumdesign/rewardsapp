const { TaskTimer } = require('tasktimer')

// const processRewards = require('./processRewards')
const syncMembers = require('./syncMembers')

// Timer with 1000ms (1 second) base interval resolution.
const timer = new TaskTimer(1000)

// Add multiple tasks (at once) based on tick intervals.
timer.add([
  syncMembers
])

module.exports = timer
