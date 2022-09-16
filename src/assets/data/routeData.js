/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-08-29 13:49:22
 * @LastEditors: lc
 * @LastEditTime: 2022-09-07 09:45:15
 */
const routeData = [{
    path: '/operation_maintenance/video_cloud',
    name: 'video_cloud',
    meta: {
      cName: '视频云运维监测',
    },
    component: () => import("views/index/operation_maintenance.vue"),
    redirect: {
      name: 'status_management'
    },
    children: [{
      path: '/operation_maintenance/video_cloud/device_management',
      name: 'device_management',
      meta: {
        cName: '设备管理',
      },
      component: () => import("views/index/operation_maintenance.vue"),
      redirect: {
        name: 'status_management'
      },
      children: [{
        path: '/operation_maintenance/video_cloud/device_management/status_management',
        name: 'status_management',
        meta: {
          cName: '省云设备状态管理',
        },
        component: () => import("views/videoCloud/deviceManagement/statusManagement.vue"),
      }, {
        path: '/operation_maintenance/video_cloud/device_management/diagnosis_management',
        name: 'diagnosis_management',
        meta: {
          cName: '诊断结果管理',
        },
        component: () => import("views/videoCloud/deviceManagement/diagnosisManagement.vue"),
      }, {
        path: '/operation_maintenance/video_cloud/device_management/gateway_management',
        name: 'gateway_management',
        meta: {
          cName: '网关管理',
        },
        component: () => import("views/videoCloud/deviceManagement/gatewayManagement.vue"),
      }, ],
    }, {
      path: '/operation_maintenance/video_cloud/hardware_status',
      name: 'hardware_status_box',
      meta: {
        cName: '硬件状态监控',
      },
      component: () => import("views/index/operation_maintenance.vue"),
      redirect: {
        name: 'hardware_status'
      },

      children: [{
        path: '/operation_maintenance/video_cloud/hardware_status/hardware_status',
        name: 'hardware_status',
        meta: {
          cName: '硬件状态监控',
        },
        component: () => import("views/videoCloud/hardwareStatus/index.vue"),
      }, {
        path: '/operation_maintenance/video_cloud/hardware_status/alarm_list',
        name: 'alarm_list',
        meta: {
          cName: '告警列表',
        },
        component: () => import("views/videoCloud/hardwareStatus/alarmList.vue"),
      }, ],
    }, ]
  }, {
    path: '/operation_maintenance/video_cloud/data_dictionary',
    name: 'data_dictionary',
    meta: {
      cName: '数据字典',
    },
    component: () => import("views/index/operation_maintenance.vue"),
    redirect: {
      name: 'high_speed_info'
    },

    children: [{
      path: '/operation_maintenance/video_cloud/data_dictionary/high_speed_info',
      name: 'high_speed_info',
      meta: {
        cName: '高速信息',
      },
      component: () => import("views/videoCloud/dataDictionary/highSpeedInfo.vue"),
    }, ],
  },
  {
    path: '/404', // /:pathMatch(.*)'
    name: '404',
    component: () => import('views/error/error404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  }
]

export {
  routeData
}