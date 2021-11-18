export function groupByDate (calls, archiveMode) {
  const groups = calls.reduce((groups, call) => {
    const date = call.created_at.split('T')[0]
    if(call.is_archived === archiveMode){
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(call)
    }
    return groups
  }, {})

  const groupArrays = Object.keys(groups).map(date => {
    return {
      date,
      calls: groups[date]
    }
  })
  return groupArrays
}
