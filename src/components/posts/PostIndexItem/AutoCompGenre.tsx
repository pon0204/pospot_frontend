import { Chip } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React from 'react'
import { generatePath } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { resetQueryGenre, setQueryGenre } from '../../../slices/postSlice'

export const AutoCompGenre = () => {
  interface genres {
    genre: string
    tag: string
  }
  const dispatch = useAppDispatch()
  const handleChange = (e: any, genres: genres | string) => {
    genres
      ? typeof genres === 'string'
        ? dispatch(setQueryGenre(genres))
        : dispatch(setQueryGenre(genres.genre))
      : dispatch(resetQueryGenre())
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      // options={genres}
      options={genres.map((option) => option.genre)}
      freeSolo
      // groupBy={(genre) => genre.tag}
      // getOptionLabel={(genre) => genre.genre}
      style={{ width: 300 }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="ジャンル検索"
          placeholder="検索例: ラーメン 公園"
        />
      )}
      className="mx-auto my-2 md:mx-2"
      onChange={(e: any, v: any) => handleChange(e, v)}
    />
  )
}

const genres = [
  { genre: '和食', tag: '食事' },
  { genre: 'うどん', tag: '' },
  { genre: 'そば', tag: '' },
  { genre: '焼き鳥', tag: '' },
  { genre: '寿司', tag: '' },
  { genre: '揚げ物', tag: '' },
  { genre: '丼もの', tag: '' },
  { genre: 'とんかつ', tag: '' },
  { genre: '唐揚げ', tag: '' },
  { genre: '海鮮丼', tag: '' },
  { genre: 'お好み焼き', tag: '' },
  { genre: 'たこ焼き', tag: '' },
  { genre: 'アジア・エスニック', tag: '' },
  { genre: '中華料理', tag: '' },
  { genre: 'ラーメン', tag: '' },
  { genre: 'チャーハン', tag: '' },
  { genre: '小籠包', tag: '' },
  { genre: '餃子', tag: '' },
  { genre: 'イタリアン', tag: '' },
  { genre: 'パスタ', tag: '' },
  { genre: 'ピザ', tag: '' },
  { genre: '洋食', tag: '' },
  { genre: 'オムライス', tag: '' },
  { genre: 'スープ', tag: '' },
  { genre: 'カレー', tag: '' },
  { genre: 'シチュー', tag: '' },
  { genre: 'チーズフォンデュ', tag: '' },
  { genre: 'ハンバーグ', tag: '' },
  { genre: 'ハンバーガー', tag: '' },
  { genre: 'フレンチ', tag: '' },
  { genre: 'アメリカ料理', tag: '' },
  { genre: 'アフリカ料理', tag: '' },
  { genre: '焼き肉', tag: '' },
  { genre: '牛タン', tag: '' },
  { genre: 'ジンギスカン', tag: '' },
  { genre: 'サムギョプサル', tag: '' },
  { genre: '鉄板焼き', tag: '' },
  { genre: 'チーズタッカルビ', tag: '' },
  { genre: 'ステーキ', tag: '' },
  { genre: 'ホルモン', tag: '' },
  { genre: 'ハンバーグ', tag: '' },
  { genre: '串カツ', tag: '' },
  { genre: '串揚げ', tag: '' },
  { genre: '炉端焼き', tag: '' },
  { genre: 'ローストビーフ', tag: '' },
  { genre: '鍋', tag: '' },
  { genre: 'ちゃんこ鍋', tag: '' },
  { genre: '水炊き', tag: '' },
  { genre: '火鍋', tag: '' },
  { genre: 'あんこう鍋', tag: '' },
  { genre: 'キムチ鍋', tag: '' },
  { genre: '坦々鍋', tag: '' },
  { genre: 'すき焼き', tag: '' },
  { genre: 'かにしゃぶ', tag: '' },
  { genre: 'しゃぶしゃぶ', tag: '' },
  { genre: '居酒屋', tag: '' },
  { genre: 'バー', tag: '' },
  { genre: '立ち呑み', tag: '' },
  { genre: 'スポーツバー', tag: '' },
  { genre: 'ビアガーデン', tag: '' },
  { genre: '喫茶店', tag: '' },
  { genre: 'パンケーキ', tag: '' },
  { genre: 'アイスクリーム', tag: '' },
  { genre: 'コーヒー', tag: '' },
  { genre: 'チョコレート', tag: '' },
  { genre: '洋菓子', tag: '' },
  { genre: 'ドーナツ', tag: '' },
  { genre: 'パン屋', tag: '' },
  { genre: '和菓子', tag: '' },
  { genre: 'かき氷', tag: '' },
  { genre: 'タピオカ', tag: '' },
  { genre: '魚介ラーメン', tag: '' },
  { genre: 'つけ麺', tag: '' },
  { genre: '豚骨ラーメン', tag: '' },
  { genre: '味噌ラーメン', tag: '' },
  { genre: '塩ラーメン', tag: '' },
  { genre: '醤油ラーメン', tag: '' },
  { genre: '担々麺', tag: '' },
  { genre: '横浜家系', tag: '' },
  { genre: '二郎系', tag: '' },
  { genre: '公園', tag: 'アウトドア' },
  { genre: 'キャンプ場', tag: '' },
  { genre: '動物園', tag: '' },
  { genre: '遊園地', tag: '' },
  { genre: '観光スポット', tag: '' },
  { genre: '夜景', tag: '' },
  { genre: '風景', tag: '' },
  { genre: 'ゴルフ場', tag: '' },
  { genre: 'ゴルフ練習場', tag: '' },
  { genre: '味覚狩り', tag: '' },
  { genre: 'いちご狩り', tag: '' },
  { genre: '世界遺産', tag: '' },
  { genre: '登山', tag: '' },
  { genre: '温泉', tag: '' },
  { genre: 'スカイダイビング', tag: '' },
  { genre: 'バンジー', tag: '' },
  { genre: 'パラグライダー', tag: '' },
  { genre: 'ウェイクボード', tag: '' },
  { genre: 'ダイビング', tag: '' },
  { genre: 'マリンスポーツ', tag: '' },
  { genre: 'アスレチック', tag: '' },
  { genre: 'ラフティング', tag: '' },
  { genre: '釣り', tag: '' },
  { genre: '乗馬', tag: '' },
  { genre: 'バーベキュー', tag: '' },
  { genre: '天体観測', tag: '' },
  { genre: '星空', tag: '' },
  { genre: 'ハイキング', tag: '' },
  { genre: 'スキー場', tag: '' },
  { genre: '雪遊び', tag: '' },
  { genre: 'フットサル場', tag: '' },
  { genre: 'サッカー場', tag: '' },
  { genre: 'テニスコート', tag: '' },
  { genre: 'バスケットボール', tag: '' },
  { genre: '海水浴場', tag: '' },
  { genre: '展望台・タワー', tag: '' },
  { genre: '道の駅', tag: '' },
  { genre: '紅葉狩り', tag: '' },
  { genre: 'フラワーパーク', tag: '' },
  { genre: 'イルミネーション', tag: '' },
  { genre: 'ゴーカート', tag: '' },
  { genre: '観覧車', tag: '' },
  { genre: '', tag: '' },
  { genre: '', tag: '' },
  { genre: '', tag: 'インドア' },
  { genre: '映画館', tag: '' },
  { genre: '水族館', tag: '' },
  { genre: 'カラオケ', tag: '' },
  { genre: 'ゲームセンター', tag: '' },
  { genre: 'ビリヤード', tag: '' },
  { genre: 'ボウリング', tag: '' },
  { genre: 'スポーツ観戦', tag: '' },
  { genre: '演劇', tag: '' },
  { genre: 'プラネタリウム', tag: '' },
  { genre: 'ジム', tag: '' },
  { genre: 'トランポリン', tag: '' },
  { genre: 'スーパー銭湯', tag: '' },
  { genre: 'ハンドメイド', tag: '' },
  { genre: '陶芸体験', tag: '' },
  { genre: 'ガラス工房', tag: '' },
  { genre: '手作りアクセサリー', tag: '' },
  { genre: 'マッサージ', tag: '' },
  { genre: '空港', tag: '' },
  { genre: '図書館', tag: '' },
  { genre: '大学', tag: '' },
  { genre: '美術館', tag: '' },
  { genre: '博物館', tag: '' },
  { genre: '科学館', tag: '' },
  { genre: '神社', tag: '' },
  { genre: '寺', tag: '' },
  { genre: 'ショッピングモール', tag: '買い物' },
  { genre: '食料品', tag: '' },
  { genre: '菓子', tag: '' },
  { genre: 'スーパー', tag: '' },
  { genre: 'アパレル', tag: '' },
  { genre: '服屋', tag: '' },
  { genre: 'アクセサリー', tag: '' },
  { genre: '雑貨屋', tag: '' },
  { genre: '電化製品', tag: '' },
  { genre: '時計', tag: '' },
  { genre: '眼鏡屋', tag: '' },
  { genre: 'リサイクル', tag: '' },
  { genre: 'ゲーム', tag: '' },
  { genre: 'ビデオ', tag: '' },
  { genre: 'レンタルショップ', tag: '' },
  { genre: '遊覧船', tag: '観光' },
  { genre: '屋形船', tag: '' },
  { genre: 'イルカウォッチング', tag: '' },
  { genre: '水上バイク', tag: '' },
]
