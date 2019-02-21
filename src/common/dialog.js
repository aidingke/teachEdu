import Vue from 'vue';
//拦截器专用弹框方法
import WarningDialog from './WarningDialog.vue';
import SuccessMsg from './SuccessMsg.vue';

const Profile = Vue.extend(WarningDialog);
const ProfileSuccess = Vue.extend(SuccessMsg);

export const dialog = (message, fn) => {
	// 创建 Profile 实例，并挂载到一个元素上。
	const instance = new Profile({
        propsData: {
            warningText: message,
            dialogTableVisible: true
        },
        data: { isJs: true },
        methods: {
            callback() {
                fn && fn()
            }
        }
    });

    instance.$mount();
	document.body.appendChild(instance.$el);
};
export const successMsg = (message,fn) => {
	// 创建 Profile 实例，并挂载到一个元素上。successMsg
	const instance = new ProfileSuccess({
        propsData: {
            successText: message,
            dialogTableVisible: true
        },
        data: { isJs: true },
        methods: {
            callback() {
                fn && fn()
            }
        }
    });

    instance.$mount();
	document.body.appendChild(instance.$el);
};