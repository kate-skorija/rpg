<!-- 
while ((n < 1000) && ((n % 3 === 0) || (n % 5 === 0))) {
  const arr = 
} -->

const incrementCounter = (num, sum) => {
  if (isNaN(num)) {
    return;
  }
  if (num === 1) {
    return sum;
  } else {
      if((num % 3 === 0) || (num % 5 === 0)){
        sum += num;
      }
    return incrementCounter((num - 1), sum);
  }
}



const num = 1;
const sum = 1;

const fibonacciEvenSum = (num, sum) => {
  if (isNaN(num)) {
    return;
  }
  if (num >= 4000000) {
    return sum;
  } else {
      const numString = num.ToString();
      const splitString = numString.Split("");
      const parseArr = splitString.map(n => n.parseInt())
      num = parseArr.reduce();
      if (num % 2 = 0) {
        sum += num;
      }
      return fibonacciEvenSum(num, sum);
    }
}