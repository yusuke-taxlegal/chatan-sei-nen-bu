<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { RouterLink } from 'vue-router'

const members = ref([])

// Firestoreから全プロフィールを取得する関数
const fetchMembers = async () => {
  const profilesCollection = collection(db, 'profiles')
  const querySnapshot = await getDocs(profilesCollection)
  const fetchedMembers = []
  querySnapshot.forEach((doc) => {
    fetchedMembers.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  // Fisher-Yates (aka Knuth) Shuffle algorithm
  for (let i = fetchedMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[fetchedMembers[i], fetchedMembers[j]] = [fetchedMembers[j], fetchedMembers[i]]
  }

  members.value = fetchedMembers
}

onMounted(() => {
  // ページが読み込まれたら確実にトップにスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchMembers()
})
</script>

<template>
  <div class="page-container">
    <h1
      class="page-title font-heading"
      data-aos="fade-down"
      data-aos-duration="800"
      v-motion
      :initial="{ opacity: 0, y: -30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
    >
      部員一覧
    </h1>
    <div class="member-list">
      <RouterLink
        v-for="(member, index) in members"
        :key="member.id"
        :to="'/member/' + member.id"
        class="member-card-link"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 100 + 300"
        v-motion
        :initial="{ opacity: 0, y: 50, scale: 0.9 }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: index * 100 + 400, duration: 600 },
        }"
      >
        <div class="member-card">
          <div class="card-header">
            <img
              :src="member.profileImageUrl || 'https://via.placeholder.com/100'"
              alt="プロフィール画像"
              class="profile-image"
            />
            <div class="member-info">
              <p class="member-phonetic-name font-caption">{{ member.phoneticName }}</p>
              <h2 class="member-name font-subheading">{{ member.name }}</h2>
              <p class="member-company font-body">{{ member.company }}</p>
            </div>
          </div>
          <div class="card-body" v-if="member.bio">
            <p class="business-content">{{ member.bio }}</p>
          </div>
          <div class="card-footer">
            <span>詳細を見る</span>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- NotebookLM Guide Banner -->
    <div class="guide-banner" data-aos="fade-up" data-aos-duration="800">
      <div class="guide-banner-icon">🤖</div>
      <div class="guide-banner-content">
        <h3 class="font-subheading">NotebookLM プロンプト自動生成機能のご案内</h3>
        <p class="font-body">
          各部員の詳細ページの下部に、NotebookLMで使える「プロフィールソース」と「マーケティングプラン作成プロンプト」を自動生成するボタンを追加しました！<br />
          <strong>【応用編】</strong>
          さらにNotebookLMの<strong>「スタジオ機能（スライド資料、音声解説、インフォグラフィック）」</strong>を使えば、ボタン1つで高品質な完成資料が出来上がります。ぜひご活用ください！
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 2rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--color-heading);
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.member-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: none;
}

.member-card-link {
  text-decoration: none;
  color: inherit;
}

.member-card {
  background: linear-gradient(145deg, var(--color-background-soft), var(--color-background-mute));
  border: 1px solid var(--color-border);
  border-radius: 1.5rem; /* 角を丸く */
  padding: 0; /* 内側のパディングをリセット */
  text-align: left; /* テキストを左揃えに */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex; /* Flexboxレイアウト */
  flex-direction: column; /* 縦方向に配置 */
  height: 100%; /* 高さを100%に */
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.member-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.4),
    0 8px 32px rgba(59, 130, 246, 0.2);
  border-color: var(--vt-c-brand);
}

.member-card:hover::before {
  left: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.profile-image {
  width: 60px; /* 画像サイズを調整 */
  height: 60px;
  border-radius: 50%;
  object-fit: cover; /* coverに変更してアスペクト比を維持 */
  margin: 0; /* マージンをリセット */
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.member-card:hover .profile-image {
  border-color: var(--vt-c-brand);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.member-info {
  flex: 1;
}

.member-phonetic-name {
  font-size: 0.75rem;
  color: var(--vt-c-text-dark-2);
  margin: 0 0 0.2rem 0;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.member-name {
  font-size: 1.25rem; /* フォントサイズ調整 */
  font-weight: 600;
  margin: 0 0 0.25rem 0; /* マージン調整 */
  color: var(--color-heading);
}

.member-company {
  color: var(--vt-c-text-dark-2);
  font-size: 0.875rem; /* フォントサイズ調整 */
  margin: 0;
}

.card-body {
  padding: 1.5rem;
  flex-grow: 1; /* 内容が少なくても高さを埋める */
  min-height: 98px; /* 3行分の高さを確保 + α */
}

.business-content {
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.6;
  /* 3行で省略表示 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: pre-wrap; */ /*一覧では改行は不要な場合が多いのでコメントアウト。必要であれば有効化 */
}

.card-footer {
  padding: 1rem 1.5rem;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-weight: 500;
  color: var(--vt-c-brand);
  transition: all 0.3s ease;
}

.member-card:hover .card-footer {
  background-color: var(--vt-c-brand-tint);
  color: white;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }

  .member-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-title {
    font-size: 1.875rem;
    margin-bottom: 2rem;
  }

  .member-card {
    padding: 1.5rem;
  }

  .profile-image {
    width: 100px;
    height: 100px;
  }

  .member-name {
    font-size: 1.2rem;
  }

  .member-company {
    font-size: 0.9rem;
  }
}

.guide-banner {
  margin-top: 3rem;
  background: linear-gradient(135deg, var(--color-background-soft), #e3f2fd);
  border: 1px solid #90caf9;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.guide-banner-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.guide-banner-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
}

.guide-banner-content p {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text);
  line-height: 1.6;
}

/* Dark mode adjustments for guide banner */
@media (prefers-color-scheme: dark) {
  .guide-banner {
    background: linear-gradient(135deg, var(--color-background-soft), #1e3a5f);
    border-color: #1976d2;
  }
}

@media (max-width: 768px) {
  .guide-banner {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }
}
</style>
