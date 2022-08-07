// 处理当前播放进度
function timeProcessing (time){
    if(!time){
        return '00:00'
    }
    let newTime = Math.round(time)/100
    const arr = newTime.toString().split('')
    arr.unshift('0')
    if(arr.length <= 4) arr.push('0')
    if(arr.length <= 3) arr.push('00')
    arr.splice(2,1,':')
    newTime = arr.join('')
    return newTime || '00:00'
}
// 处理总进度
function totalProgress (time){
    let newTime = Math.round(time/100)*100
    const arr = newTime.toString().split('')
    if(arr[0]<9) arr.unshift('0')
    const arr2 = arr[2,3]
    arr[2] = ':'
    const arr3 = arr.concat(arr2)
    newTime = arr3.join('')
    return newTime || '00:00'
}
// 鼠标悬停播放
function hoverProgressBar(node,isShow){
    // 鼠标移入
    node.addEventListener('mouseover',()=>{
        const firstChild = node.firstChild
        firstChild.style = ''
    })
    // 鼠标移出
    node.addEventListener('mouseout',()=>{
        // console.log(isShow)
        if(isShow){
            const firstChild = node.firstChild
            firstChild.style = ''
        }else{
            const firstChild = node.firstChild
            firstChild.style = 'display: none;'
        }
    })
}
module.exports =  {
    timeProcessing,
    totalProgress,
    hoverProgressBar
}