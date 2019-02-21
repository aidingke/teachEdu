/****
 * 获取icon图标
 * params1: subjectName (科目名称)  type: string
 */
function getIcon(subjectName) {
    // subjectName
    let obj = {};
    let url = "static/img";
    switch (subjectName) {
      case "电控":
        obj = {
          icon: `${url}/elec-control.png`
        };
        break;
      case "制冷":
        obj = {
          icon: `${url}/refrigeration.png`
        };
        break;
      case "流体":
        obj = {
          icon: `${url}/fluid.png`
        };
        break;
      case "机械":
        obj = {
          icon: `${url}/mechanics.png`
        };
        break;
      case "安检":
        obj = {
          icon: `${url}/security-check.png`
        };
        break;
      case "二手车检测":
        obj = {
          icon: `${url}/used-car-test.png`
        };
        break;
      case "全车检测":
        obj = {
          icon: `${url}/full-vehicle.png`
        };
        break;
      case "综合诊断":
        obj = {
          icon: `${url}/compre-diag.png`
        };
        break;
      default:
        obj = {
          icon: `${url}/default.png`
        };
        break;
    }
    return obj;
  }
  export default getIcon;