<template>
    <div class="alert">
        <div class="outer">
            <div class="background"></div>
            <div class="message-block">
                <div class="message" @click="toogleAlert" :class="alertStatus">
                    <h2>{{ alertMessage.title }}</h2>
                    <p>{{ alertMessage.message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
    computed: {
        ...mapState([
            "alert",
            "alertMessage"
        ]),
        alertStatus(){
            switch (this.alertMessage.status) {
                case "error":
                    return "error"
                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        ...mapMutations([
            "toogleAlert",
        ])
    },
}
</script>

<style lang="scss" scoped>
h2{
    margin: 0;
}
.alert{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    .outer{
        position: relative;
        width: 100vw;
        height: 100vh;
        .background{
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: #A9A9A9;
            opacity: .5;
        }
        .message-block{
            position: absolute;
            width: 100vw;
            top: 60px;
            .message{
                box-sizing: border-box;
                width: 40%;
                height: 120px;
                background-color: #FF8C00;
                border-radius: 10px;
                margin-left: 55%;
                padding: 15px;
                opacity: .7;
                cursor: pointer;
                animation: message-animation 1s;
                transition: opacity .5s;
            }   
            .message:hover{
                opacity: 1;
            }
            .message.error{
                background-color: red;
                color: white;
            }
            @keyframes message-animation {
                from{
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to{
                    opacity: .7;
                    transform: translateY(0px);
                }
            }
            @media screen and(max-width: 768px) {
                .message{
                    width: 50%;
                    margin-left: 45%;
                }   
            }
            @media screen and(max-width: 426px) {
                .message{
                    width: 80%;
                    height: 100px;
                    margin-left: 10%;
                }   
            }
        }
    }
}
</style>