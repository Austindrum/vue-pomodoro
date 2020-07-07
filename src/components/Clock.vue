<template>
    <div class="clock">
        <Weather v-if="clientWidth < 611"/>
        <div class="clock-content" :class="[isWorking ? 'working' : 'breaking']">
            <svg class="clock-inner" :width="width" :height="height">
                <circle
                id="inner"
                :cx="cx" 
                :cy="cy"
                :r="innerR"
                :fill="storkeColor"/>
            </svg>
            <svg class="clock-border" :width="width" :height="height">
                <circle
                id="border" 
                :cx="cx" 
                :cy="cy" 
                :r="borderR"
                fill="none"
                :stroke-width="strokeWidth"
                stroke="#B22222"
                :stroke-dasharray="strokeDasharray"
                :stroke-dashoffset="strokeDashoffset"/>
            </svg>
            <div class="button-play" @click="countDown(isWorking)" v-if="!isActive">
                <fa-icon :icon="['fas', 'play']" class="play"/>
            </div>
            <div class="button-pause" @click="countDown(isWorking)" v-else>
                <fa-icon :icon="['fas', 'pause']" class="stop"/>
            </div>
        </div>        
        <div class="rwd-over-610">
            <Weather v-if="clientWidth > 611"/>
            <div>
                <div class="add-todo">
                    <input @keypress.enter="addNewTodo" type="text" placeholder="新增項目...." v-model="newTodo">
                    <span @click="addNewTodo"><fa-icon :icon="['fas', 'plus']"/></span>
                </div>
                <div class="time" :class="[isWorking ? 'time-working' : 'time-breaking']">
                    {{timer}}
                </div>
                <div class="doing">
                    <div class="title">
                        <svg width="50" height="50">
                            <circle
                            :class="runDoningCircle ? 'run-todo-item' : ''"
                            cx="25"
                            cy="25"
                            r="15" 
                            stroke="#FF1493"
                            stroke-width="5"
                            stroke-dasharray="95"
                            stroke-dashoffset="190"
                            fill="none"/>
                        </svg>
                        <h1>{{ doing.title }}</h1>
                    </div>
                    <div class="tomato">
                        <img v-for="(doneTime, key) in doing.completedTime" :key="key" src="../assets/tomato.svg" alt="" style="width:20px">
                    </div>
                </div>
            </div>
        </div>
        <div class="wating">
            <ul>
                <li v-for="todo in wating" :key="todo.id">
                    <span>
                        <fa-icon :icon="['fas', 'calendar-alt']" class="calendar"/>
                        {{ todo.title }}
                    </span>
                    <fa-icon @click="sortTodo(todo.id)" :icon="['fas', 'arrow-up']" class="arrow"/>
                </li>
            </ul>
            <div class="more" @click="changeNav('todo')">
                <span>More</span>
            </div>
        </div>
    </div>
