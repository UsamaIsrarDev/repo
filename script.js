function dragStartHandler(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

const nums = [2, 4, 35, 6, 57, 1, 6, 8, 8, 45, 3, 4, 2, 3, 23, 3, 5, 45];

const target = 8;

function twoSum(nums, target) {
  const result = [];
  for (let index = 0; index < nums.length; index++) {
    const key = index;
    const element = nums[index] + nums[index + 1];
    console.log(element);
    if (element === target) {
      result[0] = key;
      result[1] = key + 1;
      return result;
    }
  }
}

const output = twoSum(nums, target);

console.log(output);
