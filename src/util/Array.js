let arr = [1, 2, 3, 4, 5];
// 第一个参数是： callback
arr.forEach((item, index, arr1)=>{
    // console.log(item); // 数组中每一项的值
    // console.log(index);  // 数组中每一项的下标志(索引)
    // console.log(arr1); // 当前数组对象
})

// 第二个参数是thisArg，作用是为了改变回调函数中的this指向
let obj = {
    fn: function(a,b) {
        console.log(a, b)
    }
}
let arr1 = ['a', 'b', 'c'];
arr1.forEach(function(v, i, a) {
    this.fn(v, i);
}, obj)
// 注意： 不传第二个参数时， callback中的this默认指向window对象
//        当传递第二个参数时， callback中的this就指向这个参数
// ======================================end===============================================

// filter: 作用返回一个匹配过滤条件的新数组，其接受两个参数callback和thisArg
let filterArr = [
    {name: 'apple', count: 2},
    {name: 'banana', count: 1},
    {name: 'orange', count: 3},
    {name: 'pear', count: 5}
]
let newFilterArr = [];
newFilterArr = filterArr.filter((item) => {
    return item.name === "orange";
})
console.log(newFilterArr);

// ======================================end===============================================

// map(callback[thisArg])
// 对数组的每个元素进行一定操作后，会返回一个新的数组
let mapArr = [
    {w: 10, h: 10},
    {w: 15, h: 20},
    {w: 12, h: 12}
];
let newMapArr = mapArr.map((item) => {
    item.area = item.w * item.h;
    return item;
})
console.log(newMapArr);
console.log(mapArr); // 原数组变化了

let tstArr = [1,2,3];
console.log(tstArr.map((item) => {
    return item*2;
}))
console.log(tstArr) // 原数组没变
// =================================end============================================

// reduce(callback[initialValue])
// 可以实现一个累加器的功能，将数组的每个值(从左到右)将其降低到一个值。

// 1. 只有一个参数callback, 那么callback中里面的第一个参数prev代表第一个元素的值， next代表的是第二个元素的值
var reduceArr = ["apple","orange"];
let newReduceArr = reduceArr.reduce(function(prev,next){
    // console.log("prev:",prev);  // apple
    // console.log("next:",next);  // orange
    return prev + ' ' + next;
});
console.log(newReduceArr) // apple orange

// 2. 有两个参数callback, initialValue, 那么callback中里面的第一个参数的值是initialValue的值， 第二个参数的值是第一个元素的值
let reduce2Arr = [1, 2, 3, 4];
let newReduce2Arr = reduce2Arr.reduce((prev, next) => {
    return prev + next
}, 100)
console.log(newReduce2Arr); // 110
console.log(reduce2Arr);  // [1, 2, 3, 4]

// ===================================end=====================================================

// reduceRight(callback[initialValue])
// 从右向左遍历数组的元素
let reduceRightArr = ['a', 'b', 'd'];
let newReduceRightArr = reduceRightArr.reduceRight((prev, next) => {
    // console.log(prev);
    // console.log(next);
    return prev + "" + next;
})

console.log(newReduceRightArr)