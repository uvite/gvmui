import {eplusDictionary, findSysDictionary} from '@/api/sysDictionary'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDictionaryStore = defineStore('dictionary', () => {
  const dictionaryMap = ref({})

  const setDictionaryMap = (dictionaryRes) => {
    dictionaryMap.value = { ...dictionaryMap.value, ...dictionaryRes }
  }

  const getDictionary = async(code) => {
    if (dictionaryMap.value[code] && dictionaryMap.value[code].length) {
      return dictionaryMap.value[code]
    } else {
      const res = await eplusDictionary({ code })
      if (res.code === 0) {
        const dictionaryRes = {}
        const dict = []
        res.data.resysDictionary.sysDictionaryDetails && res.data.resysDictionary.sysDictionaryDetails.forEach(item => {
          dict.push({
            label: item.label,
            value: item.value
          })
        })
        dictionaryRes[res.data.resysDictionary.code] = dict
        setDictionaryMap(dictionaryRes)
        return dictionaryMap.value[code]
      }
    }
  }

  return {
    dictionaryMap,
    setDictionaryMap,
    getDictionary
  }
})