</template>
<script>
import Weather from './Weather';
import {mapState, mapMutations} from 'vuex';
export default {
    components:{
        Weather,
    },
    name: 'Clock',
    data() {
        return {
            newTodo: "",
            clientWidth: document.body.clientWidth,
            isActive: false,
            runDoningCircle: false,
            timeMachine: null,
        }
    },
    computed:{
        ...mapState([
            "toggleNav",
            "activeTodos",
            "doneTodos",
            "addTodo",
            "time",
            "strokeDashoffset",
            "width300",
            "width500",
            "isWorking"
        ]),
        doing(){
            return this.$store.getters.doing;
        },
        wating(){
            return this.$store.getters.wating;
        },
        width(){
            if(this.clientWidth > 900){
                return "500px";
            }else{
                return "300px";
            }
        },
        height(){
            if(this.clientWidth > 900){
                return "500px";
            }else{
                return "300px";
            }
        },
        cx(){
            if(this.clientWidth > 900){
                return "250px";
            }else{
                return "150px";
            }
        },
        cy(){
            if(this.clientWidth > 900){
                return "250px";
            }else{
                return "150px";
            }
        },
        innerR(){
            if(this.clientWidth > 900){
                return "224px";
            }else{
                return "136px";
            }   
        },
        borderR(){
            if(this.clientWidth > 900){
                return "237px";
            }else{
                return "143px";
            }
        },
        strokeWidth(){
            if(this.clientWidth > 900){
                return 26;
            }else{
                return 14;
            }
        },
        strokeDasharray(){
            if(this.clientWidth > 900){
                return 237*2*3.14;
            }else{
                return 143*2*3.14;
            }
        },
        storkeColor(){
            return this.isWorking ? "#ff4384" : "#00BFFF"
        },
        timer(){
            let time = this.isWorking ? this.time.work : this.time.break;
            let mTemp = Math.floor((time % 3600) / 60);
            let m = mTemp < 10 ? `0${mTemp}` : mTemp;
            let sTemp = Math.floor(time % 3600 % 60);
            let s = sTemp < 10 ? `0${sTemp}` : sTemp;
            return `${m}:${s}`;
        }
    },
    methods: {
        ...mapMutations([
            "toogleAlert",
            "addTodoToActiveTodo",
            "changeNav",
            "setStrokeDashoffset",
            "setWidth300",
            "setWidth500",
            "playSound",
            "pauseSound",
            "reset",
            "checkTodo",
            "setTodayDone",
            "setWeekDone",
            "setChartData",
            "setAlertMessage"
        ]),
        addNewTodo(){
            if(this.newTodo == ""){
                this.setAlertMessage({
                    status: 'error',
                    title: '沒有標題',
                    message: '請註明代辦事項名稱',
                })
                this.toogleAlert();
                // alert("請註明代辦事項名稱");
                // this.flashMessage.show({
                //     status: 'error',
                //     title: '沒有標題',
                //     message: '請註明代辦事項名稱',
                //     blockClass: 'message'
                // });
            }else{
                let localTodos = JSON.parse(localStorage.getItem("pomodoroTodos"));
                let tempNewTodo = {
                    id: (new Date()/1000)*1000,
                    title: this.newTodo,
                    isComplete: false,
                    completedTime: 0,
                    completedDate: [],
                };
                localTodos.push(tempNewTodo);
                localStorage.setItem('pomodoroTodos', JSON.stringify(localTodos));
                this.newTodo = "";
                this.addTodoToActiveTodo(tempNewTodo);
            }
        },
        sortTodo(todoId){
            let localTodos = localStorage.getItem("pomodoroTodos") ? JSON.parse(localStorage.getItem("pomodoroTodos")) : [];
            let activeTemp = [];
            let temp = [];
            localTodos.forEach(todo => {
                if(todo.id == todoId){
                    activeTemp.push(todo);
                    temp.push(todo);
                }
            });
            localTodos.forEach(todo => {
                if(!todo.isComplete){
                    if(todo.id !== todoId){
                        activeTemp.push(todo);
                    }
                }
                if(todo.id !== todoId){
                    temp.push(todo);
                }
            });
            localStorage.setItem("pomodoroTodos", JSON.stringify(temp));
            this.$store.commit("sortTodo", activeTemp);
        },
        doneTodo(doing){
            let todos = JSON.parse(localStorage.getItem('pomodoroTodos'));
            todos.forEach(todo=>{
                if(todo.id == doing.id){
                    todo.completedTime += 1;
                    todo.completedDate.push(Date.now());
                    todo.isComplete = true;
                }
            });
            localStorage.setItem('pomodoroTodos', JSON.stringify(todos));
        },
        countDown(status){
            this.isActive = !this.isActive;
            let that = this;
            let width300minus;
            let width500minus;
            if(this.isWorking){
                width300minus = this.width300/1500;
                width500minus = this.width500/1500;
            }else{
                width300minus = this.width300/300;
                width500minus = this.width500/300;
            }
            if(this.timeMachine != null){
                if(!this.isActive){
                    this.runDoningCircle = false;
                    clearInterval(this.timeMachine);
                    this.timeMachine = null;
                }
            }else{
                this.timeMachine = setInterval(()=>{
                    if(that.isWorking){
                        that.runDoningCircle = true;
                        if(that.time.work > 0){
                            that.time.work -= 1;
                            that.setWidth300(width300minus);
                            that.setWidth500(width500minus);
                            if(that.clientWidth > 900){
                                that.setStrokeDashoffset(that.width500);
                            }else{
                                that.setStrokeDashoffset(that.width300);
                            }
                        }else{
                            clearInterval(that.timeMachine);
                            that.isActive = false;
                            that.runDoningCircle = false;
                            that.timeMachine = null;
                            that.playSound(status);
                            this.$store.state.isWorking = !this.$store.state.isWorking;
                            that.doneTodo(that.doing);
                            that.checkTodo();
                            that.setTodayDone();
                            that.setWeekDone();
                            that.setChartData();
                            this.flashMessage.show({
                                status: 'success',
                                title: '時間到達',
                                message: '您這項工作持續25分鐘，請按我停止音樂並休息一下喔'
                            },
                            {
                                destroyed: this.reset
                            });
                        }
                    }else{
                        if(that.time.break > 0){
                            that.time.break -= 1;
                            that.setWidth300(width300minus);
                            that.setWidth500(width500minus);
                            if(that.clientWidth > 900){
                                that.setStrokeDashoffset(that.width500);
                            }else{
                                that.setStrokeDashoffset(that.width300);
                            }
                        }else{
                            clearInterval(that.timeMachine);
                            that.isActive = false;
                            that.timeMachine = null;
                            that.playSound(status);
                            this.$store.state.isWorking = !this.$store.state.isWorking;
                            this.flashMessage.show({
                                status: 'success',
                                title: '休息結束',
                                message: '您已休息5分鐘，請按我停止音樂並開始工作搂'
                            },
                            {
                                destroyed: this.reset
                            });
                        }
                    }
                }, 1000)
            }
        }
    },
    watch: {
        clientWidth(){
            if(this.clientWidth > 900){
                this.setStrokeDashoffset(237*2*3.14);
            }else{
                this.setStrokeDashoffset(143*2*3.14);
            }
        }
    },
    created() {
        document.getElementsByTagName("BODY")[0].onresize = function() {myFunction()};
        let that = this;
        function myFunction() {
            that.clientWidth = document.body.clientWidth;
        }        
    },
}
</script>
<style lang="scss" scoped>
.message{
    z-index: 9999 !important;
}
.rwd-over-610{
    .add-todo{
        position: relative;
        width: 100%;
        border-radius: 5px;
        input{
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            outline: none;
            border: 2px solid #ff4384;
            border-radius: 5px;
            font-size: 20px;
            padding-left: 20px;
            color: #ff4384;
            font-weight: 600;
            font-family: 'Microsoft JhengHei';
        }
        ::placeholder{
            color: #ff4384;
        }
        span{
            position: absolute;
            right: 5%;
            top: 12px;
            color: black;
            font-size: 20px;
            cursor: pointer;
        }
        .span:hover{
            color: #FF8C00;
        }
    }
    svg{
        transform: rotate(-90deg);
        .run-todo-item{
            animation: run-todo 1s infinite linear;
        }
        @keyframes run-todo {
            0%{
                stroke-dashoffset: 190;
            }
            50%{
                stroke-dashoffset: 95;
            }
            100%{
                stroke-dashoffset: 0;
            }
        }
    }
}
.clock-border{
    transform: rotate(-90deg);
}
.working{
    border: 3px solid #ff4384;
}
.breaking{
    border: 3px solid #00BFFF;
}
.time-working{
    color: #ff4384;
}
.time-breaking{
    color: #00BFFF;
}
.clock-content{
    position: fixed;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    .clock-inner{
        position: absolute;
    }
    .clock-border{
        position: absolute;
    }
    .button-play{
        position: absolute;
        top: 120px;
        left: 120px;
        width: 60px;
        height: 60px;
        background-color: white;
        border-radius: 50%;
        animation: pop-button .6s infinite;
        cursor: pointer;
        .play{
            font-size: 20px;
            transform: translate(23px, 20px);
        }
    }
    .button-pause{
        position: absolute;
        top: 120px;
        left: 120px;
        width: 60px;
        height: 60px;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
        .stop{
            font-size: 20px;
            transform: translate(23px, 20px);
        }
    }
    @keyframes pop-button {
        from{
            transform: scale(1);
        }
        to{
            transform: scale(1.2);
        }
    }
}
@media screen and (max-width: 426px){
    .add-todo{
        display: none;
    }
}
@media screen and (max-width: 610px){
    .add-todo{
        display: none;
        width: 80%;
        margin: 20px auto;
    }
    .time{
        margin: 10px 15px;
        font-size: 100px;
        font-weight: 800;
        text-align: center;
        letter-spacing: 3px;
    }
    .doing{
        margin: 20px auto;
        padding: 5px;
        width: fit-content;
        .title{
            display: flex;
            h1{
                margin: 0;
                margin-left: 10px;
                line-height: 50px;
            }
        }
        .tomato{
            padding: 0px 10px;
            img{
                margin-right: 5px;
            }
        }
    }
    .clock-content{
        position: relative;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        margin: 0px auto;
        .clock-inner{
            position: absolute;
        }
        .clock-border{
            position: absolute;
        }
        .button-play{
            position: absolute;
            top: 120px;
            left: 120px;
            width: 60px;
            height: 60px;
            background-color: white;
            border-radius: 50%;
            animation: pop-button .6s infinite;
            
            .play{
                font-size: 20px;
                transform: translate(22px, 20px);
            }
        }
        .button-pause{
            position: absolute;
            top: 120px;
            left: 120px;
            width: 60px;
            height: 60px;
            background-color: white;
            border-radius: 50%;
            .stop{
                font-size: 20px;
                transform: translate(22px, 20px);
            }
        }
        @keyframes pop-button {
            from{
                transform: scale(1);
            }
            to{
                transform: scale(1.2);
            }
        }
    }
}
@media screen and (min-width: 610px) and (max-width: 900px){
    .clock{
        position: relative;
    }
    .clock-content{
        position: fixed;
        top: 120px;
        right: 60px;
        width: 300px;
        height: 300px;
        .clock-inner{
            position: absolute;
            width: 300px;
            height: 300px;
        }
        .clock-border{
            position: absolute;
            width: 300px;
            height: 300px;
        }
    }
    .rwd-over-610{
        width: 40%;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        margin-top: 30px;
        .time{
            padding-top: 0px;
            margin: 0px 15px;
            font-size: 80px;
            font-weight: 800;
            text-align: center;
            letter-spacing: 3px;
        }
        .doing{
            margin: 10px 15px;
            .title{
                display: flex;
                h1{
                    margin: 0;
                    line-height: 50px;
                }
            }
            .tomato{
                padding: 0px 10px;
                img{
                    margin-right: 5px;
                }
            }
        }
    }
    .wating{
        margin-top: 10px;
    }
}
@media screen and (max-width: 900px){
    .wating{
        // width: 40%;
        ul{
            padding: 0;
            margin: 0 20px;
            li{
                list-style: none;
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #FF1493;
                padding-top: 4px;
                padding-bottom: 4px;
                span{
                    font-weight: 800;
                    .calendar{
                        margin-right: 5px;
                    }
                }
                .arrow{
                    margin-top: 4px;
                    cursor: pointer;
                }
                .arrow:hover{
                    color: #FF8C00;
                }
            }
        }
    }
    .more{
        position: relative;
        margin: 5px 18px;
        height: 20px;
        span{
            cursor: pointer;
            position: absolute;
            right: 0;
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 700;
            color: #ff4384;
            transition: transform .5s;
        }
        span:hover{
            color:#FF8C00;
        }
    }
}
@media screen and (min-width: 901px){
    .clock-content{
        right: 10%;
        .clock-inner{
            position: absolute;
        }
        .clock-border{
            position: absolute;
        }
        .button-play{
            position: absolute;
            top: 40%;
            left: 40%;
            width: 100px;
            height: 100px;
            background-color: white;
            border-radius: 50%;
            animation: pop-button .6s infinite;
            .play{
                font-size: 50px;
                transform: translate(30px, 25px);
            }
        }
        .button-pause{
            position: absolute;
            top: 40%;
            left: 40%;
            width: 100px;
            height: 100px;
            background-color: white;
            border-radius: 50%;
            .stop{
                font-size: 50px;
                transform: translate(28px, 25px);
            }
        }
        @keyframes pop-button {
            from{
                transform: scale(1);
            }
            to{
                transform: scale(1.2);
            }
        }
    }
}
@media screen and (min-width: 901px) and (max-width: 1024px){
    .add-todo{
        position: relative;
        width: 100%;
        border-radius: 5px;
        input{
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            outline: none;
            border: 2px solid #ff4384;
            border-radius: 5px;
            font-size: 20px;
            padding-left: 20px;
            color: #ff4384;
            font-weight: 600;
            font-family: 'Microsoft JhengHei';
        }
        ::placeholder{
            color: #ff4384;
        }
        span{
            position: absolute;
            right: 5%;
            top: 12px;
            color: black;
            font-size: 20px;
            cursor: pointer;
        }
        span:hover{
            color: #FF8C00;
        }
    }
    .clock{
        margin-top: 120px;
        margin-left: 10px;
        .rwd-over-610{
            width: 320px;
            .time{
                margin: 10px 15px;
                font-size: 100px;
                font-weight: 900;
                letter-spacing: 10px;
            }
            .doing{
                margin: 20px 15px;
                .title{
                    display: flex;
                    h1{
                        font-size: 40px;
                        margin: 0;
                        line-height: 48px;
                    }
                }
                .tomato{
                    padding: 0px 10px;
                    img{
                        margin-right: 5px;
                    }
                }
            }
        }
        .wating{
            width: 340px;
            ul{
                padding: 0;
                margin: 0 25px;
                    li{
                        list-style: none;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 2px solid #FF1493;
                        padding-top: 10px;
                        padding-bottom: 8px;
                        span{
                            font-weight: 800;
                            font-size: 22px;
                            .calendar{
                                margin-right: 5px;
                            }
                        }
                        .arrow{
                            margin-top: 10px;
                            cursor: pointer;
                        }
                        .arrow:hover{
                            color: #FF8C00;
                        }
                    }
            }
            .more{
                position: relative;
                margin: 15px 23px;
                height: 20px;
                span{
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    text-transform: uppercase;
                    font-size: 23px;
                    font-weight: 700;
                    color: #ff4384;
                    transition: transform .5s;
                }
                span:hover{
                    color:#FF8C00;
                }
            }
        }
    }
}
@media screen and (min-width: 1025px){
        .add-todo{
            span:hover{
                color: #FF8C00;
            }
        }
        .clock{
            margin-top: 80px;
            margin-left: 100px;
            .clock-content{
                right: 15%;
                top: 180px
            }
            .rwd-over-610{
                width: 480px;
                .time{
                    margin: 10px 15px;
                    font-size: 160px;
                    font-weight: 900;
                    letter-spacing: 10px;
                }
                .doing{
                    margin: 20px 15px;
                    .title{
                        display: flex;
                        h1{
                            font-size: 40px;
                            margin: 0;
                            line-height: 48px;
                        }
                    }
                    .tomato{
                        padding: 0px 10px;
                    }
                }
            }
            .wating{
                width: 500px;
                ul{
                    padding: 0;
                    margin: 0 25px;
                        li{
                            list-style: none;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 2px solid #FF1493;
                            padding-top: 10px;
                            padding-bottom: 8px;
                            span{
                                font-weight: 800;
                                font-size: 22px;
                                .calendar{
                                    margin-right: 5px;
                                }
                            }
                            .arrow{
                                margin-top: 10px;
                                cursor: pointer;
                            }
                            .arrow:hover{
                                color: #FF8C00;
                            }
                        }
                }
                .more{
                    position: relative;
                    margin: 15px 23px;
                    height: 20px;
                    span{
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        text-transform: uppercase;
                        font-size: 23px;
                        font-weight: 700;
                        color: #ff4384;
                        transition: transform .5s;
                    }
                    span:hover{
                        color:#FF8C00;
                    }
                }
            }
        }
}
</style>
