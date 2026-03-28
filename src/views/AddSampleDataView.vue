<script setup>
import { ref } from 'vue'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const isAdding = ref(false)
const message = ref('')

// サンプルユーザーデータ
const sampleUsers = [
  {
    id: 'user1',
    name: '田中 太郎',
    company: '田中建設株式会社',
    bio: '北谷町で30年間建設業を営んでいます。住宅建築から商業施設まで幅広く対応。地域密着型の誠実な施工をモットーとしています。新しいビジネスパートナーとの出会いを楽しみにしています。',
    website: 'https://tanaka-kensetsu.com',
    sns: 'https://twitter.com/tanaka_kensetsu',
    profileImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user2',
    name: '佐藤 花子',
    company: 'Cafe Sunset',
    bio: 'アメリカンビレッジ近くでカフェを経営しています。地元食材を使った創作料理とスペシャルティコーヒーが自慢です。観光客と地元の方々の憩いの場として愛されるお店作りを心がけています。',
    website: 'https://cafe-sunset-chatan.com',
    sns: 'https://instagram.com/cafe_sunset_chatan',
    profileImageUrl:
      'https://images.unsplash.com/photo-1494790108755-2616b612b050?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user3',
    name: '山田 次郎',
    company: '山田ITソリューションズ',
    bio: 'WEB制作・システム開発を専門としています。地域企業のDX推進をサポートし、効率的なビジネス運営をお手伝いします。最新技術を活用した課題解決が得意分野です。',
    website: 'https://yamada-it.okinawa',
    sns: 'https://linkedin.com/in/yamada-jiro',
    profileImageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user4',
    name: '鈴木 美咲',
    company: '鈴木美容室',
    bio: '北谷町で20年間美容師をしています。お客様一人ひとりのライフスタイルに合わせたヘアデザインを提案。最新トレンドと確かな技術で、美しさをサポートします。',
    website: '',
    sns: 'https://instagram.com/suzuki_beauty_salon',
    profileImageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user5',
    name: '高橋 大輔',
    company: 'タカハシ水産',
    bio: '沖縄近海で獲れた新鮮な魚介類の卸売・小売を行っています。料理店や一般のお客様に安全で美味しい海の幸をお届け。地産地消で地域経済の活性化に貢献しています。',
    website: 'https://takahashi-suisan.okinawa',
    sns: '',
    profileImageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user6',
    name: '伊藤 かな子',
    company: 'いとう会計事務所',
    bio: '税理士として中小企業の経営サポートを行っています。税務相談から経営計画立案まで、企業の成長を会計面からお手伝い。丁寧な対応と分かりやすい説明を心がけています。',
    website: 'https://ito-kaikei.com',
    sns: 'https://facebook.com/ito.kaikei',
    profileImageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user7',
    name: '渡辺 健一',
    company: 'ワタナベ自動車整備工場',
    bio: '車検・修理・板金塗装まで自動車のことなら何でもお任せください。地域の皆様の安全なカーライフをサポートします。迅速で確実な整備技術が自慢です。',
    website: '',
    sns: '',
    profileImageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user8',
    name: '中村 さゆり',
    company: 'リゾートホテル美ら海',
    bio: 'ホテルの営業部長として観光業に従事しています。沖縄の美しい自然と文化を多くの方に体験していただけるよう、心のこもったおもてなしを提供しています。',
    website: 'https://hotel-churaumi.com',
    sns: 'https://instagram.com/hotel_churaumi',
    profileImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user9',
    name: '小林 雄一',
    company: 'コバヤシ不動産',
    bio: '北谷エリアの不動産売買・賃貸を専門としています。お客様のライフスタイルに最適な物件探しをお手伝い。地域情報に精通し、安心できる取引をサポートします。',
    website: 'https://kobayashi-fudosan.net',
    sns: 'https://twitter.com/kobayashi_realestate',
    profileImageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'user10',
    name: '加藤 まりえ',
    company: 'かとう写真スタジオ',
    bio: '結婚式・成人式・七五三などの記念撮影を専門とする写真スタジオを経営しています。お客様の大切な瞬間を美しく残すことが私たちの使命です。沖縄の素晴らしい景色を背景にした撮影も人気です。',
    website: 'https://kato-photo.okinawa',
    sns: 'https://instagram.com/kato_photo_studio',
    profileImageUrl:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face',
  },
]

// データ追加関数
const addSampleData = async () => {
  isAdding.value = true
  message.value = 'サンプルデータを追加しています...'

  try {
    for (const user of sampleUsers) {
      const userRef = doc(db, 'profiles', user.id)
      await setDoc(userRef, {
        name: user.name,
        company: user.company,
        bio: user.bio,
        website: user.website,
        sns: user.sns,
        profileImageUrl: user.profileImageUrl,
      })
      message.value = `✅ ${user.name} のデータを追加しました`
      await new Promise((resolve) => setTimeout(resolve, 500)) // 0.5秒待機
    }

    message.value = '🎉 すべてのサンプルデータの追加が完了しました！'
  } catch (error) {
    console.error('❌ エラーが発生しました:', error)
    message.value = `❌ エラーが発生しました: ${error.message}`
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h1 class="title">サンプルデータ追加ツール</h1>
      <p class="description">
        北谷町商工会青年部の10人のサンプルメンバーデータを追加します。<br />
        建設業・飲食業・IT業・美容業・水産業・税理士・自動車整備・ホテル業・不動産業・写真業の多様なメンバーが含まれます。
      </p>

      <button @click="addSampleData" :disabled="isAdding" class="add-button">
        <span v-if="isAdding">追加中...</span>
        <span v-else>✨ サンプルデータを追加</span>
      </button>

      <div v-if="message" class="message">
        {{ message }}
      </div>

      <div class="sample-list">
        <h2>追加されるサンプルメンバー:</h2>
        <ul>
          <li v-for="user in sampleUsers" :key="user.id">
            <strong>{{ user.name }}</strong> - {{ user.company }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 1rem;
}

.description {
  color: var(--vt-c-text-dark-2);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.add-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.add-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  padding: 1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  text-align: center;
}

.sample-list {
  margin-top: 2rem;
}

.sample-list h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.sample-list ul {
  list-style: none;
  padding: 0;
}

.sample-list li {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  color: var(--color-text);
}

.sample-list strong {
  color: var(--color-heading);
}
</style>
