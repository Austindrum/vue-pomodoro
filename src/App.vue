<template>
  <div id="app">
    <Alert v-if="alert"/>
    <Nav />
    <Clock />
  </div>
</template>

<script>
import Nav from './components/Nav';
import Clock from './components/Clock';
import Alert from './components/Alert';
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'App',
  components: {
    Nav,
    Clock,
    Alert
  },
  computed: {
    ...mapState([
      "alert"
    ])
  },
  created() {
    let dataTodos = JSON.parse(localStorage.getItem("pomodoroTodos"));
    let sunday = 0;
    let monday = 0;
    let today = new Date(Date.now());
    let day = today.getDay();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    switch (day) {
      case 1:
          monday = new Date(year, month, date).getTime();
          sunday = new Date(year, month, date+6).getTime();
          break;
      case 2:
          monday = new Date(year, month, date-1).getTime();
          sunday = new Date(year, month, date+5).getTime();
          break;
      case 3:
          monday = new Date(year, month, date-2).getTime();
          sunday = new Date(year, month, date+4).getTime();
          break;
      case 4:
          monday = new Date(year, month, date-3).getTime();
          sunday = new Date(year, month, date+3).getTime();
          break;
      case 5:
          monday = new Date(year, month, date-4).getTime();
          sunday = new Date(year, month, date+2).getTime();
          break;
      case 6:
          monday = new Date(year, month, date-5).getTime();
          sunday = new Date(year, month, date+1).getTime();
          break;
      default:
          monday = new Date(year, month, date-6).getTime();
          sunday = new Date(year, month, date).getTime();
          break;
    }
    let setTodos = [];
    dataTodos.forEach(todo => {
      let tempCompletedDate = [];
      let tempCompletedTime = 0;
      todo.completedDate.forEach(date=>{
        if(date > monday){
          tempCompletedDate.push(date);
          tempCompletedTime += 1;
        }
      })
      todo.completedDate = tempCompletedDate;
      todo.completedTime = tempCompletedTime;
      setTodos.push(todo);
    });
    localStorage.setItem("pomodoroTodos", JSON.stringify(setTodos));
  }
}
</script>
<style lang="scss">
body{
  margin: 0;
  padding: 0;
  font-family: 'Microsoft JhengHei';
  background-color: #ffedf7;
  #app{
    overflow: hidden;
  }
}
</style>
