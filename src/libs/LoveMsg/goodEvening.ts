/**
 * @name goodEvening
 * @description 说晚安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/textWanan'
import { textCardTemplate } from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getWanAnbook(), // 晚安语录
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
    ])

    // 过滤掉异常数据
    const [sayLove,sayWanan, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayLove,
      sayWanan,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}



// goodEvening
export const goodEvening = async () => {

  await goodWord()
}
