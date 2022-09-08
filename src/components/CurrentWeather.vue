<template>
    <div class="current-weather">
        <div class="container">
            <div class="weather-info">
                <span class="city">
                    {{this.currentWeather.name}}
                </span>
                <span class="current-temp">
                    {{Math.round(this.currentWeather.main.temp)}}
                </span>
                <div class="high-low">
                    <div class="low">
                        <i class="fas fa-chevron-down"></i>
                        <span>
                            {{Math.round(this.currentWeather.main.temp_min)}}º
                        </span>
                    </div>
                    <div class="high">
                        <i class="fas fa-chevron-up"></i>
                        <span>
                            {{Math.round(this.currentWeather.main.temp_max)}}º
                        </span>
                    </div>
                </div>
                <span class="condition">
                    {{this.currentWeather.weather[0].description}}
                </span>
                <span class="feels-like">
                    Feels like {{Math.round(this.currentWeather.main.feels_like)}}º
                </span>
            </div>
            <div class="weather-icon">
                <img v-if="isDay" src="../../public/sun.png" alt="sun">
                <img v-if="isNight" src="../../public/moon.png" alt="moon">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CurrentWeather",

    props: ["isDay", "isNight", "currentWeather"]
}
</script>

<style lang="scss" scoped>

.current-weather {
    margin-top: 90px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);

    .container {
        margin: 30px 0;
        min-height: 366px;
        position: relative;
        display: flex;
        color: white;
        }

        span {
            display: block;
        }

        .weather-info{
            padding-top: 30px;
            flex: 1;

            .city {
                font-size: 24px;
                font-weight: 500;
            }

            .current-temp {
                margin-top: 40px;
                font-size: 80px;
                font-weight: 600;
            }
        }
    
    .high-low {
        display: flex;
        gap: 16px;

        .high,
        .low {
            display: flex;

            span {
                margin-left: 8px;
            }
        }
    }

    .condition {
        text-transform: capitalize;
        font-size: 24px;
        font-weight: 500;
        margin: 60px 0 8px 0;
    }

    .feels-like {
        font-weight: 400;
        font-size: 14px;
    }

    .weather-icon {
        height: 100%;
        position: absolute;
        right: -180px;
        display: flex;
        align-items: center;

        img{
            width: 366px;
            height: 366px;
        }
    }
}

</style>