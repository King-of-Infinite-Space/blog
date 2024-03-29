---
title: 拍手游戏“枪版money”规则
number: 182
url: https://github.com/King-of-Infinite-Space/thoughts/discussions/182
createdAt: 2021-08-14T03:17:15Z
lastEditedAt: 2022-10-30T04:43:45Z
updatedAt: 2022-10-30T04:43:45Z
author: King-of-Infinite-Space
category: 博文
labels:
  - 外置记忆
  - 好行小慧
countZH: 970
countEN: 0
filename: 2108-拍手游戏“枪版money”规则
---

#### 概述
本游戏基于拍手游戏“枪版Money”（由小学生创作于2007年前后）。为增强游戏性及平衡性，规则略有修改。线上版本可见 [King-of-Infinite-Space/Money-Wargame](https://github.com/King-of-Infinite-Space/Money-Wargame)（仅供演示）。

游戏人数最低为2。理论上没有人数上限，但一般不宜超过6。线上版暂定为5。

每回合各玩家同时进行一次行动，所有可能的行动于下一节列出。线上版本里，每个行动对应一张卡牌。玩家行动时将对应的卡牌扣置于桌面上，所有玩家完成行动后翻开所有卡牌进行结算。真人版本里，每个行动有特定的手势。每回合所有玩家同时行动——先拍手两次（以保持节奏同步），然后做手势（购买和使用武器时还需要喊出名称或音效），最后进行结算。

游戏开始时，各玩家拥有1点生命。线上版本里，各玩家还获得5金钱。真人版本里，各玩家没有起始金钱，第一回合的行动必须为“攒钱”。

#### 回合中可进行的行动
- 无分类
    攒钱（每次获得5金钱）、偷、警。
- 买武器
  花费金钱获得武器。武器及价格如下：
  1小刀、2匕首、3手枪、4冲锋、5步枪、5狙击、6轻机、7重机、8榴弹、9炸弹、10炮弹、11导弹、12中子弹、13原子弹、14原子弹+、15氢弹、16氢弹+。

  武器攻击力随价格递增（例外：带“+”的武器与不带“+”的攻击力相同，但前者不会被偷且不会被安炸弹）。每种武器购买后只能使用一次（例外：轻机、重机可使用两次）。同种武器可以重复购买，叠加使用次数。

- 用武器
  使用购买的武器进行攻击。炸弹除了可以进行直接攻击外，还可以“安炸弹”。“安炸弹”之后该炸弹视为已使用，不能再用于攻击。

- 防御
  除氢弹外，每个武器都有对应的防御。

#### 结算

每回合全部玩家行动后，根据以下规则依次进行结算。死亡的玩家被移出游戏，存活的玩家继续下一回合。最后一名存活的玩家为胜者。

- 进行错误行动的玩家死亡。错误行动包括：
  - 被安炸弹的行动（下详）
  - 购买价格高于所拥有金钱的武器
  - 使用未购买的武器
  - （真人版本）使用不存在的手势或名称
  - （真人版本）手势与名称不对应

- 若有玩家使用武器进行攻击，以其中攻击力最高的作为参考：
  - 使用相应防御的玩家存活（例外：若步枪和狙击同为攻击力最高的，则无法防御）；
  - 购买相同或更高攻击力武器的玩家，购买作废，存活；
  - 若攻击力不大于炸弹，安炸弹的玩家炸弹作废，存活；
  - 不符合以上情况的玩家死亡。

- 若无玩家进行攻击，适用以下规则：
  - 若场上未出现“警”且只有一名玩家使用“偷”，使用“偷”的玩家获得其他玩家该回合攒的钱或购买的武器（例外：带“+”的武器不会被偷）；否则各玩家攒钱和购买武器成功。
  - 若场上出现“警”，使用“偷”的玩家死亡。
  - 若有人安炸弹，其他玩家再次进行当前动作或使用本回合购买的武器时，会被视为进行错误行动。（例外：“警”和带“+”的武器不会被安炸弹。被安炸弹的武器不影响之后购买的同种武器。）


2016.7 根据记忆总结了真人版本
2019.1 制作线上版本时略作修改
2021.8 再次整理文本
<img src='https://count.lnfinite.space/post/33.svg?plus=1' width='0' height='0' />