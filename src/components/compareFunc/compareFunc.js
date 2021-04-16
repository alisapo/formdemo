export const  compareFunc = (key = 'asc') => {
  return function innerSort(a, b) {
    let comparison = 0;
    if (a.id > b.id) {
      comparison = 1;
    } else if (a.id < b.id) {
      comparison = -1;
    }
    return (
      (key === 'desc') ? (comparison * -1) : comparison
    );
  };
};
