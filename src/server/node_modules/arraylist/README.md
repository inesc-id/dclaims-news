ArrayList
=========

ArrayList inherits from JavaScript Array, without overwriting or populate this class.

##Install:

    # npm install arraylist

## API:

* **get(index)**

    Returns an element by position:

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.get(0); // 1
list.get(1); // 2
list.get(0) == list[0]; // true
```

* **set(index, value)**

    Set an element by position

```js
var list = new ArrayList;
list.set(0, 'hello');
list.set(1, 'world');
list.get(0); // hello
list.get(1); // world
```

* **contains(element)**

    Check if an element is in the list

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.contains(1)); // true
list.contains(2)); // true
list.contains(3)); // true
list.contains(4)); // false
```

* **add(elements)**

    Add elements to the list

```js
var list = new ArrayList;
list.add(1);
list.add('car');
list.add([2, 3, 4]);
list.length; // 5
```

* **isEmpty()**

    Check if the list contains no elements

```js
var list = new ArrayList;
list.isEmpty(); // true
list.add('something');
list.isEmpty(); // false
```

* **equals(list)**

    Check if two lists are equals

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3]);
list.equals(list2); // false
list2.add([1, 2, 3]);
list.equals(list2); // true
```

* **clone()**

    Creates a copy of the list

```js
var list = new ArrayList;
list.add([1, 2, 3]);
var list2 = list.clone();
list.equals(list2); // true
```

* **remove(index)**

    Removes an element by position

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.remove(0);
list; // [2, 3]
```

* **removeElement(element)**

    Removes a specified element

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.removeElement(2);
list; // [1, 3]
```

* **removeAll(list)**

    Remove all the elements in another collection

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list2.add([1, 3, 5]);
list.removeAll(list2);
list; // [2, 4]
```

* **replaceAll(list)**

    Replace all the elements of the list

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list2.add([1, 3, 5]);
list.replaceAll(list2);
list; // [1, 3, 5]
```

* **clear()**

    Remove all the elements in the list

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.clear();
list.isEmpty(); // true
```

* **toArray()**

    Return a new array with all the elements in the same order

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.toArray(); // [1, 2, 3]
```

* **first([n])**

    Returns the first element of the list. [[see](http://underscorejs.org/#first)]

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.first(); // 1
list.first(2); // [1, 2]
```

