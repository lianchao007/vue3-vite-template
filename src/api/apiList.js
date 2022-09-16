/*
 * @Descripttion:
 * @version:
 * @Author: lc
 * @Date: 2022-02-15 14:02:18
 * @LastEditors: lc
 * @LastEditTime: 2022-09-08 11:36:12
 */
import axios from "./index.js"

const api = {
  axios,
  // 登录
  login(params) {
    return axios.post(`/api/v1/login`, params)
  },
  // 退出登录
  logout() {
    return axios.get(`/api/v1/logout`)
  },
  // 用户信息
  userInfo() {
    return axios.get(`/api/v1/userinfo`)
  },
  // 用户信息
  setUserInfo(params) {
    return axios.post(`/api/v1/userinfo`, params)
  },
  // 网关管理
  gatewayManage: {
    // 网关列表
    gateway(params) {
      return axios.get(`/api/GatewayManage/gateway`, {
        params,
      })
    },
    // 新增网关
    addGateway(params) {
      return axios.post(`/api/GatewayManage/gateway`, params)
    },
    // 网关信息
    gatewayInfo(params) {
      return axios.get(`/api/GatewayManage/gateway/${params.id}`, {
        params,
      })
    },
    // 编辑网关
    putGateway(params) {
      return axios.put(`/api/GatewayManage/gateway/${params.id}`, params)
    },
    // 管养单位下拉列表
    managementDepartmentSelector(params) {
      if (axios.cacheData["managementDepartmentList"]) {
        return axios.cacheData["managementDepartmentList"]
      }
      return axios.get(`/api/GatewayManage/managementDepartmentSelector`, {
        params,
        headers: {
          cahceName: "managementDepartmentList",
        },
      })
    },
    // 产商单位下拉列表
    companyList(params) {
      if (axios.cacheData["companyList"]) {
        return axios.cacheData["companyList"]
      }
      return axios.get(`/api/GatewayManage/companyList`, {
        params,
        headers: {
          cahceName: "companyList",
        },
      })
    },
    // 线路下拉框
    lineSelector(params) {
      if (axios.cacheData["lineList"]) {
        return axios.cacheData["lineList"]
      }
      return axios.get(`/api/GatewayManage/lineSelector`, {
        params,
        headers: {
          cahceName: "lineList",
        },
      })
    },
    // 路段下拉框
    roadSelector(params) {
      if ((!params || !params.line_id) && axios.cacheData["roadList"]) {
        return axios.cacheData["roadList"]
      }
      return axios.get(`/api/GatewayManage/roadSelector`, {
        params,
        headers: {
          cahceName: (!params || !params.line_id) && "roadList",
        },
      })
    },
    // 查看离线设备
    cameraOfflineData(params) {
      return axios.get(`/api/GatewayManage/cameraOfflineData`, {
        params,
      })
    },
    // 一键分析
    cameraOfflineAnalysis(params) {
      return axios.get(`/api/GatewayManage/cameraOfflineAnalysis`, {
        params,
      })
    },
  },
  gatewayCameraInfo: {
    // 获取网关摄像枪的信息
    getCamera(params) {
      return axios.get(`/api/GatewayCameraInfo/Equipment/camera/${params.id}`, {
        params
      });
    },
    // 修改网关摄像枪信息
    editCamera(params) {
      return axios.put(`/api/GatewayCameraInfo/Equipment/camera/${params.id}`, params);
    },
    // 获取网关摄像枪的品牌
    getCameraSettingType(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getCameraSettingType`, {
        params
      })
    },
    // 网关线路下拉框
    lineSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/lineSelect`, {
        params
      })
    },
    // 网关路段下拉框
    roadSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/roadSelect`, {
        params,
      })
    },
    // 获取网关重点位置类型信息（下拉框）
    getPosition(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getPosition`, {
        params,
      })
    },
    // 获取网关重点位置（下拉框）
    getInstallationName(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getInstallationName`, {
        params,
      })
    },
    // 获取网关省份下拉框
    getProvince(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getProvince`, {
        params,
      })
    },
    // 网关行政区域下拉框
    getAdministrativeArea(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getAdministrativeArea`, {
        params,
      })
    },
    // 网关管养单位下拉框
    departmentSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/departmentSelect`, {
        params,
      })
    },
    // 网关编码器下拉框
    encoderSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/encoderSelect`, {
        params,
      })
    },
    // 网关第三方取流平台下拉框
    thirdPlatformSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/thirdPlatformSelect`, {
        params,
      })
    },
    // 网关坐标类型下拉框
    getCoordinateSystem(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/getCoordinateSystem`, {
        params,
      })
    },
    // 网关取流方式下拉框
    flowTypeSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/flowTypeSelect`, {
        params,
      })
    },
    // 重置摄像枪的推流重试次数）
    reSetPushStatus(params) {
      return axios.get(`/api/GatewayCameraInfo/Equipment/reSetPushStatus`, {
        params,
      })
    },
    // 获取网关录像机
    dvrSelect(params) {
      return axios.get(`/api/GatewayCameraInfo/Select/dvrSelect`, {
        params,
      })
    },
    // 获取网关中单个摄像枪的流编码信息
    getRtspInfoWithOne(params) {
      return axios.post(
        `/api/GatewayCameraInfo/StreamInfo/getRtspInfoWithOne`,
        params
      )
    },
  },
  user: {
    // 账号列表
    accountList(params) {
      return axios.get(`/api/setting/user`, {
        params,
      })
    },
    // 获取账号数据
    getAccount(params) {
      return axios.get(`/api/setting/user/${params.id}`)
    },
    // 新增账号
    addAccount(params) {
      return axios.post(`/api/setting/user`, params)
    },
    // 更新账号
    updateAccount(params) {
      return axios.put(`/api/setting/user/${params.id}`, params)
    },
    // 删除账号
    delAccount(params) {
      return axios.delete(`/api/setting/user/${params.id}`)
    },
    // 更改账号状态
    disableUser(params) {
      return axios.put(`/api/setting/disableUser/${params.id}`, params)
    },
    // 重置账号密码
    resetPassword(params) {
      return axios.put(`/api/setting/resetPassword/${params.id}`)
    },
    // 角色下拉列表
    getRoles() {
      return axios.get(`/api/setting/selector/getRoles`)
    },
    // 角色列表
    roleList(params) {
      return axios.get(`/api/setting/role`, {
        params,
      })
    },
    // 获取角色数据
    getRole(params) {
      return axios.get(`/api/setting/role/${params.id}`, params)
    },
    // 新增角色
    addRole(params) {
      return axios.post(`/api/setting/role`, params)
    },
    // 更新角色
    updateRole(params) {
      return axios.put(`/api/setting/role/${params.id}`, params)
    },
    // 删除角色
    delRole(params) {
      return axios.delete(`/api/setting/role/${params.id}`)
    },
    // 获取用户列表
    getUsers(params) {
      return axios.get(`/api/setting/role/getUsers/${params.id}`)
    },
    // 保存用户信息
    saveUsers(params) {
      return axios.post(`/api/setting/role/joinUser/${params.id}`, params)
    },
    // 获取权限菜单
    getPermissionMenus(params) {
      return axios.get(`/api/setting/getPermissionMenus/${params.id}`)
    },
    // 获取功能权限
    getPermissionGroup(params) {
      return axios.get(`/api/setting/getPermissionGroup/${params.id}`)
    },
    // 保存功能权限
    setPermissionGroup(params) {
      return axios.post(`/api/setting/setPermissionGroup/${params.id}`, params)
    },
    // 保存权限信息
    savePermissionMenus(params) {
      return axios.post(`/api/setting/joinMenus/${params.id}`, params)
    },
    // 更改个人信息
    updateCurrentUser(params) {
      return axios.put(`/api/setting/updateCurrentUser`, params)
    },
    // 更改密码
    updateCurrentPassword(params, headerinfo) {
      return axios.put(
        `/api/setting/updateCurrentPassword`,
        qs.stringify(params),
        {
          headers: headerinfo,
        }
      )
    },
  },
  // /api/PCEquipmentStatusManage/departmentStatistic
  PCEManage: {
    // 管养单位统计
    departmentStatistic(params) {
      return axios.get(`/api/PCEquipmentStatusManage/departmentStatistic`, {
        params,
      })
    },
    //线路统计
    lineStatistic(params) {
      return axios.get(`/api/PCEquipmentStatusManage/lineStatistic`, {
        params,
      })
    },
    // 路段统计
    roadStatistic(params) {
      return axios.get(`/api/PCEquipmentStatusManage/roadStatistic`, {
        params,
      })
    },
    // 查看离线设备
    getStatisticsEquipment(params) {
      return axios.get(`/api/PCEquipmentStatusManage/getStatisticsEquipment`, {
        params,
      })
    },
    // 省云管养单位下拉框
    managerDepartmentSelector(params) {
      return axios.get(
        `/api/ProvinceBaseInfo/Selector/managerDepartmentSelector`,
        {
          params,
        }
      )
    },
    // 省云线路下拉框
    lineSelector(params) {
      return axios.get(`/api/ProvinceBaseInfo/Selector/lineSelector`, {
        params,
      })
    },
    // 省云路段下拉框
    roadSelector(params) {
      return axios.get(`/api/ProvinceBaseInfo/Selector/roadSelector`, {
        params,
      })
    },
  },
  monitor: {
    // 硬件状态
    hardwareStatus(params) {
      return axios.get(`/api/monitor/system/home`, {
        params,
      })
    },
    // 硬件状态汇总
    hardwareSummary(params) {
      return axios.get(`/api/monitor/system/summary`, {
        params,
      })
    },
    // 端口列表
    portList(params) {
      return axios.get(`/api/monitor/system/portList`, {
        params,
      })
    },
    // 进程列表
    processList(params) {
      return axios.get(`/api/monitor/system/processList`, {
        params,
      })
    },
    // 进程图表
    processChart(params) {
      return axios.get(`/api/monitor/system/process/chart`, {
        params,
      })
    },
  },
  dictionary: {
    // 线路列表
    getLines(params) {
      return axios.get(`/api/Dictionary/lines`, {
        params,
      })
    },
    // 新增线路
    addLine(params) {
      return axios.post(`/api/Dictionary/lines`, params)
    },
    // 线路信息
    getLine(params) {
      return axios.get(`/api/Dictionary/lines/${params.id}`, {
        params,
      })
    },
    // 编辑线路
    editLine(params) {
      return axios.put(`/api/Dictionary/lines/${params.id}`, params)
    },
    // 删除线路
    delLines(params) {
      return axios.post(`/api/Dictionary/lines/remove`, params)
    },
    // 导出线路
    exportLines(params) {
      return axios.get(`/api/Dictionary/lines/excel`, {
        params,
      })
    },

    // 路段列表
    getRoads(params) {
      return axios.get(`/api/Dictionary/roads`, {
        params,
      })
    },
    // 新增路段
    addRoad(params) {
      return axios.post(`/api/Dictionary/roads`, params)
    },
    // 路段信息
    getRoad(params) {
      return axios.get(`/api/Dictionary/roads/${params.id}`, {
        params,
      })
    },
    // 编辑路段
    editRoad(params) {
      return axios.put(`/api/Dictionary/roads/${params.id}`, params)
    },
    // 删除路段
    delRoads(params) {
      return axios.post(`/api/Dictionary/roads/remove`, params)
    },
    // 导出路段
    exportRoads(params) {
      return axios.get(`/api/Dictionary/roads/excel`, {
        params,
      })
    },

    // 管养单位列表
    getDepartments(params) {
      return axios.get(`/api/Dictionary/departments`, {
        params,
      })
    },
    // 新增管养单位
    addDepartment(params) {
      return axios.post(`/api/Dictionary/departments`, params)
    },
    // 管养单位信息
    getDepartment(params) {
      return axios.get(`/api/Dictionary/departments/${params.id}`, {
        params,
      })
    },
    // 编辑管养单位
    editDepartment(params) {
      return axios.put(`/api/Dictionary/departments/${params.id}`, params)
    },
    // 删除管养单位
    delDepartments(params) {
      return axios.post(`/api/Dictionary/departments/remove`, params)
    },
    // 导出管养单位
    exportDepartments(params) {
      return axios.get(`/api/Dictionary/departments/excel`, {
        params,
      })
    },
  },
  diagnosisResultManage: {
    // 诊断结果列表
    getDiagnosisResultList(params) {
      return axios.get(`/api/DiagnosisResultManage/getDiagnosisResultList`, {
        params,
      })
    },
    // 诊断结果详情列表
    getDiagnosisDetailList(params) {
      return axios.get(`/api/DiagnosisResultManage/getDiagnosisDetailList`, {
        params,
      })
    },
  },
}

export default api
