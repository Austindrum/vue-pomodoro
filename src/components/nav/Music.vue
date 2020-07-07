<template>
    <div class="music">
        <div class="work">
            <div class="label">
                <h2>工作鈴聲</h2>
            </div>
            <ul class="content">
                <li>   
                    <input type="radio" id="work-sound-none" name="work" checked>
                    <label for="work-sound-none" @click="soundClick">None</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_bear.mp3" class="bear" loop></audio>
                    <input type="radio" id="work-sound-bear" name="work">
                    <label for="work-sound-bear" @click="soundClick" data-status="work">Bear</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_elephant.mp3" class="elephant" loop></audio>
                    <input type="radio" id="work-sound-elephant" name="work">
                    <label for="work-sound-elephant" @click="soundClick" data-status="work">elephant</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_lion.mp3" class="lion" loop></audio>
                    <input type="radio" id="work-sound-lion" name="work">
                    <label for="work-sound-lion" @click="soundClick" data-status="work">lion</label>
                </li>
            </ul>
        </div>
        <div class="done">
            <div class="label">
                <h2>休息鈴聲</h2>
            </div>
            <ul class="content">
                <li>   
                    <input type="radio" id="done-sound-none" name="done" checked>
                    <label for="done-sound-none" @click="soundClick" data-status="done">None</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_pig.mp3" class="pig" loop></audio>
                    <input type="radio" id="done-sound-pig" name="done">
                    <label for="done-sound-pig" @click="soundClick" data-status="done">Pig</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_sheep.mp3" class="sheep" loop></audio>
                    <input type="radio" id="done-sound-sheep" name="done">
                    <label for="done-sound-sheep" @click="soundClick" data-status="done">Sheep</label>
                </li>
                <li>
                    <audio src="../../assets/sound/sound_wolf.mp3" class="wolf" loop></audio>
                    <input type="radio" id="done-sound-wolf" name="done">
                    <label for="done-sound-wolf" @click="soundClick" data-status="done">Wolf</label>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'Music',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations([
            "soundSelect",
        ]),
        soundClick(e){
            let targetSound = e.target.previousSibling.previousSibling;
            let status = {
                type: e.target.textContent,
                status: e.target.dataset.status,
                targetSound: targetSound
            };
            if(targetSound !== null){
                targetSound.play();
                this.soundSelect(status);
                setTimeout(function(){
                    targetSound.pause();
                    targetSound.currentTime = 0
                }, 3000)
            }else{
                status.type = "";
                status.targetSound = "";
                this.soundSelect(status);
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 901px) {
    .music{
        .work .label, .done .label{
            box-sizing: border-box;
            height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            margin-bottom: 20px;
            background-color: rgba(255,255,255,.2);
            border-radius: 5px;
            color: white;
            h2{
                margin: 0;
                font-size: 22px;
            }
        }
        .work, .done{
            ul.content{
                position: initial;
                display: flex;
                flex-wrap: wrap;
                margin-top: 10px;
                margin-bottom: 40px;
                li{
                    margin-top: 10px;
                    margin-bottom: 10px;
                    width: 180px;
                    text-transform: uppercase;
                    font-weight: 700;
                    input[type="radio"]{
                        display: none;
                    }
                    input[type="radio"] + label{
                        user-select: none;
                    }
                    input[type="radio"] + label::before{
                        content: '\2714';
                        border: .15em solid #ff4384;
                        border-radius: .2em;
                        display: inline-block;
                        width: 1.2em;
                        padding: .1em;
                        padding-left: .3em;
                        margin-right: .5em;
                        color: transparent;
                        transition: .5s;
                    }
                    input[type="radio"] + label:active::before{
                        transform: scale(0);
                    }
                    input[type="radio"]:checked + label::before{
                        background-color: #ff4384;
                        color: #003164;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .work .label, .done .label{
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
            font-size: 15px;
        }
    }
    .work, .done{
        ul.content{
            display: flex;
            flex-wrap: wrap;
                li{
                    margin-top: 10px;
                    margin-bottom: 10px;
                    margin-right: .1em;
                    width: 120px;
                    font-size: 14px;
                    text-transform: uppercase;
                    font-weight: 700;
                    input[type="radio"]{
                        display: none;
                    }
                    input[type="radio"] + label{
                        user-select: none;
                    }
                    input[type="radio"] + label::before{
                        content: '\2714';
                        border: .15em solid #ff4384;
                        border-radius: .2em;
                        display: inline-block;
                        width: 1.2em;
                        padding: .1em;
                        padding-left: .3em;
                        margin-right: 1em;
                        color: transparent;
                        transition: .5s;
                    }
                    input[type="radio"] + label:active::before{
                        transform: scale(0);
                    }
                    input[type="radio"]:checked + label::before{
                        background-color: #ff4384;
                        color: #003164;
                    }
                }
        }
    }
}
</style>