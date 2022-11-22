// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => {
      if (amount % 5 === 0) {
        resolve({ data: amount });
      } else {
        reject('amount is not divisible by 5');
      }
    }, 500)
  );
}
