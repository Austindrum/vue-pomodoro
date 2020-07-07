import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: false,
    alertMessage: {
      status: "",
      title: "",
      message: ""
    },
    toggleNav: false,
    navType: "",
    activeTodos: [],
    doneTodos: [],
    time:{
      work: 25*60,
      break: 5*60
    },
    isWorking: true,
    workSound: '',
    breakSound: '',
    strokeDashoffset: document.body.clientWidth > 900 ? 237*2*3.14 : 143*2*3.14,
    width300: 143*2*3.14,
    width500: 237*2*3.14,
    todayDone: 0,
    weekDone: 0,
    monday: 0,
    sunday: 0,
    chartData: [
      ['Sun', 0], 
      ['Mon', 0], 
      ['Tue', 0], 
      ['Wed', 0],
      ['Thr', 0],  
      ['Fri', 0],
      ['Sat', 0]
    ],
    weather: null,
  },
  getters: {
    doing(state){
      return state.activeTodos.length > 0 ? state.activeTodos[0] : [];
    },
    wating(state){
      return state.activeTodos.filter((todo,key) => {
        if(key !== 0){
          return todo;
        }
      });
    },
    getActiveTodo(state){
      state.activeTodos = JSON.parse(localStorage.getItem("pomodoroTodos")).filter(todo=>{ return !todo.isComplete });
      return state.activeTodos;
    },
    getDoneTodo(state){
      state.doneTodos = JSON.parse(localStorage.getItem("pomodoroTodos")).filter(todo=>{ return todo.isComplete });
      return state.doneTodos;
    },
    getTodayDone(state){
      state.todayDone = 0;
      let todos = JSON.parse(localStorage.getItem("pomodoroTodos"));
      let today = new Date(Date.now());
      let date = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      let tempToday = new Date(year, month, date).getTime();
      let tempTomorrow = new Date(year, month, date+1).getTime();
      todos.forEach(todo=>{
        todo.completedDate.forEach(date=>{
          if(date > tempToday && date < tempTomorrow){
              state.todayDone += 1;
          }
        })
      });
      return state.todayDone;
    },
    getWeekDone(state){
      state.weekDone = 0;
      let todos = JSON.parse(localStorage.getItem("pomodoroTodos"));
      todos.forEach(todo=>{
        todo.completedDate.forEach(date=>{
          if(date > state.monday && date < state.sunday){
            state.weekDone += 1;
          }
        })
      });
      return state.weekDone;
    },
    getChartData(state){
      let todos = JSON.parse(localStorage.getItem("pomodoroTodos"));
      todos.forEach(todo => {
          todo.completedDate.forEach(date=>{
              let doneDay = new Date(date).getDay();
              switch (doneDay) {
                  case 1:
                    state.chartData[1][1] += 1;
                      break;          
                  case 2:
                    state.chartData[2][1] += 1;
                      break;
                  case 3:
                    state.chartData[3][1] += 1;
                      break;
                  case 4:
                    state.chartData[4][1] += 1;
                      break;
                  case 5:
                    state.chartData[5][1] += 1;
                      break;
                  case 6:
                    state.chartData[6][1] += 1;
                      break;
                  default:
                    state.chartData[7][1] += 1;
                      break;
              }
          })
      });
      return state.chartData;
    },
  },
  mutations: {
    toogleAlert(state){
      state.alert = !state.alert;
      if(state.alert == false){
        state.alertMessage.status = "";
        state.alertMessage.title = "";
        state.alertMessage.message = "";  
      }
    },
    setAlertMessage(state, payload){
      state.alertMessage.status = payload.status;
      state.alertMessage.title = payload.title;
      state.alertMessage.message = payload.message;
    },
    setTodayDone(state){
      state.todayDone += 1;
    },
    setWeekDone(state){
      state.weekDone += 1;
    },
    setMondayAndSunday(state, payload){
      state.monday = payload.monday;
      state.sunday = payload.sunday;
    },
    setChartData(state){
      let today = new Date(Date.now());
      switch (today.getDay()) {
        case 1:
          state.chartData[1][1] += 1;
            break;          
        case 2:
          state.chartData[2][1] += 1;
            break;
        case 3:
          state.chartData[3][1] += 1;
            break;
        case 4:
          state.chartData[4][1] += 1;
            break;
        case 5:
          state.chartData[5][1] += 1;
            break;
        case 6:
          state.chartData[6][1] += 1;
            break;
        default:
          state.chartData[7][1] += 1;
            break;
      }
    },
    changeNav(state, target){
      if(target === "close"){
        state.toggleNav = false;
        state.navType = "";
      }else{
        state.navType = target;
        state.toggleNav = true;
      }
    },
    addTodoToActiveTodo(state, todo){
      state.activeTodos.push(todo);
    },
    deleteTodo(state, payload){
      if(!payload.isComplete){
        state.activeTodos = payload.todo;
      }else{
        state.doneTodos = payload.todo;
      }
    },
    checkTodo(state){
      state.activeTodos = JSON.parse(localStorage.getItem("pomodoroTodos")).filter(todo=>{ return !todo.isComplete });
      state.doneTodos = JSON.parse(localStorage.getItem("pomodoroTodos")).filter(todo=>{ return todo.isComplete });
    },
    sortTodo(state, payload){
      state.activeTodos = payload;
    },
    resetAll(state){
      state.isWorking = true;
      state.time.work = 25*60;
      state.time.break = 25*60;
      state.strokeDashoffset = document.body.clientWidth > 900 ? 237*2*3.14 : 143*2*3.14;
      state.width300 = 143*2*3.14;
      state.width500 = 237*2*3.14;
    },
    reset(state){
      state.time.work = 25*60;
      state.time.break = 5*60;
      state.strokeDashoffset = document.body.clientWidth > 900 ? 237*2*3.14 : 143*2*3.14;
      state.width300 = 143*2*3.14;
      state.width500 = 237*2*3.14;
      this.commit("pauseSound");
    },
    setStrokeDashoffset(state, payload){
      state.strokeDashoffset = payload;
    },
    setWidth300(state, payload){
      state.width300 = state.width300 - payload;
    },
    setWidth500(state, payload){
      state.width500 = state.width500 - payload;
    },
    soundSelect(state, payload){
      if(payload.status === "done"){
        state.breakSound = payload.targetSound;
      }else{
        state.workSound = payload.targetSound;
      }
    },
    playSound(state, payload){
      if(state.workSound !== "" || state.breakSound !== ""){
        if(payload){
          state.workSound.play();
        }else{
          state.breakSound.play();
        }
      }else{
        return;
      }
    },
    pauseSound(state){
      if(state.workSound !== "" || state.breakSound !== ""){
        state.workSound.pause();
        state.workSound.currentTime = 0;
        state.breakSound.pause();
        state.breakSound.currentTime = 0;
      }else{
        return;
      }
    },
  },
  actions: {
    
  },
  modules: {
  }
})
