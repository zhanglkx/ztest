import { domain } from '@/store/modules/application';

// 定义接口类
class NCRequest {
  // 获取完整的上传接口地址，避免写死域名
  static getUploadUrl() {
    return `https://upload-api.${domain.decodeUrl}/upload.php?kid=cliim`;
  }

  /**
   * 目前只支持h5
   * @param file
   */
  static async uploadImageNew(file): Promise<any> {
    const url = this.getUploadUrl();
    const fm = new FormData();
    fm.append('Filedata', file);

    const fetchOption: any = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: fm,
    };

    try {
      const response = await fetch(url, fetchOption);
      const res = await response.json();
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default NCRequest;