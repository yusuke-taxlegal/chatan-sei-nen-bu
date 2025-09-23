// データベース復元・削除用スクリプト
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyCTRU2kOJGOFchiW0-hRmMfQRJQUAChb10",
  authDomain: "chatan-members-site.firebaseapp.com",
  projectId: "chatan-members-site",
  storageBucket: "chatan-members-site.firebasestorage.app",
  messagingSenderId: "1024502175390",
  appId: "1:1024502175390:web:0f79130f64007cff0e4d8f",
  measurementId: "G-QDDSG76947"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// サンプルユーザーデータ
const sampleUsers = [
  {
    id: 'sample-user-1',
    name: '田中 太郎',
    company: '田中建設株式会社',
    bio: '北谷町で30年間建設業を営んでいます。住宅建築から商業施設まで幅広く対応。地域密着型の誠実な施工をモットーとしています。新しいビジネスパートナーとの出会いを楽しみにしています。',
    website: 'https://tanaka-kensetsu.com',
    sns: 'https://twitter.com/tanaka_kensetsu',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-2', 
    name: '佐藤 花子',
    company: 'Cafe Sunset',
    bio: 'アメリカンビレッジ近くでカフェを経営しています。地元食材を使った創作料理とスペシャルティコーヒーが自慢です。観光客と地元の方々の憩いの場として愛されるお店作りを心がけています。',
    website: 'https://cafe-sunset-chatan.com',
    sns: 'https://instagram.com/cafe_sunset_chatan',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b050?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-3',
    name: '山田 次郎',
    company: '山田ITソリューションズ',
    bio: 'WEB制作・システム開発を専門としています。地域企業のDX推進をサポートし、効率的なビジネス運営をお手伝いします。最新技術を活用した課題解決が得意分野です。',
    website: 'https://yamada-it.okinawa',
    sns: 'https://linkedin.com/in/yamada-jiro',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-4',
    name: '鈴木 美咲',
    company: '鈴木美容室',
    bio: '北谷町で20年間美容師をしています。お客様一人ひとりのライフスタイルに合わせたヘアデザインを提案。最新トレンドと確かな技術で、美しさをサポートします。',
    website: '',
    sns: 'https://instagram.com/suzuki_beauty_salon',
    profileImageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-5',
    name: '高橋 大輔',
    company: 'タカハシ水産',
    bio: '沖縄近海で獲れた新鮮な魚介類の卸売・小売を行っています。料理店や一般のお客様に安全で美味しい海の幸をお届け。地産地消で地域経済の活性化に貢献しています。',
    website: 'https://takahashi-suisan.okinawa',
    sns: '',
    profileImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-6',
    name: '伊藤 かな子',
    company: 'いとう会計事務所',
    bio: '税理士として中小企業の経営サポートを行っています。税務相談から経営計画立案まで、企業の成長を会計面からお手伝い。丁寧な対応と分かりやすい説明を心がけています。',
    website: 'https://ito-kaikei.com',
    sns: 'https://facebook.com/ito.kaikei',
    profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-7',
    name: '渡辺 健一',
    company: 'ワタナベ自動車整備工場',
    bio: '車検・修理・板金塗装まで自動車のことなら何でもお任せください。地域の皆様の安全なカーライフをサポートします。迅速で確実な整備技術が自慢です。',
    website: '',
    sns: '',
    profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-8',
    name: '中村 さゆり',
    company: 'リゾートホテル美ら海',
    bio: 'ホテルの営業部長として観光業に従事しています。沖縄の美しい自然と文化を多くの方に体験していただけるよう、心のこもったおもてなしを提供しています。',
    website: 'https://hotel-churaumi.com',
    sns: 'https://instagram.com/hotel_churaumi',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-9',
    name: '小林 雄一',
    company: 'コバヤシ不動産',
    bio: '北谷エリアの不動産売買・賃貸を専門としています。お客様のライフスタイルに最適な物件探しをお手伝い。地域情報に精通し、安心できる取引をサポートします。',
    website: 'https://kobayashi-fudosan.net',
    sns: 'https://twitter.com/kobayashi_realestate',
    profileImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'sample-user-10',
    name: '加藤 まりえ',
    company: 'かとう写真スタジオ',
    bio: '結婚式・成人式・七五三などの記念撮影を専門とする写真スタジオを経営しています。お客様の大切な瞬間を美しく残すことが私たちの使命です。沖縄の素晴らしい景色を背景にした撮影も人気です。',
    website: 'https://kato-photo.okinawa',
    sns: 'https://instagram.com/kato_photo_studio',
    profileImageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face'
  }
];

// データ追加関数
async function addSampleData() {
  console.log('サンプルデータの追加を開始します...');
  
  const promises = sampleUsers.map(memberData => {
    const userRef = doc(db, 'profiles', memberData.id);
    const profileData = {
      name: memberData.name || '',
      company: memberData.company || '',
      bio: memberData.bio || '',
      needs: memberData.needs || '',
      pastTransactions: memberData.pastTransactions || '',
      providableInfo: memberData.providableInfo || '',
      seekingInfo: memberData.seekingInfo || '',
      website: memberData.website || '',
      sns: memberData.sns || '',
      profileImageUrl: memberData.profileImageUrl || ''
    };
    return setDoc(userRef, profileData).then(() => {
      console.log(`✅ ${memberData.name} のデータを追加しました`);
    });
  });

  try {
    await Promise.all(promises);
    console.log('🎉 全てのサンプルデータの追加が完了しました！');
  } catch (error) {
    console.error('❌ データ追加中にエラーが発生しました:', error);
  }
}

// データ削除関数
async function deleteSampleData() {
  console.log('サンプルデータの削除を開始します...');

  const promises = sampleUsers.map(memberData => {
    // 安全対策：IDが 'sample-user-' で始まらないデータは削除しない
    if (!memberData.id.startsWith('sample-user-')) {
        console.warn(`⚠️  ${memberData.name} (ID: ${memberData.id}) はサンプルデータではないため、スキップします。`);
        return Promise.resolve();
    }
    const userRef = doc(db, 'profiles', memberData.id);
    return deleteDoc(userRef).then(() => {
      console.log(`🗑️  ${memberData.name} のデータを削除しました`);
    });
  });

  try {
    await Promise.all(promises);
    console.log('🎉 全てのサンプルデータの削除が完了しました！');
  } catch (error) {
    console.error('❌ データ削除中にエラーが発生しました:', error);
  }
}

// スクリプト実行
const command = process.argv[2]; // コマンドライン引数を取得 (add or delete)

if (command === 'add') {
  addSampleData();
} else if (command === 'delete') {
  deleteSampleData();
} else {
  console.log('コマンドを指定してください:');
  console.log('  - データを追加する場合: node add-sample-data.js add');
  console.log('  - データを削除する場合: node add-sample-data.js delete');
}
