<template>
    <div id="UploadImg">
        <h3>照片上传规范</h3>
        <div class="content">
            <div class="leftCont">
                <input class="upInput" @change="upLoadImg" ref='avatarInput' multiple="multiple" capture='camera' type='file' accept="image/*" name="avatar" id="img" />
                <img class="userImg" :src="userImg" alt="">
                <img class="camera-icon" src="../../assets/img/camera.png" alt="">
            </div>
            <div class="rightCont">
                <img class="example-icon" src="../../assets/img/example.png" alt="">
                <div class="mask">
                    <img class="magnifier-icon" src="../../assets/img/magnifier.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import imgCompress from "@/util/tools/imgCompress.js"
export default {
    name: 'UploadImg',
    /* 外部引入的值 */
    props: ['title'],
    data() {
        return {
            msg: 'uploadImg',
            userImg: "",
        }
    },
    mounted() {

    },
    methods: {
        upLoadImg(e) {
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                this.indicatorClose();
                return
            };
            if (file[0].type.indexOf("image") < 0) {
                Toast({ message: '上传了非图片', position: 'middle', duration: 1500 });
                this.indicatorClose();
                return;
            }
            if (file[0].size > 5 * 1000000) {
                Toast({ message: '上传文件过大', position: 'middle', duration: 1500 });
                this.indicatorClose();
                return;
            }
            imgCompress(file[0],(base64,blob,imgFile) => {
                /* 获取压缩后的图片 base64格式 blob格式 和imgFile */
                /* 建议只是用blob格式上传图片 base64文件过大在某些手机上会上传失败 */
                this.userImg = base64;
                Indicator.close();
                this.$emit('changeImg',{base64,blob,imgFile})
            })
        },
        indicatorClose() {
            setTimeout(() => {
                Indicator.close();
            }, 150)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#UploadImg {
    padding: 30px;
    background: $white_b;
    h3 {
        font-size: 32px;
        color: $deep_c;
        letter-spacing: 0;
        text-align: left;
        line-height: 45px;
        margin-top: -5px;
    }
    .content {
        margin-top: 25px;
        overflow: hidden;
        .leftCont {
            float: left;
            width: 330px;
            height: 227px;
            background: $grey_b;
            margin-right: 30px;
            position: relative;
            .camera-icon {
                width: 70.2px;
                height: 55.5px;
                margin-top: -10px;
                @include centerByTop(54px);
            }
            .upInput {
                @include mask();
                @include opacity(0);
                z-index: 2;
                width: 100%;
            }
            .userImg{
                @include mask();
                z-index: 1;
                width:100%;
                height:100%;
            }
        }
        .leftCont:after {
            content: '点此上传';
            font-size: 32px;
            color: $deep_c;
            line-height: 45px;
            @include centerByTop(120px);
        }
        .rightCont {
            float: left;
            width: 330px;
            height: 227px;
            position: relative;
            .example-icon {
                width: 100%;
            }
            .mask {
                @include mask();
                background: rgba(0, 0, 0, 0.5);
                .magnifier-icon {
                    width: 51.9px;
                    height: 60.9px;
                    @include centerByTop(65.4px);
                }
            }
            .mask:after {
                content: '示例';
                font-size: 32px;
                color: $white_c;
                line-height: 45px;
                @include centerByTop(139px);
            }
        }
    }
}
</style>
