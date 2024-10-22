const getUrlPara = (name, search = window.location.search, useDecode) => {
    const reg = new RegExp(`(^|\\?|&)${name}=([^&]*)(&|$)`);
    const r = search.match(reg);
    if (r != null) {
        if (useDecode) {
            return decodeURIComp(r[2]);
        }
        return unescape(r[2]);
    }
    return '';
};

console.log(getUrlPara('org_module_id', 'http://console.cli.me:8000/nedit/4283058?create_from=127&categoryId=46282097&org_module_id=44285&p=1'));
