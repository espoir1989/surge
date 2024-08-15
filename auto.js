const homeSsid = "NETGEAR24-5G"; //你可以换成你自己的 WIFI 名

function handleNetworkChange() {
  let ssid = $network.wifi.ssid;
  let cellularType = $network.v4.primaryInterface;

  if (ssid === homeSsid) {
    $surge.setOutboundMode("direct");
    $notification.post("Surge 出站模式已更改", "", "已切换至直接连接模式（家庭WiFi）");
  } else if (ssid) {
    $surge.setOutboundMode("rule");
    $notification.post("Surge 出站模式已更改", "", "已切换至规则模式（其他WiFi）");
  } else if (cellularType && cellularType.startsWith("pdp_ip")) {
    $surge.setOutboundMode("direct");
    $notification.post("Surge 出站模式已更改", "", "已切换至规则模式（蜂窝数据）");
  } else {
    $notification.post("网络状态", "", "无网络连接");
  }
}

handleNetworkChange();
