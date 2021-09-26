// ==UserScript==
// @name         超星学习通小油条
// @namespace    https://github.com/miaochenxi/
// @version      0.1
// @description  【功能】直播回放秒过
// @author       mcx
// @match        https://zhibo.chaoxing.com/*
// @icon         none
// @grant        none
// ==/UserScript==
'use strict';

function liveReview () {
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
  `;
  const element = document.createElement('script');
  element.insertAdjacentText('afterbegin', script);
  document.body.insertAdjacentElement('beforeend', element);
}

liveReview();
