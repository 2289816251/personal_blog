function getIcon(){
    const icon = document.querySelectorAll('#icon');
    // 遍历
    icon.forEach(item => {
        const str = item.innerHTML
        const node = str.replace(/&lt;/ig,'<').replace(/&gt;/ig,'>')
        item.innerHTML = node
    });
}

module.exports = {
    getIcon
}