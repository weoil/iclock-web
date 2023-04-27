export interface WeiBoHotBand_list {
  note: string;
  emoticon: string;
  ad_info: string;
  category: string;
  raw_hot: number;
  word: string;
  onboard_time: number;
  realpos: number;
  flag: number;
  word_scheme: string;
  is_new: number;
  subject_label: string;
  expand: number;
  label_name: string;
  subject_querys: string;
  star_word: number;
  star_name: string;
  icon_desc: string;
  icon_desc_color: string;
  num: number;
  fun_word: number;
  small_icon_desc: string;
  small_icon_desc_color: string;
  channel_type: string;
  topic_flag: number;
  extension: number;
  rank: number;
}

export interface WeiBoHotHotgov {
  icon_desc: string;
  mid: string;
  name: string;
  small_icon_desc_color: string;
  is_hot: number;
  word: string;
  is_gov: number;
  small_icon_desc: string;
  icon_desc_color: string;
  url: string;
  note: string;
  topic_flag: number;
}

export interface WeiBoHotData {
  band_list: WeiBoHotBand_list[];
  hotgov: WeiBoHotHotgov;
}
