<script>
//es6
export default {
  el:"#app",
  //data:function(){}，下面是es6写法
  data:function () {
    return {
      name:"guowenfh",
      age:"2q1"
    }
  }
}
</script>
<template>
<div>
<h1>姓名：{{name}}</h1>
<h2>{{age}}</h2>
  <p>haha</p>
</div>
</template>
