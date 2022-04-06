```cpp
public void searchForValue(int valueToFind, int[] arr, int sizeOfArray) {       
        for (int it = 0; it < sizeOfArray ; it++) {
            if (arr[it] == valueToFind) {
                System.out.println("Success");
                break;
            }
        }
        if (it == sizeOfArray)
            System.out.println("Failure");
        return;
}
```

Time complexity = O(n) - Linear search, grows directly in proportion to the input data size
Space Complexity = O(1) - No size specific data structure used

```cpp
for(int i = 0; i < n; i++){
    for(int j = 0; j < m; j++){
       Matrix[i][j] = i+j;
  }
}
```

Time Complexity - O(m*n) - Running 2 loops but each one iterates to a different length
Space Complexity - O(1) - constant number of variables

#### Example 3 
```js
function indexOf(array, element, offset = 0) {
 // split array in half
 const half = parseInt(array.length / 2);
 const current = array[half];
 if (current === element) {
   return offset + half;
 } else if (element > current) {
   const right = array.slice(half); // n / 2 space
   return indexOf(right, element, offset + half);
 } else {
   const left = array.slice(0, half) // n / 2 space
   return indexOf(left, element, offset);
 }
}
```