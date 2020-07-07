<template>
    <div class="chart">
        <div class="day-week">
            <div class="label">
                <h2>近期完成統計</h2>
            </div>
            <div class="content">
                <div class="day">
                    <h4>今日完成</h4>
                    <p>
                        <span class="day-num">{{ getTodayDone }}</span>
                        <span class="num-label">/顆番茄</span>
                    </p>
                </div>
                <div class="week">
                    <h4>本周完成</h4>
                    <p>
                        <span class="week-num">{{ getWeekDone }}</span>
                        <span class="num-label">/顆番茄</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="inner_chart">
            <div class="label">
                <h2>完成統計表</h2>
            </div>
            <div class="contant">
                <column-chart
                height="180px"
                :data="getChartData"
                :colors="['#ff4384']"></column-chart>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'Chart',
    data() {
        return {
        }
    },
    computed: {
        getTodayDone(){
            return this.$store.getters.getTodayDone;
        },
        getWeekDone(){
            return this.$store.getters.getWeekDone;
        },
        getChartData(){
            return this.$store.getters.getChartData;
        },
    },
    methods: {
        ...mapMutations([
            "setMondayAndSunday",
        ]),
    },
    mounted() {
        let monday = 0;
        let sunday = 0;
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
        this.setMondayAndSunday({monday, sunday});
    },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 901px){
    .chart{
        .day-week .label, .inner_chart .label{
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
        .day-week{
        position: relative;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 50px;
        .content{
            display: flex;
            .day, .week{
                width: 50%;
                padding-left: 10px;
                p{
                    margin: 0;
                    span.day-num, span.week-num{
                        color: #ff4384;
                        font-weight: 700;
                        font-size: 59px;
                    }
                    span.num-label{
                        color: rgba(255,255,255,.2);
                        font-weight: 700;
                    }
                }
                h4{
                    color: white;
                    margin: 15px 0;
                    font-size: 20px;
                }
            }
        }
    }
    }
}
@media screen and (max-width: 900px) {
    .day-week .label, .inner_chart .label{
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
    .day-week{
        position: relative;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 10px;
        .content{
            display: flex;
            .day, .week{
                width: 50%;
                padding-left: 10px;
                p{
                    margin: 0;
                    span.day-num, span.week-num{
                        color: #ff4384;
                        font-weight: 700;
                        font-size: 35px;
                    }
                    span.num-label{
                        color: rgba(255,255,255,.2);
                        font-weight: 700;
                    }
                }
                h4{
                    color: white;
                    margin: 15px 0;
                }
            }
        }
    }
    .inner_chart{
        width: 100%;
        border-radius: 5px;
        .label{
            margin-bottom: 15px;
        }
    }
}
</style>