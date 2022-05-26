/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayWanan, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish } = data
  // 今日、恋爱天数
  // const today = `${date.replace('-', '年').replace('-', '月')}日`
  let date = dayjs()
  const dateLength = dayjs(date).diff(CONFIG.start_stamp, 'day')

  let text = '晚安呀，小甜甜~\n'
  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  if (['星期六', '星期五'].includes(week)) {
    text += `
今天是${week}，明天不用上班哦，小甜甜可以睡晚一点哦😝\n`
  }
  else {
    text += `
今天可是${week}哦，要记得早早睡觉，明天上班别迟到了~😝\n`
  }

  // 添加笑话
  if (caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayWanan) {
    text += `
${sayWanan.content}\n`
  }

  //诗句
  if (songLyrics) {
    text += `
  『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  //添加一句一言
  if (oneWord) {
    text += `
  『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语（${dayjs(dayEnglish.date).format('ll')}』${dayEnglish.content}`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
