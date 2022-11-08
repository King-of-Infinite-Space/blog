---
title: TensorFlow on Navi10折腾记
number: 197
url: https://github.com/King-of-Infinite-Space/thoughts/discussions/197
createdAt: 2022-08-23T02:45:26Z
lastEditedAt: 2022-10-30T04:44:25Z
updatedAt: 2022-11-06T17:51:21Z
author: King-of-Infinite-Space
category: 博文
labels:
  - 外置记忆
  - 赛博空间
countZH: 760
countEN: 250
filename: 2208-TensorFlow-on-Navi10折腾记
---

TL,DR: `export HSA_OVERRIDE_GFX_VERSION=10.3.0`

---

17年夏天机缘巧合之下接触了ANN。那时TensorFlow 1.x刚推出不久，而当时电脑上的950M显卡支持CUDA。我靠着入门级编程水平稍微折腾后成功安装。不过只是勉为其难地运行，毕竟性能弱、显存小 (2G)、散热也不理想。

那几年深度学习的浪潮席卷了学界和业界，各类模型层出不穷。然而热闹是他们的，我只是浅尝辄止。19年底组装电脑时计划是玩游戏而非跑计算，于是显卡选择了AMD的5700XT（代号Navi10）而非NVIDIA的2060 / 2060SUPER / 2070。

然而人的命运就不可以预料。在这全民AI的年代，谁能置身事外？虽然不太复杂的模型也可以在CPU上运行，但既然已有不错的GPU，何不利用起来？然而，AMD的GPU计算平台ROCm发展缓慢，官方支持的显卡型号非常有限。5700系列显卡上市已经三年，Github上的这个issue[^issue1]也挂了三年。

22年初推出的ROCm v5支持了6800系列（Navi 21）。其架构比Navi 10更新但接近，所以对后者的支持或许不远了。果然神通广大的开源社群找到了办法。

上个月，有高人自行编译了可在Navi 10上运行的ROCm[^navi10]，不过过程费时费力。后来得知[^hsa]，无需自行编译，只需设置环境变量 `HSA_OVERRIDE_GFX_VERSION=10.3.0` 假装显卡是Navi 21，就可以成功运行。此前有人将这一方法用于6600XT / 6700S (Navi 23)[^reddit][^gh-23]，但没想到对Navi 10也有效。闻此喜讯，果断开搞。

1. 安装系统
    ROCm只支持Linux，于是先安装Ubuntu。顺便体验下新的22.04。安装过程跟着教程[^ubt]走即可，要先在现有的Win10系统上给磁盘分配空余空间。

    进入系统之后才意识到要给USB无线网卡安装驱动。好在可以先通过手机的USB tethering上网。然而网卡厂商提供的驱动太旧，网上的开源驱动一开始好用后来就连不上了。只好将就用着慢速的USB tethering。另外还遇到了无线键鼠卡顿的问题。

2. 安装ROCm
    大致参照官方v5.2安装指南[^install]。由于Ubuntu 22.04尚未得到官方支持，需自行解决dependency版本问题[^gh-ubt]。

3. `pip install tensorflow-rocm`
    pytorch的话似乎要自行编译

4. 设置环境变量`HSA_OVERRIDE_GFX_VERSION=10.3.0`

5. Let the tensors flow

简单跑了几个benchmark，似乎没什么问题。不过，我的浅度学习模型在CPU和GPU上运行似乎区别不大。所以折腾的结果目前还享受不到，就当从折腾的过程中学习了。

顺便一提，微软开发的基于DirectX 12的DirectML可提供GPU加速，但据说效果一般。我试了一下`tensorflow-directml-plugin`，不仅没有加速，反而明显减速……

再顺便一提，目前显卡的价格总算基本恢复正常了。前两年的情况简直疯狂，二手卡的价格一度达到我当时购买价的两倍。~~如果当时卖掉，现在买个N卡就不用这么折腾了。~~

--------------------------------

[^ubt]: [Beginners Guide To Install Windows 10 With Ubuntu in Dual Boot](https://itsfoss.com/install-ubuntu-1404-dual-boot-mode-windows-8-81-uefi/)

[^gh-ubt]: `[ROCm fails to install from APT repository in 22.04 · Issue #1713 · RadeonOpenCompute/ROCm](https://github.com/RadeonOpenCompute/ROCm/issues/1713#issuecomment-1193332549)`

[^reddit]: [Here's something you don't see every day: PyTorch running on top of ROCm on a 6800M (6700XT) laptop! Took a ton of minor config tweaks and a few patches but it actually functionally works. HUGE! : Amd](https://www.reddit.com/r/Amd/comments/rd7mmi/heres_something_you_dont_see_every_day_pytorch/)

[^gh-23]: `[Does ROCm support the RX 6700S (laptop GPU) · Issue #1756 · RadeonOpenCompute/ROCm](https://github.com/RadeonOpenCompute/ROCm/issues/1756)`

[^hsa]: `[Releases? · Issue #1 · xuhuisheng/rocm-gfx1010](https://github.com/xuhuisheng/rocm-gfx1010/issues/1)`

[^issue1]: `[Any update on 5700 Xt support? · Issue #887 · RadeonOpenCompute/ROCm](https://github.com/RadeonOpenCompute/ROCm/issues/887)`

[^navi10]: [rocm-build/navi10 at master · xuhuisheng/rocm-build](https://github.com/xuhuisheng/rocm-build/tree/master/navi10)

[^install]: [Overview of ROCm Installation Methods](https://docs.amd.com/bundle/ROCm-Installation-Guide-v5.2/page/Overview_of_ROCm_Installation_Methods.html)
<img src='https://count.lnfinite.space/post/48.svg?plus=1' width='0' height='0' />