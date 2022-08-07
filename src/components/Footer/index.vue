<template>
    <div class="footer">
        <div class="content">
            <a-row justify="space-between" align="middle">
                <!-- 版权相关 -->
                <a-col class="copyright" :xs="24" :sm="7" :md="6" :xl="6" flex>
                    <a href="/">
                        版权所有<span>&copy;</span>{{year}}<span>{{address}}</span>
                    </a>
                    <a href="/">
                        备案号：xxx备<span>{{code}}</span>号
                    </a>
                </a-col>
                <!-- 声明 -->
                <a-col class="statement" :xs="24" :sm="12" :md="12" :xl="12" flex>
                    本站声明：本站部分资源来源于网络，如有侵权请联系本人处理，或发送邮件至本人邮箱：<span>2289816251@QQ.COM</span>
                </a-col>
                <!-- 联系方式 -->
                <a-col class="contactDetails" :xs="24" :sm="5" :md="6" :xl="6" flex align="right">
                    <div class="content">
                        <!-- QQ -->
                        <a-dropdown placement="top">
                            <QqOutlined :style="{fontSize: size + 'px'}" class="ant-dropdown-link"/>
                            <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <img src="./../../assets/images/connect/QQ.jpg" alt="加载失败！">
                                </a-menu-item>
                            </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown placement="top">
                            <wechat-filled :style="{fontSize: size + 'px'}" class="ant-dropdown-link"/>
                            <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <img src="./../../assets/images/connect/WX.jpg" alt="加载失败！">
                                </a-menu-item>
                            </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown placement="top">
                            <DingdingOutlined :style="{fontSize: size + 'px'}" class="ant-dropdown-link"/>
                            <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <img src="./../../assets/images/connect/DD.jpg" alt="加载失败！">
                                </a-menu-item>
                            </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import {reactive, toRefs} from 'vue'
import {Menu,MenuItem,Dropdown} from 'ant-design-vue'
import {QqOutlined,WechatFilled,DingdingOutlined} from '@ant-design/icons-vue' 
export default {
    setup(props) {
        let data = reactive({
            size:28
        })

        return {
            ...toRefs(data)
        }
    },
    props:{
        code:{
            type:Number,
            default:110
        },
        address:{
            type:String,
            default:'xxxx.com'
        }
    },
    computed:{
        year(){
            return dayjs().format('YYYY')
        }
    },
    components:{ADropdown:Dropdown,AMenu:Menu,AMenuItem:MenuItem,QqOutlined,WechatFilled,DingdingOutlined}
}
</script>

<style lang="less" scoped>
@import '@/assets/less/color.less';
    .footer{
        width: 100%;
        padding: 20px 0;
        background-color:  @bg-color2;
        .content{
            color: @bg-color;
            max-width: 1200px;
            margin: 0 auto;
            .copyright{
                a{
                    display: block;
                    color: @bg-color;
                    span{
                        margin: 0 6px;
                    }
                }
            }
            .contactDetails{
                span{
                    margin: 0 6px;
                }
            }
        }
    }
    img{
        width: 140px;
        height: 140px;
    }
</style>