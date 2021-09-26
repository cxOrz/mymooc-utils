export default function liveReview () {
  const script = `
  let middleFrame = document.getElementById('middleFrame');
  let watchStartTime = watchMomentValue
  let flag = 1
  let checkPlayingInterval = setInterval(() => {
    if (watchStartTime != watchMomentValue && flag == 1) {
      flag = 0
      middleFrame.src = middleFrame.src.substring(0, middleFrame.src.indexOf('watchMoment=') + 12) + duration;
    } else if (watchMomentValue == duration) {
      clearInterval(checkPlayingInterval)
      alert('任务完成')
    }
  }, 1000);
  `
  const element = document.createElement('script')
  element.insertAdjacentText('afterbegin', script)
  document.body.insertAdjacentElement('beforeend', element)
}