/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish } = data
  // 今日、恋爱天数
  // const today = `${date.replace('-', '年').replace('-', '月')}日`
  let date = dayjs()
  const dateLength = dayjs(date).diff(CONFIG.start_stamp, 'day')

  let text = '早安呀，小甜甜~\n'

  text += `这是我们相识的第 ${dateLength} 天\n`
  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  if (['星期六', '星期日'].includes(week)) {
    text += `
如果我的小甜甜还没起床呀！碎逼娃娃就等着小甜甜起床给我说早安呦🤣
嗯哼~，既然今天是${week}，就让你再睡会懒觉~下次可不能啦~😝\n`
  }
  else {
    text += `
如果我小甜甜已经起床啦！碎逼娃娃向你说早安呦~，记得吃早饭呀😆\n
嗯哼哼~今天可是${week}哦，上班别迟到了哦~`
  }

  // 添加笑话
  if (caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  //   if (songLyrics) {
  //     text += `
  // 『${songLyrics.source}』${songLyrics.content}\n`
  //   }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  //   if (oneWord) {
  //     text += `
  // 『一言』${oneWord.hitokoto}\n`
  //   }

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
