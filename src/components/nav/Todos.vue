<template>
    <div class="todos">
        <div class="add-todo">
            <input @keypress.enter="addNewTodo" type="text" placeholder="新增項目...." v-model="newTodo">
            <span @click="addNewTodo"><fa-icon :icon="['fas', 'plus']"/></span>
        </div>
        <div class="doing">
            <div class="todo-label">
                <h2>待辦列表</h2>
                <span 
                class="banner" 
                @click="showDoing = !showDoing" 
                :class="{ show: showDoing }">
                    <fa-icon :icon="['fas', 'sort-up']" />
                </span>
            </div>
            <div class="todo-body" :class="{ show: showDoing }">
                <ul>
                    <li v-for="active in getActiveTodo" :key="active.id">
                        <div>
                            <span @click="checkTodo(active.id, active.isComplete)">
                                <fa-icon :icon="['far', 'check-square']" />
                            </span>
                            <span>{{ active.title }}</span>
                        </div>
                        <div @click="deleteTodo(active.id, active.isComplete)">
                            <fa-icon :icon="['far', 'trash-alt']" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="done">
            <div class="todo-label">
                <h2>完成列表</h2>
                <span class="banner" @click="showDone = !showDone" :class="{ show: showDone }">
                    <fa-icon :icon="['fas', 'sort-up']" />
                </span>
            </div>
            <div class="todo-body" :class="{ show: showDone }">
                <ul>
                    <li v-for="done in getDoneTodo" :key="done.id">
                        <div>
                            <span @click="checkTodo(done.id, done.isComplete)"><fa-icon :icon="['far', 'check-square']" /></span>
                            <span>{{ done.title }}</span>
                        </div>
                        <div @click="deleteTodo(done.id, done.isComplete)"><fa-icon :icon="['far', 'trash-alt']" /></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'Todos',
    data() {
        return {
            showDoing: true,
            showDone: true,
            newTodo: "",
            localTodos: JSON.parse(localStorage.getItem("pomodoroTodos")),
        }
    },
    computed: {
        ...mapState([
            "toggleNav",
        ]),
        getActiveTodo(){
            return this.$store.getters.getActiveTodo;
        },
        getDoneTodo(){
            return this.$store.getters.getDoneTodo;
        },
    },
    methods: {
        ...mapMutations([
            "addTodoToActiveTodo",
            "setAlertMessage",
            "toogleAlert"
        ]),
        addNewTodo(){
            if(this.newTodo == ""){
                this.setAlertMessage({
                    status: 'error',
                    title: '沒有標題',
                    message: '請註明代辦事項名稱',
                })
                this.toogleAlert();
                // this.flashMessage.show({
                //     status: 'error',
                //     title: '沒有標題',
                //     message: '請註明代辦事項名稱'
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
        deleteTodo(todoId, isComplete){
            let localTodos = JSON.parse(localStorage.getItem("pomodoroTodos"));
            localTodos.forEach((todo,key) => {
                if(todo.id == todoId){
                    localTodos.splice(key, 1);
                }
            });
            localStorage.setItem('pomodoroTodos', JSON.stringify(localTodos));
            this.$store.commit("deleteTodo", {
                'todo': localTodos,
                'isComplete': isComplete
            });
        },
        checkTodo(todoId, isComplete){
            let localTodos = JSON.parse(localStorage.getItem("pomodoroTodos"));
            localTodos.forEach(todo=>{
                if(todo.id == todoId){
                    todo.isComplete = !isComplete;
                }
            });
            localStorage.setItem("pomodoroTodos", JSON.stringify(localTodos));
            this.$store.commit("checkTodo");
        }
    },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 901px){
    .todos{
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
        }
        .doing, .done{
            margin-top: 40px;
            .todo-label{
                box-sizing: border-box;
                height: 50px;
                display: flex;
                justify-content: space-between;
                padding: 10px 20px;
                background-color: rgba(255,255,255,.2);
                border-radius: 5px;
                color: white;    
                h2{
                    margin: 0;
                    font-size: 22px;
                }
                span{
                    font-size: 30px;
                    cursor: pointer;
                    transform: rotate(0deg);
                    transition: transform .7s;
                }
                span.show{
                    transform: rotate(540deg);
                }
            }
            .todo-body{
                height: 0px;
                overflow: auto;
                transition: height 1s;
                ul{
                    position: initial;
                    margin: 0;
                    padding: 15px;
                    width: 100%;
                    flex-direction: column;
                    box-sizing: border-box;
                    li{
                        margin-top: 0px;
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                        span{
                            margin-right: 10px;
                        }
                    }
                }        
            }
            .todo-body.show{
                height: 120px;
            }
        }
    }
}
@media screen and (max-width: 900px){
    .todos{
        .add-todo{
            position: relative;
            width: 100%;
            border-radius: 5px;
            input{
                box-sizing: border-box;
                width: 100%;
                height: 40px;
                outline: none;
                border: 2px solid #ff4384;
                border-radius: 5px;
                font-size: 15px;
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
                top: 10px;
                color: black;
                cursor: pointer;
            }
        }
        .doing, .done{
            margin-top: 18px;
            .todo-label{
                    box-sizing: border-box;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 20px;
                    background-color: rgba(255,255,255,.2);
                    border-radius: 5px;
                    color: white;
                    h2{
                        margin: 0;
                        font-size: 16px;
                    }
                    span{
                        font-size: 25px;
                        cursor: pointer;
                        transform: rotate(0deg);
                        transition: transform .7s;
                    }
                    span.show{
                        transform: rotate(540deg);
                    }
            }
            .todo-body{
                height: 0px;
                overflow: auto;
                transition: height 1s;
                ul{
                    margin: 0;
                    padding: 15px;
                    width: 100%;
                    flex-direction: column;
                    box-sizing: border-box;
                    li{
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                        span{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .todo-body.show{
                height: 120px;
            }
        }           
    }
    .todos.toggle{
        opacity: 1;
        // transform: translateX(8px);
        // transform: translateY(15px);
    }
}
</style>