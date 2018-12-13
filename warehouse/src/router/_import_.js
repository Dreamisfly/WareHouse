import Home_component from '@/page/home'
import Dashboard_component from '@/page/dashboard'
import Login_component from '@/page/login'

// 系统管理
import system_user_list from '@/page/system/user/list'

// 配置项管理
import xiaodai_config_spv_list from '@/page/xiaodai/config/SPV/list'
import xiaodai_config from '@/page/xiaodai/config/config'

export default {
    'Home'        : Home_component,
    'Dashboard' : Dashboard_component,
    'Login' : Login_component,
    'SystemUserList' : system_user_list,
    'XiaodaiConfig' : xiaodai_config,
    'XiaodaiConfigSpvList' : xiaodai_config_spv_list,
}