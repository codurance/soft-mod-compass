module.exports = {
  buildAnswerScore: (answer, score) => ({
    answer,
    score,
  }),
  createLinkedList(array) {
    const arrayCopy = array.slice();
    function node(obj, index) {
      return {
        data: obj,
        next: undefined,
        previous: undefined,
        index,
      };
    }
    const headElement = arrayCopy.shift();

    const linkedList = {
      head: node(headElement, 0),
      add(obj) {
        let tmp = this.head;
        while (tmp.next) {
          tmp = tmp.next;
        }
        tmp.next = node(obj, tmp.index + 1);
        tmp.next.previous = tmp;
      },
    };
    arrayCopy.forEach((value) => linkedList.add(value));
    return linkedList;
  },
};
