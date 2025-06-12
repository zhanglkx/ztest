let textLeft = '11';

function getCardTypesCommon(coupons) {
  // 遍历卡种
  const cardTypeSet = new Set();
  coupons.forEach((brand) => brand.cardTypeName && cardTypeSet.add(brand.cardTypeName));
  const s = Array.from(cardTypeSet).join('/')?.replace(/\|/g, '/');
  return s;
}
const cardTypes = getCardTypesCommon([
  {
    bankName: '中国银行',
    cardTypeName: '信用卡',
    bankIcon: 'https://webresource.c-ctrip.com/resh5paymentcommononline/R1/dest/res/bankico/pay_ico_bank_BOC.png?t=1748920567329',
    couponId: '22429',
    couponBrandId: 'CC_BOC',
    couponDesc: '银联62卡满5000减100元',
    couponMotionId: 1,
    couponRuleType: 0,
    amount: 10000,
    status: 0,
    couponType: 0,
    promotionId: '686905082',
    hide: false,
  },
]);

console.log('🚀日志=====11111', textLeft += cardTypes);
