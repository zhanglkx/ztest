import { Bridge } from '../Bridge';
 
/**
 * @export
 * @class IBUNumberValidate
 */
export class IBUNumberValidate {
  /**
   * @static
   * @param params
   * {
   *  number: string, // 需要验证的号码
   *  countryCode: string, // 国家码
   * }
   * @param callback
   */
  static validate(
    params: {
      number: string;
      countryCode: string;
    },
    callback: (result: validateResult) => void
  ): void {
    Bridge.callNativeWithCallback(
      'IBUNumberValidate',
      'validate',
      {
        number: params.number.toString(),
        countryCode: params.countryCode.toString(),
      },
      (status, result) => {
        if (status) {
          if (callback) {
            callback(result);
          }
        }
      }
    );
  }
 
  /**
   * @static
   * @param params
   * {
   *  number: string, // 需要验证的号码
   *  countryCode: string, // 国家码
   * }
   * @param callback
   * @since 8.29.0
   * 验证号码同时使用第三方库进行验证
   */
  static validateWithLib(
    params: {
      number: string;
      countryCode: string;
    },
    callback: (result: validateResult) => void
  ): void {
    Bridge.callNativeWithCallback(
      'IBUNumberValidate',
      'validateWithLib',
      {
        number: params.number.toString(),
        countryCode: params.countryCode.toString(),
      },
      (status, result) => {
        if (status) {
          if (callback) {
            callback(result);
          }
        }
      }
    );
  }
}
 
export interface validateResult {
  isValid: boolean;
  errors?: IPhoneErrorInfo;
  warnings?: IPhoneErrorInfo;
}
 
export interface IPhoneErrorInfo {
  lenCompareType?: string;
  message: string;
  type: string;
  rule?: number[];
}