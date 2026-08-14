export const FEELINGS = [
  { id: 'serenity',  label: 'Serenity',  arabicContext: 'سكينة', hex: '#47B3DB' },
  { id: 'passion',   label: 'Passion',   arabicContext: 'شوق',   hex: '#BF2121' },
  { id: 'joy',       label: 'Joy',       arabicContext: 'فرح',   hex: '#BDBF6F' },
  { id: 'grief',     label: 'Grief',     arabicContext: 'حزن',   hex: '#70671A' },
  { id: 'hope',      label: 'Hope',      arabicContext: 'أمل',   hex: '#F2D8C2' },
  { id: 'longing',   label: 'Longing',   arabicContext: 'شوق',   hex: '#A47ED9' },
];

export const DESIRES = [
  {
    id: 'unity',
    label: 'Unity',
    arabicLabel: 'وحدة',
    icon: 'icon-01',
    meaning: 'The sunburst — a single light radiating outward, binding all.',
  },
  {
    id: 'harmony',
    label: 'Harmony',
    arabicLabel: 'انسجام',
    icon: 'icon-02',
    meaning: 'The hexagonal star — infinite repetition of a balanced form.',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    arabicLabel: 'جمال',
    icon: 'icon-03',
    meaning: 'The arabesque medallion — ornament as a path to the divine.',
  },
  {
    id: 'balance',
    label: 'Balance',
    arabicLabel: 'توازن',
    icon: 'icon-04',
    meaning: 'The compass rose — a center that holds all directions equal.',
  },
  {
    id: 'bond',
    label: 'Bond',
    arabicLabel: 'رابطة',
    icon: 'icon-05',
    meaning: 'The lattice web — strength found only in connection.',
  },
  {
    id: 'shelter',
    label: 'Shelter',
    arabicLabel: 'مأوى',
    icon: 'icon-06',
    meaning: 'The interlocking cross — foundation, protection, a place to return to.',
  },
];

export const PHRASES = [
  {
    id: 'p1',
    arabic: 'يلّا',
    transliteration: "yalla",
    translation: "Let's go — move with intention",
    layoutMode: 'scattered',
  },
  {
    id: 'p2',
    arabic: 'الله يسلّمك',
    transliteration: "allah yisallmak",
    translation: 'May God keep you safe — a blessing offered freely',
    layoutMode: 'radial',
  },
  {
    id: 'p3',
    arabic: 'عالراحة',
    transliteration: "'al-raha",
    translation: 'Take it easy — let it breathe',
    layoutMode: 'grid',
  },
  {
    id: 'p4',
    arabic: 'من عيوني',
    transliteration: "min 3youni",
    translation: 'From my eyes — with all the love I have',
    layoutMode: 'fruitoflife',
  },
];

export const ERAS = [
  {
    id: 'umayyad',
    label: 'Umayyad',
    period: '661 – 750 CE',
    description: 'Sweeping arches, desert palaces, and the birth of Syrian Islamic art.',
    image: 'bgimages/bgi1.png',
  },
  {
    id: 'ayyubid',
    label: 'Ayyubid',
    period: '1171 – 1260 CE',
    description: 'Stone inlay and striped masonry — ablaq — geometry meets grandeur.',
    image: 'bgimages/bgi3.png',
  },
  {
    id: 'mamluk',
    label: 'Mamluk',
    period: '1260 – 1516 CE',
    description: 'Intricate muqarnas, star patterns, and the golden mean.',
    image: 'bgimages/bgi6.png',
  },
  {
    id: 'ottoman',
    label: 'Ottoman',
    period: '1516 – 1918 CE',
    description: 'Tile work, courtyard gardens, and the souk as sacred space.',
    image: 'bgimages/bgi8.png',
  },
  {
    id: 'modern',
    label: 'Modern Syria',
    period: '1920s – present',
    description: 'Memory, diaspora, and the ongoing act of preservation.',
    image: 'bgimages/bgi10.png',
  },
];

export const MOTIF_COLORS = [
  { id: 'dark',     label: 'Dark',     hex: '#1a1a1a' },
  { id: 'white',    label: 'White',    hex: '#f5f5f5' },
  { id: 'serenity', label: 'Serenity', hex: '#47B3DB' },
  { id: 'passion',  label: 'Passion',  hex: '#BF2121' },
  { id: 'joy',      label: 'Joy',      hex: '#BDBF6F' },
  { id: 'grief',    label: 'Grief',    hex: '#70671A' },
  { id: 'hope',     label: 'Hope',     hex: '#F2D8C2' },
  { id: 'longing',  label: 'Longing',  hex: '#A47ED9' },
];

// Maps feeling id to bgimage index (1-10)
export const FEELING_TO_BG = {
  serenity: 4,
  passion:  2,
  joy:      7,
  grief:    9,
  hope:     1,
  longing:  5,
};
