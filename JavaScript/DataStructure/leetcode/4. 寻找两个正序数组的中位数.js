/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {

    const total = nums1.length + nums2.length;

    const midNum = Math.floor(total / 2);
    let index1 = 0;
    let index2 = 0;

    for (let index = 0; index < total; index++) {
        const element1 = nums1[index1];
        const element2 = nums2[index2];

        if (index1 + index2 <= midNum) {

            if (element1 >= element2) {
                if (index2 + 1 < nums2.length - 1) {
                    index2++;
                } else {
                    index1++;
                }
            } else {

                if (index1 + 1 < nums1.length - 1) {
                    index1++;
                } else {
                    index2++;
                }
            }

        } else {
            return element1 > element2 ? element2 : element1;
        }


    }


};

// let nums1 = [1, 3], nums2 = [2]
const nums1 = [1, 2], nums2 = [3, 4];

const res = findMedianSortedArrays(nums1, nums2);
console.log('🚀日志=====res', res);