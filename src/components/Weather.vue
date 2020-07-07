<template>
    <div class="weather">
        <h1>
            <span class="title">今日氣象 - </span>
            <span class="location">{{ locationName }}{{ location }}</span>
        </h1>
        <div class="picture">
            <fa-icon v-if="weather.id == 1" :icon="['fas', 'sun']" class="weather" size="3x"/>
            <fa-icon v-else-if="weather.id == 2" :icon="['fas', 'cloud-sun']" class="weather" size="3x"/>
            <fa-icon v-else-if="weather.id == 3" :icon="['fas', 'cloud-sun']" class="weather" size="3x"/>
            <fa-icon v-else :icon="['fas', 'cloud']" class="weather" size="3x"/>
        </div>
        <div class="content">
            <h4>平均溫度 - <span>{{ temperature.value }}&deg;C</span></h4>
            <h4>降雨機率 - <span>{{ rain.value }}%</span></h4>
            <h4>氣象 - <span>{{ weather.discription}}</span></h4>
        </div>
    </div>
</template>


<script>
export default {
    name: "Weather",
    data() {
        return {
            locationName: "",
            location: "",
            rain: {},
            temperature: {},
            weather: {},
            now: Date.now(),
        }
    },
    computed: {

    },
    methods: {
        countDateTime(status ,start, end){
            if(new Date(start).getTime() < this.now && new Date(end).getTime() > this.now){
                return true;
            }else{
                return false;
            }
        },
        getTemperature(temperature){
            let result = {};
            temperature.time.forEach(t=>{
                if(this.countDateTime(t, t.startTime, t.endTime)){
                    result = t.elementValue[0];
                }
            })
            return result;
        },
        getRain(rain){
            let result = {};
            rain.time.forEach(r=>{
                if(this.countDateTime(r, r.startTime, r.endTime)){
                    result = r.elementValue[0];
                }
            })
            return result;
        },
        getWeather(weather){
            let result = {
                discription: "",
                id: 0
            };
            weather.time.forEach(w=>{
                if(this.countDateTime(w, w.startTime, w.endTime)){
                    result.discription = w.elementValue[0].value;
                    result.id = parseInt(w.elementValue[1].value);
                }
            })
            return result;
        }
    },
    mounted() {
        this.axios.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-015?Authorization=CWB-418C5921-689A-4793-A78B-7D3027C772CD")
        .then(res=>{
            console.log(res.data.records.locations[0].location[14]);
            let head = res.data.records.locations[0];
            this.locationName = head.locationsName;
            this.location = head.location[14].locationName;
            this.rain = this.getRain(head.location[14].weatherElement[0]);
            this.temperature = this.getTemperature(head.location[14].weatherElement[1]);
            this.weather = this.getWeather(head.location[14].weatherElement[6]);
        })
    },
}
</script>

<style lang="scss" scoped>
.weather{
    color:#ff4384;
}
.content{
    h4{
        margin: 0;
        color: black;
        span{
            color: #ff4384;
        }
    }
}
@media screen and (max-width: 901px){
    .weather{
        position: relative;
        margin-bottom: 25px;
        h1{
            margin: 0;
            .title{
                font-size: 25px;
            }
            .location{
                font-size: 20px;
                color: #A9A9A9;
            }
        }
        .picture{
            width: 60px;
            position: absolute;
            right: 10px;
            top:50px;
            color: #FF8C00;
        }
    }
}
@media screen and (max-width: 610px){
    .weather{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 30px;
        position: relative;
        padding: 0 10px;
        h1{
            margin: 0;
            .title{
                font-size: 25px;
            }
            .location{
                font-size: 20px;
                color: #A9A9A9;
            }
        }
        .picture{
            width: 60px;
            position: absolute;
            right: 10px;
            top:50px;
            color: #FF8C00;
        }
    }
}
@media screen and (min-width: 902px){
        .weather{
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        h1{
            margin: 0;
            .title{
                font-size: 40px;
            }
            .location{
                font-size: 25px;
                color: #A9A9A9;
            }
        }
        .picture{
            width: 60px;
            position: absolute;
            right: 10px;
            top:70px;
            color: #FF8C00;
        }
        .content{
            padding: 10px;
            h4{
                font-size: 20px;
                margin-bottom: 5px;
            }
        }
    }
}

</style>