* **initial([n])**

    Returns everything but the last entry of the list. [[see](http://underscorejs.org/#initial)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.initial(); // [1, 2, 3, 4]
```

* **last([n])**

    Returns the last element of the list. [[see](http://underscorejs.org/#last)]

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.last(); // 3
```

* **rest(index)**

    Returns the rest of the elements in the list. [[see](http://underscorejs.org/#rest)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.rest(); // [1, 2, 3, 4]
```

* **compact()**

    Returns a new list with the false values removed. [[see](http://underscorejs.org/#compact)]

```js
var list = new ArrayList;
list.add([1, false, 0, '', 5]);
list.compact(); // [1, 5]
```

* **flatten()**

    Returns a new list flattened. [[see](http://underscorejs.org/#flatten)]

```js
var list = new ArrayList;
list.add([1, [2], [[3]]]);
list.flatten(); // [1, 2, 3]
```

* **without(*values)**

    Returns a new list without the specified values. [[see](http://underscorejs.org/#without)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.without([1, 3, 5]); // [2, 4]
```

* **partition(predicate)**

    Split the list into two lists. [[see](http://underscorejs.org/#partition)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4]);
list.partition(function(n) {
  return n % 2 == 0; // pair or odd
}); // [[1, 3], [2, 4]]
```

* **union(*lists)**

    Returns the list joined with the arrays specified, the join is unique. [[see](http://underscorejs.org/#union)]

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3]);
list2.add([1, 4, 5]);
list.union(list2); // [1, 2, 3, 4, 5]
```

* **intersection(*lists)**

    Returns the list intercepted with the arrays specified, the intersection is unique. [[see](http://underscorejs.org/#intersection)]

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3]);
list2.add([1, 2, 4]);
list.intersection(list2); // [1, 2]
```

* **difference(*lists)**

    Returns the list minus the lists specified, the difference is unique. [[see](http://underscorejs.org/#difference)]

```js
var list = new ArrayList;
var list2 = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list2.add([1, 3, 5, 10]);
list.difference(list2); // [2, 4]
```

* **unique()**

    Returns a list with the duplicated values removed. [[see](http://underscorejs.org/#unique)]

```js
var list = new ArrayList;
list.add([1, 2, 2, 3, 3, 4]);
list.unique(); // [1, 2, 3, 4]
```

* **uniq()**

    Alias for unique.

* **zip(*lists)**

    Merges together the values of each of the lists with the values at the corresponding position. [[see](http://underscorejs.org/#zip)]

* **object([values])**

    Converts lists into objects. [[see](http://underscorejs.org/#object)]

* **sortedIndex(value, [iterator], [context])**

    Returns the index at which the value should be inserted into the list. [[see](http://underscorejs.org/#sortedIndex)]

```js
var list = new ArrayList;
list.add([10, 20, 30]);
list.sortedIndex(25); // 2
```

* **each()**

    Alias for forEach.

* **map(iterator, [context])**

    Returns a new list with each value mapped through a transformation. [[see](http://underscorejs.org/#map)]

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.map(function (n) {
  return n * 2;
}); // [2, 4, 6]
```

* **reduce(iterator, memo, [context])**

    [[see](http://underscorejs.org/#reduce)]


* **reduceRight(iterator, memo, [context])**

    [[see](http://underscorejs.org/#)]


* **find(predicate, [context])**

    Returns a new list with the occurrences that passes the test. [[see](http://underscorejs.org/#filter)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5, 6]);
list.find(function (n) {
  return n % 2 == 0;
}); // [2, 4, 6]
```

* **findOne(predicate, [context])**

    Returns the first occurrence that passes the test. [[see](http://underscorejs.org/#find)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5, 6]);
list.findOne(function (n) {
  return n % 2 == 0;
}); // 2
```

* **where(properties)**

    [[see](http://underscorejs.org/#where)]


* **findWhere(properties)**

    [[see](http://underscorejs.org/#findWhere)]


* **reject(predicate, [context])**

    Returns the values in list without the elements that the truth test passes. [[see](http://underscorejs.org/#reject)]

* **every([predicate], [context])**

    Returns true if all of the values in the list pass the predicate truth test. [[see](http://underscorejs.org/#every)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.every(function (n) {
  return n > 0;
}); // true
```

* **some([predicate], [context])**

    Returns true if any of the values in the list pass the predicate truth test. [[see](http://underscorejs.org/#some)]

```js
var list = new ArrayList;
list.add([1, 2, 3]);
list.some(function (n) {
  return n % 2 == 0;
}); // true
```

* **invoke(methodName, *arguments)**

    Calls the method on each value in the list. [[see](http://underscorejs.org/#invoke)]

```js
var list = new ArrayList;
list.add([1, 2, 3]);
```

* **pluck(propertyName)**

    [[see](http://underscorejs.org/#pluck)]


* **max([iterator], [context])**

    Returns the maximum value in list. [[see](http://underscorejs.org/#max)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.max(); // 5
```

* **min([iterator], [context])**

    Returns the minimum value in list. [[see](http://underscorejs.org/#min)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.min(); // 1
```

* **sortBy(iterator, [context])**

    Returns a new list with the values sorted. [[see](http://underscorejs.org/#sortBy)]


* **groupBy(iterator, [context])**

    [[see](http://underscorejs.org/#groupBy)]


* **indexBy(iterator, [context])**

    [[see](http://underscorejs.org/#indexBy)]


* **countBy(iterator, [context])**

    [[see](http://underscorejs.org/#countBy)]


* **shuffle()**

    Returns a shuffled copy of the list, using a version of the [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle). [[see](http://underscorejs.org/#shuffle)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.shuffle(); // [3, 1, 5, 4, 2]
```

* **sample([n])**

    Returns a random sample from the list. [[see](http://underscorejs.org/#sample)]

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.sample(); // 4
```

* **size()**

    Returns the length of the list.

```js
var list = new ArrayList;
list.add([1, 2, 3, 4, 5]);
list.size(); // 5
```