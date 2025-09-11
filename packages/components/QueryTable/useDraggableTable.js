export default (dataSource, draggable) => {
  let dragItem = null
  let targItem = null
  const customRow = record => {
    return {
      draggable: draggable,
      ondrag(e) {
        dragItem = record
      },
      ondrop(e) {
        targItem = record
      },
      ondragend(e) {
        if (targItem && dragItem && dragItem !== targItem) {
          const sourceIndex = dataSource.value.indexOf(dragItem)
          const targetIndex = dataSource.value.indexOf(targItem)
          const temp = dataSource.value[sourceIndex]
          dataSource.value[sourceIndex] = targItem
          dataSource.value[targetIndex] = temp
        }
      },
      ondragover(e) {
        e.preventDefault()
        return false
      },
    }
  }
  return {
    customRow,
  }
}
