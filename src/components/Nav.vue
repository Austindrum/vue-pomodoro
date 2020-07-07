<template>
    <div class="nav" :class="{ toggle: toggleNav }">
        <div class="close" :class="{ toggle: toggleNav }" @click="changeNav('close')">
            <fa-icon :icon="['fas', 'times']"/>
        </div>
        <ul :class="{ toggle: toggleNav }">
            <li class="banner">POMODORO</li>
            <li class="list" @click="changeNav('todo')" :style="navType == 'todo' ? 'color: orange' : ''">
                <fa-icon :icon="['fas', 'list']" size="lg"/>
            </li>
            <li class="list" @click="changeNav('chart')" :style="navType == 'chart' ? 'color: orange' : ''">
                <fa-icon :icon="['fas', 'chart-bar']" size="lg"/>
            </li>
            <li class="list" @click="changeNav('music')" :style="navType == 'music' ? 'color: orange' : ''">
                <fa-icon :icon="['fas', 'music']" size="lg"/>
            </li>
            <li class="list" @click="resetAll">
                <fa-icon :icon="['fas', 'history']" size="lg"/>
            </li>
        </ul>
        <Chart class="nav-content" :class="navType == 'chart' ? 'show' : ''"/>
        <Todos class="nav-content" :class="navType == 'todo' ? 'show' : ''"/>
        <Music class="nav-content" :class="navType == 'music' ? 'show' : ''"/>
    </div>
</template>

<script>
import Chart from './nav/Chart';
import Todos from './nav/Todos';
import Music from './nav/Music';
import {mapState, mapMutations} from 'vuex'
export default {
    name: "Nav",
    data() {
        return {
        }
    },
    components:{
        Chart,
        Todos,
        Music
    },
    computed: {
        ...mapState([
            "toggleNav",
            "navType"
        ])
    },
    methods: {
        ...mapMutations([
            "changeNav",
            "resetAll"
        ])
    },
}
</script>

<style lang="scss">
$pink: #ff4384;
$backGroundColor: #003164;
.nav{
    background-color: $backGroundColor;
    z-index: 1;
    ul{
        margin: 0;
        padding: 0;
        li{
            list-style: none;
            color: white;
        }
        .list{
            cursor: pointer;
        }
        .list:hover{
            color: orange;
        }
        .banner{
            position: absolute;
            color: $pink;
            font-weight: 800;
            transform: rotate(-90deg);
        }
    }
    .nav-content.show{
        opacity: 1;
        transform: translateY(10px);
    }
}
@media screen and (min-width: 901px){
    .nav{
        position: fixed;
        right: 0;
        width: 900px;
        height: 100%;
        transform: translateX(820px);
        transition: transform 1s;
        .close{
            position: fixed;
            right: 30px;
            top: 20px;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        ul{
            position: absolute;
            left:20px;
            top: 100px;
            margin-top: 100px;
            .banner{
                top: -110px;
                left: -80px;
                font-size: 30px;
                margin-top: 0;
            }
            li{
                font-size: 22px;
                margin-top: 60px;
            }
        }
        .nav-content{
            position: absolute;
            width: 60%;
            left: 180px;
            top: 80px;
            padding: 7px;
            transform: translateY(-450px);
            opacity: 0;
            transition: transform 1s, opacity 1s;
        }
    }
    .nav.toggle{
        transform: translateX(0px);
    }
}
@media screen and (max-width: 900px) {
    .close{
        position: absolute;
        top: 15px;
        right: -15px;
        font-size: 20px;
        opacity: 0;
        color: orange;
        transition: opacity 1.5s, right 1.5s;
        cursor: pointer;
    }
    .close.toggle{
        opacity: 1;
        position: absolute;
        font-size: 20px;
        color: white;
        top: 15px;
        right: 35px;
    }
    .nav.toggle{
        height: 500px;
    }
    .nav{
        position: relative;
        width: 100vw;
        height: 60px;
        box-sizing: border-box;
        padding: 8px;
        transition: height 1s;
        ul{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            transition: transform 1s;
            margin-top: 10px;
            .banner{
                position: initial;
                transform: rotate(0deg);
                font-size: 18px;
            }
        } 
        ul.toggle{
            transform: translateY(450px);
        }
        .nav-content{
            width: 90%;
            position: absolute;
            padding: 7px;
            transform: translateY(-450px);
            opacity: 0;
            transition: transform 1s, opacity 1s;
        }
    }   
}
</style>